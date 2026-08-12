import { useState } from "react";
import { ArrowRight, Check, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import arrowUpRight from "./assets/arrow-up-right.svg";
import navDot from "./assets/nav-dot.svg";
import { AssemblyDemo } from "./AssemblyDemo.jsx";
import { HeroField } from "./HeroField.jsx";
import { MaryDog } from "./MaryDog.jsx";
import { PlatformPanels } from "./PlatformPanels.jsx";
import { IntegrationsMarquee } from "./IntegrationsMarquee.jsx";
import { ProductTabs } from "./ProductTabs.jsx";
import "./custom-landing.css";

// Ниши в порядке готовности: сначала то, что уже работает на клиентах,
// потом соседние (тот же кор + пара интеграций), в конце — другой стек.
const niches = [
  { key: "beauty", title: "Красота", text: "Салоны, барбершопы, ногтевые, брови. Запись из соцсетей и YCLIENTS.", href: "/?page=beauty", status: "live" },
  { key: "manufacturing", title: "Производство", text: "Заявки, согласования, контроль сроков. Закрытый контур.", status: "live" },
  { key: "clinic", title: "Клиники и стоматологии", text: "Приём обращений, запись, напоминания о визите.", status: "soon" },
  { key: "fitness", title: "Фитнес и студии", text: "Абонементы, расписание, возврат клиентов.", status: "soon" },
  { key: "horeca", title: "Рестораны и кафе", text: "Брони, доставка, отзывы. Другой набор систем — делаем следующим.", status: "soon" },
  { key: "services", title: "Услуги с записью", text: "Автосервисы, груминг, репетиторы и смежные сферы.", status: "soon" },
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
        <HeroField className="pf-hero-field" dotAlpha={0.16} mode="halftone" tone="light" />
        <div className="custom-hero-shade" aria-hidden="true" />

        <header className="custom-header pf-header">
          <nav className="pf-nav" aria-label="Навигация" onClick={(e) => e.stopPropagation()}>
            <a href="/?page=blog"><img alt="" src={navDot} />Блог</a>
            <a href="#jobs"><img alt="" src={navDot} />Вакансии</a>
            <a href="#contact"><img alt="" src={navDot} />Контакты</a>
            <div className="mary-dd">
              <button type="button" onClick={() => toggle("companies")} aria-expanded={dd === "companies"}>
                <img alt="" src={navDot} />
                Для компаний
                <ChevronDown size={16} />
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
          </nav>

          <Brand />

          <div className="custom-header-actions">
            <a className="pf-link" href="#investors">
              Для инвесторов
              <img alt="" src={arrowUpRight} />
            </a>
            <a className="pf-link" href="/?page=custom">
              Заказать разработку
              <img alt="" src={arrowUpRight} />
            </a>
            <a className="pf-btn is-soft" href="/?page=platform">
              Войти в Mary
              <img alt="" src={arrowUpRight} />
            </a>
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
            <a className="pf-btn is-dark" href="/?page=platform">
              Попробовать
              <img alt="" src={arrowUpRight} />
            </a>
          </div>
          <div className="pf-hero-logos" aria-label="С нами работают">
            <img alt="Фабрика Фотокниги" src="/media/clients/fabrika.png" />
            <img alt="МТБанк" src="/media/clients/mtbank.png" />
            <img alt="ПВТ Беларусь" src="/media/clients/htp.png" />
            <img alt="Space" src="/media/clients/space.png" />
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

      <ProductTabs />

      <section className="custom-section beauty-ints-section" id="integrations">
        <h2 className="int-title">Встраивается в то, чем вы уже пользуетесь</h2>
        <IntegrationsMarquee />
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
