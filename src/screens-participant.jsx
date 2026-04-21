// ============================================================
// Phase 10 · PARTICIPANT FLOW — the receiver's journey.
//
// Marta receives an email from Acme Inc., clicks the link,
// lands on a no-install, branded Comms page, confirms consent,
// and goes through a voice or video interview.
//
// All surfaces are 1280×820 so they line up on the canvas.
// Participant-facing surfaces intentionally feel warmer and
// more minimal than the operator app — they're one-time-use.
// ============================================================

const { useState: useStateP, useEffect: useEffectP } = React;

// ─────────────────────────────────────────────────────────
// Shared brand block for Acme · used across the participant surfaces
// so the flow feels coherent.
// ─────────────────────────────────────────────────────────
function AcmeMark({ light }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
      <div style={{
        width:26, height:26, borderRadius:6,
        background: light ? '#fff' : '#0e0e0c',
        display:'grid', placeItems:'center',
      }}>
        <div style={{ width:10, height:10, background: light ? '#0e0e0c' : '#fff', transform:'rotate(45deg)' }}/>
      </div>
      <span style={{ fontSize:16, fontWeight:600, letterSpacing:'-0.02em', color: light ? '#fff' : '#0e0e0c' }}>Acme Inc.</span>
    </div>
  );
}

function CommsByline({ inverted }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:'var(--mono)', fontSize:10, color: inverted ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', letterSpacing:'0.06em' }}>
      POWERED BY <span style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
        <span style={{ width:12, height:12, borderRadius:4, background: inverted ? 'var(--bg)' : 'var(--ink)', display:'grid', placeItems:'center' }}>
          <span style={{ width:4, height:4, borderRadius:'50%', background:'var(--accent)' }}/>
        </span>
        <span style={{ fontWeight:600 }}>COMMS</span>
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 10a · Gmail-style inbox with the Acme invite highlighted
// ─────────────────────────────────────────────────────────
function ScreenParticipantInbox() {
  const emails = [
    ['Stripe',             'Your April invoice is ready',               'INV-2904-8128 · $129.00 paid',            '9:42 AM', false],
    ['Acme Inc.',          'We\'d love your perspective — 15-min chat', 'Hi Marta, we\'re talking to Series B ops leads about...', '9:14 AM', true, true],
    ['Lena @ Clipboard',   'Re: Thursday sync',                          'Works for me — I\'ll send a calendar hold.', '8:50 AM', false],
    ['LinkedIn',           '3 people viewed your profile',               'View who\'s been checking out your profile.', 'Yesterday', false],
    ['AWS Billing',        'Your monthly invoice for April 2026',        'Hello, your AWS invoice is available for viewing...', 'Yesterday', false],
    ['Calendly',           'Rafi booked: intro call · 25 min',           'Rafi Ortega booked a time Thu, Apr 23 at 2:00 PM PT', 'Apr 15', false],
    ['Medium Digest',      'Three stories we thought you\'d like',       'A curated list based on your recent reads.', 'Apr 14', false],
    ['Notion',             'Weekly digest: 14 updates across 3 spaces',   '14 new pages, 6 comments, 2 mentions.', 'Apr 13', false],
  ];
  return (
    <div data-screen-label="10a Participant · Email inbox" style={{
      width:1280, height:820, background:'#fff', border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      fontFamily:'Inter Tight, -apple-system, sans-serif', color:'#111',
    }}>
      {/* pseudo-gmail chrome */}
      <div style={{ background:'#f6f8fc', padding:'10px 18px', borderBottom:'1px solid #e5e7eb', display:'grid', gridTemplateColumns:'220px 1fr 200px', gap:16, alignItems:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
          <div style={{ width:26, height:26, background:'#ea4335', borderRadius:'50%' }}/>
          <div style={{ width:26, height:26, background:'#34a853', borderRadius:'50%' }}/>
          <div style={{ width:26, height:26, background:'#fbbc04', borderRadius:'50%' }}/>
          <span style={{ marginLeft:8, fontSize:13, color:'#3c4043' }}>Mail</span>
        </div>
        <div style={{ background:'#eaf1fb', borderRadius:8, padding:'8px 14px', display:'flex', alignItems:'center', gap:8, color:'#5f6368', fontSize:13 }}>
          <span>⌕</span><span>Search mail</span>
        </div>
        <div style={{ display:'flex', gap:10, justifyContent:'flex-end', alignItems:'center' }}>
          <span style={{ fontSize:12, color:'#5f6368' }}>⚙</span>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'#1a73e8', color:'#fff', display:'grid', placeItems:'center', fontWeight:500, fontSize:13 }}>M</div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', height:'calc(100% - 53px)' }}>
        {/* left rail */}
        <div style={{ padding:'18px 12px', borderRight:'1px solid #e5e7eb' }}>
          <button style={{ width:'100%', padding:'12px 16px', borderRadius:16, border:0, background:'#c2e7ff', color:'#001d35', fontSize:14, fontWeight:500, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:16 }}>✎</span> Compose
          </button>
          <div style={{ marginTop:14 }}>
            {[['Inbox','3,214',true],['Starred','21',false],['Snoozed','—',false],['Sent','—',false],['Drafts','12',false],['All Mail','—',false]].map(([l, c, active]) => (
              <div key={l} style={{ padding:'8px 16px', borderRadius:'0 16px 16px 0', background: active?'#d3e3fd':'transparent', fontSize:13.5, fontWeight: active?500:400, color: active?'#041e49':'#3c4043', display:'flex', justifyContent:'space-between' }}>
                <span>{l}</span><span style={{ color:'#5f6368' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* list */}
        <div style={{ overflow:'hidden', background:'#fff' }}>
          <div style={{ padding:'10px 18px', borderBottom:'1px solid #e5e7eb', display:'flex', gap:14, alignItems:'center', fontSize:12, color:'#5f6368' }}>
            <input type="checkbox" defaultChecked={false}/>
            <span>↻ Refresh</span>
            <span>⋯</span>
            <span style={{ marginLeft:'auto' }}>1–50 of 3,214</span>
          </div>
          {emails.map(([from, subj, snip, when, unread, highlighted], i) => (
            <div key={i} onClick={() => { if(highlighted) window.location.href='P10b Email.html'; }} style={{
              display:'grid', gridTemplateColumns:'24px 24px 160px 1fr 80px', gap:12, alignItems:'center',
              padding:'11px 18px', borderBottom:'1px solid #f0f2f5',
              background: highlighted ? 'linear-gradient(90deg, rgba(194,231,255,0.3), transparent 40%)' : unread ? '#fff' : '#f8fafc',
              fontSize:13,
              boxShadow: highlighted ? 'inset 3px 0 0 0 #1a73e8' : 'none',
              fontWeight: unread?500:400,
              cursor:'pointer',
            }}>
              <input type="checkbox"/>
              <span style={{ color: highlighted?'#1a73e8':'#dadce0', fontSize:14 }}>{highlighted?'★':'☆'}</span>
              <span style={{ color:'#202124', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{from}</span>
              <span style={{ color:'#202124', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                <strong style={{ fontWeight: unread?600:500 }}>{subj}</strong>
                <span style={{ color:'#5f6368', marginLeft:8, fontWeight:400 }}>— {snip}</span>
              </span>
              <span style={{ color:'#5f6368', textAlign:'right', fontSize:12 }}>{when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 10b · Email opened — Acme invite with the "Start" button
// ─────────────────────────────────────────────────────────
function ScreenParticipantEmail() {
  return (
    <div data-screen-label="10b Participant · Email opened" style={{
      width:1280, height:820, background:'#fff', border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      fontFamily:'Inter Tight, -apple-system, sans-serif', color:'#111',
    }}>
      {/* Gmail chrome (trimmed) */}
      <div style={{ background:'#f6f8fc', padding:'12px 18px', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', gap:12, fontSize:13, color:'#3c4043' }}>
        <span>←</span><span>▣</span><span>✉</span><span>🚫</span><span>⋯</span>
        <span style={{ marginLeft:'auto', color:'#5f6368', fontSize:12 }}>3 of 3,214 · Apr 18, 2026 · 9:14 AM</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', height:'calc(100% - 45px)' }}>
        {/* email body */}
        <div style={{ padding:'28px 36px', overflow:'auto' }}>
          <h1 style={{ margin:'0 0 12px', fontSize:22, fontWeight:500, letterSpacing:'-0.01em', color:'#202124' }}>
            We'd love your perspective — 15-min chat
            <span style={{ marginLeft:10, fontSize:12, padding:'2px 8px', border:'1px solid #e5e7eb', borderRadius:4, color:'#5f6368', fontWeight:400, verticalAlign:'middle' }}>Inbox</span>
          </h1>

          <div style={{ display:'grid', gridTemplateColumns:'40px 1fr auto', gap:12, alignItems:'center', padding:'12px 0', borderBottom:'1px solid #f0f2f5' }}>
            <div style={{ width:40, height:40, borderRadius:'50%', background:'#111', color:'#fff', display:'grid', placeItems:'center', fontWeight:500 }}>
              <div style={{ width:14, height:14, background:'#fff', transform:'rotate(45deg)' }}/>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:500, color:'#202124' }}>Ayo Adesanya <span style={{ fontWeight:400, color:'#5f6368' }}>&lt;ayo@acme-research.com&gt;</span></div>
              <div style={{ fontSize:12, color:'#5f6368', marginTop:2 }}>to me · <span style={{ color:'#1a73e8' }}>Acme Customer Research</span> · 9:14 AM · <span>⏷</span></div>
            </div>
            <div style={{ display:'flex', gap:10, fontSize:14, color:'#5f6368' }}>↩ ↪ ⋯</div>
          </div>

          {/* Letter */}
          <div style={{ marginTop:24, maxWidth:640, fontSize:14.5, lineHeight:1.6, color:'#202124' }}>
            <p style={{ margin:'0 0 14px' }}>Hi Marta,</p>
            <p style={{ margin:'0 0 14px' }}>
              We're redesigning how ops leads at Series B–D companies handle vendor onboarding, and you kept
              coming up in our research — I'd love 15 minutes of your honest take. No sales pitch, no slide deck.
            </p>
            <p style={{ margin:'0 0 14px' }}>
              We run these as a conversation — voice or video, your call. There's nothing to install, no login. Just
              tap the link below and it starts whenever you're ready. The whole thing is under 15 minutes, and as a
              thank-you we'll drop <strong>$75 on a card of your choice</strong> once you're done.
            </p>

            {/* Primary CTA block — the branded invite card */}
            <div style={{
              margin:'28px 0',
              border:'1px solid #e5e7eb', borderRadius:14, overflow:'hidden',
              boxShadow:'0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ background:'#0e0e0c', color:'#fff', padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <AcmeMark light/>
                <CommsByline inverted/>
              </div>
              <div style={{ padding:'22px 24px' }}>
                <div style={{ fontFamily:'"JetBrains Mono", monospace', fontSize:10, color:'#5f6368', letterSpacing:'0.08em', marginBottom:10 }}>INTERVIEW · 15 MIN · ANY DEVICE</div>
                <div style={{ fontSize:20, fontWeight:500, color:'#202124', letterSpacing:'-0.01em', lineHeight:1.25 }}>
                  How do you handle vendor onboarding today?
                </div>
                <div style={{ marginTop:6, color:'#5f6368', fontSize:13.5, fontStyle:'italic' }}>— Ayo, Acme Research</div>

                <div style={{ marginTop:20, display:'flex', gap:10, alignItems:'center' }}>
                  <a href="P10c Landing.html" style={{
                    display:'inline-flex', alignItems:'center', gap:10,
                    padding:'12px 20px', borderRadius:999, background:'#0e0e0c', color:'#fff',
                    fontSize:14, fontWeight:500, textDecoration:'none',
                  }}>
                    Start the conversation <span style={{ fontSize:16 }}>→</span>
                  </a>
                  <span style={{ fontSize:12, color:'#5f6368' }}>or reply with a better time</span>
                </div>

                <div style={{ marginTop:16, padding:'10px 12px', border:'1px dashed #e5e7eb', borderRadius:8, fontFamily:'"JetBrains Mono", monospace', fontSize:11, color:'#5f6368' }}>
                  comms.ai/c/acme/ops-research-q2?k=mx9nP2a...
                </div>
              </div>
            </div>

            <p style={{ margin:'0 0 14px' }}>
              If you'd rather skip, just reply — no hard feelings. And if someone else on your team would be better, forward it along.
            </p>
            <p style={{ margin:'0 0 6px' }}>Thanks either way,</p>
            <p style={{ margin:0 }}>Ayo</p>
            <p style={{ margin:'2px 0 0', color:'#5f6368', fontSize:12 }}>Research Lead · Acme Inc.</p>

            <div style={{ marginTop:32, display:'flex', gap:10 }}>
              <button style={{ padding:'8px 16px', border:'1px solid #dadce0', borderRadius:18, background:'#fff', fontSize:13, color:'#3c4043' }}>↩ Reply</button>
              <button style={{ padding:'8px 16px', border:'1px solid #dadce0', borderRadius:18, background:'#fff', fontSize:13, color:'#3c4043' }}>↪ Forward</button>
            </div>

            <div style={{ marginTop:32, paddingTop:14, borderTop:'1px solid #f0f2f5', fontSize:11, color:'#9aa0a6', lineHeight:1.6 }}>
              Sent via Comms on behalf of Acme Inc., 100 Market St, San Francisco, CA. <a href="#" style={{ color:'#1a73e8', textDecoration:'none' }}>Unsubscribe</a> · <a href="#" style={{ color:'#1a73e8', textDecoration:'none' }}>Privacy</a>
            </div>
          </div>
        </div>

        {/* right rail - other threads */}
        <div style={{ padding:'18px 20px', borderLeft:'1px solid #e5e7eb', fontSize:12, color:'#5f6368', overflow:'auto', background:'#f8fafc' }}>
          <div style={{ textTransform:'uppercase', fontSize:10, letterSpacing:'0.06em', color:'#5f6368', marginBottom:10 }}>ABOUT THE SENDER</div>
          <div style={{ background:'#fff', borderRadius:10, padding:14, border:'1px solid #e5e7eb' }}>
            <div style={{ fontSize:14, fontWeight:500, color:'#202124' }}>Ayo Adesanya</div>
            <div style={{ marginTop:2 }}>Research Lead · Acme Inc.</div>
            <div style={{ marginTop:10, display:'flex', flexDirection:'column', gap:4 }}>
              <div>3 prior threads</div>
              <div>Verified sender · SPF + DKIM ✓</div>
            </div>
          </div>

          <div style={{ textTransform:'uppercase', fontSize:10, letterSpacing:'0.06em', color:'#5f6368', margin:'22px 0 10px' }}>THIS INVITE</div>
          <div style={{ background:'#fff', borderRadius:10, padding:14, border:'1px solid #e5e7eb', fontSize:12.5 }}>
            <div>● Tracked link</div>
            <div style={{ marginTop:4 }}>● Expires in 7 days</div>
            <div style={{ marginTop:4 }}>● $75 incentive on completion</div>
            <div style={{ marginTop:4 }}>● Your answers are confidential</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// 10c · Landing page (after clicking the link)
// Minimal, hosted by Comms but wearing Acme's brand.
// ─────────────────────────────────────────────────────────
function ParticipantBrowserChrome({ url, children, height=820 }) {
  return (
    <div style={{
      width:1280, height, background:'#fff',
      border:'1px solid var(--line)', borderRadius:10, overflow:'hidden',
      fontFamily:'Inter Tight, system-ui, sans-serif',
      display:'grid', gridTemplateRows:'44px 1fr',
    }}>
      {/* browser bar */}
      <div style={{ background:'#edeff2', borderBottom:'1px solid #d7dae0', display:'flex', alignItems:'center', gap:8, padding:'0 14px' }}>
        <span style={{ display:'inline-flex', gap:6 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => <span key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }}/>)}
        </span>
        <span style={{ marginLeft:10, color:'#7f8189', fontSize:13 }}>←</span>
        <span style={{ color:'#7f8189', fontSize:13 }}>→</span>
        <span style={{ color:'#7f8189', fontSize:13 }}>↻</span>
        <div style={{ flex:1, margin:'0 10px', padding:'6px 12px', background:'#fff', border:'1px solid #d7dae0', borderRadius:8, fontFamily:'"JetBrains Mono", monospace', fontSize:12, color:'#3c4043', display:'flex', alignItems:'center', gap:8 }}>
          <span>🔒</span>{url}
        </div>
        <span style={{ color:'#7f8189', fontSize:13 }}>⋯</span>
      </div>
      <div style={{ overflow:'hidden', position:'relative' }}>{children}</div>
    </div>
  );
}

function ScreenParticipantLanding() {
  return (
    <ParticipantBrowserChrome url="comms.ai/c/acme/ops-research-q2?k=mx9nP2a...">
      <div style={{ height:'100%', background:'#faf8f5', display:'grid', gridTemplateColumns:'1.1fr 1fr', minHeight:0 }}>
        {/* Left · brand + message */}
        <div style={{ background:'#0e0e0c', color:'#fff', padding:'44px 48px', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize:'56px 56px' }}/>
          <div style={{ position:'relative' }}>
            <AcmeMark light/>
            <div style={{ marginTop:30, fontFamily:'var(--mono)', fontSize:11, color:'rgba(255,255,255,0.5)', letterSpacing:'0.08em' }}>● CUSTOMER RESEARCH · Q2 2026</div>
          </div>

          <div style={{ position:'relative' }}>
            <h1 style={{
              fontSize:40, fontWeight:500, letterSpacing:'-0.03em', lineHeight:1.05, margin:0, maxWidth:'14ch',
            }}>
              Hi Marta — <span className="italic-serif" style={{ color:'rgba(255,255,255,0.55)' }}>got 15 minutes?</span>
            </h1>
            <p style={{ marginTop:18, fontSize:15, color:'rgba(255,255,255,0.75)', maxWidth:'42ch', lineHeight:1.55 }}>
              We're rethinking how ops leads handle vendor onboarding. Your answers stay confidential —
              Ayo will see the patterns across everyone, not your name attached.
            </p>

            <ul style={{ listStyle:'none', padding:0, margin:'26px 0 0', display:'flex', flexDirection:'column', gap:10, maxWidth:'44ch' }}>
              {[
                '15 minutes, at your pace.',
                'No app, no account.',
                'Voice or video — you pick.',
                '$75 thank-you card when you finish.',
              ].map((t, i) => (
                <li key={i} style={{ display:'grid', gridTemplateColumns:'20px 1fr', gap:10, fontSize:14, color:'rgba(255,255,255,0.85)' }}>
                  <span style={{ width:14, height:14, borderRadius:'50%', background:'var(--accent)', color:'var(--ink)', display:'grid', placeItems:'center', fontSize:9, fontWeight:700, fontFamily:'var(--mono)', marginTop:4 }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ position:'relative', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <CommsByline inverted/>
            <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'rgba(255,255,255,0.4)' }}>SOC 2 · GDPR · END-TO-END ENCRYPTED</span>
          </div>
        </div>

        {/* Right · choose a modality */}
        <div style={{ padding:'44px 48px', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'auto' }}>
          <div className="meta" style={{ marginBottom:10 }}>READY WHEN YOU ARE</div>
          <h2 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>Pick a way to talk.</h2>
          <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:10, maxWidth:'44ch' }}>
            You can change your mind mid-conversation. We won't record unless you say OK on the next screen.
          </p>

          <div style={{ marginTop:28, display:'flex', flexDirection:'column', gap:10 }}>
            {[
              ['voice', 'Voice',   'Just your microphone. Hands-free — good for a walk or a car.', true],
              ['video', 'Video',   'Camera on both sides. A little more human, a little more context.', false],
              ['text',  'Text',    'Reply by typing. Slower, but async — take a break whenever.', false],
            ].map(([k, t, d, rec]) => (
              <a key={k} href={k==='voice' ? 'P10d Consent.html' : k==='video' ? 'P10d Consent.html' : 'P10d Consent.html'} style={{
                display:'grid', gridTemplateColumns:'44px 1fr auto', gap:14, alignItems:'center',
                padding:'16px 18px',
                background:'var(--bg-elev)', border:'1px solid ' + (rec?'var(--ink)':'var(--line)'),
                borderRadius:12, color:'var(--ink)', textDecoration:'none',
                boxShadow: rec ? '0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)' : 'none',
              }}>
                <div style={{ width:44, height:44, borderRadius:10, background:'var(--chip)', display:'grid', placeItems:'center', fontSize:16, color:'var(--ink-2)' }}>
                  {k==='voice'?'◔': k==='video'?'▢':'≡'}
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:500, display:'flex', gap:8, alignItems:'center' }}>
                    {t}
                    {rec && <Pill tone="accent">RECOMMENDED</Pill>}
                  </div>
                  <div style={{ fontSize:13, color:'var(--ink-3)', marginTop:2 }}>{d}</div>
                </div>
                <span style={{ fontSize:18, color:'var(--ink-3)' }}>→</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop:22, paddingTop:16, borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:'var(--ink-3)' }}>
            <span>Not a good time? <a href="#" style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>Reschedule</a></span>
            <span className="meta">SESSION · c_ayo_7kQm · EXPIRES APR 25</span>
          </div>
        </div>
      </div>
    </ParticipantBrowserChrome>
  );
}

// ─────────────────────────────────────────────────────────
// 10d · Consent + mic/camera permissions
// ─────────────────────────────────────────────────────────
function ScreenParticipantConsent() {
  return (
    <ParticipantBrowserChrome url="comms.ai/c/acme/ops-research-q2/consent">
      <div style={{ height:'100%', background:'#faf8f5', display:'grid', placeItems:'center', padding:40 }}>
        <div style={{ width:720, background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:18, padding:'36px 40px', boxShadow:'0 20px 60px -20px rgba(0,0,0,0.12)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <AcmeMark/>
            <CommsByline/>
          </div>

          <div style={{ marginTop:26 }}>
            <div className="meta" style={{ marginBottom:10 }}>STEP 1 / 2 · YOUR CONSENT</div>
            <h2 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
              Before we start — <span className="italic-serif" style={{ color:'var(--ink-3)' }}>a few honest words.</span>
            </h2>
          </div>

          <ul style={{ listStyle:'none', padding:0, margin:'22px 0 0', display:'flex', flexDirection:'column' }}>
            {[
              ['We\'ll record audio — and video if you chose video.',    'Only you and Ayo at Acme can play it back. Stored encrypted, deleted in 90 days.'],
              ['A Comms AI will do the interviewing.',                    'It adapts follow-ups based on what you say. No scripted loops. You can say "next" or "skip" any time.'],
              ['You can stop at any point.',                              'Close the tab, hang up, or say "end interview". Anything recorded before you stop is kept; anything after is discarded.'],
              ['We use this research internally.',                        'Quotes may appear in internal reports — anonymized. If a quote is uniquely identifying, Ayo will ask before sharing externally.'],
            ].map(([h, b], i) => (
              <li key={i} style={{ padding:'14px 0', borderTop: i?'1px solid var(--line)':'none', display:'grid', gridTemplateColumns:'20px 1fr', gap:12 }}>
                <span style={{ width:16, height:16, borderRadius:'50%', background:'var(--accent-soft)', color:'var(--accent-ink)', display:'grid', placeItems:'center', fontSize:9, fontWeight:700, fontFamily:'var(--mono)', marginTop:3 }}>✓</span>
                <div>
                  <div style={{ fontSize:14, fontWeight:500 }}>{h}</div>
                  <div style={{ fontSize:13, color:'var(--ink-2)', marginTop:2, lineHeight:1.5 }}>{b}</div>
                </div>
              </li>
            ))}
          </ul>

          <label style={{ display:'flex', gap:10, marginTop:22, padding:'12px 14px', border:'1px dashed var(--line-2)', borderRadius:10, fontSize:13, color:'var(--ink-2)', alignItems:'flex-start', lineHeight:1.5 }}>
            <input type="checkbox" defaultChecked style={{ accentColor:'var(--ink)', marginTop:3 }}/>
            I'm OK with the above and agree to participate. I've read the <a style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>privacy policy</a>.
          </label>

          <div style={{ marginTop:22, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <a href="P10c Landing.html" style={{ fontSize:13, color:'var(--ink-3)' }}>← Back to options</a>
            <div style={{ display:'flex', gap:8 }}>
              <button className="ghost" style={{ padding:'10px 16px' }}>Save & continue later</button>
              <a href="P10e Device Check.html" className="primary" style={{ padding:'10px 18px' }}>I agree — continue →</a>
            </div>
          </div>
        </div>
      </div>
    </ParticipantBrowserChrome>
  );
}

function ScreenParticipantDeviceCheck() {
  return (
    <ParticipantBrowserChrome url="comms.ai/c/acme/ops-research-q2/check">
      <div style={{ height:'100%', background:'#faf8f5', display:'grid', placeItems:'center', padding:40 }}>
        <div style={{ width:760, background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:18, padding:'36px 40px' }}>
          <div className="meta" style={{ marginBottom:10 }}>STEP 2 / 2 · DEVICE CHECK</div>
          <h2 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
            Quick sound check — <span className="italic-serif" style={{ color:'var(--ink-3)' }}>say hi.</span>
          </h2>
          <p style={{ color:'var(--ink-2)', fontSize:14, marginTop:10 }}>
            When the bar moves with your voice, you're good to go.
          </p>

          {/* Browser permission hint */}
          <div style={{ marginTop:22, padding:'14px 16px', background:'#fff7e4', border:'1px solid #f3d373', borderRadius:10, fontSize:13, color:'#5a4a0b', display:'grid', gridTemplateColumns:'22px 1fr', gap:10, alignItems:'start' }}>
            <span style={{ fontSize:14 }}>⚠</span>
            <div>
              Your browser may ask for <strong>microphone access</strong> (and <strong>camera</strong> if you chose video). We only use them during the interview.
            </div>
          </div>

          <div style={{ marginTop:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {/* Mic */}
            <div style={{ padding:16, border:'1px solid var(--line)', borderRadius:12, background:'var(--bg)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:14, fontWeight:500 }}>Microphone</span>
                <Pill tone="accent">● READY</Pill>
              </div>
              <div className="meta" style={{ marginTop:6 }}>MACBOOK PRO MICROPHONE · BUILT-IN</div>
              <div style={{ marginTop:12, display:'flex', gap:2, alignItems:'end', height:28 }}>
                {Array.from({length:60}).map((_, i) => {
                  const h = 4 + Math.abs(Math.sin(i*0.5)) * 20;
                  const active = i < 36;
                  return <div key={i} style={{ width:2, height:h, background: active?'var(--accent)':'var(--line-2)', borderRadius:1 }}/>;
                })}
              </div>
              <Btn variant="subtle" style={{ marginTop:10 }}>Change device</Btn>
            </div>

            {/* Camera (for video flow) */}
            <div style={{ padding:16, border:'1px solid var(--line)', borderRadius:12, background:'var(--bg)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:14, fontWeight:500 }}>Camera</span>
                <Pill tone="neutral">● OFF (VOICE)</Pill>
              </div>
              <div className="meta" style={{ marginTop:6 }}>TAP TO ENABLE IF YOU CHANGE YOUR MIND</div>
              <div style={{ marginTop:12, aspectRatio:'16/9', borderRadius:8, border:'1px dashed var(--line-2)', display:'grid', placeItems:'center', color:'var(--ink-3)', fontFamily:'var(--mono)', fontSize:11 }}>
                CAMERA · OFF
              </div>
            </div>
          </div>

          <div style={{ marginTop:20, padding:12, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg)', fontSize:12.5, color:'var(--ink-2)', display:'flex', justifyContent:'space-between' }}>
            <span>Connection: <strong style={{ color:'var(--ink)' }}>excellent</strong> · 84 ms round-trip</span>
            <span className="meta">BROWSER · SAFARI 17 · ENCRYPTED</span>
          </div>

          <div style={{ marginTop:22, display:'flex', justifyContent:'flex-end', gap:8 }}>
            <a href="P10d Consent.html" className="ghost" style={{ padding:'10px 16px', textDecoration:'none' }}>Back</a>
            <a href="P10f Voice.html" className="primary" style={{ padding:'10px 18px' }}>Start the interview →</a>
          </div>
        </div>
      </div>
    </ParticipantBrowserChrome>
  );
}

// ─────────────────────────────────────────────────────────
// 10f · Live VOICE interview — participant view
// ─────────────────────────────────────────────────────────
function ScreenParticipantVoice() {
  const [transcript, setTranscript] = useStateP([
    { who:'AI',   t:'00:04', msg:"Hey Marta — Ayo at Acme asked me to walk you through this. I'll keep it short. Want me to dive in, or do you have questions first?" },
    { who:'YOU',  t:'00:14', msg:"Go ahead, I've got 15 minutes." },
    { who:'AI',   t:'00:18', msg:"Perfect. When you onboard a new vendor today, walk me through the first 48 hours — from their side. What do they actually do?" },
    { who:'YOU',  t:'00:42', msg:"Honestly, a lot of emails. We send them a packet, they fill out W-9 and COI, then usually we're chasing for a week." },
    { who:'AI',   t:'01:04', msg:"Got it — the chase is the part we want to zoom in on. What's the most frustrating piece of that for you?" },
  ]);
  return (
    <ParticipantBrowserChrome url="comms.ai/c/acme/ops-research-q2/live">
      <div style={{ height:'100%', background:'#0e0e0c', color:'#fff', display:'grid', gridTemplateRows:'auto 1fr auto', position:'relative' }}>
        {/* header */}
        <div style={{ padding:'18px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <AcmeMark light/>
            <span style={{ width:1, height:20, background:'rgba(255,255,255,0.15)' }}/>
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.7)' }}>Vendor onboarding research · 15 min</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,0.6)' }}>
              <span className="recording-dot"/> RECORDING · 01:24
            </span>
            <span style={{ fontSize:11, fontFamily:'var(--mono)', color:'rgba(255,255,255,0.4)' }}>END-TO-END ENCRYPTED</span>
          </div>
        </div>

        {/* main stage */}
        <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', minHeight:0, overflow:'hidden' }}>
          {/* left · AI + you avatars */}
          <div style={{ display:'grid', placeItems:'center', padding:'24px', borderRight:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:40 }}>
              {/* AI · speaking big */}
              <div style={{
                width:180, height:180, borderRadius:'50%',
                background:'radial-gradient(circle at 35% 35%, oklch(0.55 0.18 148) 0%, oklch(0.30 0.1 148) 70%)',
                boxShadow:'0 0 0 14px color-mix(in srgb, var(--accent) 18%, transparent), 0 0 0 28px color-mix(in srgb, var(--accent) 8%, transparent), 0 0 100px color-mix(in srgb, var(--accent) 30%, transparent)',
                display:'grid', placeItems:'center',
                color:'#0e0e0c', fontFamily:'var(--mono)', fontSize:24, fontWeight:600,
              }}>ACME</div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:18, fontWeight:500, letterSpacing:'-0.01em' }}>Acme Research Agent</div>
                <div className="meta" style={{ color:'rgba(255,255,255,0.5)', marginTop:4 }}>● SPEAKING · "…zoom in on the chase part…"</div>
              </div>

              {/* you · smaller, muted state */}
              <div style={{
                marginTop:20, display:'flex', alignItems:'center', gap:14, padding:'14px 18px',
                border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, background:'rgba(255,255,255,0.03)',
              }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:'#fff', color:'#0e0e0c', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:14, fontWeight:500 }}>MK</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:500 }}>You · Marta Krol</div>
                  <div className="meta" style={{ color:'rgba(255,255,255,0.5)' }}>● LISTENING</div>
                </div>
                <div style={{ marginLeft:12, display:'inline-flex', gap:2, alignItems:'end', height:16 }}>
                  {Array.from({length:14}).map((_, i) => (
                    <span key={i} style={{ width:2, height:3+Math.abs(Math.sin(i*0.8))*3, background:'rgba(255,255,255,0.4)', borderRadius:1 }}/>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* right · transcript / context */}
          <div style={{ display:'grid', gridTemplateRows:'auto 1fr', minHeight:0 }}>
            <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div className="meta" style={{ color:'rgba(255,255,255,0.5)', marginBottom:6 }}>CURRENT QUESTION · 2 OF ~8</div>
              <div style={{ fontFamily:'var(--serif)', fontStyle:'italic', fontSize:18, lineHeight:1.35, color:'#fff' }}>
                "What's the most frustrating piece of the chase?"
              </div>
              <div style={{ marginTop:14, display:'flex', gap:8 }}>
                <button style={{ padding:'6px 12px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', fontSize:11.5 }}>Skip question</button>
                <button style={{ padding:'6px 12px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', fontSize:11.5 }}>Can you repeat?</button>
                <button style={{ padding:'6px 12px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', fontSize:11.5 }}>Change to typing</button>
              </div>
            </div>

            <div style={{ padding:'18px 22px', overflow:'auto', display:'flex', flexDirection:'column', gap:10 }}>
              <div className="meta" style={{ color:'rgba(255,255,255,0.5)' }}>TRANSCRIPT · LIVE</div>
              {transcript.map((m, i) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'60px 1fr', gap:10, opacity: i===transcript.length-1 ? 1 : 0.7 }}>
                  <span style={{ fontSize:10.5, fontFamily:'var(--mono)', color: m.who==='AI'?'var(--accent)':'rgba(255,255,255,0.5)', letterSpacing:'0.06em' }}>{m.t}<br/>{m.who}</span>
                  <div style={{
                    padding:'8px 12px', borderRadius:10,
                    background: m.who==='AI' ? 'rgba(255,255,255,0.05)' : 'transparent',
                    border: m.who==='AI' ? '1px solid rgba(255,255,255,0.08)' : '1px dashed rgba(255,255,255,0.1)',
                    fontSize:13, color: m.who==='AI' ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.7)',
                    lineHeight:1.5, fontStyle: m.who==='YOU'?'italic':'normal',
                  }}>{m.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* footer · controls */}
        <div style={{ padding:'14px 22px', borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ padding:'10px 14px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:12.5, display:'inline-flex', gap:8, alignItems:'center' }}>● Mute</button>
            <button style={{ padding:'10px 14px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:12.5 }}>○ Camera</button>
            <button style={{ padding:'10px 14px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:12.5 }}>≡ Captions</button>
          </div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'var(--mono)' }}>
            01:24 · est. 14 min left
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button style={{ padding:'10px 14px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', fontSize:12.5 }}>Pause</button>
            <a href="P10h Thanks.html" style={{ padding:'10px 18px', borderRadius:999, background:'oklch(0.52 0.19 25)', color:'#fff', border:0, fontSize:12.5, fontWeight:500, textDecoration:'none' }}>End interview</a>
          </div>
        </div>
      </div>
    </ParticipantBrowserChrome>
  );
}

// ─────────────────────────────────────────────────────────
// 10g · Live VIDEO interview — participant view
// ─────────────────────────────────────────────────────────
function ScreenParticipantVideo() {
  return (
    <ParticipantBrowserChrome url="comms.ai/c/acme/ops-research-q2/live">
      <div style={{ height:'100%', background:'#0a0a0a', color:'#fff', display:'grid', gridTemplateRows:'auto 1fr auto' }}>
        <div style={{ padding:'18px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <AcmeMark light/>
            <span style={{ width:1, height:20, background:'rgba(255,255,255,0.15)' }}/>
            <span style={{ fontSize:13, color:'rgba(255,255,255,0.7)' }}>Vendor onboarding research · 15 min</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,0.6)' }}>
              <span className="recording-dot"/> RECORDING · 02:18
            </span>
          </div>
        </div>

        {/* video stage */}
        <div style={{ position:'relative', background:'#111', overflow:'hidden' }}>
          {/* AI-agent "video" tile (visualized video avatar) */}
          <div style={{
            position:'absolute', inset:0,
            background: 'radial-gradient(circle at 50% 45%, oklch(0.35 0.1 148) 0%, #0a0a0a 70%)',
          }}/>
          {/* subtle scan-line pattern */}
          <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 2px, transparent 2px, transparent 4px)' }}/>

          {/* AI avatar center */}
          <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{
                width:220, height:220, borderRadius:'50%',
                background:'radial-gradient(circle at 40% 40%, oklch(0.65 0.18 148), oklch(0.28 0.08 148) 75%)',
                boxShadow:'0 0 0 10px color-mix(in srgb, var(--accent) 14%, transparent), 0 0 0 20px color-mix(in srgb, var(--accent) 6%, transparent), 0 0 180px color-mix(in srgb, var(--accent) 25%, transparent)',
                display:'grid', placeItems:'center',
                color:'#0e0e0c', fontFamily:'var(--mono)', fontSize:26, fontWeight:600, margin:'0 auto',
              }}>ACME</div>
              <div style={{ marginTop:22, fontSize:20, fontWeight:500, letterSpacing:'-0.01em' }}>Acme Research Agent</div>
              <div className="meta" style={{ color:'rgba(255,255,255,0.5)', marginTop:6 }}>● SPEAKING</div>
            </div>
          </div>

          {/* caption overlay */}
          <div style={{
            position:'absolute', left:'50%', bottom:190, transform:'translateX(-50%)',
            padding:'12px 18px', background:'rgba(0,0,0,0.7)', borderRadius:10,
            fontSize:15, maxWidth:620, textAlign:'center', color:'#fff', lineHeight:1.4,
            border:'1px solid rgba(255,255,255,0.1)',
          }}>
            "So between the packet, the reminders, and the internal approval — what
            would you cut first if you had a magic wand?"
          </div>

          {/* self-view tile (participant's camera) */}
          <div style={{
            position:'absolute', right:20, bottom:20, width:260, height:170, borderRadius:14,
            background:'#1a1a1a', overflow:'hidden', border:'1px solid rgba(255,255,255,0.15)',
            boxShadow:'0 18px 60px -16px rgba(0,0,0,0.5)',
          }}>
            <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 10px, transparent 10px, transparent 20px)' }}/>
            <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', color:'rgba(255,255,255,0.4)', fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.08em' }}>
              YOUR CAMERA · MARTA
            </div>
            <div style={{ position:'absolute', left:10, bottom:10, display:'flex', gap:6, alignItems:'center' }}>
              <span style={{ padding:'3px 8px', background:'rgba(0,0,0,0.6)', borderRadius:4, fontSize:10, fontFamily:'var(--mono)' }}>YOU</span>
              <span style={{ padding:'3px 8px', background:'rgba(0,0,0,0.6)', borderRadius:4, fontSize:10, fontFamily:'var(--mono)', color:'rgba(255,255,255,0.6)' }}>● UNMUTED</span>
            </div>
          </div>

          {/* question counter top right */}
          <div style={{
            position:'absolute', right:20, top:20,
            padding:'8px 14px', background:'rgba(0,0,0,0.55)', border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:999, fontSize:12, fontFamily:'var(--mono)', color:'rgba(255,255,255,0.8)',
          }}>
            QUESTION 3 / ~8
          </div>

          {/* left · progress dots */}
          <div style={{
            position:'absolute', left:20, top:'50%', transform:'translateY(-50%)',
            display:'flex', flexDirection:'column', gap:8,
          }}>
            {[1,2,3,4,5,6,7,8].map(n => (
              <span key={n} style={{
                width:8, height:8, borderRadius:'50%',
                background: n<3?'var(--accent)': n===3?'#fff':'rgba(255,255,255,0.25)',
              }}/>
            ))}
          </div>
        </div>

        {/* footer · controls */}
        <div style={{ padding:'14px 22px', borderTop:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'center', alignItems:'center', gap:8 }}>
          {[
            ['●', 'Mute'],
            ['▢', 'Camera'],
            ['≡', 'Captions'],
            ['↗', 'Share'],
            ['⚑', 'Flag a moment'],
          ].map(([g, t]) => (
            <button key={t} style={{
              padding:'10px 14px', borderRadius:999,
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
              color:'#fff', fontSize:12.5, display:'inline-flex', gap:8, alignItems:'center',
            }}>{g} {t}</button>
          ))}
          <a href="P10h Thanks.html" style={{
            padding:'10px 18px', borderRadius:999, marginLeft:14,
            background:'oklch(0.52 0.19 25)', color:'#fff', border:0, fontSize:12.5, fontWeight:500, textDecoration:'none',
          }}>End interview</a>
        </div>
      </div>
    </ParticipantBrowserChrome>
  );
}

// ─────────────────────────────────────────────────────────
// 10h · Thank-you / completion
// ─────────────────────────────────────────────────────────
function ScreenParticipantThanks() {
  return (
    <ParticipantBrowserChrome url="comms.ai/c/acme/ops-research-q2/done">
      <div style={{ height:'100%', background:'#faf8f5', display:'grid', gridTemplateRows:'auto 1fr', minHeight:0 }}>
        {/* brand bar */}
        <div style={{ padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid var(--line)' }}>
          <AcmeMark/>
          <CommsByline/>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', minHeight:0 }}>
          {/* left · thanks */}
          <div style={{ padding:'56px 64px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div className="meta" style={{ marginBottom:10 }}>✓ INTERVIEW COMPLETE · 12:44</div>
            <h1 style={{ fontSize:52, fontWeight:500, letterSpacing:'-0.03em', lineHeight:1.04, margin:0, maxWidth:'14ch' }}>
              Thank you, Marta. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>Really.</span>
            </h1>
            <p style={{ color:'var(--ink-2)', fontSize:15.5, marginTop:16, maxWidth:'44ch', lineHeight:1.55 }}>
              Ayo will see the highlights by Monday. If a specific quote of yours ends up in an internal
              report, you'll get a heads-up first. That's a promise.
            </p>

            {/* Incentive */}
            <div style={{ marginTop:30, padding:'20px 22px', border:'1px solid var(--line)', borderRadius:14, background:'var(--bg-elev)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <div className="meta">YOUR $75 THANK-YOU</div>
                <Pill tone="accent">● ON ITS WAY</Pill>
              </div>
              <div style={{ fontSize:16, fontWeight:500, marginTop:10 }}>Pick your card — we'll email it to <span style={{ color:'var(--accent-ink)' }}>marta@clipboard.io</span></div>
              <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8 }}>
                {['Amazon','Visa','Starbucks','Donate'].map((t, i) => (
                  <button key={t} style={{
                    padding:'14px 10px', borderRadius:10,
                    background: i===0?'var(--ink)':'var(--bg)',
                    color: i===0?'var(--bg)':'var(--ink)',
                    border:'1px solid ' + (i===0?'var(--ink)':'var(--line)'),
                    fontSize:13, cursor:'pointer',
                  }}>{t}</button>
                ))}
              </div>
              <Btn variant="primary" style={{ marginTop:14 }}>Send my card →</Btn>
            </div>
          </div>

          {/* right · recap + privacy */}
          <div style={{ padding:'56px 52px', borderLeft:'1px solid var(--line)', overflow:'auto' }}>
            <div className="meta" style={{ marginBottom:10 }}>YOUR CONTRIBUTION AT A GLANCE</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:22 }}>
              {[
                ['12:44','duration'],
                ['8 of 8','questions'],
                ['+0.84','sentiment'],
                ['3','themes raised'],
              ].map(([v, l], i) => (
                <div key={i} style={{ padding:'14px 16px', background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:10 }}>
                  <div style={{ fontSize:22, fontWeight:500, letterSpacing:'-0.02em' }}>{v}</div>
                  <div className="meta" style={{ marginTop:4 }}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>

            <div className="meta" style={{ marginBottom:8 }}>THEMES YOU RAISED</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:22 }}>
              {['chase-cost','packet-bloat','COI-lag','approval-queue','weekly-standup'].map(t => <span key={t} className="chip">{t}</span>)}
            </div>

            <div className="meta" style={{ marginBottom:8 }}>ONE QUOTE WE'LL LIKELY USE</div>
            <div style={{ fontFamily:'var(--serif)', fontStyle:'italic', fontSize:16, lineHeight:1.5, borderLeft:'2px solid var(--accent)', paddingLeft:14, color:'var(--ink)' }}>
              "We're not onboarding vendors, we're chasing them. That's the whole job."
            </div>

            <div style={{ marginTop:22, paddingTop:14, borderTop:'1px solid var(--line)', fontSize:12.5, color:'var(--ink-3)', lineHeight:1.6 }}>
              <div>● Your audio is encrypted and stored in US-East for 90 days.</div>
              <div>● <a href="#" style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>Download your transcript</a> · <a href="#" style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>Request deletion</a></div>
            </div>
          </div>
        </div>
      </div>
    </ParticipantBrowserChrome>
  );
}

Object.assign(window, {
  ScreenParticipantInbox,
  ScreenParticipantEmail,
  ScreenParticipantLanding,
  ScreenParticipantConsent,
  ScreenParticipantDeviceCheck,
  ScreenParticipantVoice,
  ScreenParticipantVideo,
  ScreenParticipantThanks,
});
