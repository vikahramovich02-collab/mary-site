import {
  Briefcase,
  Calendar,
  CalendarCheck,
  CalendarClock,
  Database,
  Camera,
  Globe,
  HardDrive,
  Mail,
  MessageCircle,
  MessagesSquare,
  NotebookPen,
  Phone,
  PlugZap,
  Send,
  ShoppingBag,
  Table,
  Users,
} from "lucide-react";

// Бегущие дорожки интеграций. Каждая строка — свой набор, своя скорость и своё
// направление; содержимое дублируется, поэтому лента едет бесшовно.
// Иконки взяты по смыслу сервиса: мессенджер, запись, CRM, диск и так далее.
const rows = [
  [
    ["Instagram", Camera],
    ["Telegram", Send],
    ["YCLIENTS", CalendarCheck],
    ["WhatsApp", MessageCircle],
    ["amoCRM", Users],
    ["Google Календарь", Calendar],
  ],
  [
    ["ВКонтакте", MessagesSquare],
    ["Altegio", CalendarClock],
    ["Битрикс24", Briefcase],
    ["Google Диск", HardDrive],
    ["Телефония", Phone],
    ["Авито", ShoppingBag],
  ],
  [
    ["1С", Database],
    ["Почта", Mail],
    ["Google Таблицы", Table],
    ["Notion", NotebookPen],
    ["Сайт и формы", Globe],
    ["Ваш сервис", PlugZap],
  ],
];

export function IntegrationsMarquee() {
  return (
    <div className="int-marquee">
      {rows.map((row, index) => (
        <div className={`int-row ${index % 2 ? "is-back" : ""}`} key={row[0][0]}>
          <div className="int-track" style={{ "--speed": `${38 + index * 9}s` }}>
            {/* два одинаковых набора подряд — на стыке лента не дёргается */}
            {[...row, ...row].map(([name, Icon], i) => (
              <span className="int-chip" key={`${name}-${i}`}>
                <i aria-hidden="true"><Icon size={20} strokeWidth={1.6} /></i>
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
