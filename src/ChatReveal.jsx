
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Cable,
  ChartPie,
  Clock,
  Folder,
  LayoutGrid,
  MessageCircle,
  Mic,
  Paperclip,
  Phone,
  Plus,
  Users,
  Workflow,
} from "lucide-react";
import maryMark from "./assets/mary-mark.svg";
import { HeroField } from "./HeroField.jsx";

// Второй экран: кадр 16:10 с медиа, без скролл-анимации.
// VIDEO — путь к ролику; пока пусто, показываем живой экран платформы
// (Figma 3:95958 → 3:96009, собран вёрсткой).
const VIDEO = "";
const menu = [
  [LayoutGrid, "Главная"],
  [Workflow, "Бизнес-процессы"],
  [Folder, "База знаний"],
  [Cable, "Подключения"],
  [Users, "Сотрудники"],
  [ChartPie, "Аналитика"],
];

const chips = ["С чего начать?", "Что ты умеешь?", "Знаю, что нужно"];
const suggestions = [
  "Я первый раз здесь — с чего мне начать?",
  "Разбери мой бизнес и предложи, что упростить первым",
];

export function ChatReveal() {
  return (
    <section className="pf-chat-scene" aria-label="Первый вход в чат Mary">
      {/* точки продолжаются за кадром, как в макете 10517:17004 */}
      <HeroField className="pf-chat-field" dotAlpha={0.16} mode="halftone" speed={1.6} tone="light" />
      <div className="pf-chat-sticky">
        <figure className="pf-chat-frame">
          {VIDEO ? (
            <video autoPlay loop muted playsInline src={VIDEO} />
          ) : (
          <div className="mchat" aria-hidden="true">
            <aside className="mchat-menu">
              <div className="mchat-brand">
                <img alt="" src={maryMark} />
                <span>mary</span>
              </div>

              <nav className="mchat-nav">
                <a className="is-active"><MessageCircle size={15} />Чат</a>
                <small>Компания</small>
                {menu.map(([Icon, label]) => (
                  <a key={label}><Icon size={15} />{label}</a>
                ))}
              </nav>

              <div className="mchat-menu-foot">
                <a><Phone size={15} />Поддержка</a>
                <div className="mchat-user">
                  <span>АЛ</span>
                  Александр Лукашевич
                </div>
              </div>
            </aside>

            <div className="mchat-main">
              <Clock size={15} className="mchat-history" />

              <div className="mchat-center">
                <img className="mchat-dog" alt="" src="/media/mary-dog.webp" />
                <h3>Привет! Я Mary —<br />помогу упростить твой бизнес</h3>

                <div className="mchat-input">
                  <p>Опишите своими словами, что хотите</p>
                  <div className="mchat-input-row">
                    <button type="button" aria-hidden="true"><Plus size={16} /></button>
                    <button type="button" aria-hidden="true"><Paperclip size={15} /></button>
                    <i />
                    <button type="button" aria-hidden="true"><Mic size={16} /></button>
                    <button className="is-send" type="button" aria-hidden="true"><ArrowUp size={15} /></button>
                  </div>
                </div>

                <div className="mchat-chips">
                  {chips.map((chip, i) => (
                    <span className={i === 0 ? "is-active" : ""} key={chip}>{chip}</span>
                  ))}
                </div>

                <div className="mchat-suggest">
                  {suggestions.map((text) => (
                    <p key={text}><ArrowRight size={14} />{text}</p>
                  ))}
                </div>
              </div>

              <span className="mchat-down"><ArrowDown size={18} /></span>
            </div>
          </div>
          )}
        </figure>
      </div>
    </section>
  );
}
