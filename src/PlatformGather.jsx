import { useEffect, useRef, useState } from "react";

// Анимация блока «Одна платформа собирает вашу компанию» (референс Вики,
// Desktop-27 → Desktop-28): папки разбросаны по краям под углами, при входе
// в блок сбегаются в ровную сетку 5×2 и показывают подписи.
// Иконку папки позже заменим на ассеты Вики — сейчас CSS-папка.
const FOLDERS = [
  // label · scattered {x,y,rot} — разлетевшееся состояние (px от центра)
  { label: "Данные",       sx: -560, sy: -190, sr: -26 },
  { label: "Клиенты",      sx: -180, sy: -260, sr: 14 },
  { label: "Заявки",       sx: 240,  sy: -250, sr: -12 },
  { label: "Процессы",     sx: 560,  sy: -170, sr: 24 },
  { label: "Агенты",       sx: 640,  sy: 40,   sr: -18 },
  { label: "База знаний",  sx: -640, sy: 60,   sr: 20 },
  { label: "Каналы",       sx: -420, sy: 240,  sr: -22 },
  { label: "Записи",       sx: -60,  sy: 290,  sr: 16 },
  { label: "Отчёты",       sx: 320,  sy: 260,  sr: -14 },
  { label: "Задачи",       sx: 580,  sy: 210,  sr: 22 },
];

const COLS = 5;
const STEP_X = 136; // шаг сетки по горизонтали
const STEP_Y = 128; // по вертикали
const GRID_Y = 46;  // сдвиг сетки вниз от центра (заголовок уезжает вверх)

export function PlatformGather() {
  const ref = useRef(null);
  const [set, setSet] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSet(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setSet(entry.isIntersecting),
      { threshold: 0.55 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`pg${set ? " is-set" : ""}`} ref={ref}>
      <h2 className="pg-title">Одна платформа собирает<br />вашу компанию</h2>
      <div className="pg-field" aria-hidden="true">
        {FOLDERS.map((f, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          const gx = (col - (COLS - 1) / 2) * STEP_X;
          const gy = GRID_Y + (row - 0.5) * STEP_Y;
          const style = {
            transitionDelay: `${i * 45}ms`,
            transform: set
              ? `translate(calc(-50% + ${gx}px), calc(-50% + ${gy}px)) rotate(0deg)`
              : `translate(calc(-50% + ${f.sx}px), calc(-50% + ${f.sy}px)) rotate(${f.sr}deg)`,
          };
          return (
            <div className="pg-item" key={f.label} style={style}>
              <span className="pg-folder"><i /></span>
              <span className="pg-label">{f.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
