import { useState } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Clock,
  LayoutGrid,
  MessageCircle,
  Minus,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import { SiteHeader } from "./SiteHeader.jsx";
import arrowUpRight from "./assets/arrow-up-right.svg";
import "./custom-landing.css";

// ЦЕНЫ. Ничего не выдумываю: пока стоит null — в карточке встаёт «цена
// уточняется». Впишите числа сюда (в рублях за месяц), и вся страница —
// карточки и таблица сравнения — подхватит их сама.
const PRICE = {
  start: { month: null, year: null },
  team: { month: null, year: null },
};

const YEAR_SAVE = 20; // скидка при оплате за год, %

const plans = [
  {
    key: "start",
    title: "Старт",
    badge: "Популярный",
    audience: "Для одной точки или небольшой команды",
    unit: "за месяц",
    cta: ["Начать", "/?page=platform"],
    dark: true,
    features: [
      [MessageCircle, "Все каналы в одном чате"],
      [Workflow, "Процессы из готовых блоков"],
      [Users, "До 3 сотрудников"],
      [Plug, "Базовые интеграции"],
      [LayoutGrid, "База клиентов и история"],
      [Clock, "Ответы 24/7"],
    ],
  },
  {
    key: "team",
    title: "Команда",
    audience: "Для сети точек и нескольких отделов",
    unit: "за месяц",
    cta: ["Начать", "/?page=platform"],
    features: [
      [Check, "Всё из тарифа «Старт»"],
      [Users, "Сотрудники без ограничений"],
      [ShieldCheck, "Роли и права доступа"],
      [Workflow, "Несколько отделов и процессов"],
      [Plug, "Интеграции под ваш стек"],
      [Sparkles, "Сопровождение при запуске"],
    ],
  },
];

const extras = [
  {
    icon: Building2,
    title: "Компания",
    text: "Закрытый контур, отдельные требования по данным и доступам, соглашение об уровне сервиса.",
    link: ["Обсудить", "/?page=contacts"],
  },
  {
    icon: Wrench,
    title: "Нужна система под себя?",
    text: "Соберём процесс, которого нет в коробке: свои интеграции, своя логика, свой контур.",
    link: ["Заказать разработку", "/?page=custom"],
  },
];

// Дополнительный контур: то, что подключается сверху тарифа
const addon = {
  tag: "Дополнительно",
  title: "Контур продаж",
  text: "Модуль для тех, у кого сделка не заканчивается записью: воронка, задачи менеджерам, счета и отгрузки. Живёт в том же чате и на тех же данных.",
  note: "Доступно на тарифах «Команда» и «Компания»",
  link: ["Подробнее", "/?page=contacts"],
  logos: [
    ["1С", "onec.png"],
    ["Битрикс24", "bitrix24.png"],
    ["amoCRM", "amocrm.png"],
    ["Авито", "avito.png"],
    ["Telegram", "telegram.svg"],
    ["Google Sheets", "googlesheets.svg"],
  ],
};

// Таблица сравнения: true — есть, false — нет, строка — значение
const compare = [
  ["Каналы и общение", [
    ["Instagram, Telegram, VK", true, true],
    ["Один чат на все обращения", true, true],
    ["Ответы ночью и в выходные", true, true],
    ["Свои шаблоны ответов", "Базовые", true],
  ]],
  ["Процессы и агенты", [
    ["Готовые процессы из коробки", true, true],
    ["Сборка процесса словами", true, true],
    ["Число процессов", "До 3", "Без ограничений"],
    ["Отделы и передача между ними", false, true],
    ["Свои правила эскалации", false, true],
  ]],
  ["Данные и интеграции", [
    ["База клиентов и история", true, true],
    ["Системы записи (YCLIENTS, Altegio)", true, true],
    ["CRM и учётные системы", false, true],
    ["Интеграция под ваш стек", false, true],
  ]],
  ["Команда и контроль", [
    ["Сотрудники", "До 3", "Без ограничений"],
    ["Роли и права доступа", false, true],
    ["Отчёты по обращениям", "Базовые", true],
    ["Сопровождение при запуске", false, true],
  ]],
];

const faqs = [
  ["За что берётся плата?", "За саму платформу: каналы, агентов, процессы и хранение данных. Тариф зависит от того, сколько людей работает внутри и сколько процессов вы держите."],
  ["Можно попробовать до оплаты?", "Да. Мы собираем один ваш процесс и показываем его на ваших же обращениях — так видно, что система реально снимает с администратора."],
  ["Что если нужно больше, чем в тарифе?", "Переходите на «Команду» или на корпоративный контур — данные и настроенные процессы остаются на месте."],
  ["Есть ли плата за подключение?", "Настройка простых процессов входит в тариф. Отдельно считается только заказная разработка — когда нужна логика, которой нет в платформе."],
  ["Как отказаться?", "Подписка помесячная: не продлеваете — доступ заканчивается в конце оплаченного периода. Выгрузку данных отдаём по запросу."],
];

function priceLabel(key, period) {
  const value = PRICE[key]?.[period];
  if (value == null) return null;
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export function PricingPage() {
  const [period, setPeriod] = useState("year");
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="custom-site beauty-light pricing-page" id="top">
      <SiteHeader />

      <section className="pr-hero">
        <h1>Прозрачные тарифы</h1>
        <p>Платите за платформу, а не за часы разработки. Начать можно с одного процесса и вырасти без переезда.</p>

        <div className="pr-switch" role="tablist" aria-label="Период оплаты">
          {[["year", "За год"], ["month", "Помесячно"]].map(([key, label]) => (
            <button
              aria-selected={period === key}
              className={period === key ? "is-active" : ""}
              key={key}
              onClick={() => setPeriod(key)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <p className="pr-save"><b>Экономия {YEAR_SAVE}%</b> при оплате за год</p>
      </section>

      <section className="pr-plans" aria-label="Тарифы">
        {plans.map((plan) => {
          const label = priceLabel(plan.key, period);
          return (
            <article className={`pr-plan ${plan.dark ? "is-dark" : ""}`} key={plan.key}>
              <h2>
                {plan.title}
                {plan.badge && <span className="pr-badge">{plan.badge}</span>}
              </h2>
              <p className="pr-audience">{plan.audience}</p>

              <div className={`pr-price ${label ? "" : "is-empty"}`}>
                <strong>{label || "цена уточняется"}</strong>
                {label && (
                  <small>
                    {plan.unit}
                    <br />
                    {period === "year" ? "при оплате за год" : "при помесячной оплате"}
                  </small>
                )}
              </div>

              <a className={`pf-btn ${plan.dark ? "is-dark" : "is-outline"} pr-cta`} href={plan.cta[1]}>
                {plan.cta[0]}
                <img alt="" src={arrowUpRight} />
              </a>

              <ul className="pr-features">
                {plan.features.map(([Icon, text]) => (
                  <li key={text}><Icon size={18} aria-hidden="true" />{text}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="pr-extras" aria-label="Другие варианты">
        {extras.map(({ icon: Icon, title, text, link }) => (
          <div className="pr-extra" key={title}>
            <Icon size={22} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
            <a href={link[1]}>{link[0]}</a>
          </div>
        ))}
      </section>

      <section className="pr-clients" aria-label="С нами работают">
        <h2>С нами работают команды, которым важен результат</h2>
        <div className="pf-hero-logos">
          <img alt="Фабрика Фотокниги" src="/media/clients/fabrika.svg" />
          <img alt="МТБанк" src="/media/clients/mtbank.svg" />
          <img alt="ПВТ Беларусь" src="/media/clients/htp.svg" />
          <img alt="Space" src="/media/clients/space.svg" />
        </div>
      </section>

      <section className="pr-addon">
        <div className="pr-addon-copy">
          <span className="pr-tag">{addon.tag}</span>
          <h2>{addon.title}</h2>
          <p>{addon.text}</p>
          <a className="pf-btn is-dark" href={addon.link[1]}>
            {addon.link[0]}
            <img alt="" src={arrowUpRight} />
          </a>
          <small>{addon.note}</small>
        </div>
        <div className="pr-addon-grid">
          {addon.logos.map(([name, file]) => (
            <div className="pr-addon-tile" key={name}>
              <img alt="" src={`/media/logos/${file}`} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pr-compare">
        <div className="pr-compare-head">
          <h2>Что входит в тарифы</h2>
          {plans.map((plan) => {
            const label = priceLabel(plan.key, period);
            return (
              <div className="pr-col" key={plan.key}>
                <strong>
                  {plan.title}
                  {plan.badge && <span className="pr-badge">{plan.badge}</span>}
                </strong>
                <span>{label ? `${label} ${plan.unit}` : "цена уточняется"}</span>
                <a className="pf-btn is-outline" href={plan.cta[1]}>{plan.cta[0]}</a>
              </div>
            );
          })}
        </div>

        {compare.map(([group, rows]) => (
          <div className="pr-group" key={group}>
            <h3>{group}</h3>
            {rows.map(([label, start, team]) => (
              <div className="pr-row" key={label}>
                <span className="pr-row-label">{label}</span>
                {[start, team].map((value, i) => (
                  <span className="pr-cell" key={i}>
                    {value === true && <Check size={18} aria-label="есть" />}
                    {value === false && <Minus size={18} aria-label="нет" className="is-off" />}
                    {typeof value === "string" && value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className="custom-section pf-faq" id="faq">
        <div className="custom-section-intro"><h2>Частые вопросы</h2></div>
        <div className="pf-faq-list">
          {faqs.map(([question, answer], i) => (
            <div className={`pf-faq-item ${openFaq === i ? "is-open" : ""}`} key={question}>
              <button
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                type="button"
              >
                {question}
                <ChevronDown size={20} aria-hidden="true" />
              </button>
              {openFaq === i && <p>{answer}</p>}
            </div>
          ))}
        </div>
        <p className="pr-more">
          Остались вопросы? <a href="/?page=contacts">Напишите нам</a> — разберём вашу задачу.
        </p>
      </section>
    </main>
  );
}
