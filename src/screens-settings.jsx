// ============================================================
// Phase 7 · SETTINGS — shared settings shell + sub-screens
// ============================================================

function SettingsShell({ active, children, screenLabel, crumbs }) {
  const nav = [
    ['profile','Profile', 'Settings Profile.html'],
    ['team','Team & members', 'Settings Team.html'],
    ['billing','Billing', 'Settings Billing.html'],
    ['api','API & webhooks', 'Settings API.html'],
    ['integrations','Integrations', 'Settings Integrations.html'],
    ['audit','Audit log', 'Settings Audit.html'],
    ['org','Workspace', 'Settings Profile.html'],
  ];
  return (
    <AppFrame active="settings" screenLabel={screenLabel} crumbs={crumbs}>
      <div style={{ height:'100%', display:'grid', gridTemplateColumns:'220px 1fr', minHeight:0 }}>
        <aside style={{ borderRight:'1px solid var(--line)', padding:'20px 12px' }}>
          <div className="meta" style={{ padding:'6px 10px 10px' }}>SETTINGS</div>
          {nav.map(([k, l, href]) => (
            <a key={k} href={href} style={{
              display:'block', padding:'8px 10px', borderRadius:7,
              background: active===k ? 'var(--bg-elev)' : 'transparent',
              border:'1px solid ' + (active===k?'var(--line)':'transparent'),
              color: active===k ? 'var(--ink)' : 'var(--ink-2)',
              fontSize:13, fontWeight: active===k?500:400, marginBottom:2,
            }}>{l}</a>
          ))}
        </aside>
        <div style={{ overflow:'auto' }}>{children}</div>
      </div>
    </AppFrame>
  );
}

function ScreenSettingsProfile() {
  return (
    <SettingsShell active="profile" screenLabel="07a Settings · Profile" crumbs={['comms.app','settings','profile']}>
      <PageHead eyebrow="SETTINGS · PROFILE" title="Your profile" italicTail="on Comms."/>
      <div style={{ padding:'24px 28px', maxWidth:720 }}>
        <div style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:20, alignItems:'center', marginBottom:22 }}>
          <div style={{ width:80, height:80, borderRadius:16, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:24 }}>EK</div>
          <div style={{ display:'flex', gap:8 }}>
            <Btn variant="subtle">Upload photo</Btn>
            <Btn variant="subtle">Remove</Btn>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <AuthField label="First name" value="Ellis" placeholder="First"/>
          <AuthField label="Last name" value="Kato" placeholder="Last"/>
          <AuthField label="Email" value="ellis.kato@harbor.co" placeholder="email"/>
          <AuthField label="Role" value="Admin" placeholder="role"/>
          <AuthField label="Timezone" value="America/Los_Angeles"/>
          <AuthField label="Language" value="English"/>
        </div>
        <div style={{ marginTop:24, display:'flex', gap:10 }}>
          <Btn variant="primary">Save changes</Btn>
          <Btn variant="subtle">Cancel</Btn>
        </div>

        <div style={{ marginTop:48, borderTop:'1px solid var(--line)', paddingTop:24 }}>
          <div className="meta" style={{ marginBottom:8 }}>NOTIFICATIONS</div>
          {[
            ['New conversation response', true, true, false],
            ['Flow failures / errors',    true, true, true],
            ['Weekly campaign digest',    true, false, false],
            ['Billing alerts · 80% quota',true, true, false],
          ].map(([l, em, sl, sms], i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 100px 100px 100px', padding:'10px 0', borderBottom:'1px solid var(--line)', alignItems:'center', fontSize:13 }}>
              <span>{l}</span>
              {[em, sl, sms].map((on, j) => (
                <span key={j} className="meta" style={{ color: on?'var(--accent-ink)':'var(--ink-3)' }}>
                  {['EMAIL','SLACK','SMS'][j]} · {on?'ON':'OFF'}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SettingsShell>
  );
}

function ScreenSettingsTeam() {
  const members = [
    ['EK','Ellis Kato',     'ellis.kato@harbor.co',   'Admin',       'active',    'now'],
    ['ML','Maya Liu',       'maya.liu@harbor.co',     'Editor',      'active',    '3m'],
    ['PS','Priya Shah',     'priya.shah@harbor.co',   'Editor',      'active',    '18m'],
    ['DR','Devon Reyes',    'devon.reyes@harbor.co',  'Viewer',      'active',    '2h'],
    ['JW','Jordan Wells',   'jordan.wells@ext.com',   'Viewer',      'invited',   '—'],
  ];
  return (
    <SettingsShell active="team" screenLabel="07b Settings · Team" crumbs={['comms.app','settings','team']}>
      <PageHead eyebrow="SETTINGS · TEAM" title="Team & members"
        italicTail="4 seats of 14."
        actions={<><Btn variant="subtle">Roles & permissions</Btn><Btn variant="primary">+ Invite member</Btn></>}/>
      <div style={{ padding:'14px 28px', borderBottom:'1px solid var(--line)', display:'flex', gap:8, alignItems:'center' }}>
        <input placeholder="Filter…" style={{ padding:'7px 12px', border:'1px solid var(--line)', borderRadius:8, fontSize:12, minWidth:200, background:'var(--bg-elev)' }}/>
        <div style={{ flex:1 }}/>
        <span className="meta">4 active · 1 pending · 9 seats free</span>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead>
          <tr>{['','NAME','EMAIL','ROLE','STATUS','LAST SEEN',''].map((h, j) => (
            <th key={'h'+j} style={{ padding:'10px 14px', textAlign:'left', borderBottom:'1px solid var(--line)' }} className="meta">{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={i} style={{ borderBottom:'1px solid var(--line)' }}>
              <td style={{ padding:'12px 14px' }}>
                <div style={{ width:30, height:30, borderRadius:8, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontSize:11, fontFamily:'var(--mono)' }}>{m[0]}</div>
              </td>
              <td style={{ padding:'12px 14px', fontWeight:500 }}>{m[1]}</td>
              <td style={{ padding:'12px 14px', color:'var(--ink-2)' }}>{m[2]}</td>
              <td style={{ padding:'12px 14px' }}><span className="chip">{m[3].toUpperCase()}</span></td>
              <td style={{ padding:'12px 14px' }}>
                <Pill tone={m[4]==='active'?'accent':'warn'}>● {m[4].toUpperCase()}</Pill>
              </td>
              <td style={{ padding:'12px 14px', fontFamily:'var(--mono)', color:'var(--ink-3)' }}>{m[5]}</td>
              <td style={{ padding:'12px 14px' }}><span className="meta" style={{ cursor:'pointer', color:'var(--ink-2)' }}>⋯</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </SettingsShell>
  );
}

function ScreenSettingsBilling() {
  return (
    <SettingsShell active="billing" screenLabel="07c Settings · Billing" crumbs={['comms.app','settings','billing']}>
      <PageHead eyebrow="SETTINGS · BILLING" title="Plan & usage"
        italicTail="Professional · annual."/>
      <div style={{ padding:'24px 28px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:24 }}>
          <div style={{ border:'1px solid var(--line)', borderRadius:12, padding:20, background:'var(--bg-elev)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div className="meta">CURRENT PLAN</div>
                <div style={{ fontSize:28, fontWeight:500, letterSpacing:'-0.02em', marginTop:6 }}>Professional</div>
                <div style={{ color:'var(--ink-2)', fontSize:13, marginTop:4 }}>$99/mo · billed annually · renews Dec 12</div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <Btn variant="subtle">Change plan</Btn>
                <Btn variant="subtle">Invoices →</Btn>
              </div>
            </div>
            <div style={{ marginTop:22 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span className="meta">CONVERSATIONS · THIS PERIOD</span>
                <span className="meta">284 of 500</span>
              </div>
              <div className="metric-bar accent"><i style={{ width: (284/500*100)+'%' }}/></div>
              <div className="meta" style={{ marginTop:6, color:'var(--ink-3)' }}>RESETS IN 9 DAYS · NO THROTTLING · OVERAGE $0.18 EA</div>
            </div>
          </div>
          <div style={{ border:'1px solid var(--line)', borderRadius:12, padding:20, background:'var(--bg-elev)' }}>
            <div className="meta">PAYMENT METHOD</div>
            <div style={{ marginTop:12, padding:12, border:'1px dashed var(--line-2)', borderRadius:8, fontFamily:'var(--mono)', fontSize:13, color:'var(--ink-2)' }}>
              VISA · •••• 4242 · 09/28
            </div>
            <Btn variant="subtle" style={{ marginTop:12 }}>Update card</Btn>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)' }}>
          {[
            ['$1,188','plan · annual'],
            ['$0','overage · this cycle'],
            ['500','conversations/mo'],
            ['5 / 14','manager seats'],
          ].map(([v, l], i) => (
            <div key={i} style={{ padding:'20px 24px', borderLeft: i?'1px solid var(--line)':'none' }}>
              <div style={{ fontSize:22, fontWeight:500, letterSpacing:'-0.01em' }}>{v}</div>
              <div className="meta" style={{ marginTop:4 }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div className="meta" style={{ marginTop:22, marginBottom:10 }}>RECENT INVOICES</div>
        <div style={{ border:'1px solid var(--line)', borderRadius:10, overflow:'hidden', background:'var(--bg-elev)' }}>
          {[
            ['Apr 01 2026','INV-2026-04-012','$99.00','paid'],
            ['Mar 01 2026','INV-2026-03-088','$99.00','paid'],
            ['Feb 01 2026','INV-2026-02-104','$117.20','paid'],
            ['Jan 01 2026','INV-2026-01-093','$99.00','paid'],
          ].map((r, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'140px 1fr 100px 100px 80px', padding:'12px 16px', borderBottom: i<3?'1px solid var(--line)':'none', fontSize:13, alignItems:'center' }}>
              <span className="meta">{r[0].toUpperCase()}</span>
              <span style={{ fontFamily:'var(--mono)' }}>{r[1]}</span>
              <span style={{ fontFamily:'var(--mono)' }}>{r[2]}</span>
              <Pill tone="accent">● {r[3].toUpperCase()}</Pill>
              <a className="meta" style={{ color:'var(--ink-2)' }}>PDF ↓</a>
            </div>
          ))}
        </div>
      </div>
    </SettingsShell>
  );
}

function ScreenSettingsAPI() {
  return (
    <SettingsShell active="api" screenLabel="07d Settings · API & webhooks" crumbs={['comms.app','settings','api']}>
      <PageHead eyebrow="SETTINGS · API" title="API keys & webhooks"
        italicTail="talk to Comms from your stack."
        actions={<><Btn variant="subtle">Read docs ↗</Btn><Btn variant="primary">+ New key</Btn></>}/>
      <div style={{ padding:'24px 28px', display:'flex', flexDirection:'column', gap:28 }}>
        <section>
          <div className="meta" style={{ marginBottom:10 }}>API KEYS · 3</div>
          <div style={{ border:'1px solid var(--line)', borderRadius:10, overflow:'hidden', background:'var(--bg-elev)' }}>
            {[
              ['Production · server',  'sk_live_2Kx9mNpQr8vL...b42a','Admin','Apr 12','9d'],
              ['Staging',              'sk_test_9a1LkP27xYzQ...c0f3','Editor','Mar 02','2h'],
              ['Analytics read-only',  'sk_live_0cXxQ41n9DdE...e19b','Read',  'Feb 14','18d'],
            ].map((r, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 320px 80px 100px 100px auto', gap:16, padding:'14px 16px', borderBottom: i<2?'1px solid var(--line)':'none', alignItems:'center' }}>
                <span style={{ fontSize:14, fontWeight:500 }}>{r[0]}</span>
                <code style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-2)' }}>{r[1]}</code>
                <span className="chip">{r[2].toUpperCase()}</span>
                <span className="meta">CREATED {r[3].toUpperCase()}</span>
                <span className="meta">LAST USED {r[4].toUpperCase()}</span>
                <div style={{ display:'flex', gap:6 }}>
                  <button className="ghost" style={{ padding:'4px 10px', fontSize:11 }}>Copy</button>
                  <button className="ghost" style={{ padding:'4px 10px', fontSize:11 }}>Revoke</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="meta" style={{ marginBottom:10 }}>WEBHOOKS · 4</div>
          <div style={{ border:'1px solid var(--line)', borderRadius:10, overflow:'hidden', background:'var(--bg-elev)' }}>
            {[
              ['session.completed',  'https://api.harbor.co/comms/session',  'v2','active'],
              ['session.failed',     'https://api.harbor.co/comms/session',  'v2','active'],
              ['participant.created','https://api.harbor.co/crm/sync',        'v2','active'],
              ['alert.detractor',    'https://hooks.slack.com/services/...', 'v1','paused'],
            ].map((r, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'220px 1fr 60px 120px auto', gap:16, padding:'14px 16px', borderBottom: i<3?'1px solid var(--line)':'none', alignItems:'center' }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:13, color:'var(--accent-ink)' }}>{r[0]}</span>
                <code style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r[1]}</code>
                <span className="chip">{r[2]}</span>
                <Pill tone={r[3]==='active'?'accent':'warn'}>● {r[3].toUpperCase()}</Pill>
                <button className="ghost" style={{ padding:'4px 10px', fontSize:11 }}>Logs ↗</button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="meta" style={{ marginBottom:10 }}>QUICKSTART</div>
          <pre style={{
            margin:0, padding:16, border:'1px solid var(--line)', borderRadius:10,
            background:'var(--ink)', color:'var(--bg)', fontFamily:'var(--mono)', fontSize:12.5, lineHeight:1.7,
            whiteSpace:'pre', overflow:'auto',
          }}>
{`$ curl https://api.comms.ai/v2/sessions \\
    -H "Authorization: Bearer sk_live_2Kx9mNpQr8vL..." \\
    -d '{ "flow": "nps-pulse-v2", "to": "+12065552131" }'

→ { "id": "sess_2Kx9mNpQr8vL", "status": "queued", "eta_s": 42 }`}
          </pre>
        </section>
      </div>
    </SettingsShell>
  );
}

function ScreenSettingsIntegrations() {
  const groups = [
    ['ATS / VMS',  ['Bullhorn','Beeline','Fieldglass','VNDLY','Greenhouse']],
    ['HRIS',       ['Workday','Rippling','ADP','BambooHR']],
    ['Analytics',  ['Snowflake','BigQuery','Looker','Tableau']],
    ['Messaging',  ['Slack','Teams','Zapier','Webhooks']],
  ];
  const connected = new Set(['Bullhorn','Slack','Snowflake','ADP']);
  return (
    <SettingsShell active="integrations" screenLabel="07e Settings · Integrations" crumbs={['comms.app','settings','integrations']}>
      <PageHead eyebrow="SETTINGS · INTEGRATIONS" title="Plug into"
        italicTail="what you already use."/>
      <div style={{ padding:'24px 28px' }}>
        {groups.map(([g, items], gi) => (
          <div key={g} style={{ marginBottom:28 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
              <div className="meta">{g.toUpperCase()}</div>
              <span className="meta" style={{ color:'var(--ink-3)' }}>{items.filter(i => connected.has(i)).length} of {items.length} CONNECTED</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10 }}>
              {items.map(it => {
                const on = connected.has(it);
                return (
                  <div key={it} style={{
                    padding:14, border:'1px solid var(--line)', borderRadius:10,
                    background:'var(--bg-elev)', display:'grid',
                    gridTemplateColumns:'32px 1fr auto', gap:10, alignItems:'center',
                  }}>
                    <div style={{ width:32, height:32, borderRadius:8, background:'var(--chip)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-2)' }}>{it.slice(0,2).toUpperCase()}</div>
                    <div>
                      <div style={{ fontSize:13.5, fontWeight:500 }}>{it}</div>
                      {on && <div className="meta" style={{ color:'var(--accent-ink)' }}>● CONNECTED</div>}
                    </div>
                    <button className="ghost" style={{ padding:'4px 10px', fontSize:11 }}>{on?'Manage':'Connect'}</button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SettingsShell>
  );
}

function ScreenSettingsAudit() {
  const rows = [
    ['2h',  'ellis.kato@harbor.co',  'campaign.publish', 'customer-feedback-q2',    '10.0.1.12',   'ok'],
    ['4h',  'maya.liu@harbor.co',    'flow.edit',        'onboarding-q2-2026',      '73.14.92.4', 'ok'],
    ['1d',  'priya.shah@harbor.co',  'api_key.revoke',   'sk_live_9Lm2...',         '66.82.11.3',  'ok'],
    ['1d',  'system',                'participant.import','12,402 rows',             '—',           'ok'],
    ['2d',  'ellis.kato@harbor.co',  'auth.sso_login',   'okta',                    '10.0.1.12',   'ok'],
    ['3d',  'jordan.wells@ext.com',  'auth.invite.accept','—',                       '184.72.9.1',  'ok'],
    ['3d',  'system',                'webhook.retry',    'session.completed · v2',  '—',           'fail'],
    ['5d',  'ellis.kato@harbor.co',  'billing.plan.change','starter → professional','10.0.1.12',   'ok'],
    ['8d',  'devon.reyes@harbor.co', 'flow.publish',     'nps-conversational-pulse','73.14.92.4', 'ok'],
  ];
  return (
    <SettingsShell active="audit" screenLabel="07f Settings · Audit log" crumbs={['comms.app','settings','audit']}>
      <PageHead eyebrow="SETTINGS · AUDIT" title="Audit log"
        italicTail="every action, every actor."
        actions={<><Btn variant="subtle">Filter</Btn><Btn variant="subtle">Export CSV</Btn></>}/>
      <div style={{ padding:'14px 28px', borderBottom:'1px solid var(--line)', display:'flex', gap:8, alignItems:'center' }}>
        <input placeholder="Search actor, action, entity…" style={{ padding:'7px 12px', border:'1px solid var(--line)', borderRadius:8, fontSize:12, minWidth:300, background:'var(--bg-elev)', fontFamily:'var(--mono)', color:'var(--ink-2)' }}/>
        <div style={{ flex:1 }}/>
        <span className="meta">LAST 30 DAYS · RETENTION · 1 YEAR ON PRO</span>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead>
          <tr>{['WHEN','ACTOR','ACTION','ENTITY','IP','STATUS'].map(h => (
            <th key={h} style={{ padding:'10px 18px', textAlign:'left', borderBottom:'1px solid var(--line)' }} className="meta">{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom:'1px solid var(--line)' }}>
              <td style={{ padding:'12px 18px', fontFamily:'var(--mono)', color:'var(--ink-3)' }}>{r[0]}</td>
              <td style={{ padding:'12px 18px', color:'var(--ink-2)' }}>{r[1]}</td>
              <td style={{ padding:'12px 18px' }}><code style={{ fontFamily:'var(--mono)', color:'var(--accent-ink)', fontSize:12.5 }}>{r[2]}</code></td>
              <td style={{ padding:'12px 18px', color:'var(--ink-2)' }}>{r[3]}</td>
              <td style={{ padding:'12px 18px', fontFamily:'var(--mono)', color:'var(--ink-3)' }}>{r[4]}</td>
              <td style={{ padding:'12px 18px' }}>
                <Pill tone={r[5]==='ok'?'accent':'danger'}>● {r[5].toUpperCase()}</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SettingsShell>
  );
}

Object.assign(window, { ScreenSettingsProfile, ScreenSettingsTeam, ScreenSettingsBilling, ScreenSettingsAPI, ScreenSettingsIntegrations, ScreenSettingsAudit });
