import { useEffect, useRef, useState } from "react";
import { CompositionContext, Piece, TRIM } from "./wf/workflow-anim.jsx";

// Кадр анимации из Figma Make: сцена сверстана под 1920×1080 и вписывается в
// ширину блока обычным scale.
const W = 1920;
const H = 1080;

// Хореография живёт в своих секундах: узлы расставлены до 22.9, камера — до 31.
// Вика обрезала первые 3.7 (сцена «Триггер» и часть «Первой ветки»), поэтому
// показываем отрезок FROM…TO и крутим его по кругу.
const FROM = TRIM;
const TO = 31;
const SECONDS = 27.3; // столько идёт один проход — как в списке сцен

export function WorkflowAnim() {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [t, setT] = useState(FROM);

  // вписываем сцену в ширину блока
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const measure = () => setScale(box.clientWidth / W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  // крутим только пока блок на экране: за кадром анимация ничего не ест
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(TO);
      return undefined;
    }

    let raf = 0;
    let last = null;
    const step = (ts) => {
      if (last == null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      setT((prev) => {
        const next = prev + (dt * (TO - FROM)) / SECONDS;
        return next >= TO ? FROM : next;
      });
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) {
        last = null;
        raf = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { threshold: 0.15 });
    io.observe(box);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const value = { T: t, authoredTotal: TO };

  return (
    <div className="wf-anim" ref={boxRef} aria-hidden="true">
      <div className="wf-anim-stage" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        <CompositionContext.Provider value={value}>
          <Piece opts={{ dotGrid: true, branchLabels: true, cardGlow: true }} />
        </CompositionContext.Provider>
      </div>
    </div>
  );
}
