import { ArrowRight, Eye, ShieldCheck, UserCheck } from "lucide-react";

// Два смысловых блока по мотивам разбора конкурента (cowork.bitrix24.ru):
// 1) «Чем Mary отличается от обычного ИИ» — снимает вопрос «а чем не ChatGPT?»
// 2) «Всё под вашим контролем» — главное возражение бизнеса про автономный ИИ.

const rows = [
  {
    left: ["Не знает ваш бизнес", "Каждый раз объяснять всё заново"],
    right: ["Живёт в вашей компании", "Прайсы, правила и история — в базе знаний"],
  },
  {
    left: ["Советует", "Делать всё равно вам"],
    right: ["Делает сама", "Пишет клиентам, ведёт запись, ставит задачи"],
  },
  {
    left: ["Один чат — один ответ", "Результат надо переносить руками"],
    right: ["Целая система", "Агенты, процессы, CRM и каналы связаны"],
  },
  {
    left: ["Настройка — конструктор", "Схемы, блоки, интегратор"],
    right: ["Настройка — сообщение", "Написали, что нужно, — Mary пересобрала"],
  },
];

export function MaryVs() {
  return (
    <section className="mvs-section" id="difference">
      <h2 className="mvs-title">
        Чем Mary отличается
        <br />
        от обычного ИИ-помощника
      </h2>
      <div className="mvs-head" aria-hidden="true">
        <span>Обычный ИИ-чат</span>
        <span className="is-mary">Mary</span>
      </div>
      <div className="mvs-rows">
        {rows.map((row) => (
          <div className="mvs-row" key={row.left[0]}>
            <div className="mvs-cell is-left">
              <strong>{row.left[0]}</strong>
              <span>{row.left[1]}</span>
            </div>
            <ArrowRight aria-hidden="true" className="mvs-arrow" size={18} />
            <div className="mvs-cell is-right">
              <strong>{row.right[0]}</strong>
              <span>{row.right[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const controls = [
  {
    icon: ShieldCheck,
    title: "Работает в рамках прав",
    text: "Mary видит только то, что вы ей открыли: доступы задаёте вы",
  },
  {
    icon: UserCheck,
    title: "Спорное — человеку",
    text: "Скидка, жалоба, нестандарт — уходят сотруднику, а не решаются наугад",
  },
  {
    icon: Eye,
    title: "Каждый шаг видно",
    text: "Что сделала Mary и почему — в истории процесса, ничего не происходит втихую",
  },
];

export function MaryControl() {
  return (
    <section className="mctl-section" id="control">
      <h2 className="mctl-title">Всё под вашим контролем</h2>
      <div className="mctl-grid">
        {controls.map((item) => (
          <div className="mctl-card" key={item.title}>
            <span className="mctl-icon"><item.icon size={22} /></span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <a className="mctl-cta" href="/?page=onboarding">Попробовать Mary</a>
    </section>
  );
}
