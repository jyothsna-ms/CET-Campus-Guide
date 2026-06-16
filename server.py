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
