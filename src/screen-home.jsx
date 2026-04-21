// ============================================================
// Home — conversational dashboard with natural language items.
// ============================================================

function ScreenHome() {
  return (
    <AppFrame
      active="home"
      crumbs={['Home']}
      screenLabel="Home"
    >
      <div style={{ height: '100%', overflow: 'auto', padding: '32px 28px' }}>
        {/* Greeting */}
        <div style={{ marginBottom: 8 }}>
          <h1 style={{ ...window.APP_SCALE.titleLg, margin: 0 }}>
            Good afternoon, <span className="italic-serif">Ellis.</span>
          </h1>
        </div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 32 }}>
          Here's what's happening today.
        </div>

        {/* Attention items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Item 1 — accent */}
          <a href="Campaign Detail.html" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 16, borderRadius: 12,
            border: '1px solid var(--line)',
            borderLeft: '3px solid var(--accent)',
            textDecoration: 'none', color: 'var(--ink)',
          }}>
            <span style={{ fontSize: 14 }}>
              <strong>3 contractors</strong> completed their onboarding today
            </span>
            <span style={{ fontSize: 12, color: 'var(--accent-ink)', whiteSpace: 'nowrap', marginLeft: 16 }}>
              View {'\u2192'}
            </span>
          </a>

          {/* Item 2 — amber */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 16, borderRadius: 12,
            border: '1px solid var(--line)',
            borderLeft: '3px solid oklch(0.66 0.17 70)',
          }}>
            <span style={{ fontSize: 14, color: 'var(--ink)' }}>
              Jordan Reyes hasn't opened their onboarding email
            </span>
            <span style={{
              fontSize: 12, color: 'oklch(0.38 0.14 60)', whiteSpace: 'nowrap',
              marginLeft: 16, cursor: 'pointer',
            }}>
              Send reminder {'\u2192'}
            </span>
          </div>

          {/* Item 3 — green */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 16, borderRadius: 12,
            border: '1px solid var(--line)',
            borderLeft: '3px solid oklch(0.55 0.17 148)',
          }}>
            <span style={{ fontSize: 14, color: 'var(--ink)' }}>
              Q2 NPS survey: <strong>12 new responses</strong>, trending 8.4
            </span>
            <span style={{
              fontSize: 12, color: 'var(--accent-ink)', whiteSpace: 'nowrap',
              marginLeft: 16, cursor: 'pointer',
            }}>
              See results {'\u2192'}
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ marginTop: 32 }}>
          {/* Primary action */}
          <a href="Builder.html" style={{
            display: 'block', textDecoration: 'none',
            background: 'var(--ink)', color: 'white',
            padding: '16px 20px', borderRadius: 12, marginBottom: 10,
            fontSize: 14, fontWeight: 500,
          }}>
            Start a new conversation {'\u2192'}
          </a>

          {/* Secondary actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <a href="Campaigns.html" style={{
              display: 'block', textDecoration: 'none', color: 'var(--ink)',
              padding: 16, borderRadius: 12, border: '1px solid var(--line)',
              fontSize: 14, fontWeight: 500,
            }}>
              Check active campaigns {'\u2192'}
            </a>
            <a href="Participants.html" style={{
              display: 'block', textDecoration: 'none', color: 'var(--ink)',
              padding: 16, borderRadius: 12, border: '1px solid var(--line)',
              fontSize: 14, fontWeight: 500,
            }}>
              View your people {'\u2192'}
            </a>
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ marginTop: 32 }}>
          <div className="meta" style={{ marginBottom: 14, color: 'var(--ink-2)' }}>RECENT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { initials: 'MO', text: 'Mar\u00eda Ortega completed vendor onboarding', time: '2h ago' },
              { initials: 'JR', text: 'Jordan Reyes uploaded W-9', time: '5h ago' },
              { initials: 'NP', text: 'Q2 NPS survey sent to 45 people', time: 'Yesterday' },
              { initials: 'AT', text: 'Ashley Tran signed NDA', time: 'Yesterday' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 0',
                borderBottom: i < 3 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'var(--accent-soft)',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 500,
                  color: 'var(--accent-ink)', flexShrink: 0,
                }}>
                  {item.initials}
                </div>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)' }}>{item.text}</span>
                <span className="meta" style={{ whiteSpace: 'nowrap' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenHome });
