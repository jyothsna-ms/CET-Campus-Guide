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
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "content-type": MIME[".json"],
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization"
  });
  res.end(JSON.stringify(data));
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
  if (req.method === "GET" && url.pathname === "/api/cet") return sendJson(res, 200, data);
  if (req.method === "GET" && url.pathname === "/api/contacts") return sendJson(res, 200, data.contacts || []);
  if (req.method === "GET" && url.pathname === "/api/hods") return sendJson(res, 200, data.hods || []);
  if (req.method === "GET" && url.pathname === "/api/facilities") return sendJson(res, 200, data.facilities || []);
  if (req.method === "GET" && url.pathname === "/api/locations") return sendJson(res, 200, data.locations || []);
  if (req.method === "GET" && url.pathname === "/api/style-guide") {
    return sendJson(res, 200, { brand: data.brand, roles: data.roles, meta: data.meta });
  }

  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    const body = await parseBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const name = String(body.name || "Student").trim().slice(0, 80);
    if (!email.includes("@") || password.length < 4) return sendJson(res, 400, { error: "Valid email and 4+ character password required." });
    const users = readJson(USERS_FILE, []);
    if (users.some(user => user.email === email)) return sendJson(res, 409, { error: "User already exists." });
    const user = { id: crypto.randomUUID(), name, email, role: "student", passwordHash: hashPassword(password), createdAt: Date.now() };
    users.push(user);
    writeJson(USERS_FILE, users);
    return sendJson(res, 201, { token: makeToken(user), user: { name, email, role: user.role } });
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    const body = await parseBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (email === "admin@cet.edu" && password === "admin123") {
      return sendJson(res, 200, { token: makeToken({ email, role: "admin" }), user: { name: "CET Admin", email, role: "admin" } });
    }
    const users = readJson(USERS_FILE, []);
    const user = users.find(item => item.email === email);
    if (!user || !verifyPassword(password, user.passwordHash)) return sendJson(res, 401, { error: "Invalid credentials." });
    return sendJson(res, 200, { token: makeToken(user), user: { name: user.name, email: user.email, role: user.role } });
  }

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

function serveStatic(req, res, url) {
  const filePath = routePath(url.pathname);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      return res.end("Not found");
    }
    res.writeHead(200, { "content-type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(content);
  });
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    serveStatic(req, res, url);
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
}).listen(PORT, () => {
  console.log(`CET Guide running at http://localhost:${PORT}`);
});
