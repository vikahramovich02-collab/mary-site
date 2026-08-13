import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SiteHeader } from "./SiteHeader.jsx";
import "./custom-landing.css";

const filters = [
  ["all", "Все"],
  ["product", "Продукт"],
  ["dev", "Разработка"],
  ["design", "Дизайн"],
  ["sales", "Продажи"],
];

// Открытых вакансий пока нет. Появятся — добавляем сюда объекты вида
// { id, area: "dev", title, place, href }. Придумывать несуществующие
// вакансии нельзя: на них откликаются живые люди.
const jobs = [];

export function JobsPage() {
  const [area, setArea] = useState("all");
  const visible = area === "all" ? jobs : jobs.filter((job) => job.area === area);

  return (
    <main className="custom-site beauty-light blog-page jobs-page" id="top">
      <SiteHeader />

      <section className="blog-head">
        <h1>Вакансии</h1>
        <div className="blog-tabs" role="tablist" aria-label="Направления">
          {filters.map(([key, label]) => (
            <button
              aria-selected={area === key}
              className={area === key ? "is-active" : ""}
              key={key}
              onClick={() => setArea(key)}
              role="tab"
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {visible.length ? (
        <section className="jobs-list">
          {visible.map((job) => (
            <a className="jobs-row" href={job.href} key={job.id}>
              <strong>{job.title}</strong>
              <span>{job.place}</span>
            </a>
          ))}
        </section>
      ) : (
        <section className="page-empty">
          <p>Пока нет</p>
          <p className="page-empty-hint">
            Открытых позиций сейчас нет. Но если видите себя в Mary — напишите нам на почту
            с предложением, мы посмотрим и ответим.
          </p>
        </section>
      )}

      <div className="blog-cta">
        <a className="pf-btn is-dark" href="/?page=contacts">
          <MessageCircle size={16} aria-hidden="true" />
          Написать
        </a>
      </div>
    </main>
  );
}
