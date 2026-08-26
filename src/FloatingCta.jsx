import { useEffect, useState } from "react";

// Фиксированное меню снизу (как плавающая кнопка в платформе, Figma 10591:26400):
// «Создать с Mary» + «+». Появляется после того, как герой ушёл из кадра,
// чтобы не спорить с кнопкой «Попробовать» на первом экране.
export function FloatingCta() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShown(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`float-cta${shown ? " is-shown" : ""}`}>
      <a className="ks-cta-main" href="/?page=onboarding">
        <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
          <path
            d="M14 7.6a5.6 5.6 0 0 1-6 5.6c-.7 0-1.4-.1-2-.4L2 14l1.2-4a5.4 5.4 0 0 1-.4-2.4A5.6 5.6 0 0 1 8.4 2 5.6 5.6 0 0 1 14 7.6Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
          />
        </svg>
        Создать с Mary
      </a>
      <a aria-label="Открыть Mary" className="ks-cta-plus" href="/?page=platform">
        <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 14 14" width="14">
          <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
        </svg>
      </a>
    </div>
  );
}
