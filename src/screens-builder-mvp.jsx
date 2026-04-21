// ============================================================
// Builder MVP — Voice-first conversation builder.
// Three fluid states: record → reveal → send
// ============================================================

const { useState, useEffect, useRef } = React;

function ScreenBuilderMVP() {
  const [state, setState] = useState('record');    // 'record' | 'reveal' | 'send'
  const [convoStep, setConvoStep] = useState(0);   // which turn of the voice conversation
  const [isRecording, setIsRecording] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [previewStep, setPreviewStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const intervalRef = useRef(null);

  // Auto-cycle phone preview
  useEffect(() => {
    if (state === 'reveal') {
      intervalRef.current = setInterval(() => {
        setPreviewStep(p => (p + 1) % 6);
      }, 3000);
      return () => clearInterval(intervalRef.current);
    }
  }, [state]);

  // Voice conversation turns
  const voiceConvo = [
    { who: 'comms', text: "Hi! What kind of conversation would you like to create? Tell me who you need to reach and what you need from them." },
    { who: 'you', text: "I need to onboard new contractors. Collect some documents and get an NDA signed." },
    { who: 'comms', text: "Got it — contractor onboarding. What specific documents do you need to collect?" },
    { who: 'you', text: "Government ID, W-9 form, and their insurance certificate." },
    { who: 'comms', text: "Three documents plus an NDA signature. Should I add a welcome introduction at the start and a confirmation summary at the end?" },
    { who: 'you', text: "Yes, that sounds right." },
    { who: 'comms', text: "Perfect. I'll build a 6-step conversation: welcome, government ID, W-9, insurance cert, NDA signature, and confirmation. How many follow-up reminders if someone doesn't respond?" },
    { who: 'you', text: "Follow up three times." },
    { who: 'comms', text: "Done — 6 steps, 3 follow-ups. Let me build this for you now.", final: true },
  ];

  const handleMicClick = () => {
    if (isRecording) {
      // User finished recording — advance past the user turn and show next comms turn
      setIsRecording(false);
      const nextIdx = convoStep + 1;
      if (nextIdx < voiceConvo.length) {
        // Show user turn immediately
        setConvoStep(nextIdx);
        // Then after a pause, show the comms response
        if (nextIdx + 1 < voiceConvo.length && voiceConvo[nextIdx]?.who === 'you') {
          setTimeout(() => {
            setConvoStep(nextIdx + 1);
          }, 800);
        } else {
          // Next is already a comms turn, auto-show the one after (comms response)
          setTimeout(() => {
            const commsIdx = nextIdx + 1;
            if (commsIdx < voiceConvo.length) {
              setConvoStep(commsIdx);
            }
          }, 800);
        }
      }
    } else {
      setIsRecording(true);
    }
  };

  // When landing on a comms turn, auto-advance to show it (user turn was just added)
  useEffect(() => {
    if (state === 'record' && convoStep > 0) {
      const current = voiceConvo[convoStep];
      // If we just showed a user turn and next is comms, auto-show comms
      if (current?.who === 'you' && convoStep + 1 < voiceConvo.length) {
        const timer = setTimeout(() => {
          setConvoStep(s => s + 1);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [convoStep, state]);

  const templates = [
    { name: 'Vendor Onboarding', desc: 'W-9, insurance, NDA' },
    { name: 'Employee Onboarding', desc: 'Policies, forms' },
    { name: 'Customer Feedback', desc: 'NPS, follow-ups' },
    { name: 'Client Intake', desc: 'Requirements, docs' },
  ];

  const timelineSteps = [
    { type: 'VOICE GREETING', title: 'Welcome & introduction', desc: 'AI greets the participant and explains what they\u2019ll complete', tone: 'accent' },
    { type: 'DOCUMENT UPLOAD', title: 'Government ID', desc: 'Collect a photo of government-issued identification', tone: 'neutral' },
    { type: 'DOCUMENT UPLOAD', title: 'W-9 form', desc: 'Upload or photograph completed W-9 tax form', tone: 'neutral' },
    { type: 'DOCUMENT UPLOAD', title: 'Insurance certificate', desc: 'Collect current insurance certificate of liability', tone: 'neutral' },
    { type: 'E-SIGNATURE', title: 'NDA signature', desc: 'Present and collect signature on non-disclosure agreement', tone: 'warn' },
    { type: 'SUMMARY', title: 'Confirmation & wrap-up', desc: 'AI confirms all items received and thanks the participant', tone: 'accent' },
  ];

  // ── Waveform helper ──
  function Waveform({ bars = 20, barWidth = 3, color = 'var(--accent)', maxH = 28, width, style }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
        width: width || 'auto', ...style,
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

  // ── STATE 1: VOICE CONVERSATION ──
  if (state === 'record') {
    const visibleTurns = voiceConvo.slice(0, convoStep + 1);
    const currentTurn = voiceConvo[convoStep];
    const nextIsUser = convoStep + 1 < voiceConvo.length && voiceConvo[convoStep + 1]?.who === 'you';
    const waitingForUser = currentTurn?.who === 'comms' && !currentTurn?.final && convoStep + 1 < voiceConvo.length;

    return (
      <AppFrame active="builder" crumbs={['comms.app', 'builder']} screenLabel="Builder MVP">
        <div style={{
          height: '100%', background: 'var(--ink)',
          display: 'grid', gridTemplateRows: 'auto 1fr auto',
          position: 'relative',
        }}>
          {/* Top — heading + templates */}
          <div style={{ padding: '24px 32px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: 'white', marginBottom: 6 }}>
              Tell me about the conversation you'd like to create
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
              Have a voice conversation with Comms — or pick a template to start
            </div>
            {/* Template dropdown */}
            <div style={{ marginBottom: 12 }}>
              <select style={{
                width: '100%', maxWidth: 300, padding: '10px 14px',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10, background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)', fontSize: 13,
                fontFamily: 'var(--sans)',
              }}>
                <option value="">Pick an existing template...</option>
                <option value="vendor">Vendor Onboarding</option>
                <option value="employee">Employee Onboarding</option>
                <option value="feedback">Customer Feedback</option>
                <option value="intake">Client Intake</option>
                <option value="compliance">Compliance Renewal</option>
                <option value="nps">NPS Survey</option>
              </select>
            </div>
            {/* Template cards */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
              {templates.map((t, i) => (
                <button key={i} onClick={() => setState('reveal')} style={{
                  padding: '8px 14px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)',
                  cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 8, alignItems: 'center',
                }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{t.name}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{t.desc}</span>
                </button>
              ))}
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', maxWidth: 500, margin: '0 auto' }} />
          </div>

          {/* Middle — conversation thread */}
          <div style={{
            padding: '20px 32px', overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 12,
            maxWidth: 560, width: '100%', margin: '0 auto',
          }}>
            {visibleTurns.map((turn, i) => (
              <div key={i} className="fade-up" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: turn.who === 'you' ? 'flex-end' : 'flex-start',
                animationDelay: `${i * 0.1}s`,
              }}>
                {/* Label */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
                  flexDirection: turn.who === 'you' ? 'row-reverse' : 'row',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: turn.who === 'comms' ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
                  }} />
                  <span style={{
                    fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.05em',
                    color: turn.who === 'comms' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)',
                  }}>
                    {turn.who === 'comms' ? 'COMMS' : 'YOU'}
                  </span>
                </div>
                {/* Waveform for voice feel */}
                {turn.who === 'comms' && (
                  <div style={{ marginBottom: 6 }}>
                    <Waveform bars={10} barWidth={2} color="var(--accent)" maxH={12} />
                  </div>
                )}
                {turn.who === 'you' && (
                  <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'flex-end' }}>
                    <Waveform bars={8} barWidth={2} color="rgba(255,255,255,0.25)" maxH={10} />
                  </div>
                )}
                {/* Message bubble */}
                <div style={{
                  padding: '12px 16px', borderRadius: 14,
                  maxWidth: '90%', fontSize: 14, lineHeight: 1.55,
                  background: turn.who === 'comms' ? 'rgba(255,255,255,0.08)' : 'color-mix(in srgb, var(--accent) 20%, transparent)',
                  color: turn.who === 'comms' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.9)',
                  borderBottomLeftRadius: turn.who === 'comms' ? 4 : 14,
                  borderBottomRightRadius: turn.who === 'you' ? 4 : 14,
                }}>
                  {turn.text}
                </div>
              </div>
            ))}

            {/* Recording indicator when user is recording */}
            {isRecording && (
              <div className="fade-up" style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="recording-dot" />
                  <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.4)' }}>RECORDING</span>
                </div>
                <Waveform bars={16} barWidth={3} color="var(--accent)" maxH={24} />
              </div>
            )}
          </div>

          {/* Bottom — mic + actions */}
          <div style={{ padding: '16px 32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {/* Generate button when conversation is done */}
            {currentTurn?.final && (
              <button onClick={() => setState('reveal')} className="fade-up" style={{
                background: 'var(--accent)', color: 'white', border: 'none',
                padding: '11px 28px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                cursor: 'pointer', marginBottom: 8,
              }}>
                Build my conversation {'\u2192'}
              </button>
            )}

            {/* Mic button — only when waiting for user input */}
            {!currentTurn?.final && (
              <>
                <div className={isRecording ? '' : 'breathe'} style={{
                  width: 72, height: 72, borderRadius: '50%',
                  border: '2px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                  display: 'grid', placeItems: 'center',
                }}>
                  <button onClick={handleMicClick} style={{
                    width: isRecording ? 64 : 56, height: isRecording ? 64 : 56,
                    borderRadius: '50%',
                    background: isRecording ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 80%, transparent)',
                    border: 'none', cursor: 'pointer',
                    display: 'grid', placeItems: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: isRecording ? '0 0 24px color-mix(in srgb, var(--accent) 35%, transparent)' : 'none',
                  }}>
                    <span style={{ fontSize: 24, color: 'white', lineHeight: 1 }}>{'\u25CF'}</span>
                  </button>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                  {isRecording ? 'Spacebar or tap to send' : waitingForUser ? 'Spacebar or tap to respond' : 'Spacebar or tap to start'}
                </div>
              </>
            )}
          </div>
        </div>
      </AppFrame>
    );
  }

  // ── STATE 2: REVEAL (+ embedded state 3: SEND panel) ──

  // Phone preview content per step
  function PhoneStepContent({ step }) {
    if (step === 0) {
      return (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), oklch(0.55 0.17 200))',
            display: 'grid', placeItems: 'center',
          }}>
            <span style={{ color: 'white', fontSize: 18, fontWeight: 600 }}>C</span>
          </div>
          <Waveform bars={16} barWidth={2} color="var(--accent)" maxH={16} width="70%" />
          <div style={{
            background: 'var(--accent-soft)', borderRadius: 12, padding: 14,
            fontSize: 13, lineHeight: 1.55, color: 'var(--ink)', width: '100%',
          }}>
            Welcome! I'm here to walk you through your contractor onboarding. This should take about 5 minutes.
          </div>
          <button style={{
            background: 'var(--accent)', color: 'white', border: 'none',
            padding: '10px 24px', borderRadius: 999, fontSize: 13, fontWeight: 500,
            width: '100%', cursor: 'pointer',
          }}>
            Continue {'\u2192'}
          </button>
        </div>
      );
    }
    if (step >= 1 && step <= 3) {
      const docs = ['Government ID', 'W-9 form', 'Insurance certificate'];
      return (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: 'var(--accent-soft)', borderRadius: 12, padding: 12,
            fontSize: 13, lineHeight: 1.5, color: 'var(--ink)',
          }}>
            Please upload your {docs[step - 1].toLowerCase()}.
          </div>
          <div style={{
            border: '2px dashed var(--line-2)', borderRadius: 12, height: 100,
            display: 'grid', placeItems: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, color: 'var(--ink-4)', marginBottom: 4 }}>{'\u25CE'}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-4)' }}>Tap to upload</div>
            </div>
          </div>
          {step === 1 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: 10,
              background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 8,
            }}>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 500 }}>drivers_license.jpg</span>
              <span style={{
                fontSize: 10, color: 'var(--accent-ink)', fontFamily: 'var(--mono)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>{'\u2713'} Validated {'\u00B7'} Name matches</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <div className="breathe" style={{
              width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)',
              display: 'grid', placeItems: 'center',
            }}>
              <span style={{ color: 'white', fontSize: 14 }}>{'\u25CF'}</span>
            </div>
          </div>
        </div>
      );
    }
    if (step === 4) {
      return (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: 'var(--accent-soft)', borderRadius: 12, padding: 12,
            fontSize: 13, lineHeight: 1.5, color: 'var(--ink)',
          }}>
            Please review and sign the NDA below.
          </div>
          <div style={{
            background: 'var(--chip)', borderRadius: 10, padding: 16,
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                height: 3, background: 'var(--line-2)', borderRadius: 2,
                width: i === 5 ? '60%' : '100%',
              }} />
            ))}
          </div>
          <div style={{
            border: '1px solid var(--line)', borderRadius: 10, padding: 16,
            minHeight: 50, position: 'relative',
          }}>
            <svg width="120" height="30" viewBox="0 0 120 30" style={{ position: 'absolute', top: 10, left: 16 }}>
              <path d="M5 20 Q20 5, 35 18 T65 15 T95 20 T115 12"
                fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <button style={{
            background: 'var(--accent)', color: 'white', border: 'none',
            padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 500,
            width: '100%', cursor: 'pointer',
          }}>
            Sign and continue {'\u2192'}
          </button>
        </div>
      );
    }
    if (step === 5) {
      return (
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="none" stroke="var(--accent)" strokeWidth="2" />
            <path d="M14 24 L21 31 L34 17" fill="none" stroke="var(--accent)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="24" style={{ animation: 'draw-check 0.6s ease forwards' }} />
          </svg>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20, color: 'var(--ink)' }}>
            All done.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
            {['Government ID', 'W-9 form', 'Insurance cert', 'NDA signed'].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 12, color: 'var(--ink-2)',
              }}>
                <span style={{ color: 'var(--accent)', fontSize: 11 }}>{'\u2713'}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <AppFrame active="builder" crumbs={['comms.app', 'builder', 'review']} screenLabel="Builder MVP · Review">
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateRows: '1fr 50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', overflow: 'hidden' }}>
          {/* LEFT — Narrative Timeline */}
          <div style={{
            padding: '20px 24px', overflowY: 'auto', borderRight: '1px solid var(--line)',
          }}>
            <div style={{ marginBottom: 4 }}>
              <span className="meta">YOUR CONVERSATION</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-4)', marginBottom: 16 }}>
              Edit any step by clicking it
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              {/* Connecting line */}
              <div style={{
                position: 'absolute', left: 5, top: 6, bottom: 6, width: 2,
                background: 'var(--accent)', opacity: 0.3,
              }} />

              {timelineSteps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <div key={i}
                    className="fade-up"
                    style={{
                      position: 'relative', marginBottom: 10, cursor: 'pointer',
                      animationDelay: `${i * 0.08}s`,
                    }}
                    onClick={() => { setActiveStep(i); setEditModal(i); }}
                  >
                    {/* Dot on timeline */}
                    <div style={{
                      position: 'absolute', left: -28, top: 6,
                      width: 12, height: 12, borderRadius: '50%',
                      background: isActive ? 'var(--accent)' : 'transparent',
                      border: isActive ? '2px solid var(--accent)' : '2px solid var(--line-2)',
                      transition: 'all 0.2s ease',
                    }} />

                    {/* Content */}
                    <div style={{
                      padding: isActive ? 16 : 12,
                      borderRadius: 10,
                      background: isActive ? 'var(--bg-elev)' : 'transparent',
                      border: isActive ? '1px solid var(--line)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                    }}>
                      <Pill tone={step.tone}>{step.type}</Pill>
                      <div style={{ fontSize: 15, fontWeight: 500, marginTop: 8, marginBottom: 4 }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add / start over */}
            <div style={{ paddingLeft: 28, display: 'flex', gap: 16, marginTop: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--accent-ink)', cursor: 'pointer' }}>+ Add a step</span>
              <span style={{ fontSize: 13, color: 'var(--ink-4)', cursor: 'pointer' }}
                onClick={() => { setState('record'); setIsRecording(false); }}>
                Start over
              </span>
            </div>
          </div>

          {/* RIGHT — Configure Panel */}
          <div style={{
            padding: '20px 24px', overflowY: 'auto',
          }}>
            <div className="meta" style={{ marginBottom: 14 }}>CONFIGURE</div>
            <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 20, background: 'var(--bg-elev)' }}>
              {/* Voice */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 14, color: 'var(--ink)' }}>Voice</span>
                <select style={{ padding: '6px 10px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12, background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--sans)' }}>
                  <option>Nova (female)</option>
                  <option>Onyx (male)</option>
                  <option>Shimmer (neutral)</option>
                </select>
              </div>
              {/* Video */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 14, color: 'var(--ink)' }}>Video</span>
                <div style={{ width: 36, height: 20, borderRadius: 10, background: 'var(--line-2)', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                </div>
              </div>
              {/* Text Transcript */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 14, color: 'var(--ink)' }}>Text Transcript</span>
                <div style={{ width: 36, height: 20, borderRadius: 10, background: 'var(--accent)', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                </div>
              </div>
              {/* Chat Available */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontSize: 14, color: 'var(--ink)' }}>Chat Available</span>
                <div style={{ width: 36, height: 20, borderRadius: 10, background: 'var(--accent)', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, right: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                </div>
              </div>
              {/* Language */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                <span style={{ fontSize: 14, color: 'var(--ink)' }}>Language</span>
                <select style={{ padding: '6px 10px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 12, background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--sans)' }}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Portuguese</option>
                  <option>Japanese</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <a href="Settings Profile.html" style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', borderBottom: '1px solid var(--line)' }}>Advanced settings {'\u2192'}</a>
            </div>
          </div>

        </div>

        {/* Step Edit Modal */}
        {editModal !== null && (
          <>
            <div onClick={() => setEditModal(null)} style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999,
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 480, background: 'white', borderRadius: 14, zIndex: 1000,
              boxShadow: '0 24px 80px rgba(0,0,0,0.2)', padding: 28,
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>EDIT STEP {editModal + 1}</div>
                <button onClick={() => setEditModal(null)} style={{ background: 'none', border: 'none', fontSize: 18, color: 'var(--ink-3)', cursor: 'pointer' }}>{'\u00D7'}</button>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--ink-3)', display: 'block', marginBottom: 4 }}>Step title</label>
                <input defaultValue={timelineSteps[editModal]?.title} style={{
                  width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: 10,
                  fontSize: 14, fontFamily: 'var(--sans)', background: 'var(--bg-elev)', color: 'var(--ink)',
                  boxSizing: 'border-box',
                }} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--ink-3)', display: 'block', marginBottom: 4 }}>Description</label>
                <textarea defaultValue={timelineSteps[editModal]?.desc} rows={3} style={{
                  width: '100%', padding: '10px 14px', border: '1px solid var(--line)', borderRadius: 10,
                  fontSize: 13, fontFamily: 'var(--sans)', background: 'var(--bg-elev)', color: 'var(--ink)',
                  boxSizing: 'border-box', resize: 'vertical',
                }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontSize: 10, fontFamily: 'var(--mono)', letterSpacing: '0.06em',
                  padding: '3px 8px', borderRadius: 4, background: 'var(--chip)', color: 'var(--ink-3)',
                }}>{timelineSteps[editModal]?.type}</span>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-2)' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)' }} />
                  Required
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                <button onClick={() => setEditModal(null)} style={{
                  background: 'transparent', border: '1px solid var(--line)', borderRadius: 10,
                  padding: '9px 18px', fontSize: 13, cursor: 'pointer', color: 'var(--ink-3)',
                }}>Close</button>
                <button onClick={() => setEditModal(null)} style={{
                  background: 'var(--ink)', color: 'white', border: 'none', borderRadius: 10,
                  padding: '9px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>Save</button>
              </div>
            </div>
          </>
        )}

        {/* Bottom action bar */}
        <div style={{
          padding: '12px 24px', borderTop: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--bg-elev)', flexShrink: 0,
        }}>
          <button onClick={() => { setState('record'); setIsRecording(false); }}
            style={{
              background: 'transparent', border: 'none', fontSize: 13,
              color: 'var(--ink-3)', cursor: 'pointer',
            }}>
            Start over
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => window.location.href = 'Preview.html'} style={{
              background: 'var(--bg-elev)', color: 'var(--ink)', border: '1px solid var(--line)',
              padding: '10px 22px', borderRadius: 999, fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
            }}>
              Preview {'\u2192'}
            </button>
            <button onClick={() => window.location.href = 'Send.html'} style={{
              background: 'var(--accent)', color: 'white', border: 'none',
              padding: '10px 22px', borderRadius: 999, fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
            }}>
              Send {'\u2192'}
            </button>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenBuilderMVP });
