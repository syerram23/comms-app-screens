// ============================================================
// Design tokens — forked from the Comms marketing site.
// App scale (headlines 20–32, not 72+). Same warm palette,
// same Instrument Serif italic accents, same JetBrains Mono meta.
// ============================================================
//
// TYPE SCALE (app)
//   display-lg : 32px / 500 / -0.02em   — screen titles
//   display-md : 24px / 500 / -0.01em   — section heads, modal titles
//   display-sm : 20px / 500 / -0.005em  — card titles
//   body       : 14px / 400 / normal    — default UI
//   body-lg    : 15px / 400             — readable prose
//   meta       : 11px mono / 0.05em UPPER — labels, metadata
//   micro      : 10px mono               — timestamps, hints
//
// SPACING
//   4, 8, 12, 16, 20, 24, 32, 48, 64 — stick to these
//
// RADII
//   6 (chip) · 8 (input) · 10 (card sm) · 14 (card) · 18 (panel)
//
// CHROME
//   Every app window has a titlebar with traffic lights (muted ink-3)
//   and a mono breadcrumb: comms.app / scope / entity / action
//
// COLORS
//   Inherit from marketing: warm neutral canvas (#faf8f5) + signal green accent.
//   Dark mode inherits too.
//
// ICONOGRAPHY
//   None. Use bullets (●), arrows (→ ↑ ↓), dashes, geometric SVG shapes
//   only (circle, rect, diamond, line). Never hand-draw pictorial icons.

Object.assign(window, {
  APP_SCALE: {
    titleLg: { fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.08 },
    titleMd: { fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.15 },
    titleSm: { fontSize: 20, fontWeight: 500, letterSpacing: '-0.005em', lineHeight: 1.2 },
    body:    { fontSize: 14, lineHeight: 1.5 },
    bodyLg:  { fontSize: 15, lineHeight: 1.55 },
  },
});
