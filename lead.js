// Отправка заявок: одна функция на панель заявки (разработка) и формы на
// нишах/кейсах. Шлёт JSON в Google Apps Script — тот пишет строку в таблицу
// и уведомляет в Telegram. Токен бота живёт в скрипте, не здесь.
//
// Адрес — ниже, одной строкой. Пока он пустой, форма показывает «спасибо»
// без отправки: чтобы не ломать сайт до того, как скрипт опубликован.
(function () {
  var LEAD_URL = "";   // ← сюда URL веб-приложения Apps Script (…/exec)

  function collect(form) {
    var data = { page: location.href, sent: new Date().toISOString() };
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
  //  — таймер: отправка раньше 3 с после загрузки страницы — тоже бот.
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
    return fetch(LEAD_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json().catch(function () { return { ok: true }; });
    });
  };
})();
