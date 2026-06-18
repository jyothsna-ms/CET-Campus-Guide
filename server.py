:root{
  --bg:#f4f6f8;
  --panel:#ffffff;
  --ink:#142033;
  --muted:#6a7688;
  --line:#dde4ec;
  --primary:#0b5cab;
  --primary-dark:#083d73;
  --accent:#15a37f;
  --gold:#c99b2f;
  --danger:#b42318;
  --radius:8px;
  --shadow:0 18px 50px rgba(20,32,51,.12);
}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;font-family:Inter,Segoe UI,Arial,sans-serif;color:var(--ink);background:var(--bg)}
button,input,select,textarea{font:inherit}
button,.link-button{border:0;border-radius:var(--radius);padding:10px 13px;font-weight:800;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.primary{background:var(--primary);color:#fff}
.primary:hover{background:var(--primary-dark)}
.secondary{background:#eaf3ff;color:var(--primary);border:1px solid #cfe1f7}
.ghost{background:#fff;color:#435167;border:1px solid var(--line)}
.hidden{display:none!important}
.eyebrow{margin:0 0 8px;text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:900;color:var(--accent)}
.auth-view{min-height:100vh;display:grid;grid-template-columns:minmax(0,1fr) 440px;background:#101827}
.auth-art{padding:36px;color:#fff;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(90deg,rgba(8,26,52,.96),rgba(8,26,52,.62)),url("campus-story.jpeg") center/cover no-repeat}
.brand-lockup{display:flex;align-items:center;gap:12px;font-weight:900}
.brand-lockup img{width:48px;height:48px;object-fit:contain;border-radius:8px;padding:5px;background:#fff;border:1px solid rgba(255,255,255,.65)}
.brand-lockup.compact{color:var(--ink);padding:16px 16px 12px}
.brand-lockup.compact img{width:38px;height:38px;border-color:var(--line)}
.auth-art h1{font-size:62px;line-height:1;margin:0 0 16px;letter-spacing:0;max-width:720px}
.hero-copy{font-size:18px;line-height:1.55;color:rgba(255,255,255,.82);max-width:650px;margin:0}
.auth-panel{display:grid;place-items:center;padding:24px;background:#fff}
.auth-card{width:100%;display:grid;gap:13px}
.auth-card h2{margin:8px 0 0;font-size:30px}
.auth-card p{margin:0;color:var(--muted);line-height:1.45}
.segmented{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:4px;border:1px solid var(--line);border-radius:var(--radius);background:#f7f9fc}
.segmented button{background:transparent;color:var(--muted)}
.segmented button.active{background:#fff;color:var(--ink);box-shadow:0 6px 18px rgba(20,32,51,.08)}
label{display:grid;gap:7px;font-size:12px;text-transform:uppercase;letter-spacing:.04em;font-weight:900;color:var(--muted)}
input,select,textarea{width:100%;border:1px solid var(--line);border-radius:var(--radius);padding:11px 12px;background:#fff;color:var(--ink);outline:0;text-transform:none;letter-spacing:0;font-weight:500}
textarea{min-height:92px;resize:vertical}
input:focus,select:focus,textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(11,92,171,.13)}
.status{min-height:20px;color:var(--muted);font-size:13px;line-height:1.4;text-transform:none;letter-spacing:0;font-weight:700}
.app-view{min-height:100vh;display:grid;grid-template-columns:248px minmax(0,1fr)}
.sidebar{position:sticky;top:0;height:100vh;background:#fff;border-right:1px solid var(--line);display:grid;grid-template-rows:auto 1fr auto}
nav{padding:8px;display:grid;gap:4px;align-content:start}
nav button{justify-content:flex-start;background:transparent;color:#48576b}
nav button.active{background:#eef6ff;color:var(--primary)}
.user-box{margin:12px;padding:12px;border:1px solid var(--line);border-radius:var(--radius);display:grid;gap:8px;background:#f8fafc}
.user-box span{color:var(--muted);font-size:13px}
.content{min-width:0;padding:22px}
.topbar{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:18px}
.topbar h1{margin:0;font-size:31px}
.top-actions{display:flex;gap:8px;align-items:center}
.top-actions input{width:min(310px,32vw)}
.section{display:none}
.section.active{display:block}
.home-hero{min-height:280px;padding:28px;border-radius:var(--radius);color:#fff;background:linear-gradient(90deg,rgba(8,45,82,.96),rgba(8,45,82,.64)),url("campus-building.jpeg") center/cover no-repeat;display:flex;align-items:end;margin-bottom:14px;box-shadow:var(--shadow)}
.home-hero h2{font-size:42px;line-height:1.06;margin:0 0 10px;max-width:750px}
.home-hero p{margin:0;max-width:720px;color:rgba(255,255,255,.84);line-height:1.5}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}
.grid.six{grid-template-columns:repeat(3,minmax(0,1fr));margin-bottom:12px}
.panel,.feature,.results{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:0 8px 26px rgba(20,32,51,.06);padding:15px}
.feature{cursor:pointer;text-align:left;display:grid;gap:8px}
.feature:hover{border-color:#b7d4f2;box-shadow:0 14px 34px rgba(20,32,51,.1)}
.feature strong{font-size:16px}
.feature span,.panel p,.section-head p,.item-meta{color:var(--muted);line-height:1.45}
.section-head{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:14px}
.section-head h2{font-size:30px;margin:0}
.section-head p{margin:6px 0 0}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid var(--line);background:#f7fafc;border-radius:999px;padding:6px 10px;font-size:13px;font-weight:800;color:#415066}
.toolbar{display:flex;gap:8px;margin-bottom:12px;align-items:center}
.toolbar select{max-width:180px}
.item{border:1px solid var(--line);border-radius:var(--radius);padding:12px;background:#fff}
.item h3{margin:0 0 8px;font-size:16px}
.campus-layout{display:grid;grid-template-columns:340px 1fr;gap:12px;min-height:620px}
.map-list{display:grid;grid-template-rows:auto auto 1fr;gap:10px;min-height:0}
.stack{display:grid;gap:8px;align-content:start;overflow:auto}
.place-card{border:1px solid var(--line);border-radius:var(--radius);padding:11px;background:#fff;cursor:pointer}
.place-card.active{border-color:var(--primary);box-shadow:0 0 0 3px rgba(11,92,171,.12)}
.map-shell{position:relative;display:grid;grid-template-rows:auto 1fr auto;min-height:620px;background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}
.route-bar{display:grid;grid-template-columns:1fr 1fr auto auto;gap:8px;padding:10px;border-bottom:1px solid var(--line);background:#fff}
.map{min-height:520px}
.static-map{position:relative;min-height:520px;overflow:hidden;background:linear-gradient(135deg,#e7f1ed,#f7fafc 48%,#eaf3ff);border-bottom:1px solid var(--line)}
.static-map:before{content:"";position:absolute;inset:12%;border:2px dashed rgba(11,92,171,.35);border-radius:18px;transform:rotate(-8deg)}
.static-pin{position:absolute;transform:translate(-50%,-100%);border:0;border-radius:999px;background:var(--primary);color:#fff;width:30px;height:30px;font-size:11px;font-weight:900;box-shadow:0 8px 20px rgba(20,32,51,.25);cursor:pointer}
.static-pin.active{background:var(--accent);width:36px;height:36px}
.static-route{position:absolute;height:4px;background:var(--accent);transform-origin:left center;box-shadow:0 3px 10px rgba(21,163,127,.35)}
.map-summary{margin:0;padding:10px 12px;border-top:1px solid var(--line);color:var(--muted)}
ul{margin:0;padding-left:20px;color:var(--muted);line-height:1.7}
.wide{grid-column:1/-1}
.locked{border-color:#ffd5d0;background:#fff7f6;color:var(--danger);font-weight:800}
.results{margin-bottom:12px;display:grid;gap:8px}
.result-row{border:1px solid var(--line);border-radius:var(--radius);padding:10px;background:#fff;cursor:pointer}
@media (max-width:980px){
  .auth-view,.app-view{grid-template-columns:1fr}
  .auth-art{min-height:44vh}
  .auth-art h1{font-size:42px}
  .sidebar{position:static;height:auto}
  nav{grid-template-columns:repeat(3,minmax(0,1fr))}
  .content{padding:16px}
  .campus-layout,.grid,.grid.two,.grid.six{grid-template-columns:1fr}
  .topbar{align-items:stretch;flex-direction:column}
  .top-actions,.route-bar{grid-template-columns:1fr;display:grid}
  .top-actions input{width:100%}
}
@media (max-width:560px){
  .auth-panel,.auth-art{padding:18px}
  .home-hero h2{font-size:31px}
  nav{grid-template-columns:1fr 1fr}
}
import http.server
import socketserver
import json
import os
import urllib.parse
import hmac
import hashlib
import time
import base64
import uuid
PORT = 3000
ROOT = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(ROOT, "public")
DATA_FILE = os.path.join(ROOT, "data", "cet-data.json")
USERS_FILE = os.path.join(ROOT, "data", "users.json")
SECRET = b"cet-guide-demo-secret"
MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml"
}
def read_json(path, fallback):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return fallback
def write_json(path, data):
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print("Error writing JSON:", e)
def hash_password(password, salt=None):
    if salt is None:
        salt = os.urandom(16).hex()
    dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000, dklen=32)
    return f"{salt}:{dk.hex()}"
def verify_password(password, stored):
    if not stored or ":" not in stored:
        return False
    salt, hash_val = stored.split(":")
    next_hash = hash_password(password, salt).split(":")[1]
    return hmac.compare_digest(hash_val, next_hash)
def make_token(user):
    payload_dict = {
        "email": user["email"],
        "role": user["role"],
        "exp": int(time.time() * 1000) + 1000 * 60 * 60 * 8
    }
    payload_str = json.dumps(payload_dict)
    payload_b64 = base64.urlsafe_b64encode(payload_str.encode('utf-8')).decode('utf-8').rstrip('=')
    sig = hmac.new(SECRET, payload_b64.encode('utf-8'), hashlib.sha256).digest()
    sig_b64 = base64.urlsafe_b64encode(sig).decode('utf-8').rstrip('=')
    return f"{payload_b64}.{sig_b64}"
def verify_token(token):
    if not token or "." not in token:
        return None
    parts = token.split(".")
    if len(parts) != 2:
        return None
    payload, sig = parts
    # Re-calculate signature
    expected_sig = hmac.new(SECRET, payload.encode('utf-8'), hashlib.sha256).digest()
    expected_sig_b64 = base64.urlsafe_b64encode(expected_sig).decode('utf-8').rstrip('=')
    if not hmac.compare_digest(sig, expected_sig_b64):
        return None
    try:
        # Add padding back
        rem = len(payload) % 4
        if rem > 0:
            payload += "=" * (4 - rem)
        data = json.loads(base64.urlsafe_b64decode(payload.encode('utf-8')).decode('utf-8'))
        if data["exp"] < int(time.time() * 1000):
            return None
        return data
    except Exception:
        return None
class Handler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        # Allow CORS preflight and credentials
        self.send_header("Access-Control-Allow-Origin", self.headers.get("Origin", "*"))
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "content-type,authorization,cookie")
        self.send_header("Access-Control-Allow-Credentials", "true")
        super().end_headers()
    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()
    def send_json(self, status, data, headers=None):
        self.send_response(status)
        self.send_header("Content-Type", MIME[".json"])
        if headers:
            for k, v in headers.items():
                self.send_header(k, v)
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    def get_cookie(self, name):
        cookie_header = self.headers.get("Cookie", "")
        for item in cookie_header.split(";"):
            item = item.strip()
            if "=" in item:
                k, v = item.split("=", 1)
                if k == name:
                    return urllib.parse.unquote(v)
        return None
    def read_body(self):
        length = int(self.headers.get('Content-Length', 0))
        if length == 0:
            return {}
        body = self.rfile.read(length).decode('utf-8')
        try:
            return json.loads(body)
        except Exception:
            return {}
    def do_GET(self):
        url = urllib.parse.urlparse(self.path)
        path_str = url.path
        
        if path_str.startswith("/api/"):
            self.handle_api_get(path_str)
        else:
            self.serve_static(path_str)
    def do_POST(self):
        url = urllib.parse.urlparse(self.path)
        path_str = url.path
        if path_str.startswith("/api/"):
            self.handle_api_post(path_str)
        else:
            self.send_json(404, {"error": "Not found"})
    def do_PUT(self):
        url = urllib.parse.urlparse(self.path)
        path_str = url.path
        if path_str.startswith("/api/"):
            self.handle_api_put(path_str)
        else:
            self.send_json(404, {"error": "Not found"})
    def do_DELETE(self):
        url = urllib.parse.urlparse(self.path)
        path_str = url.path
        if path_str.startswith("/api/"):
            self.handle_api_delete(path_str)
        else:
            self.send_json(404, {"error": "Not found"})
    def serve_static(self, url_path):
        if url_path == "/":
            url_path = "/index.html"
        
        # Resolve target path in public/
        clean_path = url_path.lstrip("/")
        file_path = os.path.abspath(os.path.join(PUBLIC_DIR, clean_path))
        
        if not file_path.startswith(PUBLIC_DIR):
            self.send_response(403)
            self.end_headers()
            self.wfile.write(b"Forbidden")
            return
        if not os.path.exists(file_path):
            # Fallback to root directory
            fallback_path = os.path.abspath(os.path.join(ROOT, os.path.basename(clean_path)))
            if os.path.exists(fallback_path) and fallback_path.startswith(ROOT):
                file_path = fallback_path
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b"Not found")
                return
        ext = os.path.splitext(file_path)[1].lower()
        mime_type = MIME.get(ext, "application/octet-stream")
        
        try:
            with open(file_path, "rb") as f:
                content = f.read()
            self.send_response(200)
            self.send_header("Content-Type", mime_type)
            self.end_headers()
            self.wfile.write(content)
        except Exception:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(b"Internal Server Error")
    def handle_api_get(self, path_str):
        data = read_json(DATA_FILE, {})
        
        if path_str == "/api/health":
            self.send_json(200, {"ok": True, "service": "cet-guide-backend-python", "time": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})
            return
            
        if path_str == "/api/session":
            user_data = verify_token(self.get_cookie("token"))
            if not user_data:
                self.send_json(401, {"error": "No active session."})
                return
            if user_data["email"] == "admin@cet.edu":
                self.send_json(200, {"user": {"name": "CET Admin", "email": user_data["email"], "role": "admin"}})
                return
            users = read_json(USERS_FILE, [])
            user = next((u for u in users if u["email"] == user_data["email"]), None)
            if not user:
                self.send_json(401, {"error": "User not found."})
                return
            self.send_json(200, {"user": {"name": user["name"], "email": user["email"], "role": user["role"]}})
            return
        if path_str == "/api/guide":
            guide_data = data.get("guide", {
                "checklist": ["Report to Main Block", "Verify certificates", "Get ID card", "Visit CCF"],
                "academic": {
                    "S1": { "subjects": ["Calculus", "Engineering Physics", "Engineering Mechanics"], "notes": "First semester resources" },
                    "S2": { "subjects": ["Vector Calculus", "Engineering Chemistry", "Basic Electrical"], "notes": "Second semester resources" },
                    "S3": { "subjects": ["Discrete Math", "Data Structures", "Logic Design"], "notes": "Third semester CS resources" },
                    "S4": { "subjects": ["Graph Theory", "Computer Org", "Operating Systems"], "notes": "Fourth semester CS resources" }
                },
                "driveLink": "https://drive.google.com/drive/folders/cet-study-drive",
                "clubs": "Technical clubs include IEEE, ISTE, IEEE Computer Society. Arts club organizes annual Sargam festival.",
                "events": ["Fresher Induction Day - Sept 1", "Sargam Festival - Oct 12", "Dhishna Tech Fest - Nov 5"],
                "advice": ["Connect with seniors early", "Don't skip workshops", "Visit the library regularly"],
                "whatsapp": "https://chat.whatsapp.com/cet-freshers-2026",
                "libraryTiming": "9:00 AM - 7:00 PM on weekdays",
                "libraryNotes": "Digital library access is available. Take library card from office.",
                "transport": "College buses cover Sreekaryam, Kazhakootam, Thampanoor, and Nedumangad routes.",
                "hostel": "Men's hostel and Ladies hostel admissions start after first allotment.",
                "contacts": "Principal: principal@cet.ac.in | Hostel warden: hostel@cet.ac.in",
                "faculty": "CS Advisor: Dr. Ajeesh Ramanujan"
            })
            self.send_json(200, guide_data)
            return
        if path_str == "/api/profile":
            user_data = verify_token(self.get_cookie("token"))
            if not user_data:
                self.send_json(401, {"error": "Unauthorized"})
                return
            users = read_json(USERS_FILE, [])
            user = next((u for u in users if u["email"] == user_data["email"]), None) or {"name": "CET User", "email": user_data["email"], "role": user_data["role"]}
            self.send_json(200, {
                "name": user.get("name", ""),
                "email": user.get("email", ""),
                "role": user.get("role", ""),
                "department": user.get("department", ""),
                "phone": user.get("phone", "")
            })
            return
        if path_str == "/api/cet":
            self.send_json(200, data)
            return
        if path_str == "/api/contacts":
            self.send_json(200, data.get("contacts", []))
            return
        if path_str == "/api/hods":
            self.send_json(200, data.get("hods", []))
            return
        if path_str == "/api/facilities":
            self.send_json(200, data.get("facilities", []))
            return
        if path_str == "/api/locations":
            self.send_json(200, data.get("locations", []))
            return
        if path_str == "/api/style-guide":
            self.send_json(200, {"brand": data.get("brand"), "roles": data.get("roles"), "meta": data.get("meta")})
            return
        self.send_json(404, {"error": "API route not found."})
    def handle_api_post(self, path_str):
        data = read_json(DATA_FILE, {})
        body = self.read_body()
        
        if path_str == "/api/auth/signup" or path_str == "/api/auth/register":
            email = str(body.get("email", "")).strip().lower()
            password = str(body.get("password", ""))
            name = str(body.get("name", "Student")).strip()[:80]
            role = str(body.get("role", "student")).strip().lower()
            admin_code = str(body.get("adminCode", "")).strip()
            if "@" not in email or len(password) < 4:
                self.send_json(400, {"error": "Valid email and 4+ character password required."})
                return
            if role == "admin" and admin_code != "admin123":
                self.send_json(403, {"error": "Incorrect admin code."})
                return
            users = read_json(USERS_FILE, [])
            if any(u["email"] == email for u in users):
                self.send_json(409, {"error": "User already exists."})
                return
            user = {
                "id": str(uuid.uuid4()),
                "name": name,
                "email": email,
                "role": role,
                "passwordHash": hash_password(password),
                "createdAt": int(time.time() * 1000)
            }
            users.append(user)
            write_json(USERS_FILE, users)
            token = make_token(user)
            self.send_json(201, {"token": token, "user": {"name": name, "email": email, "role": role}}, {
                "Set-Cookie": f"token={token}; Path=/; HttpOnly; SameSite=Strict"
            })
            return
        if path_str == "/api/auth/login":
            email = str(body.get("email", "")).strip().lower()
            password = str(body.get("password", ""))
            
            if email == "admin@cet.edu" and password == "admin123":
                user = {"name": "CET Admin", "email": email, "role": "admin"}
                token = make_token(user)
                self.send_json(200, {"token": token, "user": user}, {
                    "Set-Cookie": f"token={token}; Path=/; HttpOnly; SameSite=Strict"
                })
                return
            users = read_json(USERS_FILE, [])
            user = next((u for u in users if u["email"] == email), None)
            if not user or not verify_password(password, user.get("passwordHash", "")):
                self.send_json(401, {"error": "Invalid credentials."})
                return
            token = make_token(user)
            self.send_json(200, {"token": token, "user": {"name": user["name"], "email": user["email"], "role": user["role"]}}, {
                "Set-Cookie": f"token={token}; Path=/; HttpOnly; SameSite=Strict"
            })
            return
        if path_str == "/api/auth/logout":
            self.send_json(200, {"ok": True}, {
                "Set-Cookie": "token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
            })
            return
        if path_str == "/api/guide":
            data["guide"] = body
            write_json(DATA_FILE, data)
            self.send_json(200, data["guide"])
            return
        if path_str == "/api/profile":
            user_data = verify_token(self.get_cookie("token"))
            if not user_data:
                self.send_json(401, {"error": "Unauthorized"})
                return
            users = read_json(USERS_FILE, [])
            for u in users:
                if u["email"] == user_data["email"]:
                    u["name"] = body.get("name", u["name"])
                    u["department"] = body.get("department", "")
                    u["phone"] = body.get("phone", "")
                    break
            write_json(USERS_FILE, users)
            self.send_json(200, {"ok": True})
            return
        if path_str == "/api/locations":
            lat = float(body.get("lat", 0))
            lng = float(body.get("lng", 0))
            name = body.get("name")
            if not name or lat == 0 or lng == 0:
                self.send_json(400, {"error": "Location name, lat and lng are required."})
                return
            loc = {
                "id": body.get("id", str(uuid.uuid4())),
                "name": str(name)[:120],
                "category": str(body.get("category", "Other"))[:40],
                "icon": str(body.get("icon", body.get("category", "Other")))[:40],
                "lat": lat,
                "lng": lng,
                "note": str(body.get("note", ""))[:600],
                "faculty": str(body.get("faculty", ""))[:180],
                "clubDetails": str(body.get("clubDetails", ""))[:400],
                "updatedAt": int(time.time() * 1000)
            }
            data["locations"] = [loc] + data.get("locations", [])
            write_json(DATA_FILE, data)
            self.send_json(201, loc)
            return
        self.send_json(404, {"error": "API route not found."})
    def handle_api_put(self, path_str):
        data = read_json(DATA_FILE, {})
        body = self.read_body()
        if path_str.startswith("/api/locations/"):
            loc_id = path_str.split("/")[-1]
            lat = float(body.get("lat", 0))
            lng = float(body.get("lng", 0))
            name = body.get("name")
            if not name or lat == 0 or lng == 0:
                self.send_json(400, {"error": "Location name, lat and lng are required."})
                return
            loc = {
                "id": loc_id,
                "name": str(name)[:120],
                "category": str(body.get("category", "Other"))[:40],
                "icon": str(body.get("icon", body.get("category", "Other")))[:40],
                "lat": lat,
                "lng": lng,
                "note": str(body.get("note", ""))[:600],
                "faculty": str(body.get("faculty", ""))[:180],
                "clubDetails": str(body.get("clubDetails", ""))[:400],
                "updatedAt": int(time.time() * 1000)
            }
            locs = data.get("locations", [])
            for i, item in enumerate(locs):
                if item["id"] == loc_id:
                    locs[i] = loc
                    break
            else:
                locs.append(loc)
            data["locations"] = locs
            write_json(DATA_FILE, data)
            self.send_json(200, loc)
            return
        self.send_json(404, {"error": "API route not found."})
    def handle_api_delete(self, path_str):
        data = read_json(DATA_FILE, {})
        if path_str.startswith("/api/locations/"):
            loc_id = path_str.split("/")[-1]
            locs = data.get("locations", [])
            data["locations"] = [item for item in locs if item["id"] != loc_id]
            write_json(DATA_FILE, data)
            self.send_json(200, {"ok": True})
            return
        self.send_json(404, {"error": "API route not found."})
if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"CET Guide running (Python) at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
