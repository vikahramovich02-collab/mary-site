import { MessageCircle } from "lucide-react";
import { SiteHeader } from "./SiteHeader.jsx";
import "./custom-landing.css";

// Значения контактов ждут данных от компании. Пустые строки не рендерятся —
// лучше не показать канал, чем показать выдуманный.
const contacts = [
  { label: "Почта", value: "", href: "" },
  { label: "Telegram", value: "", href: "" },
  { label: "Телефон", value: "", href: "" },
];

const filled = contacts.filter((item) => item.value);

export function ContactsPage() {
  return (
    <main className="custom-site beauty-light blog-page" id="top">
      <SiteHeader />

      <section className="blog-head">
        <h1>Контакты</h1>
      </section>

      {filled.length ? (
        <section className="contacts-list">
          {filled.map((item) => (
            <a className="contacts-row" href={item.href} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </a>
          ))}
        </section>
      ) : (
        <section className="page-empty">
          <p>Напишите нам</p>
          <p className="page-empty-hint">
            Расскажите про задачу обычными словами — ответим и предложим, с чего начать.
          </p>
        </section>
      )}

      <div className="blog-cta">
        <a className="pf-btn is-dark" href="/?page=platform">
          <MessageCircle size={16} aria-hidden="true" />
          Написать
        </a>
      </div>
    </main>
  );
}
