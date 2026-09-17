// Отправка заявок: одна функция на панель заявки (разработка) и формы на
// нишах/кейсах. Шлёт JSON в Google Apps Script — тот пишет строку в таблицу
// и уведомляет в Telegram. Токен бота живёт в скрипте, не здесь.
//
// Адрес — ниже, одной строкой. Пока он пустой, форма показывает «спасибо»
// без отправки: чтобы не ломать сайт до того, как скрипт опубликован.
(function () {
  var LEAD_URL = "https://script.google.com/macros/s/AKfycbyTOVOovkTySwERTn3WR3TWvvDSgqTYFHfv8kS5jhftkFxreb5R5pAgnigXsSwC-MzUXA/exec";

  // Cloudflare Turnstile — невидимая капча. Ключ сайта (Site Key) — ниже.
  // Пока пусто, проверка выключена и формы работают как раньше.
  // Секретный ключ живёт только в скрипте Google (TURNSTILE_SECRET).
  var TURNSTILE_SITEKEY = "";
  // на localhost — тестовый ключ Cloudflare: всегда проходит, реальных данных не шлёт
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) && TURNSTILE_SITEKEY) {
    TURNSTILE_SITEKEY = "1x00000000000000000000AA";
  }

  // Токен получаем прямо перед отправкой: скрипт Cloudflare грузится один
  // раз, виджет невидимый и показывается, только если Cloudflare нужно
  // спросить человека. Токен одноразовый — после каждой заявки сбрасываем.
  var tsReady = null;
  var tsWidget = null;
  function loadTurnstile() {
    if (tsReady) return tsReady;
    tsReady = new Promise(function (resolve, reject) {
      if (window.turnstile) return resolve(window.turnstile);
      var s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = function () { resolve(window.turnstile); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return tsReady;
  }

  function getToken() {
    if (!TURNSTILE_SITEKEY) return Promise.resolve("");
    return loadTurnstile().then(function (ts) {
      return new Promise(function (resolve) {
        var done = false;
        var finish = function (token) { if (!done) { done = true; resolve(token || ""); } };
        var box = document.getElementById("lead-turnstile");
        if (!box) {
          box = document.createElement("div");
          box.id = "lead-turnstile";
          // место под окошко проверки, если Cloudflare всё же попросит нажать
          box.style.cssText = "position:fixed;left:50%;bottom:16px;z-index:200;transform:translateX(-50%)";
          document.body.appendChild(box);
        }
        var opts = {
          sitekey: TURNSTILE_SITEKEY,
          execution: "execute",
          appearance: "interaction-only",
          callback: finish,
          "error-callback": function () { finish(""); },
          "timeout-callback": function () { finish(""); }
        };
        if (tsWidget === null) tsWidget = ts.render(box, opts);
        else ts.reset(tsWidget);
        ts.execute(box, opts);
        setTimeout(function () { finish(""); }, 15000);
      });
    }).catch(function () { return ""; });
  }

  // Откуда человек пришёл. Метки кампании (utm_*, yclid, gclid) стоят на
  // первой странице визита, а заявку часто оставляют уже на другой —
  // без этого платная реклама выглядела бы как «заявок нет». Помним на
  // визит: sessionStorage, закрыли вкладку — забыли. Тот же ключ пишет
  // analytics.js, чтобы метка ловилась и на страницах без формы.
  var FIRST_KEY = "mary-first-touch";
  function firstTouch() {
    try {
      var saved = sessionStorage.getItem(FIRST_KEY);
      if (saved) return saved;
      var marked = /[?&](utm_|yclid|gclid|ymclid|fbclid)=/.test(location.search);
      var ref = document.referrer || "";
      var outside = ref && ref.indexOf("//" + location.host) < 0;
      var value = marked ? location.href : (outside ? ref : "");
      if (value) sessionStorage.setItem(FIRST_KEY, value);
      return value;
    } catch (e) {
      return "";
    }
  }
  firstTouch();

  function collect(form) {
    var data = {
      page: location.href,
      source: firstTouch(),
      sent: new Date().toISOString()
    };
    var fd = new FormData(form);
    fd.forEach(function (v, k) {
      if (!v) return;
      // чекбоксы с одним name собираем через запятую
      data[k] = data[k] ? data[k] + ", " + v : v;
    });
    return data;
  }

  // Защита от ботов, невидимая для человека:
  //  — honeypot: поле «website» спрятано; если заполнено — это бот;
  //  — таймер: отправка раньше 3 с после загрузки страницы — тоже бот;
  //  — Cloudflare Turnstile (выше): без годного токена скрипт Google заявку не примет.
  // В обоих случаях делаем вид, что всё ушло, — бот не должен понять.
  var loadedAt = Date.now();
  function looksLikeBot(form) {
    var hp = form.querySelector('[name="website"]');
    if (hp && hp.value) return true;
    if (Date.now() - loadedAt < 3000) return true;
    return false;
  }

  // Возвращает промис; при пустом адресе — резолвится сразу (заглушка).
  window.sendLead = function (form) {
    if (looksLikeBot(form)) return Promise.resolve({ ok: true, bot: true });
    var data = collect(form);
    delete data.website;
    if (!LEAD_URL) {
      console.warn("[lead] LEAD_URL не задан — заявка не отправлена:", data);
      return Promise.resolve({ ok: true, stub: true });
    }
    // text/plain — чтобы не было CORS preflight: Apps Script его не отдаёт
    return getToken().then(function (token) {
      if (token) data.turnstile = token;
      return fetch(LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
      });
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json().catch(function () { return { ok: true }; });
    });
  };
})();
