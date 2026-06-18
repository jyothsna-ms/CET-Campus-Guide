const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_FILE = path.join(ROOT, "data", "cet-data.json");
const USERS_FILE = path.join(ROOT, "data", "users.json");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};
function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}
function writeJson(file, data) {
  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing JSON file:", err);
  }
}
function sendJson(res, status, data) {
  res.writeHead(status, {
    "content-type": MIME[".json"],
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization,cookie",
    "access-control-allow-credentials": "true"
  });
  res.end(JSON.stringify(data));
}
function getCookie(req, name) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = cookieHeader.split(";").map(c => c.trim().split("="));
  const match = cookies.find(([k]) => k === name);
  return match ? decodeURIComponent(match[1]) : null;
}
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}
function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 100000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const next = hashPassword(password, salt).split(":")[1];
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(next));
}
function makeToken(user) {
  const payload = Buffer.from(JSON.stringify({
    email: user.email,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 8
  })).toString("base64url");
  const sig = crypto.createHmac("sha256", "cet-guide-demo-secret").update(payload).digest("base64url");
  return `${payload}.${sig}`;
}
function verifyToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const nextSig = crypto.createHmac("sha256", "cet-guide-demo-secret").update(payload).digest("base64url");
  if (sig !== nextSig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
function sanitizeLocation(input) {
  const lat = Number(input.lat);
  const lng = Number(input.lng);
  if (!input.name || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return {
    id: String(input.id || crypto.randomUUID()),
    name: String(input.name).slice(0, 120),
    category: String(input.category || "Other").slice(0, 40),
    icon: String(input.icon || input.category || "Other").slice(0, 40),
    lat,
    lng,
    note: String(input.note || "").slice(0, 600),
    faculty: String(input.faculty || "").slice(0, 180),
    clubDetails: String(input.clubDetails || "").slice(0, 400),
    updatedAt: Date.now()
  };
}
function routePath(urlPath) {
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  return path.join(PUBLIC_DIR, safePath === "/" ? "index.html" : safePath);
}
async function handleApi(req, res, url) {
  const data = readJson(DATA_FILE, {});
  if (req.method === "OPTIONS") return sendJson(res, 204, {});
  if (req.method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, service: "cet-guide-backend", time: new Date().toISOString() });
  }
  // Session route
  if (req.method === "GET" && url.pathname === "/api/session") {
    const userData = verifyToken(getCookie(req, "token"));
    if (!userData) return sendJson(res, 401, { error: "No active session." });
    
    if (userData.email === "admin@cet.edu") {
      return sendJson(res, 200, { user: { name: "CET Admin", email: userData.email, role: "admin" } });
    }
    
    const users = readJson(USERS_FILE, []);
    const user = users.find(u => u.email === userData.email);
    if (!user) return sendJson(res, 401, { error: "User not found." });
    
    return sendJson(res, 200, { user: { name: user.name, email: user.email, role: user.role } });
  }
  // Guide routes
  if (url.pathname === "/api/guide" && req.method === "GET") {
    const guideData = data.guide || {
      checklist: ["Report to Main Block", "Verify certificates", "Get ID card", "Visit CCF"],
      academic: {
        "S1": { subjects: ["Calculus", "Engineering Physics", "Engineering Mechanics"], notes: "First semester resources" },
        "S2": { subjects: ["Vector Calculus", "Engineering Chemistry", "Basic Electrical"], notes: "Second semester resources" },
        "S3": { subjects: ["Discrete Math", "Data Structures", "Logic Design"], notes: "Third semester CS resources" },
        "S4": { subjects: ["Graph Theory", "Computer Org", "Operating Systems"], notes: "Fourth semester CS resources" }
      },
      driveLink: "https://drive.google.com/drive/folders/cet-study-drive",
      clubs: "Technical clubs include IEEE, ISTE, IEEE Computer Society. Arts club organizes annual Sargam festival.",
      events: ["Fresher Induction Day - Sept 1", "Sargam Festival - Oct 12", "Dhishna Tech Fest - Nov 5"],
      advice: ["Connect with seniors early", "Don't skip workshops", "Visit the library regularly"],
      whatsapp: "https://chat.whatsapp.com/cet-freshers-2026",
      libraryTiming: "9:00 AM - 7:00 PM on weekdays",
      libraryNotes: "Digital library access is available. Take library card from office.",
      transport: "College buses cover Sreekaryam, Kazhakootam, Thampanoor, and Nedumangad routes.",
      hostel: "Men's hostel and Ladies hostel admissions start after first allotment.",
      contacts: "Principal: principal@cet.ac.in | Hostel warden: hostel@cet.ac.in",
      faculty: "CS Advisor: Dr. Ajeesh Ramanujan"
    };
    return sendJson(res, 200, guideData);
  }
  if (url.pathname === "/api/guide" && req.method === "POST") {
    const body = await parseBody(req);
    data.guide = body;
    writeJson(DATA_FILE, data);
    return sendJson(res, 200, data.guide);
  }
  // Profile routes
  if (url.pathname === "/api/profile" && req.method === "GET") {
    const userData = verifyToken(getCookie(req, "token"));
    if (!userData) return sendJson(res, 401, { error: "Unauthorized" });
    const users = readJson(USERS_FILE, []);
    const user = users.find(u => u.email === userData.email) || { name: "CET User", email: userData.email, role: userData.role };
    return sendJson(res, 200, { name: user.name, email: user.email, role: user.role, department: user.department || "", phone: user.phone || "" });
  }
  if (url.pathname === "/api/profile" && req.method === "POST") {
    const userData = verifyToken(getCookie(req, "token"));
    if (!userData) return sendJson(res, 401, { error: "Unauthorized" });
    const body = await parseBody(req);
    const users = readJson(USERS_FILE, []);
    const index = users.findIndex(u => u.email === userData.email);
    if (index !== -1) {
      users[index] = { ...users[index], name: body.name || users[index].name, department: body.department, phone: body.phone };
      writeJson(USERS_FILE, users);
    }
    return sendJson(res, 200, { ok: true });
  }
  if (req.method === "GET" && url.pathname === "/api/cet") return sendJson(res, 200, data);
  if (req.method === "GET" && url.pathname === "/api/contacts") return sendJson(res, 200, data.contacts || []);
  if (req.method === "GET" && url.pathname === "/api/hods") return sendJson(res, 200, data.hods || []);
  if (req.method === "GET" && url.pathname === "/api/facilities") return sendJson(res, 200, data.facilities || []);
  if (req.method === "GET" && url.pathname === "/api/locations") return sendJson(res, 200, data.locations || []);
  if (req.method === "GET" && url.pathname === "/api/style-guide") {
    return sendJson(res, 200, { brand: data.brand, roles: data.roles, meta: data.meta });
  }
  // Register / Signup
  if (req.method === "POST" && (url.pathname === "/api/auth/signup" || url.pathname === "/api/auth/register")) {
    const body = await parseBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const name = String(body.name || "Student").trim().slice(0, 80);
    const role = String(body.role || "student").trim().toLowerCase();
    const adminCode = String(body.adminCode || "").trim();
    if (!email.includes("@") || password.length < 4) {
      return sendJson(res, 400, { error: "Valid email and 4+ character password required." });
    }
    if (role === "admin" && adminCode !== "admin123") {
      return sendJson(res, 403, { error: "Incorrect admin code." });
    }
    const users = readJson(USERS_FILE, []);
    if (users.some(user => user.email === email)) {
      return sendJson(res, 409, { error: "User already exists." });
    }
    const user = { id: crypto.randomUUID(), name, email, role, passwordHash: hashPassword(password), createdAt: Date.now() };
    users.push(user);
    writeJson(USERS_FILE, users);
    const token = makeToken(user);
    res.writeHead(201, {
      "Content-Type": MIME[".json"],
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "content-type,authorization,cookie",
      "Access-Control-Allow-Credentials": "true"
    });
    return res.end(JSON.stringify({ token, user: { name, email, role } }));
  }
  // Login
  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    const body = await parseBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    
    if (email === "admin@cet.edu" && password === "admin123") {
      const user = { name: "CET Admin", email, role: "admin" };
      const token = makeToken(user);
      res.writeHead(200, {
        "Content-Type": MIME[".json"],
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "content-type,authorization,cookie",
        "Access-Control-Allow-Credentials": "true"
      });
      return res.end(JSON.stringify({ token, user }));
    }
    const users = readJson(USERS_FILE, []);
    const user = users.find(item => item.email === email);
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return sendJson(res, 401, { error: "Invalid credentials." });
    }
    const token = makeToken(user);
    res.writeHead(200, {
      "Content-Type": MIME[".json"],
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "content-type,authorization,cookie",
      "Access-Control-Allow-Credentials": "true"
    });
    return res.end(JSON.stringify({ token, user: { name: user.name, email: user.email, role: user.role } }));
  }
  // Logout
  if (req.method === "POST" && url.pathname === "/api/auth/logout") {
    res.writeHead(200, {
      "Content-Type": MIME[".json"],
      "Set-Cookie": `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "content-type,authorization,cookie",
      "Access-Control-Allow-Credentials": "true"
    });
    return res.end(JSON.stringify({ ok: true }));
  }
  // Locations management
  if (url.pathname === "/api/locations" && req.method === "POST") {
    const next = sanitizeLocation(await parseBody(req));
    if (!next) return sendJson(res, 400, { error: "Location name, lat and lng are required." });
    data.locations = [next, ...(data.locations || [])];
    writeJson(DATA_FILE, data);
    return sendJson(res, 201, next);
  }
  const locationMatch = url.pathname.match(/^\/api\/locations\/([^/]+)$/);
  if (locationMatch && req.method === "PUT") {
    const next = sanitizeLocation({ ...(await parseBody(req)), id: locationMatch[1] });
    if (!next) return sendJson(res, 400, { error: "Location name, lat and lng are required." });
    data.locations = (data.locations || []).map(item => item.id === locationMatch[1] ? next : item);
    writeJson(DATA_FILE, data);
    return sendJson(res, 200, next);
  }
  if (locationMatch && req.method === "DELETE") {
    data.locations = (data.locations || []).filter(item => item.id !== locationMatch[1]);
    writeJson(DATA_FILE, data);
    return sendJson(res, 200, { ok: true });
  }
  sendJson(res, 404, { error: "API route not found." });
}