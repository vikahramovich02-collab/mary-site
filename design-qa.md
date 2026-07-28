# Design QA: Mary Custom hero

## Evidence

- Source visual truth: Figma node `9507:14151` in file
  `o1syNp93H3v2dyA3JHp4em`.
- Source capture: `qa-source-figma.png`.
- Desktop implementation: `qa-implementation-desktop.png`.
- Mobile implementation: `qa-implementation-mobile.png`.
- Mobile menu state: `qa-implementation-mobile-menu.png`.
- Combined comparison: `qa-comparison-desktop.jpg`.
- Desktop viewport: `1440 × 1024` CSS px, DPR 1.
- Source pixels: `1440 × 1024`.
- Desktop implementation pixels: `1440 × 1024`.
- Mobile viewport and implementation pixels: `390 × 844`, DPR 1.
- State: hero loaded, background video playing, navigation closed.

## Full-view comparison

The implementation preserves the source composition: logo at the upper left,
centered oval navigation, language and primary action at the upper right, a
large two-line centered statement, two oval actions, and a quiet bottom layer.

Intentional product changes:

- the supplied video replaces the solid black background;
- approved Mary Custom positioning replaces the old automation-only copy;
- unsupported client logos and the personal contact card are not reproduced.

These changes do not alter the source hierarchy or interaction model.

## Focused review

- Typography: Manrope, semibold display weight, tight tracking, two-line
  hierarchy and muted second line match the source direction.
- Spacing: header, central content and footer use the same three-layer
  composition as the source. The mobile layout remains within the viewport.
- Colors: white and translucent neutral controls remain legible over the
  monochrome video. A localized dark overlay protects text contrast.
- Image quality: the supplied source video is encoded to a web-ready
  `1920 × 1070` H.264 asset with a matching poster.
- Copy: the hero uses the approved statement
  `Разрабатываем продукты. Автоматизируем бизнес.`

No additional crop comparison was required because the hero is one continuous
full-screen composition and all controls are readable in the full-size
captures.

## Interaction checks

- Background video autoplays muted, loops and uses `playsInline`.
- A poster is available before playback.
- Reduced-motion mode hides playback and falls back to the dark hero surface.
- Secondary hero CTA scrolls to `#services`.
- Mobile menu opens and closes.
- No horizontal overflow at `1440 × 1024` or `390 × 844`.
- Browser console errors: none.

## Findings

No actionable P0, P1 or P2 differences remain.

## Comparison history

1. Initial desktop capture: the muted second title line competed with the
   moving point pattern.
2. Fix: added a localized readability overlay and increased the muted line
   opacity.
3. Mobile capture: small viewport units exposed the next section below the
   hero.
4. Fix: switched the mobile hero to `100dvh`; post-fix height matches the
   `390 × 844` viewport.

## Follow-up polish

- P3: after final brand review, the exact video focal point can be adjusted by
  changing `object-position` independently for desktop and mobile.

final result: passed
