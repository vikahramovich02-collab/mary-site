import { useEffect, useRef } from "react";

// Маскот Mary: выпрыгивает из-за нижней кромки первого экрана, дышит на месте
// и ныряет обратно, когда страницу листают. Если вернуться наверх — прыгает снова.
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

    // прыжок запускаем не сразу — сначала пусть отрисуется экран
    const start = window.setTimeout(() => jump.classList.add("is-in"), 420);

    let frame = 0;
    let wasHidden = false;

    const update = () => {
      frame = 0;
      // прячется за половину экрана прокрутки
      const hide = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.5), 0), 1);
      dog.style.setProperty("--dog-hide", hide.toFixed(3));

      if (hide > 0.9) {
        wasHidden = true;
      } else if (hide < 0.05 && wasHidden) {
        // вернулись наверх — пусть выпрыгнет заново, а не просто выедет
        wasHidden = false;
        jump.classList.remove("is-in");
        void jump.offsetWidth; // перезапуск анимации
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
        <img className="mary-dog-body" src="/media/mary-dog.png" alt="" />
      </div>
    </div>
  );
}
