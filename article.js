  // Кнопки «поделиться». Ссылки собираем на месте, чтобы работало
  // и на локальном адресе, и на боевом домене.
  (function () {
    var url = location.href;
    var title = document.title;

    var tg = document.querySelector("[data-tg]");
    if (tg) tg.href = "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title);

    var li = document.querySelector("[data-li]");
    if (li) li.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);

    var copy = document.querySelector("[data-copy]");
    if (copy) {
      copy.addEventListener("click", function () {
        navigator.clipboard.writeText(url).then(function () {
          copy.classList.add("is-copied");
          setTimeout(function () { copy.classList.remove("is-copied"); }, 1600);
        });
      });
    }
  })();

  // Подсветка текущего раздела в оглавлении: следим, какой заголовок
  // сейчас ближе всего к верху экрана.
  (function () {
    var links = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
    var heads = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    if (!heads.length) return;

    function update() {
      var best = 0;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].getBoundingClientRect().top - 90 <= 0) best = i;
      }
      links.forEach(function (a, i) { a.classList.toggle("is-current", i === best); });
    }

    var waiting = false;
    window.addEventListener("scroll", function () {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(function () { waiting = false; update(); });
    }, { passive: true });

    update();
  })();
