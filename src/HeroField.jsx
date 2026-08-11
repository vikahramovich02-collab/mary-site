import { useEffect, useRef } from "react";

// Точечная анимация первого экрана.
// Раньше это был 3-секундный mp4 — на повторе была видна склейка. Здесь всё рисуется
// живьём, а волны заданы формулой от времени, поэтому петли нет и шва не бывает.
//
// MODE — что показываем: "waves" (уходящее в перспективу поле) или "object" (приплюснутая «подушка»).
const MODE = "waves";

const DESKTOP = typeof window === "undefined" || window.innerWidth >= 760;
const LEVELS = 16; // ступени яркости: рисуем пачками, чтобы не дёргать fillStyle на каждую точку

/* ── общее ─────────────────────────────────────────────────────────────── */

// Волна = набор бегущих плоских волн. Фаза в точке считается один раз при сборке,
// а в кадре остаётся только формула сложения — тригонометрии в цикле по точкам нет.
function waveOffset(waves, phases, i, wt) {
  let d = 0;
  for (let w = 0; w < waves.length; w += 1) {
    d += waves[w].amp * (phases[w].s[i] * wt[w].cos + phases[w].c[i] * wt[w].sin);
  }
  return d;
}

function timePhases(waves, t) {
  return waves.map((w) => {
    const a = t * w.speed * Math.PI * 2;
    return { sin: Math.sin(a), cos: Math.cos(a) };
  });
}

/* ── режим «волны»: поле точек, уходящее к горизонту ───────────────────── */

const COLUMNS = DESKTOP ? 300 : 150;
const ROWS = DESKTOP ? 175 : 100;
const NEAR = 0.32; // ближний край поля — уходит за нижнюю кромку экрана
const FAR = 9; // дальний край — там точки сливаются в светящуюся линию горизонта
const SPREAD = 1.15; // ширина поля в долях экрана
const CAM_Y = 0.42; // высота камеры над плоскостью

const WAVES_FIELD = [
  { k: [4.2, 1.5], speed: 0.16, amp: 0.085 },
  { k: [-2.6, 3.3], speed: -0.11, amp: 0.05 },
  { k: [1.5, 6.2], speed: 0.07, amp: 0.022 },
];

function buildField() {
  const count = COLUMNS * ROWS;
  const u = new Float32Array(count); // положение по горизонтали, −1…1 (на экране не зависит от глубины)
  const invZ = new Float32Array(count); // 1/z — им же задаётся и масштаб, и размер точки
  const depth = new Float32Array(count); // 0 у зрителя, 1 у горизонта
  const phase = WAVES_FIELD.map(() => ({ s: new Float32Array(count), c: new Float32Array(count) }));

  const izNear = 1 / NEAR;
  const izFar = 1 / FAR;

  let i = 0;
  for (let row = 0; row < ROWS; row += 1) {
    // шаг задаём по 1/z: тогда ряды ложатся на экран строго равномерно
    const iz = izNear + (izFar - izNear) * (row / (ROWS - 1));
    const z = 1 / iz;
    const d = row / (ROWS - 1);
    for (let col = 0; col < COLUMNS; col += 1) {
      const uu = (col / (COLUMNS - 1)) * 2 - 1;
      u[i] = uu;
      invZ[i] = iz;
      depth[i] = d;

      // мировая координата точки: чем дальше ряд, тем он шире — отсюда перспектива волн
      const x = uu * z * SPREAD;
      for (let w = 0; w < WAVES_FIELD.length; w += 1) {
        const k = WAVES_FIELD[w].k;
        const p = k[0] * x + k[1] * z;
        phase[w].s[i] = Math.sin(p);
        phase[w].c[i] = Math.cos(p);
      }
      i += 1;
    }
  }

  return { count, u, invZ, depth, phase };
}

/* ── режим «объект»: приплюснутая точечная «подушка» ───────────────────── */

const POINTS = DESKTOP ? 82000 : 30000;
const SQUIRCLE = 3.2; // 2 — шар, больше — ближе к скруглённому кубу

const WAVES_OBJECT = [
  { k: [2.6, 1.1, 0.6], speed: 0.34, amp: 0.075 },
  { k: [-0.9, 2.4, 1.7], speed: -0.23, amp: 0.055 },
  { k: [1.4, -0.7, 2.9], speed: 0.17, amp: 0.042 },
];

function buildObject() {
  const bx = new Float32Array(POINTS);
  const by = new Float32Array(POINTS);
  const bz = new Float32Array(POINTS);
  const nx = new Float32Array(POINTS);
  const ny = new Float32Array(POINTS);
  const nz = new Float32Array(POINTS);
  const phase = WAVES_OBJECT.map(() => ({ s: new Float32Array(POINTS), c: new Float32Array(POINTS) }));

  const golden = Math.PI * (3 - Math.sqrt(5));
  const tiltX = -0.22;

  for (let i = 0; i < POINTS; i += 1) {
    // равномерное распределение по сфере (спираль Фибоначчи)
    const y = 1 - (2 * i + 1) / POINTS;
    const r = Math.sqrt(Math.max(1 - y * y, 0));
    const theta = golden * i;
    let dx = Math.cos(theta) * r;
    let dy = y;
    let dz = Math.sin(theta) * r;

    const ty = dy * Math.cos(tiltX) - dz * Math.sin(tiltX);
    const tz = dy * Math.sin(tiltX) + dz * Math.cos(tiltX);
    dy = ty;
    dz = tz;

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

    for (let w = 0; w < WAVES_OBJECT.length; w += 1) {
      const k = WAVES_OBJECT[w].k;
      const p = k[0] * bx[i] + k[1] * by[i] + k[2] * bz[i];
      phase[w].s[i] = Math.sin(p);
      phase[w].c[i] = Math.cos(p);
    }
  }

  return { count: POINTS, bx, by, bz, nx, ny, nz, phase };
}

/* ── компонент ─────────────────────────────────────────────────────────── */

export function HeroField({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d", { alpha: false });
    const geo = MODE === "waves" ? buildField() : buildObject();
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bucketX = Array.from({ length: LEVELS }, () => new Float32Array(geo.count));
    const bucketY = Array.from({ length: LEVELS }, () => new Float32Array(geo.count));
    const bucketS = Array.from({ length: LEVELS }, () => new Float32Array(geo.count));
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

    const drawField = (t) => {
      const wt = timePhases(WAVES_FIELD, t);
      const cx = (width / 2) * dpr;
      const horizon = height * 0.44 * dpr;
      const focal = width * 0.5 * SPREAD * dpr;
      const lift = height * 0.62 * dpr; // на сколько экранных пикселей поле опускается под горизонт

      bucketN.fill(0);

      for (let i = 0; i < geo.count; i += 1) {
        const y = waveOffset(WAVES_FIELD, geo.phase, i, wt);
        const iz = geo.invZ[i];

        const sx = cx + geo.u[i] * focal;
        const sy = horizon + (CAM_Y - y) * lift * iz;
        if (sy > canvas.height + 4) continue;

        // дальние точки тусклее, гребни волн — ярче
        const near = 1 - geo.depth[i];
        const fade = Math.pow(near, 0.55);
        const crest = 0.5 + y * 5;
        // самые дальние ряды растворяются в чёрном, чтобы у поля не было ровной кромки
        const dissolve = Math.min(near * 3.6, 1);
        const shade = Math.min(Math.max((fade * 0.68 + crest * 0.42) * dissolve, 0), 1);
        const level = Math.min(LEVELS - 1, (shade * LEVELS) | 0);

        const n = bucketN[level];
        bucketX[level][n] = sx;
        bucketY[level][n] = sy;
        bucketS[level][n] = Math.min(Math.max(0.85 * iz * dpr, 0.75 * dpr), 2.6 * dpr);
        bucketN[level] = n + 1;
      }
    };

    const drawObject = (t) => {
      const wt = timePhases(WAVES_OBJECT, t);
      const spin = t * 0.045;
      const cosSpin = Math.cos(spin);
      const sinSpin = Math.sin(spin);

      const cx = width / 2;
      const cy = height * 0.56;
      const radiusX = Math.min(width * 0.46, height * 0.78);
      const radiusY = radiusX * 0.58;
      const dot = 1.2 * dpr;

      bucketN.fill(0);

      for (let i = 0; i < geo.count; i += 1) {
        const rnz = -geo.nx[i] * sinSpin + geo.nz[i] * cosSpin;
        if (rnz <= 0.015) continue; // задняя половина не рисуется

        const d = waveOffset(WAVES_OBJECT, geo.phase, i, wt);
        const px = geo.bx[i] + geo.nx[i] * d;
        const py = geo.by[i] + geo.ny[i] * d;
        const pz = geo.bz[i] + geo.nz[i] * d;

        const rx = px * cosSpin + pz * sinSpin;
        const rz = -px * sinSpin + pz * cosSpin;

        const persp = 3.4 / (3.4 - rz);
        const sx = (cx + rx * radiusX * persp) * dpr;
        const sy = (cy - py * radiusY * persp) * dpr;
        if (sx < -4 || sy < -4 || sx > canvas.width + 4 || sy > canvas.height + 4) continue;

        const edge = 1 - rnz;
        const level = Math.min(LEVELS - 1, (edge * Math.sqrt(edge) * LEVELS * 1.25) | 0);
        const n = bucketN[level];
        bucketX[level][n] = sx;
        bucketY[level][n] = sy;
        bucketS[level][n] = dot;
        bucketN[level] = n + 1;
      }
    };

    const paint = (time) => {
      const t = still ? 6 : (time - start) / 1000;

      if (MODE === "waves") drawField(t);
      else drawObject(t);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let level = 0; level < LEVELS; level += 1) {
        const n = bucketN[level];
        if (!n) continue;
        const alpha = 0.22 + (level / (LEVELS - 1)) * 0.78;
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        const xs = bucketX[level];
        const ys = bucketY[level];
        const ss = bucketS[level];
        for (let i = 0; i < n; i += 1) ctx.fillRect(xs[i], ys[i], ss[i], ss[i]);
      }
    };

    const loop = (time) => {
      if (!start) start = time;
      paint(time);
      frame = window.requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      if (still) paint(0);
    };

    resize();

    if (still) {
      paint(0);
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
