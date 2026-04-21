// ============================================================
// Magic V1 — Simplified Enterprise app.
// Same AppFrame chrome (sidebar + top bar) but with only 3 nav
// items: Builder, Conversations, People.
//
// Components:
//   MagicSidebar, MagicFrame
//   ScreenMagicBuilder  (voice → edit → share)
//   ScreenMagicConversations (list + detail)
//   ScreenMagicPeople (directory + person panel)
// ============================================================

const { useState, useEffect, useRef } = React;

// ── Nav mapping ──
const MAGIC_NAV_HREF = {
  builder:       'Magic Builder.html',
  conversations: 'Magic Conversations.html',
  people:        'Magic People.html',
};

// ── MagicSidebar ──
function MagicSidebar({ active = 'builder' }) {
  const items = [
    ['builder',       'Builder',       '\u2726'],
    ['conversations', 'Conversations', '\u25EB'],
    ['people',        'People',        '\u25C9'],
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
            Harbor &middot; production
          </div>
          <div className="meta" style={{ fontSize: 10 }}>PLAN &middot; TEAM &middot; 14 SEATS</div>
        </div>
        <span className="meta" style={{ fontSize: 10 }}>&udarr;</span>
      </button>

      {/* primary nav */}
      <nav style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div className="meta" style={{ padding: '6px 10px 4px' }}>WORKSPACE</div>
        {items.map(([k, label, glyph]) => (
          <MagicNavItem key={k} k={k} active={active === k} label={label} glyph={glyph} />
        ))}
      </nav>

      <div style={{ flex: 1 }} />

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
        <span className="meta" style={{ fontSize: 10 }}>&ctdot;</span>
      </div>
    </aside>
  );
}

function MagicNavItem({ k, active, label, glyph }) {
  return (
    <a href={MAGIC_NAV_HREF[k] || '#'} style={{
      display: 'grid', gridTemplateColumns: '22px 1fr auto',
      alignItems: 'center', gap: 10,
      padding: '7px 10px', borderRadius: 7,
      background: active ? 'var(--bg-elev)' : 'transparent',
      color: active ? 'var(--ink)' : 'var(--ink-2)',
      fontSize: 13, fontWeight: active ? 500 : 400,
      border: active ? '1px solid var(--line)' : '1px solid transparent',
      boxShadow: active ? '0 1px 0 rgba(0,0,0,0.02)' : 'none',
      textDecoration: 'none',
    }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 11,
        color: active ? 'var(--accent-ink)' : 'var(--ink-3)',
      }}>{glyph}</span>
      <span>{label}</span>
      {active && <span className="meta" style={{ fontSize: 9 }}>&bull;</span>}
    </a>
  );
}

// ── MagicTopBar (same as enterprise TopBar but no search/notifications) ──
function MagicTopBar({ crumbs = [], right }) {
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
        <div style={{
          width: 26, height: 26, borderRadius: '50%', background: 'var(--chip)',
          display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)',
          fontSize: 11, fontWeight: 500, color: 'var(--ink-2)',
        }}>EK</div>
      </div>
    </header>
  );
}

// ── MagicFrame ──
function MagicFrame({ active, crumbs, children, topRight, screenLabel }) {
  const standalone = typeof document !== 'undefined' && document.documentElement.dataset.standalone === '1';
  const sizing = standalone
    ? { width: '100%', height: '100vh', borderRadius: 0, border: 0 }
    : { width: 1280, height: 820, borderRadius: 10, border: '1px solid var(--line)' };
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
      <MagicSidebar active={active}/>
      <div style={{ display: 'grid', gridTemplateRows: '52px 1fr', minWidth: 0 }}>
        <MagicTopBar crumbs={crumbs} right={topRight}/>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Waveform helper (local) ──
function MagicWaveform({ bars = 20, barWidth = 3, color = 'var(--accent)', maxH = 28, width, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
      width: width || 'auto', ...(style || {}),
    }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = Math.sin(i * 0.5) * 12 + Math.random() * 8 + 8;
        return (
          <div key={i} style={{
            width: barWidth, borderRadius: 2, background: color,
            height: Math.min(h, maxH),
            animation: `waveform-bar 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
          }} />
        );
      })}
    </div>
  );
}


// ════════════════════════════════════════════════════════════════
// SCREEN 1: ScreenMagicBuilder
// ════════════════════════════════════════════════════════════════

function ScreenMagicBuilder() {
  const [phase, setPhase] = useState('voice');  // voice | edit | share
  const [convoStep, setConvoStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);
  const [editingStep, setEditingStep] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const threadRef = useRef(null);
  const intervalRef = useRef(null);

  // Voice conversation turns
  const voiceConvo = [
    { who: 'comms', text: "Hi! Tell me what you need. What are you trying to collect or find out from people?" },
    { who: 'you', text: "I need to onboard new contractors \u2014 collect their W-9, insurance cert, and get an NDA signed." },
    { who: 'comms', text: "Got it. Three documents plus a signature. Should I add a welcome intro and summary at the end?" },
    { who: 'you', text: "Yes." },
    { who: 'comms', text: "How many follow-up reminders if someone doesn\u2019t respond?" },
    { who: 'you', text: "Three times." },
    { who: 'comms', text: "Perfect. I\u2019ll build a 6-step onboarding conversation with 3 follow-ups.", final: true },
  ];

  const timelineSteps = [
    { title: 'Welcome & introduction', desc: 'Voice greeting \u00b7 AI explains what they\u2019ll complete', type: 'greeting' },
    { title: 'Government ID', desc: 'Document upload \u00b7 Photo with verification', type: 'doc', required: true },
    { title: 'W-9 form', desc: 'Document upload \u00b7 PDF or photo with OCR', type: 'doc', required: true },
    { title: 'Insurance certificate', desc: 'Document upload \u00b7 Coverage verification', type: 'doc', required: true },
    { title: 'NDA agreement', desc: 'E-signature \u00b7 Non-disclosure agreement', type: 'esign', required: true },
    { title: 'Confirmation', desc: 'Summary \u00b7 Everything submitted + next steps', type: 'summary' },
  ];

  // Auto-scroll thread
  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [convoStep]);

  // Auto-cycle phone preview in edit state
  useEffect(() => {
    if (phase === 'edit') {
      intervalRef.current = setInterval(() => setPreviewStep(p => (p + 1) % 6), 3000);
      return () => clearInterval(intervalRef.current);
    }
  }, [phase]);

  // Auto-advance comms turns after user turn
  useEffect(() => {
    if (phase === 'voice' && convoStep > 0) {
      const current = voiceConvo[convoStep];
      if (current?.who === 'you' && convoStep + 1 < voiceConvo.length) {
        const t = setTimeout(() => setConvoStep(s => s + 1), 600);
        return () => clearTimeout(t);
      }
    }
  }, [convoStep, phase]);

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      const next = convoStep + 1;
      if (next < voiceConvo.length) {
        setConvoStep(next);
        if (voiceConvo[next]?.who === 'you') {
          setTimeout(() => { if (next + 1 < voiceConvo.length) setConvoStep(next + 1); }, 800);
        } else {
          setTimeout(() => { if (next + 1 < voiceConvo.length) setConvoStep(next + 1); }, 800);
        }
      }
    } else {
      setIsRecording(true);
    }
  };

  // Quick-start templates
  const templates = [
    'Contractor onboarding',
    'NPS survey',
    'Client intake',
  ];

  // Phone preview content
  const phoneContent = (step) => {
    const s = timelineSteps[step];
    if (!s) return null;
    if (s.type === 'greeting') return (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 600 }}>C</div>
          <MagicWaveform bars={10} barWidth={2} maxH={14} color="var(--accent)" />
        </div>
        <p style={{ fontSize: 11, color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>Hi! Welcome to your contractor onboarding. I'll walk you through a few quick steps...</p>
        <button style={{ background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 999, padding: '6px 16px', fontSize: 11, fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>Continue</button>
      </div>
    );
    if (s.type === 'doc') return (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ fontSize: 11, color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>Please upload your {s.title.toLowerCase()}</p>
        <div style={{ border: '2px dashed var(--line)', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>Tap to upload</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--accent-soft)', borderRadius: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontSize: 10, color: 'var(--accent-ink)' }}>document_validated.pdf</span>
        </div>
      </div>
    );
    if (s.type === 'esign') return (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: 'var(--chip)', borderRadius: 6, padding: 12, minHeight: 60 }}>
          <div style={{ fontSize: 9, color: 'var(--ink-4)', fontFamily: 'var(--mono)', marginBottom: 6 }}>NDA PREVIEW</div>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', lineHeight: 1.6 }}>This Non-Disclosure Agreement is entered into by and between...</div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10 }}>
          <div style={{ fontSize: 9, color: 'var(--ink-4)', fontFamily: 'var(--mono)', marginBottom: 6 }}>SIGNATURE</div>
          <div style={{ border: '1px solid var(--line)', borderRadius: 6, padding: 12, minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, color: 'var(--ink-4)' }}>Tap to sign</span>
          </div>
        </div>
      </div>
    );
    if (s.type === 'summary') return (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
        <svg width="28" height="28" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="var(--accent-soft)"/><path d="M10 16l4 4 8-8" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', margin: 0 }}>All done!</p>
        <p style={{ fontSize: 10, color: 'var(--ink-3)', margin: 0, lineHeight: 1.5 }}>Your documents have been submitted.</p>
      </div>
    );
    return null;
  };

  // ── PHASE: VOICE ──
  if (phase === 'voice') {
    const visibleTurns = voiceConvo.slice(0, convoStep + 1);
    const currentTurn = voiceConvo[convoStep];
    const waitingForUser = currentTurn?.who === 'comms' && !currentTurn?.final;
    const showBuild = currentTurn?.final;

    return (
      <MagicFrame active="builder" crumbs={['Magic', 'Builder']} screenLabel="Magic Builder">
        <div style={{ height: '100%', background: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 40px' }}>
            <div style={{ maxWidth: 520, width: '100%' }}>
              {/* Heading */}
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h1 style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: '0 0 8px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                  What conversation do you want to create?
                </h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.5 }}>
                  Talk to me &mdash; describe what you need from your participants
                </p>
              </div>

              {/* Template shortcuts */}
              {convoStep === 0 && (
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28, animation: 'fade-up 0.4s ease both' }}>
                  {templates.map((t, i) => (
                    <button key={i} style={{
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 999, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.5)',
                      cursor: 'pointer', fontFamily: 'var(--sans)',
                    }}>{t}</button>
                  ))}
                </div>
              )}

              {/* Thread */}
              <div ref={threadRef} style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28, paddingRight: 8 }}>
                {visibleTurns.map((turn, i) => (
                  <div key={i} style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: turn.who === 'you' ? 'flex-end' : 'flex-start',
                    animation: 'fade-up 0.4s ease both',
                    animationDelay: `${i * 0.05}s`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, maxWidth: '85%', flexDirection: turn.who === 'you' ? 'row-reverse' : 'row' }}>
                      {turn.who === 'comms' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, paddingTop: 2 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                          {i === visibleTurns.length - 1 && turn.who === 'comms' && (
                            <MagicWaveform bars={5} barWidth={2} maxH={12} color="var(--accent)" />
                          )}
                        </div>
                      )}
                      <div style={{
                        fontSize: 14, lineHeight: 1.55, color: turn.who === 'comms' ? 'rgba(255,255,255,0.85)' : '#fff',
                        background: turn.who === 'you' ? 'rgba(255,255,255,0.08)' : 'transparent',
                        padding: turn.who === 'you' ? '8px 14px' : '4px 0',
                        borderRadius: turn.who === 'you' ? 14 : 0,
                      }}>
                        {turn.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mic / Build button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                {showBuild ? (
                  <button onClick={() => setPhase('edit')} style={{
                    background: '#fff', color: 'var(--ink)', border: 'none', borderRadius: 999,
                    padding: '11px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    fontFamily: 'var(--sans)', letterSpacing: '-0.005em',
                    animation: 'fade-up 0.5s ease both',
                  }}>
                    Build it &rarr;
                  </button>
                ) : waitingForUser ? (
                  <>
                    <button onClick={handleMicClick} className={isRecording ? 'breathe' : ''} style={{
                      width: 56, height: 56, borderRadius: '50%', border: 'none',
                      background: 'var(--accent)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isRecording ? (
                        <MagicWaveform bars={8} barWidth={3} color="#fff" maxH={18} />
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <rect x="9" y="2" width="6" height="12" rx="3" fill="#fff"/>
                          <path d="M5 10a7 7 0 0014 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="12" y1="17" x2="12" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>
                      {isRecording ? 'Spacebar or tap to send' : 'Spacebar or tap to respond'}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </MagicFrame>
    );
  }

  // ── PHASE: EDIT ──
  if (phase === 'edit') {
    return (
      <MagicFrame active="builder" crumbs={['Magic', 'Builder', 'Edit']} screenLabel="Magic Builder"
        topRight={
          <button onClick={() => { setPhase('voice'); setConvoStep(0); setIsRecording(false); }} style={{
            background: 'none', border: 'none', fontSize: 12, color: 'var(--ink-3)', cursor: 'pointer', fontFamily: 'var(--sans)',
          }}>&larr; Start over</button>
        }
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>
            {/* Left — Timeline */}
            <div style={{ padding: '16px 24px 80px', overflowY: 'auto', borderRight: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 12 }}>CONVERSATION STEPS</div>
              {timelineSteps.map((step, i) => (
                <div key={i}>
                  <div
                    onClick={() => { setPreviewStep(i); setEditingStep(editingStep === i ? null : i); }}
                    style={{ padding: '12px 0', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start' }}
                  >
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-4)', minWidth: 18, paddingTop: 2 }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{step.title}</span>
                        {step.required && (
                          <span style={{ fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--ink-3)', letterSpacing: '0.06em', background: 'var(--chip)', padding: '2px 7px', borderRadius: 4 }}>REQUIRED</span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.4 }}>{step.desc}</div>
                      {editingStep === i && (
                        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, animation: 'fade-up 0.3s ease both' }}>
                          <input defaultValue={step.title} style={{ fontFamily: 'var(--sans)', fontSize: 13, padding: '7px 10px', border: '1px solid var(--line)', borderRadius: 7, background: 'var(--bg-elev)', color: 'var(--ink)', outline: 'none' }} />
                          <textarea defaultValue={step.desc} rows={2} style={{ fontFamily: 'var(--sans)', fontSize: 12, padding: '7px 10px', border: '1px solid var(--line)', borderRadius: 7, background: 'var(--bg-elev)', color: 'var(--ink)', outline: 'none', resize: 'vertical' }} />
                        </div>
                      )}
                    </div>
                  </div>
                  {i < timelineSteps.length - 1 && <div style={{ height: 1, background: 'var(--line)', marginLeft: 30 }} />}
                </div>
              ))}
              <button style={{ marginTop: 10, marginLeft: 30, background: 'none', border: 'none', fontSize: 12, color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--sans)', padding: 0 }}>+ Add a step</button>
            </div>

            {/* Right — Phone preview */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--chip)', padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 240, height: 420, background: '#1a1a1a', borderRadius: 24, padding: 6,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                }}>
                  <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '8px 14px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 9, fontWeight: 600 }}>9:41</span>
                      <div style={{ display: 'flex', gap: 3 }}>
                        <div style={{ width: 12, height: 7, border: '1px solid var(--ink-3)', borderRadius: 2 }}><div style={{ width: '70%', height: '100%', background: 'var(--ink)', borderRadius: 1 }} /></div>
                      </div>
                    </div>
                    <div style={{ padding: '3px 14px 6px', borderBottom: '1px solid var(--line)' }}>
                      <div style={{ fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--ink-4)', letterSpacing: '0.04em' }}>STEP {previewStep + 1} OF 6</div>
                      <div style={{ fontSize: 12, fontWeight: 500, marginTop: 1 }}>{timelineSteps[previewStep]?.title}</div>
                    </div>
                    <div style={{ flex: 1, overflow: 'auto' }}>
                      {phoneContent(previewStep)}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {timelineSteps.map((_, i) => (
                    <div key={i} onClick={() => setPreviewStep(i)} style={{
                      width: previewStep === i ? 14 : 5, height: 5, borderRadius: 3,
                      background: previewStep === i ? 'var(--accent)' : 'var(--line-2)',
                      cursor: 'pointer', transition: 'all 0.3s ease',
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid var(--line)', padding: '10px 24px', display: 'flex', justifyContent: 'flex-end', background: 'var(--bg)', flexShrink: 0 }}>
            <button onClick={() => setPhase('share')} style={{
              background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 999,
              padding: '9px 22px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--sans)',
            }}>
              Share &rarr;
            </button>
          </div>
        </div>
      </MagicFrame>
    );
  }

  // ── PHASE: SHARE ──
  if (phase === 'share') {
    // Celebration overlay
    if (showCelebration) {
      return (
        <MagicFrame active="builder" crumbs={['Magic', 'Builder', 'Sent!']} screenLabel="Magic Builder">
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
            <svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="28" fill="var(--accent-soft)"/><path d="M18 28l7 7 13-13" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: 'draw-check 0.6s ease both' }}/></svg>
            <div style={{ fontSize: 20, fontWeight: 500, color: 'var(--ink)' }}>Conversation sent!</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>15 people will receive your conversation shortly.</div>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-4)' }}>Redirecting to conversations...</div>
          </div>
        </MagicFrame>
      );
    }

    return (
      <MagicFrame active="builder" crumbs={['Magic', 'Builder', 'Share']} screenLabel="Magic Builder"
        topRight={
          <button onClick={() => setPhase('edit')} style={{
            background: 'none', border: 'none', fontSize: 12, color: 'var(--ink-3)', cursor: 'pointer', fontFamily: 'var(--sans)',
          }}>&larr; Back to edit</button>
        }
      >
        {/* Slide-in share panel from right */}
        <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 400px' }}>
          {/* Left: context / preview */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--chip)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-4)', letterSpacing: '0.06em', marginBottom: 8 }}>READY TO SHARE</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>Contractor onboarding</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>6 steps &middot; 3 follow-ups</div>
            </div>
          </div>

          {/* Right: share panel */}
          <div style={{ borderLeft: '1px solid var(--line)', background: 'var(--bg-elev)', padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', animation: 'slide-in-right 0.4s ease both' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 16 }}>SHARE</div>

            {/* Copy link */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Share a link</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <input readOnly value="https://comms.ai/c/abc123" style={{
                  flex: 1, fontFamily: 'var(--mono)', fontSize: 12, padding: '8px 12px',
                  border: '1px solid var(--line)', borderRadius: 8, background: 'var(--bg)',
                  color: 'var(--ink)', outline: 'none',
                }} />
                <button onClick={() => { setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); }} style={{
                  background: 'var(--chip)', border: '1px solid var(--line)', borderRadius: 8,
                  padding: '8px 14px', fontSize: 12, cursor: 'pointer', color: 'var(--ink-2)',
                  fontFamily: 'var(--sans)', whiteSpace: 'nowrap',
                }}>
                  {linkCopied ? '\u2713 Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--line)', margin: '4px 0 16px' }} />

            {/* Email recipients */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Email recipients</div>
              <textarea rows={3} defaultValue={"maria@harbor.co\njordan@harbor.co\nashley@harbor.co"} style={{
                width: '100%', fontFamily: 'var(--mono)', fontSize: 12, padding: '8px 12px',
                border: '1px solid var(--line)', borderRadius: 8, background: 'var(--bg)',
                color: 'var(--ink)', outline: 'none', resize: 'vertical', boxSizing: 'border-box',
              }} />
              <button style={{
                marginTop: 6, background: 'transparent', border: '1px solid var(--line)',
                borderRadius: 999, padding: '5px 12px', fontSize: 11, color: 'var(--ink-3)',
                cursor: 'pointer', fontFamily: 'var(--sans)',
              }}>Upload CSV</button>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', marginBottom: 6, letterSpacing: '0.04em' }}>SUBJECT</div>
              <input defaultValue="Your onboarding session is ready" style={{
                width: '100%', fontSize: 13, padding: '8px 12px',
                border: '1px solid var(--line)', borderRadius: 8, background: 'var(--bg)',
                color: 'var(--ink)', outline: 'none', fontFamily: 'var(--sans)', boxSizing: 'border-box',
              }} />
            </div>

            {/* Body */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', marginBottom: 6, letterSpacing: '0.04em' }}>BODY</div>
              <textarea rows={4} defaultValue={"Hi {{name}},\n\nPlease complete your contractor onboarding at your earliest convenience. It should take about 5 minutes.\n\nThank you!"} style={{
                width: '100%', fontSize: 13, padding: '8px 12px',
                border: '1px solid var(--line)', borderRadius: 8, background: 'var(--bg)',
                color: 'var(--ink)', outline: 'none', fontFamily: 'var(--sans)', boxSizing: 'border-box',
                resize: 'vertical', lineHeight: 1.5,
              }} />
            </div>

            {/* Follow-ups */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', marginBottom: 6, letterSpacing: '0.04em' }}>FOLLOW-UPS</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Remind</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', background: 'var(--chip)', padding: '3px 8px', borderRadius: 4 }}>3 times</span>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>every</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', background: 'var(--chip)', padding: '3px 8px', borderRadius: 4 }}>2 days</span>
              </div>
            </div>

            <div style={{ flex: 1 }} />

            {/* Send button */}
            <button onClick={() => { setShowCelebration(true); }} style={{
              width: '100%', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 999,
              padding: '11px 24px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--sans)',
            }}>
              Send to 15 people
            </button>
          </div>
        </div>
      </MagicFrame>
    );
  }

  return null;
}


// ════════════════════════════════════════════════════════════════
// SCREEN 2: ScreenMagicConversations
// ════════════════════════════════════════════════════════════════

function ScreenMagicConversations() {
  const [selected, setSelected] = useState(0);
  const [expandedResponse, setExpandedResponse] = useState(null);

  const conversations = [
    { id: 0, title: 'Contractor onboarding', complete: 12, total: 15, ago: '2h ago', dotColor: 'var(--accent)' },
    { id: 1, title: 'Q2 NPS survey', complete: 45, total: 60, ago: 'Yesterday', dotColor: 'var(--accent)' },
    { id: 2, title: 'Client intake \u2014 Acme', complete: 3, total: 3, ago: '3 days ago', dotColor: 'oklch(0.62 0.17 148)' },
    { id: 3, title: 'Employee handbook ack', complete: 8, total: 20, ago: '1 week ago', dotColor: 'oklch(0.66 0.17 45)' },
  ];

  // Detail data for the first conversation (selected by default)
  const detailData = {
    0: {
      summary: '<strong>12 of 15 participants</strong> completed the contractor onboarding conversation. Average completion time was <strong>4 minutes 32 seconds</strong>. All 12 submitted their government ID and W-9 form successfully. <strong>10 out of 12 signed the NDA</strong> \u2014 2 participants (Ashley Tran, Devon Park) started the signature step but didn\u2019t complete it. The insurance certificate step had the highest friction: 3 participants needed to retry their upload due to image quality issues. <strong>Key insight:</strong> participants who used voice responses completed 40% faster than those who typed. Jordan Reyes and Maria Chen haven\u2019t opened their invitation emails \u2014 recommend a phone follow-up.',
      stats: [
        { value: '12/15', label: 'Completed', accent: true },
        { value: '4m 32s', label: 'Avg time' },
        { value: '93%', label: 'Validation rate' },
        { value: '10/12', label: 'NDAs signed' },
      ],
      actions: [
        'Send reminder to Jordan Reyes and Maria Chen (haven\u2019t started)',
        'Follow up with Ashley Tran (NDA unsigned)',
        'Review Nina Patel\u2019s insurance cert (flagged for coverage amount)',
      ],
      themes: [
        { label: 'Fastest step: Government ID', detail: 'avg 45 seconds', width: '90%' },
        { label: 'Slowest step: Insurance certificate', detail: 'avg 2 min 10 sec', width: '40%' },
        { label: 'Most questions: NDA terms', detail: '4 asked follow-ups', width: '30%' },
      ],
      responses: [
        { name: 'Mar\u00eda Ortega', initials: 'MO', status: 'Complete', time: '3m 48s', detail: 'All 4 docs + NDA signed', ago: '2h ago' },
        { name: 'Devin Park', initials: 'DP', status: 'Complete', time: '5m 12s', detail: 'Insurance cert needed retry', ago: '3h ago' },
        { name: 'Aisha Bello', initials: 'AB', status: 'Complete', time: '4m 01s', detail: 'All validated first try', ago: '5h ago' },
        { name: 'Jordan Reyes', initials: 'JR', status: 'Not started', time: null, detail: 'Email sent \u00b7 2 reminders', ago: '1d ago' },
        { name: 'Ashley Tran', initials: 'AT', status: 'Partial', time: null, detail: 'Stopped at NDA', ago: '6h ago' },
      ],
    },
    1: {
      summary: '\u003Cstrong\u003E45 of 60 people\u003C/strong\u003E completed the Q2 NPS survey. Average score: 8.4/10. 3 detractors flagged for follow-up.',
      stats: [
        { value: '45/60', label: 'Completed', accent: true },
        { value: '8.4', label: 'Avg NPS' },
        { value: '2m 15s', label: 'Avg time' },
        { value: '3', label: 'Detractors' },
      ],
      actions: [
        'Follow up with 15 non-respondents',
        'Review 3 detractor comments for themes',
      ],
      themes: [
        { label: 'Top praise: Support responsiveness', detail: '18 mentions', width: '85%' },
        { label: 'Top concern: Pricing clarity', detail: '7 mentions', width: '35%' },
      ],
      responses: [
        { name: 'Sam Torres', initials: 'ST', status: 'Complete', time: '1m 42s', detail: 'Score: 9/10', ago: '1d ago' },
        { name: 'Priya Nair', initials: 'PN', status: 'Complete', time: '3m 05s', detail: 'Score: 7/10 · left comment', ago: '1d ago' },
        { name: 'Chris Lam', initials: 'CL', status: 'Not started', time: null, detail: '2 reminders sent', ago: '2d ago' },
      ],
    },
    2: {
      summary: '\u003Cstrong\u003EAll 3 people\u003C/strong\u003E completed client intake for Acme. All documents validated.',
      stats: [
        { value: '3/3', label: 'Completed', accent: true },
        { value: '6m 10s', label: 'Avg time' },
        { value: '100%', label: 'Validation rate' },
        { value: '3/3', label: 'Contracts signed' },
      ],
      actions: ['All items complete \u2014 no action needed'],
      themes: [
        { label: 'Fastest step: Contact info', detail: 'avg 30s', width: '95%' },
        { label: 'Slowest step: SOW review', detail: 'avg 3m', width: '50%' },
      ],
      responses: [
        { name: 'Dana Wu', initials: 'DW', status: 'Complete', time: '5m 48s', detail: 'All validated', ago: '3d ago' },
        { name: 'Tom Barrett', initials: 'TB', status: 'Complete', time: '7m 12s', detail: 'All validated', ago: '3d ago' },
        { name: 'Lin Zhao', initials: 'LZ', status: 'Complete', time: '5m 30s', detail: 'All validated', ago: '3d ago' },
      ],
    },
    3: {
      summary: '\u003Cstrong\u003E8 of 20 people\u003C/strong\u003E acknowledged the employee handbook. 12 haven\u2019t opened the email.',
      stats: [
        { value: '8/20', label: 'Completed', accent: true },
        { value: '1m 45s', label: 'Avg time' },
        { value: '40%', label: 'Open rate' },
        { value: '8/8', label: 'E-signed' },
      ],
      actions: [
        'Resend to 12 who haven\u2019t opened',
        'Escalate to managers of non-respondents',
      ],
      themes: [
        { label: 'PTO policy section', detail: 'most time spent', width: '70%' },
        { label: 'Code of conduct', detail: 'fastest section', width: '90%' },
      ],
      responses: [
        { name: 'Riley Kim', initials: 'RK', status: 'Complete', time: '2m 01s', detail: 'E-signed', ago: '1w ago' },
        { name: 'Morgan Hill', initials: 'MH', status: 'Not started', time: null, detail: 'Email unopened', ago: '1w ago' },
      ],
    },
  };

  const detail = detailData[selected] || detailData[0];
  const conv = conversations[selected];

  const statusChip = (status) => {
    const isComplete = status === 'Complete';
    const isPartial = status === 'Partial';
    return {
      bg: isComplete ? 'var(--accent-soft)' : isPartial ? '#fef3c7' : 'var(--chip)',
      fg: isComplete ? 'var(--accent-ink)' : isPartial ? '#92400e' : 'var(--ink-3)',
    };
  };

  return (
    <MagicFrame active="conversations" crumbs={['Magic', 'Conversations']} screenLabel="Magic Conversations">
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '340px 1fr', minHeight: 0 }}>
        {/* Left — conversation list */}
        <div style={{ borderRight: '1px solid var(--line)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Conversations</div>
            <a href="Magic Builder.html" style={{
              fontSize: 12, fontWeight: 500, color: 'var(--accent-ink)', background: 'var(--accent-soft)',
              padding: '5px 12px', borderRadius: 999, textDecoration: 'none', border: '1px solid var(--line)',
            }}>New +</a>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => { setSelected(c.id); setExpandedResponse(null); }}
                style={{
                  padding: '14px 16px', cursor: 'pointer',
                  background: selected === c.id ? 'var(--bg-elev)' : 'transparent',
                  borderBottom: '1px solid var(--line)',
                  borderLeft: selected === c.id ? '2px solid var(--accent)' : '2px solid transparent',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{c.title}</span>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.dotColor, flexShrink: 0, marginTop: 5 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{c.complete}/{c.total} complete</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>{c.ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — conversation detail */}
        <div style={{ overflowY: 'auto', padding: '16px 20px 60px', position: 'relative' }}>
          {/* Title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>{conv.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{conv.complete}/{conv.total} complete &middot; {conv.ago}</div>
            </div>
          </div>

          {/* AI Summary */}
          <div style={{ background: 'var(--accent-soft)', borderRadius: 12, padding: 20, marginBottom: 14, animation: 'fade-up 0.4s ease both' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 8 }}>AI SUMMARY</div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', margin: 0 }} dangerouslySetInnerHTML={{ __html: detail.summary }} />
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${detail.stats.length}, 1fr)`, gap: 10, marginBottom: 14, animation: 'fade-up 0.4s ease 0.05s both' }}>
            {detail.stats.map((s, i) => (
              <div key={i} style={{
                background: 'var(--bg-elev)', borderRadius: 10, padding: '12px 14px', textAlign: 'center',
                border: '1px solid var(--line)',
              }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: s.accent ? 'var(--accent)' : 'var(--ink)', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-3)', marginTop: 3, letterSpacing: '0.03em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Action items */}
          <div style={{ border: '1px solid var(--line)', borderRadius: 10, padding: 16, background: 'var(--bg-elev)', marginBottom: 14, animation: 'fade-up 0.4s ease 0.1s both' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 10 }}>SUGGESTED ACTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {detail.actions.map((a, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--ink)', lineHeight: 1.5, cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginTop: 3, accentColor: 'var(--accent)', flexShrink: 0 }} />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conversation Insights */}
          {selected === 0 && (
            <div style={{ border: '1px solid var(--line)', borderRadius: 10, padding: 16, background: 'var(--bg-elev)', marginBottom: 14, animation: 'fade-up 0.4s ease 0.12s both' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 10 }}>AI-GENERATED INSIGHTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Voice completion was 40% faster than text \u2014 consider making voice the default',
                  'Insurance cert uploads had the highest retry rate (25%) \u2014 instructions may need clarification',
                  'NDA signature drop-off correlates with mobile users \u2014 the signature UI may need mobile optimization',
                  'Peak response time: 10am-12pm \u2014 consider sending invites in the morning',
                ].map((insight, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--accent)', fontSize: 11, marginTop: 2, flexShrink: 0 }}>{'\u2726'}</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key themes */}
          {detail.themes && detail.themes.length > 0 && (
            <div style={{ border: '1px solid var(--line)', borderRadius: 10, padding: 16, background: 'var(--bg-elev)', marginBottom: 14, animation: 'fade-up 0.4s ease 0.15s both' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 10 }}>KEY THEMES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {detail.themes.map((t, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{t.label}</span>
                      <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-4)' }}>{t.detail}</span>
                    </div>
                    <div className="metric-bar accent" style={{ height: 5, borderRadius: 999 }}>
                      <i style={{ width: t.width, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Response list */}
          <div style={{ animation: 'fade-up 0.4s ease 0.2s both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>ALL RESPONSES</div>
              <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-4)' }}>{conv.complete} completed</span>
            </div>
            {detail.responses.map((r, i) => {
              const chip = statusChip(r.status);
              const expanded = expandedResponse === i;
              return (
                <div key={i} onClick={() => setExpandedResponse(expanded ? null : i)} style={{
                  border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px', background: 'var(--bg-elev)',
                  marginBottom: 8, cursor: 'pointer',
                  borderColor: expanded ? 'var(--accent)' : 'var(--line)',
                  transition: 'border-color 0.2s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 600, color: 'var(--accent-ink)', flexShrink: 0,
                    }}>{r.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--ink-4)', fontFamily: 'var(--mono)' }}>{r.ago}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>
                        {r.status}{r.time ? ` \u00b7 ${r.time}` : ''} &middot; {r.detail}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.04em',
                      padding: '2px 8px', borderRadius: 999, background: chip.bg, color: chip.fg,
                    }}>{r.status}</span>
                  </div>
                  {expanded && (
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--line)', animation: 'fade-up 0.3s ease both' }}>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.5 }}>
                        "Everything looks good. I've uploaded all my documents and signed the NDA. The process was straightforward."
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ask input — bottom */}
          <div style={{
            position: 'sticky', bottom: 0, paddingTop: 10, paddingBottom: 4, background: 'var(--bg)',
          }}>
            <input placeholder="Ask about this conversation..." style={{
              width: '100%', fontSize: 13, padding: '10px 16px',
              border: '1px solid var(--line)', borderRadius: 999, background: 'var(--bg-elev)',
              color: 'var(--ink)', outline: 'none', fontFamily: 'var(--sans)', boxSizing: 'border-box',
            }} />
          </div>
        </div>
      </div>
    </MagicFrame>
  );
}


// ════════════════════════════════════════════════════════════════
// SCREEN 3: ScreenMagicPeople
// ════════════════════════════════════════════════════════════════

function ScreenMagicPeople() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchVal, setSearchVal] = useState('');

  const people = [
    { name: 'Mar\u00eda Ortega', email: 'maria@harbor.co', lastConvo: 'Contractor onboarding', status: 'Active', company: 'Harbor Logistics', tags: ['Contractor', 'West Coast'],
      history: [
        { title: 'Contractor onboarding', date: 'Dec 12, 2024', status: 'Complete' },
        { title: 'Q2 NPS survey', date: 'Nov 1, 2024', status: 'Complete' },
        { title: 'Safety training', date: 'Sep 15, 2024', status: 'Complete' },
      ],
      docs: [
        { name: 'Government ID', validated: true },
        { name: 'W-9 form', validated: true },
        { name: 'Insurance certificate', validated: true },
        { name: 'NDA agreement', validated: true },
      ],
    },
    { name: 'Devin Park', email: 'devin@harbor.co', lastConvo: 'Contractor onboarding', status: 'Active', company: 'Harbor Logistics', tags: ['Contractor', 'Engineering'],
      history: [
        { title: 'Contractor onboarding', date: 'Dec 12, 2024', status: 'Complete' },
        { title: 'Skills assessment', date: 'Oct 20, 2024', status: 'Complete' },
        { title: 'Equipment checkout', date: 'Oct 5, 2024', status: 'Complete' },
      ],
      docs: [
        { name: 'Government ID', validated: true },
        { name: 'W-9 form', validated: true },
        { name: 'Insurance certificate', validated: false },
        { name: 'NDA agreement', validated: true },
      ],
    },
    { name: 'Aisha Bello', email: 'aisha@harbor.co', lastConvo: 'Contractor onboarding', status: 'Active', company: 'Harbor Logistics', tags: ['Employee', 'Operations'],
      history: [
        { title: 'Contractor onboarding', date: 'Dec 11, 2024', status: 'Complete' },
        { title: 'Employee handbook ack', date: 'Nov 28, 2024', status: 'Complete' },
      ],
      docs: [
        { name: 'Government ID', validated: true },
        { name: 'W-9 form', validated: true },
        { name: 'Insurance certificate', validated: true },
        { name: 'NDA agreement', validated: true },
      ],
    },
    { name: 'Jordan Reyes', email: 'jordan@harbor.co', lastConvo: 'Contractor onboarding', status: 'Pending', company: 'Harbor Logistics', tags: ['Contractor', 'New'],
      history: [
        { title: 'Contractor onboarding', date: 'Dec 12, 2024', status: 'Not started' },
      ],
      docs: [],
    },
    { name: 'Ashley Tran', email: 'ashley@harbor.co', lastConvo: 'Contractor onboarding', status: 'In progress', company: 'Harbor Logistics', tags: ['Contractor', 'Finance'],
      history: [
        { title: 'Contractor onboarding', date: 'Dec 12, 2024', status: 'Partial' },
        { title: 'Q2 NPS survey', date: 'Nov 2, 2024', status: 'Complete' },
        { title: 'Benefits enrollment', date: 'Sep 1, 2024', status: 'Complete' },
      ],
      docs: [
        { name: 'Government ID', validated: true },
        { name: 'W-9 form', validated: true },
        { name: 'Insurance certificate', validated: true },
        { name: 'NDA agreement', validated: false },
      ],
    },
    { name: 'Sam Torres', email: 'sam@harbor.co', lastConvo: 'Q2 NPS survey', status: 'Active', company: 'Harbor Logistics', tags: ['Employee', 'Sales'],
      history: [
        { title: 'Q2 NPS survey', date: 'Nov 1, 2024', status: 'Complete' },
        { title: 'Employee handbook ack', date: 'Oct 15, 2024', status: 'Complete' },
        { title: 'Onboarding', date: 'Aug 10, 2024', status: 'Complete' },
      ],
      docs: [
        { name: 'Employment agreement', validated: true },
        { name: 'Direct deposit form', validated: true },
        { name: 'Emergency contact', validated: true },
        { name: 'Photo ID', validated: true },
      ],
    },
  ];

  const filtered = searchVal
    ? people.filter(p => p.name.toLowerCase().includes(searchVal.toLowerCase()) || p.email.toLowerCase().includes(searchVal.toLowerCase()))
    : people;

  const personStatusChip = (status) => {
    if (status === 'Active') return { bg: 'var(--accent-soft)', fg: 'var(--accent-ink)' };
    if (status === 'Pending') return { bg: 'var(--chip)', fg: 'var(--ink-3)' };
    if (status === 'In progress') return { bg: '#fef3c7', fg: '#92400e' };
    return { bg: 'var(--chip)', fg: 'var(--ink-3)' };
  };

  const sel = selectedPerson !== null ? people[selectedPerson] : null;

  return (
    <MagicFrame active="people" crumbs={['Magic', 'People']} screenLabel="Magic People">
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: sel ? '1fr 360px' : '1fr', minHeight: 0 }}>
        {/* Main table area */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
            <div style={{ fontSize: 16, fontWeight: 500 }}>People</div>
            <input
              placeholder="Search people..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              style={{
                width: 220, fontSize: 13, padding: '7px 14px',
                border: '1px solid var(--line)', borderRadius: 999, background: 'var(--bg-elev)',
                color: 'var(--ink)', outline: 'none', fontFamily: 'var(--sans)',
              }}
            />
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px',
            padding: '10px 20px', borderBottom: '1px solid var(--line)',
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em',
          }}>
            <span>NAME</span>
            <span>EMAIL</span>
            <span>LAST CONVERSATION</span>
            <span>STATUS</span>
          </div>

          {/* Table rows */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map((p, i) => {
              const origIndex = people.indexOf(p);
              const chip = personStatusChip(p.status);
              const isSelected = selectedPerson === origIndex;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPerson(isSelected ? null : origIndex)}
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px',
                    padding: '12px 20px', borderBottom: '1px solid var(--line)',
                    cursor: 'pointer', alignItems: 'center',
                    background: isSelected ? 'var(--bg-elev)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 600, color: 'var(--accent-ink)', flexShrink: 0,
                    }}>{p.name.split(' ').map(n => n[0]).join('')}</div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{p.email}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{p.lastConvo}</span>
                  <span style={{
                    fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.04em',
                    padding: '2px 8px', borderRadius: 999, background: chip.bg, color: chip.fg,
                    justifySelf: 'start',
                  }}>{p.status}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel — person detail */}
        {sel && (
          <div style={{ borderLeft: '1px solid var(--line)', background: 'var(--bg-elev)', overflowY: 'auto', padding: '20px', animation: 'slide-in-right 0.3s ease both' }}>
            {/* Close */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button onClick={() => setSelectedPerson(null)} style={{
                background: 'none', border: 'none', fontSize: 16, color: 'var(--ink-3)', cursor: 'pointer', padding: 0,
              }}>&times;</button>
            </div>

            {/* Avatar + name */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: 'var(--accent-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 600, color: 'var(--accent-ink)', margin: '0 auto 10px',
              }}>{sel.name.split(' ').map(n => n[0]).join('')}</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>{sel.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)', marginTop: 3 }}>{sel.email}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{sel.company}</div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 10 }}>
                {sel.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-3)',
                    padding: '3px 8px', borderRadius: 999, border: '1px solid var(--line)',
                    background: 'var(--bg)', letterSpacing: '0.03em',
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Conversation history */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 10 }}>CONVERSATION HISTORY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sel.history.map((h, j) => {
                  const hChip = h.status === 'Complete' ? { bg: 'var(--accent-soft)', fg: 'var(--accent-ink)' }
                    : h.status === 'Partial' ? { bg: '#fef3c7', fg: '#92400e' }
                    : { bg: 'var(--chip)', fg: 'var(--ink-3)' };
                  return (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', border: '1px solid var(--line)', borderRadius: 8, background: 'var(--bg)' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{h.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'var(--mono)', marginTop: 2 }}>{h.date}</div>
                      </div>
                      <span style={{ fontSize: 9, fontFamily: 'var(--mono)', padding: '2px 7px', borderRadius: 999, background: hChip.bg, color: hChip.fg, letterSpacing: '0.04em' }}>{h.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documents */}
            {sel.docs.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 10 }}>DOCUMENTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {sel.docs.map((d, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', border: '1px solid var(--line)', borderRadius: 8, background: 'var(--bg)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.validated ? 'var(--accent)' : '#ef4444' }} />
                      <span style={{ fontSize: 13, color: 'var(--ink)', flex: 1 }}>{d.name}</span>
                      <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: d.validated ? 'var(--accent-ink)' : '#ef4444' }}>
                        {d.validated ? 'Validated' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </MagicFrame>
  );
}

// ── Legacy ScreenMagic (redirects) ──
function ScreenMagic() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = 'Magic Builder.html';
    }
  }, []);
  return null;
}

Object.assign(window, { ScreenMagic, ScreenMagicBuilder, ScreenMagicConversations, ScreenMagicPeople, MagicSidebar, MagicFrame });

// ============================================================
// Magic Participant Conversation — pure voice back-and-forth
// The participant clicks a link, has a voice conversation, done.
// ============================================================

function ScreenMagicParticipant() {
  const [phase, setPhase] = React.useState('landing'); // landing | convo | done
  const [turn, setTurn] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);

  const convo = [
    { who: 'ai', text: "Hi there! Thanks for joining. I\u2019m going to ask you a few quick questions about your onboarding experience. This should take about 2 minutes. Ready?" },
    { who: 'user', text: "Yeah, ready." },
    { who: 'ai', text: "Great. First \u2014 how would you rate your overall onboarding experience so far, on a scale of 1 to 10?" },
    { who: 'user', text: "I\u2019d say about a 7. Most of it was smooth but the insurance cert part was confusing." },
    { who: 'ai', text: "Got it \u2014 a 7. Can you tell me more about what was confusing about the insurance certificate step?" },
    { who: 'user', text: "I wasn\u2019t sure what type of certificate you needed. The instructions just said \u2018insurance cert\u2019 but I have like three different types." },
    { who: 'ai', text: "That\u2019s really helpful feedback. We\u2019ll make the instructions more specific. One last question \u2014 is there anything else you\u2019d change about the process?" },
    { who: 'user', text: "Honestly the rest was great. The voice part was way easier than filling out forms. I\u2019d just fix that one confusing step." },
    { who: 'ai', text: "Perfect. Thank you for your time \u2014 your feedback has been recorded and will help us improve the experience. You\u2019re all set!", final: true },
  ];

  function WaveformMini({ bars, color, maxH }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {Array.from({ length: bars || 10 }).map((_, i) => (
          <div key={i} style={{
            width: 2, borderRadius: 1,
            height: Math.sin(i * 0.6) * (maxH || 12) * 0.5 + (maxH || 12) * 0.4,
            background: color || 'var(--accent)',
            animation: 'waveform-bar 0.8s ease-in-out ' + (i * 0.06) + 's infinite alternate',
          }} />
        ))}
      </div>
    );
  }

  const handleMic = () => {
    if (isRecording) {
      setIsRecording(false);
      // Show user turn, then auto-show next AI turn
      const nextIdx = turn + 1;
      if (nextIdx < convo.length) {
        setTurn(nextIdx);
        if (convo[nextIdx]?.who === 'user') {
          setTimeout(() => setTurn(nextIdx + 1), 600);
        } else {
          setTimeout(() => {
            if (nextIdx + 1 < convo.length) setTurn(nextIdx + 1);
          }, 600);
        }
      }
    } else {
      setIsRecording(true);
    }
  };

  // Auto-advance from user turns to AI turns
  React.useEffect(() => {
    if (convo[turn]?.who === 'user' && turn + 1 < convo.length) {
      const t = setTimeout(() => setTurn(turn + 1), 600);
      return () => clearTimeout(t);
    }
    if (convo[turn]?.final) {
      setTimeout(() => setPhase('done'), 2000);
    }
  }, [turn]);

  // ── LANDING ──
  if (phase === 'landing') {
    return (
      <div data-screen-label="Magic Participant · Landing" style={{
        width: '100vw', minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg) 0%, #fff 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--sans)',
      }}>
        <div style={{
          maxWidth: 420, width: '100%', padding: '48px 40px',
          background: '#fff', borderRadius: 20,
          boxShadow: '0 24px 80px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-4)', letterSpacing: '0.08em', marginBottom: 20 }}>POWERED BY COMMS</div>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
            background: 'var(--accent-soft)', border: '2px solid var(--accent)',
            display: 'grid', placeItems: 'center',
          }}>
            <span style={{ fontSize: 28, fontWeight: 600, color: 'var(--accent-ink)' }}>H</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Harbor</div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 24 }}>Voice Conversation</div>
          <div style={{ height: 1, background: 'var(--line)', margin: '0 auto 24px', maxWidth: 200 }} />
          <div style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 28, maxWidth: 340, margin: '0 auto 28px' }}>
            You'll have a short voice conversation with an AI agent. Just hold the mic button and talk naturally. Takes about 2 minutes.
          </div>
          <button onClick={() => setPhase('convo')} style={{
            width: '100%', maxWidth: 320, padding: '14px 24px', borderRadius: 12,
            background: 'var(--ink)', color: 'var(--bg)', border: 'none',
            fontSize: 15, fontWeight: 500, cursor: 'pointer',
          }}>
            Start conversation {'\u2192'}
          </button>
          <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 16 }}>
            Secure {'\u00B7'} Encrypted {'\u00B7'} Powered by Comms
          </div>
        </div>
      </div>
    );
  }

  // ── CONVERSATION ──
  if (phase === 'convo') {
    const visible = convo.slice(0, turn + 1);
    const current = convo[turn];
    const waitingForUser = current?.who === 'ai' && !current?.final;

    return (
      <div data-screen-label="Magic Participant · Conversation" style={{
        width: '100vw', minHeight: '100vh',
        background: 'linear-gradient(180deg, #0e0e0c 0%, #1a1a18 100%)',
        color: '#fff', fontFamily: 'var(--sans)',
        display: 'grid', gridTemplateRows: 'auto 1fr auto',
      }}>
        {/* Progress bar */}
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)' }}>
          <div style={{ height: '100%', background: 'var(--accent)', width: ((turn + 1) / convo.length * 100) + '%', transition: 'width 0.4s ease', borderRadius: 2 }} />
        </div>

        {/* Conversation thread */}
        <div style={{ maxWidth: 560, width: '100%', margin: '0 auto', padding: '32px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* AI avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), oklch(0.55 0.17 200))',
              border: '3px solid rgba(255,255,255,0.1)',
              display: 'grid', placeItems: 'center',
              animation: 'glow-border 3s ease-in-out infinite',
            }}>
              <span style={{ fontSize: 22, fontWeight: 600, color: 'white' }}>C</span>
            </div>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Comms Agent</span>
          </div>

          {/* Messages */}
          {visible.map((msg, i) => (
            <div key={i} className="fade-up" style={{
              display: 'flex', flexDirection: 'column',
              alignItems: msg.who === 'user' ? 'flex-end' : 'flex-start',
              animationDelay: (i * 0.08) + 's',
            }}>
              {msg.who === 'ai' && (
                <div style={{ marginBottom: 4 }}><WaveformMini bars={8} color="var(--accent)" maxH={10} /></div>
              )}
              {msg.who === 'user' && (
                <div style={{ marginBottom: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <WaveformMini bars={6} color="rgba(255,255,255,0.2)" maxH={8} />
                </div>
              )}
              <div style={{
                padding: '14px 18px', borderRadius: 16, maxWidth: '85%',
                fontSize: 15, lineHeight: 1.6,
                background: msg.who === 'ai' ? 'rgba(255,255,255,0.08)' : 'color-mix(in srgb, var(--accent) 18%, transparent)',
                color: 'rgba(255,255,255,0.88)',
                borderBottomLeftRadius: msg.who === 'ai' ? 4 : 16,
                borderBottomRightRadius: msg.who === 'user' ? 4 : 16,
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Recording indicator */}
          {isRecording && (
            <div className="fade-up" style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="recording-dot" />
                <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.3)' }}>RECORDING</span>
              </div>
              <WaveformMini bars={16} color="var(--accent)" maxH={20} />
            </div>
          )}
        </div>

        {/* Bottom — mic */}
        <div style={{ padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          {!current?.final && (
            <>
              <div className={isRecording ? '' : 'breathe'} style={{
                width: 72, height: 72, borderRadius: '50%',
                border: '2px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                display: 'grid', placeItems: 'center',
              }}>
                <button onClick={handleMic} style={{
                  width: isRecording ? 60 : 52, height: isRecording ? 60 : 52,
                  borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: isRecording ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 70%, transparent)',
                  display: 'grid', placeItems: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: isRecording ? '0 0 24px color-mix(in srgb, var(--accent) 30%, transparent)' : 'none',
                }}>
                  <span style={{ fontSize: 22, color: 'white' }}>{'\u25CF'}</span>
                </button>
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                {isRecording ? 'Spacebar or tap to send' : waitingForUser ? 'Spacebar or tap to respond' : 'Spacebar or tap to start'}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── DONE ──
  return (
    <div data-screen-label="Magic Participant · Done" style={{
      width: '100vw', minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--sans)',
    }}>
      <div className="fade-up" style={{ textAlign: 'center', maxWidth: 440, padding: '0 24px' }}>
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ margin: '0 auto 20px', display: 'block' }}>
          <circle cx="28" cy="28" r="26" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <path d="M16 28 L24 36 L40 20" fill="none" stroke="var(--accent)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="30" style={{ animation: 'draw-check 0.6s ease forwards' }} />
        </svg>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, marginBottom: 8 }}>
          All done. Thank you.
        </div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 24 }}>
          Your responses have been recorded and sent to Harbor. This conversation took about 2 minutes.
        </div>
        <div style={{
          border: '1px solid var(--line)', borderRadius: 12, padding: 16,
          display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left',
        }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-4)', letterSpacing: '0.06em' }}>CONVERSATION SUMMARY</div>
          {[
            'Onboarding rating: 7/10',
            'Pain point: Insurance cert instructions unclear',
            'Suggestion: Specify which certificate type needed',
            'Overall sentiment: Positive',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-2)' }}>
              <span style={{ color: 'var(--accent)', fontSize: 11 }}>{'\u2713'}</span>
              {item}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 20 }}>
          Powered by Comms
        </div>
      </div>
    </div>
  );
}

Object.assign(window, Object.assign({}, window, { ScreenMagicParticipant }));
