import { useState } from "react";
import { ChevronDown, MessageCircle, Plus } from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import arrowUpRight from "./assets/arrow-up-right.svg";
import navDot from "./assets/nav-dot.svg";
import "./custom-landing.css";

const tabs = [
  ["all", "Все"],
  ["news", "Новости"],
  ["articles", "Статьи"],
  ["updates", "Апдейты"],
];

// Карточки блога. cover — путь к обложке; если её нет, встаёт светлая заглушка,
// как во втором блоке макета.
const posts = [
  {
    id: "onliner",
    kind: "news",
    title: "«Мы не платим зарплату лишним программистам…»",
    source: "Статья на Onlainer.by",
    href: "https://tech.onliner.by/2026/05/21/ai-13",
    external: true,
    cover: "/media/blog/onliner-ai.jpg",
  },
  {
    id: "poteri",
    kind: "articles",
    title: "Сколько салон теряет на пропущенных сообщениях: считаем на калькуляторе",
    source: "7 минут чтения",
    href: "/?page=article&slug=poteri-na-propushchennyh-soobshcheniyah",
    cover: "",
  },
  {
    id: "posle-zakrytiya",
    kind: "articles",
    title: "Кто отвечает в салоне после закрытия",
    source: "6 минут чтения",
    href: "/?page=article&slug=kto-otvechaet-posle-zakrytiya",
    cover: "",
  },
  {
    id: "yclients",
    kind: "articles",
    title: "YCLIENTS и Instagram: как связать запись и переписку",
    source: "7 минут чтения",
    href: "/?page=article&slug=yclients-i-instagram",
    cover: "",
  },
  {
    id: "oshibki",
    kind: "articles",
    title: "Что делать, если AI ответил клиенту неправильно",
    source: "6 минут чтения",
    href: "/?page=article&slug=esli-ai-otvetil-nepravilno",
    cover: "",
  },
];

function Brand() {
  return (
    <a className="custom-brand" href="/" aria-label="Mary, на главную">
      <img src={maryMark} alt="" />
      <span>mary</span>
    </a>
  );
}

export function BlogPage() {
  const [tab, setTab] = useState("all");
  const [companies, setCompanies] = useState(false);
  const visible = tab === "all" ? posts : posts.filter((post) => post.kind === tab);

  return (
    <main className="custom-site beauty-light blog-page" id="top">
      <header className="custom-header pf-header">
        <nav className="pf-nav" aria-label="Навигация">
          <a href="/?page=blog"><img alt="" src={navDot} />Блог</a>
          <a href="/?page=jobs"><img alt="" src={navDot} />Вакансии</a>
          <div className="mary-dd">
            <button type="button" onClick={() => setCompanies((v) => !v)} aria-expanded={companies}>
              <img alt="" src={navDot} />
              Для компаний
              <ChevronDown size={16} />
            </button>
            {companies && (
              <div className="mary-dd-menu wide">
                <a href="/?page=beauty">Красота<small>Доступно</small></a>
                <a className="soon">Производство<small>Доступно</small></a>
              </div>
            )}
          </div>
        </nav>

        <Brand />

        <div className="custom-header-actions">
          <a className="pf-link" href="#investors">Для инвесторов<img alt="" src={arrowUpRight} /></a>
          <a className="pf-link" href="/?page=custom">Заказать разработку<img alt="" src={arrowUpRight} /></a>
          <a className="pf-btn is-soft" href="/?page=platform">Войти в Mary<img alt="" src={arrowUpRight} /></a>
        </div>
      </header>

      <section className="blog-head">
        <h1>Блог</h1>
        <div className="blog-tabs" role="tablist" aria-label="Разделы блога">
          {tabs.map(([key, label]) => (
            <button
              aria-selected={tab === key}
              className={tab === key ? "is-active" : ""}
              key={key}
              onClick={() => setTab(key)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="blog-grid">
        {visible.map((post) => (
          <article className="blog-card" key={post.id}>
            <a
              className="blog-cover"
              href={post.href || undefined}
              rel={post.external ? "noreferrer" : undefined}
              target={post.external ? "_blank" : undefined}
            >
              {post.cover ? <img alt="" src={post.cover} /> : <span className="blog-cover-empty" />}
            </a>
            <h2>
              <a
                href={post.href || undefined}
                rel={post.external ? "noreferrer" : undefined}
                target={post.external ? "_blank" : undefined}
              >
                {post.title}
              </a>
            </h2>
            <p className="blog-source">
              {post.source}
              <img alt="" src={arrowUpRight} />
            </p>
          </article>
        ))}

        {!visible.length && <p className="blog-empty">Здесь пока пусто — скоро появится.</p>}
      </section>

      <div className="blog-cta">
        <a className="pf-btn is-dark" href="/?page=platform">
          <MessageCircle size={16} aria-hidden="true" />
          Создать с Mary
        </a>
        <a className="blog-cta-plus" href="/?page=platform" aria-label="Открыть Mary">
          <Plus size={18} />
        </a>
      </div>
    </main>
  );
}
