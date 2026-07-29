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
  "Есть идея продукта, но нет команды, которая доведёт её до запуска",
  "Клиенты работают через письма и таблицы вместо удобного сервиса",
  "Менеджеры вручную переносят данные между CRM и учётными системами",
  "Заказы, документы и согласования зависят от ручной координации",
  "Внутренние инструменты не поддерживают реальный процесс команды",
  "Существующий продукт сложно развивать без постоянного тушения пожаров",
];

const services = [
  {
    number: "01",
    title: "Исследование и продуктовый дизайн",
    text: "Проверяем идею, изучаем пользователей и процессы, проектируем сценарии и создаём прототип до начала разработки.",
  },
  {
    number: "02",
    title: "Веб-сервисы и личные кабинеты",
    text: "Разрабатываем клиентские продукты, порталы, кабинеты и внутренние системы — от первой версии до развития.",
  },
  {
    number: "03",
    title: "Мобильные приложения",
    text: "Создаём мобильный опыт вокруг ключевого сценария бизнеса и связываем приложение с действующими системами.",
  },
  {
    number: "04",
    title: "Автоматизация и AI",
    text: "Убираем ручные операции, внедряем AI-сценарии, маршруты согласований и контроль исключений.",
  },
  {
    number: "05",
    title: "Интеграции и данные",
    text: "Связываем CRM, ERP, банки, телефонию, мессенджеры и внутренние сервисы в единый процесс.",
  },
  {
    number: "06",
    title: "Команда на аутсорсе",
    text: "Подключаем аналитика, дизайнера, разработчиков и QA под задачу и отвечаем за выпуск и поддержку.",
  },
];

const outcomes = [
  ["Продукт выходит в работу", "Команда получает не презентацию и не набор макетов, а проверенное решение, готовое к реальному использованию."],
  ["Бизнес управляет процессом", "Понятны статусы, точки ответственности, исключения и данные для принятия решений."],
  ["Не нужно собирать штат", "Все ключевые компетенции подключаются под этап проекта и работают как одна команда."],
  ["Есть основа для развития", "Архитектура, интерфейсы и процессы задокументированы, поэтому решение можно безопасно масштабировать."],
];

const examples = [
  ["Идея", "Прототип", "MVP"],
  ["Клиент", "Личный кабинет", "Сервис"],
  ["Заявка", "Системы", "Результат"],
  ["Процесс", "Автоматизация", "Контроль"],
];

const steps = [
  ["01", "Погружаемся", "Разбираем задачу, пользователей, процессы, ограничения и текущие системы.", "Карта контекста"],
  ["02", "Проектируем", "Определяем решение, границы первой версии, архитектуру и критерии результата.", "Прототип и план"],
  ["03", "Разрабатываем", "Собираем продукт короткими итерациями и регулярно показываем рабочую версию.", "Готовый релиз"],
  ["04", "Внедряем", "Подключаем системы, переносим данные, обучаем команду и запускаем поэтапно.", "Работающее решение"],
  ["05", "Развиваем", "Следим за качеством, исправляем узкие места и планируем следующие улучшения.", "Предсказуемое развитие"],
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
            <a href="#services">Услуги</a>
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
              <a href="#services" onClick={closeMenu}>Услуги</a>
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
            Разрабатываем продукты
            <span>и автоматизируем бизнес</span>
          </h1>
          <p className="custom-hero-copy">Внешняя продуктовая команда: исследование, дизайн, разработка, интеграции и поддержка — от задачи до работающего решения.</p>
          <div className="custom-hero-cta">
            <a className="custom-button custom-button-light" href="#contact">Обсудить задачу</a>
            <a className="custom-button custom-button-ghost" href="#services">Посмотреть услуги</a>
          </div>
        </div>

        <div className="custom-hero-logos" aria-label="Компетенции команды">
          <span>Product discovery</span>
          <span>UX/UI</span>
          <span>Web & mobile</span>
          <span>AI и автоматизация</span>
          <span>Интеграции</span>
        </div>

        <div className="custom-hero-bottom" id="team">
          <h2>
            Собираем команду под задачу,
            <span>отвечаем за запуск и дальнейшее развитие</span>
          </h2>
          <article className="custom-founder-card">
            <img src="/media/alexander-lukashevich.png" alt="Александр Лукашевич на презентации" />
            <div>
              <p>У проекта есть владелец, а не цепочка исполнителей</p>
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
          eyebrow="Когда мы полезны"
          title="Задачи, для которых нужна сильная внешняя команда"
          text="Подключаемся, когда важно быстро превратить идею в продукт, связать разрозненные системы или перестроить ручной процесс без расширения собственного штата."
        />
        <div className="custom-problem-list">
          {problems.map((problem, index) => (
            <div key={problem}><span>{String(index + 1).padStart(2, "0")}</span><p>{problem}</p></div>
          ))}
        </div>
        <ArrowLink>Показать свою задачу</ArrowLink>
      </section>

      <section className="custom-section custom-services" id="services">
        <SectionIntro
          eyebrow="Услуги"
          title="Одна команда — от исследования до работающего продукта"
          text="Подключаем нужные компетенции под этап проекта. Сохраняем единый контекст и отвечаем не за часы, а за согласованный результат."
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
        <SectionIntro eyebrow="Результат" title="Что получает бизнес после запуска" />
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
          eyebrow="Типовые проекты"
          title="Запускаем новое и приводим в порядок существующее"
          text="Каждый сценарий проектируется под контекст компании. Показываем типы задач, с которыми особенно полезна кросс-функциональная продуктовая команда."
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
          <p>Перед разработкой фиксируем пользовательский сценарий, бизнес-правила, интеграции и точки ответственности. Поэтому решение поддерживает реальную работу, а не только идеальный макет.</p>
        </div>
      </section>

      <section className="custom-section custom-process" id="process">
        <SectionIntro
          eyebrow="Как работаем"
          title="Прозрачный путь от задачи до устойчивого результата"
          text="Делим проект на проверяемые этапы. Вы видите прогресс и принимаете ключевые решения на рабочих версиях, а не только в финале."
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

      <section className="custom-section custom-deliverables">
        <SectionIntro
          eyebrow="На выходе"
          title="Не набор специалистов, а управляемый результат"
          text="Состав и критерии готовности фиксируются до начала этапа. Вы понимаете, что именно получите и как примете работу."
        />
        <div className="custom-document-stack">
          {[
            ["Карта контекста", "Пользователи, процессы, данные и ограничения"],
            ["Прототип", "Проверенный пользовательский и бизнес-сценарий"],
            ["План релиза", "Этапы, зависимости и критерии готовности"],
            ["Рабочий продукт", "Интерфейсы, логика и интеграции"],
            ["Документация", "Архитектура, запуск, поддержка и развитие"],
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
          title="Можно начать с небольшой проверяемой задачи"
          text="Выбираем формат после вводного разговора — без искусственных тарифов, раздутого состава команды и лишнего объёма."
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
            "Фиксируем границы первой версии и критерии готовности",
            "Показываем рабочий результат короткими итерациями",
            "Запрашиваем только необходимые доступы",
            "Проверяем интеграции на безопасных данных",
            "Запускаем изменения поэтапно",
            "Документируем решение и порядок поддержки",
          ].map((item) => <p key={item}><Check size={16} />{item}</p>)}
        </div>
      </section>

      <section className="custom-section custom-faq" id="faq">
        <SectionIntro eyebrow="Вопросы" title="Что важно знать до старта" />
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
          <h2>Расскажите, что хотите запустить или изменить</h2>
          <p>Разберём контекст, предложим реалистичный формат старта и определим следующий шаг. Можно начать без технического задания.</p>
          <div><Sparkles size={20} /><span>Вводная встреча не обязывает начинать большой проект</span></div>
        </div>
        <div className="custom-contact-panel">
          {submitted ? (
            <div className="custom-success" role="status">
              <span><Check size={28} /></span>
              <h3>Спасибо, задача принята</h3>
              <p>Свяжемся с вами, чтобы уточнить контекст и договориться о вводной встрече.</p>
              <button className="custom-button custom-button-light" type="button" onClick={() => setSubmitted(false)}>Отправить ещё одну</button>
            </div>
          ) : (
            <form onSubmit={submitForm}>
              <label>Как к вам обращаться<input name="name" required autoComplete="name" placeholder="Имя" /></label>
              <label>Рабочий контакт<input name="contact" required placeholder="Телефон, email или Telegram" /></label>
              <label>Что хотите создать или улучшить<textarea name="task" required rows="4" placeholder="Опишите задачу обычными словами" /></label>
              <label className="custom-file">
                <Paperclip size={17} />
                <span>Приложить материалы</span>
                <input type="file" />
              </label>
              <label className="custom-consent"><input type="checkbox" required /><span>Согласен на обработку данных и принимаю политику конфиденциальности</span></label>
              <button className="custom-button custom-button-light custom-submit" type="submit">Обсудить задачу <ArrowRight size={18} /></button>
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
              <a href="#experience">Проекты</a>
              <a href="#process">Как работаем</a>
              <a href="#formats">Форматы</a>
              <a href="#faq">Вопросы</a>
            </nav>
            <nav aria-label="Связаться с Mary Custom">
              <a href="#team">Команда</a>
              <a href="#contact">Обсудить задачу</a>
              <a href="#contact">Стать клиентом</a>
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
