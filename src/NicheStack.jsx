import { useEffect, useRef, useState } from "react";
import "./custom-landing.css";

// Липкий список слева и проматывающиеся панели справа: активный пункт
// подсвечивается тем, что сейчас в кадре. Карточки — по референсу Вики:
// визуал + название задачи + сравнение «Mary · время» против «Руками · время».
// ВРЕМЕНА — оценочные, Вика может поправить прямо здесь.
const items = [
  {
    id: "beauty",
    title: "Салоны красоты",
    text: "Запись из соцсетей, ответы из вашего прайса, напоминания перед визитом.",
    cards: [
      { shot: "/media/screens/chat.png", title: "Ответ на заявку", ai: "30 секунд", hand: "20 минут" },
      { shot: "/media/screens/processes.png", title: "Запись или перенос", ai: "1 минута", hand: "15 минут" },
      { shot: "/media/screens/workflow-full.png", title: "Напоминания перед визитом", ai: "5 минут", hand: "2 часа" },
      { shot: "/media/screens/analytics.png", title: "Вернуть тех, кто пропал", ai: "10 минут", hand: "6 часов" },
    ],
  },
  {
    id: "manufacturing",
    title: "Производства",
    text: "Заявки, согласования и сроки в одном процессе. Закрытый контур, если данные нельзя отдавать наружу.",
    cards: [
      { shot: "/media/screens/connections.png", title: "Расчёт стоимости заказа", ai: "3 минуты", hand: "2 часа" },
      { shot: "/media/screens/processes.png", title: "Заявка и согласование", ai: "10 минут", hand: "2 дня" },
      { shot: "/media/screens/knowledge.png", title: "Счёт, акт, договор", ai: "1 минута", hand: "40 минут" },
      { shot: "/media/screens/analytics.png", title: "Сводка по срокам", ai: "5 минут", hand: "2 часа" },
    ],
  },
  {
    id: "retail",
    title: "Магазины и доставка",
    text: "Вопросы о заказе, статус доставки и отзывы — без менеджера в переписке.",
    cards: [
      { shot: "/media/screens/chat.png", title: "«Где мой заказ?»", ai: "30 секунд", hand: "1 час" },
      { shot: "/media/screens/knowledge.png", title: "Вопросы о доставке и оплате", ai: "30 секунд", hand: "15 минут" },
      { shot: "/media/screens/employees.png", title: "Собрать отзывы и ответить", ai: "5 минут", hand: "1 час" },
      { shot: "/media/screens/analytics.png", title: "Отчёт по продажам", ai: "2 минуты", hand: "4 часа" },
    ],
  },
  {
    id: "services",
    title: "Услуги с записью",
    text: "Клиники, фитнес, автосервисы: тот же кор плюс пара интеграций под нишу.",
    cards: [
      { shot: "/media/screens/knowledge.png", title: "Ответы по прайсу и услугам", ai: "30 секунд", hand: "15 минут" },
      { shot: "/media/screens/chat.png", title: "Карточка клиента из переписки", ai: "1 минута", hand: "30 минут" },
      { shot: "/media/screens/workflow-full.png", title: "Позвать на повторный визит", ai: "10 минут", hand: "3 часа" },
      { shot: "/media/screens/connections.png", title: "Разбор входящих по каналам", ai: "5 минут", hand: "3 часа" },
    ],
  },
  {
    // фокус сейчас — салоны и производства, но кор собирается под любой бизнес
    id: "any",
    title: "Ваш бизнес",
    text: "Кор один: агенты, процессы, CRM и база знаний. Под вашу нишу Mary добирает интеграции и логику.",
    cards: [
      { shot: "/media/screens/employees.png", title: "Команда агентов под ваш процесс", cta: "Обсудить задачу" },
      { shot: "/media/screens/connections.png", title: "Интеграции под ваш стек", cta: "Показать на вашем процессе" },
    ],
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
            {item.cards.map((card) => (
              <figure className="ns-card" key={card.title}>
                <div className="ns-card-shot">
                  <img alt="" loading="lazy" src={card.shot} />
                </div>
                <figcaption>
                  <strong>{card.title}</strong>
                  {card.cta ? (
                    <a className="ns-cta" href="#contact">{card.cta} →</a>
                  ) : (
                    <span className="ns-times">
                      <em>Mary · {card.ai}</em>
                      <span>Руками · {card.hand}</span>
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
