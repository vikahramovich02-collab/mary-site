import { useState } from "react";
import {
  MessageCircle, Zap, Inbox, LineChart, BookOpen, PlugZap, Users, ArrowRight, Check,
} from "lucide-react";
import "./styles.css";

const NAV = [
  { key: "chat", label: "Чат", icon: MessageCircle },
  { key: "automations", label: "Бизнес-процессы", icon: Zap },
  { key: "inbox", label: "Входящие", icon: Inbox },
  { key: "analytics", label: "Аналитика", icon: LineChart },
  { key: "knowledge", label: "База знаний", icon: BookOpen },
  { key: "integrations", label: "Подключения", icon: PlugZap },
  { key: "team", label: "Сотрудники", icon: Users },
];

// Сценарий первого входа. reveal — какой раздел загорается на этом шаге,
// coach — карточка-подсказка, reveal2 — второй раздел (появляются вместе).
const beats = [
  { who: "mary", text: "Привет! Я Mary — помогу упростить ваш бизнес. Расскажите пару слов о деле: с кем работаете?" },
  { who: "user", text: "Салон красоты, премиум-услуги." },
  { who: "mary", text: "Поняла. Где обычно теряете время и клиентов — медленные ответы, неявки, бардак с записью?" },
  { who: "user", text: "Медленные ответы — клиенты уходят." },
  { who: "mary", text: "Соберу процесс, который встречает каждое сообщение за секунды и доводит до записи. Собираем?" },
  { who: "user", text: "Да, собираем." },
  {
    who: "mary", text: "Готово — процесс «Запись клиентов» собран и работает.",
    reveal: "automations",
    coach: { title: "Появился раздел «Бизнес-процессы»", text: "Здесь живут ваши автоматизации. Я только что собрала первую." },
  },
  { who: "mary", text: "Чтобы отвечать точно — наполню базу знаний вашим прайсом. Собрать скрипт ответов самой?" },
  { who: "user", text: "Составь сама." },
  {
    who: "mary", text: "Готово, база наполнена — теперь отвечаю только по вашим материалам.",
    reveal: "knowledge",
    coach: { title: "Появился раздел «База знаний»", text: "Мозг ваших процессов: прайсы, скрипты, правила. Агенты берут ответы отсюда." },
  },
  { who: "mary", text: "Осталось подключить, откуда приходят клиенты. Подключаю Instagram?" },
  { who: "user", text: "Подключить Instagram." },
  {
    who: "mary", text: "Канал подключён — встречаю обращения вживую.",
    reveal: "integrations",
    coach: { title: "Появился раздел «Подключения»", text: "Все каналы и сервисы салона в одном месте." },
  },
  {
    who: "mary", text: "Пока вас не было — записала 6 клиентов. Одну заявку вынесла вам: просят скидку 30%.",
    reveal: "inbox", reveal2: "analytics",
    coach: { title: "Появились «Входящие» и «Аналитика»", text: "Во «Входящие» приношу только то, что требует вашего решения. В «Аналитике» видно, где теряются клиенты." },
  },
  { who: "user", text: "Добавь Анну администратором — пусть подтверждает записи." },
  {
    who: "mary", text: "Добавила Анну. Передаю ей ситуации, где нужно решение человека.",
    reveal: "team",
    coach: { title: "Появился раздел «Сотрудники»", text: "Люди-апруверы. Передаю им только то, где нужно решение человека." },
  },
  { who: "mary", text: "Меню собралось само — под то, что вы реально используете. Готово 🙌" },
];

function Bubble({ beat }) {
  if (beat.who === "user") {
    return <div className="user-message"><p>{beat.text}</p></div>;
  }
  return (
    <div className="mary-message">
      <div className="mary-label"><span className="mary-avatar">m</span><strong>Mary</strong></div>
      <p>{beat.text}</p>
    </div>
  );
}

export function Onboarding() {
  const [idx, setIdx] = useState(1); // сколько бит показано
  const [revealed, setRevealed] = useState(() => new Set(["chat"]));
  const [lastRevealed, setLastRevealed] = useState(null);
  const [coach, setCoach] = useState(null);

  const done = idx >= beats.length;

  const advance = () => {
    if (done || coach) return;
    const b = beats[idx];
    if (b.reveal) {
      setRevealed((prev) => {
        const next = new Set(prev);
        next.add(b.reveal);
        if (b.reveal2) next.add(b.reveal2);
        return next;
      });
      setLastRevealed(b.reveal);
    }
    if (b.coach) setCoach(b.coach);
    setIdx(idx + 1);
  };

  const restart = () => {
    setIdx(1);
    setRevealed(new Set(["chat"]));
    setLastRevealed(null);
    setCoach(null);
  };

  const shownNav = NAV.filter((n) => revealed.has(n.key));
  const shown = beats.slice(0, idx);

  return (
    <div className="app-shell ob-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <span className="brand"><span className="brand-mark" aria-hidden="true">m</span><span>mary</span></span>
        </div>
        <nav className="main-nav" aria-label="Разделы">
          {shownNav.map((n) => {
            const Icon = n.icon;
            const isNew = n.key === lastRevealed;
            return (
              <button type="button" key={n.key} className={`nav-item ${n.key === "chat" ? "is-active" : ""} ${isNew ? "ob-appear" : ""}`}>
                <Icon size={20} />
                <span>{n.label}</span>
                {isNew && <span className="nav-badge ob-newtag">ново</span>}
              </button>
            );
          })}
        </nav>
        <div className="ob-hint">Меню появляется по мере работы</div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-title"><span>Чат с Mary</span></div>
          <div className="topbar-actions">
            <button className="button secondary compact" type="button" onClick={restart}>Сначала</button>
            <a className="button primary compact" href="/?page=platform">Открыть платформу</a>
          </div>
        </header>
        <div className="screen-wrap">
          <main className="chat-canvas dotted-bg ob-canvas">
            <div className="chat-thread">
              {shown.map((b, i) => <Bubble key={i} beat={b} />)}
            </div>
            <div className="ob-controls">
              {!done && !coach && (
                <button className="ob-next" type="button" onClick={advance}>
                  Продолжить <ArrowRight size={18} />
                </button>
              )}
              {coach && <span className="ob-wait">Прочитайте подсказку →</span>}
              {done && (
                <div className="ob-done">
                  <Check size={18} /> Онбординг пройден — меню собралось само под ваши задачи.
                  <button className="ob-next" type="button" onClick={restart}>Пройти заново</button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {coach && (
        <>
          <div className="ob-dim" />
          <div className="ob-coach" role="dialog" aria-modal="true">
            <span className="ob-coach-tag">Новый раздел</span>
            <h4>{coach.title}</h4>
            <p>{coach.text}</p>
            <button className="ob-coach-btn" type="button" onClick={() => setCoach(null)}>Понятно</button>
          </div>
        </>
      )}
    </div>
  );
}
