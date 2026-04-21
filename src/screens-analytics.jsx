// ============================================================
// Phase 7 · ANALYTICS, SEARCH, NOTIFICATIONS
// ============================================================

function ScreenAnalytics() {
  return (
    <AppFrame active="analytics" screenLabel="07a Analytics · Dashboard"
      crumbs={['comms.app', 'analytics', 'overview']}
      topRight={<Btn variant="primary">Export report</Btn>}>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <PageHead eyebrow="07 · ANALYTICS" title="Analytics"
          italicTail="everything measured."
          actions={
            <>
              {['7d', '30d', '90d', 'Custom'].map((t, i) => (
                <button key={t} style={{
                  padding: '6px 12px', borderRadius: 999,
                  background: i === 1 ? 'var(--ink)' : 'var(--bg-elev)',
                  color: i === 1 ? 'var(--bg)' : 'var(--ink-2)',
                  border: '1px solid ' + (i === 1 ? 'var(--ink)' : 'var(--line)'),
                  fontSize: 12, cursor: 'pointer',
                }}>{t}</button>
              ))}
            </>
          }
        />

        {/* Stat strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderBottom: '1px solid var(--line)',
        }}>
          {[
            ['1,247', 'total conversations', '+12%'],
            ['94.2%', 'completion rate', '+2.1%'],
            ['4m 12s', 'avg duration', '-18s'],
            ['87%', 'response rate', '+5%'],
          ].map(([v, l, t], i) => (
            <div key={i} style={{
              padding: '20px 28px',
              borderLeft: i ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em' }}>{v}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>{l}</div>
              <div className="meta" style={{ marginTop: 4, color: t.startsWith('+') ? 'var(--accent-ink)' : 'var(--ink-3)' }}>
                {t.startsWith('+') ? '▲ ' : '▼ '}{t} · vs prior period
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 0,
          borderBottom: '1px solid var(--line)',
        }}>
          {/* Bar chart — conversations per week */}
          <div style={{ padding: '24px 28px', borderRight: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <span className="meta" style={{ color: 'var(--ink-2)' }}>CONVERSATIONS PER WEEK</span>
              <span className="meta">LAST 8 WEEKS</span>
            </div>
            <div style={{ display: 'flex', gap: 8, height: 120, alignItems: 'end' }}>
              {[
                { h: 52, label: 'W1', val: 98 },
                { h: 68, label: 'W2', val: 128 },
                { h: 60, label: 'W3', val: 113 },
                { h: 80, label: 'W4', val: 151 },
                { h: 72, label: 'W5', val: 136 },
                { h: 88, label: 'W6', val: 166 },
                { h: 95, label: 'W7', val: 179 },
                { h: 100, label: 'W8', val: 189 },
              ].map((w, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span className="meta" style={{ fontSize: 9 }}>{w.val}</span>
                  <div style={{
                    width: '100%', height: w.h + '%',
                    background: i >= 6 ? 'var(--accent)' : 'var(--ink-2)',
                    opacity: i >= 6 ? 1 : 0.5,
                    borderRadius: '3px 3px 0 0',
                  }} />
                  <span className="meta" style={{ fontSize: 9 }}>{w.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completion by channel */}
          <div style={{ padding: '24px 28px' }}>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 16 }}>COMPLETION BY CHANNEL</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['SMS', 94],
                ['Email', 82],
                ['Voice', 91],
                ['Link', 88],
              ].map(([ch, pct]) => (
                <div key={ch}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{ch}</span>
                    <span className="meta">{pct}%</span>
                  </div>
                  <div className="metric-bar accent" style={{ height: 6 }}>
                    <i style={{ width: pct + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 0,
        }}>
          {/* Recent activity feed */}
          <div style={{ padding: '24px 28px', borderRight: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span className="meta" style={{ color: 'var(--ink-2)' }}>RECENT ACTIVITY</span>
              <span className="meta">TODAY</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['09:42 AM', 'MR', 'Maria Rodriguez', 'Completed onboarding', 'accent'],
                ['09:38 AM', 'DP', 'Devon Park', 'Uploaded W-9', ''],
                ['09:31 AM', 'AN', 'Aisha Nabil', 'Started voice session', ''],
                ['09:24 AM', 'LO', 'Luis Ortega', 'Completed safety briefing', 'accent'],
                ['09:18 AM', 'NB', 'Nia Brooks', 'Submitted compliance docs', 'accent'],
                ['09:11 AM', 'RK', 'Ryota Kimura', 'Responded to shift confirmation', ''],
              ].map(([time, init, name, action, tone], i) => (
                <div key={i} onClick={() => window.location.href='Participant Detail.html'} style={{
                  display: 'grid', gridTemplateColumns: '64px 32px 1fr auto',
                  gap: 12, alignItems: 'center', padding: '10px 0',
                  borderBottom: '1px solid var(--line)', cursor: 'pointer',
                }}>
                  <span className="meta">{time}</span>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, background: 'var(--ink)',
                    color: 'var(--bg)', display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--mono)', fontSize: 10,
                  }}>{init}</div>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
                    <span style={{ fontSize: 13, color: 'var(--ink-2)', marginLeft: 8 }}>{action}</span>
                  </div>
                  {tone === 'accent' && <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent-ink)' }}>● DONE</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Top themes */}
          <div style={{ padding: '24px 28px' }}>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 14 }}>TOP THEMES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['Scheduling', 34],
                ['Documentation', 28],
                ['Compliance', 22],
                ['Training', 16],
              ].map(([theme, pct]) => (
                <div key={theme}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{theme}</span>
                    <span className="meta">{pct}%</span>
                  </div>
                  <div className="metric-bar" style={{ height: 6 }}>
                    <i style={{ width: pct * 2.5 + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function ScreenSearch() {
  return (
    <AppFrame active="search" screenLabel="07b Search · Natural language"
      crumbs={['comms.app', 'search']}
      topRight={<Btn variant="subtle">Saved queries · 3</Btn>}>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <PageHead eyebrow="SEARCH" title="Search"
          italicTail="ask anything." />

        {/* Search input */}
        <div style={{ padding: '0 28px 20px', borderBottom: '1px solid var(--line)' }}>
          <div style={{
            border: '2px solid var(--ink)', borderRadius: 12,
            padding: '14px 18px', background: 'var(--bg-elev)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 18, color: 'var(--ink-3)' }}>⌕</span>
            <span style={{ flex: 1, fontSize: 15, color: 'var(--ink)' }}>
              Which contractors have an expiring COI this month?
            </span>
            <KBD>↵</KBD>
          </div>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {['All', 'Conversations', 'Documents', 'People'].map((f, i) => (
              <button key={f} style={{
                padding: '5px 12px', borderRadius: 999,
                background: i === 0 ? 'var(--ink)' : 'var(--bg-elev)',
                color: i === 0 ? 'var(--bg)' : 'var(--ink-2)',
                border: '1px solid ' + (i === 0 ? 'var(--ink)' : 'var(--line)'),
                fontSize: 12, cursor: 'pointer',
              }}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 0 }}>
          {/* Results */}
          <div style={{ padding: '24px 28px', borderRight: '1px solid var(--line)' }}>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 16 }}>4 RESULTS · 0.3s</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                {
                  init: 'MV', name: 'Mateo Vargas', role: 'Electrician · Phoenix, AZ',
                  snippet: 'COI from Hartford Insurance expires April 22, 2026. No renewal uploaded.',
                  badge: 'Document · COI', time: 'Updated 3d ago',
                },
                {
                  init: 'SA', name: 'Sana Ahmed', role: 'CDL-A · Houston, TX',
                  snippet: 'Certificate of Insurance expiring April 28 — reminder sent via SMS on Apr 5.',
                  badge: 'Conversation · Reminder', time: 'Updated 1d ago',
                },
                {
                  init: 'KO', name: 'Kenji Okafor', role: 'CDL-A · Dallas, TX',
                  snippet: 'COI renewal pending — uploaded draft on Apr 2, awaiting validation.',
                  badge: 'Document · Pending', time: 'Updated 5d ago',
                },
                {
                  init: 'TL', name: 'Tess Lam', role: 'LPN · San Jose, CA',
                  snippet: 'Liability insurance certificate expires April 30. Marked as expiring in compliance sweep.',
                  badge: 'Compliance · Alert', time: 'Updated 2d ago',
                },
              ].map((r, i) => (
                <div key={i} onClick={() => window.location.href='Participant Detail.html'} style={{
                  display: 'grid', gridTemplateColumns: '40px 1fr',
                  gap: 14, padding: '16px 0',
                  borderBottom: '1px solid var(--line)', cursor: 'pointer',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'var(--accent-soft)', color: 'var(--accent-ink)',
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500,
                  }}>{r.init}</div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</span>
                        <span className="meta" style={{ marginLeft: 10 }}>{r.role.toUpperCase()}</span>
                      </div>
                      <span className="meta">{r.time.toUpperCase()}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.5 }}>
                      {r.snippet.split(/(expir\w*|COI)/gi).map((part, j) =>
                        /expir|coi/i.test(part)
                          ? <span key={j} style={{ background: 'var(--accent-soft)', color: 'var(--accent-ink)', padding: '1px 3px', borderRadius: 3 }}>{part}</span>
                          : <span key={j}>{part}</span>
                      )}
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <span className="chip">{r.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested queries sidebar */}
          <div style={{ padding: '24px 20px' }}>
            <div className="meta" style={{ color: 'var(--ink-2)', marginBottom: 14 }}>SUGGESTED QUERIES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Show all participants who completed onboarding this week',
                'Who has a pending W-9 submission?',
                'List voice sessions longer than 5 minutes',
                'Which campaigns have a completion rate below 80%?',
                'Find all detractors from the Q2 NPS survey',
              ].map((q, i) => (
                <button key={i} style={{
                  textAlign: 'left', padding: '10px 12px',
                  border: '1px solid var(--line)', borderRadius: 10,
                  background: 'var(--bg-elev)', fontSize: 12.5,
                  color: 'var(--ink-2)', cursor: 'pointer',
                  lineHeight: 1.4,
                }}>⌕ {q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function ScreenNotifications() {
  const notifications = [
    { type: 'completion', read: false, title: 'Maria Rodriguez completed onboarding', desc: 'All 6 blocks finished — W-9, BLS cert, and NDA collected.', time: '2m ago' },
    { type: 'exception', read: false, title: 'Voice session failed — Devon Park', desc: 'Call dropped at 1:42. Auto-retry scheduled in 15 minutes.', time: '8m ago' },
    { type: 'mention', read: false, title: 'Ellis Kato mentioned you in Compliance sweep', desc: '@priya can you review the forklift ops responses? Three flagged.', time: '14m ago' },
    { type: 'completion', read: false, title: 'Shift confirmations — Apr 19 reached 94%', desc: '394 of 418 participants responded. 6 pending, 18 declined.', time: '32m ago' },
    { type: 'pending', read: true, title: 'Aisha Nabil uploaded CDL-A renewal', desc: 'Document pending validation. Auto-check running.', time: '1h ago' },
    { type: 'system', read: true, title: 'Snowflake sync completed', desc: 'Nightly export: 12,402 records synced to warehouse.analytics_prod.', time: '2h ago' },
    { type: 'exception', read: true, title: 'SMS delivery failure — 3 participants', desc: 'Carrier rejection for numbers in 936 area code. Check provider status.', time: '3h ago' },
    { type: 'completion', read: true, title: 'Luis Ortega passed safety briefing', desc: 'Score: 9/10. Certificate auto-issued and attached to profile.', time: '4h ago' },
    { type: 'mention', read: true, title: 'Maya Lin tagged you in NPS follow-up', desc: '@priya detractor list exported — 114 contacts ready for outreach.', time: 'Yesterday' },
    { type: 'system', read: true, title: 'Platform update v4.12 deployed', desc: 'Voice transcription accuracy improved 8%. New webhook retry logic.', time: 'Yesterday' },
  ];

  const dotColor = {
    completion: 'var(--accent)',
    pending: 'oklch(0.66 0.17 70)',
    exception: 'oklch(0.55 0.18 25)',
    mention: 'oklch(0.58 0.17 255)',
    system: 'var(--ink-3)',
  };

  return (
    <AppFrame active="notifications" screenLabel="07c Notifications · Activity feed"
      crumbs={['comms.app', 'notifications']}
      topRight={<Btn variant="ghost">Mark all read</Btn>}>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <PageHead eyebrow="NOTIFICATIONS" title="Notifications"
          italicTail="stay in the loop."
          actions={
            <Btn variant="ghost">Mark all read</Btn>
          }
        />

        {/* Filter tabs */}
        <div style={{ padding: '14px 28px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 10 }}>
          {['All · 10', 'Mentions · 2', 'Completions · 3', 'Exceptions · 2'].map((t, i) => (
            <button key={t} style={{
              padding: '6px 12px', borderRadius: 999,
              background: i === 0 ? 'var(--ink)' : 'var(--bg-elev)',
              color: i === 0 ? 'var(--bg)' : 'var(--ink-2)',
              border: '1px solid ' + (i === 0 ? 'var(--ink)' : 'var(--line)'),
              fontSize: 12, cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* Notification items */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map((n, i) => (
            <div key={i} onClick={() => window.location.href = (n.type === 'completion' || n.type === 'pending' || n.type === 'exception') ? 'Participant Detail.html' : n.type === 'mention' ? 'Campaign Detail.html' : 'Home.html'} style={{
              display: 'grid', gridTemplateColumns: '20px 1fr auto',
              gap: 14, alignItems: 'start', padding: '16px 28px',
              borderBottom: '1px solid var(--line)',
              borderLeft: !n.read ? '3px solid var(--accent-soft)' : '3px solid transparent',
              background: !n.read ? 'color-mix(in srgb, var(--accent-soft) 20%, var(--bg))' : 'transparent',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: dotColor[n.type],
                marginTop: 4,
              }} />
              <div>
                <div style={{
                  fontSize: 13.5, fontWeight: n.read ? 400 : 500,
                  color: n.read ? 'var(--ink-2)' : 'var(--ink)',
                }}>{n.title}</div>
                <div style={{
                  fontSize: 12.5, color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.4,
                }}>{n.desc}</div>
              </div>
              <span className="meta" style={{ whiteSpace: 'nowrap' }}>{n.time.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenAnalytics, ScreenSearch, ScreenNotifications });
