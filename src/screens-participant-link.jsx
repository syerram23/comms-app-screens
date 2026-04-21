// ============================================================
// Phase 11 · SHAREABLE-LINK FLOW + AGENDA-DRIVEN CONVERSATION
//
// Two entry points into the same conversation engine:
//   (a) Personal email link (Phase 10) — identity known
//   (b) Shareable link         (Phase 11) — identity unknown
//
// The shareable link is what Acme drops in Slack, on LinkedIn,
// at the bottom of an email blast. Anyone who opens it goes
// through a lightweight gate (name + email + captcha) before
// entering the same agenda-driven conversation.
//
// AGENDA FORMAT
//   Every conversation = a list of steps. Each step has:
//     - title
//     - modality (voice / video / form / doc / video-clip / ack)
//     - expected duration
//   The participant sees the agenda persistently on one side.
//   It advances as they complete each item.
// ============================================================

const { useState: useStateQ, useEffect: useEffectQ } = React;

// ─────────────────────────────────────────────────────────
// The agenda (shared data model for both ops side + participant side)
// ─────────────────────────────────────────────────────────
const AGENDA = [
  { k:'intro',    modality:'voice', title:'Intro & consent',              eta:'1 min',  hint:'Quick hello, what we\'re after.' },
  { k:'q1',       modality:'voice', title:'Tell us about your stack',     eta:'2 min',  hint:'Open-ended voice answer.' },
  { k:'q2',       modality:'video', title:'Show us your current workflow',eta:'3 min',  hint:'Screen or camera on, you walk us through it.' },
  { k:'clip',     modality:'clip',  title:'Watch a 60-second concept',    eta:'1 min',  hint:'React in real time.' },
  { k:'form',     modality:'form',  title:'Pick which mattered most',     eta:'2 min',  hint:'A short form — multiple choice + rank.' },
  { k:'q3',       modality:'voice', title:'Wrap — anything we missed?',   eta:'1 min',  hint:'Last thoughts, your pricing take.' },
  { k:'outro',    modality:'ack',   title:'Thanks & incentive',           eta:'30 s',   hint:'Pick your gift card.' },
];

// Small icon per modality
const modGlyph = (m) => ({ voice:'◔', video:'▢', form:'▤', clip:'▷', doc:'≡', ack:'✓' }[m] || '·');

// ─────────────────────────────────────────────────────────
// AgendaRail — shared sidebar used in the live participant screens.
// ─────────────────────────────────────────────────────────
function AgendaRail({ currentIdx, dark }) {
  const fg = dark ? '#fff' : 'var(--ink)';
  const fg2 = dark ? 'rgba(255,255,255,0.7)' : 'var(--ink-2)';
  const fg3 = dark ? 'rgba(255,255,255,0.45)' : 'var(--ink-3)';
  const line = dark ? 'rgba(255,255,255,0.08)' : 'var(--line)';
  const elevBg = dark ? 'rgba(255,255,255,0.04)' : 'var(--bg-elev)';
  return (
    <div style={{ padding:'18px 18px', display:'flex', flexDirection:'column', gap:0, color:fg, minHeight:0 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
        <span className="meta" style={{ color:fg3 }}>TODAY'S AGENDA</span>
        <span className="meta" style={{ color:fg3 }}>{currentIdx + 1} / {AGENDA.length}</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
        {AGENDA.map((a, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={a.k} style={{
              display:'grid', gridTemplateColumns:'28px 1fr auto', gap:10,
              alignItems:'center', padding:'10px 10px',
              background: active ? elevBg : 'transparent',
              border:'1px solid ' + (active ? line : 'transparent'),
              borderRadius:8, opacity: done?0.55:1,
            }}>
              <span style={{
                width:22, height:22, borderRadius:'50%',
                background: done ? 'var(--accent)' : active ? fg : 'transparent',
                color: done||active ? (dark?'#0a0a0a':'var(--bg)') : fg3,
                border: done||active ? 'none' : '1px solid ' + line,
                display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:10, fontWeight:600,
              }}>
                {done ? '✓' : (i+1)}
              </span>
              <div style={{ minWidth:0 }}>
                <div style={{ display:'flex', gap:6, alignItems:'center', fontSize:13, fontWeight: active?500:400, color: active?fg:fg2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  <span style={{ fontFamily:'var(--mono)', fontSize:11, color: active?'var(--accent)':fg3 }}>{modGlyph(a.modality)}</span>
                  {a.title}
                </div>
                {active && <div className="meta" style={{ color:fg3, marginTop:2, textTransform:'none', letterSpacing:0 }}>{a.hint}</div>}
              </div>
              <span className="meta" style={{ color:fg3 }}>{a.eta}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop:'auto', paddingTop:14, borderTop:'1px solid ' + line, fontSize:11, color:fg3, fontFamily:'var(--mono)', letterSpacing:'0.04em' }}>
        EST. {AGENDA.reduce((s, a) => s + (a.eta.includes('min') ? parseInt(a.eta) : 0.5), 0)} MIN TOTAL · PAUSE OR SKIP ANY TIME
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Shared browser-chrome wrapper reused across phase 11
// ─────────────────────────────────────────────────────────
function PBrowser({ url, height=820, children }) {
  return (
    <div style={{
      width:1280, height, background:'#fff',
      border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      fontFamily:'Inter Tight, system-ui, sans-serif',
      display:'grid', gridTemplateRows:'44px 1fr', color:'#111',
    }}>
      <div style={{ background:'#edeff2', borderBottom:'1px solid #d7dae0', display:'flex', alignItems:'center', gap:8, padding:'0 14px' }}>
        <span style={{ display:'inline-flex', gap:6 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }}/>)}
        </span>
        <span style={{ color:'#7f8189', fontSize:13, marginLeft:10 }}>← → ↻</span>
        <div style={{ flex:1, margin:'0 10px', padding:'6px 12px', background:'#fff', border:'1px solid #d7dae0', borderRadius:8, fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'#3c4043', display:'flex', alignItems:'center', gap:8 }}>
          <span>🔒</span>{url}
        </div>
        <span style={{ color:'#7f8189', fontSize:13 }}>⋯</span>
      </div>
      <div style={{ overflow:'hidden', position:'relative' }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 11a · The shareable link — shared context (what someone sees first)
// "Someone in a Slack thread / on LinkedIn clicks a bare link."
// ─────────────────────────────────────────────────────────
function ScreenLinkLanding() {
  return (
    <PBrowser url="comms.ai/c/acme/ops-research-q2">
      <div style={{ height:'100%', background:'#faf8f5', display:'grid', gridTemplateColumns:'1.1fr 1fr', minHeight:0 }}>
        {/* left — identical dark brand side as email landing, but the copy acknowledges they came from a link */}
        <div style={{ background:'#0e0e0c', color:'#fff', padding:'44px 48px', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'56px 56px' }}/>
          <div style={{ position:'relative' }}>
            <AcmeMark light/>
            <div style={{ marginTop:30, fontFamily:'var(--mono)', fontSize:11, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em' }}>● PUBLIC LINK · SHARED BY AYO</div>
          </div>

          <div style={{ position:'relative' }}>
            <h1 style={{ fontSize:40, fontWeight:500, letterSpacing:'-0.03em', lineHeight:1.05, margin:0, maxWidth:'15ch' }}>
              Whoever you are — <span className="italic-serif" style={{ color:'rgba(255,255,255,0.55)' }}>welcome.</span>
            </h1>
            <p style={{ marginTop:18, fontSize:15, color:'rgba(255,255,255,0.75)', maxWidth:'44ch', lineHeight:1.55 }}>
              Acme is talking to ops leads at Series B–D companies about vendor onboarding.
              Share a few thoughts and we'll send you a <strong style={{ color:'#fff' }}>$75 thank-you card</strong>. About 15 minutes.
            </p>

            {/* Today's agenda preview */}
            <div style={{ marginTop:22, padding:'14px 16px', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, background:'rgba(255,255,255,0.03)' }}>
              <div className="meta" style={{ color:'rgba(255,255,255,0.5)', marginBottom:8 }}>WHAT'S ON THE AGENDA</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6, fontSize:13 }}>
                {AGENDA.slice(0, 5).map((a, i) => (
                  <div key={a.k} style={{ display:'grid', gridTemplateColumns:'20px 1fr auto', gap:10, alignItems:'center', color:'rgba(255,255,255,0.85)' }}>
                    <span style={{ color:'var(--accent)', fontFamily:'var(--mono)', fontSize:10 }}>{modGlyph(a.modality)}</span>
                    <span>{i+1}. {a.title}</span>
                    <span className="meta" style={{ color:'rgba(255,255,255,0.45)' }}>{a.eta}</span>
                  </div>
                ))}
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontStyle:'italic', marginTop:2 }}>…and two more steps to wrap.</div>
              </div>
            </div>
          </div>

          <div style={{ position:'relative', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <CommsByline inverted/>
            <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'rgba(255,255,255,0.4)' }}>NO APP · NO LOGIN · GDPR · SOC 2</span>
          </div>
        </div>

        {/* right · first-run CTA */}
        <div style={{ padding:'44px 48px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div className="meta" style={{ marginBottom:10 }}>START FROM HERE</div>
          <h2 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>Two steps — <span className="italic-serif" style={{ color:'var(--ink-3)' }}>that's it.</span></h2>
          <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:10, maxWidth:'44ch' }}>
            Quick intro so Ayo knows who gave which answer, then the conversation starts.
            Pick your mic-or-camera on the next screen.
          </p>

          <div style={{ marginTop:28, display:'flex', flexDirection:'column', gap:10 }}>
            {[
              ['1','Tell us who you are',  'Name, email, one captcha.',      true],
              ['2','Have the conversation','Voice, video, or text — your call.', false],
            ].map(([n, t, d, active]) => (
              <div key={n} style={{
                display:'grid', gridTemplateColumns:'32px 1fr', gap:14,
                padding:'14px 16px',
                background:'var(--bg-elev)', border:'1px solid ' + (active?'var(--ink)':'var(--line)'),
                borderRadius:12,
                boxShadow: active?'0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)':'none',
              }}>
                <div style={{ width:30, height:30, borderRadius:'50%', background: active?'var(--ink)':'var(--chip)', color: active?'var(--bg)':'var(--ink-3)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:12 }}>{n}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:500 }}>{t}</div>
                  <div className="meta" style={{ textTransform:'none', letterSpacing:0, marginTop:2 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:22 }}>
            <a href="P11b Gate.html" className="primary" style={{ display:'inline-block', padding:'12px 22px', borderRadius:999 }}>Start →</a>
            <span style={{ fontSize:12, color:'var(--ink-3)', marginLeft:12 }}>No credit card · no account created</span>
          </div>

          <div style={{ marginTop:22, paddingTop:14, borderTop:'1px solid var(--line)', fontSize:11, color:'var(--ink-3)' }}>
            <span className="meta">● LINK · c_ayo_public_7kQm ·</span> Shared 4 days ago by Ayo Adesanya at Acme. {' '}
            <a href="#" style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>Why should I trust this?</a>
          </div>
        </div>
      </div>
    </PBrowser>
  );
}

// ─────────────────────────────────────────────────────────
// 11b · Identity gate — first/last/email/captcha
// ─────────────────────────────────────────────────────────
function ScreenLinkGate() {
  return (
    <PBrowser url="comms.ai/c/acme/ops-research-q2/who">
      <div style={{ height:'100%', background:'#faf8f5', display:'grid', placeItems:'center', padding:40 }}>
        <div style={{ width:720, background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:18, padding:'36px 40px', boxShadow:'0 20px 60px -20px rgba(0,0,0,0.1)' }}>
          {/* header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <AcmeMark/>
            <CommsByline/>
          </div>

          <div style={{ marginTop:26, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <div>
              <div className="meta" style={{ marginBottom:8 }}>STEP 1 / 2 · WHO'S THIS?</div>
              <h2 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
                Quick intro. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>So Ayo can thank you.</span>
              </h2>
            </div>
            {/* agenda mini */}
            <div style={{ display:'flex', gap:4 }}>
              {AGENDA.map((a, i) => (
                <span key={a.k} style={{
                  width:8, height:8, borderRadius:'50%',
                  background: i===0?'var(--ink)':'var(--chip)',
                  border: i===0?'none':'1px solid var(--line-2)',
                }} title={a.title}/>
              ))}
            </div>
          </div>

          <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:10, maxWidth:'52ch' }}>
            We just need enough to send the incentive and match you if you come back later. None of this goes to marketing.
          </p>

          {/* fields */}
          <div style={{ marginTop:24, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <AuthField label="First name" placeholder="Marta"/>
            <AuthField label="Last name" placeholder="Krol"/>
            <div style={{ gridColumn:'1 / -1' }}>
              <AuthField label="Work email" placeholder="marta@clipboard.io" hint="We'll use this to send the $75 gift card. Won't add you to any list."/>
            </div>
            <AuthField label="Role (optional)" placeholder="Head of Ops"/>
            <div>
              <label className="meta" style={{ marginBottom:6, display:'block' }}>COMPANY SIZE</label>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {['1–10','11–50','51–200','201–1k','1k+'].map((s, i) => (
                  <button key={s} style={{
                    padding:'8px 12px', borderRadius:999,
                    background: i===2?'var(--ink)':'var(--bg-elev)',
                    color: i===2?'var(--bg)':'var(--ink-2)',
                    border:'1px solid ' + (i===2?'var(--ink)':'var(--line)'), fontSize:12,
                  }}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* captcha */}
          <div style={{ marginTop:22, padding:14, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg)', display:'grid', gridTemplateColumns:'auto 1fr auto', gap:14, alignItems:'center' }}>
            <span style={{
              width:28, height:28, borderRadius:6, background:'var(--ink)', color:'var(--bg)',
              display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:12, fontWeight:600,
            }}>✓</span>
            <div>
              <div style={{ fontSize:14, fontWeight:500 }}>I'm not a bot</div>
              <div className="meta" style={{ textTransform:'none', letterSpacing:0 }}>Protected by hCaptcha · <a style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>privacy</a> · <a style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>terms</a></div>
            </div>
            <span className="meta">● VERIFIED</span>
          </div>

          {/* consent */}
          <label style={{ display:'flex', gap:10, marginTop:18, fontSize:12.5, color:'var(--ink-2)', alignItems:'flex-start', lineHeight:1.5 }}>
            <input type="checkbox" defaultChecked style={{ accentColor:'var(--ink)', marginTop:3 }}/>
            I'm OK being recorded and agree to the <a style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>participant terms</a>. I can stop any time.
          </label>

          <div style={{ marginTop:22, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <a href="P11a Link Landing.html" style={{ fontSize:13, color:'var(--ink-3)' }}>← Back</a>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span className="meta">CONTINUE · <KBD>⌘↵</KBD></span>
              <a href="P11c Agenda Intro.html" className="primary" style={{ padding:'12px 22px' }}>Continue → the conversation</a>
            </div>
          </div>
        </div>
      </div>
    </PBrowser>
  );
}

// ─────────────────────────────────────────────────────────
// 11c / d / e · Agenda-driven conversation.
// We stage three key moments of the same session to show
// how the agenda rail advances and how the center stage
// swaps modality (voice → video → form).
// ─────────────────────────────────────────────────────────

// Shared shell — dark cockpit that swaps its center stage
function AgendaShell({ currentIdx, screenLabel, children, nextHref }) {
  const current = AGENDA[currentIdx];
  return (
    <div data-screen-label={screenLabel} style={{
      width:1280, height:820, background:'#0e0e0c', color:'#fff',
      border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      fontFamily:'var(--sans)',
    }}>
      <div style={{ display:'grid', gridTemplateRows:'auto 1fr auto', height:'100%' }}>
        {/* top bar */}
        <div style={{ padding:'16px 26px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <AcmeMark light/>
            <span style={{ width:1, height:20, background:'rgba(255,255,255,0.15)' }}/>
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.7)' }}>Vendor onboarding · Marta K.</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:18 }}>
            <span style={{ fontFamily:'var(--mono)', fontSize:11, color:'rgba(255,255,255,0.5)' }}>
              STEP {currentIdx+1}/{AGENDA.length} · {current.title.toUpperCase()}
            </span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,0.6)' }}>
              <span className="recording-dot"/> RECORDING
            </span>
          </div>
        </div>

        {/* body — agenda left · stage right */}
        <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', minHeight:0 }}>
          <div style={{ borderRight:'1px solid rgba(255,255,255,0.08)', display:'flex', flexDirection:'column' }}>
            <AgendaRail currentIdx={currentIdx} dark/>
          </div>
          <div style={{ position:'relative', overflow:'hidden' }}>{children}</div>
        </div>

        {/* footer */}
        <div style={{ padding:'12px 22px', borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:8 }}>
            {['Mute','Camera','Captions'].map(t => (
              <button key={t} style={{ padding:'8px 14px', borderRadius:999, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:12 }}>{t}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, color:'rgba(255,255,255,0.5)' }}>
            <KBDDark>J</KBDDark> / <KBDDark>K</KBDDark> prev/next step · <KBDDark>Space</KBDDark> pause · {current.eta} est.
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => { if(nextHref) window.location.href=nextHref; }} style={{ padding:'8px 14px', borderRadius:999, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:12, cursor:'pointer' }}>Skip step →</button>
            <button onClick={() => window.location.href='P10h Thanks.html'} style={{ padding:'8px 16px', borderRadius:999, background:'oklch(0.52 0.19 25)', color:'#fff', border:0, fontSize:12, fontWeight:500, cursor:'pointer' }}>End</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function KBDDark({ children }) {
  return <span style={{ padding:'1px 6px', border:'1px solid rgba(255,255,255,0.18)', borderRadius:4, fontFamily:'var(--mono)', fontSize:10, background:'rgba(255,255,255,0.04)' }}>{children}</span>;
}

// Stage · Intro (voice)
function StageIntroVoice() {
  return (
    <div style={{ height:'100%', display:'grid', gridTemplateRows:'auto 1fr auto', padding:28, gap:20 }}>
      <div>
        <div className="meta" style={{ color:'rgba(255,255,255,0.5)', marginBottom:6 }}>STEP 1 · INTRO</div>
        <div style={{ fontFamily:'var(--serif)', fontStyle:'italic', fontSize:22, color:'#fff', maxWidth:'44ch', lineHeight:1.3 }}>
          "Hi Marta — Ayo's out doing research with Series B ops leads. Mind if I record? Say 'yes, record' if you're OK."
        </div>
      </div>
      <div style={{ display:'grid', placeItems:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{
            width:200, height:200, borderRadius:'50%',
            background:'radial-gradient(circle at 40% 40%, oklch(0.65 0.18 148), oklch(0.28 0.08 148) 75%)',
            boxShadow:'0 0 0 12px color-mix(in srgb, var(--accent) 18%, transparent), 0 0 0 24px color-mix(in srgb, var(--accent) 7%, transparent), 0 0 150px color-mix(in srgb, var(--accent) 30%, transparent)',
            display:'grid', placeItems:'center',
            color:'#0e0e0c', fontFamily:'var(--mono)', fontSize:24, fontWeight:600, margin:'0 auto',
          }}>ACME</div>
          <div style={{ marginTop:22, fontSize:16, fontWeight:500 }}>Acme Research Agent</div>
          <div className="meta" style={{ color:'rgba(255,255,255,0.5)', marginTop:4 }}>● SPEAKING</div>
          {/* your tile */}
          <div style={{ marginTop:22, display:'inline-flex', alignItems:'center', gap:12, padding:'10px 16px', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12 }}>
            <div style={{ width:30, height:30, borderRadius:'50%', background:'#fff', color:'#0e0e0c', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:11 }}>MK</div>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.8)' }}>You · Marta K.</span>
            <span style={{ display:'inline-flex', gap:2, alignItems:'end', height:12, marginLeft:6 }}>
              {Array.from({length:10}).map((_,i) => <span key={i} style={{ width:2, height:2+Math.abs(Math.sin(i*0.9))*8, background:'rgba(255,255,255,0.55)', borderRadius:1 }}/>)}
            </span>
          </div>
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'center', gap:10 }}>
        <button style={{ padding:'10px 18px', borderRadius:999, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:13 }}>Say: "Yes, record"</button>
        <button style={{ padding:'10px 18px', borderRadius:999, background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:13 }}>Type instead</button>
      </div>
    </div>
  );
}

// Stage · Q2 (video + screenshare walkthrough)
function StageQ2Video() {
  return (
    <div style={{ height:'100%', position:'relative', background:'#0a0a0a', color:'#fff' }}>
      {/* participant's screen-share view */}
      <div style={{ position:'absolute', inset:0, background:'#1a1c20' }}>
        <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 18px, transparent 18px, transparent 36px)' }}/>
        <div style={{ position:'absolute', top:16, left:24, right:24, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'var(--mono)', fontSize:11, color:'rgba(255,255,255,0.55)' }}>● MARTA SHARING · "OUR VENDOR TRACKER" (GOOGLE SHEETS)</span>
          <span style={{ fontFamily:'var(--mono)', fontSize:11, color:'rgba(255,255,255,0.5)', padding:'3px 8px', background:'rgba(255,255,255,0.06)', borderRadius:4 }}>STEP 3 · 02:14 / ~03:00</span>
        </div>
        {/* fake spreadsheet */}
        <div style={{ position:'absolute', left:80, right:80, top:70, bottom:190, background:'#fff', color:'#111', borderRadius:10, overflow:'hidden', boxShadow:'0 20px 80px -20px rgba(0,0,0,0.6)' }}>
          <div style={{ padding:'8px 12px', background:'#f6f8fc', borderBottom:'1px solid #e5e7eb', fontFamily:'var(--mono)', fontSize:11, color:'#5f6368', display:'flex', justifyContent:'space-between' }}>
            <span>Vendor Tracker · Q2 · shared</span>
            <span>● 3 viewing</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'28px repeat(6, 1fr)', fontSize:12, borderBottom:'1px solid #e5e7eb' }}>
            {['#','Vendor','W-9','COI','NDA','Status','Last chase'].map((h, i) => (
              <div key={i} style={{ padding:'8px 10px', borderRight: i<6?'1px solid #e5e7eb':'none', fontWeight:500, color:'#5f6368', background:'#f8fafc' }}>{h}</div>
            ))}
          </div>
          {[
            ['1','Acme Labs', '✓','✓','✓','done','-'],
            ['2','Northwind Co.', '✓','•','×','chasing','2d'],
            ['3','Initech',     '•','×','×','chasing','5d'],
            ['4','Globex',      '✓','✓','•','chasing','1d'],
            ['5','Hooli',       '×','×','×','just added','—'],
          ].map((row, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'28px repeat(6, 1fr)', fontSize:12.5, borderBottom:'1px solid #f0f2f5', background: i===1?'#fff5c9':'#fff' }}>
              {row.map((c, j) => (
                <div key={j} style={{ padding:'9px 10px', borderRight: j<6?'1px solid #f0f2f5':'none', color: c==='×'?'#c53030': c==='✓'?'#22863a': c==='•'?'#b45309':'#111' }}>{c}</div>
              ))}
            </div>
          ))}
          {/* highlight cursor */}
          <div style={{ position:'absolute', top:108, left:280, padding:'3px 8px', background:'#1a73e8', color:'#fff', fontSize:10, fontFamily:'var(--mono)', borderRadius:4 }}>MARTA'S CURSOR</div>
        </div>

        {/* AI caption */}
        <div style={{
          position:'absolute', left:'50%', transform:'translateX(-50%)', bottom:150,
          padding:'12px 18px', background:'rgba(0,0,0,0.75)', border:'1px solid rgba(255,255,255,0.1)',
          borderRadius:10, fontSize:14, maxWidth:620, textAlign:'center', lineHeight:1.4,
        }}>
          "Walk me through what you do when one of them hits 5 days without a reply."
        </div>

        {/* video tiles */}
        <div style={{ position:'absolute', right:20, bottom:20, display:'flex', gap:10 }}>
          <div style={{ width:180, height:120, borderRadius:12, background:'#1a1a1a', border:'1px solid rgba(255,255,255,0.12)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 40% 40%, oklch(0.65 0.18 148), oklch(0.28 0.08 148) 75%)' }}/>
            <div style={{ position:'absolute', left:8, bottom:8, fontFamily:'var(--mono)', fontSize:10, color:'#0e0e0c', padding:'2px 6px', background:'rgba(255,255,255,0.8)', borderRadius:3 }}>ACME · SPEAKING</div>
          </div>
          <div style={{ width:180, height:120, borderRadius:12, background:'#222', border:'1px solid rgba(255,255,255,0.12)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 8px, transparent 8px, transparent 16px)' }}/>
            <div style={{ position:'absolute', left:8, bottom:8, color:'#fff', fontSize:10, fontFamily:'var(--mono)' }}>YOU · MARTA</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stage · Form step
function StageFormPick() {
  return (
    <div style={{ height:'100%', display:'grid', placeItems:'center', padding:40 }}>
      <div style={{ width:640, background:'#fff', color:'#111', borderRadius:18, padding:'30px 34px', boxShadow:'0 30px 80px -20px rgba(0,0,0,0.45)' }}>
        <div style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', letterSpacing:'0.06em', marginBottom:8 }}>STEP 5 · PICK WHICH MATTERED MOST</div>
        <h3 style={{ ...window.APP_SCALE.titleMd, margin:'0 0 14px' }}>
          Of the four, <span className="italic-serif" style={{ color:'var(--ink-3)' }}>which would be the biggest win?</span>
        </h3>
        <p style={{ fontSize:13.5, color:'var(--ink-2)', margin:'0 0 18px', lineHeight:1.5 }}>
          Rank these. We'll probe the top one back in voice in the next step.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {[
            ['Fewer document chases',        1, 'Auto-reminders + proof of upload'],
            ['Single-pane vendor status',    2, 'One dashboard across W-9, COI, NDA'],
            ['Faster internal approvals',    3, 'Skip the Slack ping-pong'],
            ['Better forecast of who\'s ready', 4, 'Predict next-week capacity'],
          ].map(([t, rank, d], i) => (
            <div key={t} style={{ display:'grid', gridTemplateColumns:'44px 1fr 100px', gap:12, alignItems:'center', padding:'12px 14px', border:'1px solid var(--line)', borderRadius:10, background: rank===1?'var(--accent-soft)':'var(--bg-elev)' }}>
              <div style={{ width:30, height:30, borderRadius:8, background: rank===1?'var(--accent-ink)':'var(--chip)', color: rank===1?'var(--bg)':'var(--ink)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:13, fontWeight:500 }}>{rank}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:500 }}>{t}</div>
                <div className="meta" style={{ marginTop:2, textTransform:'none', letterSpacing:0 }}>{d}</div>
              </div>
              <div style={{ display:'flex', gap:4, justifyContent:'flex-end' }}>
                <button style={{ padding:'6px 8px', border:'1px solid var(--line)', borderRadius:6, background:'var(--bg)', fontSize:11 }}>▲</button>
                <button style={{ padding:'6px 8px', border:'1px solid var(--line)', borderRadius:6, background:'var(--bg)', fontSize:11 }}>▼</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:20, padding:12, background:'var(--bg)', border:'1px dashed var(--line-2)', borderRadius:10, fontSize:12.5, color:'var(--ink-2)', display:'grid', gridTemplateColumns:'auto 1fr', gap:10, alignItems:'center' }}>
          <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--accent-ink)' }}>● AI WILL ASK</span>
          <span style={{ fontStyle:'italic' }}>"You put 'fewer chases' on top — why that over the others?"</span>
        </div>

        <div style={{ marginTop:22, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:12, color:'var(--ink-3)' }}>Auto-saved · step 5 of 7</span>
          <div style={{ display:'flex', gap:8 }}>
            <button className="ghost" onClick={() => window.location.href='P11f Builder View.html'} style={{ padding:'8px 14px', fontSize:13 }}>Skip this step</button>
            <button className="primary" onClick={() => window.location.href='P11f Builder View.html'} style={{ padding:'8px 18px', fontSize:13 }}>Save & continue →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenAgendaIntro()   { return <AgendaShell currentIdx={0} screenLabel="11c Agenda · Step 1 · Intro (voice)" nextHref="P11d Agenda Video.html"><StageIntroVoice/></AgendaShell>; }
function ScreenAgendaVideoQ()  { return <AgendaShell currentIdx={2} screenLabel="11d Agenda · Step 3 · Video · screenshare walkthrough" nextHref="P11e Agenda Form.html"><StageQ2Video/></AgendaShell>; }
function ScreenAgendaForm()    { return <AgendaShell currentIdx={4} screenLabel="11e Agenda · Step 5 · Form · rank priorities" nextHref="P11f Builder View.html"><StageFormPick/></AgendaShell>; }

// ─────────────────────────────────────────────────────────
// 11f · Operator flow builder view — shows the same agenda
//     as steps in the flow editor, proving the ops→participant
//     parity.
// ─────────────────────────────────────────────────────────
function ScreenBuilderAgenda() {
  return (
    <AppFrame active="builder" screenLabel="11f Operator · Flow builder shows the same agenda"
      crumbs={['comms.app','flows','vendor-onboarding-research-q2','edit']}
      topRight={<>
        <span className="meta" style={{ marginRight:10 }}>v0.8 · DRAFT</span>
        <Btn variant="subtle">Preview as participant</Btn>
        <Btn variant="primary">Publish →</Btn>
      </>}>
      <div style={{ height:'100%', display:'grid', gridTemplateColumns:'240px 1fr 320px', minWidth:0 }}>
        {/* reuse palette feel */}
        <div style={{ borderRight:'1px solid var(--line)', padding:14 }}>
          <div className="meta" style={{ marginBottom:10 }}>BLOCKS · DRAG INTO AGENDA</div>
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {[['Say','◐'],['Ask','◑'],['Video clip','▷'],['Form','▤'],['Doc','≡'],['Choose','◒'],['Collect','□'],['Sign','✎'],['Branch','◇'],['Handoff','↗']].map(([n, g]) => (
              <div key={n} style={{ padding:'8px 10px', border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-elev)', fontSize:13, display:'grid', gridTemplateColumns:'22px 1fr', gap:8, cursor:'grab' }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-3)' }}>{g}</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* agenda list */}
        <div className="grid-bg soft" style={{ overflow:'auto', padding:'20px 28px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div>
              <div className="meta">AGENDA · vendor-onboarding-research-q2</div>
              <div style={{ fontSize:18, fontWeight:500, marginTop:4 }}>7 steps · est. 11 min</div>
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <Btn variant="subtle">+ Section</Btn>
              <Btn variant="subtle">Reorder</Btn>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:620, margin:'0 auto' }}>
            {AGENDA.map((a, i) => (
              <React.Fragment key={a.k}>
                <div style={{
                  display:'grid', gridTemplateColumns:'28px 1fr auto',
                  gap:12, padding:14, border:'1px solid ' + (i===2?'var(--ink)':'var(--line)'),
                  background:'var(--bg-elev)', borderRadius:12,
                  boxShadow: i===2?'0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)':'none',
                  alignItems:'center',
                }}>
                  <span style={{ width:26, height:26, borderRadius:'50%', background:'var(--chip)', color:'var(--ink)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:12, fontWeight:500 }}>{i+1}</span>
                  <div>
                    <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:4 }}>
                      <span className="chip" style={{ background: a.modality==='video'?'var(--accent-soft)':'var(--chip)', color: a.modality==='video'?'var(--accent-ink)':'var(--ink-2)' }}>{modGlyph(a.modality)} {a.modality.toUpperCase()}</span>
                      <span style={{ fontSize:14.5, fontWeight:500 }}>{a.title}</span>
                    </div>
                    <div className="meta" style={{ textTransform:'none', letterSpacing:0 }}>{a.hint}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <span className="meta">{a.eta.toUpperCase()}</span>
                    <div style={{ marginTop:6, display:'flex', gap:4, justifyContent:'flex-end' }}>
                      <button style={{ width:22, height:22, borderRadius:5, border:'1px solid var(--line)', background:'var(--bg)', fontSize:10 }}>⠿</button>
                      <button style={{ width:22, height:22, borderRadius:5, border:'1px solid var(--line)', background:'var(--bg)', fontSize:10 }}>⋯</button>
                    </div>
                  </div>
                </div>
                {i < AGENDA.length - 1 && (
                  <div style={{ display:'grid', placeItems:'center', height:12 }}>
                    <div style={{ width:1, height:12, background:'var(--line-2)' }}/>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* inspector */}
        <div style={{ borderLeft:'1px solid var(--line)', padding:20, overflow:'auto' }}>
          <div className="meta" style={{ marginBottom:10, color:'var(--ink-2)' }}>INSPECTOR · STEP 3</div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:16, fontWeight:500 }}>Show us your current workflow</div>
            <Pill tone="accent">▢ VIDEO + SCREEN</Pill>
          </div>

          <div className="meta" style={{ marginBottom:4 }}>PROMPT</div>
          <div style={{ padding:10, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)', fontSize:13, color:'var(--ink-2)', lineHeight:1.5 }}>
            "I'd love to see what you use today. Can you share your screen and walk me through it — even if it's a spreadsheet?"
          </div>

          <div className="meta" style={{ marginTop:16, marginBottom:4 }}>PROBES · ADAPTIVE</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, fontSize:12.5 }}>
            {[
              '"What happens when one goes stale?"',
              '"Who else on your team sees this?"',
              '"Where do you go when this breaks?"',
            ].map((p, i) => <div key={i} style={{ padding:'6px 10px', border:'1px dashed var(--line-2)', borderRadius:6, color:'var(--ink-2)', fontStyle:'italic' }}>{p}</div>)}
          </div>

          <div className="meta" style={{ marginTop:16, marginBottom:4 }}>IF BANDWIDTH {'<'} 2 MBPS</div>
          <div style={{ fontSize:12.5, color:'var(--ink-2)', lineHeight:1.5 }}>Auto-downgrade to audio + photo upload.</div>

          <div className="meta" style={{ marginTop:16, marginBottom:4 }}>TIME BUDGET</div>
          <div style={{ padding:8, border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-elev)', display:'flex', justifyContent:'space-between', fontSize:12 }}>
            <span>Soft 3 min · hard 5 min</span>
            <span className="meta">↔</span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, {
  ScreenLinkLanding,
  ScreenLinkGate,
  ScreenAgendaIntro,
  ScreenAgendaVideoQ,
  ScreenAgendaForm,
  ScreenBuilderAgenda,
});
