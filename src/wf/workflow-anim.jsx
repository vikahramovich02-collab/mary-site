/* Workflow reveal animation — geometry & styling transcribed from the Figma frame "Workflow" (1:21). */
/* Файл — экспорт из Figma Make (Workflow Animation). Правки минимальные:
   движок плеера заменён на наш тонкий клок (engine.js), чтобы на сайте не было
   чёрной сцены, полосы воспроизведения и перехвата пробела. Геометрия, цвета и
   тайминги — как в макете. */
import React from "react"; // в файле есть прямые React.createElement
import "./wf-assets.js";
import { useComposition, Easing, clamp } from "./engine.js";

const F = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif';
const INK = 'rgb(38,38,51)';
const SUB = 'rgba(22,22,24,0.7)';
const LINE = 'rgb(38,38,51)';
const A = () => window.WF || {};

const TONE = {
  blue: {
    bg: 'linear-gradient(177.475deg, rgb(0,100,255) 2.79%, rgb(88,154,255) 28.57%, rgb(177,207,255) 93.69%)',
    glow: '0 6px 22px rgba(0,100,255,0.20)', chipDot: 'rgb(74,145,255)', label: 'Задача',
  },
  purple: {
    bg: 'linear-gradient(177.800deg, rgb(51,0,255) -11.07%, rgb(88,99,255) 16.71%, rgb(177,183,255) 93.98%)',
    glow: '0 6px 22px rgba(70,60,255,0.20)', chipDot: 'rgb(88,99,255)', label: 'Задача',
  },
  orange: {
    bg: 'linear-gradient(186.583deg, rgb(252,151,1) -17.68%, rgb(255,197,177) 92.48%), linear-gradient(177.480deg, rgb(252,160,36) -10.15%, rgb(255,202,88) 28.64%, rgb(255,220,177) 93.36%)',
    glow: '0 6px 22px rgba(252,151,1,0.22)', chipDot: 'rgb(252,160,36)', label: 'Сотрудник',
  },
};

/* ── three motion helpers, nothing else eases ─────────────────── */
const MOTION = {
  enter: (start, dur) => (T) => Easing.easeOutCubic(clamp((T - start) / (dur || 0.55), 0, 1)),
  pop: (start, dur) => (T) => Easing.easeOutBack(clamp((T - start) / (dur || 0.55), 0, 1)),
  draw: (start, dur) => (T) => Easing.easeInOutSine(clamp((T - start) / (dur || 0.45), 0, 1)),
};

/* ── nodes ────────────────────────────────────────────────────── */
const NODES = [
  { id: 'n1', k: 'trigger', x: 23, y: 460, w: 158, h: 115, at: 0.35, title: 'Пришло новое сообщение от клиента' },
  { id: 'n2', k: 'task', tone: 'blue', x: 211, y: 460, w: 158, h: 118, at: 1.5, title: 'Найти клиента \nи определить статус', agent: 'Агент-Поддержки', aw: 100 },
  { id: 'n3', k: 'q', x: 400, y: 476, w: 143, h: 95, at: 2.7, title: 'Запрос связан \nс записью?' },
  { id: 'n4', k: 'task', tone: 'purple', x: 391, y: 627, w: 158, h: 118, at: 3.9, title: 'Передать в другой\nпроцесс', agent: 'Mary', aw: 56 },
  { id: 'n6', k: 'task', tone: 'blue', x: 611, y: 460, w: 158, h: 118, at: 5.9, title: 'Найти клиента \nи определить статус', agent: 'Агент-Клиентов', aw: 91 },
  { id: 'n7', k: 'q', x: 823, y: 476, w: 143, h: 95, at: 6.9, title: 'Клиент найден?' },
  { id: 'n8', k: 'task', tone: 'blue', x: 1165, y: 341, w: 158, h: 118, at: 7.9, title: 'Уточнить услугу\nи пожелания', agent: 'Агент-Записи', aw: 88 },
  { id: 'n9', k: 'task', tone: 'blue', x: 1165, y: 578, w: 158, h: 118, at: 8.5, title: 'Собрать данные и\nдобавить клиента в базу', agent: 'Агент-Клиентов', aw: 91 },
  { id: 'n10', k: 'q', x: 1381, y: 357, w: 143, h: 95, at: 9.4, title: 'Клиент указал\nконкретное время?' },
  { id: 'n11', k: 'task', tone: 'blue', x: 1599, y: 259, w: 158, h: 118, at: 10.4, title: 'Проверить указанную\nдату и время', agent: 'Агент-Расписания', aw: 104 },
  { id: 'n12', k: 'task', tone: 'blue', x: 1599, y: 434, w: 158, h: 118, at: 11.1, title: 'Найти свободное время', agent: 'Агент-Расписания', aw: 104 },
  { id: 'n13', k: 'q', x: 1815, y: 357, w: 143, h: 95, at: 12.2, title: 'Есть подходящее\nвремя?' },
  { id: 'n14', k: 'task', tone: 'orange', x: 1808, y: 492, w: 158, h: 115, at: 13.9, title: 'Помочь подобрать другой\nвариант', agent: 'Виктория В.', aw: 75, avatar: true },
  { id: 'n15', k: 'task', tone: 'purple', x: 1895, y: 641, w: 158, h: 118, at: 14.9, title: 'Предложить время\nклиенту', agent: 'Mary', aw: 56 },
  { id: 'n16', k: 'q', x: 1717, y: 661, w: 143, h: 95, at: 16.0, title: 'Клиент подтвердил\nвремя?' },
  { id: 'n17', k: 'task', tone: 'blue', x: 1499, y: 641, w: 158, h: 118, at: 17.0, title: 'Уточнить изменения', agent: 'Агент-Записи', aw: 88 },
  { id: 'n18', k: 'task', tone: 'orange', x: 1435, y: 917, w: 158, h: 103, at: 18.2, title: 'Проверить запись', agent: 'Виктория В.', aw: 75, avatar: true },
  { id: 'n19', k: 'task', tone: 'blue', x: 1224, y: 917, w: 158, h: 118, at: 19.3, title: 'Создать запись в системе', agent: 'Агент-Записи', aw: 88 },
  { id: 'n20', k: 'q', x: 1025, y: 936, w: 143, h: 95, at: 20.4, title: 'Запись создана?' },
  { id: 'n21', k: 'task', tone: 'purple', x: 787, y: 916, w: 158, h: 118, at: 21.4, title: 'Отправить\nподтверждение клиенту', agent: 'Mary', aw: 56 },
  { id: 'n22', k: 'task', tone: 'orange', x: 1014, y: 1072, w: 158, h: 103, at: 22.4, title: 'Решить ошибку записи', agent: 'Виктория В.', aw: 75, avatar: true },
];

/* ── edges (frame coordinates) ────────────────────────────────── */
const EDGES = [
  { d: 'M181 517.5 L211 519', at: 1.05 },
  { d: 'M369 519 L400 523.5', at: 2.2 },
  { d: 'M471.5 571 L470 627', at: 3.4 },
  { d: 'M543 523.5 L611 519', at: 5.4 },
  { d: 'M769 519 L823 523.5', at: 6.4 },
  { d: 'M966 523.5 C1000 523.5 1006 406 1040 406 L1165 406', at: 7.4, dur: 0.55 },
  { d: 'M966 523.5 C1000 523.5 1006 629 1040 629 L1140 629 Q1152 629 1156 632 L1165 637', at: 8.0, dur: 0.55 },
  { d: 'M1245 578 L1245 464', at: 8.8, arrow: [1245, 459] },
  { d: 'M1323 406 L1381 404.5', at: 8.9 },
  { d: 'M1524 404.5 C1552 404.5 1558 318 1582 318 L1599 318', at: 9.9, dur: 0.5 },
  { d: 'M1524 404.5 C1552 404.5 1558 493 1582 493 L1599 493', at: 10.6, dur: 0.5 },
  { d: 'M1757 318 C1790 318 1796 404.5 1815 404.5', at: 11.7 },
  { d: 'M1757 493 C1790 493 1796 404.5 1815 404.5', at: 11.75 },
  { d: 'M1886.5 452 L1886.5 492', at: 13.4 },
  { d: 'M1958 404.5 L1978 404.5 Q1994 404.5 1994 420 L1994 641', at: 14.4, dur: 0.6 },
  { d: 'M1895 700 L1860 708', at: 15.5 },
  { d: 'M1717 708 L1657 700', at: 16.5 },
  { d: 'M1499 700 L1477 700 Q1467 700 1467 690 L1467 505 Q1467 495 1457 495 L1300 495 Q1290 495 1290 485 L1290 464', at: 17.4, dur: 0.9, arrow: [1290, 459] },
  { d: 'M1755 756 L1755 953 Q1755 963 1745 963 L1593 963', at: 17.7, dur: 0.6 },
  { d: 'M1382 976 L1435 968.5', at: 18.8 },
  { d: 'M1168 983.5 L1224 976', at: 19.9 },
  { d: 'M945 975 L1025 983.5', at: 20.9 },
  { d: 'M701 963 L787 975', at: 21.6 },
  { d: 'M1096.5 1031 L1093 1072', at: 21.9 },
  { d: 'M1172 1123.5 L1289 1123.5 Q1299 1123.5 1299 1113.5 L1299 1040', at: 22.9, dur: 0.6, arrow: [1299, 1035] },
];

const PILLS = [
  { x: 455, y: 590, w: 31, h: 17, t: 'Нет', at: 3.5 },
  { x: 564, y: 512, w: 27, h: 17, t: 'Да', at: 5.5 },
  { x: 1022, y: 397, w: 25, h: 19, t: 'Да', at: 7.6 },
  { x: 1054, y: 397, w: 102, h: 19, t: 'Постоянный клиент', at: 7.7, grey: true },
  { x: 1022, y: 620, w: 29, h: 19, t: 'Нет', at: 8.2 },
  { x: 1056, y: 620, w: 96, h: 19, t: 'Первичный клиент', at: 8.3, grey: true },
  { x: 1548, y: 308, w: 25, h: 19, t: 'Да', at: 10.1 },
  { x: 1548, y: 484, w: 29, h: 19, t: 'Нет', at: 10.8 },
  { x: 1872, y: 456, w: 29, h: 19, t: 'Нет', at: 13.6 },
  { x: 1980, y: 457, w: 25, h: 19, t: 'Да', at: 14.6 },
  { x: 1669, y: 690, w: 29, h: 19, t: 'Нет', at: 16.7 },
  { x: 1742, y: 820, w: 25, h: 19, t: 'Да', at: 17.9 },
  { x: 970, y: 954, w: 25, h: 19, t: 'Да', at: 21.1 },
  { x: 660, y: 954, w: 41, h: 18, t: 'Готово', at: 21.5, grey: true },
  { x: 1078, y: 1035, w: 29, h: 19, t: 'Нет', at: 22.1 },
];

/* ── camera: [authored t, centre x, centre y, scale] ──────────── */
const CAM = [
  [0.0, 102, 517, 2.70],
  [1.8, 215, 519, 2.35],
  [3.0, 430, 545, 1.90],
  [4.6, 465, 630, 1.62],
  [6.2, 690, 545, 1.40],
  [8.6, 990, 510, 1.16],
  [11.0, 1280, 450, 1.02],
  [13.0, 1600, 420, 0.96],
  [15.4, 1840, 540, 0.93],
  [17.4, 1730, 720, 0.90],
  [19.6, 1460, 860, 0.88],
  [22.6, 1120, 980, 0.90],
  [25.5, 1095, 686, 0.75],
  [27.0, 1095, 686, 0.78],
  [31.0, 1240, 990, 1.42],
];

function camAt(T) {
  if (T <= CAM[0][0]) return { cx: CAM[0][1], cy: CAM[0][2], s: CAM[0][3] };
  for (let i = 1; i < CAM.length; i++) {
    if (T <= CAM[i][0] || i === CAM.length - 1) {
      const a = CAM[i - 1], b = CAM[i];
      const p = Easing.easeInOutSine(clamp((T - a[0]) / (b[0] - a[0]), 0, 1));
      return { cx: a[1] + (b[1] - a[1]) * p, cy: a[2] + (b[2] - a[2]) * p, s: a[3] + (b[3] - a[3]) * p };
    }
  }
}

/* ── atoms ────────────────────────────────────────────────────── */
function Mask({ src, w, h, color, style }) {
  return React.createElement('div', {
    style: {
      width: w, height: h, backgroundColor: color, flexShrink: 0,
      WebkitMaskImage: `url("${src}")`, maskImage: `url("${src}")`,
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center', maskPosition: 'center',
      ...style,
    },
  });
}

const Diamond = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, display: 'block' }}>
    <g transform="translate(2 2)" fill={SUB}>
      <path d="M 9.782 4.474 L 5.527 0.218 C 5.387 0.078 5.198 0 5 0 C 4.803 0 4.614 0.078 4.474 0.218 L 0.218 4.474 C 0.078 4.614 0 4.803 0 5 C 0 5.197 0.078 5.387 0.218 5.526 L 4.474 9.783 C 4.614 9.922 4.803 10 5 10 C 5.197 10 5.387 9.922 5.526 9.783 L 9.783 5.526 C 9.922 5.387 10 5.197 10 5 C 10 4.803 9.922 4.614 9.783 4.474 M 5 9.299 L 0.702 5 L 5 0.702 L 9.299 5 L 5 9.299 Z" />
      <path transform="translate(2.141 2.141)" d="M 0 2.857 L 2.857 0 L 5.714 2.857 L 2.857 5.714 L 0 2.857 Z" />
    </g>
  </svg>
);

function Chip({ n, tone }) {
  return (
    <div style={{
      width: n.aw, height: 20, borderRadius: 50, backgroundColor: 'rgb(246,246,247)',
      display: 'flex', flexDirection: 'row', gap: 4, padding: '4px 6px 4px 4px',
      alignItems: 'center', boxSizing: 'border-box', flexShrink: 0,
    }}>
      {n.avatar ? (
        <div style={{ width: 12, height: 12, borderRadius: 18.75, overflow: 'hidden', flexShrink: 0, background: `url("${A().avatar}") center / cover no-repeat` }} />
      ) : (
        <div style={{ width: 12, height: 12, borderRadius: 40, backgroundColor: tone.chipDot, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mask src={A().magicChip} w={6} h={6} color="rgb(255,255,255)" />
        </div>
      )}
      <span style={{ fontFamily: F, fontWeight: 510, fontSize: 8, whiteSpace: 'nowrap', lineHeight: 1, color: SUB }}>{n.agent}</span>
    </div>
  );
}

function Header({ label, color, icon }) {
  return (
    <div style={{ height: 14, display: 'flex', flexDirection: 'row', padding: '0px 5px', justifyContent: 'space-between', alignItems: 'flex-start', boxSizing: 'border-box', flexShrink: 0, alignSelf: 'stretch' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', flexShrink: 0 }}>
        {icon}
        <span style={{ fontFamily: F, fontWeight: 510, fontSize: 8, whiteSpace: 'nowrap', lineHeight: 1, color }}>{label}</span>
      </div>
      <Mask src={A().ellipsis} w={12} h={4} color={color} style={{ alignSelf: 'center' }} />
    </div>
  );
}

const Title = ({ children, w }) => (
  <span style={{ fontFamily: F, fontWeight: 510, fontSize: 10, lineHeight: 1.2, color: INK, whiteSpace: 'pre-line', alignSelf: 'stretch', width: w }}>{children}</span>
);

function Card({ n, T, glow }) {
  const p = MOTION.enter(n.at)(T);
  const s = 0.9 + 0.1 * MOTION.pop(n.at)(T);
  const wrap = {
    position: 'absolute', left: n.x, top: n.y, width: n.w, height: n.h,
    opacity: p, transform: `translateY(${(1 - p) * 12}px) scale(${s})`, transformOrigin: '50% 60%',
  };

  if (n.k === 'note') {
    return (
      <div style={{ ...wrap, borderRadius: 10, backgroundColor: 'rgb(246,246,247)', display: 'flex', flexDirection: 'column', gap: 10, padding: 10, justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
        {n.lines.map((l, i) => (
          <span key={i} style={{ fontFamily: F, fontWeight: 510, fontSize: 10, whiteSpace: 'nowrap', lineHeight: 1.2, color: INK }}>{l}</span>
        ))}
      </div>
    );
  }

  if (n.k === 'q') {
    return (
      <div style={{ ...wrap, borderRadius: 16, backgroundColor: 'rgb(246,246,247)', boxShadow: glow ? '0 4px 16px rgba(38,38,51,0.07)' : 'none', display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 4px 4px 4px', boxSizing: 'border-box' }}>
        <Header label="Вопрос" color={SUB} icon={<Diamond />} />
        <div style={{ flexGrow: 1, borderRadius: 14, backgroundColor: 'rgb(255,255,255)', padding: '10px 8px 6px 8px', boxSizing: 'border-box', alignSelf: 'stretch' }}>
          <Title>{n.title}</Title>
        </div>
      </div>
    );
  }

  if (n.k === 'trigger') {
    return (
      <div style={{ ...wrap, borderRadius: 16, backgroundColor: INK, boxShadow: glow ? '0 6px 22px rgba(38,38,51,0.20)' : 'none', display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 4px 4px 4px', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', left: 57, top: -10, width: 44, height: 19, borderRadius: 50, backgroundColor: INK, boxShadow: 'inset 0 0 0 1.5px rgb(255,255,255)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: F, fontWeight: 510, fontSize: 8, whiteSpace: 'nowrap', lineHeight: 1, color: 'rgb(255,255,255)' }}>Старт</span>
        </div>
        <Header label="Триггер" color="rgb(255,255,255)" icon={
          <div style={{ width: 14, height: 14, position: 'relative', flexShrink: 0 }}>
            <Mask src={A().trigB} w={10.5} h={10.5} color="rgb(255,255,255)" style={{ position: 'absolute', left: 1.75, top: 1.75 }} />
            <Mask src={A().trigA} w={4.667} h={4.667} color="rgb(255,255,255)" style={{ position: 'absolute', left: 4.664, top: 4.668 }} />
          </div>
        } />
        <div style={{ flexGrow: 1, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.98)', display: 'flex', flexDirection: 'column', gap: 12, padding: '10px 8px 6px 8px', boxSizing: 'border-box', alignSelf: 'stretch' }}>
          <Title>{n.title}</Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: F, fontWeight: 510, fontSize: 8, lineHeight: 1, color: 'rgba(22,22,24,0.28)' }}>2 канала</span>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
              {[['instagram', 'Instagram', 61], ['telegram', 'Telegram', 58]].map(([k, label, w]) => (
                <div key={k} style={{ width: w, height: 18, borderRadius: 50, backgroundColor: 'rgb(246,246,247)', display: 'flex', flexDirection: 'row', gap: 2, padding: '4px 6px 4px 4px', alignItems: 'center', boxSizing: 'border-box' }}>
                  <div style={{ width: 10, height: 10, flexShrink: 0, background: `url("${A()[k]}") center / cover no-repeat` }} />
                  <span style={{ fontFamily: F, fontWeight: 510, fontSize: 8, whiteSpace: 'nowrap', lineHeight: 1, color: SUB }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tone = TONE[n.tone];
  return (
    <div style={{ ...wrap, borderRadius: 16, background: tone.bg, boxShadow: glow ? tone.glow : 'none', display: 'flex', flexDirection: 'column', gap: 5, padding: '8px 4px 4px 4px', boxSizing: 'border-box' }}>
      <Header label={tone.label} color="rgb(255,255,255)" icon={<Mask src={A().magic} w={9.333} h={9.333} color="rgb(255,255,255)" style={{ margin: '0 2.3px' }} />} />
      <div style={{ flexGrow: 1, borderRadius: 14, backgroundColor: n.tone === 'orange' ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.97)', display: 'flex', flexDirection: 'column', padding: '10px 8px 6px 8px', justifyContent: 'space-between', boxSizing: 'border-box', alignSelf: 'stretch' }}>
        <Title>{n.title}</Title>
        <Chip n={n} tone={tone} />
      </div>
    </div>
  );
}

function Pill({ p, T }) {
  const a = MOTION.enter(p.at, 0.4)(T);
  return (
    <div style={{
      position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, borderRadius: 50,
      backgroundColor: p.grey ? 'rgb(242,242,242)' : INK,
      display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
      opacity: a, transform: `scale(${0.75 + 0.25 * a})`,
    }}>
      <span style={{ fontFamily: F, fontWeight: 510, fontSize: 8, whiteSpace: 'nowrap', lineHeight: 1.08, letterSpacing: '-0.02em', color: p.grey ? INK : 'rgb(255,255,255)' }}>{p.t}</span>
    </div>
  );
}

/* ── edges ────────────────────────────────────────────────────── */
function endPoints(d) {
  const nums = d.match(/-?\d+(\.\d+)?/g).map(Number);
  const start = [nums[0], nums[1]];
  const end = [nums[nums.length - 2], nums[nums.length - 1]];
  return { start, end };
}
const EDGE_PTS = EDGES.map((e) => endPoints(e.d));

function Edges({ T }) {
  return (
    <svg width="2191" height="1373" viewBox="0 0 2191 1373" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      {EDGES.map((e, i) => {
        const p = MOTION.draw(e.at, e.dur || 0.45)(T);
        if (p <= 0) return null;
        const pts = EDGE_PTS[i];
        return (
          <g key={i}>
            <path d={e.d} fill="none" stroke={LINE} strokeWidth="1" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} />
            {!e.arrow && (
              <circle cx={pts.start[0]} cy={pts.start[1]} r="1.5" fill="rgb(50,53,56)" stroke="rgb(255,255,255)" strokeWidth="1" opacity={p > 0.02 ? 1 : 0} />
            )}
            {!e.arrow && (
              <circle cx={pts.end[0]} cy={pts.end[1]} r="1.5" fill="rgb(50,53,56)" stroke="rgb(255,255,255)" strokeWidth="1" opacity={p > 0.96 ? 1 : 0} />
            )}
            {e.arrow && (
              <path d={`M${e.arrow[0] - 3.2} ${e.arrow[1] + 5} L${e.arrow[0]} ${e.arrow[1]} L${e.arrow[0] + 3.2} ${e.arrow[1] + 5}`} fill="none" stroke={LINE} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity={clamp((p - 0.9) / 0.1, 0, 1)} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── the piece ────────────────────────────────────────────────── */
const TRIM = 3.7; /* первые 3.7с обрезаны */
const SPEED = 6.2; /* authored 31s compressed to 5s playback */
function Piece({ opts }) {
  const o = opts || {};
  /* cardGlow выключен по просьбе Вики — без цветной подсветки под карточками */
  const grid = o.dotGrid !== false, labels = o.branchLabels !== false, glow = o.cardGlow === true;
  const comp = useComposition();
  /* Правка при переносе на сайт: время хореографии приходит из нашего клока
     как есть (в экспорте оно пересчитывалось из секунд плеера через SPEED —
     из-за этого обрезка TRIM уезжала в конец таймлайна). */
  const T = comp.T, authoredTotal = comp.authoredTotal;
  const { cx, cy, s } = camAt(T);
  const veil = Math.max(
    1 - Easing.easeOutCubic(clamp((T - TRIM) / 1.2, 0, 1)),
    Easing.easeInOutSine(clamp((T - (authoredTotal - 0.55)) / 0.55, 0, 1))
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: 'rgb(254,254,254)' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 2191, height: 1373,
        transformOrigin: '0 0',
        transform: `translate(${960 - cx * s}px, ${540 - cy * s}px) scale(${s})`,
      }}>
        <div style={{
          position: 'absolute', left: -1400, top: -1200, width: 5000, height: 3800,
          backgroundColor: 'rgb(254,254,254)',
          backgroundImage: grid ? 'radial-gradient(circle at 1.2px 1.2px, rgb(236,236,236) 1.2px, transparent 1.3px)' : 'none',
          backgroundSize: '23.6px 23.6px',
        }} />
        <Edges T={T} />
        {labels && PILLS.map((p, i) => <Pill key={i} p={p} T={T} />)}
        {NODES.map((n) => <Card key={n.id} n={n} T={T} glow={glow} />)}
      </div>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgb(255,255,255)', opacity: veil, pointerEvents: 'none' }} />
    </div>
  );
}

export { Piece, TRIM, SPEED };
export { CompositionContext } from "./engine.js";

