// Скрипты страницы разработки: сфера из точек, курсор, анимации.
// Подключается из razrabotka.html с defer — выполняется после разбора
// страницы, поэтому весь DOM уже на месте.

// Сфера из точек на первом экране: точки живут на поверхности шара,
  // ближние крупнее и ярче. Считается на canvas, картинок не требует.
  (function () {
    var cv = document.getElementById("dev-globe");
    if (!cv || !cv.getContext) return;

    var ctx = cv.getContext("2d");
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var N = 1900;
    var pts = [];
    for (var i = 0; i < N; i++) {
      // равномерно по сфере: иначе точки собьются в кучу у полюсов
      var y = 1 - (i / (N - 1)) * 2;
      var r = Math.sqrt(Math.max(0, 1 - y * y));
      var phi = i * Math.PI * (3 - Math.sqrt(5));

      // три калибра: россыпь мелких, средние и десятая часть — крупные белые
      var roll = Math.random();
      var tier = roll < 0.1 ? 2 : (roll < 0.4 ? 1 : 0);
      var base = tier === 2 ? 1.5 : (tier === 1 ? 0.95 : 0.55);

      pts.push({
        x: Math.cos(phi) * r, y: y, z: Math.sin(phi) * r,
        s: base * (0.85 + Math.random() * 0.3),
        hot: tier === 2
      });
    }

    var w = 0, h = 0, R = 0, dpr = 1;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.46;
    }

    // Курсор продавливает сферу: точки рядом уходят вглубь и гаснут.
    var mx = -1e4, my = -1e4, press = 0, want = 0;
    var DENT = 150;                                  // радиус влияния, px

    if (window.matchMedia("(hover: hover)").matches) {
      cv.parentNode.addEventListener("pointermove", function (e) {
        var r = cv.getBoundingClientRect();
        mx = e.clientX - r.left; my = e.clientY - r.top; want = 1;
      });
      cv.parentNode.addEventListener("pointerleave", function () { want = 0; });
    }

    // Кнопка работает магнитом: точки, проходящие рядом, подтягиваются
    // к ней и разгораются, а уйдя за радиус — возвращаются на свою орбиту.
    var cta = document.querySelector(".hero__cta");
    var PULL = 130;
    var bx = 0, by = 0, bw = 0, bh = 0, hasCta = false;

    function measureCta() {
      if (!cta) { hasCta = false; return; }
      var r = cta.getBoundingClientRect();
      var c = cv.getBoundingClientRect();
      if (!r.width) { hasCta = false; return; }
      bx = r.left + r.width / 2 - c.left;
      by = r.top + r.height / 2 - c.top;
      bw = r.width / 2;
      bh = r.height / 2;
      hasCta = true;
    }

    var raf = 0;
    function frame(now) {
      measureCta();
      var a = now * 0.00012;
      var sa = Math.sin(a), ca = Math.cos(a);
      var tilt = -0.35, st = Math.sin(tilt), ct = Math.cos(tilt);
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var x = p.x * ca - p.z * sa;
        var z = p.x * sa + p.z * ca;
        var y = p.y * ct - z * st;
        var zz = p.y * st + z * ct;

        var depth = (zz + 1) / 2;                 // 0 — дальняя сторона, 1 — ближняя
        var size = p.s * (0.3 + depth * 0.95);
        var px = w / 2 + x * R;
        var py = h / 2 + y * R;

        // магнит кнопки: тянем к её середине по расстоянию до края капсулы
        if (hasCta) {
          var qx = Math.max(bx - bw, Math.min(px, bx + bw));
          var qy = Math.max(by - bh, Math.min(py, by + bh));
          var ddx = px - qx, ddy = py - qy;
          var dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < PULL) {
            var g = 1 - dd / PULL;
            g = g * g * 0.55;
            px += (bx - px) * g;
            py += (by - py) * g;
            size *= 1 + g * 0.5;
            depth = Math.min(1, depth + g * 0.4);
          }
        }

        // вмятина: чем ближе точка к курсору, тем сильнее её тянет к центру
        if (press > 0.01) {
          var dx = px - mx, dy = py - my;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < DENT) {
            var k = (1 - d / DENT);
            k = k * k * press;                      // мягкий край воронки
            px -= (px - w / 2) * k * 0.22;
            py -= (py - h / 2) * k * 0.22;
            size *= 1 - k * 0.55;
            depth *= 1 - k * 0.5;
          }
        }

        ctx.beginPath();
        ctx.arc(px, py, Math.max(size, 0.15), 0, Math.PI * 2);
        // крупные светятся белым, остальные держатся в сером
        ctx.fillStyle = p.hot
          ? "rgba(255, 255, 255, " + (0.2 + depth * 0.7) + ")"
          : "rgba(194, 194, 198, " + (0.06 + depth * 0.38) + ")";
        ctx.fill();
      }

      press += (want - press) * 0.12;               // вмятина набирается и отпускает плавно
      raf = window.requestAnimationFrame(frame);
    }

    size();
    window.addEventListener("resize", size);

    var run = function (on) {
      if (on && !raf && !calm.matches) raf = window.requestAnimationFrame(frame);
      if (!on && raf) { window.cancelAnimationFrame(raf); raf = 0; }
    };

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (e) { run(e[0].isIntersecting); }).observe(cv);
    } else { run(true); }

    if (calm.matches) frame(0);
  })();

  // Полоса футера: поле из мягких «лавовых» пятен, которые медленно
  // переливаются. Рисуется полутоном — точка крупнее там, где поле
  // плотнее. Голубое на тёмном. Всё на canvas, картинок не требует.
  (function () {
    var cv = document.getElementById("foot-wave");
    if (!cv || !cv.getContext) return;

    var ctx = cv.getContext("2d");
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var STEP = 7;                                   // шаг сетки точек, px
    var w = 0, h = 0, dpr = 1, cols = 0, rows = 0;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / STEP) + 1;
      rows = Math.ceil(h / STEP) + 1;
    }

    // Поле: сумма синусоид по двум осям с разными частотами и фазами.
    // Ни одна не кратна другой — поэтому картинка не зацикливается на
    // глаз и не читается как «волна». Возвращает 0…1.
    function field(x, y, t) {
      var u = x / w * 6.28, v = y / h * 6.28;
      var n = 0;
      n += Math.sin(u * 0.9 + t * 0.21 + Math.sin(v * 1.3 + t * 0.17) * 1.4);
      n += Math.sin(v * 1.1 - t * 0.19 + Math.cos(u * 0.7 + t * 0.13) * 1.6);
      n += Math.sin((u + v) * 0.6 + t * 0.11) * 0.8;
      n += Math.sin(u * 1.7 - v * 0.8 - t * 0.23) * 0.5;
      // 2.9 — сумма амплитуд; сжимаем к 0…1 и подрезаем края, чтобы
      // тёмных провалов было больше, чем гребней
      var k = (n / 2.9 + 1) / 2;
      k = (k - 0.28) / 0.62;
      return k < 0 ? 0 : (k > 1 ? 1 : k);
    }

    var raf = 0;
    function frame(now) {
      var t = now * 0.001;
      ctx.clearRect(0, 0, w, h);
      var half = STEP / 2;

      for (var c = 0; c < cols; c++) {
        var x = c * STEP;
        for (var r = 0; r < rows; r++) {
          var y = r * STEP;
          var k = field(x, y, t);
          var rad = half * k * 1.05;
          if (rad < 0.3) continue;
          // примесь: глубокий синий на слабых, голубой на плотных,
          // на самых плотных подмешан белый — как блик
          var g = 90 + k * 60;                      // 90 → 150 (--accent 140)
          var rr = 30 + k * 60;                     // 30 → 90  (--accent 78)
          var bb = 200 + k * 55;                    // 200 → 255
          ctx.fillStyle = "rgb(" + (rr | 0) + "," + (g | 0) + "," + (bb | 0) + ")";
          ctx.globalAlpha = 0.4 + k * 0.6;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(frame);
    }

    size();
    window.addEventListener("resize", size);
    // полоса меняет высоту после загрузки шрифтов/раскладки — следим за ней
    if (window.ResizeObserver) new ResizeObserver(size).observe(cv.parentNode);

    var run = function (on) {
      if (on && !raf && !calm.matches) raf = window.requestAnimationFrame(frame);
      if (!on && raf) { window.cancelAnimationFrame(raf); raf = 0; }
    };

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (e) { run(e[0].isIntersecting); }).observe(cv);
    } else { run(true); }

    if (calm.matches) frame(0);                      // без анимации — один кадр
  })();

  // Шапка и бегущая строка прячутся, пока в экране футер: там они
  // лишние, и блендинг поверх волны выглядел бы грязно.
  (function () {
    var bars = document.querySelectorAll(".nav-bar, .topbar");
    var foot = document.querySelector(".foot");
    if (!bars.length || !foot || !window.IntersectionObserver) return;

    new IntersectionObserver(function (e) {
      bars.forEach(function (b) { b.classList.toggle("is-away", e[0].isIntersecting); });
    }, { threshold: 0, rootMargin: "-10% 0px 0px 0px" }).observe(foot);
  })();

  // Cookie: тот же ключ и значения, что на главной (mary-cookie-consent:
  // all / necessary) — аналитика потом включится по нему на обеих страницах.
  (function () {
    var box = document.querySelector("[data-cookie]");
    if (!box) return;
    var KEY = "mary-cookie-consent";
    var saved = null;
    try { saved = window.localStorage.getItem(KEY); } catch (e) {}
    if (saved) return;

    box.hidden = false;
    box.querySelectorAll("[data-cookie-decide]").forEach(function (b) {
      b.addEventListener("click", function () {
        try { window.localStorage.setItem(KEY, b.getAttribute("data-cookie-decide")); } catch (e) {}
        box.classList.add("is-out");
        window.setTimeout(function () { box.hidden = true; }, 340);
      });
    });
  })();

  // Кнопка «наверх» в нижней полоске футера.
  (function () {
    var up = document.querySelector("[data-scroll-top]");
    if (up) up.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();

  // Бегущая строка: сдвигается по мере прокрутки секции, а не сама по себе —
  // движение привязано к жесту человека, поэтому не отвлекает.
  (function () {
    var line = document.querySelector("[data-tape]");
    if (!line) return;

    var sec = line.closest(".tape");
    var arcs = sec ? sec.querySelector(".tape__arcs") : null;
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var frame = 0;

    function update() {
      frame = 0;
      var box = sec.getBoundingClientRect();
      var span = window.innerHeight + box.height;
      var passed = (window.innerHeight - box.top) / span;      // 0 → 1 за проход
      var travel = Math.max(0, line.scrollWidth - window.innerWidth);
      line.style.transform = "translate3d(" + (-passed * travel) + "px, 0, 0)";

      // кольцо поворачивается тем же жестом: полный оборот за проход секции
      if (arcs) {
        arcs.style.transform = "translate(-50%, -50%) rotate(" + (passed * 360 - 40) + "deg)";
      }
    }

    function onScroll() { if (!frame) frame = window.requestAnimationFrame(update); }

    if (calm.matches) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  // Этапы: карточка раскрывается, когда доходит до середины экрана.
  (function () {
    var items = document.querySelectorAll("[data-flow]");
    if (!items.length || !window.IntersectionObserver) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle("is-in", e.isIntersecting); });
    }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });

    items.forEach(function (el) { io.observe(el); });

    var frame = 0;

    function sweep() {
      frame = 0;
      var h = window.innerHeight;
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < h * .96 && r.bottom > 0) el.classList.add("is-in");
      });
    }

    window.addEventListener("scroll", function () {
      if (!frame) frame = window.requestAnimationFrame(sweep);
    }, { passive: true });

    window.addEventListener("resize", sweep);
    sweep();
  })();

  // Кнопка под этапами загорается, когда ось этапов пройдена до конца.
  (function () {
    var track = document.querySelector(".flow__track");
    var cta = document.querySelector("#flow .flow__cta");
    if (!track || !cta) return;

    var frame = 0;

    function update() {
      frame = 0;
      // бегунок висит на середине экрана — конец оси считаем по той же линии
      cta.classList.toggle("is-lit", track.getBoundingClientRect().bottom <= window.innerHeight * .5);
    }

    function onScroll() { if (!frame) frame = window.requestAnimationFrame(update); }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  // Предпросмотр строки: показываем визуал у курсора, пока мышь на строке.
  (function () {
    var peek = document.querySelector(".rows__peek");
    var list = document.querySelector(".rows");
    if (!peek || !list || !window.matchMedia("(hover: hover)").matches) return;

    var img = peek.querySelector("img");
    var frame = 0, x = 0, y = 0;

    function move() {
      frame = 0;
      peek.style.top = y + "px";
      peek.style.left = x + "px";
    }

    list.addEventListener("pointermove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!frame) frame = window.requestAnimationFrame(move);
    });

    list.querySelectorAll("li").forEach(function (li) {
      li.addEventListener("pointermove", function () {
        var src = li.dataset.shot;
        if (!src) return;
        if (img.getAttribute("src") !== src) img.setAttribute("src", src);
        peek.classList.add("is-on");
        list.classList.add("is-peek");
      });
    });

    list.addEventListener("pointerleave", function () {
      peek.classList.remove("is-on");
      list.classList.remove("is-peek");
    });
  })();

  // Обновление страницы всегда открывает её сверху: браузер иначе
  // возвращает прежнюю прокрутку, и человек попадает в середину.
  // Перезагрузка оставляет человека на том же месте. Сами держим позицию:
  // браузер восстанавливает её слишком рано — до того, как скрипты досчитают
  // высоту секций, и страница уезжает на блок ниже.
  (function () {
    var KEY = "dev-scroll";
    var saved = 0;
    try { saved = parseFloat(sessionStorage.getItem(KEY)) || 0; } catch (e) {}

    var store = function () {
      try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch (e) {}
    };

    var tick = 0;
    window.addEventListener("scroll", function () {
      if (tick) return;
      tick = window.setTimeout(function () { tick = 0; store(); }, 150);
    }, { passive: true });

    window.addEventListener("pagehide", store);
    window.addEventListener("beforeunload", store);

    if (window.location.hash || !saved) return;

    // высоту секций скрипты досчитывают уже после load — возвращаемся
    // на место несколько раз, пока раскладка не устоялась
    var back = function () { window.scrollTo(0, saved); };
    back();
    document.addEventListener("DOMContentLoaded", back);
    window.addEventListener("load", function () {
      back();
      window.requestAnimationFrame(back);
      window.setTimeout(back, 120);
      window.setTimeout(back, 400);
    });
  })();

  // Подписи в шапке собираем из букв — иначе прокрутка лесенкой
  // потребовала бы вручную размечать каждый пункт.
  (function () {
    var links = document.querySelectorAll(
      ".nav__links a, .nav__actions a, .flow__cta, " +
      ".foot__nav a, .foot__mail, .foot__out, .foot__go, .foot__bar a, [data-scroll-top], .drawer__close"
    );
    if (!links.length) return;

    links.forEach(function (a) {
      var node = null;
      for (var i = 0; i < a.childNodes.length; i++) {
        var n = a.childNodes[i];
        if (n.nodeType === 3 && n.textContent.trim()) { node = n; break; }
      }
      if (!node) return;

      var text = node.textContent.trim();
      var row = function () {
        return text.split("").map(function (ch, i) {
          return '<b style="--i:' + i + '">' + (ch === " " ? "&nbsp;" : ch) + "</b>";
        }).join("");
      };

      var roll = document.createElement("span");
      roll.className = "nav-roll";
      roll.innerHTML = "<span>" + row() + "</span><span>" + row() + "</span>";
      roll.setAttribute("aria-label", text);
      a.replaceChild(roll, node);
    });
  })();

  // Курсор-точка на первом экране.
  (function () {
    var dot = document.querySelector(".dot-cursor");
    if (!dot || !window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var x = 0, y = 0, frame = 0;

    function move() {
      frame = 0;
      // центрируем сам элемент, чтобы размер можно было менять на лету
      dot.style.transform = "translate(" + x + "px," + y + "px) translate(-50%, -50%)";
    }

    document.addEventListener("pointermove", function (e) {
      x = e.clientX; y = e.clientY;
      dot.classList.add("is-on");
      if (!frame) frame = window.requestAnimationFrame(move);
    });

    document.addEventListener("pointerleave", function () { dot.classList.remove("is-on"); });

    // над карточками и плашками точка вырастает в кружок с подписью
    var BIG = ".hero__case, .flow__card, .b-case, .case__visual, .rows li, .post, .demo";

    var label = dot.querySelector("i");

    function say(box) {
      if (!label) return;
      var text = box.getAttribute("data-cursor") || "Смотреть";
      label.innerHTML = text.replace(" ", "<br />");
      dot.classList.toggle("is-wide", text.indexOf(" ") > -1);
      dot.classList.add("is-big");
    }

    document.addEventListener("pointerover", function (e) {
      var box = e.target.closest && e.target.closest(BIG);
      if (box) say(box);
    });

    document.addEventListener("pointerout", function (e) {
      if (e.target.closest && e.target.closest(BIG) && !e.relatedTarget) {
        dot.classList.remove("is-big", "is-wide");
      }
    });

    document.querySelectorAll(BIG).forEach(function (box) {
      box.addEventListener("pointerenter", function () { say(box); });
      box.addEventListener("pointerleave", function () {
        dot.classList.remove("is-big", "is-wide");
      });
    });

  })();

  // Заливка плитки расходится из точки касания курсора.
  (function () {
    var tiles = document.querySelectorAll(".quote__links a, .hero__cta");
    if (!tiles.length || !window.matchMedia("(hover: hover)").matches) return;

    var dot = document.querySelector(".dot-cursor");

    tiles.forEach(function (a) {
      a.addEventListener("pointerenter", function (e) {
        var r = a.getBoundingClientRect();
        a.style.setProperty("--x", (e.clientX - r.left) + "px");
        a.style.setProperty("--y", (e.clientY - r.top) + "px");
        if (dot) dot.classList.add("is-plain");
      });

      a.addEventListener("pointerleave", function () {
        if (dot) dot.classList.remove("is-plain");
      });
    });
  })();

  // Вопросы: плавное раскрытие, открытый закрывается при клике по другому.
  (function () {
    var items = document.querySelectorAll(".faq__item");
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector(".faq__q");
      btn.addEventListener("click", function () {
        var open = !item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        });
        if (open) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  })();

  // Списки шагов в карточках: раскрываются плавно, по одному клику.
  (function () {
    function toggle(box) {
      var btn = box.querySelector(".flow__more");
      var open = box.classList.toggle("is-open");
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    document.querySelectorAll(".flow__more").forEach(function (btn) {
      btn.addEventListener("click", function () { toggle(btn.closest(".flow__det")); });
    });

    // клик по всей карточке тоже раскрывает список — плюс лишь подсказка
    document.querySelectorAll(".flow__card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".flow__more")) return;
        var box = card.querySelector(".flow__det");
        if (box) toggle(box);
      });
    });
  })();

  // Видео-обзор: разворачивается из угла превью и гаснет обратно.
  (function () {
    var btn = document.querySelector("[data-demo]");
    var modal = document.querySelector("[data-vmodal]");
    if (!btn || !modal) return;

    var box = modal.querySelector(".vmodal__box");
    var close = modal.querySelector(".vmodal__close");

    function open() {
      var r = btn.getBoundingClientRect();
      modal.hidden = false;
      document.body.style.overflow = "hidden";

      // растём из левого нижнего угла превью — точка отсчёта берётся
      // относительно самого окна видео, а не экрана
      window.requestAnimationFrame(function () {
        var b = box.getBoundingClientRect();
        box.style.setProperty("--ox", (r.left - b.left) + "px");
        box.style.setProperty("--oy", (r.bottom - b.top) + "px");
        window.requestAnimationFrame(function () { modal.classList.add("is-open"); });
      });
    }

    function hide() {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      window.setTimeout(function () { modal.hidden = true; }, 320);
    }

    btn.addEventListener("click", open);
    close.addEventListener("click", hide);
    modal.addEventListener("click", function (e) { if (e.target === modal) hide(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) hide();
    });
  })();

  // Панель заявки: выезжает справа по любой ссылке на #request.
  // Закрывается крестиком, кликом мимо и Esc — как видео-обзор.
  (function () {
    var drawer = document.querySelector("[data-drawer]");
    if (!drawer) return;

    var panel = drawer.querySelector(".drawer__panel");
    var close = drawer.querySelector(".drawer__close");
    var form = drawer.querySelector("[data-dev-form]");
    var done = drawer.querySelector(".drawer__done");
    var first = form && form.querySelector("input");

    function open(e) {
      if (e) e.preventDefault();
      drawer.hidden = false;
      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          drawer.classList.add("is-open");
          if (first) first.focus({ preventScroll: true });
        });
      });
    }

    function hide() {
      drawer.classList.remove("is-open");
      document.body.style.overflow = "";
      window.setTimeout(function () { drawer.hidden = true; }, 440);
    }

    document.querySelectorAll('a[href="#request"]').forEach(function (a) {
      a.addEventListener("click", open);
    });
    close.addEventListener("click", hide);
    drawer.addEventListener("click", function (e) { if (e.target === drawer) hide(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) hide();
    });

    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      window.sendLead(form).then(function () {
        form.hidden = true;
        done.hidden = false;
      }).catch(function (err) {
        btn.disabled = false;
        console.error("[lead]", err);
        alert("Не получилось отправить. Напишите нам в Telegram или на hello@mary.team.");
      });
    });
  })();

  // Метки разделов: подпись выезжает из-под точки при заходе на блок.
  (function () {
    var marks = document.querySelectorAll(".sec__mark");
    if (!marks.length || !window.IntersectionObserver) return;

    marks.forEach(function (m) {
      for (var i = 0; i < m.childNodes.length; i++) {
        var n = m.childNodes[i];
        if (n.nodeType === 3 && n.textContent.trim()) {
          var em = document.createElement("em");
          em.textContent = n.textContent;
          m.replaceChild(em, n);
          break;
        }
      }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle("is-live", e.isIntersecting); });
    }, { threshold: .6 });

    marks.forEach(function (m) { io.observe(m); });
  })();

  // Цитата: слова загораются по мере прокрутки секции.
  (function () {
    var box = document.querySelector("[data-quote]");
    if (!box) return;

    var words = box.querySelectorAll("p span");
    var sec = box.closest("section");
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    var frame = 0;

    if (calm.matches) {
      words.forEach(function (w) { w.classList.add("is-lit"); });
      return;
    }

    function update() {
      frame = 0;
      var box2 = sec.getBoundingClientRect();
      var span = window.innerHeight * .55;
      // 0 — секция ещё внизу, 1 — прошла середину экрана
      var passed = (window.innerHeight - box2.top - span) / (box2.height * .6);
      var lit = Math.round(Math.min(Math.max(passed, 0), 1) * words.length);
      words.forEach(function (w, i) { w.classList.toggle("is-lit", i < lit); });
    }

    function onScroll() { if (!frame) frame = window.requestAnimationFrame(update); }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
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
    }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });

    targets.forEach(function (el) { io.observe(el); });

    // Подстраховка на быструю прокрутку: наблюдатель успевает не всегда,
    // поэтому раз в кадр досматриваем, что реально попало в экран.
    var frame = 0;

    function sweep() {
      frame = 0;
      var h = window.innerHeight;
      targets.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < h * .96 && r.bottom > 0) el.classList.add("is-in");
      });
    }

    window.addEventListener("scroll", function () {
      if (!frame) frame = window.requestAnimationFrame(sweep);
    }, { passive: true });

    window.addEventListener("resize", sweep);
    sweep();
  })();

  // Заявка: отправки пока нет, показываем подтверждение.
  (function () {
    var form = document.querySelector("[data-req-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // TODO: адрес приёма заявок — общий с формой на главной.
      form.hidden = true;
      form.parentNode.querySelector(".dev-form__done").hidden = false;
    });
  })();
