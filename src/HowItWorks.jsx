import { useEffect, useRef, useState } from "react";
import maryMark from "./assets/mary-mark.svg";

// Блок «как Mary собирает автоматизацию» (Figma 10594:18785 + референс Вики):
// слева нумерованная лента шагов с линией, справа медиа. Ведётся скроллом:
// линия заполняется, активный шаг подсвечивается, медиа меняется.
// video — путь к ролику, когда Вика их снимет; пока рисуем CSS-мокапы.
const steps = [
  {
    key: "describe",
    label: "Чат",
    title: "Опишите задачу словами",
    text: "Обычным сообщением в чате — без ТЗ, схем и интеграторов. Mary переспросит, если чего-то не хватает.",
    video: "",
  },
  {
    key: "assemble",
    label: "Процессы",
    title: "Mary собирает процесс",
    text: "Из готовых блоков: агенты, каналы, запись, CRM. Процесс видно целиком до запуска.",
    video: "",
  },
  {
    key: "run",
    label: "Работа",
    title: "Запускает и ведёт сама",
    text: "Вы видите каждый шаг, спорное уходит сотруднику. Правки — тем же сообщением в чат.",
    video: "",
  },
];

function StepVisual({ step }) {
  if (step === "describe") {
    return (
      <div className="hiw-visual hiw-chat" aria-hidden="true">
        <p className="hiw-user">Хочу, чтобы запись клиентов шла без администратора</p>
        <div className="hiw-mary">
          <span><img alt="" height={14} src={maryMark} width={14} />Mary</span>
          <p>Соберу процесс: приём заявок, запись, напоминания. Показываю…</p>
        </div>
      </div>
    );
  }
  if (step === "assemble") {
    return (
      <div className="hiw-visual hiw-graph" aria-hidden="true">
        <div className="hiw-node is-ink">Пришло сообщение<small>Instagram · Telegram</small></div>
        <div className="hiw-link" />
        <div className="hiw-node is-blue">Найти клиента<small>Агент-Клиентов</small></div>
        <div className="hiw-link" />
        <div className="hiw-node is-violet">Предложить время<small>Mary</small></div>
      </div>
    );
  }
  return (
    <div className="hiw-visual hiw-run" aria-hidden="true">
      <div className="hiw-status"><i />Работает<small>последнее действие: сегодня, 17:34</small></div>
      <div className="hiw-stats">
        <div><strong>18</strong><small>обращений</small></div>
        <div><strong>12</strong><small>записей создано</small></div>
        <div><strong>2</strong><small>требуют сотрудника</small></div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef(null);
  // pos — дробный индекс шага: линия заполняется непрерывно, а не прыжками
  const [pos, setPos] = useState(0);
  const active = Math.min(steps.length - 1, Math.max(0, Math.round(pos)));
  const current = steps[active];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      setPos(progress * (steps.length - 1));
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

  const fill = (pos / (steps.length - 1)) * 100;

  return (
    <section className="hiw-section" id="how" ref={sectionRef}>
      <div className="hiw-sticky">
        <h2 className="hiw-title">
          Вам не нужно самому настраивать
          <br />
          автоматизацию — Mary сделает за&nbsp;вас
        </h2>

        <div className="hiw-body">
          <ol className="hiw-steps">
            <span className="hiw-rail" aria-hidden="true">
              <span className="hiw-rail-fill" style={{ height: `${fill}%` }} />
            </span>
            {steps.map((step, index) => (
              <li className={index === active ? "is-on" : ""} key={step.key}>
                <span className="hiw-dot" aria-hidden="true">{index + 1}</span>
                <span className="hiw-label">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="hiw-stage">
            {current.video ? (
              <video autoPlay key={current.key} loop muted playsInline src={current.video} />
            ) : (
              <div className="hiw-frame" key={current.key}>
                <StepVisual step={current.key} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
