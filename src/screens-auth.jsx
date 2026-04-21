// ============================================================
// Phase 6 · AUTH — sign up, log in, magic link, verify, onboarding
//
// Presented on a split editorial layout (dark left, white form right)
// to echo the "editorial quiet" feel of the marketing site.
// Fixed frame 1280×820.
// ============================================================

function AuthFrame({ screenLabel, children, sideCopy, sideFoot }) {
  return (
    <div data-screen-label={screenLabel} style={{
      width:1280, height:820,
      border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      display:'grid', gridTemplateColumns:'1.1fr 1fr',
      fontFamily:'var(--sans)', background:'var(--bg)',
    }}>
      {/* left · editorial */}
      <div style={{
        background:'var(--ink)', color:'var(--bg)',
        padding:'40px 44px', display:'flex', flexDirection:'column', justifyContent:'space-between',
        position:'relative', overflow:'hidden',
      }}>
        {/* grid bg */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize:'56px 56px', pointerEvents:'none',
        }}/>
        <div style={{ position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
            <div style={{ width:26, height:26, borderRadius:8, background:'var(--bg)', display:'grid', placeItems:'center' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)' }}/>
            </div>
            <span style={{ fontSize:17, fontWeight:600, letterSpacing:'-0.02em' }}>Comms</span>
          </div>
          <div className="meta" style={{ marginTop:32, color:'rgba(255,255,255,0.5)' }}>● LIVE · 184k conversations this month</div>
        </div>
        <div style={{ position:'relative' }}>
          <h2 style={{ fontSize:44, fontWeight:500, letterSpacing:'-0.03em', lineHeight:1.05, margin:0, maxWidth:'13ch' }}>
            {sideCopy.title} <span className="italic-serif" style={{ color:'rgba(255,255,255,0.55)' }}>{sideCopy.italic}</span>
          </h2>
          <p style={{ marginTop:18, fontSize:14.5, color:'rgba(255,255,255,0.72)', maxWidth:'42ch', lineHeight:1.55 }}>
            {sideCopy.body}
          </p>
        </div>
        <div style={{ position:'relative' }}>
          {sideFoot || <div className="meta" style={{ color:'rgba(255,255,255,0.45)' }}>SOC 2 TYPE II · HIPAA · ISO 27001 · SSO</div>}
        </div>
      </div>
      {/* right · form */}
      <div style={{ background:'var(--bg)', padding:'40px 56px', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative' }}>
        {children}
      </div>
    </div>
  );
}

function AuthField({ label, value, placeholder, type='text', hint, right }) {
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <label className="meta" style={{ marginBottom:6, display:'block' }}>{label.toUpperCase()}</label>
        {right}
      </div>
      <input type={type} defaultValue={value} placeholder={placeholder} style={{
        width:'100%', padding:'11px 14px', border:'1px solid var(--line-2)', borderRadius:10,
        background:'var(--bg-elev)', fontFamily:'var(--sans)', fontSize:14, color:'var(--ink)',
      }}/>
      {hint && <div className="meta" style={{ marginTop:6, textTransform:'none', letterSpacing:0 }}>{hint}</div>}
    </div>
  );
}

function SSOButton({ provider, k }) {
  return (
    <button style={{
      display:'grid', gridTemplateColumns:'20px 1fr', gap:10, alignItems:'center',
      padding:'10px 14px', border:'1px solid var(--line-2)', borderRadius:10,
      background:'var(--bg-elev)', fontSize:13.5, cursor:'pointer', color:'var(--ink)',
      textAlign:'left',
    }}>
      <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)' }}>{k}</span>
      <span>Continue with <strong style={{ fontWeight:500 }}>{provider}</strong></span>
    </button>
  );
}

function ScreenSignUp() {
  return (
    <AuthFrame screenLabel="06a Auth · Sign up"
      sideCopy={{
        title: 'Have real conversations.',
        italic: 'Get structured data back.',
        body: 'Fourteen days of Professional on the house. No credit card, no sales call. Reach your first participants in under ten minutes.',
      }}
      sideFoot={<div style={{ display:'flex', gap:18 }}>
        {['Harbor','Meridian','Clipboard','Assembly'].map(c => <span key={c} className="meta" style={{ color:'rgba(255,255,255,0.45)' }}>{c.toUpperCase()}</span>)}
      </div>}
    >
      <div style={{ maxWidth:420 }}>
        <div className="meta" style={{ marginBottom:10 }}>CREATE YOUR ACCOUNT</div>
        <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
          Start free. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>Upgrade later.</span>
        </h1>
        <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:8 }}>
          14-day Professional trial · no credit card required.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:22 }}>
          <SSOButton provider="Google" k="G"/>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:10, margin:'22px 0', color:'var(--ink-3)', fontFamily:'var(--mono)', fontSize:10 }}>
          <div style={{ flex:1, height:1, background:'var(--line)' }}/>
          OR WITH EMAIL
          <div style={{ flex:1, height:1, background:'var(--line)' }}/>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <AuthField label="Work email" placeholder="you@company.com"/>
          <AuthField label="Password" type="password" placeholder="••••••••••" hint="At least 12 characters · 1 number · 1 symbol"/>
          <label style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:12, color:'var(--ink-2)', lineHeight:1.5 }}>
            <input type="checkbox" defaultChecked style={{ marginTop:2, accentColor:'var(--ink)' }}/>
            I agree to the <a style={{ color:'var(--ink)', textDecoration:'underline' }}>Terms</a> and <a style={{ color:'var(--ink)', textDecoration:'underline' }}>Privacy Policy</a>.
          </label>
          <button className="primary" onClick={() => window.location.href='Onboarding.html'} style={{ padding:'12px 16px', borderRadius:10, width:'100%' }}>Create account →</button>
        </div>

        <div style={{ marginTop:20, fontSize:13, color:'var(--ink-3)' }}>
          Already have an account? <a href="Log In.html" style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>Log in →</a>
        </div>
      </div>
    </AuthFrame>
  );
}

function ScreenLogin() {
  return (
    <AuthFrame screenLabel="06b Auth · Log in"
      sideCopy={{
        title: 'Welcome back.',
        italic: 'Pick up where you left off.',
        body: '3 live sessions. 2 drafts waiting. Your Monday campaign ships in 4 hours.',
      }}>
      <div style={{ maxWidth:420 }}>
        <div className="meta" style={{ marginBottom:10 }}>LOG IN</div>
        <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>Good to see you. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>Again.</span></h1>

        <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:22 }}>
          <SSOButton provider="Google" k="G"/>
          <SSOButton provider="Magic link" k="✉"/>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10, margin:'22px 0', color:'var(--ink-3)', fontFamily:'var(--mono)', fontSize:10 }}>
          <div style={{ flex:1, height:1, background:'var(--line)' }}/>
          OR WITH PASSWORD
          <div style={{ flex:1, height:1, background:'var(--line)' }}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <AuthField label="Work email" placeholder="you@company.com"/>
          <AuthField label="Password" type="password" placeholder="••••••••••"
            right={<a className="meta" href="Magic Link.html" style={{ color:'var(--ink-2)' }}>FORGOT?</a>}/>
          <button className="primary" onClick={() => window.location.href='Home.html'} style={{ padding:'12px 16px', borderRadius:10 }}>Log in</button>
        </div>
        <div style={{ marginTop:20, fontSize:13, color:'var(--ink-3)' }}>
          New here? <a href="Sign Up.html" style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>Create an account →</a>
        </div>
      </div>
    </AuthFrame>
  );
}

function ScreenMagicLink() {
  return (
    <AuthFrame screenLabel="06c Auth · Magic link sent"
      sideCopy={{ title:'Check your inbox.', italic:'We just sent you a link.',
        body:'One-tap login, good for 15 minutes. Nothing for you to remember — not even a password.' }}
    >
      <div style={{ maxWidth:440 }}>
        <div className="meta" style={{ marginBottom:10 }}>✓ MAGIC LINK SENT</div>
        <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>Open your email.</h1>
        <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:12, lineHeight:1.5 }}>
          We sent a sign-in link to{' '}
          <strong style={{ color:'var(--ink)' }}>ellis.kato@harbor.co</strong>. Tap it to log in.
          The link expires in 15 minutes.
        </p>
        <div style={{ marginTop:16, marginBottom:8 }}>
          <AuthField label="Email address" placeholder="you@company.com" type="email" />
        </div>
        <div style={{ marginTop:22, padding:16, border:'1px dashed var(--line-2)', borderRadius:12, background:'var(--bg-elev)', fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-2)', lineHeight:1.6 }}>
          ✉ INBOX<br/>
          FROM · hi@comms.ai<br/>
          SUBJ · your comms link · 15m<br/>
          ─────────────<br/>
          <span style={{ color:'var(--accent-ink)' }}>● OPEN COMMS →</span>
        </div>
        <div style={{ marginTop:22, display:'flex', gap:10 }}>
          <button className="ghost" style={{ padding:'10px 16px' }}>Resend (30s)</button>
          <button className="ghost" onClick={() => window.location.href='Log In.html'} style={{ padding:'10px 16px' }}>Use password instead</button>
        </div>
      </div>
    </AuthFrame>
  );
}

function ScreenOnboarding() {
  const [step, setStep] = React.useState(1);
  const [selected, setSelected] = React.useState([]);
  const [template, setTemplate] = React.useState(null);
  const [role, setRole] = React.useState(0);
  const [size, setSize] = React.useState(1);

  const useCases = [
    { id:'contractor', title:'Contractor Management', desc:'Onboarding, credentialing, compliance tracking, re-engagement' },
    { id:'hr', title:'People Ops & HR', desc:'Employee onboarding, training, check-ins, exit interviews' },
    { id:'feedback', title:'Customer Feedback', desc:'NPS, CSAT, voice surveys, product research interviews' },
    { id:'intake', title:'Client Intake', desc:'New client onboarding, document collection, kickoff' },
    { id:'procurement', title:'Procurement & Vendors', desc:'Vendor onboarding, SOW management, compliance verification' },
    { id:'training', title:'Training & Certification', desc:'Voice-based assessments, compliance training, skill verification' },
    { id:'scheduling', title:'Scheduling & Coordination', desc:'Availability checks, shift confirmations, multi-party coordination' },
    { id:'announcements', title:'Announcements & Updates', desc:'Policy rollouts, safety alerts, acknowledgment tracking' },
  ];

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);

  const stepDefs = [
    { n:'1', label:'Create account' },
    { n:'2', label:'Name your workspace' },
    { n:'3', label:'Pick use cases' },
    { n:'4', label:'Choose a template' },
    { n:'5', label:'Invite teammates' },
  ];

  const templates = [
    { id:'vendor',   title:'Vendor Onboarding',   desc:'Collect COI, W-9, MSA, banking details' },
    { id:'employee', title:'Employee Onboarding',  desc:'Policies, training, documents, emergency contact' },
    { id:'feedback', title:'Customer Feedback',    desc:'NPS, voice survey, adaptive follow-ups' },
    { id:'intake',   title:'Client Intake',        desc:'Requirements gathering, document collection, kickoff' },
  ];

  const goNext = () => setStep(s => Math.min(s + 1, 5));
  const goBack = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div data-screen-label="06d Auth · First-run onboarding" style={{
      width:1280, height:820,
      background:'var(--bg)', border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      display:'grid', gridTemplateColumns:'320px 1fr', fontFamily:'var(--sans)',
    }}>
      {/* step rail */}
      <div style={{ background:'var(--bg-elev)', borderRight:'1px solid var(--line)', padding:'40px 32px', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
          <div style={{ width:26, height:26, borderRadius:8, background:'var(--ink)', display:'grid', placeItems:'center' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)' }}/>
          </div>
          <span style={{ fontSize:17, fontWeight:600 }}>Comms</span>
        </div>
        <div className="meta" style={{ marginTop:32, marginBottom:18 }}>SET UP YOUR WORKSPACE · 2 MIN</div>
        {stepDefs.map((sd, i) => {
          const idx = i + 1;
          const done = idx < step;
          const active = idx === step;
          const future = idx > step;
          return (
            <div key={i}
              onClick={() => idx <= step && setStep(idx)}
              style={{ display:'grid', gridTemplateColumns:'28px 1fr', gap:12, alignItems:'center', padding:'12px 0', borderTop: i?'1px solid var(--line)':'none', cursor: idx <= step ? 'pointer' : 'default' }}>
              <span style={{
                width:24, height:24, borderRadius:'50%',
                background: done?'var(--accent)':active?'var(--ink)':'transparent',
                color: done||active?'var(--bg)':'var(--ink-3)',
                border: done||active?'none':'1px solid var(--line-2)',
                display:'grid', placeItems:'center', fontSize:11, fontFamily:'var(--mono)',
              }}>{done ? '✓' : sd.n}</span>
              <div>
                <div style={{ fontSize:13.5, fontWeight: active?500:400, color: active?'var(--ink)':done?'var(--ink-2)':'var(--ink-3)' }}>{sd.label}</div>
                {active && <div className="meta" style={{ color:'var(--accent-ink)' }}>● IN PROGRESS</div>}
              </div>
            </div>
          );
        })}

        {step === 3 && selected.length > 0 && (
          <div style={{ marginTop:28, padding:'14px 16px', background:'var(--accent-soft)', borderRadius:8, border:'1px solid var(--line)' }}>
            <div className="meta" style={{ color:'var(--accent-ink)', marginBottom:4 }}>SELECTED</div>
            <div style={{ fontSize:22, fontWeight:600, color:'var(--ink)' }}>{selected.length}</div>
            <div style={{ fontSize:12, color:'var(--ink-3)' }}>use case{selected.length !== 1 ? 's' : ''}</div>
          </div>
        )}

        <div style={{ flex:1 }}/>
        <div className="meta" style={{ color:'var(--ink-4)' }}>Step {step} of 5</div>
      </div>

      {/* right panel — changes per step */}
      <div style={{ padding:'40px 48px', overflow:'auto' }}>

        {/* STEP 1: Create account */}
        {step === 1 && (
          <div>
            <div className="meta" style={{ marginBottom:10 }}>STEP 1 / 5 · ACCOUNT</div>
            <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
              Create your account. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>Takes 30 seconds.</span>
            </h1>
            <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:8, maxWidth:580, marginBottom:28 }}>
              Sign up with your work email or use single sign-on. No credit card required.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:480 }}>
              <AuthField label="Full name" value="Sarah Kim" placeholder="Your name"/>
              <AuthField label="Work email" value="sarah@harbor.co" placeholder="you@company.com"/>
              <AuthField label="Password" value="" placeholder="Create a password" type="password" hint="At least 8 characters"/>
              <div style={{ display:'flex', gap:8, marginTop:4 }}>
                <SSOButton provider="Google" k="G"/>
                <SSOButton provider="Microsoft" k="M"/>
              </div>
            </div>
            <div style={{ marginTop:28, display:'flex', gap:10 }}>
              <button className="primary" onClick={goNext} style={{ padding:'10px 16px' }}>Create account → <KBD>⌘↵</KBD></button>
            </div>
          </div>
        )}

        {/* STEP 2: Name workspace */}
        {step === 2 && (
          <div>
            <div className="meta" style={{ marginBottom:10 }}>STEP 2 / 5 · WORKSPACE</div>
            <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
              Name your workspace. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>You can change it.</span>
            </h1>
            <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:8, maxWidth:580, marginBottom:28 }}>
              One workspace per company or team. You can create more later and switch between them from the top-left.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:18, maxWidth:560 }}>
              <AuthField label="Workspace name" value="Harbor" placeholder="Acme Health"/>
              <AuthField label="Workspace URL" value="harbor" placeholder="acme" hint="comms.ai/w/harbor"/>
              <div>
                <label className="meta" style={{ marginBottom:6, display:'block' }}>YOUR ROLE</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['People Ops','Customer Success','Sales','Research','Founder','Other'].map((r, i) => (
                    <button key={r} onClick={() => setRole(i)} style={{
                      padding:'8px 14px', borderRadius:999,
                      background: i===role?'var(--ink)':'var(--bg-elev)',
                      color: i===role?'var(--bg)':'var(--ink-2)',
                      border:'1px solid ' + (i===role?'var(--ink)':'var(--line)'), fontSize:12.5,
                    }}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="meta" style={{ marginBottom:6, display:'block' }}>TEAM SIZE</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['Just me','2–10','11–50','51–500','500+'].map((r, i) => (
                    <button key={r} onClick={() => setSize(i)} style={{
                      padding:'8px 14px', borderRadius:999,
                      background: i===size?'var(--ink)':'var(--bg-elev)',
                      color: i===size?'var(--bg)':'var(--ink-2)',
                      border:'1px solid ' + (i===size?'var(--ink)':'var(--line)'), fontSize:12.5,
                    }}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="meta" style={{ marginBottom:6, display:'block' }}>HOW DID YOU HEAR ABOUT US?</label>
                <select style={{
                  width: '100%', padding: '10px 14px', border: '1px solid var(--line-2)',
                  borderRadius: 10, background: 'var(--bg-elev)', fontSize: 13,
                  fontFamily: 'var(--sans)', color: 'var(--ink)',
                }}>
                  <option value="">Select...</option>
                  <option>Google search</option>
                  <option>LinkedIn</option>
                  <option>Referral from a colleague</option>
                  <option>Conference or event</option>
                  <option>Podcast</option>
                  <option>Twitter / X</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop:28, display:'flex', gap:10 }}>
              <button className="ghost" onClick={goBack} style={{ padding:'10px 16px' }}>← Back</button>
              <button className="primary" onClick={goNext} style={{ padding:'10px 16px' }}>Continue → <KBD>⌘↵</KBD></button>
            </div>
          </div>
        )}

        {/* STEP 3: Pick use cases */}
        {step === 3 && (
          <div>
            <div className="meta" style={{ marginBottom:10 }}>STEP 3 / 5 · USE CASES</div>
            <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
              What will you use Comms for? <span className="italic-serif" style={{ color:'var(--ink-3)' }}>Select all that apply.</span>
            </h1>
            <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:8, maxWidth:620, marginBottom:28 }}>
              Pick the use cases that matter most. We'll set up templates and suggested workflows for each. You can always add or change these later.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, maxWidth:680 }}>
              {useCases.map(uc => {
                const on = selected.includes(uc.id);
                return (
                  <button key={uc.id} onClick={() => toggle(uc.id)} style={{
                    padding:'16px 18px', textAlign:'left',
                    background: on ? 'var(--accent-soft)' : 'var(--bg-elev)',
                    border: on ? '2px solid var(--accent)' : '1px solid var(--line)',
                    borderRadius:10, cursor:'pointer', position:'relative',
                    transition:'border-color 120ms, background 120ms',
                  }}>
                    {on && (
                      <span style={{
                        position:'absolute', top:10, right:10,
                        width:20, height:20, borderRadius:'50%',
                        background:'var(--accent)', color:'var(--bg)',
                        display:'grid', placeItems:'center', fontSize:11,
                      }}>✓</span>
                    )}
                    <div style={{ fontSize:14, fontWeight:500, color:'var(--ink)', marginBottom:3 }}>{uc.title}</div>
                    <div style={{ fontSize:12, color:'var(--ink-3)', lineHeight:1.45 }}>{uc.desc}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop:24, display:'flex', gap:10, alignItems:'center' }}>
              <button className="ghost" onClick={goBack} style={{ padding:'10px 16px' }}>← Back</button>
              <button className="primary" onClick={goNext} style={{ padding:'10px 16px' }}>Continue{selected.length > 0 ? ` with ${selected.length} use case${selected.length !== 1 ? 's' : ''}` : ''} → <KBD>⌘↵</KBD></button>
              <button onClick={goNext} style={{ background:'none', border:'none', fontSize:12.5, color:'var(--ink-3)', marginLeft:8, cursor:'pointer', textDecoration:'underline', textUnderlineOffset:3 }}>Skip for now</button>
            </div>
          </div>
        )}

        {/* STEP 4: Choose a template */}
        {step === 4 && (
          <div>
            <div className="meta" style={{ marginBottom:10 }}>STEP 4 / 5 · TEMPLATE</div>
            <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
              Choose a template. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>We'll pre-fill the builder.</span>
            </h1>
            <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:8, maxWidth:620, marginBottom:28 }}>
              Pick a starting point. You can customize every step once you're inside the builder.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, maxWidth:600 }}>
              {templates.map(t => {
                const on = template === t.id;
                return (
                  <button key={t.id} onClick={() => setTemplate(t.id)} style={{
                    padding:'20px 20px', textAlign:'left',
                    background: on ? 'var(--accent-soft)' : 'var(--bg-elev)',
                    border: on ? '2px solid var(--accent)' : '1px solid var(--line)',
                    borderRadius:12, cursor:'pointer', position:'relative',
                    transition:'border-color 120ms, background 120ms',
                  }}>
                    {on && (
                      <span style={{
                        position:'absolute', top:10, right:10,
                        width:20, height:20, borderRadius:'50%',
                        background:'var(--accent)', color:'var(--bg)',
                        display:'grid', placeItems:'center', fontSize:11,
                      }}>{'\u2713'}</span>
                    )}
                    <div style={{ fontSize:14, fontWeight:500, color:'var(--ink)', marginBottom:4 }}>{t.title}</div>
                    <div style={{ fontSize:12, color:'var(--ink-3)', lineHeight:1.45 }}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop:24, display:'flex', gap:10, alignItems:'center' }}>
              <button className="ghost" onClick={goBack} style={{ padding:'10px 16px' }}>{'\u2190'} Back</button>
              <a href="Builder.html" className="primary" style={{ padding:'10px 16px', textDecoration:'none' }}>Continue {'\u2192'} <KBD>{'\u2318\u21B5'}</KBD></a>
              <button onClick={goNext} style={{ background:'none', border:'none', fontSize:12.5, color:'var(--ink-3)', marginLeft:8, cursor:'pointer', textDecoration:'underline', textUnderlineOffset:3 }}>Skip for now</button>
            </div>
          </div>
        )}

        {/* STEP 5: Invite teammates */}
        {step === 5 && (
          <div>
            <div className="meta" style={{ marginBottom:10 }}>STEP 5 / 5 · TEAM</div>
            <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
              Invite your team. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>Or skip and do it later.</span>
            </h1>
            <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:8, maxWidth:580, marginBottom:28 }}>
              Add teammates by email. They'll get an invite to join your workspace. You can manage roles and permissions in Settings.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:520 }}>
              {['teammate1@harbor.co','teammate2@harbor.co',''].map((v, i) => (
                <div key={i} style={{ display:'flex', gap:8 }}>
                  <input defaultValue={v} placeholder="teammate@company.com" style={{
                    flex:1, padding:'11px 14px', border:'1px solid var(--line-2)', borderRadius:10,
                    background:'var(--bg-elev)', fontFamily:'var(--sans)', fontSize:14, color:'var(--ink)',
                  }}/>
                  <select style={{ padding:'10px 12px', border:'1px solid var(--line-2)', borderRadius:10, background:'var(--bg-elev)', fontSize:13, color:'var(--ink-2)' }}>
                    <option>Member</option>
                    <option>Admin</option>
                  </select>
                </div>
              ))}
              <button style={{ background:'none', border:'none', fontSize:13, color:'var(--accent)', cursor:'pointer', textAlign:'left', padding:0 }}>+ Add another</button>
            </div>
            <div style={{ marginTop:28, display:'flex', gap:10, alignItems:'center' }}>
              <button className="ghost" onClick={goBack} style={{ padding:'10px 16px' }}>← Back</button>
              <button className="primary" onClick={() => window.location.href='Home.html'} style={{ padding:'10px 16px' }}>Launch workspace → <KBD>⌘↵</KBD></button>
              <button onClick={() => window.location.href='Home.html'} style={{ background:'none', border:'none', fontSize:12.5, color:'var(--ink-3)', marginLeft:8, cursor:'pointer', textDecoration:'underline', textUnderlineOffset:3 }}>Skip for now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenSignUp, ScreenLogin, ScreenMagicLink, ScreenOnboarding });
