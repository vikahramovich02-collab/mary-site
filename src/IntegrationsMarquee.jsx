import { Globe, PlugZap } from "lucide-react";

// Бегущие дорожки интеграций. Каждая строка — свой набор, своя скорость и своё
// направление; содержимое дублируется, поэтому лента едет бесшовно.
//
// Логотипы настоящие: у кого есть в simple-icons — svg, у остальных (российские
// сервисы) — официальные фавиконы, приведённые к 128px. Там, где логотипа нет
// в принципе (сайт и формы, «ваш сервис»), остаётся тонкая иконка.
const rows = [
  [
    ["Instagram", "instagram.svg"],
    ["Telegram", "telegram.svg"],
    ["YCLIENTS", "yclients.png"],
    ["WhatsApp", "whatsapp.svg"],
    ["amoCRM", "amocrm.png"],
    ["Google Календарь", "googlecalendar.svg"],
  ],
  [
    ["ВКонтакте", "vk.svg"],
    ["Altegio", "altegio.png"],
    ["Битрикс24", "bitrix24.png"],
    ["Google Диск", "googledrive.svg"],
    ["Google Таблицы", "googlesheets.svg"],
    ["Notion", "notion.svg"],
  ],
  [
    ["1С", "onec.png"],
    ["Почта", "mail.png"],
    ["WhatsApp", "whatsapp.svg"],
    ["Telegram", "telegram.svg"],
    ["Сайт и формы", Globe],
    ["Ваш сервис", PlugZap],
  ],
];

function Mark({ icon }) {
  if (typeof icon === "string") {
    // фавиконы уже нарисованы плашкой — растягиваем на весь кружок,
    // svg-глифы оставляем мелкими по центру
    const fill = icon.endsWith(".png");
    return <img alt="" className={fill ? "is-fill" : ""} loading="lazy" src={`/media/logos/${icon}`} />;
  }
  const Icon = icon;
  return <Icon size={20} strokeWidth={1.6} />;
}

export function IntegrationsMarquee() {
  return (
    <div className="int-marquee">
      {rows.map((row, index) => (
        <div className={`int-row ${index % 2 ? "is-back" : ""}`} key={row[0][0]}>
          <div className="int-track" style={{ "--speed": `${38 + index * 9}s` }}>
            {/* два одинаковых набора подряд — на стыке лента не дёргается */}
            {[...row, ...row].map(([name, icon], i) => (
              <span className="int-chip" key={`${name}-${i}`}>
                <i aria-hidden="true"><Mark icon={icon} /></i>
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
