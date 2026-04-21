// ============================================================
// Phase 9 · EDGE / STATE SCREENS
// 404, permission denied, upgrade required, rate limit,
// empty workspace, first-run, offline.
// ============================================================

// Shared empty/message layout inside the app shell.
function EdgeLayout({ eyebrow, title, italic, sub, illustration, actions, active='home', screenLabel, crumbs }) {
  return (
    <AppFrame active={active} screenLabel={screenLabel} crumbs={crumbs}>
      <div style={{ height:'100%', display:'grid', placeItems:'center', padding:40, background:'var(--bg)' }}>
        <div style={{ maxWidth:640, textAlign:'center' }}>
          {illustration}
          {eyebrow && <div className="num-badge" style={{ justifyContent:'center', marginBottom:14 }}>{eyebrow}</div>}
          <h2 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>
            {title} {italic && <span className="italic-serif" style={{ color:'var(--ink-3)' }}>{italic}</span>}
          </h2>
          {sub && <p style={{ color:'var(--ink-2)', fontSize:14.5, marginTop:14, lineHeight:1.55 }}>{sub}</p>}
          {actions && <div style={{ marginTop:22, display:'inline-flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>{actions}</div>}
        </div>
      </div>
    </AppFrame>
  );
}

function Illo404() {
  return (
    <div style={{ margin:'0 auto 22px', display:'inline-flex', alignItems:'center', gap:20 }}>
      {['4','0','4'].map((d, i) => (
        <div key={i} style={{
          width:64, height:88, borderRadius:14, border:'1px solid var(--line)', background:'var(--bg-elev)',
          display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:44, color:'var(--ink-2)',
          letterSpacing:'-0.02em', transform: i===1?'rotate(-4deg)':'none',
        }}>{d}</div>
      ))}
    </div>
  );
}

function Screen404() {
  return (
    <EdgeLayout screenLabel="09a · 404" crumbs={['comms.app','?']}
      eyebrow="NOT FOUND"
      illustration={<Illo404/>}
      title="That page has"
      italic="wandered off."
      sub="The link may be mistyped, the resource may have been archived, or you may not have access in this workspace."
      actions={<><Btn variant="primary" onClick={() => window.location.href='Home.html'}>← Back to home</Btn><Btn variant="subtle" onClick={() => window.location.href='Search.html'}>Search ⌘K</Btn></>}/>
  );
}

function ScreenPermissionDenied() {
  return (
    <EdgeLayout screenLabel="09b · Permission denied" crumbs={['comms.app','campaigns','customer-feedback-q2']}
      eyebrow="403 · PERMISSION"
      illustration={<div style={{ margin:'0 auto 22px', width:64, height:64, borderRadius:'50%', border:'1px solid var(--line)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', color:'var(--ink-3)', fontSize:22 }}>◉</div>}
      title="You can see this."
      italic="You can't change it."
      sub="You're signed in as a Viewer. Editing campaigns requires Editor or Admin. Ask your workspace admin to change your role or give you access to this campaign."
      actions={<><Btn variant="primary">Request access</Btn><Btn variant="subtle">Who's admin?</Btn><Btn variant="subtle" onClick={() => window.location.href='Home.html'}>Back</Btn></>}/>
  );
}

function ScreenUpgradeRequired() {
  return (
    <EdgeLayout screenLabel="09c · Upgrade required" crumbs={['comms.app','integrations','snowflake']} active="integrations"
      eyebrow="STARTER PLAN"
      illustration={<div style={{ margin:'0 auto 22px', display:'inline-flex', padding:12, border:'1px solid var(--line)', borderRadius:14, background:'var(--bg-elev)', gap:10, alignItems:'center' }}>
        <span className="chip">STARTER</span><span className="meta">→</span><Pill tone="accent">● PRO</Pill>
      </div>}
      title="Snowflake sync lives"
      italic="on Professional."
      sub="Native analytics integrations (Snowflake, BigQuery, Looker, Tableau) unlock on Pro. You'll keep your 500 conversations/mo, unlock unlimited flows and 5 seats, and pay $99/mo billed annually."
      actions={<><Btn variant="primary" onClick={() => window.location.href='Settings Billing.html'}>Upgrade to Pro →</Btn><Btn variant="subtle" onClick={() => window.location.href='Settings Billing.html'}>Compare plans</Btn><Btn variant="subtle" onClick={() => window.location.href='Home.html'}>Stay on Starter</Btn></>}/>
  );
}

function ScreenRateLimit() {
  return (
    <EdgeLayout screenLabel="09d · Rate limit" crumbs={['comms.app','api','v2']} active="settings"
      eyebrow="429 · API"
      illustration={<div style={{ margin:'0 auto 22px', width:'fit-content', padding:'10px 16px', border:'1px dashed oklch(0.40 0.14 60)', color:'oklch(0.40 0.14 60)', borderRadius:10, fontFamily:'var(--mono)', fontSize:12 }}>
        ● 4,812 / 4,800 CALLS · RESETS IN 00:47
      </div>}
      title="You're sending faster"
      italic="than we can keep up."
      sub="Your key hit its per-minute limit. Back off, batch requests, or upgrade to a higher tier for more burst room. No conversations were dropped."
      actions={<><Btn variant="primary" onClick={() => window.location.href='Settings API.html'}>View API limits</Btn><Btn variant="subtle" onClick={() => window.location.href='Settings Billing.html'}>Raise limit (Pro)</Btn><Btn variant="subtle">Read docs ↗</Btn></>}/>
  );
}

function ScreenEmptyWorkspace() {
  return (
    <EdgeLayout screenLabel="09e · Empty workspace · first run" crumbs={['comms.app','harbor','home']}
      eyebrow="NEW WORKSPACE"
      illustration={<div style={{ margin:'0 auto 22px', padding:'24px 28px', border:'1px dashed var(--line-2)', borderRadius:16, background:'var(--bg-elev)', maxWidth:460, textAlign:'left' }}>
        <div className="meta" style={{ marginBottom:10 }}>GET YOUR FIRST CONVERSATION LIVE IN 10 MINUTES</div>
        {['Pick a template','Import 1 contact','Send to yourself','See the result'].map((s, i) => (
          <div key={s} style={{ display:'grid', gridTemplateColumns:'22px 1fr', alignItems:'center', gap:10, padding:'8px 0', borderTop: i?'1px dashed var(--line)':'none' }}>
            <span style={{ width:20, height:20, borderRadius:'50%', border:'1px solid var(--line-2)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)' }}>{i+1}</span>
            <span style={{ fontSize:13.5, color:'var(--ink-2)' }}>{s}</span>
          </div>
        ))}
      </div>}
      title="Welcome to Harbor."
      italic="Let's run your first conversation."
      sub="You've got the full Professional experience for 14 days. No credit card, no pressure. We'll call YOUR phone first so you can feel it from the inside."
      actions={<><Btn variant="primary" onClick={() => window.location.href='Builder.html'}>Start the 10-minute setup →</Btn><Btn variant="subtle" onClick={() => window.location.href='Home.html'}>Skip — I'll explore</Btn></>}/>
  );
}

function ScreenOffline() {
  return (
    <EdgeLayout screenLabel="09f · Offline" crumbs={['comms.app','?','?']}
      eyebrow="CONNECTION"
      illustration={<div style={{ margin:'0 auto 22px', padding:'8px 12px', border:'1px solid oklch(0.40 0.14 25)', color:'oklch(0.40 0.14 25)', borderRadius:999, fontFamily:'var(--mono)', fontSize:11, display:'inline-flex', alignItems:'center', gap:8 }}>
        <span style={{ width:6, height:6, borderRadius:'50%', background:'oklch(0.40 0.14 25)' }}/>
        OFFLINE · RETRYING IN 3S
      </div>}
      title="You've dropped off the network."
      italic="We're retrying."
      sub="Your work is saved locally. Active conversations continue to run on Comms servers — you'll see their final outcomes when you're back online."
      actions={<><Btn variant="primary" onClick={() => window.location.href='Home.html'}>Try again now</Btn><Btn variant="subtle" onClick={() => window.location.href='Home.html'}>Work in read-only</Btn></>}/>
  );
}

function ScreenInviteAccept() {
  return (
    <AuthFrame screenLabel="09g · Invite accept"
      sideCopy={{ title:'Ellis invited you', italic:'to join Harbor.', body:'Harbor is running 41 active campaigns on Comms — onboarding, credentialing, and voice of customer. You\'ll be added as an Editor.' }}>
      <div style={{ maxWidth:420 }}>
        <div className="meta" style={{ marginBottom:10 }}>ACCEPT INVITE</div>
        <h1 style={{ ...window.APP_SCALE.titleLg, margin:0 }}>Join Harbor <span className="italic-serif" style={{ color:'var(--ink-3)' }}>on Comms.</span></h1>

        <div style={{ marginTop:22, padding:16, border:'1px solid var(--line)', borderRadius:12, background:'var(--bg-elev)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'40px 1fr', gap:12, alignItems:'center' }}>
            <div style={{ width:40, height:40, borderRadius:10, background:'var(--ink)', display:'grid', placeItems:'center' }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--accent)' }}/>
            </div>
            <div>
              <div style={{ fontSize:14, fontWeight:500 }}>Harbor · production</div>
              <div className="meta" style={{ marginTop:2 }}>4 ACTIVE MEMBERS · INVITED BY ELLIS KATO</div>
            </div>
          </div>
          <div style={{ marginTop:12, paddingTop:12, borderTop:'1px dashed var(--line)', display:'flex', justifyContent:'space-between', fontSize:12.5 }}>
            <span className="meta">YOUR ROLE</span>
            <span className="chip">EDITOR</span>
          </div>
        </div>

        <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:14 }}>
          <AuthField label="Your name" value="Jordan Wells" placeholder="Full name"/>
          <AuthField label="Set a password" type="password" placeholder="••••••••••" hint="At least 12 characters"/>
        </div>

        <div style={{ marginTop:22, display:'flex', gap:10 }}>
          <button className="primary" onClick={() => window.location.href='Home.html'} style={{ padding:'12px 16px', borderRadius:10, flex:1 }}>Accept & join →</button>
          <button className="ghost" onClick={() => window.location.href='Log In.html'} style={{ padding:'12px 16px' }}>Decline</button>
        </div>
      </div>
    </AuthFrame>
  );
}

Object.assign(window, { Screen404, ScreenPermissionDenied, ScreenUpgradeRequired, ScreenRateLimit, ScreenEmptyWorkspace, ScreenOffline, ScreenInviteAccept });
