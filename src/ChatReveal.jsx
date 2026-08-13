import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUp,
  Cable,
  ChartPie,
  Clock,
  Copy,
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

// Второй слайд: окно платформы выплывает снизу и встаёт во весь экран.
// Внутри — живой диалог с Mary (как в рабочем прототипе Вики), не первый вход.
const menu = [
  [LayoutGrid, "Главная"],
  [Workflow, "Бизнес-процессы"],
  [Folder, "База знаний"],
  [Cable, "Подключения"],
  [Users, "Сотрудники"],
  [ChartPie, "Аналитика"],
];

const options = [
  "С людьми (B2C) — салон, магазин, кафе, услуги",
  "С компаниями (B2B) — опт, производство, услуги для бизнеса",
  "Онлайн — школа, курсы, эксперт, digital",
  "Смешанно / другое — расскажу словами",
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
    <section className="pf-chat-scene" ref={sceneRef} aria-label="Диалог с Mary">
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

            <div className="mchat-main is-dialog">
              <div className="mchat-top">
                <strong>Чат с Mary</strong>
                <span>
                  <Clock size={15} />
                  <Plus size={16} />
                </span>
              </div>

              <div className="mchat-dialog">
                <div className="mchat-bubble is-user">Я первый раз здесь — с чего мне начать?</div>
                <Copy className="mchat-copy" size={13} />

                <div className="mchat-mary">
                  <div className="mchat-mary-name">
                    <img alt="" src="/media/mary-dog.webp" />
                    Mary
                  </div>
                  <p>
                    Привет! 👋 Я Mary — помощник, который упрощает бизнес. Беру на себя рутину:
                    переписку с клиентами, заявки, записи, напоминания — чтобы ты занимался делом,
                    а не разгребал всё вручную. И собираю это прямо здесь, простым разговором — без
                    сложных меню и настроек.
                  </p>
                  <p>
                    Давай знакомиться — расскажи пару слов о своём деле, и я пойму, что можно
                    упростить в первую очередь. С кем работаешь?
                  </p>
                  <div className="mchat-options">
                    {options.map((text) => (
                      <p key={text}><ArrowRight size={14} />{text}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mchat-ask">
                <button type="button" aria-hidden="true"><Plus size={16} /></button>
                <button type="button" aria-hidden="true"><Paperclip size={15} /></button>
                <em>Спросить у Mary</em>
                <button type="button" aria-hidden="true"><Mic size={16} /></button>
                <button className="is-send" type="button" aria-hidden="true"><ArrowUp size={15} /></button>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
