import { MessageCircle } from "lucide-react";
import { SiteHeader } from "./SiteHeader.jsx";
import "./custom-landing.css";

// Тексты статей лежат в content/blog как markdown и подтягиваются сырыми —
// один источник правды, редактировать можно без пересборки компонентов.
import poteri from "../content/blog/poteri-na-propushchennyh-soobshcheniyah.md?raw";
import posleZakrytiya from "../content/blog/kto-otvechaet-posle-zakrytiya.md?raw";
import yclients from "../content/blog/yclients-i-instagram.md?raw";
import oshibki from "../content/blog/esli-ai-otvetil-nepravilno.md?raw";

const sources = {
  "poteri-na-propushchennyh-soobshcheniyah": poteri,
  "kto-otvechaet-posle-zakrytiya": posleZakrytiya,
  "yclients-i-instagram": yclients,
  "esli-ai-otvetil-nepravilno": oshibki,
};

// Разбираем frontmatter: нам нужны заголовок, описание и время чтения.
function parse(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split("\n").forEach((line) => {
    const pair = line.match(/^(\w+):\s*(.*)$/);
    if (pair && pair[2]) meta[pair[1]] = pair[2].replace(/^"|"$/g, "");
  });
  return { meta, body: match[2] };
}

// Минимальный markdown: заголовки, абзацы, списки, таблицы, код и разделители.
function inline(text, key) {
  const nodes = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = pattern.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) nodes.push(<strong key={`${key}-b${i}`}>{m[1]}</strong>);
    else if (m[2]) nodes.push(<a href={m[3]} key={`${key}-a${i}`}>{m[2]}</a>);
    else nodes.push(<code key={`${key}-c${i}`}>{m[4]}</code>);
    last = m.index + m[0].length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function render(body) {
  const blocks = [];
  const lines = body.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i += 1; continue; }

    if (line.startsWith("```")) {
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) { code.push(lines[i]); i += 1; }
      i += 1;
      blocks.push(<pre key={key++}><code>{code.join("\n")}</code></pre>);
      continue;
    }

    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) { rows.push(lines[i]); i += 1; }
      const cells = (row) => row.split("|").slice(1, -1).map((c) => c.trim());
      const head = cells(rows[0]);
      const body2 = rows.slice(2).map(cells);
      blocks.push(
        <table key={key++}>
          <thead><tr>{head.map((c, n) => <th key={n}>{inline(c, `h${n}`)}</th>)}</tr></thead>
          <tbody>{body2.map((row, n) => <tr key={n}>{row.map((c, m) => <td key={m}>{inline(c, `d${n}-${m}`)}</td>)}</tr>)}</tbody>
        </table>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i += 1; }
      blocks.push(<ul key={key++}>{items.map((it, n) => <li key={n}>{inline(it, `l${n}`)}</li>)}</ul>);
      continue;
    }

    if (line.startsWith("---")) { blocks.push(<hr key={key++} />); i += 1; continue; }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const Tag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
      // h1 уже выведен как заголовок страницы
      if (level > 1) blocks.push(<Tag key={key++}>{inline(heading[2], `t${key}`)}</Tag>);
      i += 1;
      continue;
    }

    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !/^[-#|`]/.test(lines[i])) { paragraph.push(lines[i]); i += 1; }
    blocks.push(<p key={key++}>{inline(paragraph.join(" "), `p${key}`)}</p>);
  }

  return blocks;
}

export function ArticlePage({ slug }) {
  const raw = sources[slug];

  if (!raw) {
    return (
      <main className="custom-site beauty-light blog-page" id="top">
        <SiteHeader />
        <section className="page-empty">
          <p>Статья не найдена</p>
          <p className="page-empty-hint">Возможно, ссылка устарела. Посмотрите остальные в блоге.</p>
        </section>
        <div className="blog-cta">
          <a className="pf-btn is-dark" href="/?page=blog">Вернуться в блог</a>
        </div>
      </main>
    );
  }

  const { meta, body } = parse(raw);
  const title = (body.match(/^#\s+(.*)$/m) || [, meta.title])[1];

  return (
    <main className="custom-site beauty-light blog-page article-page" id="top">
      <SiteHeader />

      <article className="article">
        <a className="article-back" href="/?page=blog">← Блог</a>
        <h1>{title}</h1>
        {meta.reading_time && <p className="article-meta">{meta.reading_time} минут чтения</p>}
        <div className="article-body">{render(body)}</div>
      </article>

      <div className="blog-cta">
        <a className="pf-btn is-dark" href="/?page=contacts">
          <MessageCircle size={16} aria-hidden="true" />
          Обсудить задачу
        </a>
      </div>
    </main>
  );
}
