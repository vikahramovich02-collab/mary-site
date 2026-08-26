import { useEffect, useRef, useState } from "react";

// Блок «ключевые экраны» по макету Figma 10591:26400.
// Пилюли-табы сверху, один большой экран платформы под ними (снизу подрезан
// кадром — так в макете), под кадром вынесена плавающая кнопка платформы.
const screens = [
  { key: "workflow-full", tab: "Бизнес-процессы", alt: "Экран Mary — бизнес-процесс «Запись клиентов»" },
  { key: "chat", tab: "Чат с Mary", alt: "Экран Mary — чат" },
  { key: "knowledge", tab: "База знаний", alt: "Экран Mary — база знаний" },
  { key: "connections", tab: "Подключения", alt: "Экран Mary — подключения" },
  { key: "analytics", tab: "Аналитика", alt: "Экран Mary — аналитика" },
  { key: "employees", tab: "Сотрудники", alt: "Экран Mary — сотрудники" },
];

export function KeyScreens() {
  const [active, setActive] = useState(0);
  const current = screens[active];
  const stripRef = useRef(null);

  // на узких экранах лента табов скроллится — подтягиваем активный в кадр
  useEffect(() => {
    const strip = stripRef.current;
    const btn = strip?.children[active];
    if (!strip || !btn) return;
    const left = btn.offsetLeft - (strip.clientWidth - btn.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(left, 0), behavior: "smooth" });
  }, [active]);

  return (
    <section className="ks-section" id="screens-gallery">
      <h2 className="ks-title">
        Встраивается в то,&nbsp;чем
        <br />
        вы уже пользуетесь
      </h2>

      <div className="ks-tabs" ref={stripRef} role="tablist" aria-label="Экраны платформы">
        {screens.map((item, index) => (
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

      <div className="ks-stage">
        <img alt={current.alt} key={current.key} loading="lazy" src={`/media/screens/${current.key}.png`} />
      </div>
    </section>
  );
}
