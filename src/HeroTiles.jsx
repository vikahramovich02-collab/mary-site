// СНЯТО С ЭКРАНА 25.08.2026 по просьбе Вики («убери эти плашки»).
// Компонент оставлен целиком: чтобы вернуть поле, достаточно импортировать
// HeroTiles в CustomLanding.jsx и поставить <HeroTiles /> первым в .custom-hero.
//
// Изометрическое поле плиток первого экрана (макет 10450-20190).
// В макете это статичный 3D-рендер; здесь та же композиция собрана на CSS,
// поэтому она живая: плитки качаются волной, свет под ближними краями дышит,
// а над дальним рядом плывёт дымка.
//
// Решётка задаётся двумя числами:
//   x — сдвиг по горизонтали в половинах ширины плитки (соседи в ряду через 2),
//   d — глубина: чем больше, тем ближе к зрителю и ниже на экране.
// Чётность x всегда совпадает с чётностью d — иначе плитки не лягут в решётку.
//
// haze — насколько плитка утоплена в дымку (дальние ряды почти белёсые),
// lift — приподнята ли она над полем, logo — что лежит сверху.

// логотипы обрезаны по краю знака (в исходных масках вокруг были пустые поля),
// height — доля от половины ширины плитки, чтобы знак масштабировался с полем
const LOGOS = {
  mtbank: { src: "/media/hero-logo-mtbank.png", height: 0.15 },
  htp: { src: "/media/hero-logo-htp.png", height: 0.19 },
};

const TILES = [
  { x: 0, d: -2, haze: 0.8 },
  { x: 2, d: -2, haze: 0.88 },

  { x: -3, d: -1, haze: 0.3, lift: 26 },
  { x: -1, d: -1, haze: 0.3, logo: "mtbank" },
  { x: 1, d: -1, haze: 0.34, logo: "htp" },
  { x: 3, d: -1, haze: 0.52 },

  { x: -2, d: 0, haze: 0.12 },
  { x: 0, d: 0, haze: 0.1 },
  { x: 2, d: 0, haze: 0.16 },

  { x: -3, d: 1 },
  { x: -1, d: 1 },
  { x: 1, d: 1 },
  { x: 3, d: 1, haze: 0.2 },

  { x: -4, d: 2 },
  { x: -2, d: 2 },
  { x: 0, d: 2 },
  { x: 2, d: 2 },

  { x: -1, d: 3 },
  { x: 1, d: 3 },
];

// фаза волны: она бежит от дальнего ряда к ближнему и слегка наискось
const phaseOf = (tile) => `${-(tile.d * 0.62 + tile.x * 0.14)}s`;

const varsOf = (tile) => ({
  "--x": tile.x,
  "--d": tile.d,
  "--haze": tile.haze ?? 0,
  "--lift": tile.lift ?? 0,
  "--phase": phaseOf(tile),
});

export function HeroTiles({ className = "" }) {
  return (
    <div className={`custom-hero-tiles ${className}`} aria-hidden="true">
      <span className="custom-hero-mist" />

      <div className="ct-layer">
        {TILES.map((tile) => {
          const logo = tile.logo ? LOGOS[tile.logo] : null;

          return (
            <span className="ct" key={`${tile.x}:${tile.d}`} style={varsOf(tile)}>
              <span className="ct-side" />
              <span className="ct-face" />
              {logo && (
                <img
                  alt=""
                  className="ct-logo"
                  src={logo.src}
                  style={{ "--logo-height": logo.height }}
                />
              )}
            </span>
          );
        })}
      </div>

      {/* Свет отдельным слоем поверх плиток: в режиме screen он подсвечивает
          соседей так же, как в рендере, где сияние ложится на плитку впереди. */}
      <div className="ct-layer ct-layer-glow">
        {TILES.map((tile) => (
          <span className="ct" key={`glow:${tile.x}:${tile.d}`} style={varsOf(tile)}>
            <span className="ct-glow" />
          </span>
        ))}
      </div>
    </div>
  );
}
