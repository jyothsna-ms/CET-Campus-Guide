const state = {
  user: null,
  authMode: "login",
  guide: null,
  locations: [],
  selectedLocationId: "",
  map: null,
  markers: new Map(),
  routeLine: null
};
const $ = id => document.getElementById(id);
const pageTitles = {
  overview: "Overview",
  academics: "Academics",
  campus: "Campus",
  community: "Community",
  life: "Student Life",
  admin: "Admin"
};
const featureCards = [
  ["Academics", "Semester resources, notes, PYQs and study folders.", "academics"],
  ["Campus", "Places, route estimates and the interactive map.", "campus"],
  ["Community", "Clubs, events, senior advice and campus culture.", "community"],
  ["Student Life", "Library, hostel, transport and contacts.", "life"],
  ["Admin", "Protected editing for guide and map content.", "admin"],
  ["Export", "Download the current guide data as JSON.", "export"]
];
function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
}
function setStatus(message, error=false){
  $("authStatus").textContent = message || "";
  $("authStatus").style.color = error ? "var(--danger)" : "var(--muted)";
}
function setAuthMode(mode){
  state.authMode = mode;
  document.querySelectorAll("[data-auth-mode]").forEach(btn => btn.classList.toggle("active", btn.dataset.authMode === mode));
  const signup = mode === "signup";
  $("authTitle").textContent = signup ? "Create your account" : "Log in to continue";
  $("authSubtitle").textContent = signup ? "Start with a student account, or use the admin code for editing access." : "Use your CET guide account to open the home page.";
  $("authSubmit").textContent = signup ? "Sign up" : "Log in";
  $("nameField").classList.toggle("hidden", !signup);
  $("roleField").classList.toggle("hidden", !signup);
  $("adminCodeField").classList.toggle("hidden", !signup);
}
async function authenticate(event){
  event.preventDefault();
  setStatus("Checking account...");
  const body = {
    name: $("nameInput").value.trim(),
    email: $("emailInput").value.trim(),
    password: $("passwordInput").value,
    role: $("roleInput").value,
    adminCode: $("adminCodeInput").value
  };
  try{
    const result = state.authMode === "signup" ? await api.signup(body) : await api.login(body);
    state.user = result.user;
    $("passwordInput").value = "";
    await enterApp();
  }catch(err){
    setStatus(err.message, true);
  }
}
async function createDemo(){
  const suffix = Math.floor(Math.random() * 100000);
  $("nameInput").value = "CET Fresher";
  $("emailInput").value = `fresher${suffix}@example.com`;
  $("passwordInput").value = "campus123";
  setAuthMode("signup");
  await authenticate(new Event("submit"));
}
async function enterApp(){
  $("authView").classList.add("hidden");
  $("appView").classList.remove("hidden");
  $("userName").textContent = state.user.name;
  $("userMeta").textContent = `${state.user.role} | ${state.user.email}`;
  $("welcomeLine").textContent = `Welcome, ${state.user.name}. Everything you need for CET, neatly grouped.`;
  await loadData();
  renderAll();
  showSection("overview");
}
async function loadData(){
  const [guide, locations] = await Promise.all([api.guide(), api.locations()]);
  state.guide = guide;
  state.locations = locations;
}
function renderAll(){
  renderFeatureGrid();
  renderChecklist();
  renderAcademics();
  renderCampus();
  renderCommunity();
  renderLife();
  renderAdmin();
}
function renderFeatureGrid(){
  $("featureGrid").innerHTML = featureCards.map(([title, text, target]) => `
    <button class="feature" data-feature="${target}">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(text)}</span>
    </button>
  `).join("");
  document.querySelectorAll("[data-feature]").forEach(card => card.addEventListener("click", () => {
    if(card.dataset.feature === "export") return exportGuide();
    showSection(card.dataset.feature);
  }));
}
function renderChecklist(){
  $("checklist").innerHTML = (state.guide.checklist || []).map(item => `<span class="chip">${escapeHtml(item)}</span>`).join("");
}
function renderAcademics(){
  const semesters = Object.keys(state.guide.academic || {});
  $("semesterSelect").innerHTML = semesters.map(sem => `<option>${escapeHtml(sem)}</option>`).join("");
  $("driveLink").href = state.guide.driveLink || "#";
  $("semesterCards").innerHTML = semesters.map(sem => {
    const info = state.guide.academic[sem] || {};
    const subjects = (info.subjects || []).map(s => `<span class="chip">${escapeHtml(s)}</span>`).join("");
    return `<article class="item"><h3>${escapeHtml(sem)}</h3><div class="chips">${subjects}</div><p class="item-meta">${escapeHtml(info.notes || "")}</p></article>`;
  }).join("");
}
function renderCampus(){
  const categories = ["All", ...new Set(state.locations.map(p => p.category || "Other"))].sort();
  const previous = $("categoryFilter").value || "All";
  $("categoryFilter").innerHTML = categories.map(cat => `<option${cat === previous ? " selected" : ""}>${escapeHtml(cat)}</option>`).join("");
  renderLocationList();
  renderRouteOptions();
  if(state.map) renderMapMarkers();
}
function filteredLocations(){
  const query = $("locationSearch").value.trim().toLowerCase();
  const category = $("categoryFilter").value || "All";
  return state.locations.filter(place => {
    const inCategory = category === "All" || place.category === category;
    const text = `${place.name} ${place.category} ${place.note}`.toLowerCase();
    return inCategory && (!query || text.includes(query));
  });
}
function renderLocationList(){
  const places = filteredLocations();
  $("locationList").innerHTML = places.map(place => `
    <button class="place-card ${place.id === state.selectedLocationId ? "active" : ""}" data-place="${escapeHtml(place.id)}">
      <strong>${escapeHtml(place.name)}</strong>
      <div class="item-meta">${escapeHtml(place.category)} · ${escapeHtml(place.note || "")}</div>
    </button>
  `).join("") || `<p class="item-meta">No matching places.</p>`;
  document.querySelectorAll("[data-place]").forEach(card => card.addEventListener("click", () => selectLocation(card.dataset.place, true)));
}
function renderRouteOptions(){
  const options = state.locations.map(place => `<option value="${escapeHtml(place.id)}">${escapeHtml(place.name)}</option>`).join("");
  $("routeFrom").innerHTML = options;
  $("routeTo").innerHTML = options;
  $("routeFrom").value = state.locations[0]?.id || "";
  $("routeTo").value = state.locations[1]?.id || state.locations[0]?.id || "";
}
function initMap(){
  if(state.map) return;
  if(!window.L){
    renderStaticMap();
    return;
  }
  state.map = L.map("map", {zoomControl:false}).setView([8.5441425, 76.9043013], 17);
  L.control.zoom({position:"bottomright"}).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 22,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(state.map);
  L.rectangle([[8.5404036,76.9011804],[8.5480437,76.9083942]], {
    color:"#0b5cab",
    weight:2,
    fillOpacity:.04,
    dashArray:"6 6"
  }).addTo(state.map);
  renderMapMarkers();
  setTimeout(() => state.map.invalidateSize(), 80);
}
function renderMapMarkers(){
  if(!window.L && !state.map) return renderStaticMap();
  if(!state.map) return;
  state.markers.forEach(marker => marker.remove());
  state.markers.clear();
  filteredLocations().forEach(place => {
    const marker = L.marker([place.lat, place.lng]).addTo(state.map).bindPopup(`<strong>${escapeHtml(place.name)}</strong><br>${escapeHtml(place.note || "")}`);
    marker.on("click", () => selectLocation(place.id, false));
    state.markers.set(place.id, marker);
  });
}
function mapPoint(place){
  const bounds = {minLat:8.5404036, maxLat:8.5480437, minLng:76.9011804, maxLng:76.9083942};
  const x = ((place.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 82 + 9;
  const y = (1 - ((place.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat))) * 76 + 12;
  return {x: Math.max(6, Math.min(94, x)), y: Math.max(8, Math.min(92, y))};
}
function renderStaticMap(route){
  const mapEl = $("map");
  const places = filteredLocations();
  mapEl.classList.add("static-map");
  mapEl.innerHTML = places.map(place => {
    const point = mapPoint(place);
    const active = place.id === state.selectedLocationId ? " active" : "";
    return `<button class="static-pin${active}" data-static-place="${escapeHtml(place.id)}" style="left:${point.x}%;top:${point.y}%;" title="${escapeHtml(place.name)}">${escapeHtml((place.category || "?").slice(0,1))}</button>`;
  }).join("");
  if(route){
    const a = mapPoint(route.from);
    const b = mapPoint(route.to);
    const rect = mapEl.getBoundingClientRect();
    const ax = rect.width * a.x / 100;
    const ay = rect.height * a.y / 100;
    const bx = rect.width * b.x / 100;
    const by = rect.height * b.y / 100;
    const length = Math.hypot(bx - ax, by - ay);
    const angle = Math.atan2(by - ay, bx - ax) * 180 / Math.PI;
    mapEl.insertAdjacentHTML("beforeend", `<div class="static-route" style="left:${a.x}%;top:${a.y}%;width:${length}px;transform:rotate(${angle}deg);"></div>`);
  }
  document.querySelectorAll("[data-static-place]").forEach(pin => pin.addEventListener("click", () => selectLocation(pin.dataset.staticPlace, false)));
}
function selectLocation(id, openPopup){
  state.selectedLocationId = id;
  const place = state.locations.find(item => item.id === id);
  renderLocationList();
  fillLocationEditor(place);
  if(state.map && place){
    state.map.setView([place.lat, place.lng], 18);
    const marker = state.markers.get(id);
    if(openPopup && marker) marker.openPopup();
  }
}
function fillLocationEditor(place){
  if(!place) return;
  $("editLocationName").value = place.name || "";
  $("editLocationCategory").value = place.category || "";
  $("editLocationLat").value = place.lat || "";
  $("editLocationLng").value = place.lng || "";
  $("editLocationNote").value = place.note || "";
}
function fitMap(){
  initMap();
  if(!window.L) return renderStaticMap();
  const places = filteredLocations();
  if(!places.length) return;
  state.map.fitBounds(places.map(p => [p.lat, p.lng]), {padding:[35,35]});
}
function drawRoute(){
  initMap();
  const from = state.locations.find(p => p.id === $("routeFrom").value);
  const to = state.locations.find(p => p.id === $("routeTo").value);
  if(!from || !to || from.id === to.id) return;
  if(!window.L){
    renderStaticMap({from, to});
    const meters = distance(from, to);
    $("routeSummary").textContent = `${from.name} to ${to.name}: about ${formatDistance(meters)} and ${Math.max(1, Math.round(meters / 80))} min walking.`;
    return;
  }
  if(state.routeLine) state.routeLine.remove();
  const points = [[from.lat, from.lng], [(from.lat + to.lat) / 2, from.lng], [to.lat, to.lng]];
  state.routeLine = L.polyline(points, {color:"#15a37f", weight:5}).addTo(state.map);
  state.map.fitBounds(points, {padding:[40,40]});
  const meters = distance(from, to);
  $("routeSummary").textContent = `${from.name} to ${to.name}: about ${formatDistance(meters)} and ${Math.max(1, Math.round(meters / 80))} min walking.`;
}
function distance(a,b){
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const lat1 = a.lat * rad;
  const lat2 = b.lat * rad;
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng/2)**2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h));
}
function formatDistance(meters){
  return meters >= 1000 ? `${(meters / 1000).toFixed(2)} km` : `${Math.round(meters)} m`;
}
function renderCommunity(){
  $("clubsText").textContent = state.guide.clubs || "";
  $("eventsList").innerHTML = (state.guide.events || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("adviceList").innerHTML = (state.guide.advice || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  $("whatsappLink").classList.toggle("hidden", !state.guide.whatsapp);
  $("whatsappLink").href = state.guide.whatsapp || "#";
}
function renderLife(){
  $("libraryTiming").textContent = state.guide.libraryTiming || "";
  $("libraryNotes").textContent = state.guide.libraryNotes || "";
  $("transportText").textContent = state.guide.transport || "";
  $("hostelText").textContent = state.guide.hostel || "";
  $("contactsText").textContent = state.guide.contacts || "";
}
function renderAdmin(){
  const admin = state.user?.role === "admin";
  $("adminLocked").classList.toggle("hidden", admin);
  $("adminTools").classList.toggle("hidden", !admin);
  if(!admin) return;
  $("editLibraryTiming").value = state.guide.libraryTiming || "";
  $("editLibraryNotes").value = state.guide.libraryNotes || "";
  $("editFaculty").value = state.guide.faculty || "";
  $("editClubs").value = state.guide.clubs || "";
  fillLocationEditor(state.locations[0]);
  if(!state.selectedLocationId && state.locations[0]) state.selectedLocationId = state.locations[0].id;
}
async function saveGuide(){
  state.guide = {
    ...state.guide,
    libraryTiming: $("editLibraryTiming").value.trim(),
    libraryNotes: $("editLibraryNotes").value.trim(),
    faculty: $("editFaculty").value.trim(),
    clubs: $("editClubs").value.trim()
  };
  state.guide = await api.saveGuide(state.guide);
  renderAll();
  $("adminStatus").textContent = "Guide saved.";
}
async function saveLocation(){
  const existing = state.locations.find(item => item.id === state.selectedLocationId);
  const name = $("editLocationName").value.trim();
  const body = {
    id: existing?.id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
    category: $("editLocationCategory").value.trim() || "Other",
    lat: Number($("editLocationLat").value),
    lng: Number($("editLocationLng").value),
    note: $("editLocationNote").value.trim()
  };
  const saved = existing ? await api.updateLocation(existing.id, body) : await api.createLocation(body);
  await loadData();
  state.selectedLocationId = saved.id;
  renderAll();
  $("adminStatus").textContent = "Location saved.";
}
function newLocation(){
  state.selectedLocationId = "";
  $("editLocationName").value = "New Location";
  $("editLocationCategory").value = "Other";
  $("editLocationLat").value = "8.544142";
  $("editLocationLng").value = "76.904301";
  $("editLocationNote").value = "";
}
function showSection(id){
  document.querySelectorAll(".section").forEach(section => section.classList.toggle("active", section.id === id));
  document.querySelectorAll("#nav button").forEach(button => button.classList.toggle("active", button.dataset.section === id));
  $("pageTitle").textContent = pageTitles[id] || "Overview";
  if(id === "campus") {
    initMap();
    setTimeout(() => state.map?.invalidateSize(), 120);
  }
}
function renderSearch(){
  const query = $("globalSearch").value.trim().toLowerCase();
  const rows = [];
  if(query){
    for(const [section, text] of [
      ["academics", JSON.stringify(state.guide.academic || {})],
      ["campus", state.locations.map(p => `${p.name} ${p.category} ${p.note}`).join(" ")],
      ["community", `${state.guide.clubs} ${(state.guide.events || []).join(" ")} ${(state.guide.advice || []).join(" ")}`],
      ["life", `${state.guide.libraryNotes} ${state.guide.transport} ${state.guide.hostel} ${state.guide.contacts}`]
    ]){
      if(text.toLowerCase().includes(query)) rows.push(section);
    }
  }
  $("searchResults").classList.toggle("hidden", !rows.length);
  $("searchResults").innerHTML = rows.map(section => `<button class="result-row" data-result="${section}">${pageTitles[section]} matches "${escapeHtml(query)}"</button>`).join("");
  document.querySelectorAll("[data-result]").forEach(row => row.addEventListener("click", () => showSection(row.dataset.result)));
}
function exportGuide(){
  const blob = new Blob([JSON.stringify({guide:state.guide, locations:state.locations}, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cet-campus-guide-export.json";
  link.click();
  URL.revokeObjectURL(url);
}
async function logout(){
  await api.logout();
  state.user = null;
  $("appView").classList.add("hidden");
  $("authView").classList.remove("hidden");
}
function bindEvents(){
  document.querySelectorAll("[data-auth-mode]").forEach(btn => btn.addEventListener("click", () => setAuthMode(btn.dataset.authMode)));
  $("authForm").addEventListener("submit", authenticate);
  $("demoBtn").addEventListener("click", createDemo);
  $("logoutBtn").addEventListener("click", logout);
  document.querySelectorAll("#nav button").forEach(btn => btn.addEventListener("click", () => showSection(btn.dataset.section)));
  $("locationSearch").addEventListener("input", () => { renderLocationList(); renderMapMarkers(); });
  $("categoryFilter").addEventListener("change", () => { renderLocationList(); renderMapMarkers(); });
  $("fitBtn").addEventListener("click", fitMap);
  $("routeBtn").addEventListener("click", drawRoute);
  $("globalSearch").addEventListener("input", renderSearch);
  $("exportBtn").addEventListener("click", exportGuide);
  $("saveGuideBtn").addEventListener("click", saveGuide);
  $("saveLocationBtn").addEventListener("click", saveLocation);
  $("newLocationBtn").addEventListener("click", newLocation);
}
async function start(){
  bindEvents();
  setAuthMode("login");
  try{
    const session = await api.session();
    if(session.user){
      state.user = session.user;
      await enterApp();
    }
  }catch(err){
    setStatus("Start the backend server to use the app.", true);
  }
}
start();
