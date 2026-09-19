// Аналитика: стартует только после согласия на cookie.
//
// Ключ согласия общий с основным сайтом — mary-cookie-consent:
//   "all"       — можно всё, счётчики включаются
//   "necessary" — только необходимое, счётчики не грузятся
//
// Номера ниже. Если оставить пустыми — на страницу не попадёт ни одного
// запроса к Яндексу и Google, и баннер честно ничего не гейтит.
(function () {
  var METRIKA = "112016405";   // Mary — разработка, sales.maryrose.by
  var GA4     = "G-4Q6GN6ZZW6";   // Google Analytics 4, sales.maryrose.by

  var KEY = "mary-cookie-consent";
  var started = false;

  function allowed() {
    try { return window.localStorage.getItem(KEY) === "all"; } catch (e) { return false; }
  }

  function startMetrika(id) {
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = Number(new Date());
    var s = document.createElement("script");
    s.async = true;
    // номер счётчика обязан быть в адресе: без ?id= новый tag.js
    // загружается, но счётчик не инициализирует — визитов просто нет
    s.src = "https://mc.yandex.ru/metrika/tag.js?id=" + id;
    document.head.appendChild(s);
    window.ym(id, "init", {
      ssr: true, webvisor: true, clickmap: true,
      trackLinks: true, accurateTrackBounce: true
    });
  }

  function startGa4(id) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id);
  }

  function start() {
    if (started || !allowed()) return;
    started = true;
    if (METRIKA) startMetrika(Number(METRIKA));
    if (GA4) startGa4(GA4);
  }

  // Цель: заявка отправлена, кнопка нажата и т.п.
  window.track = function (name, params) {
    if (!allowed()) return;
    if (window.ym && METRIKA) window.ym(Number(METRIKA), "reachGoal", name, params || {});
    if (window.gtag) window.gtag("event", name, params || {});
  };

  // Согласие могли дать раньше — тогда стартуем сразу;
  // если дают сейчас, баннер сам позовёт эту функцию.
  window.startAnalytics = start;
  start();
})();

// Первое касание визита — копия механики из src/lib/analytics.js.
// Нужна отдельно: этот файл подключается тегом на лендинге разработки,
// модули сборки ему недоступны. Ключ общий с lead.js, он и отправляет.
(function () {
  var FIRST_KEY = "mary-first-touch";
  try {
    if (sessionStorage.getItem(FIRST_KEY)) return;
    var marked = /[?&](utm_|yclid|gclid|ymclid|fbclid)=/.test(location.search);
    var ref = document.referrer || "";
    var outside = ref && ref.indexOf("//" + location.host) < 0;
    var value = marked ? location.href : (outside ? ref : "");
    if (value) sessionStorage.setItem(FIRST_KEY, value);
  } catch (e) {
    // приватный режим — просто без метки
  }
})();
