import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { SiteHeader } from "./SiteHeader.jsx";
import "./custom-landing.css";

// Значения ждут данных от компании. Пустые не рендерятся — лучше не показать
// канал, чем показать выдуманный.
const direct = [
  { label: "Почта", value: "", href: "", icon: Mail },
  { label: "Telegram", value: "", href: "", icon: Send },
  { label: "Телефон", value: "", href: "", icon: Phone },
];

// Брендовых иконок в этой сборке lucide нет — берём настоящие логотипы,
// те же, что в дорожках интеграций.
const socials = [
  { label: "Instagram", href: "", logo: "instagram.svg" },
  { label: "Telegram-канал", href: "", logo: "telegram.svg" },
  { label: "TikTok", href: "", logo: "tiktok.svg" },
  { label: "YouTube", href: "", logo: "youtube.svg" },
];

const company = [
  { label: "Юридическое лицо", value: "" },
  { label: "УНП", value: "" },
  { label: "Адрес", value: "" },
];

const people = [
  { name: "Александр Лукашевич", role: "CEO, основатель" },
];

export function ContactsPage() {
  // Блоки показываем всегда: пустые значения выглядят как «уточняется»
  // и не кликаются, но структура страницы видна.

  return (
    <main className="custom-site beauty-light blog-page" id="top">
      <SiteHeader />

      <section className="contacts">
        <div className="contacts-intro">
          <h1>Контакты</h1>
          <p>
            Расскажите про задачу обычными словами — ответим и предложим, с чего начать.
            Разбор бесплатный: смотрим процесс и говорим честно, окупится автоматизация или нет.
          </p>
          <a className="pf-btn is-dark" href="/?page=platform">
            <MessageCircle size={16} aria-hidden="true" />
            Написать в чат
          </a>
        </div>

        <div className="contacts-cols">
          <div className="contacts-block">
            <h2>Связаться</h2>
            {direct.map(({ label, value, href, icon: Icon }) => {
              const Tag = value && href ? "a" : "div";
              return (
                <Tag className={`contacts-line ${value ? "" : "is-empty"}`} href={value ? href : undefined} key={label}>
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{value || "уточняется"}</strong>
                </Tag>
              );
            })}
          </div>

          <div className="contacts-block">
            <h2>Соцсети</h2>
            <div className="contacts-socials">
              {socials.map(({ label, href, logo }) => {
                const Tag = href ? "a" : "span";
                return (
                  <Tag
                    aria-label={label}
                    className={href ? "" : "is-empty"}
                    href={href || undefined}
                    key={label}
                    rel={href ? "noreferrer" : undefined}
                    target={href ? "_blank" : undefined}
                  >
                    <img alt="" src={`/media/logos/${logo}`} />
                  </Tag>
                );
              })}
            </div>
          </div>

          <div className="contacts-block">
            <h2>Команда</h2>
            {people.map(({ name, role }) => (
              <p className="contacts-person" key={name}>
                <strong>{name}</strong>
                <span>{role}</span>
              </p>
            ))}
          </div>

          <div className="contacts-block">
            <h2>Реквизиты</h2>
            {company.map(({ label, value }) => (
              <p className={`contacts-person ${value ? "" : "is-empty"}`} key={label}>
                <span>{label}</span>
                <strong>{value || "уточняется"}</strong>
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
