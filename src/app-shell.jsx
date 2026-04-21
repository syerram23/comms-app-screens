// ============================================================
// AppShell — the chrome that wraps every screen in the product.
//   • Left sidebar: workspace switcher, primary nav, secondary nav, user
//   • Top bar: breadcrumbs · ⌘K search · notifications · avatar
//   • Slot for page content
//   • Optional right drawer slot
//
// Fixed width: 1280×820 per screen artboard.
// ============================================================

const { useState, useEffect, useRef } = React;

// -- left sidebar -------------------------------------------------------
function Sidebar({ active = 'builder', workspace = 'Harbor · production' }) {
  const primary = [
    ['home',      'Home',        '\u2302'],
    ['builder',   'Builder',     '\u2726'],
    ['campaigns', 'Campaigns',   '\u25EB'],
    ['people',    'People',      '\u25C9'],
    ['templates', 'Templates',   '\u274D'],
    ['search',    'Search',      '\u2315'],
  ];
  const secondary = [
    ['settings',  'Settings'],
  ];
  return (
    <aside style={{
      width: 232, borderRight: '1px solid var(--line)',
      background: 'var(--bg)', display: 'flex', flexDirection: 'column',
      height: '100%',
    }}>
      {/* workspace switcher */}
      <button style={{
        display: 'grid', gridTemplateColumns: '28px 1fr 14px', gap: 10,
        alignItems: 'center', padding: '14px 16px',
        border: 0, borderBottom: '1px solid var(--line)',
        background: 'transparent', cursor: 'pointer',
        textAlign: 'left',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8, background: 'var(--ink)',
          display: 'grid', placeItems: 'center',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)',
          }}/>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {workspace}
          </div>
          <div className="meta" style={{ fontSize: 10 }}>PLAN · TEAM · 14 SEATS</div>
        </div>
        <span className="meta" style={{ fontSize: 10 }}>⇅</span>
      </button>

      {/* primary nav */}
      <nav style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div className="meta" style={{ padding: '6px 10px 4px' }}>WORKSPACE</div>
        {primary.map(([k, label, glyph]) => (
          <NavItem key={k} k={k} active={active === k} label={label} glyph={glyph} />
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* secondary nav */}
      <nav style={{ padding: '8px 8px 4px', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {secondary.map(([k, label]) => (
          <NavItem key={k} k={k} active={active === k} label={label} glyph="·" muted />
        ))}
      </nav>

      {/* Try It */}
      <div style={{ padding: '8px 8px', borderTop: '1px solid var(--line)' }}>
        <a href="Try It.html" style={{
          display: 'grid', gridTemplateColumns: '22px 1fr', gap: 8,
          alignItems: 'center',
          padding: '8px 10px', borderRadius: 7, fontSize: 13, fontWeight: 500,
          color: 'var(--accent-ink)', textDecoration: 'none',
          background: 'var(--accent-soft)', border: '1px solid var(--line)',
        }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', textAlign: 'center' }}>{'\u25B6'}</span>
          <span>Try it yourself</span>
        </a>
      </div>

      {/* user */}
      <div style={{
        display: 'grid', gridTemplateColumns: '28px 1fr 14px', gap: 10,
        alignItems: 'center', padding: '12px 16px',
        borderTop: '1px solid var(--line)',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', background: 'var(--chip)',
          color: 'var(--ink-2)', display: 'grid', placeItems: 'center',
          fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500,
        }}>EK</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Ellis Kato
          </div>
          <div className="meta" style={{ fontSize: 10 }}>ADMIN</div>
        </div>
        <span className="meta" style={{ fontSize: 10 }}>⋯</span>
      </div>
    </aside>
  );
}

// Map nav key → HTML file slug. Keep in sync with screens-manifest.
const NAV_HREF = {
  home: 'Home.html',
  builder: 'Builder.html',
  campaigns: 'Campaigns.html',
  people: 'Participants.html',
  search: 'Search.html',
  templates: 'Templates.html',
  settings: 'Settings Profile.html',
  send: 'Send.html',
};

function NavItem({ k, active, label, glyph, muted }) {
  return (
    <a href={NAV_HREF[k] || '#'} style={{
      display: 'grid', gridTemplateColumns: '22px 1fr auto',
      alignItems: 'center', gap: 10,
      padding: '7px 10px', borderRadius: 7,
      background: active ? 'var(--bg-elev)' : 'transparent',
      color: active ? 'var(--ink)' : muted ? 'var(--ink-3)' : 'var(--ink-2)',
      fontSize: 13, fontWeight: active ? 500 : 400,
      border: active ? '1px solid var(--line)' : '1px solid transparent',
      boxShadow: active ? '0 1px 0 rgba(0,0,0,0.02)' : 'none',
    }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 11,
        color: active ? 'var(--accent-ink)' : 'var(--ink-3)',
      }}>{glyph}</span>
      <span>{label}</span>
      {active && <span className="meta" style={{ fontSize: 9 }}>●</span>}
    </a>
  );
}

// -- top bar ------------------------------------------------------------
function TopBar({ crumbs = [], right, unread = 3 }) {
  return (
    <header style={{
      height: 52, borderBottom: '1px solid var(--line)',
      display: 'grid', gridTemplateColumns: '1fr auto',
      alignItems: 'center', padding: '0 20px', gap: 16,
      background: 'var(--bg)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            <span style={{ color: i === crumbs.length - 1 ? 'var(--ink)' : 'var(--ink-3)' }}>{c}</span>
            {i < crumbs.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {right}
        <a href="Search.html" style={{ textDecoration:'none' }}><CmdKButton/></a>
        <a href="Notifications.html" style={{ textDecoration:'none' }}><IconBtn label={String(unread)} dot={unread > 0} glyph="◔" /></a>
        <div style={{
          width: 26, height: 26, borderRadius: '50%', background: 'var(--chip)',
          display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)',
          fontSize: 11, fontWeight: 500, color: 'var(--ink-2)',
        }}>EK</div>
      </div>
    </header>
  );
}

function CmdKButton() {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '5px 10px 5px 12px', height: 30,
      background: 'var(--bg-elev)', border: '1px solid var(--line)',
      borderRadius: 8, color: 'var(--ink-3)', fontSize: 12,
      minWidth: 200, cursor: 'pointer',
    }}>
      <span>⌕</span>
      <span style={{ flex: 1, textAlign: 'left' }}>Search or jump…</span>
      <span className="meta" style={{
        padding: '2px 6px', border: '1px solid var(--line)',
        borderRadius: 4, fontSize: 10,
      }}>⌘K</span>
    </button>
  );
}

function IconBtn({ glyph, label, dot }) {
  return (
    <button style={{
      position: 'relative', width: 30, height: 30, borderRadius: 8,
      background: 'var(--bg-elev)', border: '1px solid var(--line)',
      display: 'grid', placeItems: 'center', color: 'var(--ink-2)',
      fontSize: 14, cursor: 'pointer',
    }}>
      {glyph}
      {dot && (
        <span style={{
          position: 'absolute', top: -4, right: -4,
          minWidth: 14, height: 14, padding: '0 4px',
          borderRadius: 7, background: 'var(--accent)',
          color: 'var(--bg-elev)', fontFamily: 'var(--mono)', fontSize: 9,
          fontWeight: 600, display: 'grid', placeItems: 'center',
          border: '2px solid var(--bg)',
        }}>{label}</span>
      )}
    </button>
  );
}

// -- frame wrapper: a full app screen in a card --------------------------
// Normally renders at a fixed 1280×820 (for the design canvas).
// When <html data-standalone="1"> is set, fills the viewport instead.
function AppFrame({ active, crumbs, children, topRight, screenLabel, width = 1280, height = 820 }) {
  const standalone = typeof document !== 'undefined' && document.documentElement.dataset.standalone === '1';
  const sizing = standalone
    ? { width: '100%', height: '100vh', borderRadius: 0, border: 0 }
    : { width, height, borderRadius: 10, border: '1px solid var(--line)' };
  return (
    <div
      data-screen-label={screenLabel}
      style={{
        ...sizing,
        background: 'var(--bg)', color: 'var(--ink)',
        display: 'grid', gridTemplateColumns: '232px 1fr',
        overflow: 'hidden',
        fontFamily: 'var(--sans)',
      }}>
      <Sidebar active={active}/>
      <div style={{ display: 'grid', gridTemplateRows: '52px 1fr', minWidth: 0 }}>
        <TopBar crumbs={crumbs} right={topRight}/>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
      <TourGuide />
    </div>
  );
}

// -- page helpers shared across screens ---------------------------------
function PageHead({ eyebrow, title, italicTail, sub, actions }) {
  return (
    <div style={{
      padding: '24px 28px 20px', borderBottom: '1px solid var(--line)',
      display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'end',
    }}>
      <div>
        {eyebrow && <div className="num-badge" style={{ marginBottom: 10 }}>{eyebrow}</div>}
        <h1 style={{ ...window.APP_SCALE.titleLg, margin: 0 }}>
          {title}
          {italicTail && <> <span className="italic-serif" style={{ color: 'var(--ink-3)' }}>{italicTail}</span></>}
        </h1>
        {sub && <p style={{ margin: '8px 0 0', color: 'var(--ink-2)', fontSize: 14, maxWidth: 640 }}>{sub}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
    </div>
  );
}

function Pill({ children, tone }) {
  const palette = {
    accent:  { bg: 'var(--accent-soft)', fg: 'var(--accent-ink)' },
    warn:    { bg: 'oklch(0.95 0.06 70)', fg: 'oklch(0.38 0.14 60)' },
    danger:  { bg: 'oklch(0.95 0.05 25)', fg: 'oklch(0.40 0.14 25)' },
    neutral: { bg: 'var(--chip)', fg: 'var(--ink-2)' },
  };
  const c = palette[tone || 'neutral'];
  return (
    <span className="chip" style={{ background: c.bg, color: c.fg, borderColor: 'transparent' }}>
      {children}
    </span>
  );
}

function KBD({ children }) {
  return (
    <span className="meta" style={{
      padding: '2px 6px', border: '1px solid var(--line)',
      borderRadius: 4, fontSize: 10, color: 'var(--ink-2)',
      background: 'var(--bg-elev)',
    }}>{children}</span>
  );
}

function Btn({ variant = 'ghost', children, onClick, style, ...rest }) {
  return (
    <button onClick={onClick}
      className={variant === 'primary' ? 'primary' : variant === 'ghost' ? 'ghost' : ''}
      style={{
        ...(variant === 'subtle' ? {
          border: '1px solid var(--line)', background: 'var(--bg-elev)',
          padding: '8px 12px', borderRadius: 8, fontSize: 13, color: 'var(--ink)',
          cursor: 'pointer',
        } : {}),
        ...(style || {}),
      }}
      {...rest}>{children}</button>
  );
}

// -- Empty State component ------------------------------------------------
function EmptyState({ icon, title, desc, action, actionHref }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 40px', textAlign:'center' }}>
      <div style={{ fontSize:48, marginBottom:16, opacity:0.3 }}>{icon}</div>
      <div style={{ fontSize:17, fontWeight:500, marginBottom:8 }}>{title}</div>
      <div style={{ fontSize:14, color:'var(--ink-3)', maxWidth:400, lineHeight:1.55, marginBottom:20 }}>{desc}</div>
      {action && <a href={actionHref} className="primary" style={{ padding:'10px 20px', borderRadius:999 }}>{action}</a>}
    </div>
  );
}

// -- Help Tip component ---------------------------------------------------
function HelpTip({ text }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position:'relative', display:'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <span style={{
        width:16, height:16, borderRadius:'50%', border:'1px solid var(--line-2)',
        display:'inline-grid', placeItems:'center',
        fontSize:10, color:'var(--ink-3)', cursor:'help', fontFamily:'var(--sans)',
      }}>?</span>
      {show && (
        <div style={{
          position:'absolute', bottom:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)',
          background:'var(--ink)', color:'var(--bg)', padding:'10px 14px',
          borderRadius:8, fontSize:12, lineHeight:1.5, width:240, zIndex:100,
          boxShadow:'0 8px 24px rgba(0,0,0,0.2)', pointerEvents:'none',
        }}>{text}</div>
      )}
    </span>
  );
}

// -- Tour Guide component -------------------------------------------------
function TourGuide() {
  const [step, setStep] = React.useState(0);
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;
  if (typeof localStorage !== 'undefined' && localStorage.getItem('comms_tour_complete')) return null;

  const steps = [
    {
      title: 'This is where you create conversations',
      desc: 'Start from scratch or pick a template \u2014 Comms builds the experience for you.',
      spotlight: { top: 142, left: 8, width: 216, height: 36 },
      tooltip: { top: 136, left: 240 },
    },
    {
      title: 'Your conversation is made of steps',
      desc: 'Each step is something your participant does: answer a question, upload a document, sign something.',
      spotlight: { top: 200, left: 360, width: 500, height: 340 },
      tooltip: { top: 360, left: 480 },
    },
    {
      title: 'AI can build it for you',
      desc: "Just describe what you need \u2014 'onboard a new vendor and collect their W-9' \u2014 and Comms creates the whole flow.",
      spotlight: { top: 52, left: 900, width: 340, height: 44 },
      tooltip: { top: 110, left: 920 },
    },
    {
      title: 'Preview before you send',
      desc: 'Walk through the experience exactly as your participants will see it. Test every step.',
      spotlight: { top: 0, left: 232, width: 700, height: 52 },
      tooltip: { top: 66, left: 440 },
    },
    {
      title: 'Track everything here',
      desc: "See who completed, who\u2019s stuck, and what documents you\u2019ve collected \u2014 all in one place.",
      spotlight: { top: 178, left: 8, width: 216, height: 36 },
      tooltip: { top: 172, left: 240 },
    },
    {
      title: 'Ask questions in plain English',
      desc: "Type 'who hasn\u2019t completed onboarding?' and get an instant answer. No spreadsheets needed.",
      spotlight: { top: 250, left: 8, width: 216, height: 36 },
      tooltip: { top: 244, left: 240 },
    },
  ];

  const s = steps[step];
  const isLast = step === steps.length - 1;

  function finish() {
    if (typeof localStorage !== 'undefined') localStorage.setItem('comms_tour_complete', 'true');
    setDismissed(true);
  }

  return (
    <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', zIndex:9999 }}>
      {/* Spotlight with box-shadow backdrop */}
      <div style={{
        position:'absolute',
        top: s.spotlight.top,
        left: s.spotlight.left,
        width: s.spotlight.width,
        height: s.spotlight.height,
        borderRadius: 10,
        boxShadow: '0 0 0 9999px rgba(14,14,12,0.65)',
        zIndex: 9999,
      }}/>
      {/* Tooltip card */}
      <div style={{
        position:'absolute',
        top: s.tooltip.top,
        left: s.tooltip.left,
        background: '#ffffff',
        borderRadius: 14,
        padding: '20px 24px',
        width: 300,
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
        zIndex: 10000,
      }}>
        <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--ink-3)', marginBottom:8, letterSpacing:'0.04em' }}>
          {step + 1} of {steps.length}
        </div>
        <div style={{ fontSize:15, fontWeight:600, marginBottom:6, color:'var(--ink)' }}>{s.title}</div>
        <div style={{ fontSize:13, color:'var(--ink-2)', lineHeight:1.55, marginBottom:18 }}>{s.desc}</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={finish} style={{
            background:'none', border:'none', fontSize:12, color:'var(--ink-3)', cursor:'pointer', padding:0,
          }}>Skip tour</button>
          <button onClick={() => { if (isLast) finish(); else setStep(step + 1); }} style={{
            background:'var(--ink)', color:'var(--bg)', border:'none',
            padding:'8px 16px', borderRadius:999, fontSize:13, fontWeight:500, cursor:'pointer',
          }}>{isLast ? 'Get started \u2192' : 'Next \u2192'}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, AppFrame, PageHead, Pill, KBD, Btn, CmdKButton, IconBtn, NavItem, EmptyState, HelpTip, TourGuide });
