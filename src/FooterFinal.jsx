import maryMark from "./assets/mary-mark.svg";
import arrowUpRight from "./assets/arrow-up-right.svg";
import { HeroField } from "./HeroField.jsx";

// Финальный экран = эхо-хиро + футер одним блоком (макет 10864:14298):
// купол точек, разбросанные папки, заголовок с CTA, собака снизу по центру,
// колонки ссылок по бокам, знак mary в левом нижнем углу.
const cols = [
  { title: "Платформа", links: [["Как работает", "/#how"], ["Экраны", "/#screens-gallery"], ["Демо", "/?page=platform"]] },
  { title: "Компаниям", links: [["Красота", "/?page=beauty"], ["Кейсы", "/?page=cases"], ["Стоимость", "/?page=pricing"]] },
  { title: "Компания", links: [["Блог", "/?page=blog"], ["С кем работаем", "/?page=clients"], ["Контакты", "/?page=contacts"]] },
  { title: "Ещё", links: [["Для инвесторов", "/media/docs/mary-deck.pdf"], ["Заказать разработку", "/?page=custom"], ["Войти в Mary", "/?page=platform"]] },
];

const folders = [
  { x: "30%", y: "12%", r: -14, s: 0.72 },
  { x: "76%", y: "14%", r: 16, s: 1 },
  { x: "17%", y: "40%", r: -18, s: 1 },
  { x: "75%", y: "44%", r: 12, s: 0.62 },
];

export function FooterFinal() {
  return (
    <footer className="ff" aria-label="Попробовать Mary">
      <HeroField className="ff-field" dotAlpha={0.16} mode="halftone" speed={1.2} tone="light" />

      {folders.map((f) => (
        <span
          className="ff-folder"
          key={`${f.x}-${f.y}`}
          style={{ left: f.x, top: f.y, transform: `translate(-50%, -50%) rotate(${f.r}deg) scale(${f.s})` }}
        >
          <i />
        </span>
      ))}

      <div className="ff-center">
        <h2>Соберёт рабочую систему,<br />пока вы занимаетесь бизнесом</h2>
        <a className="pf-btn is-dark" href="/?page=platform">
          Попробовать
          <img alt="" src={arrowUpRight} />
        </a>
      </div>

      <div className="ff-cols is-left">
        {cols.slice(0, 2).map((col) => (
          <nav aria-label={col.title} key={col.title}>
            {col.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
        ))}
      </div>
      <div className="ff-cols is-right">
        {cols.slice(2).map((col) => (
          <nav aria-label={col.title} key={col.title}>
            {col.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
        ))}
      </div>

      <img alt="" className="ff-dog" src="/media/mary-dog.webp" />

      <div className="ff-bottom">
        <a className="ff-brand" href="/" aria-label="Mary, на главную">
          <img alt="" src={maryMark} />
          <span>mary</span>
        </a>
        <div className="ff-legal">
          <span>© Mary 2026</span>
          <span>Политика конфиденциальности</span>
        </div>
      </div>
    </footer>
  );
}
