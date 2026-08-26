import { useState } from "react";
import { ArrowRight, Check, Menu, X, ChevronDown, Plus, Sparkles } from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import arrowUpRight from "./assets/arrow-up-right.svg";
import { ChatReveal } from "./ChatReveal.jsx";
import { PainTriggers } from "./PainTriggers.jsx";
import { NicheStack } from "./NicheStack.jsx";
import { HeroField } from "./HeroField.jsx";
import { MaryDog } from "./MaryDog.jsx";
import { PlatformPanels } from "./PlatformPanels.jsx";
import { PlatformGather } from "./PlatformGather.jsx";
import { IntegrationsMarquee } from "./IntegrationsMarquee.jsx";
import { KeyScreens } from "./KeyScreens.jsx";
import { HowItWorks } from "./HowItWorks.jsx";
import { MaryVs, MaryControl } from "./MaryVs.jsx";
import { TrustBlock } from "./TrustBlock.jsx";
import { BlogTeaser } from "./BlogTeaser.jsx";
import { FooterFinal } from "./FooterFinal.jsx";
import { FloatingCta } from "./FloatingCta.jsx";
import { WorkflowAnim } from "./WorkflowAnim.jsx";
import "./custom-landing.css";
import "./hero.css";

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
  // Список пересобран 18.08 по FAQ конкурента: оставлены вопросы, которые
  // подходят Mary. Ответ про данные — каркас, факты хостинга подтвердить.
  ["Чем Mary отличается от обычного чата с ИИ?", "Обычный чат советует — делать всё равно вам. Mary живёт в вашей компании: знает прайсы и правила из базы знаний, сама пишет клиентам, ведёт запись и процессы. Ответ не нужно никуда переносить — он уже работа."],
  ["Нужно ли уметь программировать?", "Нет. Вы описываете задачу обычными словами, Mary собирает процесс из готовых блоков и показывает его целиком. Правки — тоже сообщением в чате."],
  ["Mary заменяет людей?", "Нет. Mary забирает рутину, а человеку отдаёт спорное: скидку, жалобу, нестандарт. Контроль и важные решения остаются за вами."],
  ["Может ли Mary что-то сделать без спроса?", "Нет. Mary работает в рамках прав, которые вы ей выдали, а критичные действия можно поставить на подтверждение. Каждый шаг виден в истории процесса."],
  ["Что будет, если Mary ошибётся?", "Спорные ситуации Mary сама передаёт сотруднику, а не решает наугад. Ошибка видна в истории и правится одним сообщением — правило сохраняется в базе знаний."],
  ["С какими системами работает?", "Мессенджеры (Instagram, Telegram, VK), системы записи (YClients, Altegio), CRM и другие сервисы. Способ интеграции проверяем до подключения."],
  ["Сколько стоит Mary?", "Зависит от числа процессов и каналов — состав тарифов на странице «Стоимость». Точную цифру называем после короткого разбора вашей задачи."],
  ["Где хранятся мои данные?", "Доступы к вашим системам выдаёте вы и можете отозвать в любой момент. Для компаний с чувствительными данными есть закрытый контур."],
];

function Brand() {
  return (
    <a className="custom-brand" href="/" aria-label="Mary, на главную">
      <img src={maryMark} alt="" />
      <span>mary</span>
    </a>
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
      <section className="custom-hero beauty-hero hero-2026" aria-labelledby="pf-hero-title">
        <HeroField className="pf-hero-field" dotAlpha={0.16} mode="halftone" speed={1.6} tone="light" />
        <div className="custom-hero-shade" aria-hidden="true" />

        <header className="custom-header pf-header">
          <nav className="pf-nav" aria-label="Навигация" onClick={(e) => e.stopPropagation()}>
            <a href="/?page=blog">Блог</a>
            <a href="/?page=cases">Кейсы</a>
          <a href="/?page=pricing">Стоимость</a>
            <a href="/?page=contacts">Контакты</a>
            <div className="mary-dd">
              <button type="button" onClick={() => toggle("companies")} aria-expanded={dd === "companies"}>
                
                Для компаний
                <ChevronDown size={16} />
              </button>
              {dd === "companies" && (
                <div className="mary-dd-menu wide">
                <a href="/?page=beauty">Красота</a>
                <a href="#">Производство</a>
                <a href="#">Клиники</a>
                <a href="#">Фитнес</a>
                <a href="#">Хорека</a>
                </div>
              )}
            </div>
          </nav>

          <Brand />

          <div className="custom-header-actions">
            {/* открывает инвест-презентацию в новой вкладке */}
            <a className="pf-link" href="/media/docs/mary-deck.pdf" rel="noopener" target="_blank">
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
            <span className="pf-hero-logos-label">С Mary уже работают</span>
            <img alt="Фабрика Фотокниги" src="/media/clients/fabrika.png" />
            <img alt="МТБанк" src="/media/clients/mtbank.png" />
            <img alt="ПВТ Беларусь" src="/media/clients/htp.png" />
            <img alt="Space" src="/media/clients/space.png" />
          </div>
        </div>

        <MaryDog />
      </section>

      <ChatReveal />

      <PainTriggers />

      <section className="custom-section" id="platform">
        {/* заголовок внутри PlatformGather: папки сбегаются в сетку под ним */}
        <PlatformGather />
        <PlatformPanels />
      </section>

      <HowItWorks />

      {/* Кульминация «как это работает»: живая сборка процесса.
          Соус: одно сообщение — дальше работает Mary. */}
      <section className="custom-section pf-assembly-section" id="assembly">
        <div className="asm-head">
          <span className="asm-eyebrow">Живая сборка</span>
          <h2>Одно сообщение — и процесс собран</h2>
          <p>Блоки, связи и агенты расставляются сами. Без схем, конструкторов и разработчиков.</p>
        </div>
        <div className="asm-msg" aria-hidden="true">
          <p>Хочу, чтобы запись клиентов шла без администратора</p>
        </div>
        <div className="asm-stage">
          <WorkflowAnim />
        </div>
      </section>

      <section className="custom-section pf-cases" id="cases">
        <h2 className="pf-cases-title">Когда нужна Mary</h2>

        <div className="pf-case-trio">
          <article className="pf-case">
            <h3>Собрать процесс с нуля</h3>
            <p>Опишите задачу обычными словами — Mary поднимет процесс из готовых блоков, подключит каналы и запустит его в работу. Без ТЗ и без разработчиков.</p>
          </article>
          <article className="pf-case">
            <h3>Завал в переписке</h3>
            <p>Клиенты пишут в разные каналы, часть теряется в пиковые часы и по ночам. Mary встречает каждое обращение и доводит его до записи.</p>
          </article>
          <article className="pf-case">
            <h3>Всё держится на одном человеке</h3>
            <p>Логика процесса живёт в голове сотрудника. Mary переносит её в систему, где видно каждый шаг и где ничего не встанет из-за отпуска.</p>
          </article>
        </div>
      </section>

      <NicheStack />

      <MaryVs />

      <MaryControl />

      <TrustBlock />

      {/* заголовок этой секции теперь живёт внутри KeyScreens (макет 10591:26400) */}
      <KeyScreens />

      <section className="custom-section beauty-ints-section" id="integrations">
        <IntegrationsMarquee />
      </section>

      <section className="custom-section pf-faq" id="faq">
        <div className="custom-section-intro">
          <h2>Отвечаем на вопросы</h2>
        </div>
        <div className="pf-faq-list">
          {faqs.map(([question, answer], i) => (
            <div className={`pf-faq-item ${activeFaq === i ? "is-open" : ""}`} key={question}>
              <button
                aria-expanded={activeFaq === i}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                type="button"
              >
                <span className="pf-faq-plus" aria-hidden="true"><Plus size={15} /></span>
                {question}
              </button>
              {activeFaq === i && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Форма заявки в стиле чата платформы: реплика Mary + два поля-пилюли */}
      <section className="pf-contact" id="contact">
        <div className="pf-contact-copy">
          <span className="pf-contact-eyebrow">С чего начать</span>
          <h2>Покажем Mary на вашей задаче</h2>
          <p>Короткий разбор: посмотрим ваш процесс, покажем, что Mary возьмёт на себя, и предложим план запуска.</p>
          <div className="pf-contact-note"><Sparkles size={16} aria-hidden="true" /><span>Начинаем с одной ниши или процесса, где эффект виден быстро</span></div>
        </div>
        <div className="pf-contact-panel">
          {submitted ? (
            <div className="pf-contact-success" role="status">
              <span><Check size={26} /></span>
              <h3>Заявка принята</h3>
              <p>Контакт у нас. Вернёмся с разбором в течение рабочего дня.</p>
              <button className="pf-btn is-dark" type="button" onClick={() => setSubmitted(false)}>Отправить ещё одну</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="pf-contact-bubble">
                <img alt="" src={maryMark} />
                <div>
                  <small>Mary</small>
                  <p>Что хотите упростить или автоматизировать?</p>
                </div>
              </div>
              <label className="pf-contact-field">
                <span>Задача</span>
                <input required placeholder="Например: запись клиентов из Instagram" />
              </label>
              <label className="pf-contact-field">
                <span>Контакт</span>
                <input required placeholder="@telegram или телефон" />
              </label>
              <label className="pf-contact-consent">
                <input type="checkbox" required />
                <span>Согласен на обработку данных и принимаю политику конфиденциальности</span>
              </label>
              <button className="pf-contact-submit" type="submit">Оставить заявку <ArrowRight size={17} /></button>
            </form>
          )}
        </div>
      </section>

      <BlogTeaser />

      <FooterFinal />

      <FloatingCta />
    </main>
  );
}
