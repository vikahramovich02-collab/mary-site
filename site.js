  // Сфера на первом экране: меридианы сходятся к полюсу и медленно
  // проплывают. Считается на canvas — картинки и видео тут дороже.
  (function () {
    var cv = document.getElementById("globe");
    if (!cv || !cv.getContext) return;

    var ctx = cv.getContext("2d");
    // цвета сферы живут в тех же переменных, что и вся палитра ниши
    var css = getComputedStyle(document.documentElement);
    var LINE = (css.getPropertyValue("--globe-line") || "37, 99, 235").trim();
    var DOT = (css.getPropertyValue("--globe-dot") || "30, 80, 210").trim();
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var w = 0, h = 0, R = 0, cx = 0, cy = 0;

    var TILT = 0.35;          // наклон оси: полюс поднимается в кадр
    var ROLL = 0.5;           // и уходит влево, как в референсе
    var LINES = 74;           // меридианов
    var STEPS = 46;           // точек на меридиане
    var sinT = Math.sin(TILT), cosT = Math.cos(TILT);
    var sinR = Math.sin(ROLL), cosR = Math.cos(ROLL);

    // крапины по поверхности — те же, что и линии, только точками
    var dots = [];
    for (var d = 0; d < 130; d++) {
      dots.push({
        lat: Math.asin(Math.random() * 2 - 1),
        lon: Math.random() * Math.PI * 2,
        r: 0.7 + Math.random() * 1.1
      });
    }

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = w * 0.66;
      cx = w * 0.5;
      cy = h + R * 0.42;   // центр ниже кадра, но дуга поднята повыше
    }

    // сфера → экран, с наклоном оси и завалом вбок
    function project(lat, lon) {
      var cl = Math.cos(lat);
      var x = cl * Math.sin(lon), y = Math.sin(lat), z = cl * Math.cos(lon);
      var y1 = y * cosT - z * sinT, z1 = y * sinT + z * cosT;
      var x2 = x * cosR - y1 * sinR, y2 = x * sinR + y1 * cosR;
      return { x: cx + x2 * R, y: cy - y2 * R, z: z1 };
    }

    function frame(now) {
      var phase = now * 0.00006;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (var i = 0; i < LINES; i++) {
        var lon = phase + (i / LINES) * Math.PI * 2;
        var depth = 0, drawn = 0;
        ctx.beginPath();

        for (var k = 0; k <= STEPS; k++) {
          var lat = -Math.PI / 2 + (k / STEPS) * Math.PI;
          var pt = project(lat, lon);
          if (pt.z < 0) { drawn = 0; continue; }   // задняя половина не рисуется
          depth += pt.z;
          if (drawn++) ctx.lineTo(pt.x, pt.y); else ctx.moveTo(pt.x, pt.y);
        }

        ctx.strokeStyle = "rgba(" + LINE + ", " + (0.05 + 0.22 * (depth / STEPS)) + ")";
        ctx.stroke();
      }

      for (var j = 0; j < dots.length; j++) {
        var p = project(dots[j].lat, dots[j].lon + phase);
        if (p.z <= 0.05) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dots[j].r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + DOT + ", " + (0.15 + 0.5 * p.z) + ")";
        ctx.fill();
      }

      raf = window.requestAnimationFrame(frame);
    }

    var raf = 0;
    var run = function (on) {
      if (on && !raf && !calm.matches) raf = window.requestAnimationFrame(frame);
      if (!on && raf) { window.cancelAnimationFrame(raf); raf = 0; }
    };

    size();
    window.addEventListener("resize", function () { size(); if (calm.matches) frame(0); });

    // за экраном сфера не считается — пустая работа греет батарею
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (e) { run(e[0].isIntersecting); }).observe(cv);
    } else {
      run(true);
    }

    if (calm.matches) frame(0);
  })();

  // Проявление: наблюдатель не отключается, поэтому анимация играет
  // каждый раз, когда блок снова попадает в экран.
  (function () {
    var targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length || !window.IntersectionObserver) return;

    document.documentElement.classList.add("has-reveal");
    var rescue = setTimeout(function () {
      targets.forEach(function (el) { el.classList.add("is-in"); });
    }, 3000);

    var io = new IntersectionObserver(function (entries) {
      clearTimeout(rescue);
      entries.forEach(function (e) { e.target.classList.toggle("is-in", e.isIntersecting); });
    }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });

    targets.forEach(function (el) { io.observe(el); });
  })();

  // Табы и подтверждение — на каждой форме: одна в блоке заявки,
  // вторая в попапе. React сюда не тянем, страница статическая.
  document.querySelectorAll("form[data-req-form]").forEach(function (form) {
    var modes = form.querySelectorAll(".b-req__mode");
    var send = form.querySelector(".b-req__submit");

    modes.forEach(function (m) {
      m.addEventListener("click", function () {
        modes.forEach(function (o) {
          o.classList.toggle("is-active", o === m);
          o.setAttribute("aria-selected", String(o === m));
        });
        send.textContent = m.dataset.send;
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO: адрес приёма заявок — общий с формой на главной.
      form.hidden = true;
      form.parentNode.querySelector(".b-req__done").hidden = false;
    });
  });

  // Кнопка «наверх» в футере.
  (function () {
    var up = document.querySelector("[data-scroll-top]");
    if (up) up.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();

  // Лента блога: шаг прокрутки — ровно одна карточка с зазором.
  (function () {
    var lane = document.querySelector("[data-blog-scroller]");
    if (!lane) return;

    var prev = document.querySelector("[data-blog-prev]");
    var next = document.querySelector("[data-blog-next]");

    var edges = function () {
      var max = lane.scrollWidth - lane.clientWidth;
      prev.disabled = lane.scrollLeft <= 2;
      next.disabled = lane.scrollLeft >= max - 2;
    };

    var move = function (dir) {
      var card = lane.querySelector(".b-blog__card");
      var step = card ? card.offsetWidth + 14 : lane.clientWidth * 0.8;
      lane.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    prev.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    lane.addEventListener("scroll", edges, { passive: true });
    window.addEventListener("resize", edges);
    edges();
  })();

  // Сравнение: наведение на любую карточку пары двигает её стрелку.
  (function () {
    var cols = document.querySelectorAll(".b-cmp__col .b-cmp__items");
    if (cols.length !== 2) return;

    var left = cols[0].children;
    var mark = function (i, on) {
      if (left[i]) left[i].classList.toggle("is-hover", on);
    };

    Array.prototype.forEach.call(cols, function (list) {
      Array.prototype.forEach.call(list.children, function (li, i) {
        li.addEventListener("mouseenter", function () { mark(i, true); });
        li.addEventListener("mouseleave", function () { mark(i, false); });
      });
    });
  })();

  // Меню ниш в шапке: наведение открывает, клик мимо и Esc закрывают.
  (function () {
    var drop = document.getElementById("nav-drop");
    if (!drop) return;

    var btn = drop.querySelector("[data-drop-btn]");
    var menu = drop.querySelector(".nav__menu");

    var set = function (on) {
      menu.classList.toggle("is-open", on);
      btn.setAttribute("aria-expanded", String(on));
    };

    // Меню закрывается с задержкой: увести мышь по диагонали к промо-карточке
    // быстрее, чем срабатывает mouseleave, — и список исчезал под курсором.
    var timer = 0;
    var pinned = false;

    var later = function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { if (!pinned) set(false); }, 420);
    };

    drop.addEventListener("mouseenter", function () { window.clearTimeout(timer); set(true); });
    drop.addEventListener("mouseleave", later);

    // клик закрепляет меню открытым, пока не кликнут мимо или не нажмут Esc
    btn.addEventListener("click", function () {
      window.clearTimeout(timer);
      pinned = !menu.classList.contains("is-open") || !pinned;
      set(pinned || !menu.classList.contains("is-open"));
      if (!menu.classList.contains("is-open")) pinned = false;
    });

    document.addEventListener("pointerdown", function (e) {
      if (!drop.contains(e.target)) { pinned = false; set(false); }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { pinned = false; set(false); }
    });
  })();

  // Плавающая плашка: появляется, когда первый экран почти прокручен.
  (function () {
    var fbar = document.getElementById("fbar");
    if (!fbar) return;

    var menu = fbar.querySelector(".fbar__menu");
    var toggle = fbar.querySelector("[data-fbar-toggle]");

    var onScroll = function () {
      fbar.classList.toggle("is-shown", window.scrollY > window.innerHeight * .72);
      if (!fbar.classList.contains("is-shown")) close();
    };

    var close = function () {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    };

    toggle.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });

    document.addEventListener("pointerdown", function (e) {
      if (!menu.hidden && !fbar.contains(e.target)) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    menu.addEventListener("click", close);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  // Попап с формой: открывают кнопки в блоках и на первом экране.
  (function () {
    var modal = document.getElementById("form-modal");
    if (!modal || !modal.showModal) return;

    document.querySelectorAll("[data-open-form]").forEach(function (b) {
      b.addEventListener("click", function () { modal.showModal(); });
    });

    modal.querySelector("[data-close-form]").addEventListener("click", function () {
      modal.close();
    });

    // Клик мимо карточки закрывает: у <dialog> сам элемент занимает
    // всю подложку, поэтому проверяем, попали ли внутрь коробки.
    modal.addEventListener("click", function (e) {
      if (!e.target.closest(".modal__box")) modal.close();
    });
  })();
