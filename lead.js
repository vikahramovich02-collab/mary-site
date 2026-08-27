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

  // Возвращает промис; при пустом адресе — резолвится сразу (заглушка).
  window.sendLead = function (form) {
    var data = collect(form);
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
