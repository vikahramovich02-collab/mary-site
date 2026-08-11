import { useState } from "react";
import { Check } from "lucide-react";

// Три панели-гармошки: активная раскрыта и показывает суть, соседние свёрнуты
// до подписи. Механика с лендинга Higgsfield, который принесла Вика.
const panels = [
  {
    key: "chat",
    short: "Собирается в чате",
    title: "Ничего не настраивается руками",
    items: [
      "Описываете задачу обычными словами",
      "Процесс поднимается из готовых блоков",
      "Правки — тем же сообщением в чат",
    ],
  },
  {
    key: "team",
    short: "Работает как команда",
    title: "Агенты на шагах, люди — на спорном",
    items: [
      "Под каждый шаг свой агент, Mary ими управляет",
      "Скидки, жалобы и нестандарт уходят человеку",
      "Работает круглосуточно и без увольнений",
    ],
  },
  {
    key: "control",
    short: "Контроль у вас",
    title: "Видно, что происходит внутри компании",
    items: [
      "Где сейчас каждая задача и где всё встало",
      "Правила и контекст живут в системе, а не в головах",
      "Видно, на каком шаге теряются клиенты",
    ],
  },
];

const media = {
  chat: (
    <div className="pf-panel-chat">
      <span className="pf-panel-bubble">Хочу, чтобы вы вели запись за меня</span>
      <span className="pf-panel-reply">Собираю — смотрите</span>
      <span className="pf-panel-chip is-on">Процесс готов</span>
    </div>
  ),
  team: (
    <div className="pf-panel-team">
      <span className="pf-panel-agent">Агент обращений</span>
      <span className="pf-panel-agent is-blue">Агент записи</span>
      <span className="pf-panel-agent is-violet">Mary</span>
      <span className="pf-panel-agent is-human">Виктория В.</span>
    </div>
  ),
  control: (
    <div className="pf-panel-control">
      <span className="pf-panel-row"><i />Обращение принято</span>
      <span className="pf-panel-row"><i />Время подобрано</span>
      <span className="pf-panel-row is-wait"><i />Ждёт сотрудника</span>
    </div>
  ),
};

export function PlatformPanels() {
  const [active, setActive] = useState(0);

  return (
    <div className="pf-panels">
      <div className="pf-panels-row">
        {panels.map((panel, index) => (
          <article
            className={`pf-panel ${index === active ? "is-open" : ""}`}
            key={panel.key}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
          >
            <div className="pf-panel-media">{media[panel.key]}</div>

            {index === active ? (
              <div className="pf-panel-body">
                <h3>{panel.title}</h3>
                <ul>
                  {panel.items.map((item) => (
                    <li key={item}><Check size={15} aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <strong className="pf-panel-short">{panel.short}</strong>
            )}
          </article>
        ))}
      </div>

      <div className="pf-panels-dots" aria-hidden="true">
        {panels.map((panel, index) => (
          <span className={index === active ? "is-on" : ""} key={panel.key} />
        ))}
      </div>
    </div>
  );
}
