// ============================================================
// Participant MVP — 3 standalone screens (NO AppFrame).
// Landing, Conversation, Complete.
// ============================================================

const { useState: useStatePM } = React;

// ── Landing page — Frosted Glass Invitation ──────────────────
function ScreenParticipantLanding() {
  return (
    <div style={{
      width: '100vw', minHeight: '100vh',
      background: 'linear-gradient(180deg, #f5f0ea 0%, var(--bg) 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--sans)', padding: '40px 20px',
    }}>
      {/* Card */}
      <div style={{
        maxWidth: 440, width: '100%',
        background: 'white',
        borderRadius: 20, padding: '48px 40px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.08)',
        textAlign: 'center',
      }}>
        {/* Powered by */}
        <div className="meta" style={{ fontSize: 9, marginBottom: 28, color: 'var(--ink-4)' }}>
          POWERED BY COMMS
        </div>

        {/* Company logo */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'var(--accent-soft)', border: '2px solid var(--accent)',
          display: 'grid', placeItems: 'center', margin: '0 auto 16px',
        }}>
          <span style={{ color: 'var(--accent)', fontSize: 28, fontWeight: 600 }}>H</span>
        </div>

        {/* Company name */}
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Harbor</div>

        {/* Session type */}
        <div style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 24 }}>Contractor Onboarding</div>

        {/* Hairline */}
        <div style={{ height: 1, background: 'var(--line)', margin: '0 auto 24px', maxWidth: 200 }} />

        {/* Description */}
        <p style={{
          fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6,
          margin: '0 auto 24px', maxWidth: 360,
        }}>
          We need a few things from you before your start date. This guided session takes about 5 minutes.
        </p>

        {/* What you'll need */}
        <div style={{
          textAlign: 'left', padding: 16,
          border: '1px solid var(--line)', borderRadius: 12,
          marginBottom: 24,
        }}>
          {['Government-issued ID', 'W-9 form', 'Insurance certificate', 'NDA signature'].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 0',
              borderTop: i ? '1px solid var(--line)' : 'none',
              fontSize: 13, color: 'var(--ink)',
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '1.5px solid var(--line-2)', flexShrink: 0,
              }} />
              {item}
            </div>
          ))}
        </div>

        {/* Time chip */}
        <div style={{ marginBottom: 24 }}>
          <span className="chip" style={{ fontSize: 12, padding: '6px 14px' }}>About 5 minutes</span>
        </div>

        {/* CTA */}
        <a href="Participant Conversation.html" style={{
          display: 'block', width: '100%', padding: 16,
          borderRadius: 12, fontSize: 15, fontWeight: 500,
          background: 'var(--accent)', color: 'white',
          textDecoration: 'none', textAlign: 'center',
        }}>
          Start your session {'\u2192'}
        </a>
      </div>

      {/* Footer */}
      <div style={{
        fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--ink-4)',
        letterSpacing: '0.04em', marginTop: 20, textAlign: 'center',
      }}>
        Secure {'\u00B7'} Encrypted {'\u00B7'} Powered by Comms
      </div>
    </div>
  );
}

// ── Conversation — Immersive Dark Experience ─────────────────
function ScreenParticipantConversation() {
  const progress = (2 / 6) * 100;

  // Waveform bars
  function DarkWaveform({ bars = 20, width = '70%' }) {
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
              height: Math.min(h, 28),
              animation: `waveform-bar 0.8s ease-in-out ${i * 0.05}s infinite alternate`,
            }} />
          );
        })}
      </div>
    );
  }

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
        flex: 1, maxWidth: 600, width: '100%', margin: '0 auto',
        padding: '40px 24px 120px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* AI Avatar */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), oklch(0.55 0.17 200))',
          border: '3px solid color-mix(in srgb, var(--accent) 30%, transparent)',
          display: 'grid', placeItems: 'center',
          animation: 'glow-border 2.4s ease-in-out infinite',
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 24, color: 'white', fontWeight: 600 }}>C</span>
        </div>

        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Comms</div>
        <span style={{
          display: 'inline-block', padding: '4px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)',
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.03em',
          marginBottom: 28,
        }}>
          CONTRACTOR ONBOARDING
        </span>

        {/* Waveform */}
        <div style={{ marginBottom: 28, width: '100%' }}>
          <DarkWaveform bars={20} width="70%" />
        </div>

        {/* Messages */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* AI message */}
          <div style={{
            background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 16,
            color: 'rgba(255,255,255,0.9)', fontSize: 14, lineHeight: 1.55,
          }}>
            Now I need your government ID. Take a clear photo of the front — all four corners visible.
          </div>

          {/* Upload area */}
          <div style={{
            border: '2px dashed rgba(255,255,255,0.15)', borderRadius: 14,
            height: 120, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.2)' }}>{'\u2191'}</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
              Tap to upload or take a photo
            </span>
          </div>

          {/* Uploaded file */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 12,
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
                drivers_license_front.jpg
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)' }}>
                2.4 MB
              </div>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '4px 10px', borderRadius: 999,
              background: 'color-mix(in srgb, var(--accent) 20%, transparent)',
              fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)',
            }}>
              {'\u2713'} Validated
            </span>
          </div>

          {/* AI follow-up */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: '4px 16px 16px 4px', padding: 14,
            color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.55,
          }}>
            ID looks clear. Name matches your profile.
          </div>
        </div>
      </div>

      {/* Bottom — Voice input */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '16px 24px 24px',
        background: 'linear-gradient(transparent, #0e0e0c 40%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="breathe" style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--accent)', display: 'grid', placeItems: 'center',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 20, color: 'white' }}>{'\u25CF'}</span>
          </div>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Hold spacebar or tap mic</span>
        </div>

        <a href="Participant Complete.html" style={{
          background: 'var(--accent)', color: 'white',
          padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 500,
          textDecoration: 'none',
        }}>
          Next {'\u2192'}
        </a>
      </div>

      {/* Step indicator */}
      <div style={{
        position: 'fixed', bottom: 8, left: 0, right: 0,
        textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 11,
        color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em',
      }}>
        Step 2 of 6
      </div>
    </div>
  );
}

// ── Complete / Thanks ─────────────────────────────────────
function ScreenParticipantComplete() {
  const items = [
    { label: 'Government ID', type: 'document' },
    { label: 'W-9', type: 'document' },
    { label: 'Insurance cert', type: 'document' },
    { label: 'NDA', type: 'e-signature' },
  ];

  return (
    <div style={{
      width: '100vw', minHeight: '100vh',
      background: 'var(--bg)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--sans)', padding: '40px 20px',
    }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
        {/* Accent checkmark */}
        <div className="fade-up" style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--accent-soft)', border: '3px solid var(--accent)',
          display: 'grid', placeItems: 'center', margin: '0 auto 24px',
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path d="M9 18 L15 24 L27 12" fill="none" stroke="var(--accent)" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="30" style={{ animation: 'draw-check 0.6s ease forwards' }} />
          </svg>
        </div>

        <h1 className="fade-up" style={{
          ...window.APP_SCALE.titleLg, margin: '0 0 8px', fontSize: 28,
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
          letterSpacing: '-0.02em',
        }}>
          All done. Thank you.
        </h1>
        <p className="fade-up" style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 28, animationDelay: '0.1s' }}>
          You completed 6 steps in 4 minutes 32 seconds
        </p>

        {/* What was submitted */}
        <div className="fade-up" style={{
          textAlign: 'left', padding: '20px 24px', background: 'var(--bg-elev)',
          border: '1px solid var(--line)', borderRadius: 14, marginBottom: 28,
          animationDelay: '0.2s',
        }}>
          <div className="meta" style={{ marginBottom: 12 }}>WHAT WAS SUBMITTED</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>3 documents, 1 e-signature</div>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 0', borderTop: i ? '1px solid var(--line)' : 'none',
              fontSize: 14, color: 'var(--ink)',
            }}>
              <span>{item.label}</span>
              <span style={{ color: 'var(--accent)', fontSize: 13 }}>{'\u2713'}</span>
            </div>
          ))}
        </div>

        <p className="fade-up" style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 24, animationDelay: '0.3s' }}>
          Your responses have been sent to Harbor.
        </p>

        <a className="fade-up" href="#" style={{
          fontSize: 13, color: 'var(--ink-3)', textDecoration: 'underline',
          textUnderlineOffset: 3, animationDelay: '0.35s',
        }}>
          Close this window
        </a>

        <div className="fade-up" style={{
          marginTop: 40, fontSize: 11, fontFamily: 'var(--mono)',
          color: 'var(--ink-4)', letterSpacing: '0.05em', animationDelay: '0.4s',
        }}>
          Powered by Comms
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenParticipantLanding, ScreenParticipantConversation, ScreenParticipantComplete });
