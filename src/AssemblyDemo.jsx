import { useEffect, useRef, useState } from "react";
import { ArrowUp, FileText } from "lucide-react";
import maryMark from "./assets/mary-mark.svg";

// Блок «живая сборка»: слева чат, справа процесс собирается узел за узлом.
// Композиция и палитра сняты с экрана Chat / Salon в Figma (файл Mary).

const nodes = [
  ["Пришло сообщение", "Instagram · Telegram", "ink"],
  ["Понимаю запрос", "Агент обращений", "blue"],
  ["Подбираю свободное время", "Агент расписания", "blue"],
  ["Предлагаю клиенту время", "Mary", "violet"],
];

export function AssemblyDemo() {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(nodes.length);
      return undefined;
    }

    let timer = 0;
    let cycle = 0;

    // сборка идёт, пока блок на экране, и повторяется — иначе зритель,
    // пролиставший мимо, увидит уже собранный процесс и не поймёт сути
    const run = () => {
      setShown(0);
      let step = 0;
      const tick = () => {
        step += 1;
        setShown(step);
        timer = window.setTimeout(step < nodes.length ? tick : restart, step < nodes.length ? 900 : 4200);
      };
      timer = window.setTimeout(tick, 600);
    };

    const restart = () => {
      cycle += 1;
      run();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
        } else {
          window.clearTimeout(timer);
          setShown(nodes.length);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="pf-assembly" ref={ref}>
      <div className="pf-assembly-chat">
        <span className="pf-assembly-label">Чат с Mary</span>
        <div className="pf-assembly-thread">
          <p className="pf-assembly-user">Соберите — хочу, чтобы вы вели запись за меня</p>
          <div className="pf-assembly-mary">
            <span className="pf-assembly-who"><img src={maryMark} alt="" />Mary</span>
            <p>Собираю у вас на глазах — смотрите справа.</p>
            <p>Первый шаг готов: встречаю клиента и понимаю, что он хочет. Сейчас добавляю подбор времени.</p>
            <p className="pf-assembly-status">
              собираю шаг {Math.min(Math.max(shown, 1), nodes.length)} из {nodes.length}
            </p>
          </div>
        </div>
        <div className="pf-assembly-input" aria-hidden="true">
          <span>Спросить у Mary</span>
          <i><ArrowUp size={15} /></i>
        </div>
      </div>

      <div className="pf-assembly-canvas">
        <div className="pf-assembly-canvas-head">
          <FileText size={16} aria-hidden="true" />
          <strong>Запись клиентов</strong>
          <em>собираю</em>
        </div>
        <ol className="pf-assembly-nodes">
          {nodes.map(([title, role, tone], index) => (
            <li
              className={`pf-node is-${tone} ${index < shown ? "is-shown" : ""}`}
              key={title}
            >
              <span className="pf-node-dot" aria-hidden="true" />
              <strong>{title}</strong>
              <small>{role}</small>
            </li>
          ))}
        </ol>
        <p className="pf-assembly-hint">дальше: запишу визит и проверю, где нужен человек</p>
      </div>
    </div>
  );
}
