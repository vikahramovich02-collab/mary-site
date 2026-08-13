import { useEffect, useRef } from "react";

// Маскот Mary. В webp — бесшовный идл-цикл (сидит, дышит с высунутым языком,
// виляет хвостом): сгенерирован в Higgsfield из кадра ролика Вики, фон выбит,
// петля 4 с. Прыжок из-за нижней кромки и возврат при скролле — на CSS.
export function MaryDog() {
  const ref = useRef(null);
  const jumpRef = useRef(null);

  useEffect(() => {
    const dog = ref.current;
    const jump = jumpRef.current;
    if (!dog || !jump) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dog.style.setProperty("--dog-hide", "0");
      jump.classList.add("is-still");
      return undefined;
    }

    const start = window.setTimeout(() => jump.classList.add("is-in"), 380);

    let frame = 0;
    let wasHidden = false;

    const update = () => {
      frame = 0;
      const hide = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.08), 0), 1);
      dog.style.setProperty("--dog-hide", hide.toFixed(3));

      if (hide > 0.9) {
        wasHidden = true;
      } else if (hide < 0.05 && wasHidden) {
        // вернулись наверх — пусть выпрыгнет заново
        wasHidden = false;
        jump.classList.remove("is-in");
        void jump.offsetWidth;
        jump.classList.add("is-in");
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.clearTimeout(start);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="mary-dog" ref={ref} aria-hidden="true">
      <div className="mary-dog-jump" ref={jumpRef}>
        <img className="mary-dog-clip" src="/media/mary-dog.webp" alt="" />
      </div>
    </div>
  );
}
