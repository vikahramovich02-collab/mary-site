import { useEffect, useRef, useState } from "react";
import "./custom-landing.css";

// Липкий список слева и проматывающиеся панели справа: активный пункт
// подсвечивается тем, что сейчас в кадре. Визуал пока серыми плашками.
const items = [
  {
    id: "beauty",
    title: "Салоны красоты",
    text: "Запись из соцсетей, ответы из вашего прайса, напоминания перед визитом.",
  },
  {
    id: "manufacturing",
    title: "Производства",
    text: "Заявки, согласования и сроки в одном процессе. Закрытый контур, если данные нельзя отдавать наружу.",
  },
  {
    id: "services",
    title: "Услуги с записью",
    text: "Клиники, фитнес, автосервисы: тот же кор плюс пара интеграций под нишу.",
  },
];

export function NicheStack() {
  const [active, setActive] = useState(0);
  const panelsRef = useRef([]);

  useEffect(() => {
    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number(visible.target.dataset.index));
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.3, 0.6] },
    );

    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ns" id="niches">
      <div className="ns-aside">
        <h2>Один движок — разные бизнесы</h2>

        <ul className="ns-list">
          {items.map((item, i) => (
            <li className={i === active ? "is-on" : ""} key={item.id}>
              <button onClick={() => setActive(i)} type="button">{item.title}</button>
              {i === active && <p>{item.text}</p>}
            </li>
          ))}
        </ul>

        <p className="ns-foot">Процессы разные — платформа одна.</p>
      </div>

      <div className="ns-panels">
        {items.map((item, i) => (
          <div
            className="ns-panel"
            data-index={i}
            key={item.id}
            ref={(el) => { panelsRef.current[i] = el; }}
          >
            <span className="ns-shot" />
            <span className="ns-shot" />
          </div>
        ))}
      </div>
    </section>
  );
}
