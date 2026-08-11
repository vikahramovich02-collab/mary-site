import { useState } from "react";
import {
  ArrowRight, Check, Menu, X, ChevronDown, Sparkles,
  Bot, GitBranch, BookOpen, PlugZap, LineChart, Inbox,
} from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import { HeroField } from "./HeroField.jsx";
import "./custom-landing.css";

const niches = [
  { key: "beauty", emoji: "", title: "Салоны красоты", text: "Запись из соцсетей, ответы из прайса, YClients.", href: "/?page=beauty", status: "live" },
  { key: "cosmetology", title: "Косметология", text: "Консультации, подбор процедур, запись.", status: "soon" },
  { key: "clinic", title: "Клиники и стоматологии", text: "Приём обращений, запись, напоминания.", status: "soon" },
  { key: "fitness", title: "Фитнес и студии", text: "Абонементы, расписание, возврат клиентов.", status: "soon" },
  { key: "barber", title: "Барбершопы и ногтевые", text: "Быстрая запись и повторные визиты.", status: "soon" },
  { key: "services", title: "Услуги с записью", text: "Автосервисы, репетиторы и другие сферы.", status: "soon" },
];

const problems = [
  ["Зоопарк костылей", "AI удешевил разработку — каждый отдел собрал себе инструмент. Но никто не собирает компанию целиком."],
  ["Священная корова", "Логика живёт в голове одного сотрудника. Уходит человек — встаёт направление бизнеса."],
  ["Хаос дороже разработки", "У компании есть код, но нет контекста. Платить приходится уже за зависимость от людей."],
];

const solution = [
  "Готовые блоки, а не пустой конструктор — CRM, агенты, процессы уже внутри",
  "Chat-first: описываете задачу словами — Mary собирает рабочую систему",
  "Собирает компанию целиком, а контекст остаётся в системе, не в головах",
  "Импортирует то, что уже навайбкодили, — в актив компании",
];

const features = [
  [Bot, "AI-агенты", "Специалисты под задачи: поддержка, запись, продажи. Работают сами, спорное — человеку."],
  [GitBranch, "Бизнес-процессы", "Видно весь процесс целиком и где сейчас каждая задача. Правки — словами в чате."],
  [BookOpen, "База знаний", "Мозг процессов: прайсы, скрипты, правила, файлы. Агенты отвечают только отсюда."],
  [PlugZap, "Интеграции", "Каналы и системы: мессенджеры, YClients, CRM, телефония — в едином процессе."],
  [LineChart, "Аналитика", "Где и почему теряются клиенты, что улучшить. Не отчёт ради отчёта, а решения."],
  [Inbox, "Входящие", "Mary приносит только то, что требует вашего решения — спор о цене, жалобу, нестандарт."],
];

const steps = [
  ["01", "Опишите задачу словами", "Без ТЗ и конструкторов — обычным сообщением, что нужно компании.", "Контекст собран"],
  ["02", "Mary собирает систему", "Из готовых блоков поднимает процесс под вас — на глазах, за минуты.", "Процесс готов"],
  ["03", "Запускаете в работу", "Mary отвечает и ведёт процесс 24/7, спорное поднимает человеку.", "Работает сама"],
  ["04", "Смотрите и растёте", "Видите результат и где теряете, собираете следующие процессы.", "Управление по данным"],
];

const metrics = [
  ["26", "компаний уже на Mary", "Beauty, wellness и производства"],
  ["24/7", "отвечает и записывает", "Ночью принимает, спорное — утром вам"],
  ["секунды", "на ответ клиенту", "Пока конкурент думает — вы записали"],
  ["6 мес", "живого продукта", "Не презентация, а работающая платформа"],
];

const faqs = [
  ["Чем Mary отличается от конструктора агентов?", "Внутри уже есть готовые блоки — CRM, агенты, процессы, интеграции. Вы не начинаете с пустого холста, а описываете задачу словами, и Mary собирает систему под вашу компанию."],
  ["Нужно ли программировать или писать ТЗ?", "Нет. Вы объясняете задачу обычным языком, а Mary собирает процесс из готовых блоков и показывает его целиком. Настройка идёт через чат."],
  ["Mary заменяет людей?", "Нет. Mary держит рутину и приносит человеку только решения — спор о цене, жалобу, нестандарт. Контроль и важные действия остаются за вами."],
  ["С какими системами работает?", "Мессенджеры (Instagram, Telegram, VK), системы записи (YClients, Altegio), CRM и другие сервисы. Способ интеграции проверяем до подключения."],
  ["Как начать?", "Начинаем с одной ниши или процесса, где эффект виден быстро. Первый живой сегмент — салоны красоты; дальше — смежные сферы с записью."],
];

function Brand() {
  return (
    <a className="custom-brand" href="/" aria-label="Mary, на главную">
      <img src={maryMark} alt="" />
      <span>mary</span>
    </a>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="custom-section-intro">
      {eyebrow && <span className="beauty-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function PlatformLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dd, setDd] = useState(null); // 'companies' | 'order' | null
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toggle = (name) => setDd((cur) => (cur === name ? null : name));

  return (
    <main className="custom-site beauty-light" id="top" onClick={() => dd && setDd(null)}>
      <section className="custom-hero beauty-hero" aria-labelledby="pf-hero-title">
        <HeroField className="pf-hero-field" tone="light" />
        <div className="custom-hero-shade" aria-hidden="true" />

        <header className="custom-header">
          <Brand />
          <nav className="custom-nav" aria-label="Навигация" onClick={(e) => e.stopPropagation()}>
            <a href="#platform">Платформа</a>
            <div className="mary-dd">
              <button type="button" onClick={() => toggle("companies")} aria-expanded={dd === "companies"}>
                Компании <ChevronDown size={14} />
              </button>
              {dd === "companies" && (
                <div className="mary-dd-menu wide">
                  {niches.map((n) => (
                    <a key={n.key} href={n.status === "live" ? n.href : undefined} className={n.status === "soon" ? "soon" : ""}>
                      {n.title}<small>{n.status === "live" ? "Доступно" : "Скоро"}</small>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="mary-dd">
              <button type="button" onClick={() => toggle("order")} aria-expanded={dd === "order"}>
                Заказать <ChevronDown size={14} />
              </button>
              {dd === "order" && (
                <div className="mary-dd-menu">
                  <a href="/?page=custom">Разработка<small>Продукты, кабинеты, приложения</small></a>
                  <a href="/?page=custom">Автоматизация<small>Процессы, AI, интеграции</small></a>
                </div>
              )}
            </div>
            <a href="#how">Как работает</a>
          </nav>
          <div className="custom-header-actions">
            <a className="custom-language" href="#top" aria-label="Язык: русский">RU</a>
            <a className="custom-button custom-button-light custom-button-small" href="/?page=platform">Открыть демо</a>
            <button className="custom-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Меню"><Menu size={21} /></button>
          </div>
        </header>

        {menuOpen && (
          <div className="custom-mobile-menu" role="dialog" aria-modal="true" aria-label="Меню">
            <div><Brand /><button type="button" onClick={() => setMenuOpen(false)} aria-label="Закрыть"><X size={22} /></button></div>
            <nav>
              <a href="#platform" onClick={() => setMenuOpen(false)}>Платформа</a>
              <a href="/?page=beauty" onClick={() => setMenuOpen(false)}>Салоны</a>
              <a href="#how" onClick={() => setMenuOpen(false)}>Как работает</a>
              <a href="/?page=custom" onClick={() => setMenuOpen(false)}>Заказать</a>
            </nav>
            <a className="custom-button custom-button-dark" href="/?page=platform" onClick={() => setMenuOpen(false)}>Открыть демо</a>
          </div>
        )}

        <div className="custom-hero-content">
          <span className="beauty-hero-tag">Платформа Mary</span>
          <h1 id="pf-hero-title">Опишите задачу —<span>Mary соберёт рабочую систему</span></h1>
          <p className="custom-hero-copy">
            Chat-first платформа автоматизации бизнеса. Не пустой конструктор, а готовые блоки,
            из которых Mary собирает нужную систему под вашу компанию.
          </p>
          <div className="custom-hero-cta">
            <a className="custom-button custom-button-light" href="/?page=platform">Открыть демо</a>
            <a className="custom-button custom-button-ghost" href="#companies">Выбрать нишу</a>
          </div>
          <p className="pf-trust">Уже 26 компаний · 23 салона · работает на живом бизнесе</p>
        </div>
      </section>

      <section className="custom-section custom-problems" id="platform">
        <SectionIntro
          eyebrow="Зачем"
          title="У компании есть код, но нет контекста"
          text="AI удешевил разработку — обслуживание хаоса стало дорогим. Mary превращает разрозненные автоматизации в единую систему компании."
        />
        <div className="custom-outcome-grid">
          {problems.map(([t, x], i) => (
            <article key={t}><span>{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{x}</p></article>
          ))}
        </div>
      </section>

      <section className="custom-section">
        <SectionIntro eyebrow="Что такое Mary" title="Одна платформа собирает вашу компанию" />
        <div className="mary-checks">
          {solution.map((s) => (
            <div className="mary-check" key={s}><Check size={22} /><b>{s}</b></div>
          ))}
        </div>
      </section>

      <section className="custom-section" id="features">
        <SectionIntro eyebrow="Возможности" title="Не один агент, а рабочая среда" text="Готовые блоки, которые Mary собирает под вашу задачу." />
        <div className="custom-outcome-grid mary-features">
          {features.map(([Icon, t, x]) => (
            <article key={t}>
              <span className="mary-feature-ic"><Icon size={20} /></span>
              <h3>{t}</h3><p>{x}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-process" id="how">
        <SectionIntro eyebrow="Как это работает" title="От задачи до работающей системы" text="Вы описываете задачу словами — остальное собирает Mary. Настраивать конструкторы не нужно." />
        <div className="custom-process-list">
          {steps.map(([n, t, x, r]) => (
            <article key={n}><span>{n}</span><div><h3>{t}</h3><p>{x}</p></div><small><Check size={15} />{r}</small></article>
          ))}
        </div>
      </section>

      <section className="custom-section" id="companies">
        <SectionIntro eyebrow="Компании" title="Ниши, где встраиваем Mary" text="Начинаем с салонов красоты. Дальше — смежные сферы с записью: тот же кор + пара интеграций." />
        <div className="mary-niche">
          {niches.map((n) => {
            const live = n.status === "live";
            const Tag = live ? "a" : "div";
            return (
              <Tag key={n.key} className={`mary-nichecard ${live ? "" : "soon"}`} {...(live ? { href: n.href } : {})}>
                <span className={`mary-badge ${live ? "live" : "soon"}`}>{live ? "Доступно" : "Скоро"}</span>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                {live && <span className="go">Открыть лендинг →</span>}
              </Tag>
            );
          })}
        </div>
      </section>

      <section className="custom-section beauty-ints-section">
        <SectionIntro eyebrow="Интеграции" title="Работает с вашими каналами и системами" />
        <div className="beauty-ints">
          {["YCLIENTS", "Instagram", "Telegram", "VK", "Altegio", "Битрикс24", "Телефония"].map((name) => (
            <span className="beauty-int" key={name}><i aria-hidden="true" />{name}</span>
          ))}
        </div>
      </section>

      <section className="custom-section">
        <SectionIntro eyebrow="Уже работает" title="Спрос появился раньше релиза" />
        <div className="mary-metrics">
          {metrics.map(([n, b, p]) => (
            <article className="mary-metric" key={b}><span className="n">{n}</span><b>{b}</b><p>{p}</p></article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-faq" id="faq">
        <SectionIntro eyebrow="Вопросы" title="Коротко о платформе" />
        <div className="custom-faq-chat">
          <div className="custom-chat-message is-mary"><small>Mary</small><p>Расскажу, что за платформа и как она собирает систему под вашу компанию.</p></div>
          <ol className="custom-faq-options" aria-label="Вопросы">
            {faqs.map(([q], i) => (
              <li key={q}><button type="button" onClick={() => setActiveFaq(i)}><span>{i + 1}</span>{q}</button></li>
            ))}
          </ol>
          {activeFaq !== null && (
            <div className="custom-chat-thread" aria-live="polite">
              <div className="custom-chat-message is-user"><p>{faqs[activeFaq][0]}</p></div>
              <div className="custom-chat-message is-mary"><small>Mary</small><p>{faqs[activeFaq][1]}</p></div>
            </div>
          )}
        </div>
      </section>

      <section className="custom-contact" id="contact">
        <div className="custom-contact-copy">
          <span>С чего начать</span>
          <h2>Покажем Mary на вашей задаче</h2>
          <p>Короткий разбор: посмотрим ваш процесс, покажем, что Mary возьмёт на себя, и предложим план запуска.</p>
          <div><Sparkles size={20} /><span>Начинаем с одной ниши или процесса, где эффект виден быстро</span></div>
        </div>
        <div className="custom-contact-panel">
          {submitted ? (
            <div className="custom-success" role="status">
              <span><Check size={28} /></span>
              <h3>Заявка принята</h3>
              <p>Контакт у нас. Вернёмся с разбором в течение рабочего дня.</p>
              <button className="custom-button custom-button-light" type="button" onClick={() => setSubmitted(false)}>Отправить ещё одну</button>
            </div>
          ) : (
            <form className="custom-estimator-start" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="custom-chat-message is-mary is-dark"><small>Mary</small><p>Что хотите упростить или автоматизировать?</p></div>
              <label className="beauty-field">Задача<input required placeholder="Например: запись клиентов из Instagram" /></label>
              <label className="beauty-field">Контакт<input required placeholder="@telegram или телефон" /></label>
              <label className="custom-consent"><input type="checkbox" required /><span>Согласен на обработку данных и принимаю политику конфиденциальности</span></label>
              <button className="custom-button custom-button-light custom-submit" type="submit">Оставить заявку <ArrowRight size={18} /></button>
            </form>
          )}
        </div>
      </section>

      <footer className="custom-footer">
        <div className="custom-footer-main">
          <div className="custom-footer-brand">
            <Brand />
            <p>Chat-first платформа автоматизации бизнеса. Опишите задачу — Mary соберёт рабочую систему.</p>
          </div>
          <div className="custom-footer-links">
            <nav aria-label="Платформа">
              <a href="#platform">Платформа</a>
              <a href="#features">Возможности</a>
              <a href="#how">Как работает</a>
              <a href="/?page=platform">Демо</a>
            </nav>
            <nav aria-label="Ещё">
              <a href="#companies">Компании</a>
              <a href="/?page=beauty">Салоны</a>
              <a href="/?page=custom">Заказать разработку</a>
              <a href="#contact">Обсудить</a>
            </nav>
          </div>
        </div>
        <div className="custom-footer-bottom">
          <span>© Mary 2026</span>
          <div><span>Политика конфиденциальности</span><span>Условия использования</span></div>
        </div>
      </footer>
    </main>
  );
}
