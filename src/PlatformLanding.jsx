import { useState } from "react";
import {
  ArrowRight, Check, Menu, X, ChevronDown, Sparkles,
  Bot, GitBranch, BookOpen, PlugZap, LineChart, Inbox,
} from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import { AssemblyDemo } from "./AssemblyDemo.jsx";
import { HeroField } from "./HeroField.jsx";
import { MaryDog } from "./MaryDog.jsx";
import { PlatformPanels } from "./PlatformPanels.jsx";
import { IntegrationsMarquee } from "./IntegrationsMarquee.jsx";
import { ProductTabs } from "./ProductTabs.jsx";
import "./custom-landing.css";

const niches = [
  { key: "beauty", emoji: "", title: "Салоны красоты", text: "Запись из соцсетей, ответы из прайса, YClients.", href: "/?page=beauty", status: "live" },
  { key: "cosmetology", title: "Косметология", text: "Консультации, подбор процедур, запись.", status: "soon" },
  { key: "clinic", title: "Клиники и стоматологии", text: "Приём обращений, запись, напоминания.", status: "soon" },
  { key: "fitness", title: "Фитнес и студии", text: "Абонементы, расписание, возврат клиентов.", status: "soon" },
  { key: "barber", title: "Барбершопы и ногтевые", text: "Быстрая запись и повторные визиты.", status: "soon" },
  { key: "services", title: "Услуги с записью", text: "Автосервисы, репетиторы и другие сферы.", status: "soon" },
];

const features = [
  [Bot, "AI-агенты", "Специалисты под задачи: поддержка, запись, продажи. Работают сами, спорное — человеку."],
  [GitBranch, "Бизнес-процессы", "Видно весь процесс целиком и где сейчас каждая задача. Правки — словами в чате."],
  [BookOpen, "База знаний", "Мозг процессов: прайсы, скрипты, правила, файлы. Агенты отвечают только отсюда."],
  [PlugZap, "Интеграции", "Каналы и системы: мессенджеры, YClients, CRM, телефония — в едином процессе."],
  [LineChart, "Аналитика", "Где и почему теряются клиенты, что улучшить. Не отчёт ради отчёта, а решения."],
  [Inbox, "Входящие", "Mary приносит только то, что требует вашего решения — спор о цене, жалобу, нестандарт."],
];

const tracks = [
  ["Отвечает клиентам", "В мессенджерах, за секунды, круглосуточно."],
  ["Ведёт запись", "Подбирает время и создаёт визит в вашей системе."],
  ["Помнит правила", "Прайс, скрипты, условия — ответы только отсюда."],
  ["Держит процесс", "Видно, где каждая задача и где всё встало."],
  ["Поднимает спорное", "Скидки, жалобы и нестандарт уходят человеку."],
  ["Показывает потери", "Где клиенты отваливаются и что чинить."],
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

function SectionIntro({ title, text }) {
  return (
    <div className="custom-section-intro">
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
        <HeroField className="pf-hero-field" mode="halftone" tone="light" />
        <div className="custom-hero-shade" aria-hidden="true" />

        <header className="custom-header pf-header">
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
            <a className="custom-button custom-button-ghost custom-button-small" href="/?page=custom">Разработать</a>
            <a className="custom-button custom-button-light custom-button-small" href="/?page=platform">Войти в Mary</a>
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
          <h1 id="pf-hero-title">Соберёт рабочую систему в 2 клика</h1>
          <p className="custom-hero-copy">Chat-first платформа автоматизации бизнеса</p>
          <div className="custom-hero-cta">
            <a className="custom-button custom-button-ghost" href="#how">Как это работает</a>
            <a className="custom-button custom-button-light" href="/?page=platform">Собрать</a>
          </div>
          <div className="pf-hero-logos" aria-label="С нами работают">
            <img src="/media/mtbank-logo-mask.png" alt="МТБанк" />
            <img className="is-htp" src="/media/ntr-logo-mask.png" alt="ПВТ Беларусь" />
          </div>
        </div>

        <MaryDog />
      </section>

      <section className="custom-section pf-assembly-section" aria-label="Как Mary собирает процесс">
        <SectionIntro
          title="Всё делается в чате"
          text="Вы говорите обычными словами — процесс собирается на глазах и сразу идёт в работу. Настраивать конструкторы и звать разработчиков не нужно."
        />
        <AssemblyDemo />

        {/* тот же разговор, только вживую: ролик из самой платформы */}
        <figure className="pf-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/media/screens/chat.png"
            preload="none"
          >
            <source src="/media/platform-demo.mp4" type="video/mp4" />
          </video>
        </figure>
      </section>

      <section className="custom-section" id="platform">
        <SectionIntro title="Одна платформа собирает вашу компанию" />
        <PlatformPanels />
      </section>

      <section className="custom-section" id="features">
        <SectionIntro title="Не один агент, а рабочая среда" text="Готовые блоки, которые Mary собирает под вашу задачу." />
        <div className="custom-outcome-grid mary-features">
          {features.map(([Icon, t, x]) => (
            <article key={t}>
              <span className="mary-feature-ic"><Icon size={20} /></span>
              <h3>{t}</h3><p>{x}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section pf-tracks-section" id="tracks">
        <SectionIntro title="Что снимается с людей" />
        <div className="pf-tracks">
          {tracks.map(([title, text]) => (
            <article key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductTabs />

      <section className="custom-section beauty-ints-section" id="integrations">
        <h2 className="int-title">Встраивается в то, чем вы уже пользуетесь</h2>
        <IntegrationsMarquee />
      </section>

      <section className="custom-section" id="companies">
        <SectionIntro title="Ниши, где встраиваем Mary" text="Начинаем с салонов красоты. Дальше — смежные сферы с записью: тот же кор + пара интеграций." />
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

      <section className="custom-section custom-faq" id="faq">
        <SectionIntro title="Коротко о платформе" />
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
