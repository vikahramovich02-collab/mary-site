import { useEffect, useRef } from "react";
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

// Второй слайд по Figma 3:95958 → 3:96009: окно платформы (сайдбар + первый
// вход в чат) выплывает снизу над точками героя и встаёт во весь экран.
// Экран собран живой вёрсткой — масштаб макета 0.935 приведён к целым.
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
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scene.style.setProperty("--p", "1");
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = scene.getBoundingClientRect();
      // 0 — кадр только показался снизу, 1 — развернулся на весь экран
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const p = Math.min(Math.max(-rect.top / travel, 0), 1);
      scene.style.setProperty("--p", p.toFixed(4));
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
    <section className="pf-chat-scene" ref={sceneRef} aria-label="Первый вход в чат Mary">
      <div className="pf-chat-sticky">
        <figure className="pf-chat-frame">
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
        </figure>
      </div>
    </section>
  );
}
