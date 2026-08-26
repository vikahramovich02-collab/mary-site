import arrowUpRight from "./assets/arrow-up-right.svg";

// Блок соцдоказательств: только проверяемые факты — пресса и публичная
// сделка из dev.by. Цитата клиента добавится, когда Вика получит
// подтверждение от Фабрики Фотокниги.
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
];

export function TrustBlock() {
  return (
    <section className="trust-section" id="trust">
      <h2 className="trust-title">Нам уже доверяют</h2>
      <div className="trust-grid">
        {press.map((item) => (
          <a className="trust-card is-press" href={item.href} key={item.href} rel="noreferrer" target="_blank">
            <span className="trust-cover"><img alt="" loading="lazy" src={item.cover} /></span>
            <span className="trust-source">{item.source}</span>
            <strong>{item.title}</strong>
            <span className="trust-more">Читать<img alt="" src={arrowUpRight} /></span>
          </a>
        ))}
        <div className="trust-card is-stat">
          <strong className="trust-big">$90 000</strong>
          <p>инвестиций от бизнес-ангела Парка высоких технологий при оценке $900 000</p>
          <span className="trust-source">по данным dev.by</span>
        </div>
        <div className="trust-card is-stat">
          <strong className="trust-big">ПВТ</strong>
          <p>первый стартап инкубатора Парка высоких технологий, получивший ангельские инвестиции</p>
          <span className="trust-source">Беларусь, Минск</span>
        </div>
      </div>
      <a className="trust-all" href="/?page=clients">Все, с кем работаем →</a>
    </section>
  );
}
