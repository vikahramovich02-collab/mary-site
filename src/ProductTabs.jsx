import { useEffect, useRef, useState } from "react";
import { HeroField } from "./HeroField.jsx";

// Экраны платформы. Список слева назван не фичами, а тем, что закрывается у бизнеса.
const tabs = [
  {
    key: "processes",
    tab: "Настройка процессов",
    title: "Процесс собран под ваш бизнес",
    text: "Шаги, роли и сроки видно целиком: где сейчас каждая задача и на чём всё встало.",
  },
  {
    key: "chat",
    tab: "Правки словами",
    title: "Меняется в чате, а не в настройках",
    text: "Нужно иначе — пишете обычным сообщением. Без конструкторов, интеграторов и разработчиков.",
  },
  {
    key: "knowledge",
    tab: "Память компании",
    title: "Правила живут в системе, а не в головах",
    text: "Прайсы, скрипты, условия и файлы — агенты отвечают только отсюда и ничего не выдумывают.",
  },
  {
    key: "connections",
    tab: "Любые подключения",
    title: "Собирает то, что у вас уже есть",
    text: "Мессенджеры, CRM, системы записи и календари работают в одном процессе. Переносить ничего не нужно.",
  },
  {
    key: "analytics",
    tab: "Ямы в бизнесе",
    title: "Видно, где утекают деньги",
    text: "Путь от обращения до оплаты и точка, где клиенты отваливаются. Не отчёт ради отчёта.",
  },
  {
    key: "employees",
    tab: "Люди на своих местах",
    title: "Человек нужен там, где он правда нужен",
    text: "Рутину держит Mary, сотруднику уходит спорное: скидка, жалоба, нестандарт.",
  },
];

export function ProductTabs() {
  const sectionRef = useRef(null);
  const menuRef = useRef(null);
  const [active, setActive] = useState(0);
  const [lift, setLift] = useState(0);
  const current = tabs[active];

  // список едет вверх так, чтобы активный пункт всегда стоял на одной высоте
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const item = menu.children[active];
    if (item) setLift(item.offsetTop);
  }, [active]);

  // активный пункт выбирает скролл: секция залипает, а список идёт сверху вниз
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 0.999);
      setActive(Math.floor(progress * tabs.length));
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

  return (
    <section className="pf-screens-section" id="screens" ref={sectionRef}>
      <div className="pf-screens-sticky">
        {/* тот же халфтон, что в герое, только по чёрному и очень медленный */}
        <HeroField
          className="pf-screens-field"
          dotAlpha={0.14}
          dotScale={0.42}
          mode="halftone"
          speed={0.18}
          spread="full"
          tone="dark"
        />
        <header className="pf-screens-head">
          <h2>Так это выглядит внутри</h2>
          <p>Это не чат, который красиво отвечает, а рабочая среда, где бизнес собирает и контролирует свои системы.</p>
        </header>

        <div className="pf-screens">
          <div className="pf-screens-menu-window">
            <ul
              aria-label="Что закрывает платформа"
              className="pf-screens-menu"
              ref={menuRef}
              style={{ transform: `translate3d(0, ${-lift}px, 0)` }}
            >
            {tabs.map((item, index) => (
              <li key={item.key}>
                <button
                  aria-current={index === active}
                  className={index === active ? "is-active" : ""}
                  onClick={() => setActive(index)}
                  type="button"
                >
                  {item.tab}
                </button>
              </li>
            ))}
            </ul>
          </div>

          <div className="pf-screens-stage">
            <figure className="pf-screens-shot">
              <img
                alt={`Экран платформы Mary — ${current.tab}`}
                key={current.key}
                loading="lazy"
                src={`/media/screens/${current.key}.png`}
              />
            </figure>
            <div className="pf-screens-copy" key={`copy-${current.key}`}>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
