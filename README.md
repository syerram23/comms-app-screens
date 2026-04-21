# Comms · App UI — deploy bundle

This project contains three views into the same codebase:

1. **`Team Walkthrough.html`** — a **narrative tour** for product, design, and engineering. Opens with a 5-minute demo script, ends with a wire-up priority list. **Start here if you're new.**
2. **`Comms App UI.html`** — the **design canvas**. Every screen laid out side-by-side on a zoomable/pannable canvas. Use this for review, comment, and comparison.
3. **`Screens Index.html`** — the **developer hand-off hub**. One card per screen, linking to a standalone HTML file that renders that screen at full viewport. Use this when deploying to Claude Code.

## File layout

```
Comms App UI.html            ← design canvas (all screens at once)
Screens Index.html           ← developer index (cards → standalone pages)
README.md                    ← this file

<Screen>.html                ← 48 standalone HTML files, one per screen
                               e.g. Home.html, Sign Up.html, P10f Voice.html
                               All load src/tokens.css + the shared JSX modules
                               and render the matching React component via a
                               <meta name="comms-screen"> tag.

src/
  tokens.css                 ← CSS custom properties, global primitives, utility
                               classes. Single source of truth for design tokens.
  tokens.jsx                 ← JS-side spec (app type scale, etc.)
  app-shell.jsx              ← Sidebar, TopBar, AppFrame, Pill, KBD, Btn
  screen-*.jsx               ← Screen components, grouped by phase
  screens-manifest.js        ← Flat array of every screen (phase/slug/title/component)
  standalone-host.jsx        ← Reads the <meta> and renders the right component
                               full-viewport (used by every <Screen>.html)

design-canvas.jsx            ← The Figma-like canvas wrapper (used by the canvas only)
```

## Phase inventory

| Phase | Group                     | Count | Entry                                                    |
|-------|---------------------------|-------|----------------------------------------------------------|
| 01    | Foundation                | 1     | `Home.html`                                              |
| 02    | Builder (chat + advanced)   | 7     | `Builder.html` (new default) · `Flow Editor.html` (advanced)  |
| 03    | Templates                 | 2     | `Templates.html`                                         |
| 04    | Campaigns                 | 2     | `Campaigns.html`                                         |
| 05    | Participants              | 2     | `Participants.html`                                      |
| 06    | Auth                      | 4     | `Sign Up.html`                                           |
| 07    | Settings                  | 6     | `Settings Profile.html`                                  |
| 08    | Live                      | 6     | `Live Voice.html`                                        |
| 09    | Edge / error              | 7     | `404.html`                                               |
| 10    | Participant · email       | 8     | `P10a Inbox.html` → `P10h Thanks.html`                   |
| 11    | Participant · link+agenda | 6     | `P11a Link Landing.html` → `P11f Builder View.html`      |

Total: **51 screens**.

## Running locally

No build step. Everything is plain HTML + inline JSX transpiled by Babel in-browser.

```
# Any static server. e.g.
npx serve .
# → http://localhost:3000/Screens%20Index.html
```

For production, run a JSX pre-compilation step (Vite, esbuild, etc.) so you
don't ship Babel Standalone. The components themselves don't need any changes —
they're vanilla React 18, no TypeScript, no CSS modules.

## How the standalone pages work

Every `<Screen>.html` is the same 30-line template:

```html
<meta name="comms-screen" content="ScreenHome"/>
...
<script type="text/babel" src="src/screen-home.jsx"></script>
...
<script type="text/babel" src="src/standalone-host.jsx"></script>
```

`standalone-host.jsx` reads the `<meta>` tag and renders whichever component it
names, full-viewport, wrapped in a small "← All screens" header chrome (hidden
on print).

If you want to add a new screen:
1. Export it to `window` from a `.jsx` file (same pattern as existing screens).
2. Append a row to `screens-manifest.js`.
3. Create a new `<Slug>.html` from the template (copy an existing one, swap
   the `<meta>` content + `<title>`).

## Interactive bits worth knowing

- **Flow editor** (`Flow Editor.html`) has real drag-and-drop — grab any node, it
  moves; SVG edges follow.
- **Live modalities** (`Live Voice.html` etc.) share a modality tab bar — click a
  different modality inside the page and the center stage swaps without a reload.
- **Campaigns list** has live row-select → bulk-action bar.
- **Participant flow** is linear: `P10a Inbox` → `P10b Email` → `P10c Landing` →
  etc. All the "Start the conversation" / "Continue →" links inside those
  screens point to the next file in the sequence.

## Design tokens

All color / type / spacing tokens live in **`src/tokens.css`**. Hex values come
from the Comms marketing site (warm neutral palette, signal-green accent,
Instrument Serif italics, JetBrains Mono metadata). To swap the accent hue or
switch to dark mode, change the `[data-accent]` or `[data-mode]` attribute on
`<html>`.

## Known handoff notes

- In-browser Babel is fine for prototype review; production should precompile.
- The design canvas uses a pan/zoom wrapper (`design-canvas.jsx`) that
  intercepts wheel events. Standalone pages don't — they scroll normally.
- No backend wiring. Forms, captchas, "Send" buttons are decorative —
  real integrations live in the `Settings · API & Webhooks` screen's schema.
