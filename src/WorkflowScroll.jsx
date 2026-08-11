import { useEffect, useRef, useState } from "react";

// Сборка процесса по скроллу: секция залипает, а внутри лента узлов едет влево
// и достраивается по одному — как воркфлоу в самой платформе.
const nodes = [
  ["Стартовая точка", "С чего начинается", "Сообщение, заявка, время", "start"],
  ["Задача", "Что нужно сделать", "Один узел — одно действие", "task"],
  ["AI-агент", "Кто делает шаг", "Работает сам, без выходных", "task"],
  ["База знаний", "Откуда берёт ответы", "Прайсы, правила, файлы", "book"],
  ["Развилка", "Куда идти дальше", "Процесс сам выбирает путь", "ask"],
  ["Сотрудник", "Где нужен человек", "Спорное и исключения", "human"],
  ["Подключение", "Через что общаемся", "Мессенджеры, CRM, календари", "plug"],
  ["Mary", "Кто говорит с клиентом", "От лица вашей компании", "mary"],
  ["Результат", "Чем всё заканчивается", "Запись, сделка, отчёт", "done"],
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
          <h2>Из чего собирается процесс</h2>
          <p>
            Одни и те же кирпичи в любой нише: с чего начать, что сделать, кто делает, откуда
            берутся ответы и где нужен человек. Вы описываете задачу словами — Mary ставит узлы.
          </p>
          <span className="pf-flow-count">
            {Math.min(shown, nodes.length)} / {nodes.length} блоков
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
