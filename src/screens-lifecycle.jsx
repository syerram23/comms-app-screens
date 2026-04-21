// ============================================================
// Lifecycle walkthrough — vertical timeline of 12 end-to-end steps.
// Standalone page (NO AppFrame).
// ============================================================

function ScreenLifecycle() {
  const steps = [
    { n:1,  who:'ADMIN',       title:'Sign Up',                  desc:'Create an account with email or SSO. No credit card required \u2014 14-day Professional trial starts immediately.', href:'Sign Up.html', screen:'Sign Up' },
    { n:2,  who:'ADMIN',       title:'Onboarding',               desc:'Name your workspace, pick use cases, choose a template, and invite teammates. Takes under 2 minutes.', href:'Onboarding.html', screen:'Onboarding' },
    { n:3,  who:'ADMIN',       title:'Build conversation',       desc:'Use the 3-column editor to add steps, configure modalities, set validation rules, and let AI assist with the flow.', href:'Builder.html', screen:'Builder' },
    { n:4,  who:'ADMIN',       title:'Preview experience',       desc:'Walk through the conversation exactly as a participant would see it. Test every step before going live.', href:'Preview.html', screen:'Preview' },
    { n:5,  who:'ADMIN',       title:'Send / Share',             desc:'Send branded emails to your recipients or generate a shareable link with QR code. Configure follow-up reminders.', href:'Send.html', screen:'Send' },
    { n:6,  who:'PARTICIPANT', title:'Receive email',            desc:'Participants get a branded email with your company logo, a personal greeting, and a single CTA to start their session.', href:null, screen:'Branded Email' },
    { n:7,  who:'PARTICIPANT', title:'Landing page',             desc:'A clean, focused page that sets expectations: what they will do, how long it takes, and what to have ready.', href:'Participant Landing.html', screen:'Landing' },
    { n:8,  who:'PARTICIPANT', title:'Go through conversation',  desc:'Linear multi-modal experience: upload documents, answer questions by voice, sign agreements. AI validates in real time.', href:'Participant Conversation.html', screen:'Conversation' },
    { n:9,  who:'PARTICIPANT', title:'Complete',                 desc:'Confirmation page with a summary of everything submitted, time taken, and a thank-you message.', href:'Participant Complete.html', screen:'Complete' },
    { n:10, who:'ADMIN',       title:'View campaign results',    desc:'See completion rates, average time, drop-off points. Drill into individual participant responses.', href:'Campaign Detail.html', screen:'Campaign Detail' },
    { n:11, who:'ADMIN',       title:'Query the data',           desc:'Search across all conversations with natural language. Filter by status, date, participant, or content.', href:'Search.html', screen:'Search' },
    { n:12, who:'ADMIN',       title:'View participant record',  desc:'Full history for one participant: every document, every response, every follow-up \u2014 in chronological order.', href:'Participant Detail.html', screen:'Participant Detail' },
  ];

  return (
    <div style={{
      width:'100vw', minHeight:'100vh', background:'var(--bg)',
      fontFamily:'var(--sans)', padding:'48px 20px 80px',
    }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        {/* Header */}
        <a href="Screens Index.html" style={{ fontSize:12, fontFamily:'var(--mono)', color:'var(--ink-3)', textDecoration:'none', letterSpacing:'0.05em' }}>
          {'\u2190'} ALL SCREENS
        </a>
        <h1 style={{ ...window.APP_SCALE.titleLg, margin:'20px 0 6px', fontSize:36 }}>
          Comms {'\u00B7'} End-to-End Lifecycle
        </h1>
        <p style={{ fontSize:15, color:'var(--ink-2)', lineHeight:1.55, marginBottom:48 }}>
          The complete journey {'\u2014'} from sign-up to results.
        </p>

        {/* Timeline */}
        <div style={{ position:'relative' }}>
          {/* Vertical line */}
          <div style={{
            position:'absolute', left:23, top:0, bottom:0, width:2,
            background:'var(--line)',
          }}/>

          {steps.map((s, i) => {
            const isParticipant = s.who === 'PARTICIPANT';
            return (
              <div key={s.n} style={{
                display:'grid', gridTemplateColumns:'48px 1fr', gap:20,
                marginBottom: i < steps.length - 1 ? 32 : 0,
                position:'relative',
              }}>
                {/* Step number circle */}
                <div style={{
                  width:48, height:48, borderRadius:'50%',
                  background: isParticipant ? 'var(--accent)' : 'var(--ink)',
                  color:'var(--bg)', display:'grid', placeItems:'center',
                  fontSize:15, fontWeight:600, fontFamily:'var(--mono)',
                  position:'relative', zIndex:1,
                  border:'4px solid var(--bg)',
                }}>{s.n}</div>

                {/* Card */}
                <div style={{
                  padding:'20px 24px', background:'var(--bg-elev)',
                  border:'1px solid var(--line)', borderRadius:14,
                  display:'grid', gridTemplateColumns:'1fr 180px', gap:20, alignItems:'start',
                }}>
                  <div>
                    <span style={{
                      display:'inline-block', padding:'3px 10px', borderRadius:999,
                      fontSize:10, fontFamily:'var(--mono)', fontWeight:500, letterSpacing:'0.06em',
                      marginBottom:8,
                      background: isParticipant ? 'var(--accent-soft)' : 'var(--chip)',
                      color: isParticipant ? 'var(--accent-ink)' : 'var(--ink-2)',
                    }}>{s.who}</span>
                    <h3 style={{ ...window.APP_SCALE.titleSm, margin:'0 0 6px' }}>{s.title}</h3>
                    <p style={{ fontSize:13, color:'var(--ink-2)', lineHeight:1.5, margin:0 }}>{s.desc}</p>
                    {s.href && (
                      <a href={s.href} style={{
                        display:'inline-block', marginTop:10, fontSize:12,
                        color:'var(--accent-ink)', fontWeight:500, textDecoration:'none',
                      }}>Open screen {'\u2192'}</a>
                    )}
                  </div>
                  {/* Screen placeholder */}
                  <div style={{
                    width:180, height:110, border:'1px solid var(--line)', borderRadius:8,
                    background:'var(--chip)', display:'grid', placeItems:'center',
                    fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-4)',
                    letterSpacing:'0.04em',
                  }}>{s.screen}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenLifecycle });
