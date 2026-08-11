import { useEffect, useRef } from "react";

// Маскот Mary. Собран вектором по её рисунку: силуэт рисуется в два прохода —
// сначала все части с толстой обводкой, сверху те же части заливкой, — так
// внутренние линии пропадают и остаётся один общий контур. Части лежат
// отдельными группами, поэтому уши, хвост, веки и язык живут своей жизнью.

const INK = "#111214";
const COAT = "#4b5058";

function Parts({ outline }) {
  const skin = outline
    ? { fill: COAT, stroke: INK, strokeWidth: 16, strokeLinejoin: "round" }
    : { fill: COAT };

  return (
    <>
      <g className="dog-tail">
        <path d="M318 300c34-6 52 12 52 34 0 20-16 32-34 26" {...skin} />
      </g>
      <g className="dog-ear is-left">
        <ellipse cx="96" cy="188" rx="44" ry="94" transform="rotate(-10 96 188)" {...skin} />
      </g>
      <g className="dog-ear is-right">
        <ellipse cx="324" cy="188" rx="44" ry="94" transform="rotate(10 324 188)" {...skin} />
      </g>
      <ellipse cx="210" cy="336" rx="112" ry="92" {...skin} />
      <rect x="146" y="376" width="52" height="70" rx="26" {...skin} />
      <rect x="222" y="376" width="52" height="70" rx="26" {...skin} />
      <g className="dog-head-part">
        <ellipse cx="210" cy="182" rx="120" ry="106" {...skin} />
      </g>
    </>
  );
}

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
      const hide = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.5), 0), 1);
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
        <svg className="mary-dog-svg" viewBox="0 0 420 470" role="presentation">
          <g className="dog-breath">
            <Parts outline />
            <Parts />

            <g className="dog-head">
              {/* язык: во время облизывания вылетает, потом просто ходит от дыхания */}
              <g className="dog-tongue">
                <path
                  d="M186 236h48v46c0 13-11 24-24 24s-24-11-24-24z"
                  fill="#ef7a90"
                  stroke={INK}
                  strokeWidth="9"
                  strokeLinejoin="round"
                />
                <path d="M210 246v34" stroke="#d9536f" strokeWidth="7" strokeLinecap="round" />
              </g>

              {/* морда */}
              <path
                d="M210 214c0 16-14 26-30 26M210 214c0 16 14 26 30 26"
                fill="none"
                stroke={INK}
                strokeWidth="11"
                strokeLinecap="round"
              />
              <ellipse cx="210" cy="196" rx="23" ry="18" fill={INK} />

              {/* глаза, веки моргают поверх */}
              <g className="dog-eye is-left">
                <circle cx="164" cy="152" r="13" fill={INK} />
                <circle className="dog-lid" cx="164" cy="152" r="15" fill={COAT} />
              </g>
              <g className="dog-eye is-right">
                <circle cx="256" cy="152" r="13" fill={INK} />
                <circle className="dog-lid" cx="256" cy="152" r="15" fill={COAT} />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
