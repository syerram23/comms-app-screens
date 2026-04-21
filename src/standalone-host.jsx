// ============================================================
// Standalone page host — renders ONE screen full-viewport.
// Driven by <meta name="comms-screen" content="ComponentName"/>
// in the page. Same shared tokens & chrome as the canvas.
// ============================================================

const { useState: useStateH, useEffect: useEffectH } = React;

function StandaloneHost() {
  const screenName = document.querySelector('meta[name="comms-screen"]')?.content;
  const Component = screenName && window[screenName];

  // Mark this as a standalone render — AppFrame uses this to fill viewport
  useEffectH(() => {
    document.documentElement.dataset.standalone = '1';
    return () => { delete document.documentElement.dataset.standalone; };
  }, []);

  // Tweaks protocol (so the design-canvas Tweaks work here too)
  const [editMode, setEditMode] = useStateH(false);
  const [state, setState] = useStateH('normal');
  const [mode, setMode] = useStateH('light');
  const [accent, setAccent] = useStateH('signal');
  useEffectH(() => {
    document.documentElement.dataset.state  = state;
    document.documentElement.dataset.mode   = mode;
    document.documentElement.dataset.accent = accent;
  }, [state, mode, accent]);
  useEffectH(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditMode(true);
      if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!Component) {
    return (
      <div style={{ padding:40, fontFamily:'var(--sans)' }}>
        <div className="meta">MISSING SCREEN</div>
        <h1 style={{ ...window.APP_SCALE.titleLg, margin:'6px 0 12px' }}>Screen "{screenName}" not registered.</h1>
        <p style={{ color:'var(--ink-2)' }}>Check the <code style={{ fontFamily:'var(--mono)' }}>&lt;meta name="comms-screen"&gt;</code> in this HTML and that <code>window.{screenName}</code> exists.</p>
        <a className="primary" href="Screens Index.html">← Back to index</a>
      </div>
    );
  }

  return (
    <div style={{ position:'relative', width:'100vw', minHeight:'100vh', background:'var(--bg)' }}>
      <Component/>

      {/* floating back-to-index pill · bottom-left so it never collides with topbar actions */}
      <a href="Screens Index.html" className="standalone-chrome" style={{
        position:'fixed', bottom:14, left:14, zIndex:900,
        padding:'6px 12px', background:'var(--bg-elev)',
        border:'1px solid var(--line)', borderRadius:999,
        color:'var(--ink-2)', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.06em',
        textDecoration:'none', boxShadow:'0 4px 14px rgba(0,0,0,0.08)',
      }}>← ALL SCREENS</a>

      {editMode && (
        <div style={{
          position:'fixed', right:16, bottom:16, width:240,
          background:'var(--bg-elev)', border:'1px solid var(--line-2)',
          borderRadius:12, padding:12, fontSize:12,
          boxShadow:'0 18px 60px -20px rgba(0,0,0,0.35)', zIndex:1000,
          color:'var(--ink)',
        }}>
          <div className="meta" style={{ marginBottom:8, color:'var(--ink-2)' }}>TWEAKS</div>
          <Seg label="MODE" value={mode} set={setMode} opts={['light','dark']}/>
          <Seg label="ACCENT" value={accent} set={setAccent} opts={['signal','cobalt','ember']}/>
          <Seg label="STATE" value={state} set={setState} opts={['normal','empty','loading','error']}/>
        </div>
      )}
    </div>
  );
}

function Seg({ label, value, set, opts }) {
  return (
    <div style={{ marginBottom:8 }}>
      <div className="meta" style={{ fontSize:9, marginBottom:4 }}>{label}</div>
      <div style={{ display:'grid', gridAutoFlow:'column', gridAutoColumns:'1fr', gap:2, background:'var(--chip)', padding:2, borderRadius:7 }}>
        {opts.map(o => (
          <button key={o} onClick={()=>set(o)} style={{
            background: o===value?'var(--bg-elev)':'transparent', border:0, padding:'5px 6px',
            borderRadius:5, fontSize:10.5, color: o===value?'var(--ink)':'var(--ink-3)',
            cursor:'pointer', fontFamily:'var(--mono)', textTransform:'capitalize',
          }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<StandaloneHost/>);
