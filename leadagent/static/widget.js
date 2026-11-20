/* LeadDesk AI chat widget. Add to any website:
   <script src="https://YOUR-SERVER/widget.js" data-tenant="demo-clinic"></script> */
(function () {
  var me = document.currentScript;
  var base = new URL(me.src).origin;
  var tenant = me.getAttribute("data-tenant");
  var color = me.getAttribute("data-color") || "#0f766e";
  var title = me.getAttribute("data-title") || "Chat with us";
  var greeting = me.getAttribute("data-greeting") || "Hi! How can I help you today?";
  var key = "leaddesk_session_" + tenant;
  var sid;
  try { sid = localStorage.getItem(key); } catch (e) {}
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    try { localStorage.setItem(key, sid); } catch (e) {}
  }

  var css = document.createElement("style");
  css.textContent =
    ".ld-btn{position:fixed;right:16px;bottom:16px;width:56px;height:56px;border-radius:50%;border:0;color:#fff;font-size:26px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:99999}" +
    ".ld-box{position:fixed;right:16px;bottom:84px;width:min(360px,calc(100vw - 32px));height:min(520px,calc(100vh - 120px));background:#fff;color:#111;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;z-index:99999;font:14px/1.4 system-ui,sans-serif}" +
    ".ld-head{color:#fff;padding:12px 14px;font-weight:600}" +
    ".ld-log{flex:1;overflow-y:auto;padding:12px;background:#f6f7f8}" +
    ".ld-m{max-width:80%;padding:8px 11px;border-radius:12px;margin:4px 0;white-space:pre-wrap;word-wrap:break-word}" +
    ".ld-u{margin-left:auto;color:#fff}.ld-a{background:#fff;border:1px solid #e3e5e8}" +
    ".ld-form{display:flex;border-top:1px solid #e3e5e8}" +
    ".ld-form input{flex:1;border:0;padding:12px;font:inherit;outline:none;color:#111;background:#fff}" +
    ".ld-form button{border:0;color:#fff;padding:0 16px;font:inherit;cursor:pointer}";
  document.head.appendChild(css);

  var btn = document.createElement("button");
  btn.className = "ld-btn"; btn.style.background = color; btn.textContent = "💬";
  btn.setAttribute("aria-label", title);
  var box = document.createElement("div");
  box.className = "ld-box";
  box.innerHTML = '<div class="ld-head"></div><div class="ld-log"></div>' +
    '<form class="ld-form"><input placeholder="Type a message…" maxlength="2000"><button>Send</button></form>';
  box.querySelector(".ld-head").textContent = title;
  box.querySelector(".ld-head").style.background = color;
  box.querySelector(".ld-form button").style.background = color;
  document.body.appendChild(box); document.body.appendChild(btn);

  var log = box.querySelector(".ld-log"), input = box.querySelector("input");
  function add(text, who) {
    var d = document.createElement("div");
    d.className = "ld-m " + (who === "u" ? "ld-u" : "ld-a");
    if (who === "u") d.style.background = color;
    d.textContent = text; log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
  }
  add(greeting, "a");
  btn.onclick = function () {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    if (box.style.display === "flex") input.focus();
  };
  box.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    var text = input.value.trim(); if (!text) return;
    input.value = ""; add(text, "u");
    var typing = add("…", "a");
    fetch(base + "/api/chat/" + encodeURIComponent(tenant), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sid, message: text })
    }).then(function (r) { return r.json(); })
      .then(function (d) { typing.textContent = d.reply || "Sorry, please try again."; })
      .catch(function () { typing.textContent = "Connection problem. Please try again."; });
  };
})();
