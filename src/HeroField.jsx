import { useEffect, useRef } from "react";

// Точечный объект первого экрана.
// Раньше это был 3-секундный mp4 — на повторе была видна склейка. Здесь волны
// задаются бегущими плоскими волнами от времени, поэтому петля бесшовная и вечная.

// плотность точечной сетки: на телефонах режем втрое, чтобы не жечь батарею
const POINTS = typeof window !== "undefined" && window.innerWidth < 760 ? 30000 : 82000;
const DOT = 1.2; // размер точки в CSS-пикселях
const SQUIRCLE = 3.2; // 2 — шар, больше — ближе к скруглённому кубу
const LEVELS = 14; // ступени яркости: рисуем пачками, чтобы не дёргать fillStyle на каждую точку

// Три бегущие волны: разные направления, частоты и скорости — рисунок не повторяется на глаз
const WAVES = [
  { k: [2.6, 1.1, 0.6], speed: 0.34, amp: 0.075 },
  { k: [-0.9, 2.4, 1.7], speed: -0.23, amp: 0.055 },
  { k: [1.4, -0.7, 2.9], speed: 0.17, amp: 0.042 },
];

function buildGeometry() {
  const bx = new Float32Array(POINTS);
  const by = new Float32Array(POINTS);
  const bz = new Float32Array(POINTS);
  const nx = new Float32Array(POINTS);
  const ny = new Float32Array(POINTS);
  const nz = new Float32Array(POINTS);
  // синус/косинус фазы каждой волны в точке — считаем один раз, дальше только формула сложения
  const phase = WAVES.map(() => ({ s: new Float32Array(POINTS), c: new Float32Array(POINTS) }));

  const golden = Math.PI * (3 - Math.sqrt(5));
  const tiltX = -0.22; // лёгкий наклон, чтобы объект был виден чуть сверху

  for (let i = 0; i < POINTS; i += 1) {
    // равномерное распределение по сфере (спираль Фибоначчи) — точки ложатся ровной сеткой
    const y = 1 - (2 * i + 1) / POINTS;
    const r = Math.sqrt(Math.max(1 - y * y, 0));
    const theta = golden * i;
    let dx = Math.cos(theta) * r;
    let dy = y;
    let dz = Math.sin(theta) * r;

    // наклон вокруг X
    const ty = dy * Math.cos(tiltX) - dz * Math.sin(tiltX);
    const tz = dy * Math.sin(tiltX) + dz * Math.cos(tiltX);
    dy = ty;
    dz = tz;

    // радиус скруглённого куба в этом направлении — из шара получается абстрактный объект
    const shape =
      1 /
      Math.pow(
        Math.pow(Math.abs(dx), SQUIRCLE) +
          Math.pow(Math.abs(dy), SQUIRCLE) +
          Math.pow(Math.abs(dz), SQUIRCLE),
        1 / SQUIRCLE,
      );

    bx[i] = dx * shape;
    by[i] = dy * shape;
    bz[i] = dz * shape;
    nx[i] = dx;
    ny[i] = dy;
    nz[i] = dz;

    for (let w = 0; w < WAVES.length; w += 1) {
      const k = WAVES[w].k;
      const p = k[0] * bx[i] + k[1] * by[i] + k[2] * bz[i];
      phase[w].s[i] = Math.sin(p);
      phase[w].c[i] = Math.cos(p);
    }
  }

  return { bx, by, bz, nx, ny, nz, phase };
}

export function HeroField({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: false });
    const geo = buildGeometry();
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // буферы по ступеням яркости
    const bucketX = Array.from({ length: LEVELS }, () => new Float32Array(POINTS));
    const bucketY = Array.from({ length: LEVELS }, () => new Float32Array(POINTS));
    const bucketN = new Int32Array(LEVELS);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let start = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    const draw = (time) => {
      const t = still ? 6 : (time - start) / 1000;
      const spin = still ? 0.3 : t * 0.045; // очень медленный поворот

      const cx = width / 2;
      const cy = height * 0.56;
      // объект приплюснут: широкая «подушка», как в исходном ролике
      const radiusX = Math.min(width * 0.46, height * 0.78);
      const radiusY = radiusX * 0.58;
      const dot = DOT * dpr;

      // глобальные синусы времени — благодаря им в цикле по точкам нет ни одного вызова тригонометрии
      const wave = WAVES.map((w, i) => {
        const a = t * w.speed * Math.PI * 2;
        return { sin: Math.sin(a), cos: Math.cos(a), amp: w.amp, phase: geo.phase[i] };
      });
      const cosSpin = Math.cos(spin);
      const sinSpin = Math.sin(spin);

      bucketN.fill(0);

      for (let i = 0; i < POINTS; i += 1) {
        const rnz = -geo.nx[i] * sinSpin + geo.nz[i] * cosSpin;
        if (rnz <= 0.015) continue; // задняя половина не рисуется

        let d = 0;
        for (let w = 0; w < wave.length; w += 1) {
          const wv = wave[w];
          d += wv.amp * (wv.phase.s[i] * wv.cos + wv.phase.c[i] * wv.sin);
        }

        const px = geo.bx[i] + geo.nx[i] * d;
        const py = geo.by[i] + geo.ny[i] * d;
        const pz = geo.bz[i] + geo.nz[i] * d;

        const rx = px * cosSpin + pz * sinSpin;
        const rz = -px * sinSpin + pz * cosSpin;

        // лёгкая перспектива
        const persp = 3.4 / (3.4 - rz);
        const sx = (cx + rx * radiusX * persp) * dpr;
        const sy = (cy - py * radiusY * persp) * dpr;
        if (sx < -4 || sy < -4 || sx > canvas.width + 4 || sy > canvas.height + 4) continue;

        // к силуэту точки ярче, в центре — почти гаснут
        const edge = 1 - rnz;
        const level = Math.min(LEVELS - 1, (edge * Math.sqrt(edge) * LEVELS * 1.25) | 0);
        const n = bucketN[level];
        bucketX[level][n] = sx;
        bucketY[level][n] = sy;
        bucketN[level] = n + 1;
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let level = 0; level < LEVELS; level += 1) {
        const n = bucketN[level];
        if (!n) continue;
        const alpha = 0.42 + (level / (LEVELS - 1)) * 0.58;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        const xs = bucketX[level];
        const ys = bucketY[level];
        for (let i = 0; i < n; i += 1) ctx.fillRect(xs[i], ys[i], dot, dot);
      }
    };

    const loop = (time) => {
      if (!start) start = time;
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      if (still) draw(0);
    };

    resize();

    if (still) {
      draw(0);
    } else {
      frame = window.requestAnimationFrame(loop);
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas className={className} ref={ref} aria-hidden="true" />;
}
