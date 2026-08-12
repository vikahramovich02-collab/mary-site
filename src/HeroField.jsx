import { useEffect, useRef } from "react";

// Точечная анимация первого экрана.
// Раньше это был 3-секундный mp4 — на повторе была видна склейка. Здесь всё рисуется
// живьём, а волны заданы формулой от времени, поэтому петли нет и шва не бывает.
//
// Режим по умолчанию; каждый лендинг может задать свой через проп mode:
//   "halftone" — ровная сетка, размер точки задаёт волну (как в референсах Вики)
//   "waves"    — поле точек, уходящее в перспективу
//   "object"   — приплюснутая точечная «подушка»
//   "petals"   — халфтон-вертушка из четырёх лепестков
const DEFAULT_MODE = "object";

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

/* ── режим «халфтон»: ровная сетка, волну рисует размер точки ──────────── */

const CELL = 15; // шаг сетки в CSS-пикселях
const DOT_MAX = 0.46; // максимальный радиус в долях шага
const HALFTONE = [
  // k — направление и частота волны в долях ширины экрана, speed — скорость бега
  { k: [3.1, 1.15], speed: 0.13, amp: 0.62 },
  { k: [-1.7, 2.35], speed: -0.09, amp: 0.44 },
  { k: [4.6, -2.9], speed: 0.06, amp: 0.24 },
];

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

// Точки лежат ровной сеткой: ряды по широте, в каждом ряду число точек
// пропорционально его длине — поэтому шаг везде одинаковый, без сгущения у полюса.
const OBJ_ROWS = DESKTOP ? 190 : 110;
const OBJ_COLS = DESKTOP ? 330 : 190;
const OBJ_DOT = 2.05; // максимальный радиус точки в CSS-пикселях
const SQUIRCLE = 3.2; // 2 — шар, больше — ближе к скруглённому кубу

// Волны двух видов. Плоская едет через объект насквозь и на глаз читается как
// плоский градиент, поэтому основную работу делают КРУГОВЫЕ: они расходятся
// кольцами от точки на самой поверхности, и форма начинает читаться объёмной.
const WAVES_OBJECT = [
  { from: [0.86, 0.34, 0.38], freq: 6.4, speed: 0.26, amp: 0.1 },
  { from: [-0.62, -0.46, 0.64], freq: 4.6, speed: -0.17, amp: 0.075 },
  { from: [0.1, 0.95, -0.3], freq: 8.2, speed: 0.11, amp: 0.045 },
  { k: [1.6, -2.2, 1.1], speed: 0.09, amp: 0.03 },
];

const OBJ_SPIN = 0.085; // скорость поворота, рад/с

const WAVE_SPAN = WAVES_OBJECT.reduce((sum, w) => sum + w.amp, 0);

function buildObject() {
  const dirs = [];
  const tiltX = -0.22; // лёгкий наклон, чтобы объект был виден чуть сверху

  for (let row = 0; row < OBJ_ROWS; row += 1) {
    const v = (-Math.PI / 2) + (Math.PI * (row + 0.5)) / OBJ_ROWS;
    const ring = Math.cos(v);
    const cols = Math.max(8, Math.round(OBJ_COLS * ring));
    for (let col = 0; col < cols; col += 1) {
      const u = (Math.PI * 2 * col) / cols;
      dirs.push([Math.cos(u) * ring, Math.sin(v), Math.sin(u) * ring]);
    }
  }

  const count = dirs.length;
  const bx = new Float32Array(count);
  const by = new Float32Array(count);
  const bz = new Float32Array(count);
  const nx = new Float32Array(count);
  const ny = new Float32Array(count);
  const nz = new Float32Array(count);
  const phase = WAVES_OBJECT.map(() => ({ s: new Float32Array(count), c: new Float32Array(count) }));

  for (let i = 0; i < count; i += 1) {
    let [dx, dy, dz] = dirs[i];

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

    for (let w = 0; w < WAVES_OBJECT.length; w += 1) {
      const wave = WAVES_OBJECT[w];
      let p;
      if (wave.from) {
        // расстояние по поверхности до источника — из него получаются расходящиеся кольца
        const ax = bx[i] - wave.from[0];
        const ay = by[i] - wave.from[1];
        const az = bz[i] - wave.from[2];
        p = Math.sqrt(ax * ax + ay * ay + az * az) * wave.freq;
      } else {
        p = wave.k[0] * bx[i] + wave.k[1] * by[i] + wave.k[2] * bz[i];
      }
      phase[w].s[i] = Math.sin(p);
      phase[w].c[i] = Math.cos(p);
    }
  }

  return { count, bx, by, bz, nx, ny, nz, phase };
}

/* ── компонент ─────────────────────────────────────────────────────────── */

// tone: "dark" — белые точки на чёрном (мир Mary Custom),
//       "light" — чернильные точки на белом (мир платформы Mary)
// speed — множитель скорости волн, spread — форма маски халфтона:
// "band" (полоса снизу), "dome" (купол) или "full" (на всю площадь)
export function HeroField({ className = "", tone = "dark", mode = DEFAULT_MODE, speed = 1, spread, dotScale = 1, dotAlpha, inkColor }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const light = tone === "light";
    const ctx = canvas.getContext("2d", { alpha: false });
    const paper = light ? "#fff" : "#000";
    const ink = inkColor || (light ? "38,38,51" : "255,255,255");
    // на светлом точки должны только подсвечивать фон, иначе забивают текст
    const alphaFloor = light ? 0.05 : 0.5;
    const alphaSpan = light ? 0.09 : 0.5;
    // халфтону предсобранная геометрия не нужна — сетка считается прямо в кадре
    const geo = mode === "halftone" || mode === "petals" ? { count: 0 } : mode === "waves" ? buildField() : buildObject();
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

    // Халфтон рисуется отдельно от остальных режимов: одна заливка на весь кадр,
    // все точки собираются в один путь — поэтому сетка может быть сколь угодно частой.
    // Вертушка: четыре лепестка, закрученных по спирали. Размер точки задаёт
    // плотность лепестка — к краю он растворяется, в центре дырка.
    const paintPetals = (t) => {
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cell = CELL * dpr;
      const cols = Math.ceil(width / CELL) + 1;
      const rows = Math.ceil(height / CELL) + 1;
      const maxR = cell * DOT_MAX * dotScale;

      const cx = (width * dpr) / 2;
      const cy = (height * dpr) / 2;
      const span = Math.min(width, height) * dpr * 0.62;
      const spin = t * 0.06 * speed;

      ctx.fillStyle = `rgba(${ink},${dotAlpha ?? 0.85})`;
      ctx.beginPath();

      for (let row = 0; row < rows; row += 1) {
        const y = row * cell;
        for (let col = 0; col < cols; col += 1) {
          const x = col * cell;
          const dx = x - cx;
          const dy = y - cy;
          const rr = Math.sqrt(dx * dx + dy * dy) / span;
          if (rr > 1.05) continue;

          // четыре лопасти + закрутка: чем дальше от центра, тем сильнее сдвиг
          const blade = 0.5 + 0.5 * Math.cos(4 * (Math.atan2(dy, dx) + spin) + 3.1 * rr);
          // дырка в середине и мягкий край снаружи
          const hole = Math.min(Math.max((rr - 0.16) / 0.18, 0), 1);
          const edge = 1 - Math.min(Math.max((rr - 0.68) / 0.34, 0), 1);
          // высокая степень делает лепестки узкими, между ними остаётся чистое поле
          const density = Math.pow(blade, 4.2) * hole * edge * (1.35 - rr) * 1.5;
          const r = maxR * Math.min(density, 1);
          if (r < 0.28) continue;

          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
      }

      ctx.fill();
    };

    const paintHalftone = (t) => {
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cell = CELL * dpr;
      const cols = Math.ceil(width / CELL) + 1;
      const rows = Math.ceil(height / CELL) + 1;
      // по белому крупная тёмная точка читается тяжелее, чем белая по чёрному
      const maxR = cell * DOT_MAX * (light ? 0.8 : 1) * dotScale;
      const scale = 1 / (width * dpr);

      const wt = HALFTONE.map((w) => t * w.speed * speed * Math.PI * 2);

      // халфтон рисуется одной заливкой; сила задаётся снаружи через dotAlpha
      ctx.fillStyle = `rgba(${ink},${dotAlpha ?? (light ? 0.26 : 0.88)})`;
      ctx.beginPath();

      // В светлом мире точки собраны в огромный купол, поднимающийся снизу, —
      // так это нарисовано в макете главной. В тёмном остаётся полоса снизу вверх.
      const shapeMode = spread || (light ? "dome" : "band");
      const domeX = width * dpr * 0.536;
      const domeY = height * dpr * 0.92;
      const domeRX = width * dpr * 0.738;
      const domeRY = height * dpr * 0.58;

      for (let row = 0; row < rows; row += 1) {
        const y = row * cell;
        const band = Math.min(Math.max((y / (height * dpr) - 0.3) / 0.5, 0), 1);
        const strength = band * band * (3 - 2 * band);
        if (shapeMode === "band" && strength <= 0.01) continue;

        for (let col = 0; col < cols; col += 1) {
          const x = col * cell;

          let shape = shapeMode === "full" ? 1 : strength;
          if (shapeMode === "dome") {
            const dx = (x - domeX) / domeRX;
            const dy = (y - domeY) / domeRY;
            // эллипс, а не круг: в макете купол заметно шире, чем выше
            const edge = 1 - Math.sqrt(dx * dx + dy * dy);
            shape = Math.min(Math.max(edge * 14, 0), 1);
            if (shape <= 0.01) continue;
          }

          let v = 0;
          for (let w = 0; w < HALFTONE.length; w += 1) {
            const k = HALFTONE[w].k;
            v += HALFTONE[w].amp * Math.sin((k[0] * x + k[1] * y) * scale * Math.PI * 2 - wt[w]);
          }

          // из суммы волн получаем заполнение 0…1 и загоняем его в размер точки
          // на светлом купол должен быть заполнен целиком, волна лишь играет размером
          // размах волны по размеру точки: на светлом он был почти нулевой,
          // из-за этого купол выглядел неподвижным
          const fill = light
            ? Math.min(Math.max(v * 0.16 + 0.74, 0), 1)
            : Math.min(Math.max(v * 0.46 + 0.34, 0), 1);
          const r = maxR * Math.pow(fill, light ? 1.8 : 2.2) * shape;
          if (r < 0.28) continue;

          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
      }

      ctx.fill();
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
      const spin = t * OBJ_SPIN;
      const cosSpin = Math.cos(spin);
      const sinSpin = Math.sin(spin);

      const cx = width / 2;
      const cy = height * 0.56;
      const radiusX = Math.min(width * 0.46, height * 0.78);
      const radiusY = radiusX * 0.58;
      const maxDot = OBJ_DOT * dpr;

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

        // ХАЛФТОН: волну рисует не яркость, а размер точки — на гребне крупная, во впадине почти нет
        const fill = Math.min(Math.max(d / (WAVE_SPAN * 1.7) + 0.5, 0), 1);
        // ближние точки крупнее — это и даёт ощущение объёма, а не плоской ряби
        const size = maxDot * Math.pow(fill, 1.9) * (0.72 + rnz * 0.5);
        if (size < 0.3) continue;

        const edge = 1 - rnz;
        const level = Math.min(LEVELS - 1, (edge * Math.sqrt(edge) * LEVELS * 1.25) | 0);
        const n = bucketN[level];
        bucketX[level][n] = sx;
        bucketY[level][n] = sy;
        bucketS[level][n] = size;
        bucketN[level] = n + 1;
      }
    };

    const paint = (time) => {
      const t = still ? 6 : (time - start) / 1000;

      if (mode === "petals") {
        paintPetals(t);
        return;
      }

      if (mode === "halftone") {
        paintHalftone(t);
        return;
      }

      if (mode === "waves") drawField(t);
      else drawObject(t);

      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let level = 0; level < LEVELS; level += 1) {
        const n = bucketN[level];
        if (!n) continue;
        // в халфтоне разницу держит размер точки, поэтому яркость гуляет слабо
        const alpha = alphaFloor + (level / (LEVELS - 1)) * alphaSpan;
        ctx.fillStyle = `rgba(${ink},${alpha.toFixed(3)})`;
        const xs = bucketX[level];
        const ys = bucketY[level];
        const ss = bucketS[level];
        // круглые точки: весь уровень яркости — один путь и одна заливка
        ctx.beginPath();
        for (let i = 0; i < n; i += 1) {
          ctx.moveTo(xs[i] + ss[i], ys[i]);
          ctx.arc(xs[i], ys[i], ss[i], 0, Math.PI * 2);
        }
        ctx.fill();
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
  }, [tone, mode, speed, spread, dotScale, dotAlpha, inkColor]);

  return <canvas className={className} ref={ref} aria-hidden="true" />;
}
