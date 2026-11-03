// Assembly custom app: "Create your Kickbord login" (step 1 of client setup).
//
// Served as a standalone HTML page (not a React page) on purpose: the site layout loads
// Google Tag Manager and the Meta pixel, which would record the page URL and with it
// Assembly's session token. This page loads no third-party code, strips the token from
// the address bar on load, and can only be framed by Assembly.
//
// Assembly app setup: Client URL = https://www.kickbord.com/assembly/crm-login
// Assembly appends ?token=... The Assembly-built onboarding app instead embeds a signed ?k= link it gets
// from POST /api/crm-login {action:'link'}. The server side lives in the `crm-login` Edge Function.

export const dynamic = 'force-dynamic'

// Where Assembly shows the app. Add the portal's custom domain here if one is set up.
const FRAME_ANCESTORS = [
  'https://dashboard.assembly.com',
  'https://*.assembly.com',
  'https://*.copilot.app',
  ...(process.env.ASSEMBLY_PORTAL_ORIGINS ?? '').split(/[\s,]+/).filter((o) => /^https:\/\/[a-z0-9.*-]+$/i.test(o)),
]

export async function GET(request: Request) {
  // Signed links (?k=) come from the Assembly-built onboarding app, whose sandbox origin is not
  // published. Those links are bound to one client and expire in 30 minutes, so any https parent may
  // frame them. Assembly session tokens (?token=) stay limited to Assembly's own origins.
  const signedLink = new URL(request.url).searchParams.has('k')
  const nonce = crypto.randomUUID().replace(/-/g, '')
  const csp = [
    "default-src 'none'",
    `script-src 'nonce-${nonce}'`,
    `style-src 'nonce-${nonce}'`,
    "connect-src 'self'",
    "img-src 'self' data:",
    "base-uri 'none'",
    "form-action 'none'",
    `frame-ancestors ${signedLink ? 'https:' : FRAME_ANCESTORS.join(' ')}`,
  ].join('; ')
  return new Response(page(nonce), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': csp,
      'Referrer-Policy': 'no-referrer',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

function page(nonce: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Create your Kickbord login</title>
<style nonce="${nonce}">
  :root { --ink:#1a1c14; --muted:#5b5e4c; --soft:#8a8d78; --line:rgba(26,28,20,.12); --bg:#f7f7f2; --card:#fff; --ok:#2f6b3a; --err:#b42318; }
  * { box-sizing: border-box; }
  html, body { margin:0; background:var(--bg); color:var(--ink); font:16px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  main { max-width: 680px; margin: 0 auto; padding: 32px 20px 48px; }
  .eyebrow { font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--soft); margin:0; }
  h1 { font-size:28px; line-height:1.2; letter-spacing:-.01em; margin:6px 0 8px; }
  .lead { color:var(--muted); margin:0 0 24px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:16px; padding:24px; box-shadow:0 1px 2px rgba(26,28,20,.05); }
  .row { display:grid; gap:16px; grid-template-columns:1fr 1fr; }
  @media (max-width: 560px) { .row { grid-template-columns:1fr; } h1 { font-size:24px; } }
  label.f span { display:block; font-size:14px; font-weight:600; margin-bottom:6px; }
  input[type=password], input[type=text] { width:100%; border:1px solid rgba(26,28,20,.2); border-radius:10px; padding:12px 14px; font-size:16px; color:var(--ink); background:#fff; }
  input:focus { outline:none; box-shadow:0 0 0 3px rgba(26,28,20,.15); }
  .show { display:inline-flex; align-items:center; gap:8px; margin-top:12px; font-size:14px; color:var(--muted); }
  ul.rules { list-style:none; padding:0; margin:16px 0 0; display:grid; grid-template-columns:1fr 1fr; gap:4px 16px; font-size:14px; color:var(--soft); }
  @media (max-width: 560px) { ul.rules { grid-template-columns:1fr; } }
  ul.rules li.ok { color:var(--ink); }
  ul.rules li::before { content:"\\2022"; display:inline-block; width:18px; }
  ul.rules li.ok::before { content:"\\2713"; color:var(--ok); }
  .btn { display:inline-flex; align-items:center; gap:6px; border:0; border-radius:999px; background:var(--ink); color:#fff; font-weight:600; font-size:15px; padding:12px 22px; cursor:pointer; text-decoration:none; margin-top:20px; }
  .btn[disabled] { opacity:.6; cursor:default; }
  .note { font-size:13px; color:var(--soft); margin-top:14px; }
  .err { color:var(--err); font-size:14px; margin-top:12px; }
  ol.steps { margin:14px 0 0; padding-left:20px; color:var(--muted); font-size:15px; }
  ol.steps li { margin:4px 0; }
  .check { width:44px; height:44px; border-radius:999px; background:var(--ink); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; margin-bottom:12px; }
  .hidden { display:none; }
  strong { font-weight:600; }
  .m0 { margin:0; } .mb16 { margin:0 0 16px; } .mt8 { margin:8px 0 0; } .muted { color:var(--muted); } .h2 { margin:0; font-size:20px; }
</style>
</head>
<body>
<main>
  <p class="eyebrow">Step 1</p>
  <h1 id="title">Create your Kickbord login</h1>
  <p class="lead" id="lead">One minute. You will use this to sign in to your Kickbord account.</p>

  <div class="card" id="loading"><p class="m0 muted">Loading your account...</p></div>

  <form class="card hidden" id="form" novalidate>
    <p class="mb16">Your login email is <strong id="email"></strong>. Pick the password you will use to sign in.</p>
    <div class="row">
      <label class="f"><span>Password</span><input id="pw" type="password" autocomplete="new-password" maxlength="128"></label>
      <label class="f"><span>Type it again</span><input id="pw2" type="password" autocomplete="new-password" maxlength="128"></label>
    </div>
    <label class="show"><input id="showpw" type="checkbox"> Show password</label>
    <ul class="rules" id="rules"></ul>
    <p class="note">Write it down somewhere safe. We never see or store your password.</p>
    <p class="err hidden" id="err" role="alert"></p>
    <button class="btn" id="submit" type="submit">Create my login</button>
  </form>

  <div class="card hidden" id="done">
    <div class="check">&#10003;</div>
    <h2 class="h2" id="doneTitle">Your login is ready</h2>
    <p class="mt8 muted" id="doneText"></p>
    <ol class="steps" id="doneSteps"></ol>
    <a class="btn" id="crm" href="#" target="_blank" rel="noopener noreferrer">Open your CRM &#8599;</a>
    <p class="note" id="crmText"></p>
  </div>

  <div class="card hidden" id="info"><p class="m0" id="infoText"></p></div>
</main>
<script nonce="${nonce}">
(function () {
  var params = new URLSearchParams(location.search);
  var token = params.get('token') || '';
  var link = params.get('k') || '';
  // Remove the session token / signed link from the address bar and history right away.
  if (params.has('token') || params.has('k')) { params.delete('token'); params.delete('k'); history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : '')); }

  var $ = function (id) { return document.getElementById(id); };
  var RULES = [
    ['12 or more characters', function (p) { return p.length >= 12; }],
    ['An uppercase letter', function (p) { return /[A-Z]/.test(p); }],
    ['A lowercase letter', function (p) { return /[a-z]/.test(p); }],
    ['A number', function (p) { return /[0-9]/.test(p); }],
    ['A symbol, like ! or #', function (p) { return /[^A-Za-z0-9]/.test(p); }],
  ];
  function show(id) { ['loading', 'form', 'done', 'info'].forEach(function (x) { $(x).classList.toggle('hidden', x !== id); }); }
  function info(text) { $('infoText').textContent = text; show('info'); }
  function api(body) {
    if (link) body.k = link; else body.token = token;
    return fetch('/api/crm-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store' })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { status: r.status, data: d }; }); });
  }
  function done(state, email, crmUrl) {
    var created = state === 'created';
    $('title').textContent = created ? 'Your login is ready' : 'You already have a login';
    $('lead').textContent = 'Step 1 is done. You can move on to the next step.';
    $('doneTitle').textContent = created ? 'Your login is ready' : 'You already have a login';
    $('doneText').textContent = '';
    $('doneText').append('Sign in with ');
    var s = document.createElement('strong'); s.textContent = email; $('doneText').append(s);
    $('doneText').append(created ? ' and the password you just picked.' : ' and your existing password.');
    var steps = ['Please open your CRM in a new page: click "Open your CRM" below.', 'The first time, we email you a 6-digit security code. Enter it to finish signing in.'];
    steps.push(created ? 'You may also get an email called "Activate Your Account". You can ignore it.' : 'Forgot your password? Use "Forgot password" on the sign-in page.');
    $('doneSteps').textContent = '';
    steps.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; $('doneSteps').append(li); });
    if (crmUrl && /^https:\\/\\/app\\.kickbord\\.com\\//.test(crmUrl)) $('crm').href = crmUrl; else $('crm').href = 'https://app.kickbord.com/';
    $('crmText').textContent = 'Your CRM address: ' + $('crm').href;
    show('done');
    try { window.parent.postMessage({ type: 'kickbord:crm-login', state: state }, '*'); } catch (e) {}
  }

  RULES.forEach(function (r, i) { var li = document.createElement('li'); li.id = 'r' + i; li.textContent = r[0]; $('rules').append(li); });
  var m = document.createElement('li'); m.id = 'rm'; m.textContent = 'Both passwords match'; $('rules').append(m);
  function check() {
    var p = $('pw').value, q = $('pw2').value;
    RULES.forEach(function (r, i) { $('r' + i).classList.toggle('ok', r[1](p)); });
    $('rm').classList.toggle('ok', p.length > 0 && p === q);
  }
  $('pw').addEventListener('input', check); $('pw2').addEventListener('input', check);
  $('showpw').addEventListener('change', function () { var t = this.checked ? 'text' : 'password'; $('pw').type = t; $('pw2').type = t; });

  if (!token && !link) { info('This page only works inside your Kickbord portal. Please open it from there.'); return; }

  api({ action: 'session' }).then(function (r) {
    var d = r.data || {};
    if (d.state === 'ready') { $('email').textContent = d.email; show('form'); return; }
    if (d.state === 'exists') { done('exists', d.email, d.crmUrl); return; }
    info(d.message || d.error || 'Something went wrong. Please refresh the page.');
  }).catch(function () { info('We could not reach Kickbord. Please check your connection and refresh the page.'); });

  $('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var p = $('pw').value, q = $('pw2').value, err = $('err');
    err.classList.add('hidden');
    if (!RULES.every(function (r) { return r[1](p); })) { err.textContent = 'Your password does not meet all the rules yet.'; err.classList.remove('hidden'); return; }
    if (p !== q) { err.textContent = 'The two passwords do not match.'; err.classList.remove('hidden'); return; }
    $('submit').disabled = true; $('submit').textContent = 'Creating your login...';
    api({ action: 'create', password: p }).then(function (r) {
      var d = r.data || {};
      if (d.state === 'created' || d.state === 'exists') { $('pw').value = ''; $('pw2').value = ''; done(d.state, d.email, d.crmUrl); return; }
      err.textContent = d.error || 'We could not create your login. Please try again.'; err.classList.remove('hidden');
    }).catch(function () {
      err.textContent = 'We could not reach Kickbord. Please try again.'; err.classList.remove('hidden');
    }).finally(function () { $('submit').disabled = false; $('submit').textContent = 'Create my login'; });
  });
})();
</script>
</body>
</html>`
}
