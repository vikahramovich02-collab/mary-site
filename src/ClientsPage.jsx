import { SiteHeader } from "./SiteHeader.jsx";
import arrowUpRight from "./assets/arrow-up-right.svg";
import "./custom-landing.css";

// Страница «С кем мы уже работаем»: клиенты, партнёры, пресса.
// РОЛИ: у Фабрики и ПВТ роли подтверждены; у МТБанка и Space — уточнить
// у Вики точную формулировку сотрудничества.
const partners = [
  {
    logo: "/media/clients/fabrika.png",
    name: "Фабрика Фотокниги",
    tag: "Клиент",
    text: "Пилот автоматизации: Mary работает с процессами продаж и клиентского сервиса компании.",
  },
  {
    logo: "/media/clients/htp.png",
    name: "Парк высоких технологий",
    tag: "Инкубатор",
    text: "Mary — резидент инкубатора ПВТ и первый его стартап с ангельскими инвестициями.",
  },
  {
    logo: "/media/clients/space.png",
    name: "StartUp Space",
    tag: "Сообщество",
    text: "Предпринимательское сообщество, в котором собралась команда Mary.",
  },
  {
    logo: "/media/clients/mtbank.png",
    name: "МТБанк",
    tag: "Партнёр",
    text: "Сотрудничество в экосистеме поддержки белорусских стартапов.",
  },
];

const press = [
  {
    cover: "/media/blog/devby.jpg",
    source: "dev.by · 6 февраля 2026",
    title: "Первый стартап из инкубатора ПВТ получил ангельские инвестиции",
    href: "https://devby.io/news/pervyi-startap-iz-inkubatora-pvt-poluchil-angelskie-investitsii-ot-vypusknika-venchurnoi-akademii-pvt",
  },
  {
    cover: "/media/blog/newsby.jpg",
    source: "News.by · 28 июня 2026",
    title: "Сюжет о молодых предпринимателях Беларуси — с основателем Mary",
    href: "https://news.by/news/obshchestvo/agrodrony-ii-startapy-pesni-na-belorusskom-yazyke-kak-molodezh-belarusi-dvizhet-stranu-vpered",
  },
  {
    cover: "/media/blog/onliner-ai.jpg",
    source: "Onlainer.by",
    title: "«Мы не платим зарплату лишним программистам…»",
    href: "https://tech.onliner.by/2026/05/21/ai-13",
  },
];

export function ClientsPage() {
  return (
    <main className="custom-site beauty-light clients-page" id="top">
      <SiteHeader />

      <section className="clients-head">
        <h1>С кем мы уже работаем</h1>
        <p>Клиенты, партнёры и сообщество, которые растят Mary вместе с нами.</p>
      </section>

      <section className="clients-grid" aria-label="Клиенты и партнёры">
        {partners.map((item) => (
          <article className="clients-card" key={item.name}>
            <div className="clients-logo"><img alt={item.name} src={item.logo} /></div>
            <span className="clients-tag">{item.tag}</span>
            <h2>{item.name}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="clients-press" aria-label="Пресса о Mary">
        <h2 className="trust-title">Пресса о Mary</h2>
        <div className="trust-grid is-three">
          {press.map((item) => (
            <a className="trust-card is-press" href={item.href} key={item.href} rel="noreferrer" target="_blank">
              <span className="trust-cover"><img alt="" loading="lazy" src={item.cover} /></span>
              <span className="trust-source">{item.source}</span>
              <strong>{item.title}</strong>
              <span className="trust-more">Читать<img alt="" src={arrowUpRight} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="clients-cta">
        <h2>Хотите так же?</h2>
        <p>Покажем Mary на вашей задаче: посмотрим процесс и предложим план запуска.</p>
        <a className="pf-btn is-dark" href="/#contact">
          Оставить заявку
          <img alt="" src={arrowUpRight} />
        </a>
      </section>
    </main>
  );
}
