import { useState } from "react";

// Реальные экраны платформы, выгруженные из Figma (файл Mary, страница MARY FINAL).
// Показываем по одному крупно: в сетке из шести превью интерфейс нечитаем.
const tabs = [
  {
    key: "chat",
    tab: "Чат",
    title: "Всё через один чат",
    text: "Настроить, поправить, спросить, посмотреть отчёт — обычным сообщением. Осваивать интерфейс не нужно.",
  },
  {
    key: "processes",
    tab: "Бизнес-процессы",
    title: "Процесс видно целиком",
    text: "Где сейчас каждая задача, кто отвечает за шаг и где всё встало. Правки — словами в чате.",
  },
  {
    key: "knowledge",
    tab: "База знаний",
    title: "Отвечает по вашим правилам",
    text: "Прайсы, услуги, скрипты и файлы. Агенты берут ответы только отсюда и ничего не выдумывают.",
  },
  {
    key: "connections",
    tab: "Подключения",
    title: "Каналы и системы на месте",
    text: "Instagram, Telegram, YCLIENTS и остальное подключается в пару кликов. Переносить ничего не нужно.",
  },
  {
    key: "employees",
    tab: "Сотрудники",
    title: "Видно, кто за что отвечает",
    text: "Mary держит рутину и отдаёт человеку только то, где человек действительно нужен.",
  },
  {
    key: "analytics",
    tab: "Аналитика",
    title: "Где теряются клиенты",
    text: "Путь от обращения до записи и потери на каждом этапе. Не отчёт ради отчёта, а место, где чинить.",
  },
];

export function ProductTabs() {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div className="pf-screens">
      <div className="pf-screens-tabs" role="tablist" aria-label="Разделы платформы">
        {tabs.map((item, index) => (
          <button
            aria-selected={index === active}
            className={index === active ? "is-active" : ""}
            key={item.key}
            onClick={() => setActive(index)}
            role="tab"
            type="button"
          >
            {item.tab}
          </button>
        ))}
      </div>

      <figure className="pf-screens-shot">
        <img
          alt={`Экран платформы Mary — ${current.tab}`}
          key={current.key}
          loading="lazy"
          src={`/media/screens/${current.key}.png`}
        />
      </figure>

      <div className="pf-screens-copy" key={current.key}>
        <h3>{current.title}</h3>
        <p>{current.text}</p>
      </div>
    </div>
  );
}
