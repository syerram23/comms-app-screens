// ============================================================
// Phase 8 · DETAIL VIEWS — Participant + Conversation
// ============================================================

function ActionBtn({ label }) {
  const [done, setDone] = React.useState(false);
  return (
    <button onClick={() => setDone(true)} style={{
      background: done ? 'var(--accent-soft)' : 'transparent',
      border: done ? '1px solid var(--accent)' : '1px solid var(--line)',
      color: done ? 'var(--accent-ink)' : 'var(--ink-2)',
      padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500,
      cursor: 'pointer', transition: 'all 0.2s',
    }}>
      {done ? '\u2713 Done' : label}
    </button>
  );
}

function ScreenParticipantDetail() {
  return (
    <AppFrame active="people" screenLabel="08a Participant · Detail"
      crumbs={['comms.app', 'participants', 'maría-ortega']}
      topRight={<>
        <Btn variant="ghost" onClick={() => window.location.href='Builder.html'}>Message</Btn>
        <Btn variant="primary" onClick={() => window.location.href='Builder.html'}>Start conversation</Btn>
      </>}>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <PageHead
          eyebrow={<><a href="Participants.html" style={{ color: 'var(--ink-3)' }}>← PARTICIPANTS</a></>}
          title="María Ortega"
          italicTail="BSA analyst"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', minHeight: 0 }}>
          {/* Left column */}
          <div style={{ borderRight: '1px solid var(--line)' }}>
            {/* Profile card */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 14, background: 'var(--ink)',
                  color: 'var(--bg)', display: 'grid', placeItems: 'center',
                  fontSize: 20, fontFamily: 'var(--mono)', fontWeight: 500,
                }}>MO</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>María Ortega</div>
                  <div className="meta" style={{ marginTop: 4 }}>BSA ANALYST · CUSTOMERS BANCORP</div>
                  <div className="meta" style={{ marginTop: 4 }}>MORTEGA@CUSTOMERSBANCORP.COM · (312) 555-0184</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Pill tone="accent">● ACTIVE</Pill>
                    <span className="chip">supplier</span>
                    <span className="chip">general-staffing</span>
                    <span className="chip">il</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation history timeline */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <span className="meta" style={{ color: 'var(--ink-2)' }}>CONVERSATION HISTORY</span>
                <span className="meta">5 SESSIONS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['Apr 7', 'BSA Compliance Check-In', 'Complete', '3m 24s', 'accent'],
                  ['Apr 2', 'Q2 Onboarding — Documents', 'Complete', '6m 08s', 'accent'],
                  ['Mar 28', 'Policy Acknowledgment', 'Complete', '1m 52s', 'accent'],
                  ['Mar 19', 'Shift Schedule Confirmation', 'Complete', '2m 14s', 'accent'],
                  ['Mar 11', 'Initial Onboarding Welcome', 'Complete', '8m 31s', 'accent'],
                ].map(([date, name, status, dur, tone], i) => (
                  <div key={i} onClick={() => window.location.href='Conversation Detail.html'} style={{
                    display: 'grid', gridTemplateColumns: '64px 1fr auto auto',
                    gap: 14, alignItems: 'center', padding: '12px 0',
                    borderBottom: '1px solid var(--line)', cursor: 'pointer',
                  }}>
                    <span className="meta">{date.toUpperCase()}</span>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{name}</div>
                    </div>
                    <Pill tone={tone}>● {status.toUpperCase()}</Pill>
                    <span className="meta">{dur}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes section */}
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <span className="meta" style={{ color: 'var(--ink-2)' }}>NOTES</span>
                <Btn variant="subtle">+ Add note</Btn>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { author: 'Ellis Kato', date: 'Apr 3, 2026', text: 'María completed all onboarding docs ahead of schedule. Very responsive via SMS — prefers text over email. Flag for fast-track compliance review.' },
                  { author: 'Priya Shah', date: 'Mar 20, 2026', text: 'Confirmed bilingual (EN/ES). Added to Spanish-preferred segment for future campaigns. Manager approved shift schedule change to mornings only.' },
                ].map((n, i) => (
                  <div key={i} style={{
                    padding: 14, border: '1px solid var(--line)', borderRadius: 10,
                    background: 'var(--bg-elev)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 500 }}>{n.author}</span>
                      <span className="meta">{n.date.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{n.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ overflow: 'auto' }}>
            {/* Documents */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)' }}>
              <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 14 }}>DOCUMENTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['W-9 Tax Form', 'Apr 2, 2026', 'valid', '✓'],
                  ['NDA — Customers Bancorp', 'Apr 2, 2026', 'valid', '✓'],
                  ['BSA Certification', 'Mar 28, 2026', 'valid', '✓'],
                  ['Background Check Authorization', 'Apr 5, 2026', 'pending', '⏳'],
                ].map(([name, date, status, icon], i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    padding: '10px 12px', border: '1px solid var(--line)',
                    borderRadius: 10, background: 'var(--bg-elev)', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
                      <div className="meta" style={{ marginTop: 2 }}>UPLOADED {date.toUpperCase()}</div>
                    </div>
                    <span style={{
                      fontSize: 14,
                      color: status === 'valid' ? 'var(--accent-ink)' : 'oklch(0.40 0.14 60)',
                    }}>{icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)' }}>
              <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 14 }}>COMPLIANCE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['BSA Certification', 'Expires Dec 15, 2026', 'accent'],
                  ['Background Check', 'Pending — submitted Apr 5', 'warn'],
                  ['AML Training', 'Expires Jun 30, 2026', 'accent'],
                ].map(([item, detail, tone], i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    padding: '10px 12px', border: '1px solid var(--line)',
                    borderRadius: 10, background: 'var(--bg-elev)', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{item}</div>
                      <div className="meta" style={{ marginTop: 2 }}>{detail.toUpperCase()}</div>
                    </div>
                    <Pill tone={tone}>{tone === 'accent' ? '● VALID' : '● PENDING'}</Pill>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ padding: '24px 28px' }}>
              <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 14 }}>QUICK ACTIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Btn variant="primary" onClick={() => window.location.href='Builder.html'} style={{ width: '100%', textAlign: 'center' }}>Start conversation</Btn>
                <Btn variant="ghost" onClick={() => window.location.href='Builder.html'} style={{ width: '100%', textAlign: 'center' }}>Send reminder</Btn>
                <Btn variant="ghost" style={{ width: '100%', textAlign: 'center' }}>Export record</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function ScreenConversationDetail() {
  const messages = [
    { from: 'ai', text: "Hi Mar\u00EDa! I'm going to walk you through a few things we need before your start date.", time: '2:08 PM', hasWaveform: true },
    { from: 'ai', text: "First, I need your government-issued ID. Take a clear photo of the front.", time: '2:08 PM' },
    { from: 'user', text: 'drivers_license_front.jpg', time: '2:09 PM', doc: true, docSize: '2.4 MB', docStatus: 'Validated' },
    { from: 'ai', text: "ID looks clear. Name matches. Now I need your W-9 form.", time: '2:09 PM' },
    { from: 'user', text: 'W9_signed_2026.pdf', time: '2:10 PM', doc: true, docSize: '1.8 MB', docStatus: 'OCR validated' },
    { from: 'ai', text: "W-9 validated. Now please upload your insurance certificate.", time: '2:10 PM' },
    { from: 'user', text: 'COI_2026.pdf', time: '2:11 PM', doc: true, docSize: '340 KB', docStatus: 'Coverage verified' },
    { from: 'ai', text: "Last step \u2014 please review and sign the NDA.", time: '2:12 PM', signed: true },
  ];

  return (
    <AppFrame active="campaigns" screenLabel="08b Conversation \u00B7 Replay"
      crumbs={['Campaigns', 'Contractor onboarding', 'Mar\u00EDa Ortega']}
      topRight={<>
        <Pill tone="accent">{'\u25CF'} COMPLETE</Pill>
        <Btn variant="subtle">Export transcript</Btn>
        <Btn variant="primary">Download docs</Btn>
      </>}>
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 380px', minHeight: 0 }}>
        {/* Left — Conversation replay */}
        <div style={{ overflow: 'auto', padding: 20 }}>
          <div style={{
            background: 'var(--ink)', borderRadius: 14, overflow: 'hidden',
            display: 'flex', flexDirection: 'column', minHeight: '100%',
          }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', marginBottom: 6 }}>CONVERSATION REPLAY</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>
                Mar\u00EDa Ortega {'\u00B7'} Contractor Onboarding
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Duration: 4m 32s</span>
                <span className="recording-dot" />
                <button style={{
                  width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)',
                  border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer',
                }}>
                  <span style={{ fontSize: 10, color: 'white', marginLeft: 2 }}>{'\u25B6'}</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: m.from === 'ai' ? 'flex-start' : 'flex-end',
                }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: m.doc ? '10px 12px' : '10px 14px',
                    borderRadius: 14,
                    background: m.from === 'ai' ? 'rgba(255,255,255,0.08)' : 'color-mix(in srgb, var(--accent) 15%, transparent)',
                    color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.5,
                  }}>
                    {m.doc ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 6, background: 'rgba(255,255,255,0.06)',
                          display: 'grid', placeItems: 'center', flexShrink: 0,
                        }}>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{'\u25A4'}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12.5, fontWeight: 500 }}>{m.text}</div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)' }}>{m.docSize}</div>
                        </div>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '3px 8px', borderRadius: 999,
                          background: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                          fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--accent)', flexShrink: 0,
                        }}>{'\u2713'} {m.docStatus}</span>
                      </div>
                    ) : (
                      <>
                        <span>{m.text}</span>
                        {m.hasWaveform && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 8, height: 16 }}>
                            {Array.from({ length: 16 }).map((_, j) => {
                              const h = 4 + Math.abs(Math.sin(j * 0.6)) * 10;
                              return <div key={j} style={{ width: 2, height: h, background: 'var(--accent)', borderRadius: 1, opacity: 0.6 }} />;
                            })}
                          </div>
                        )}
                        {m.signed && (
                          <div style={{
                            marginTop: 8, padding: '6px 10px', borderRadius: 8,
                            background: 'color-mix(in srgb, var(--accent) 15%, transparent)',
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)',
                          }}>{'\u2713'} Signed at 2:14 PM</div>
                        )}
                      </>
                    )}
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Voice scrubber */}
            <div style={{
              padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <button style={{
                width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer',
              }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginLeft: 2 }}>{'\u25B6'}</span>
              </button>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, height: 24 }}>
                {Array.from({ length: 60 }).map((_, j) => {
                  const h = 4 + Math.abs(Math.sin(j * 0.3 + j * 0.1)) * 16 + Math.random() * 4;
                  return <div key={j} style={{
                    flex: 1, height: Math.min(h, 22), background: j < 36 ? 'var(--accent)' : 'rgba(255,255,255,0.12)',
                    borderRadius: 1, opacity: j < 36 ? 0.8 : 1,
                  }} />;
                })}
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>4:32</span>
            </div>
          </div>
        </div>

        {/* Right — Session data */}
        <aside style={{
          borderLeft: '1px solid var(--line)', background: 'var(--bg-elev)',
          padding: '20px 24px', overflow: 'auto',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {/* Session summary */}
          <div>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 10 }}>SESSION SUMMARY</div>
            <div style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 10, background: 'var(--bg)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>Status</span>
                  <Pill tone="accent">{'\u25CF'} COMPLETE</Pill>
                </div>
                {[
                  ['Duration', '4 minutes 32 seconds'],
                  ['Steps completed', '6 of 6'],
                  ['Started', 'Apr 18, 2026 \u00B7 2:08 PM'],
                  ['Completed', 'Apr 18, 2026 \u00B7 2:12 PM'],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '6px 0', borderTop: '1px solid var(--line)',
                  }}>
                    <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{k}</span>
                    <span style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents collected */}
          <div>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 10 }}>DOCUMENTS COLLECTED</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Government ID', 'drivers_license_front.jpg', '2.4 MB', '2:09 PM', 'Verified'],
                ['W-9 Form', 'W9_signed_2026.pdf', '1.8 MB', '2:10 PM', 'OCR validated'],
                ['Insurance Certificate', 'COI_2026.pdf', '340 KB', '2:11 PM', 'Coverage verified'],
                ['NDA', 'NDA_signed.pdf', '220 KB', '2:14 PM', 'Signed'],
              ].map(([label, file, size, time, status], i) => (
                <div key={i} style={{
                  padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 10,
                  background: 'var(--bg)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent-ink)' }}>{'\u2713'} {status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="meta" style={{ fontSize: 10 }}>{file} {'\u00B7'} {size} {'\u00B7'} {time}</span>
                    <a href="#" className="meta" style={{ fontSize: 10, color: 'var(--accent-ink)', textDecoration: 'underline', textUnderlineOffset: 2 }}>View</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted data */}
          <div>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 10 }}>EXTRACTED DATA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                ['Name', 'Mar\u00EDa Ortega'],
                ['EIN', '84-2847291'],
                ['Insurance provider', 'Hartford'],
                ['Coverage', '$2M general liability'],
                ['Expiry', 'Mar 2027'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr',
                  padding: '6px 0', borderBottom: '1px dashed var(--line)', fontSize: 12.5,
                }}>
                  <span className="meta">{k.toUpperCase()}</span>
                  <span style={{ color: 'var(--ink-2)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Take Action — individual */}
          <div style={{ marginBottom: 20 }}>
            <div className="meta" style={{ marginBottom: 12 }}>RECOMMENDED ACTIONS · MAR\u00CDA ORTEGA</div>

            {[
              { priority: '#d44', label: 'URGENT', title: 'Insurance cert expires in 14 days', desc: 'Current certificate expires Mar 28, 2027. Send renewal reminder now.', actions: ['Send renewal reminder'] },
              { priority: 'oklch(0.7 0.15 70)', label: 'RECOMMENDED', title: 'Request PDF version of W-9', desc: 'W-9 was uploaded as a photo. Request a cleaner PDF for records.', actions: ['Request updated document'] },
              { priority: 'oklch(0.7 0.15 70)', label: 'RECOMMENDED', title: 'Follow up on scheduling concern', desc: 'Mar\u00EDa mentioned scheduling issues during voice response at 2:14.', actions: ['View transcript', 'Schedule follow-up'] },
              { priority: 'var(--ink-4)', label: 'OPTIONAL', title: 'Add to Q2 compliance segment', desc: 'Add Mar\u00EDa to the compliance tracking segment for bulk monitoring.', actions: ['Add to segment'] },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 10,
                marginBottom: 8, background: 'var(--bg-elev)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.priority, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.05em', color: item.priority === '#d44' ? '#d44' : 'var(--ink-3)' }}>{item.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8, lineHeight: 1.5 }}>{item.desc}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {item.actions.map(a => <ActionBtn key={a} label={a} />)}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 10 }}>ACTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Btn variant="ghost" style={{ width: '100%', textAlign: 'center' }}>Download all documents</Btn>
              <Btn variant="ghost" style={{ width: '100%', textAlign: 'center' }}>Export transcript</Btn>
              <Btn variant="ghost" style={{ width: '100%', textAlign: 'center' }}>Send follow-up</Btn>
            </div>
          </div>
        </aside>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenParticipantDetail, ScreenConversationDetail });
