// ============================================================
// Try It — Comprehensive single demo showcasing all modalities.
// Dark immersive participant experience, 8 steps + completion.
// ============================================================

const { useState: useStateTI } = React;

function ScreenTryIt() {
  const [step, setStep] = useStateTI(0);
  const [expandedBenefit, setExpandedBenefit] = useStateTI(0);
  const [selectedSlots, setSelectedSlots] = useStateTI(new Set([6, 15])); // Tue 1PM, Thu 9AM

  const totalSteps = 8;
  const progress = step === 9 ? 100 : (step / totalSteps) * 100;

  // Waveform bars helper
  function DarkWaveform({ bars = 20, width = '70%', height = 28, animated = true }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, width,
        margin: '0 auto',
      }}>
        {Array.from({ length: bars }).map((_, i) => {
          const h = Math.sin(i * 0.5) * 12 + Math.random() * 8 + 8;
          return (
            <div key={i} style={{
              width: 3, borderRadius: 2, background: 'var(--accent)',
              height: Math.min(h, height),
              animation: animated ? `waveform-bar 0.8s ease-in-out ${i * 0.05}s infinite alternate` : 'none',
            }} />
          );
        })}
      </div>
    );
  }

  // Step dots
  function StepDots() {
    return (
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 16 }}>
        {Array.from({ length: totalSteps + 1 }).map((_, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: i === step ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
            transition: 'background 0.3s',
            cursor: 'pointer',
          }} onClick={() => setStep(i)} />
        ))}
      </div>
    );
  }

  // Navigation buttons
  function NavButtons({ nextLabel = 'Next \u2192', onNext }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 28 }}>
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} style={{
            padding: '10px 20px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
            border: 'none', borderRadius: 10, fontSize: 13, cursor: 'pointer',
          }}>{'\u2190'} Back</button>
        ) : <div />}
        <button onClick={onNext || (() => setStep(step + 1))} style={{
          padding: '12px 24px', background: 'var(--accent)', color: 'white',
          border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer',
        }}>{nextLabel}</button>
      </div>
    );
  }

  // Section label
  function SectionLabel({ children }) {
    return (
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
        color: 'var(--accent)', marginBottom: 16, textAlign: 'center',
      }}>{children}</div>
    );
  }

  // AI message bubble
  function AIMessage({ children }) {
    return (
      <div className="fade-up" style={{
        background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 16,
        color: 'rgba(255,255,255,0.9)', fontSize: 14, lineHeight: 1.55,
        marginBottom: 20,
      }}>{children}</div>
    );
  }

  // -- Step content --

  function StepWelcome() {
    return (
      <div style={{ textAlign: 'center' }}>
        <SectionLabel>VOICE INTRO</SectionLabel>
        {/* AI Avatar */}
        <div className="fade-up" style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), oklch(0.55 0.17 200))',
          border: '3px solid color-mix(in srgb, var(--accent) 30%, transparent)',
          display: 'grid', placeItems: 'center',
          animation: 'glow-border 2.4s ease-in-out infinite',
          margin: '0 auto 16px',
        }}>
          <span style={{ fontSize: 24, color: 'white', fontWeight: 600 }}>C</span>
        </div>
        <div style={{ marginBottom: 24 }}>
          <DarkWaveform bars={20} width="60%" animated />
        </div>
        <AIMessage>
          Welcome! I'm going to show you everything Comms can do. We'll walk through voice, video, documents, forms, and more. Ready?
        </AIMessage>
        <button className="breathe" onClick={() => setStep(1)} style={{
          padding: '16px 40px', background: 'var(--accent)', color: 'white',
          border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: 'pointer',
          marginTop: 8,
        }}>Let's go {'\u2192'}</button>
      </div>
    );
  }

  function StepVoice() {
    return (
      <div>
        <SectionLabel>VOICE RESPONSE</SectionLabel>
        <AIMessage>
          Tell me — what's the biggest challenge your team faces with onboarding new people?
        </AIMessage>
        <div style={{ marginBottom: 24 }}>
          <DarkWaveform bars={24} width="80%" height={32} animated />
        </div>
        <div className="fade-up" style={{
          padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 12, marginBottom: 24,
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 6, letterSpacing: '0.06em' }}>LIVE TRANSCRIPT</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.55 }}>
            "The biggest issue is getting documents on time. We chase people for weeks..."
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div className="breathe" style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--accent)', display: 'grid', placeItems: 'center',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 20, color: 'white' }}>{'\u25CF'}</span>
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Hold spacebar or tap mic</span>
        </div>
        <NavButtons />
      </div>
    );
  }

  function StepVideoRecord() {
    return (
      <div>
        <SectionLabel>VIDEO RESPONSE</SectionLabel>
        <AIMessage>
          Now record a short video introducing yourself and your role.
        </AIMessage>
        <div className="fade-up" style={{
          aspectRatio: '16/9', maxWidth: 480, width: '100%', margin: '0 auto 16px',
          background: '#1a1a18', borderRadius: 14, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 12, border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
            display: 'grid', placeItems: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="14" height="14" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
              <path d="M22 7l-6 4 6 4V7z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Tap to start recording</span>
        </div>
        <div className="fade-up" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          marginBottom: 16, animationDelay: '0.15s',
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%', background: '#ef4444',
            animation: 'pulse-ring 1.6s infinite',
          }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--mono)' }}>REC 00:14</span>
          <DarkWaveform bars={12} width="120px" height={16} animated />
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
          0:14 / 2:00
        </div>
        <NavButtons />
      </div>
    );
  }

  function StepVideoWalkthrough() {
    return (
      <div>
        <SectionLabel>VIDEO WALKTHROUGH</SectionLabel>
        <AIMessage>
          Watch this 30-second overview of our platform. I'll ask you a few questions after.
        </AIMessage>
        <div className="fade-up" style={{
          aspectRatio: '16/9', maxWidth: 480, width: '100%', margin: '0 auto 8px',
          background: '#1a1a18', borderRadius: 14, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', position: 'relative',
          border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
            display: 'grid', placeItems: 'center',
          }}>
            <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.5)', marginLeft: 3 }}>{'\u25B6'}</span>
          </div>
          {/* Progress bar at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
            background: 'rgba(255,255,255,0.1)',
          }}>
            <div style={{ width: '60%', height: '100%', background: 'var(--accent)', borderRadius: '0 2px 2px 0' }} />
          </div>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
          Platform Overview {'\u00B7'} 0:18 / 0:30
        </div>
        <div className="fade-up" style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginBottom: 16,
          borderLeft: '3px solid var(--accent)', animationDelay: '0.15s',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', marginBottom: 8, letterSpacing: '0.06em' }}>AI QUESTION</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>What feature stood out to you the most?</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input type="text" readOnly placeholder="Type your answer..." style={{
            flex: 1, padding: '12px 14px', fontSize: 13, border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 10, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)',
            fontFamily: 'var(--sans)', outline: 'none',
          }} />
          <button style={{
            width: 40, height: 40, borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', fontSize: 16,
            cursor: 'pointer', display: 'grid', placeItems: 'center',
          }}>{'\u2191'}</button>
        </div>
        <NavButtons />
      </div>
    );
  }

  function StepDocumentReview() {
    return (
      <div>
        <SectionLabel>DOCUMENT REVIEW</SectionLabel>
        <AIMessage>
          Please review this NDA. I'll walk you through the key sections.
        </AIMessage>
        <div className="fade-up" style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 24, marginBottom: 16,
          minHeight: 400,
        }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: 20, textAlign: 'center' }}>
            Non-Disclosure Agreement
          </div>
          {[
            { title: '\u00A71 Confidentiality', lines: 3 },
            { title: '\u00A72 Duration', lines: 2 },
            { title: '\u00A73 Remedies', lines: 2 },
          ].map((section, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
                {section.title}
              </div>
              {Array.from({ length: section.lines }).map((_, j) => (
                <div key={j} style={{
                  height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4,
                  marginBottom: 6, width: j === section.lines - 1 ? '70%' : '100%',
                }} />
              ))}
            </div>
          ))}
          {/* AI annotation */}
          <div style={{
            borderLeft: '3px solid var(--accent)',
            background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            borderRadius: '4px 12px 12px 4px', padding: 14, marginTop: 16,
          }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 }}>
              This section means any information shared during the engagement remains confidential for 2 years after the contract ends.
            </div>
          </div>
        </div>
        <NavButtons nextLabel="I understand \u2014 Next \u2192" />
      </div>
    );
  }

  function StepFormFilling() {
    return (
      <div>
        <SectionLabel>FORM INPUT</SectionLabel>
        <AIMessage>
          Fill in a few details about your company and role.
        </AIMessage>
        <div className="fade-up" style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 24, marginBottom: 16,
        }}>
          {/* Company name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>COMPANY NAME</label>
            <input type="text" readOnly defaultValue="Harbor Inc." style={{
              width: '100%', padding: '10px 14px', fontSize: 13, border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--sans)', outline: 'none', boxSizing: 'border-box',
            }} />
          </div>
          {/* Role dropdown */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>YOUR ROLE</label>
            <select disabled style={{
              width: '100%', padding: '10px 14px', fontSize: 13, border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--sans)', outline: 'none', appearance: 'none', boxSizing: 'border-box',
            }}>
              <option>VP Operations</option>
            </select>
          </div>
          {/* Team size pills */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>TEAM SIZE</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {['1-10', '11-50', '51-200', '200+'].map((s, i) => (
                <span key={s} style={{
                  padding: '8px 14px', borderRadius: 999, fontSize: 12, cursor: 'pointer',
                  background: i === 1 ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                  color: i === 1 ? 'white' : 'rgba(255,255,255,0.5)',
                  border: i === 1 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}>{s}</span>
              ))}
            </div>
          </div>
          {/* Use case checkboxes */}
          <div>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8, display: 'block', fontFamily: 'var(--mono)', letterSpacing: '0.04em' }}>PRIMARY USE CASE</label>
            {[
              ['Vendor onboarding', true],
              ['Employee training', false],
              ['Customer feedback', false],
            ].map(([label, checked], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 4, display: 'inline-grid', placeItems: 'center',
                  background: checked ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                  border: checked ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  fontSize: 11, color: 'white',
                }}>{checked ? '\u2713' : ''}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <NavButtons nextLabel="Submit & Next \u2192" />
      </div>
    );
  }

  function StepDocUpload() {
    return (
      <div>
        <SectionLabel>DOCUMENT UPLOAD</SectionLabel>
        <AIMessage>
          Upload your W-9 form. PDF or photo accepted.
        </AIMessage>
        {/* Upload area */}
        <div className="fade-up" style={{
          border: '2px dashed rgba(255,255,255,0.12)', borderRadius: 14,
          height: 160, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16,
        }}>
          <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.2)' }}>{'\u2191'}</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Tap to upload or drag a file</span>
          <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>PDF, JPG, PNG UP TO 10MB</span>
        </div>
        {/* Mock uploaded file */}
        <div className="fade-up" style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, marginBottom: 16,
          animationDelay: '0.1s',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>W9_harbor_2026.pdf</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)' }}>1.8 MB</div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 999,
            background: 'color-mix(in srgb, var(--accent) 20%, transparent)',
            fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)',
          }}>{'\u2713'} Validated {'\u00B7'} EIN matches</span>
        </div>
        {/* AI follow-up */}
        <div className="fade-up" style={{
          background: 'rgba(255,255,255,0.06)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '4px 16px 16px 4px', padding: 14, marginBottom: 8,
          color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.55,
          animationDelay: '0.2s',
        }}>
          W-9 looks good. EIN matches your company profile.
        </div>
        <NavButtons />
      </div>
    );
  }

  function StepInfoPresentation() {
    const benefits = [
      { title: 'Health Insurance', content: 'Choice of 3 plans: PPO, HMO, HDHP. Company covers 80% of premiums.' },
      { title: '401(k) Match', content: 'Company matches up to 4% of salary. Vesting over 3 years.' },
      { title: 'PTO Policy', content: '20 days PTO + 10 holidays. Unlimited sick days.' },
    ];
    return (
      <div>
        <SectionLabel>INFORMATION SHARING</SectionLabel>
        <AIMessage>
          Here's a summary of your benefits package. Review each section.
        </AIMessage>
        <div className="fade-up" style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
            2026 Benefits Overview
          </div>
          {benefits.map((b, i) => (
            <div key={i} style={{
              borderBottom: i < benefits.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              marginBottom: 4,
            }}>
              <div
                onClick={() => setExpandedBenefit(expandedBenefit === i ? -1 : i)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', cursor: 'pointer',
                }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{b.title}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>
                  {expandedBenefit === i ? '\u25BE' : '\u25B8'}
                </span>
              </div>
              {expandedBenefit === i && (
                <div style={{
                  padding: '0 0 12px', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55,
                }}>
                  {b.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{
            width: 18, height: 18, borderRadius: 4, display: 'inline-grid', placeItems: 'center',
            background: 'var(--accent)', fontSize: 11, color: 'white',
          }}>{'\u2713'}</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>I have reviewed the benefits information</span>
        </div>
        <NavButtons nextLabel="Acknowledge & Next \u2192" />
      </div>
    );
  }

  function StepScheduling() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const times = ['9 AM', '1 PM', '3 PM'];
    const toggleSlot = (idx) => {
      setSelectedSlots(prev => {
        const ns = new Set(prev);
        if (ns.has(idx)) ns.delete(idx); else ns.add(idx);
        return ns;
      });
    };
    return (
      <div>
        <SectionLabel>SCHEDULING</SectionLabel>
        <AIMessage>
          Let's find a time for your orientation. Select your available slots.
        </AIMessage>
        <div className="fade-up" style={{
          background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 20, marginBottom: 16,
        }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '48px repeat(5, 1fr)', gap: 6, marginBottom: 8 }}>
            <div />
            {days.map(d => (
              <div key={d} style={{
                textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 11,
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em',
              }}>{d}</div>
            ))}
          </div>
          {/* Time rows */}
          {times.map((t, ri) => (
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '48px repeat(5, 1fr)', gap: 6, marginBottom: 6 }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center',
              }}>{t}</div>
              {days.map((d, ci) => {
                const idx = ri * 5 + ci;
                const isSelected = selectedSlots.has(idx);
                return (
                  <div key={d} onClick={() => toggleSlot(idx)} style={{
                    padding: '10px 4px', borderRadius: 8, textAlign: 'center', cursor: 'pointer',
                    background: isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                    color: isSelected ? 'white' : 'rgba(255,255,255,0.3)',
                    fontSize: 11, fontFamily: 'var(--mono)', transition: 'all 0.2s',
                    border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  }}>{'\u25CF'}</div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="fade-up" style={{
          background: 'rgba(255,255,255,0.06)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: '4px 16px 16px 4px', padding: 14, marginBottom: 8,
          color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.55,
          animationDelay: '0.1s',
        }}>
          You're available Tuesday at 1 PM and Thursday at 9 AM. I'll confirm your orientation time shortly.
        </div>
        <NavButtons nextLabel="Complete \u2192" onNext={() => setStep(9)} />
      </div>
    );
  }

  function StepComplete() {
    const items = [
      'Voice conversation', 'Video recording', 'Video walkthrough', 'Document review',
      'Form filling', 'Document upload', 'Information sharing', 'Scheduling',
    ];
    return (
      <div style={{ textAlign: 'center' }}>
        {/* Accent checkmark */}
        <div className="fade-up" style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'color-mix(in srgb, var(--accent) 20%, transparent)',
          border: '2px solid var(--accent)',
          display: 'grid', placeItems: 'center', margin: '0 auto 20px',
        }}>
          <svg width="28" height="28" viewBox="0 0 36 36">
            <path d="M9 18 L15 24 L27 12" fill="none" stroke="var(--accent)" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="30" style={{ animation: 'draw-check 0.6s ease forwards' }} />
          </svg>
        </div>
        <div className="fade-up" style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
          fontSize: 20, color: 'rgba(255,255,255,0.9)', marginBottom: 24,
          letterSpacing: '-0.02em',
        }}>
          You've experienced all Comms modalities
        </div>
        <div className="fade-up" style={{
          display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', marginBottom: 28,
          animationDelay: '0.15s',
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              fontSize: 13, color: 'rgba(255,255,255,0.6)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ color: 'var(--accent)' }}>{'\u2713'}</span>
              {item}
            </div>
          ))}
        </div>
        <a href="Home.html" className="fade-up" style={{
          color: 'var(--accent)', fontSize: 14, textDecoration: 'underline',
          textUnderlineOffset: 3, animationDelay: '0.3s',
        }}>Back to app {'\u2192'}</a>
      </div>
    );
  }

  const stepRenderers = [
    StepWelcome, StepVoice, StepVideoRecord, StepVideoWalkthrough,
    StepDocumentReview, StepFormFilling, StepDocUpload, StepInfoPresentation,
    StepScheduling,
  ];

  const CurrentStep = stepRenderers[step] || StepComplete;

  return (
    <div style={{
      width: '100vw', minHeight: '100vh', fontFamily: 'var(--sans)',
      background: 'linear-gradient(180deg, #0e0e0c 0%, #1a1a18 100%)',
      color: 'white', display: 'flex', flexDirection: 'column',
    }}>
      {/* Top progress bar */}
      <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.08)' }}>
        <div style={{
          height: '100%', background: 'var(--accent)',
          width: `${progress}%`, borderRadius: 2,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Center content */}
      <div style={{
        flex: 1, maxWidth: 640, width: '100%', margin: '0 auto',
        padding: '40px 24px 100px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: step === 0 || step === 9 ? 'center' : 'flex-start',
      }}>
        <div style={{ width: '100%' }}>
          <CurrentStep />
        </div>
      </div>

      {/* Bottom: step dots + step label */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '16px 24px 20px',
        background: 'linear-gradient(transparent, #0e0e0c 50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <StepDots />
        {step < 9 && (
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11,
            color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em',
          }}>
            Step {Math.min(step + 1, totalSteps)} of {totalSteps}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenTryIt, DemoSidebar, DemoTopBar, ScreenDemoVendor, ScreenDemoInterview, ScreenDemoProduct });
