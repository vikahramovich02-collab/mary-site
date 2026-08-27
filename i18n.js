// Переключение языка страницы. Русский лежит прямо в разметке, английский —
// в словаре i18n-en.js; при выборе EN тексты подменяются на месте.
//
// Почему так, а не отдельные /en/ страницы: правки вносятся в одном файле,
// и вёрстка не расходится. Если понадобится английский в поиске — из того же
// словаря сборка сгенерирует статические страницы, разметка уже размечена.
//
// Ключи проставлены скриптом scripts/i18n-mark.py:
//   data-i18n        — текст элемента
//   data-i18n-html   — элемент, внутри которого есть <br>, <i> или <svg>
//   data-i18n-ph     — placeholder поля
//   data-i18n-aria   — aria-label
//   data-i18n-cursor — подпись в кружке курсора
//   data-i18n-roll   — кнопка, где буквы разложены по <b> для анимации
//   data-i18n-quote  — цитата, разложенная по словам для подсветки
(function () {
  var KEY = "mary-lang";
  var dict = (window.I18N && window.I18N.en) || null;

  // ?lang=en в адресе перебивает сохранённый выбор и запоминается:
  // так можно отправить ссылку сразу на английскую версию.
  function lang() {
    var q = (location.search.match(/[?&]lang=(ru|en)/) || [])[1];
    if (q) {
      try { window.localStorage.setItem(KEY, q); } catch (e) {}
      return q;
    }
    try { return window.localStorage.getItem(KEY) === "en" ? "en" : "ru"; }
    catch (e) { return "ru"; }
  }

  // Буквы кнопки: у каждой своя задержка, поэтому строка перекручивается
  // волной. Две копии — верхняя уезжает, нижняя приходит снизу.
  function letters(text) {
    return text.split("").map(function (ch, i) {
      return '<b style="--i:' + i + '">' + (ch === " " ? "&nbsp;" : ch) + "</b>";
    }).join("");
  }

  function applyRoll(el, text) {
    el.innerHTML = '<span aria-label="' + text.replace(/"/g, "&quot;") + '">' +
      letters(text) + "</span><span aria-hidden=\"true\">" + letters(text) + "</span>";
  }

  // Цитата гаснет и загорается по словам — значит слова должны быть
  // отдельными элементами, иначе подсвечивать нечего.
  function applyQuote(el, text) {
    el.innerHTML = text.split(" ").map(function (w) {
      return "<span>" + w + "</span>";
    }).join(" ");
  }

  function apply(d) {
    document.documentElement.setAttribute("lang", "en");
    if (d.title) document.title = d.title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && d.desc) meta.setAttribute("content", d.desc);

    document.querySelectorAll("[data-i18n-roll]").forEach(function (el) {
      var t = d[el.getAttribute("data-i18n-roll")];
      if (t) applyRoll(el, t);
    });

    document.querySelectorAll("[data-i18n-quote]").forEach(function (el) {
      var t = d[el.getAttribute("data-i18n-quote")];
      if (t) applyQuote(el, t);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var t = d[el.getAttribute("data-i18n-html")];
      if (t) el.innerHTML = t;
    });

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var t = d[el.getAttribute("data-i18n")];
      if (t) el.textContent = t;
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var t = d[el.getAttribute("data-i18n-ph")];
      if (t) el.setAttribute("placeholder", t);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var t = d[el.getAttribute("data-i18n-aria")];
      if (t) el.setAttribute("aria-label", t);
    });

    document.querySelectorAll("[data-i18n-cursor]").forEach(function (el) {
      var t = d[el.getAttribute("data-i18n-cursor")];
      if (t) el.setAttribute("data-cursor", t);
    });
  }

  if (lang() === "en" && dict) apply(dict);

  // Переключатель: сохраняем выбор и перезагружаем. Перезагрузка нужна
  // потому, что анимации и курсор собираются из текста при старте —
  // подменять их на лету значило бы дублировать всю эту логику.
  document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
    var next = lang() === "en" ? "ru" : "en";
    btn.textContent = next.toUpperCase();
    btn.setAttribute("aria-label", next === "en" ? "Switch to English" : "Перейти на русский");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      try { window.localStorage.setItem(KEY, next); } catch (err) {}
      // адрес правим тоже: иначе ?lang=en в ссылке перебьёт новый выбор.
      // Остальные параметры (utm-метки) остаются на месте.
      var url = new URL(window.location.href);
      url.searchParams.delete("lang");
      if (next === "en") url.searchParams.set("lang", "en");
      window.location.href = url.toString();
    });
  });
})();
