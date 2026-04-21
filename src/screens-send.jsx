// ============================================================
// Send screen — delivery configuration + email preview.
// Two tabs: Branded Email (default) | Shareable Link
// ============================================================

const { useState: useStateSS } = React;

function ScreenSend() {
  const [tab, setTab]           = useStateSS('email');
  const [reminders, setReminders] = useStateSS(3);
  const [schedule, setSchedule] = useStateSS('now');
  const [sent, setSent]         = useStateSS(false);
  const [sendSearch, setSendSearch] = useStateSS('');

  if (sent) {
    return (
      <AppFrame active="builder" crumbs={['Builder','Contractor onboarding','Send']} screenLabel="Send">
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', textAlign:'center', padding:40 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'var(--accent-soft)', display:'grid', placeItems:'center', marginBottom:20 }}>
            <span style={{ fontSize:40, color:'var(--accent-ink)' }}>{'\u2713'}</span>
          </div>
          <div style={{ fontSize:22, fontWeight:500, marginBottom:10 }}>Your conversation is on its way! {'\uD83C\uDF89'}</div>
          <div style={{ fontSize:14, color:'var(--ink-2)', lineHeight:1.6, maxWidth:400, marginBottom:24 }}>
            12 people will receive your email shortly. We'll notify you as responses come in.
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <a href="Campaign Detail.html" className="primary" style={{ padding:'10px 20px', borderRadius:999 }}>View campaign &rarr;</a>
            <a href="Home.html" className="ghost" style={{ padding:'10px 20px', borderRadius:999 }}>Back to home &rarr;</a>
          </div>
        </div>
      </AppFrame>
    );
  }

  return (
    <AppFrame active="builder" crumbs={['Builder','Contractor onboarding','Send']} screenLabel="Send">
      <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
        <div style={{ flex:1, overflow:'auto', display:'grid', gridTemplateColumns:'1fr 380px' }}>

          {/* ── LEFT: Delivery configuration ── */}
          <div style={{ padding:'24px 28px', overflow:'auto', borderRight:'1px solid var(--line)' }}>
            <PageHead
              title="Send your conversation"
              italicTail="to real people."
            />

            {/* Tab toggle */}
            <div style={{ display:'flex', gap:0, marginTop:20, marginBottom:24, border:'1px solid var(--line)', borderRadius:999, overflow:'hidden', width:'fit-content' }}>
              {[['email','Branded Email'],['link','Shareable Link']].map(([k, label]) => (
                <button key={k} onClick={() => setTab(k)} style={{
                  padding:'8px 20px', border:'none', fontSize:13, cursor:'pointer',
                  background: tab===k ? 'var(--ink)' : 'var(--bg-elev)',
                  color: tab===k ? 'var(--bg)' : 'var(--ink-2)',
                  fontWeight: tab===k ? 500 : 400,
                }}>{label}</button>
              ))}
            </div>

            {tab === 'email' && (<>
              {/* People picker */}
              <div style={{ marginBottom:24 }}>
                <div className="meta" style={{ marginBottom: 8 }}>SEND TO PEOPLE</div>

                {/* Search + org filter row */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <input placeholder="Search people..." value={sendSearch} onChange={e => setSendSearch(e.target.value)} style={{
                    flex: 1, padding: '8px 12px', border: '1px solid var(--line)',
                    borderRadius: 8, fontSize: 12, fontFamily: 'var(--sans)', background: 'var(--bg)',
                  }} />
                  <select style={{
                    padding: '8px 12px', border: '1px solid var(--line)', borderRadius: 8,
                    fontSize: 12, background: 'var(--bg)', color: 'var(--ink-2)',
                  }}>
                    <option>All orgs</option>
                    <option>Harbor Inc.</option>
                    <option>Novus Staffing</option>
                    <option>Summit Field</option>
                  </select>
                </div>

                {/* Scrollable people list with checkboxes */}
                <div style={{
                  border: '1px solid var(--line)', borderRadius: 10, maxHeight: 180,
                  overflowY: 'auto', background: 'var(--bg)',
                }}>
                  {[
                    { name: 'María Ortega', email: 'maria@novusstaffing.co', org: 'Novus', checked: true },
                    { name: 'Jordan Reyes', email: 'j.reyes@novusstaffing.co', org: 'Novus', checked: true },
                    { name: 'Devin Park', email: 'd.park@harbor.co', org: 'Harbor', checked: true },
                    { name: 'Aisha Bello', email: 'a.bello@harbor.co', org: 'Harbor', checked: true },
                    { name: 'Taylor Nguyen', email: 't.nguyen@summitfield.co', org: 'Summit', checked: false },
                    { name: 'Sam Okonkwo', email: 's.okonkwo@harbor.co', org: 'Harbor', checked: false },
                    { name: 'Ashley Tran', email: 'a.tran@novusstaffing.co', org: 'Novus', checked: true },
                    { name: 'Nina Patel', email: 'n.patel@individual.co', org: 'Individual', checked: false },
                  ].map((p, i) => (
                    <label key={i} style={{
                      display: 'grid', gridTemplateColumns: '20px 1fr auto', gap: 10,
                      alignItems: 'center', padding: '8px 12px',
                      borderBottom: '1px solid var(--line)', cursor: 'pointer',
                      fontSize: 12,
                    }}>
                      <input type="checkbox" defaultChecked={p.checked} style={{ accentColor: 'var(--accent)' }} />
                      <div>
                        <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{p.name}</span>
                        <span style={{ color: 'var(--ink-4)', marginLeft: 8, fontFamily: 'var(--mono)', fontSize: 10 }}>{p.email}</span>
                      </div>
                      <span className="chip" style={{ fontSize: 9, padding: '2px 6px' }}>{p.org}</span>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <Pill tone="accent">5 selected</Pill>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--accent-ink)', cursor: 'pointer' }}>Select all</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-4)', cursor: 'pointer' }}>Upload CSV</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-4)', cursor: 'pointer' }}>Paste emails</span>
                  </div>
                </div>
              </div>

              {/* Email compose */}
              <div style={{ marginBottom:24 }}>
                <div className="meta" style={{ marginBottom:12 }}>EMAIL COMPOSE</div>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  <div>
                    <label style={{ fontSize:12, color:'var(--ink-3)', display:'block', marginBottom:4 }}>From</label>
                    <input defaultValue="Harbor via Comms" style={{
                      width:'100%', padding:'9px 12px', border:'1px solid var(--line)', borderRadius:8,
                      background:'var(--bg-elev)', fontFamily:'var(--sans)', fontSize:13, color:'var(--ink)',
                    }}/>
                  </div>
                  <div>
                    <label style={{ fontSize:12, color:'var(--ink-3)', display:'block', marginBottom:4 }}>Subject</label>
                    <input defaultValue="Your onboarding session is ready" style={{
                      width:'100%', padding:'9px 12px', border:'1px solid var(--line)', borderRadius:8,
                      background:'var(--bg-elev)', fontFamily:'var(--sans)', fontSize:13, color:'var(--ink)',
                    }}/>
                  </div>
                  <div>
                    <label style={{ fontSize:12, color:'var(--ink-3)', display:'block', marginBottom:4 }}>Preview text</label>
                    <input defaultValue="Complete your documents in under 5 minutes" style={{
                      width:'100%', padding:'9px 12px', border:'1px solid var(--line)', borderRadius:8,
                      background:'var(--bg-elev)', fontFamily:'var(--sans)', fontSize:13, color:'var(--ink)',
                    }}/>
                  </div>
                </div>
              </div>

              {/* Follow-up settings */}
              <div style={{ marginBottom:24 }}>
                <div className="meta" style={{ marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>FOLLOW-UP REMINDERS <HelpTip text="We'll automatically remind people who haven't responded. You choose how many times." /></div>
                <div style={{ display:'flex', gap:4, marginBottom:12 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setReminders(n)} style={{
                      width:36, height:32, borderRadius:8,
                      background: n===reminders ? 'var(--ink)' : 'var(--bg-elev)',
                      color: n===reminders ? 'var(--bg)' : 'var(--ink-2)',
                      border:'1px solid '+(n===reminders?'var(--ink)':'var(--line)'),
                      fontSize:13, cursor:'pointer', fontWeight:500,
                    }}>{n}</button>
                  ))}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                  <span style={{ fontSize:13, color:'var(--ink-2)' }}>Cadence:</span>
                  <select style={{
                    padding:'7px 12px', border:'1px solid var(--line)', borderRadius:8,
                    background:'var(--bg-elev)', fontSize:13, color:'var(--ink)',
                  }}>
                    <option>Every 2 days</option>
                    <option>Every day</option>
                    <option>Every 3 days</option>
                    <option>Every week</option>
                  </select>
                </div>
                <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--ink-2)' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor:'var(--accent)' }}/>
                  Stop following up after completion
                </label>
              </div>

              {/* Schedule */}
              <div>
                <div className="meta" style={{ marginBottom:10 }}>SCHEDULE</div>
                <div style={{ display:'flex', gap:8 }}>
                  {[['now','Send now'],['later','Schedule for later']].map(([k, label]) => (
                    <label key={k} style={{
                      display:'flex', alignItems:'center', gap:6, fontSize:13,
                      padding:'8px 14px', borderRadius:8, cursor:'pointer',
                      background: schedule===k ? 'var(--accent-soft)' : 'var(--bg-elev)',
                      border:'1px solid '+(schedule===k?'var(--accent)':'var(--line)'),
                      color: schedule===k ? 'var(--accent-ink)' : 'var(--ink-2)',
                    }}>
                      <input type="radio" name="schedule" checked={schedule===k} onChange={() => setSchedule(k)}
                        style={{ accentColor:'var(--accent)' }}/>
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </>)}

            {tab === 'link' && (<>
              {/* Generated link */}
              <div style={{ marginBottom:24 }}>
                <div className="meta" style={{ marginBottom:10 }}>SHAREABLE LINK</div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <div style={{
                    flex:1, padding:'10px 14px', background:'var(--chip)', borderRadius:8,
                    fontFamily:'var(--mono)', fontSize:12.5, color:'var(--ink)', letterSpacing:'0.02em',
                    border:'1px solid var(--line)',
                  }}>https://comms.ai/c/abc123-xyz</div>
                  <button className="ghost" style={{ padding:'8px 14px' }}>Copy</button>
                </div>
              </div>

              {/* QR code placeholder */}
              <div style={{ marginBottom:24 }}>
                <div className="meta" style={{ marginBottom:10 }}>QR CODE</div>
                <div style={{
                  width:160, height:160, border:'2px solid var(--line)', borderRadius:12,
                  display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:14,
                  color:'var(--ink-3)', background:'var(--bg-elev)',
                }}>QR</div>
              </div>

              {/* Options */}
              <div style={{ marginBottom:24 }}>
                <div className="meta" style={{ marginBottom:10 }}>OPTIONS</div>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:13 }}>Require email to start</span>
                    <ToggleSwitchBM on={true} />
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:13 }}>Track opens</span>
                    <ToggleSwitchBM on={true} />
                  </div>
                </div>
              </div>

              {/* Embed code */}
              <div>
                <div className="meta" style={{ marginBottom:10 }}>EMBED CODE</div>
                <div style={{
                  padding:'12px 16px', background:'var(--chip)', borderRadius:8,
                  fontFamily:'var(--mono)', fontSize:11.5, color:'var(--ink-2)',
                  border:'1px solid var(--line)', lineHeight:1.6, whiteSpace:'pre-wrap',
                }}>{`<iframe src="https://comms.ai/c/abc123-xyz"\n  width="100%" height="700"\n  frameborder="0" />`}</div>
              </div>
            </>)}
          </div>

          {/* ── RIGHT: Email preview ── */}
          <div style={{ padding:'24px 20px', overflow:'auto', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div className="meta" style={{ marginBottom:14 }}>EMAIL PREVIEW</div>
            {/* Phone mockup */}
            <div style={{
              width:320, background:'var(--bg-elev)', borderRadius:24, border:'1px solid var(--line)',
              overflow:'hidden', boxShadow:'0 8px 40px -16px rgba(0,0,0,0.10)',
            }}>
              {/* Status bar */}
              <div style={{ padding:'8px 16px', display:'flex', justifyContent:'space-between', fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-3)' }}>
                <span>9:41</span>
                <span>LTE {'\u25CF'}</span>
              </div>
              {/* Email content */}
              <div style={{ padding:'24px 20px 28px' }}>
                {/* Logo */}
                <div style={{
                  width:44, height:44, borderRadius:10, background:'var(--ink)',
                  display:'grid', placeItems:'center', marginBottom:20,
                }}>
                  <span style={{ color:'var(--bg)', fontSize:18, fontWeight:600 }}>H</span>
                </div>
                <div style={{ fontSize:16, fontWeight:500, marginBottom:14, lineHeight:1.35 }}>Hi Jordan,</div>
                <div style={{ fontSize:13.5, color:'var(--ink-2)', lineHeight:1.55, marginBottom:24 }}>
                  You've been invited to complete your onboarding with Harbor. It takes about 5 minutes
                  and covers document upload and verification.
                </div>
                <a href="Participant Landing.html" style={{
                  display:'block', textAlign:'center', padding:'14px 20px',
                  background:'var(--accent)', color:'white', borderRadius:10,
                  fontSize:14, fontWeight:500, textDecoration:'none',
                }}>Start your session {'\u2192'}</a>
                <div style={{ marginTop:24, paddingTop:16, borderTop:'1px solid var(--line)', textAlign:'center' }}>
                  <div style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--ink-4)', letterSpacing:'0.05em' }}>
                    Powered by Comms {'\u00B7'} Unsubscribe
                  </div>
                </div>
              </div>
            </div>
            <a href="#" style={{ marginTop:14, fontSize:12, color:'var(--ink-3)', textDecoration:'underline', textUnderlineOffset:3 }}>Preview in browser</a>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{ padding:'12px 28px', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg-elev)' }}>
          <a href="Preview.html" className="ghost" style={{ padding:'8px 14px' }}>{'\u2190'} Back to preview</a>
          <button onClick={() => setSent(true)} className="primary" style={{ padding:'10px 20px', background:'var(--accent)', borderColor:'var(--accent)', color:'white' }}>
            Send to 12 people
          </button>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenSend });
