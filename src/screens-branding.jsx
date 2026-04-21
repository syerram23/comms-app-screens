// ============================================================
// BRANDING — Design System style guide (standalone, no AppFrame)
// ============================================================

function ScreenBranding() {
  const section = (title, children) => (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20,
        paddingBottom: 12, borderBottom: '1px solid var(--line)',
      }}>
        <h2 style={{ ...window.APP_SCALE.titleMd, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  const swatch = (name, value, token) => (
    <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <div style={{
        width: 64, height: 48, borderRadius: 8,
        background: value, border: '1px solid var(--line)',
      }} />
      <span className="meta" style={{ fontSize: 9, textAlign: 'center' }}>{name}</span>
      <span className="meta" style={{ fontSize: 8, textAlign: 'center', color: 'var(--ink-3)' }}>{token}</span>
    </div>
  );

  return (
    <div data-screen-label="Branding · Design System" style={{
      width: 1280, background: 'var(--bg)', color: 'var(--ink)',
      fontFamily: 'var(--sans)', padding: '48px 64px 64px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="meta" style={{ marginBottom: 8 }}>DESIGN SYSTEM</div>
        <h1 style={{ ...window.APP_SCALE.titleLg, fontSize: 36, margin: 0 }}>
          Comms <span className="italic-serif" style={{ color: 'var(--ink-3)' }}>· Design System</span>
        </h1>
        <div className="meta" style={{ marginTop: 8 }}>V1.0 · APRIL 2026</div>
      </div>

      {/* ---- Section 1: Colors ---- */}
      {section('Logo & Mark', (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
            {/* Light background */}
            <div style={{ background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:12, padding:'40px 32px', display:'flex', alignItems:'center', gap:32 }}>
              {/* Wordmark */}
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:'var(--ink)', display:'grid', placeItems:'center' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)' }}/>
                </div>
                <span style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.02em' }}>Comms</span>
              </div>
              {/* Mark only */}
              <div style={{ width:40, height:40, borderRadius:10, background:'var(--ink)', display:'grid', placeItems:'center' }}>
                <div style={{ width:12, height:12, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent)' }}/>
              </div>
              {/* Dot only */}
              <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)' }}/>
            </div>
            {/* Dark background */}
            <div style={{ background:'var(--ink)', borderRadius:12, padding:'40px 32px', display:'flex', alignItems:'center', gap:32 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:'var(--bg-elev)', display:'grid', placeItems:'center' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent)' }}/>
                </div>
                <span style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.02em', color:'var(--bg-elev)' }}>Comms</span>
              </div>
              <div style={{ width:40, height:40, borderRadius:10, background:'var(--bg-elev)', display:'grid', placeItems:'center' }}>
                <div style={{ width:12, height:12, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent)' }}/>
              </div>
              <div style={{ width:16, height:16, borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)' }}/>
            </div>
          </div>
          {/* Usage rules */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
            {[
              ['Wordmark', 'Mark + "Comms" text. Use as the primary logo in nav, emails, and documents.'],
              ['App mark', 'Square mark for app icon, favicon, and loading states.'],
              ['Dot mark', 'Accent dot alone. Status indicators, small contexts, notifications.'],
              ['Clear space', 'Maintain 1× mark width clear space on all sides.'],
            ].map(([n, d]) => (
              <div key={n} style={{ border:'1px solid var(--line)', borderRadius:8, padding:12, background:'var(--bg-elev)' }}>
                <div className="meta" style={{ marginBottom:4 }}>{n.toUpperCase()}</div>
                <div style={{ fontSize:12, color:'var(--ink-2)', lineHeight:1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {section('Iconography', (
        <div>
          <div className="meta" style={{ marginBottom:16 }}>NAV GLYPHS — Unicode symbols used as lightweight icons throughout the sidebar</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:10, marginBottom:24 }}>
            {[
              ['\u2302', 'Home', 'Dashboard'],
              ['\u2726', 'Builder', 'Create flows'],
              ['\u25EB', 'Campaigns', 'Active sessions'],
              ['\u25C9', 'People', 'Participants'],
              ['\u274D', 'Templates', 'Saved flows'],
              ['\u2315', 'Search', 'NL query'],
              ['\u25D4', 'Notifications', 'Activity'],
            ].map(([g, label, desc]) => (
              <div key={label} style={{ border:'1px solid var(--line)', borderRadius:8, padding:14, textAlign:'center', background:'var(--bg-elev)' }}>
                <div style={{ fontSize:24, marginBottom:6, color:'var(--ink)' }}>{g}</div>
                <div style={{ fontSize:12, fontWeight:500, marginBottom:2 }}>{label}</div>
                <div className="meta" style={{ fontSize:9 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div className="meta" style={{ marginBottom:16 }}>TRY IT ICONS</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:24 }}>
            {[
              ['\u25C7', 'Vendor', 'Onboarding demo'],
              ['\u25C8', 'Interview', 'Screening demo'],
              ['\u25A3', 'Product', 'Walk-through demo'],
            ].map(([g, label, desc]) => (
              <div key={label} style={{ border:'1px solid var(--line)', borderRadius:8, padding:14, textAlign:'center', background:'var(--bg-elev)' }}>
                <div style={{ fontSize:24, marginBottom:6, color:'var(--ink)' }}>{g}</div>
                <div style={{ fontSize:12, fontWeight:500, marginBottom:2 }}>{label}</div>
                <div className="meta" style={{ fontSize:9 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div className="meta" style={{ marginBottom:16 }}>STATUS INDICATORS</div>
          <div style={{ display:'flex', gap:16, marginBottom:24 }}>
            {[
              ['Recording', 'var(--accent)', true],
              ['Active', 'var(--accent)', false],
              ['Pending', 'var(--ink-3)', false],
              ['Validated', 'var(--accent)', false],
              ['Error', '#d44', false],
            ].map(([label, color, pulse]) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:color, ...(pulse ? { animation:'pulse-ring 1.6s infinite' } : {}) }}/>
                <span style={{ fontSize:12, color:'var(--ink-2)' }}>{label}</span>
              </div>
            ))}
          </div>
          <div className="meta" style={{ marginBottom:16 }}>BUILDER BLOCK TYPES</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
            {[
              ['Say', 'AI speaks or texts'],
              ['Ask', 'Open-ended question'],
              ['Choose', 'Multiple choice'],
              ['Collect', 'Upload + OCR'],
              ['Sign', 'E-signature'],
              ['Branch', 'AI-routed split'],
              ['Handoff', 'Route to human'],
              ['Score', 'Rubric scorer'],
            ].map(([n, d]) => (
              <div key={n} style={{ border:'1px solid var(--line)', borderRadius:8, padding:10, background:'var(--bg-elev)' }}>
                <span className="chip" style={{ marginBottom:4 }}>{n}</span>
                <div style={{ fontSize:11, color:'var(--ink-3)', marginTop:6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {section('Colors', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div className="meta" style={{ marginBottom: 10 }}>LIGHT MODE</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {swatch('Background', '#faf8f5', '--bg')}
              {swatch('Elevated', '#ffffff', '--bg-elev')}
              {swatch('Ink', '#0e0e0c', '--ink')}
              {swatch('Ink 2', '#2a2a27', '--ink-2')}
              {swatch('Ink 3', '#575751', '--ink-3')}
              {swatch('Ink 4', '#8a8a82', '--ink-4')}
              {swatch('Line', '#e7e3db', '--line')}
              {swatch('Line 2', '#d8d2c5', '--line-2')}
              {swatch('Chip', '#f0ece3', '--chip')}
              {swatch('Accent', 'oklch(0.62 0.17 148)', '--accent')}
              {swatch('Accent Soft', 'oklch(0.94 0.06 148)', '--accent-soft')}
              {swatch('Accent Ink', 'oklch(0.32 0.12 148)', '--accent-ink')}
            </div>
          </div>
          <div>
            <div className="meta" style={{ marginBottom: 10 }}>DARK MODE</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {swatch('Background', '#0e0e0c', '--bg')}
              {swatch('Elevated', '#17171a', '--bg-elev')}
              {swatch('Ink', '#f4f1ea', '--ink')}
              {swatch('Ink 2', '#d8d4cb', '--ink-2')}
              {swatch('Ink 3', '#a29e93', '--ink-3')}
              {swatch('Ink 4', '#6a665c', '--ink-4')}
              {swatch('Line', '#2a2a26', '--line')}
              {swatch('Line 2', '#3a3a34', '--line-2')}
              {swatch('Chip', '#1f1f1b', '--chip')}
            </div>
          </div>
        </div>
      ))}

      {/* ---- Section 2: Typography ---- */}
      {section('Typography', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Inter Tight */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 16 }}>INTER TIGHT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div className="meta" style={{ marginBottom: 4 }}>DISPLAY · 28PX / 600</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
              <div>
                <div className="meta" style={{ marginBottom: 4 }}>H1 · 22PX / 600</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>
                  Every conversation, every channel, one platform
                </div>
              </div>
              <div>
                <div className="meta" style={{ marginBottom: 4 }}>H2 · 17PX / 500</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 500 }}>
                  Participants, campaigns, and real-time analytics
                </div>
              </div>
              <div>
                <div className="meta" style={{ marginBottom: 4 }}>BODY · 14PX / 400</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 400, lineHeight: 1.5, maxWidth: 640 }}>
                  Comms orchestrates multi-channel conversations with your extended workforce. Send an SMS, escalate to voice, collect documents — all in one session. Built for staffing agencies, healthcare systems, and logistics operators.
                </div>
              </div>
            </div>
          </div>

          {/* JetBrains Mono */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 16 }}>JETBRAINS MONO</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div className="meta" style={{ marginBottom: 4 }}>META · 11PX / 500 · UPPERCASE</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                  Session ID: s_2u8x4lq9 · Duration: 4m 12s · Status: complete
                </div>
              </div>
              <div>
                <div className="meta" style={{ marginBottom: 4 }}>CODE · 13PX / 400</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 400, color: 'var(--ink-2)' }}>
                  cert:expiring&lt;30d AND zone:west AND tier:enterprise
                </div>
              </div>
            </div>
          </div>

          {/* Instrument Serif */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 16 }}>INSTRUMENT SERIF</div>
            <div>
              <div className="meta" style={{ marginBottom: 4 }}>ITALIC ACCENT · 22PX / 400 ITALIC</div>
              <div className="italic-serif" style={{ fontSize: 22, color: 'var(--ink-3)' }}>
                every one still running.
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ---- Section 3: Components ---- */}
      {section('Components', (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Buttons */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>BUTTONS</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="primary">Primary action</button>
              <button className="ghost">Ghost action</button>
              <Btn variant="subtle">Subtle action</Btn>
              <button className="primary" style={{ background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>Accent action</button>
            </div>
          </div>

          {/* Pills / Chips */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>PILLS & CHIPS</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="chip">default chip</span>
              <Pill tone="accent">● ACTIVE</Pill>
              <Pill tone="warn">● PENDING</Pill>
              <Pill tone="danger">● EXCEPTION</Pill>
              <Pill tone="neutral">NEUTRAL</Pill>
              <span className="chip">onboarding</span>
              <span className="chip">enterprise</span>
              <span className="chip">SMS</span>
            </div>
          </div>

          {/* Status badges */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>STATUS INDICATORS</div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {[
                ['Completion', 'var(--accent)', 'var(--accent-ink)'],
                ['Pending', 'oklch(0.66 0.17 70)', 'oklch(0.40 0.14 60)'],
                ['Exception', 'oklch(0.55 0.18 25)', 'oklch(0.40 0.14 25)'],
                ['Live', 'var(--accent)', 'var(--accent-ink)'],
              ].map(([label, dotBg, textColor]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotBg }} />
                  <span style={{ fontSize: 12, fontFamily: 'var(--mono)', color: textColor }}>{label.toUpperCase()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="recording-dot" />
                <span className="meta">RECORDING</span>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>FORM FIELDS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 600 }}>
              <div>
                <label className="meta" style={{ display: 'block', marginBottom: 6 }}>PARTICIPANT NAME</label>
                <input value="María Ortega" readOnly style={{
                  width: '100%', padding: '8px 12px', border: '1px solid var(--line)',
                  borderRadius: 8, fontSize: 13, background: 'var(--bg)', color: 'var(--ink)',
                  fontFamily: 'var(--sans)',
                }} />
              </div>
              <div>
                <label className="meta" style={{ display: 'block', marginBottom: 6 }}>EMAIL ADDRESS</label>
                <input value="mortega@customersbancorp.com" readOnly style={{
                  width: '100%', padding: '8px 12px', border: '1px solid var(--line)',
                  borderRadius: 8, fontSize: 13, background: 'var(--bg)', color: 'var(--ink)',
                  fontFamily: 'var(--sans)',
                }} />
              </div>
            </div>
          </div>

          {/* Metric bars */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>METRIC BARS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5 }}>Default (ink)</span>
                  <span className="meta">69%</span>
                </div>
                <div className="metric-bar"><i style={{ width: '69%' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5 }}>Accent</span>
                  <span className="meta">94%</span>
                </div>
                <div className="metric-bar accent"><i style={{ width: '94%' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5 }}>Low fill</span>
                  <span className="meta">22%</span>
                </div>
                <div className="metric-bar"><i style={{ width: '22%' }} /></div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>CARDS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{
                padding: 16, border: '1px solid var(--line)', borderRadius: 10,
                background: 'var(--bg)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Standard card</div>
                <div className="meta" style={{ marginBottom: 8 }}>WITH BORDER AND SUBTLE SHADOW</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  Used for list items, drafts, settings panels, and configuration blocks.
                </div>
              </div>
              <div style={{
                padding: 16, border: '1px solid var(--line)', borderRadius: 10,
                background: 'var(--bg)',
                borderLeft: '3px solid var(--accent)',
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Active/selected card</div>
                <div className="meta" style={{ marginBottom: 8 }}>LEFT ACCENT BORDER VARIANT</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  Used for selected list items, active notifications, and focused states.
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ---- Section 4: Spacing & Radius ---- */}
      {section('Spacing & Radius', (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>SPACING SCALE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[4, 8, 12, 16, 20, 24, 32, 48, 64].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="meta" style={{ width: 32, textAlign: 'right' }}>{s}PX</span>
                  <div style={{
                    width: s * 2, height: 8, borderRadius: 2,
                    background: 'var(--accent)', opacity: 0.6,
                  }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 14 }}>BORDER RADIUS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['6px', 'Chip', 6],
                ['8px', 'Input / small card', 8],
                ['10px', 'Card sm / --radius', 10],
                ['14px', 'Card', 14],
                ['18px', 'Panel / --radius-lg', 18],
                ['999px', 'Pill / button', 999],
              ].map(([val, label, r]) => (
                <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 48, height: 32, borderRadius: r,
                    border: '2px solid var(--ink)', background: 'var(--chip)',
                  }} />
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{val}</span>
                    <span className="meta" style={{ marginLeft: 8 }}>{label.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ---- Section 5: Accent Variants ---- */}
      {section('Accent Variants', (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {/* Signal (green — default) */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 12 }}>SIGNAL (DEFAULT)</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              {[
                ['Accent', 'oklch(0.62 0.17 148)'],
                ['Soft', 'oklch(0.94 0.06 148)'],
                ['Ink', 'oklch(0.32 0.12 148)'],
              ].map(([n, c]) => (
                <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 48, height: 36, borderRadius: 6, background: c, border: '1px solid var(--line)' }} />
                  <span className="meta" style={{ fontSize: 9 }}>{n.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <Pill tone="accent">● SIGNAL PILL</Pill>
          </div>

          {/* Cobalt (blue) */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 12 }}>COBALT</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              {[
                ['Accent', 'oklch(0.58 0.17 255)'],
                ['Soft', 'oklch(0.94 0.04 255)'],
                ['Ink', 'oklch(0.32 0.12 255)'],
              ].map(([n, c]) => (
                <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 48, height: 36, borderRadius: 6, background: c, border: '1px solid var(--line)' }} />
                  <span className="meta" style={{ fontSize: 9 }}>{n.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <span className="chip" style={{
              background: 'oklch(0.94 0.04 255)',
              color: 'oklch(0.32 0.12 255)',
              borderColor: 'transparent',
            }}>● COBALT PILL</span>
          </div>

          {/* Ember (orange) */}
          <div style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 14, background: 'var(--bg-elev)' }}>
            <div className="meta" style={{ marginBottom: 12 }}>EMBER</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              {[
                ['Accent', 'oklch(0.66 0.17 45)'],
                ['Soft', 'oklch(0.95 0.05 55)'],
                ['Ink', 'oklch(0.38 0.14 40)'],
              ].map(([n, c]) => (
                <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 48, height: 36, borderRadius: 6, background: c, border: '1px solid var(--line)' }} />
                  <span className="meta" style={{ fontSize: 9 }}>{n.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <span className="chip" style={{
              background: 'oklch(0.95 0.05 55)',
              color: 'oklch(0.38 0.14 40)',
              borderColor: 'transparent',
            }}>● EMBER PILL</span>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { ScreenBranding });
