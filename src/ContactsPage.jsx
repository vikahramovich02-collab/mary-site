import { Instagram as InstagramIcon, Linkedin, Mail, MessageCircle, Phone, Send, Youtube } from "lucide-react";
import { SiteHeader } from "./SiteHeader.jsx";
import "./custom-landing.css";

// Значения ждут данных от компании. Пустые не рендерятся — лучше не показать
// канал, чем показать выдуманный.
const direct = [
  { label: "Почта", value: "", href: "", icon: Mail },
  { label: "Telegram", value: "", href: "", icon: Send },
  { label: "Телефон", value: "", href: "", icon: Phone },
];

const socials = [
  { label: "Instagram", href: "", icon: InstagramIcon },
  { label: "Telegram-канал", href: "", icon: Send },
  { label: "LinkedIn", href: "", icon: Linkedin },
  { label: "YouTube", href: "", icon: Youtube },
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
  const directFilled = direct.filter((item) => item.value);
  const socialsFilled = socials.filter((item) => item.href);
  const companyFilled = company.filter((item) => item.value);

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
          {directFilled.length > 0 && (
            <div className="contacts-block">
              <h2>Связаться</h2>
              {directFilled.map(({ label, value, href, icon: Icon }) => (
                <a className="contacts-line" href={href} key={label}>
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </a>
              ))}
            </div>
          )}

          {socialsFilled.length > 0 && (
            <div className="contacts-block">
              <h2>Соцсети</h2>
              <div className="contacts-socials">
                {socialsFilled.map(({ label, href, icon: Icon }) => (
                  <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank">
                    <Icon size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="contacts-block">
            <h2>Команда</h2>
            {people.map(({ name, role }) => (
              <p className="contacts-person" key={name}>
                <strong>{name}</strong>
                <span>{role}</span>
              </p>
            ))}
          </div>

          {companyFilled.length > 0 && (
            <div className="contacts-block">
              <h2>Реквизиты</h2>
              {companyFilled.map(({ label, value }) => (
                <p className="contacts-person" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
