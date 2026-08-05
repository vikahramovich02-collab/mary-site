import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import "./custom-landing.css";

const services = [
  {
    number: "01",
    title: "Исследование и продуктовый дизайн",
    text: "Проверяем идею, изучаем пользователей и процессы, проектируем сценарии и создаём прототип до начала разработки.",
    tags: ["Интервью", "Сценарии", "Прототип"],
  },
  {
    number: "02",
    title: "Веб-сервисы и личные кабинеты",
    text: "Разрабатываем клиентские продукты, порталы, кабинеты и внутренние системы — от первой версии до развития.",
    tags: ["Порталы", "Кабинеты", "Внутренние системы"],
  },
  {
    number: "03",
    title: "Мобильные приложения",
    text: "Создаём мобильный опыт вокруг ключевого сценария бизнеса и связываем приложение с действующими системами.",
    tags: ["iOS", "Android", "Связка с системами"],
  },
  {
    number: "04",
    title: "Автоматизация и AI",
    text: "Убираем ручные операции, внедряем AI-сценарии, маршруты согласований и контроль исключений.",
    tags: ["AI-сценарии", "Согласования", "Контроль исключений"],
  },
  {
    number: "05",
    title: "Интеграции и данные",
    text: "Связываем CRM, ERP, банки, телефонию, мессенджеры и внутренние сервисы в единый процесс.",
    tags: ["CRM и ERP", "Банки", "Телефония", "Мессенджеры"],
  },
  {
    number: "06",
    title: "Поддержка и развитие",
    text: "После запуска следим за стабильностью, собираем обратную связь и развиваем продукт или автоматизацию вместе с бизнесом.",
    tags: ["Стабильность", "Обратная связь", "Развитие"],
  },
];

const outcomes = [
  ["Рабочее решение", "Продукт или автоматизация запущены, проверены на реальных сценариях и готовы к использованию."],
  ["Понятные правила", "Зафиксированы роли, статусы, исключения, критерии готовности и порядок поддержки."],
  ["Данные для управления", "Бизнес видит состояние процесса, проблемные точки и факты для следующих решений."],
  ["План развития", "Передаём документацию, приоритеты и понятный план следующих улучшений."],
];

const steps = [
  ["01", "Разбираем задачу", "Изучаем пользователей, процесс, ограничения и действующие системы.", "Контекст и приоритет"],
  ["02", "Проектируем решение", "Показываем будущий сценарий, границы первой версии и критерии результата.", "Прототип и план"],
  ["03", "Собираем и запускаем", "Разрабатываем короткими итерациями, подключаем системы и проверяем рабочую версию.", "Запущенное решение"],
  ["04", "Поддерживаем и развиваем", "Следим за качеством, исправляем узкие места и планируем следующие изменения.", "План развития"],
];

const formats = [
  {
    title: "Product discovery",
    text: "Для идеи продукта или сложной задачи, которую нужно проверить до большой разработки.",
    result: "Контекст, прототип, границы первой версии и план.",
  },
  {
    title: "MVP под ключ",
    text: "Для запуска первой рабочей версии нового сервиса, кабинета или приложения.",
    result: "Спроектированный, разработанный и выпущенный продукт.",
  },
  {
    title: "Автоматизация под ключ",
    text: "Для конкретного повторяющегося процесса с несколькими участниками и системами.",
    result: "Интегрированный процесс, контроль и документация.",
  },
  {
    title: "Выделенная команда",
    text: "Для развития существующего продукта или регулярной очереди автоматизаций.",
    result: "Стабильный цикл анализа, разработки, выпуска и поддержки.",
  },
];

const faqs = [
  ["Нужно ли готовить техническое задание?", "Нет. Достаточно описать идею, текущий процесс или проблему обычными словами. Требования соберёт и согласует наша команда."],
  ["Можно ли начать с MVP или одного процесса?", "Да. Это безопасный формат: фиксируем небольшой измеримый результат, выпускаем первую версию и планируем развитие на реальных данных."],
  ["Вы берёте только разработку?", "Можем подключиться к отдельному этапу, но максимальную ответственность берём в формате под ключ: исследование, дизайн, разработка, внедрение и поддержка."],
  ["С какими системами вы работаете?", "С CRM, ERP, учётными системами, банками, телефонией, мессенджерами и внутренними сервисами. Способ интеграции проверяем до оценки."],
  ["Как формируется стоимость?", "Она зависит от состава команды, масштаба первой версии, количества интеграций и требований к надёжности. После вводной встречи предлагаем этапы и прозрачную оценку."],
  ["Что происходит после запуска?", "Остаёмся на поддержке, следим за стабильностью, собираем обратную связь и развиваем продукт или автоматизацию по согласованному плану."],
];

function Brand({ dark = false }) {
  return (
    <a className={`custom-brand ${dark ? "is-dark" : ""}`} href="#top" aria-label="Mary Custom, к началу страницы">
      <img src={maryMark} alt="" />
      <span>mary</span>
    </a>
  );
}

function ArrowLink({ children, href = "#contact", className = "" }) {
  return (
    <a className={`custom-arrow-link ${className}`} href={href}>
      <span>{children}</span>
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="custom-section-intro">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function CustomLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [faqQuery, setFaqQuery] = useState("");
  const [estimateText, setEstimateText] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [contactValue, setContactValue] = useState("");

  useEffect(() => {
    if (window.location.hash === "#team") {
      document.getElementById("team")?.scrollIntoView();
    }
  }, []);

  // Прогресс прокрутки сцены: 0 — первый экран, 1 — низ второго.
  // Им управляются параллакс и затемнение сферы.
  useEffect(() => {
    const stage = document.querySelector(".custom-stage");
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const travel = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / travel, 0), 1);
      stage.style.setProperty("--stage-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll("[data-scroll-service]");
    if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveService(Number(visible[0].target.dataset.scrollService));
        }
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.25, 0.5] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const buildEstimate = (value) => {
    const task = value.toLowerCase();

    if (task.includes("прототип") || task.includes("исслед") || task.includes("discovery")) {
      return { type: "Исследование и прототип", budget: "$4–10k", time: "2–4 недели" };
    }

    if (task.includes("прилож") || task.includes("mobile") || task.includes("ios") || task.includes("android")) {
      return { type: "Мобильный продукт", budget: "$20–45k", time: "8–14 недель" };
    }

    if (task.includes("автомат") || task.includes("интеграц") || task.includes("crm") || task.includes("erp") || task.includes("бот")) {
      return { type: "Автоматизация или интеграция", budget: "$8–25k", time: "4–8 недель" };
    }

    return { type: "Веб-продукт или MVP", budget: "$15–35k", time: "6–12 недель" };
  };

  const submitEstimate = (event) => {
    event.preventDefault();
    setEstimate(buildEstimate(estimateText));
  };

  const submitContact = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const submitFaq = (event) => {
    event.preventDefault();
    const query = faqQuery.trim().toLowerCase();
    if (!query) return;

    const match = faqs.findIndex(([question, answer]) => {
      const source = `${question} ${answer}`.toLowerCase();
      return query.split(/\s+/).some((word) => word.length > 3 && source.includes(word));
    });

    setActiveFaq(match >= 0 ? match : 4);
    setFaqQuery("");
  };

  return (
    <main className="custom-site" id="top">
      <div className="custom-stage">
        <div className="custom-stage-media" aria-hidden="true">
          <div className="custom-stage-sticky">
            <video
              className="custom-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/mary-hero-poster.jpg"
            >
              <source src="/media/mary-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="custom-hero-shade" aria-hidden="true" />

      <section className="custom-hero" aria-labelledby="custom-hero-title">
        <header className="custom-header">
          <Brand dark />
          <nav className="custom-nav" aria-label="Навигация по странице">
            <a href="#services">Услуги</a>
            <a href="#process">Как работаем</a>
            <a href="#formats">Форматы</a>
            <a href="#team">Команда</a>
          </nav>
          <div className="custom-header-actions">
            <a className="custom-language" href="#top" aria-label="Текущий язык: русский">RU</a>
            <a className="custom-button custom-button-light custom-button-small" href="#contact">Обсудить</a>
            <button className="custom-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
              <Menu size={21} />
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="custom-mobile-menu" role="dialog" aria-modal="true" aria-label="Меню">
            <div>
              <Brand />
              <button type="button" onClick={closeMenu} aria-label="Закрыть меню"><X size={22} /></button>
            </div>
            <nav>
              <a href="#services" onClick={closeMenu}>Услуги</a>
              <a href="#process" onClick={closeMenu}>Как работаем</a>
              <a href="#formats" onClick={closeMenu}>Форматы</a>
              <a href="#team" onClick={closeMenu}>Команда</a>
              <a href="#faq" onClick={closeMenu}>FAQ</a>
            </nav>
            <a className="custom-button custom-button-dark" href="#contact" onClick={closeMenu}>Обсудить задачу</a>
          </div>
        )}

        <div className="custom-hero-content">
          <h1 id="custom-hero-title">
            Автоматизируем бизнес-<span>процессы под ключ</span>
          </h1>
          <div className="custom-hero-cta">
            <a className="custom-button custom-button-light" href="#contact">Заказать</a>
            <a className="custom-button custom-button-ghost" href="#services">Обсудить задачу</a>
          </div>
        </div>

        <div className="custom-hero-logos" aria-label="С нами работают">
          <img className="is-mtbank" src="/media/mtbank-logo-mask.png" alt="МТБанк" />
          <img className="is-htp" src="/media/ntr-logo-mask.png" alt="ПВТ Беларусь" />
        </div>

        <div className="custom-hero-bottom" id="team">
          <h2>
            Погружаемся в работу компании,
            <span>проектируем решение и сопровождаем запуск</span>
          </h2>
          <article className="custom-founder-card">
            <span className="custom-founder-photo">
              <img src="/media/alexander-lukashevich.png" alt="Александр Лукашевич на презентации" />
            </span>
            <div>
              <p>Разберу задачу лично и скажу, где автоматизация окупится, а где нет</p>
              <small>CEO Mary</small>
              <strong>Александр Лукашевич</strong>
              <a href="#contact">
                Связаться
                <i aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="custom-section custom-scroll-story" id="services" aria-label="Услуги Mary Custom">
        <div className="custom-scroll-cards">
          {services.map((service, index) => (
            <article
              className={`custom-scroll-card ${activeService === index ? "is-active" : ""}`}
              data-scroll-service={index}
              key={service.number}
              onMouseEnter={() => setActiveService(index)}
              style={{
                // расстояние до активной строки и сторона — из них считается перспектива стопки
                "--distance": Math.abs(index - activeService),
                "--side": Math.sign(index - activeService),
              }}
            >
              <span className="custom-scroll-badge" aria-hidden="true">{service.number}</span>
              <span className="custom-scroll-title">
                <strong>{service.title}</strong>
                <small>{service.tags.join(" · ")}</small>
              </span>
              <ArrowRight className="custom-scroll-chevron" size={17} aria-hidden="true" />
              <div className="custom-scroll-mobile-copy">
                <p>{service.text}</p>
                <ArrowLink>Обсудить задачу</ArrowLink>
              </div>
            </article>
          ))}
        </div>

        <aside className="custom-scroll-copy">
          <div key={services[activeService].number}>
            <span>Услуги · {services[activeService].number} / {String(services.length).padStart(2, "0")}</span>
            <h2>{services[activeService].title}</h2>
            <p>{services[activeService].text}</p>
            <div className="custom-service-tags">
              {services[activeService].tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a className="custom-button custom-button-dark" href="#contact">Обсудить задачу</a>
          </div>
        </aside>
      </section>
      </div>

      <section className="custom-section custom-outcomes">
        <SectionIntro
          eyebrow="Результат"
          title="Что остаётся у бизнеса после запуска"
          text="Не набор отдельных работ, а решение, правила управления и основа для следующих изменений."
        />
        <div className="custom-outcome-grid">
          {outcomes.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-process" id="process">
        <SectionIntro
          eyebrow="Как работаем"
          title="Как задача превращается в работающий результат"
          text="Четыре понятных этапа. На каждом показываем рабочий результат и согласуем следующий шаг."
        />
        <div className="custom-process-list">
          {steps.map(([number, title, text, result]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <small><Check size={15} />{result}</small>
            </article>
          ))}
        </div>
        <ArrowLink>Начать с вводной встречи</ArrowLink>
      </section>

      <section className="custom-section custom-formats" id="formats">
        <SectionIntro
          eyebrow="Форматы работы"
          title="Выбираем формат под задачу"
          text="После вводного разговора предлагаем состав работ, который соответствует цели, уровню определённости и масштабу запуска."
        />
        <div className="custom-format-grid">
          {formats.map((format, index) => (
            <article key={format.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{format.title}</h3>
              <p>{format.text}</p>
              <small>На выходе</small>
              <strong>{format.result}</strong>
              <ArrowLink>Обсудить формат</ArrowLink>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-faq" id="faq">
        <SectionIntro
          eyebrow="Вопросы"
          title="Спросите Mary о работе команды"
          text="Выберите готовый вопрос или напишите свой — ответим так же, как ответили бы на вводной встрече."
        />
        <div className="custom-faq-chat">
          <div className="custom-chat-message is-mary">
            <small>Mary Custom</small>
            <p>Расскажу, как мы оцениваем, запускаем и сопровождаем проекты.</p>
          </div>
          <ol className="custom-faq-options" aria-label="Готовые вопросы">
            {faqs.map(([question], index) => (
              <li key={question}>
                <button type="button" onClick={() => setActiveFaq(index)}>
                  <span>{index + 1}</span>
                  {question}
                </button>
              </li>
            ))}
          </ol>
          {activeFaq !== null && (
            <div className="custom-chat-thread" aria-live="polite">
              <div className="custom-chat-message is-user"><p>{faqs[activeFaq][0]}</p></div>
              <div className="custom-chat-message is-mary">
                <small>Mary Custom</small>
                <p>{faqs[activeFaq][1]}</p>
              </div>
            </div>
          )}
          <form className="custom-chat-input" onSubmit={submitFaq}>
            <label className="sr-only" htmlFor="faq-question">Свой вопрос</label>
            <input
              id="faq-question"
              value={faqQuery}
              onChange={(event) => setFaqQuery(event.target.value)}
              placeholder="Напишите свой вопрос"
            />
            <button type="submit" aria-label="Задать вопрос"><ArrowRight size={18} /></button>
          </form>
        </div>
      </section>

      <section className="custom-contact" id="contact">
        <div className="custom-contact-copy">
          <span>Предварительная оценка</span>
          <h2>Опишите задачу — Mary покажет ориентир</h2>
          <p>Получите примерный диапазон бюджета и сроков. Точная оценка появится после короткого разбора контекста и интеграций.</p>
          <div><Sparkles size={20} /><span>Ориентир в долларах не является офертой и помогает понять порядок проекта</span></div>
        </div>
        <div className="custom-contact-panel">
          {submitted ? (
            <div className="custom-success" role="status">
              <span><Check size={28} /></span>
              <h3>Контакт сохранён</h3>
              <p>Задача и контакт у нас. Вернёмся с разбором и составом работ в течение рабочего дня.</p>
              <button className="custom-button custom-button-light" type="button" onClick={() => {
                setSubmitted(false);
                setEstimate(null);
                setEstimateText("");
                setContactValue("");
              }}>Рассчитать ещё одну задачу</button>
            </div>
          ) : estimate ? (
            <div className="custom-estimator-chat" aria-live="polite">
              <div className="custom-chat-message is-user"><p>{estimateText}</p></div>
              <div className="custom-chat-message is-mary is-dark">
                <small>Mary Custom</small>
                <p>Предварительно это похоже на формат «{estimate.type}».</p>
                <dl>
                  <div><dt>Бюджет</dt><dd>{estimate.budget}</dd></div>
                  <div><dt>Срок</dt><dd>{estimate.time}</dd></div>
                </dl>
                <em>Ориентир уточняется после разбора функций, интеграций и требований к запуску.</em>
              </div>
              <form className="custom-contact-step" onSubmit={submitContact}>
                <label>Куда отправить подробный разбор?
                  <input
                    required
                    value={contactValue}
                    onChange={(event) => setContactValue(event.target.value)}
                    placeholder="@telegram или телефон"
                  />
                </label>
                <label className="custom-consent">
                  <input type="checkbox" required />
                  <span>Согласен на обработку данных и принимаю политику конфиденциальности</span>
                </label>
                <button className="custom-button custom-button-light custom-submit" type="submit">
                  Оставить контакт <ArrowRight size={18} />
                </button>
              </form>
            </div>
          ) : (
            <form className="custom-estimator-start" onSubmit={submitEstimate}>
              <div className="custom-chat-message is-mary is-dark">
                <small>Mary Custom</small>
                <p>Что хотите запустить, улучшить или автоматизировать?</p>
              </div>
              <label className="sr-only" htmlFor="estimate-task">Описание задачи</label>
              <textarea
                id="estimate-task"
                required
                rows="7"
                value={estimateText}
                onChange={(event) => setEstimateText(event.target.value)}
                placeholder="Например: хотим связать заявки из Telegram с CRM и автоматически назначать менеджера"
              />
              <button className="custom-button custom-button-light custom-submit" type="submit">
                Получить ориентир <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="custom-footer">
        <div className="custom-footer-main">
          <div className="custom-footer-brand">
            <Brand dark />
            <p>Проектируем цифровые продукты и автоматизируем бизнес вместе с вашей командой.</p>
          </div>
          <div className="custom-footer-links">
            <nav aria-label="Услуги и проекты">
              <a href="#services">Услуги</a>
              <a href="#process">Как работаем</a>
              <a href="#formats">Форматы</a>
              <a href="#faq">Вопросы</a>
            </nav>
            <nav aria-label="Связаться с Mary Custom">
              <a href="#team">Команда</a>
              <a href="#contact">Обсудить задачу</a>
              <a href="#services">Посмотреть услуги</a>
              <a href="#top">Наверх</a>
            </nav>
          </div>
        </div>
        <div className="custom-footer-bottom">
          <span>© Mary Custom 2026</span>
          <div>
            <span>Политика конфиденциальности</span>
            <span>Условия использования</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
