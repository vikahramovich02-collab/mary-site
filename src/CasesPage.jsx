import { SiteHeader } from "./SiteHeader.jsx";
import arrowUpRight from "./assets/arrow-up-right.svg";
import "./custom-landing.css";

// Страница кейсов. Первый и пока единственный живой кейс — «Фабрика Фотокниги».
// ВАЖНО: цифры взяты из аудита боевого Битрикса клиента. Перед публикацией
// сайта наружу их нужно согласовать с клиентом (см. флаг в задачах).
const fabrika = {
  client: "Фабрика Фотокниги",
  tag: "Производство · печатная продукция",
  lead: "Разобрали продажи по данным их CRM и показали, где теряются деньги и какие шаги забирают агенты.",
  about: [
    "Производитель печатной продукции: фотокниги, портфолио, фотопечать. Два сайта, розница и корпоративные заказы.",
    "Продажи ведутся в Bitrix24, обращения приходят из Telegram, WhatsApp, Instagram и почты.",
  ],
  steps: [
    {
      n: "01",
      title: "Подключились к CRM только на чтение",
      text: "Mary получила доступ к боевой CRM в режиме read-only — ничего не меняя в работе отдела продаж.",
    },
    {
      n: "02",
      title: "Собрали картину по всем сделкам",
      text: "Прошли по сделкам, задачам, источникам и каналам: кто ведёт, что зависло, откуда приходят заявки.",
    },
    {
      n: "03",
      title: "Показали, где утекают деньги",
      text: "Выделили зоны, где менеджеры делают руками то, что должен делать агент, и где заявки просто не доходят до ответа.",
    },
    {
      n: "04",
      title: "Собрали план автоматизации",
      text: "Пять шагов: гигиена данных, автозакрытия, автосообщения клиентам, агент классификации заявок, метрики и алерты.",
    },
  ],
  findings: [
    { value: "87,7%", label: "сделок числятся «в работе», но месяцами не двигаются" },
    { value: "7 490", label: "раз вручную поставлена задача «связаться с клиентом»" },
    { value: "53%", label: "сделок без источника — непонятно, какая реклама приносит деньги" },
    { value: "1,4%", label: "winrate у потока, который давал треть всех сделок" },
  ],
  result: [
    "Компания увидела продажи в цифрах, а не по ощущениям: где очередь, где тишина, а где менеджеры заняты рутиной.",
    "Из находок собрался понятный план: что Mary забирает на себя первым, вторым и третьим шагом.",
  ],
  next: "Сейчас собираем продажный контур: агенты сами ведут первое касание, напоминают о зависших сделках и закрывают мёртвые — чтобы «кладбище сделок» не набиралось заново.",
};

export function CasesPage() {
  return (
    <main className="custom-site beauty-light cases-page" id="top">
      <SiteHeader />

      <section className="cases-head">
        <h1>Кейсы</h1>
        <p>Как Mary разбирается в чужом бизнесе и что забирает на себя. Без обещаний — только то, что уже сделано.</p>
      </section>

      <article className="case">
        <header className="case-top">
          <div className="case-top-copy">
            <span className="case-tag">{fabrika.tag}</span>
            <h2>{fabrika.client}</h2>
            <p className="case-lead">{fabrika.lead}</p>
          </div>
          <div className="case-top-about">
            {fabrika.about.map((line) => <p key={line}>{line}</p>)}
          </div>
        </header>

        <section className="case-block">
          <h3 className="case-h3">Что мы сделали</h3>
          <div className="case-steps">
            {fabrika.steps.map((step) => (
              <div className="case-step" key={step.n}>
                <span className="case-step-n">{step.n}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-block">
          <h3 className="case-h3">Что нашли</h3>
          <div className="case-findings">
            {fabrika.findings.map((item) => (
              <div className="case-finding" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          {/* ВНИМАНИЕ: до согласования с клиентом наружу не публикуем — см. задачу у Вики */}
          <p className="case-note">По данным аудита CRM клиента.</p>
        </section>

        <section className="case-block is-split">
          <div>
            <h3 className="case-h3">Что это дало</h3>
            {fabrika.result.map((line) => <p className="case-text" key={line}>{line}</p>)}
          </div>
          <div className="case-next">
            <h3 className="case-h3">Что дальше</h3>
            <p className="case-text">{fabrika.next}</p>
          </div>
        </section>
      </article>

      <section className="cases-soon">
        <h3 className="case-h3">Скоро здесь</h3>
        <div className="cases-soon-grid">
          <div className="cases-soon-card">
            <strong>Салон красоты</strong>
            <span>Запись из соцсетей без администратора</span>
          </div>
          <div className="cases-soon-card">
            <strong>Услуги с записью</strong>
            <span>Клиники и студии: тот же кор, другие интеграции</span>
          </div>
        </div>
      </section>

      <section className="clients-cta">
        <h2>Разберём и ваш бизнес</h2>
        <p>Посмотрим, как устроены ваши продажи и процессы, и покажем, что Mary заберёт на себя.</p>
        <a className="pf-btn is-dark" href="/#contact">
          Оставить заявку
          <img alt="" src={arrowUpRight} />
        </a>
      </section>
    </main>
  );
}
