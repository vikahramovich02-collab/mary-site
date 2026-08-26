import { useEffect, useRef, useState } from "react";

// Триггерный блок «Знакомо?»: слева боли обычного дня, справа скачущие
// уведомления — они влетают по очереди и подрагивают, как реальный поток
// сообщений. Боли взяты из нашего разбора салонов (триггер → потеря).
const pains = [
  "Написали ночью — утром уже записались у тех, кто ответил",
  "Сообщение потерялось между Instagram, Telegram и WhatsApp",
  "Спрашивают цену — админ ищет прайс в переписке",
  "Освободилось окно, а предложить его некому",
  "Не напомнили о визите — пустое кресло",
  "Постоянная не пришла второй раз, и никто не заметил",
  "Всё держится на одном админе: отпуск — и хаос",
  "Утро начинается с разбора пяти чатов вместо работы",
];

const notes = [
  { from: "Instagram", time: "23:47", text: "Здравствуйте! Есть окно на завтра?" },
  { from: "Telegram", time: "09:12", text: "Можно перенести запись на пятницу?" },
  { from: "WhatsApp", time: "11:38", text: "Сколько стоит окрашивание?" },
  { from: "Instagram", time: "14:05", text: "Вы работаете в воскресенье?" },
  { from: "Telegram", time: "18:22", text: "Здравствуйте, вы тут?" },
];

export function PainTriggers() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOn(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`pt-section${on ? " is-on" : ""}`} id="pains" ref={ref}>
      <h2 className="pt-title">Знакомо?</h2>
      <p className="pt-sub">Так выглядит обычный день, пока всё держится на людях</p>

      <div className="pt-body">
        <ul className="pt-list">
          {pains.map((line, i) => (
            <li key={line} style={{ transitionDelay: `${i * 60}ms` }}>{line}</li>
          ))}
        </ul>

        <div className="pt-notes" aria-hidden="true">
          {notes.map((n, i) => (
            <div className="pt-note" key={n.text} style={{ transitionDelay: `${300 + i * 160}ms` }}>
              <span className="pt-note-dot" />
              <div>
                <span className="pt-note-top">{n.from}<small>{n.time}</small></span>
                <p>{n.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="pt-foot">Всё это Mary забирает на себя — и отдаёт человеку только спорное.</p>
    </section>
  );
}
