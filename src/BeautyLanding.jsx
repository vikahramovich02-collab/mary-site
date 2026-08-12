import { useState } from "react";
import { ArrowRight, Check, Menu, X, Sparkles } from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import { HeroField } from "./HeroField.jsx";
import "./custom-landing.css";

// Пары «триггер → потеря» и их зеркальные ответы — из питчдека для BEAUTYCON
const pains = [
  ["Долго ответили", "Ушла туда, где ответили быстрее. Клиентка и рекламный бюджет — в минус."],
  ["Не напомнили о записи", "Забыла и не пришла. Пустое окно — деньги за смену."],
  ["Постоянная давно не была", "Ушла к другим. Падает LTV — вернуть дороже, чем удержать."],
  ["Всё держится на одном админе", "Заболел или уволился — заявки висят. Риск на человеке."],
];

const answers = [
  ["Долго отвечали", "Отвечает за секунды, 24/7 — в любом канале. Лид не уходит к конкуренту."],
  ["Не напомнили", "Сама напоминает и подтверждает запись. Окна не пустуют, меньше неявок."],
  ["Постоянная пропала", "Возвращает вовремя: «пора обновить». Не платите за привлечение заново."],
  ["Всё на одном админе", "Работает как команда, без выходных и увольнений. Ничего не завязано на человека."],
];

// Слайд «Масштаб»: один движок на все процессы салона
const scope = [
  ["Продажи", ["Принять новый лид", "Понять намерение клиента", "Назначить следующий шаг", "Вернуть клиента в диалог"]],
  ["Операции", ["Подобрать время и создать запись", "Подтвердить визит", "Найти клиента на свободное окно", "Собрать утреннюю сводку"]],
  ["Сервис", ["Ответить по базе знаний", "Контролировать просроченные случаи", "Передать вопрос специалисту", "Зафиксировать результат"]],
  ["Управление", ["Проверить процесс", "Собрать отчёт для руководителя", "Увидеть потери на этапах", "Изменить правило и сохранить версию"]],
];

const features = [
  ["Ловит каждое обращение", "Instagram Директ и комментарии, Telegram, VK — Mary встречает сообщение за секунды и отвечает 24/7.", "Ни один лид не потерян"],
  ["Отвечает из вашего прайса", "Цены, услуги и условия — только из вашей базы знаний, премиум-тоном и на «вы». Ничего не выдумывает.", "Точные ответы без вас"],
  ["Подбирает время и записывает", "Сверяется с YClients, предлагает свободное окно и создаёт запись прямо в вашей системе.", "Запись в YClients"],
  ["Напоминает перед визитом", "Отправляет подтверждение и напоминание — меньше неявок и пустых окон в расписании.", "Меньше no-show"],
  ["Возвращает клиентов", "Замечает тех, кто давно не был, и мягко зовёт вернуться с уместным поводом.", "Выше повторные записи"],
  ["Спорное — администратору", "Скидки, жалобы и нестандарт Mary не решает сама — аккуратно передаёт человеку.", "Контроль остаётся у вас"],
];

const steps = [
  ["01", "Подключаем каналы и YClients", "Instagram, Telegram, VK и вашу систему записи — за пару дней.", "Каналы на связи"],
  ["02", "Наполняем базу знаний", "Прайс, услуги и правила салона. Можем собрать сами — Mary будет отвечать точно.", "Mary знает салон"],
  ["03", "Mary отвечает и записывает 24/7", "Встречает каждое обращение, ведёт к записи, спорное поднимает вам.", "Записи идут сами"],
  ["04", "Смотрите аналитику и растёте", "Видно, где теряются клиенты и что улучшить в приёме и рекламе.", "Управление по данным"],
];

const faqs = [
  ["Нужно ли что-то настраивать самим?", "Нет. Мы подключаем каналы и YClients, наполняем базу из вашего прайса — и Mary начинает отвечать и записывать сама. Вам остаётся смотреть результат."],
  ["Mary точно не наотвечает лишнего?", "Спорное — скидки, жалобы, нестандарт — Mary не решает сама, а передаёт администратору. Отвечает только из вашей базы, премиум-тоном на «вы»."],
  ["Куда попадают записи клиентов?", "Mary создаёт запись прямо в YClients: подбирает свободное окно, фиксирует услугу и мастера, отправляет клиенту подтверждение и напоминание перед визитом."],
  ["А если пишут в разных мессенджерах?", "Ловим все каналы: Instagram Директ и комментарии, Telegram, VK. Один человек = один лид, без задвоений между площадками."],
  ["Сколько это стоит?", "Подписка от $100 в месяц плюс оплата за использование. Точный тариф зависит от каналов и объёма обращений — посчитаем на коротком разборе."],
  ["Как быстро запустим?", "Обычно за несколько дней: подключение каналов, база знаний и тестовые сценарии — и Mary уже в работе на вашем салоне."],
];

function Brand({ dark = false }) {
  return (
    <a className={`custom-brand ${dark ? "is-dark" : ""}`} href="/" aria-label="Mary, на главную">
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

function SectionIntro({ title, text }) {
  return (
    <div className="custom-section-intro">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function BeautyLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [salonValue, setSalonValue] = useState("");
  const closeMenu = () => setMenuOpen(false);

  const submitContact = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="custom-site beauty-light beauty-page" id="top">
      <section className="custom-hero beauty-hero" aria-labelledby="beauty-hero-title">
        {/* халфтон-вертушка на фоне: розовая, очень светлая */}
        <HeroField
          className="pf-hero-field"
          dotAlpha={0.5}
          inkColor="240,168,190"
          mode="petals"
          tone="light"
        />
        <div className="custom-hero-shade" aria-hidden="true" />

        <header className="custom-header">
          <Brand />
          <nav className="custom-nav" aria-label="Навигация по странице">
            <a href="#problems">Проблемы</a>
            <a href="#features">Возможности</a>
            <a href="#how">Как работает</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="custom-header-actions">
            <a className="custom-language" href="/#companies" aria-label="Все отрасли">Отрасли</a>
            <a className="custom-button custom-button-light custom-button-small" href="#contact">Подключить салон</a>
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
              <a href="#problems" onClick={closeMenu}>Проблемы</a>
              <a href="#features" onClick={closeMenu}>Возможности</a>
              <a href="#how" onClick={closeMenu}>Как работает</a>
              <a href="#faq" onClick={closeMenu}>FAQ</a>
            </nav>
            <a className="custom-button custom-button-dark" href="#contact" onClick={closeMenu}>Подключить салон</a>
          </div>
        )}

        <div className="custom-hero-content">
          <h1 id="beauty-hero-title">
            Цифровая команда
            <span>для вашего салона</span>
          </h1>
          <p className="custom-hero-copy">
            Берёт на себя повторяющиеся задачи — от записи до утренней сводки. Настройки нет:
            вы рассказываете словами, как салону удобно, а Mary собирает процессы вокруг вас.
          </p>
          <div className="custom-hero-cta">
            <a className="custom-button custom-button-light" href="#contact">Подключить салон</a>
            <a className="custom-button custom-button-ghost" href="#how">Как это работает</a>
          </div>
        </div>
      </section>

      <section className="custom-section custom-problems" id="problems">
        <SectionIntro
          title="Клиенты и деньги утекают незаметно"
          text="Каждая ситуация — не разовая потеря, а привычка терять."
        />
        <div className="custom-outcome-grid">
          {pains.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section beauty-answers" id="answers">
        <SectionIntro
          title="Каждую боль Mary закрывает сама"
          text="Те же ситуации, что выше, — но закрытые."
        />
        <div className="custom-outcome-grid">
          {answers.map(([title, text]) => (
            <article key={title}>
              <span aria-hidden="true"><Check size={15} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section" id="features">
        <SectionIntro
          title="Отвечает, записывает и возвращает клиентов"
          text="Не просто чат-бот с красивыми ответами, а администратор, который доводит обращение до записи."
        />
        <div className="custom-format-grid">
          {features.map(([title, text, result], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>Результат</small>
              <strong>{result}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-process" id="how">
        <SectionIntro
          title="От подключения до записей — несколько дней"
          text="Вы описываете салон обычными словами, остальное собираем мы. Настраивать конструкторы не нужно."
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
        <ArrowLink>Подключить салон</ArrowLink>
      </section>

      <section className="custom-section" id="team">
        <SectionIntro
          title="Mary — главный AI-менеджер"
          text="Под каждый процесс она собирает команду агентов и управляет ими сама: агент обращений, агент клиентов, агент расписания — каждый на своём шаге, а сложное уходит сотруднику."
        />
        <div className="custom-format-grid">
          {[
            ["Агент обращений", "Встречает сообщение в любом канале и понимает, кто написал и зачем.", "Ответ за секунды"],
            ["Агент клиентов", "Проверяет по базе: новая клиентка или постоянная, что было в прошлый раз.", "Контекст под рукой"],
            ["Агент расписания", "Сверяется с вашей записью, подбирает свободное окно и создаёт визит.", "Запись без вас"],
            ["Спорное — человеку", "Скидки, жалобы и нестандарт Mary не решает сама, а передаёт администратору.", "Контроль у вас"],
          ].map(([title, text, result], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>Результат</small>
              <strong>{result}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section beauty-ints-section">
        <SectionIntro
          title="Интегрируется с любым сервисом"
          text="Каналы, CRM и календари — из коробки. Нужен другой сервис или своя CRM — подключаем по запросу, прямо в чате. Переносить ничего не нужно."
        />
        <div className="beauty-ints">
          {["Instagram", "Telegram", "WhatsApp", "ВКонтакте", "YClients", "Altegio", "Google Календарь", "amoCRM", "1С", "+ ваш сервис"].map((name) => (
            <span className="beauty-int" key={name}><i aria-hidden="true" />{name}</span>
          ))}
        </div>
      </section>

      <section className="custom-section" id="scope">
        <SectionIntro
          title="Mary помогает не только с записью"
          text="Один движок — на все процессы салона."
        />
        <div className="beauty-scope">
          {scope.map(([group, items]) => (
            <article key={group}>
              <h3>{group}</h3>
              <ul>
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-faq" id="faq">
        <SectionIntro
          title="Спросите Mary о работе в салоне"
          text="Выберите вопрос — ответим так же, как ответили бы на коротком разборе вашего салона."
        />
        <div className="custom-faq-chat">
          <div className="custom-chat-message is-mary">
            <small>Mary</small>
            <p>Расскажу, как подключаем салон, что беру на себя и где остаётся ваш контроль.</p>
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
                <small>Mary</small>
                <p>{faqs[activeFaq][1]}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="custom-contact" id="contact">
        <div className="custom-contact-copy">
          <span>Подключение салона</span>
          <h2>Оставьте контакт — подключим ваш салон</h2>
          <p>Короткий разбор: посмотрим ваши каналы и запись, покажем, где теряются клиенты, и предложим план запуска.</p>
          <div><Sparkles size={20} /><span>Первым салонам — приоритетное подключение и помощь с базой знаний</span></div>
        </div>
        <div className="custom-contact-panel">
          {submitted ? (
            <div className="custom-success" role="status">
              <span><Check size={28} /></span>
              <h3>Заявка принята</h3>
              <p>Контакт у нас. Вернёмся с разбором и планом подключения в течение рабочего дня.</p>
              <button className="custom-button custom-button-light" type="button" onClick={() => { setSubmitted(false); setContactValue(""); setSalonValue(""); }}>
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form className="custom-estimator-start" onSubmit={submitContact}>
              <div className="custom-chat-message is-mary is-dark">
                <small>Mary</small>
                <p>Как называется салон и куда прислать план подключения?</p>
              </div>
              <label className="beauty-field">Салон
                <input required value={salonValue} onChange={(event) => setSalonValue(event.target.value)} placeholder="Название салона и город" />
              </label>
              <label className="beauty-field">Контакт
                <input required value={contactValue} onChange={(event) => setContactValue(event.target.value)} placeholder="@telegram или телефон" />
              </label>
              <label className="custom-consent">
                <input type="checkbox" required />
                <span>Согласен на обработку данных и принимаю политику конфиденциальности</span>
              </label>
              <button className="custom-button custom-button-light custom-submit" type="submit">
                Оставить заявку <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="custom-footer">
        <div className="custom-footer-main">
          <div className="custom-footer-brand">
            <Brand />
            <p>Mary записывает клиентов и отвечает за секунды — в салонах красоты и других сферах с записью.</p>
          </div>
          <div className="custom-footer-links">
            <nav aria-label="Разделы">
              <a href="#problems">Проблемы</a>
              <a href="#features">Возможности</a>
              <a href="#how">Как работает</a>
              <a href="#faq">Вопросы</a>
            </nav>
            <nav aria-label="Ещё">
              <a href="/#companies">Все отрасли</a>
              <a href="#contact">Подключить салон</a>
              <a href="#top">Наверх</a>
            </nav>
          </div>
        </div>
        <div className="custom-footer-bottom">
          <span>© Mary 2026</span>
          <div>
            <span>Политика конфиденциальности</span>
            <span>Условия использования</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
