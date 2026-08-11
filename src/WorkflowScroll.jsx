import { useEffect, useRef, useState } from "react";

// Сборка процесса по скроллу: секция залипает, а внутри лента узлов едет влево
// и достраивается по одному — как воркфлоу в самой платформе.
const nodes = [
  ["Старт", "Пришло новое сообщение", "Instagram · Telegram", "start"],
  ["Задача", "Найти клиента и определить статус", "Агент-Поддержки", "task"],
  ["Вопрос", "Запрос связан с записью?", "", "ask"],
  ["Задача", "Уточнить услугу и пожелания", "Агент-Записи", "task"],
  ["Вопрос", "Клиент указал конкретное время?", "", "ask"],
  ["Задача", "Найти свободное время", "Агент-Расписания", "task"],
  ["Вопрос", "Есть подходящее время?", "", "ask"],
  ["Сотрудник", "Помочь подобрать другой вариант", "Виктория В.", "human"],
  ["Mary", "Предложить время клиенту", "Mary", "mary"],
  ["Задача", "Создать запись в системе", "Агент-Записи", "task"],
  ["Сотрудник", "Проверить запись", "Виктория В.", "human"],
];

export function WorkflowScroll() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    // на сколько лента шире экрана — столько её и увозим за время залипания
    const measure = () => {
      const extra = track.scrollWidth - window.innerWidth;
      setShift(Math.max(extra + 80, 0));
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      setProgress(Math.min(Math.max(-rect.top / travel, 0), 1));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // узлы появляются чуть быстрее, чем едет лента: к концу все на месте
  const shown = Math.round(progress * (nodes.length + 1.5));

  return (
    <section className="pf-flow" ref={sectionRef} aria-label="Как собирается процесс">
      <div className="pf-flow-sticky">
        <header className="pf-flow-head">
          <h2>Процесс собирается сам</h2>
          <p>
            Вы описали задачу словами — дальше Mary ставит узлы один за другим: кто встречает
            клиента, кто подбирает время, где нужен человек.
          </p>
          <span className="pf-flow-count">
            {Math.min(shown, nodes.length)} / {nodes.length} узлов
          </span>
        </header>

        <div className="pf-flow-viewport">
          <ol
            className="pf-flow-track"
            ref={trackRef}
            style={{ transform: `translate3d(${-progress * shift}px, 0, 0)` }}
          >
            {nodes.map(([kind, title, role, tone], index) => (
              <li className={`pf-flow-node is-${tone} ${index < shown ? "is-on" : ""}`} key={title}>
                <span className="pf-flow-kind">{kind}</span>
                <strong>{title}</strong>
                {role && <small>{role}</small>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
