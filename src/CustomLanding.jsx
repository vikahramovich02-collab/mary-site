import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileCheck2,
  Menu,
  Paperclip,
  Route,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import "./custom-landing.css";

const problems = [
  "Обращения приходят из разных каналов и теряются",
  "Менеджеры вручную переносят заявки в CRM и таблицы",
  "Сотрудники каждый раз заново ищут информацию для ответа",
  "Заказы и документы проходят через длинные согласования",
  "Руководитель не видит, где остановился процесс",
  "Одинаковые отчёты и уведомления собираются вручную",
];

const services = [
  {
    number: "01",
    title: "Клиентский сервис",
    text: "Собираем обращения, определяем контекст, готовим ответы и передаём сложные случаи сотруднику.",
  },
  {
    number: "02",
    title: "Продажи и CRM",
    text: "Квалифицируем заявки, обновляем карточки клиентов и контролируем следующее действие.",
  },
  {
    number: "03",
    title: "Заказы и операции",
    text: "Проверяем данные, запускаем согласования, передаём в исполнение и обновляем статус.",
  },
  {
    number: "04",
    title: "Документы и финансы",
    text: "Собираем данные, готовим документы, проводим сверки и контролируем оплату.",
  },
  {
    number: "05",
    title: "Внутренние процессы",
    text: "Автоматизируем заявки сотрудников, онбординг, назначения, сроки и уведомления.",
  },
  {
    number: "06",
    title: "Контроль и аналитика",
    text: "Показываем состояние процессов, причины задержек, ошибки и точки для улучшения.",
  },
];

const outcomes = [
  ["Меньше ручных операций", "Данные передаются между этапами без постоянного копирования сотрудниками."],
  ["Понятное состояние процесса", "Команда видит, что сделано, где задержка и кто отвечает за следующий шаг."],
  ["Единые правила работы", "Типовые случаи проходят по согласованному сценарию, исключения получает человек."],
  ["Основа для развития", "Процесс задокументирован, поэтому его можно измерять, изменять и масштабировать."],
];

const examples = [
  ["Обращение", "Ответ", "Задача"],
  ["Заявка", "CRM", "Следующее действие"],
  ["Заказ", "Исполнение", "Статус"],
  ["Документ", "Проверка", "Согласование"],
];

const steps = [
  ["01", "Рассказываете о задаче", "Описываете процесс обычными словами. Техническое задание не требуется.", "Первичное понимание задачи"],
  ["02", "Разбираем текущую работу", "Изучаем участников, системы, правила, данные и исключения.", "Карта процесса «как сейчас»"],
  ["03", "Проектируем решение", "Показываем будущий процесс простыми блоками и согласуем границы.", "Схема «как будет» и план"],
  ["04", "Собираем и проверяем", "Подключаем сервисы, разрабатываем логику и тестируем на безопасных данных.", "Проверенный рабочий сценарий"],
  ["05", "Запускаем и поддерживаем", "Контролируем первые запуски, исправляем ошибки и развиваем процесс.", "Устойчивая автоматизация"],
];

const formats = [
  {
    title: "Разбор процесса",
    text: "Для компании, которая видит проблему, но ещё не знает, с чего начать.",
    result: "Карта процесса, узкие места и следующий шаг.",
  },
  {
    title: "Автоматизация под ключ",
    text: "Для конкретного повторяющегося процесса с понятным результатом.",
    result: "Спроектированное, проверенное и запущенное решение.",
  },
  {
    title: "Автоматизация отдела",
    text: "Для нескольких связанных процессов в сервисе, продажах или операциях.",
    result: "Согласованная система работы отдела.",
  },
  {
    title: "Постоянная команда",
    text: "Для регулярного развития процессов и очереди автоматизаций.",
    result: "Непрерывный цикл анализа, внедрения и сопровождения.",
  },
];

const faqs = [
  ["Нужно ли готовить техническое задание?", "Нет. Достаточно описать текущий процесс, проблему и желаемый результат обычными словами. Требования соберёт и согласует наша команда."],
  ["Можно ли начать с одного процесса?", "Да. Для первого проекта лучше выбрать повторяющийся процесс с понятным результатом и доступными данными."],
  ["Как понять, что автоматизировать первым?", "Мы оцениваем частоту процесса, объём ручной работы, количество ошибок, влияние на клиента и сложность внедрения."],
  ["С какими системами вы работаете?", "Состав зависит от задачи. Сначала изучаем существующие сервисы и возможности интеграции, затем предлагаем реалистичную архитектуру."],
  ["Сколько стоит автоматизация?", "Стоимость зависит от количества этапов, систем, исключений и требований к надёжности. Оценка формируется после первичного разбора."],
  ["Что происходит после запуска?", "Контролируем первые запуски, исправляем ошибки, обновляем правила и при необходимости развиваем автоматизацию."],
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

  useEffect(() => {
    if (window.location.hash === "#team") {
      document.getElementById("team")?.scrollIntoView();
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="custom-site" id="top">
      <section className="custom-hero" aria-labelledby="custom-hero-title">
        <video
          className="custom-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/mary-hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/mary-hero.mp4" type="video/mp4" />
        </video>
        <div className="custom-hero-shade" aria-hidden="true" />

        <header className="custom-header">
          <Brand dark />
          <nav className="custom-nav" aria-label="Навигация по странице">
            <a href="#services">Что делаем</a>
            <a href="#process">Как работаем</a>
            <a href="#experience">Проекты</a>
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
              <a href="#services" onClick={closeMenu}>Что делаем</a>
              <a href="#process" onClick={closeMenu}>Как работаем</a>
              <a href="#experience" onClick={closeMenu}>Проекты</a>
              <a href="#team" onClick={closeMenu}>Команда</a>
              <a href="#faq" onClick={closeMenu}>FAQ</a>
            </nav>
            <a className="custom-button custom-button-dark" href="#contact" onClick={closeMenu}>Обсудить задачу</a>
          </div>
        )}

        <div className="custom-hero-content">
          <h1 id="custom-hero-title">
            Автоматизируем бизнес-
            <span>процессы под ключ</span>
          </h1>
          <div className="custom-hero-cta">
            <a className="custom-button custom-button-light" href="#contact">Заказать</a>
            <a className="custom-button custom-button-ghost" href="#services">Заказать</a>
          </div>
        </div>

        <div className="custom-hero-logos" aria-label="Компании, с которыми работала команда">
          <img src="/media/mtbank-logo-mask.png" alt="МТБанк" />
          <img src="/media/mtbank-logo-mask.png" alt="" aria-hidden="true" />
          <img src="/media/mtbank-logo-mask.png" alt="" aria-hidden="true" />
          <img src="/media/ntr-logo-mask.png" alt="НТР Беларусь" />
          <img src="/media/ntr-logo-mask.png" alt="" aria-hidden="true" />
        </div>

        <div className="custom-hero-bottom" id="team">
          <h2>
            Погружаемся в работу компании,
            <span>проектируем решение и сопровождаем запуск</span>
          </h2>
          <article className="custom-founder-card">
            <img src="/media/alexander-lukashevich.png" alt="Александр Лукашевич на презентации" />
            <div>
              <p>Погружаемся в работу компании, проектируем решение</p>
              <small>CEO Mary</small>
              <strong>Александр Лукашевич</strong>
              <a href="#contact">
                Связаться
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="custom-section custom-problems" id="problems">
        <SectionIntro
          eyebrow="Узнаваемые ситуации"
          title="Какие процессы пора перестать делать вручную"
          text="Автоматизация полезна там, где работа повторяется, данные приходится переносить, а результат зависит от внимательности конкретного сотрудника."
        />
        <div className="custom-problem-list">
          {problems.map((problem, index) => (
            <div key={problem}><span>{String(index + 1).padStart(2, "0")}</span><p>{problem}</p></div>
          ))}
        </div>
        <ArrowLink>Показать свой процесс</ArrowLink>
      </section>

      <section className="custom-section custom-services" id="services">
        <SectionIntro
          eyebrow="Что автоматизируем"
          title="Связанные процессы, а не отдельные действия"
          text="Смотрим, как задача проходит через людей и системы, и собираем единый сценарий — от входящего события до контролируемого результата."
        />
        <div className="custom-service-list">
          {services.map((service) => (
            <article key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ArrowRight size={20} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-outcomes">
        <SectionIntro eyebrow="Результат" title="Что меняется после внедрения" />
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

      <section className="custom-section custom-experience" id="experience">
        <SectionIntro
          eyebrow="Опыт"
          title="Работаем с процессами, которые проходят через людей и несколько систем"
          text="Показываем типы задач, а не один выделенный кейс. Каждый сценарий проектируется под правила конкретной компании."
        />
        <div className="custom-example-list">
          {examples.map((example, index) => (
            <article key={example.join("-")}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                {example.map((item, itemIndex) => (
                  <span key={item}>
                    {item}
                    {itemIndex < example.length - 1 && <ArrowRight size={20} aria-hidden="true" />}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="custom-experience-note">
          <Route size={22} />
          <p>Перед автоматизацией фиксируем правила, исключения и точки передачи ответственности. Поэтому решение поддерживает реальный процесс, а не только идеальный сценарий.</p>
        </div>
      </section>

      <section className="custom-section custom-process" id="process">
        <SectionIntro
          eyebrow="Как работаем"
          title="От первого разговора до работающего процесса"
          text="Движемся поэтапно: каждое решение можно проверить до того, как оно повлияет на реальную работу."
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
        <ArrowLink>Начать с разбора процесса</ArrowLink>
      </section>

      <section className="custom-section custom-deliverables">
        <SectionIntro
          eyebrow="На выходе"
          title="Не часы разработки, а готовый результат"
          text="Состав фиксируется до начала проекта. Вы понимаете, что именно получите на каждом этапе."
        />
        <div className="custom-document-stack">
          {[
            ["Карта процесса", "Как работа устроена сейчас"],
            ["Схема решения", "Как будет работать новый сценарий"],
            ["План внедрения", "Этапы, зависимости и критерии готовности"],
            ["Рабочий процесс", "Проверенная автоматизация и интеграции"],
            ["Документация", "Правила запуска, ошибок и изменений"],
          ].map(([title, text], index) => (
            <article key={title} style={{ "--document-index": index }}>
              <FileCheck2 size={22} />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="custom-section custom-formats" id="formats">
        <SectionIntro
          eyebrow="Форматы работы"
          title="Можно начать с одного процесса"
          text="Выбираем формат после первичного разговора — без искусственных тарифов и лишнего объёма."
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

      <section className="custom-section custom-safety">
        <div className="custom-safety-heading">
          <ShieldCheck size={30} />
          <SectionIntro eyebrow="Безопасность" title="Сначала проверяем. Потом запускаем." />
        </div>
        <div className="custom-safety-list">
          {[
            "Согласуем будущий процесс до разработки",
            "Запрашиваем только необходимые доступы",
            "Проверяем сценарии на безопасных данных",
            "Запускаем изменения поэтапно",
            "Фиксируем ошибки и историю изменений",
            "Передаём неоднозначные случаи человеку",
          ].map((item) => <p key={item}><Check size={16} />{item}</p>)}
        </div>
      </section>

      <section className="custom-section custom-faq" id="faq">
        <SectionIntro eyebrow="FAQ" title="Частые вопросы об автоматизации" />
        <div className="custom-faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{question}</span><ChevronDown size={20} /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="custom-contact" id="contact">
        <div className="custom-contact-copy">
          <span>Первый шаг</span>
          <h2>Покажите один процесс, который отнимает время</h2>
          <p>Разберём, как он работает сейчас, и предложим понятный следующий шаг. Можно начать без технического задания.</p>
          <div><Sparkles size={20} /><span>Отправка формы не обязывает начинать проект</span></div>
        </div>
        <div className="custom-contact-panel">
          {submitted ? (
            <div className="custom-success" role="status">
              <span><Check size={28} /></span>
              <h3>Задача отправлена</h3>
              <p>Спасибо. Мы свяжемся с вами, чтобы уточнить контекст и договориться о следующем шаге.</p>
              <button className="custom-button custom-button-light" type="button" onClick={() => setSubmitted(false)}>Отправить ещё одну</button>
            </div>
          ) : (
            <form onSubmit={submitForm}>
              <label>Как к вам обращаться<input name="name" required autoComplete="name" placeholder="Имя" /></label>
              <label>Рабочий контакт<input name="contact" required placeholder="Телефон, email или Telegram" /></label>
              <label>Какой процесс хотите улучшить<textarea name="task" required rows="4" placeholder="Опишите обычными словами, что происходит сейчас" /></label>
              <label className="custom-file">
                <Paperclip size={17} />
                <span>Приложить файл</span>
                <input type="file" />
              </label>
              <label className="custom-consent"><input type="checkbox" required /><span>Согласен на обработку данных и принимаю политику конфиденциальности</span></label>
              <button className="custom-button custom-button-light custom-submit" type="submit">Отправить задачу <ArrowRight size={18} /></button>
            </form>
          )}
        </div>
      </section>

      <footer className="custom-footer">
        <Brand dark />
        <p>Автоматизация бизнес-процессов под ключ</p>
        <nav aria-label="Навигация в подвале">
          <a href="#services">Что автоматизируем</a>
          <a href="#process">Как работаем</a>
          <a href="#formats">Форматы</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div><a href="/?page=platform">Mary SaaS</a><span>© 2026 Mary Custom</span></div>
      </footer>
    </main>
  );
}
