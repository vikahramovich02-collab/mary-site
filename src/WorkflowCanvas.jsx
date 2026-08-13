import { useEffect, useRef, useState } from "react";

// Воркфлоу «Запись клиентов», снятый из Figma (node 10591:9780) по координатам:
// кадр 2191×1373, каждый узел стоит там же, где в макете. Сборка привязана к
// скроллу: остановились — и достройка замирает.
const FRAME = { w: 2191, h: 1373 };

const nodes = [
  { id: "start", x: 23, y: 450, w: 158, h: 125, kind: "start", tag: "Триггер", title: "Пришло новое сообщение от клиента", meta: "Instagram · Telegram" },
  { id: "find", x: 211, y: 460, w: 158, h: 118, kind: "task", tag: "Задача", title: "Найти клиента и определить статус", meta: "Агент-Поддержки" },
  { id: "isBooking", x: 399, y: 473, w: 143, h: 95, kind: "ask", tag: "Вопрос", title: "Запрос связан с записью?" },
  { id: "handoff", x: 391, y: 629, w: 158, h: 118, kind: "mary", tag: "Задача", title: "Передать в другой процесс", meta: "Mary" },
  { id: "status", x: 611, y: 460, w: 158, h: 118, kind: "task", tag: "Задача", title: "Найти клиента и определить статус", meta: "Агент-Клиентов" },
  { id: "known", x: 820, y: 473, w: 143, h: 83, kind: "ask", tag: "Вопрос", title: "Клиент найден?" },
  { id: "service", x: 1162, y: 342, w: 158, h: 118, kind: "task", tag: "Задача", title: "Уточнить услугу и пожелания", meta: "Агент-Записи" },
  { id: "collect", x: 1162, y: 578, w: 158, h: 118, kind: "task", tag: "Задача", title: "Собрать данные и добавить клиента в базу", meta: "Агент-Клиентов" },
  { id: "exactTime", x: 1377, y: 355, w: 143, h: 83, kind: "ask", tag: "Вопрос", title: "Клиент указал конкретное время?" },
  { id: "checkDate", x: 1598, y: 257, w: 158, h: 118, kind: "task", tag: "Задача", title: "Проверить указанную дату и время", meta: "Агент-Расписания" },
  { id: "findSlot", x: 1598, y: 432, w: 158, h: 118, kind: "task", tag: "Задача", title: "Найти свободное время", meta: "Агент-Расписания" },
  { id: "hasSlot", x: 1816, y: 355, w: 143, h: 83, kind: "ask", tag: "Вопрос", title: "Есть подходящее время?" },
  { id: "human1", x: 1808, y: 492, w: 158, h: 115, kind: "human", tag: "Сотрудник", title: "Помочь подобрать другой вариант", meta: "Виктория В." },
  { id: "offer", x: 1912, y: 640, w: 158, h: 118, kind: "mary", tag: "Задача", title: "Предложить время клиенту", meta: "Mary" },
  { id: "confirmed", x: 1712, y: 659, w: 143, h: 83, kind: "ask", tag: "Вопрос", title: "Клиент подтвердил время?" },
  { id: "changes", x: 1498, y: 641, w: 158, h: 118, kind: "task", tag: "Задача", title: "Уточнить изменения", meta: "Агент-Записи" },
  { id: "create", x: 1220, y: 917, w: 158, h: 118, kind: "task", tag: "Задача", title: "Создать запись в системе", meta: "Агент-Записи" },
  { id: "created", x: 1021, y: 935, w: 143, h: 83, kind: "ask", tag: "Вопрос", title: "Запись создана?" },
  { id: "fix", x: 1014, y: 1072, w: 158, h: 103, kind: "human", tag: "Сотрудник", title: "Решить ошибку записи", meta: "Виктория В." },
  { id: "check", x: 1435, y: 917, w: 158, h: 103, kind: "human", tag: "Сотрудник", title: "Проверить запись", meta: "Виктория В." },
  { id: "confirm", x: 783, y: 917, w: 158, h: 118, kind: "mary", tag: "Задача", title: "Отправить подтверждение клиенту", meta: "Mary" },
  { id: "note", x: 391, y: 781, w: 160, h: 54, kind: "note", title: "Передать в другой процесс", meta: "Собрать с Mary" },
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
const right = (n) => ({ x: n.x + n.w, y: n.y + n.h / 2 });
const left = (n) => ({ x: n.x, y: n.y + n.h / 2 });
const top = (n) => ({ x: n.x + n.w / 2, y: n.y });
const bottom = (n) => ({ x: n.x + n.w / 2, y: n.y + n.h });

// Связи в порядке сборки: сначала ствол, потом ветки.
const edges = [
  { from: ["start", right], to: ["find", left] },
  { from: ["find", right], to: ["isBooking", left] },
  { from: ["isBooking", right], to: ["status", left], label: "Да" },
  { from: ["isBooking", bottom], to: ["handoff", top], label: "Нет" },
  { from: ["status", right], to: ["known", left] },
  { from: ["known", right], to: ["service", left], label: "Постоянный клиент" },
  { from: ["known", right], to: ["collect", left], label: "Первичный клиент" },
  { from: ["collect", top], to: ["service", bottom] },
  { from: ["service", right], to: ["exactTime", left] },
  { from: ["exactTime", right], to: ["checkDate", left], label: "Да" },
  { from: ["exactTime", right], to: ["findSlot", left], label: "Нет" },
  { from: ["checkDate", right], to: ["hasSlot", left] },
  { from: ["findSlot", right], to: ["hasSlot", left] },
  { from: ["hasSlot", bottom], to: ["human1", top], label: "Нет" },
  { from: ["human1", bottom], to: ["offer", top] },
  { from: ["hasSlot", right], to: ["offer", top], label: "Да" },
  { from: ["offer", left], to: ["confirmed", right] },
  { from: ["confirmed", left], to: ["changes", right], label: "Нет" },
  { from: ["changes", left], to: ["service", bottom] },
  { from: ["confirmed", bottom], to: ["check", right], label: "Да" },
  { from: ["check", left], to: ["create", right] },
  { from: ["create", left], to: ["created", right] },
  { from: ["created", left], to: ["confirm", right], label: "Да" },
  { from: ["created", bottom], to: ["fix", top], label: "Нет" },
  { from: ["fix", right], to: ["create", bottom] },
];

// Ортогональный маршрут: выходим из точки, идём коленом, входим в цель.
function path(a, b) {
  if (Math.abs(a.y - b.y) < 2) return `M${a.x} ${a.y} L${b.x} ${b.y}`;
  const midX = a.x + (b.x - a.x) / 2;
  return `M${a.x} ${a.y} L${midX} ${a.y} L${midX} ${b.y} L${b.x} ${b.y}`;
}

export function WorkflowCanvas() {
  const sceneRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = scene.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      setProgress(Math.min(Math.max(-rect.top / travel, 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // шаги идут парами «связь → узел», поэтому прогресс делим на общее число
  const steps = edges.length + nodes.length;
  const done = progress * steps;

  const nodeShown = (id) => {
    const order = nodes.findIndex((n) => n.id === id);
    return done > order * (steps / nodes.length) * 0.5;
  };

  return (
    <section className="wf-scene" ref={sceneRef} aria-label="Как собирается процесс записи клиентов">
      <div className="wf-sticky">
        <header className="wf-head">
          <h2>Процесс собирается на глазах</h2>
          <p>Листайте — Mary достраивает узел за узлом: кто встречает клиента, где развилка, где нужен человек.</p>
        </header>

        <div className="wf-canvas" style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}>
          <svg viewBox={`0 0 ${FRAME.w} ${FRAME.h}`} preserveAspectRatio="xMidYMid meet">
            {edges.map((edge, i) => {
              const a = edge.from[1](byId[edge.from[0]]);
              const b = edge.to[1](byId[edge.to[0]]);
              const d = path(a, b);
              const share = i / edges.length;
              const drawn = Math.min(Math.max((progress - share * 0.86) / 0.06, 0), 1);
              const key = `${edge.from[0]}-${edge.to[0]}-${i}`;
              const mid = { x: a.x + (b.x - a.x) / 2, y: a.y + (b.y - a.y) / 2 };
              const wide = edge.label && edge.label.length > 3;
              return (
                <g key={key}>
                  <path
                    className="wf-edge"
                    d={d}
                    pathLength={1}
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 - drawn }}
                  />
                  {edge.label && drawn > 0.75 && (
                    <g className={`wf-label ${wide ? "is-wide" : ""}`}>
                      <rect
                        height="20"
                        rx="10"
                        width={wide ? 120 : 30}
                        x={mid.x - (wide ? 60 : 15)}
                        y={mid.y - 10}
                      />
                      <text x={mid.x} y={mid.y + 4}>{edge.label}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {nodes.map((node, i) => {
            const share = i / nodes.length;
            const shown = progress > share * 0.86;
            return (
              <article
                className={`wf-node is-${node.kind} ${shown ? "is-on" : ""}`}
                key={node.id}
                style={{
                  left: `${(node.x / FRAME.w) * 100}%`,
                  top: `${(node.y / FRAME.h) * 100}%`,
                  width: `${(node.w / FRAME.w) * 100}%`,
                  height: `${(node.h / FRAME.h) * 100}%`,
                }}
              >
                <span className="wf-tag">{node.tag}</span>
                <strong>{node.title}</strong>
                {node.meta && <small>{node.meta}</small>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
