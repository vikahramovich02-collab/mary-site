import { useEffect, useRef } from "react";

// Чат выплывает снизу маленьким, накрывает анимацию первого экрана и
// разворачивается на всю высоту. Всё считает скролл: секция высокая, внутри
// залипающий кадр, а прогресс приходит в CSS-переменную --p.
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
    <section className="pf-chat-scene" ref={sceneRef} aria-label="Как выглядит работа в чате">
      <div className="pf-chat-sticky">
        <figure className="pf-chat-frame">
          {/* пока постер: положите ролик в /media/platform-demo.mp4 и он подхватится */}
          <video autoPlay loop muted playsInline poster="/media/screens/chat.png" preload="none">
            <source src="/media/platform-demo.mp4" type="video/mp4" />
          </video>
        </figure>
      </div>
    </section>
  );
}
