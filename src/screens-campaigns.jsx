// ============================================================
// Phase 4 · CAMPAIGNS — list + detail drawer + bulk actions
// ============================================================

function ScreenCampaigns() {
  const rows = [
    ['Customer feedback · Q2',          'live',    '12,402','8,614', 69, 'NPS',             'Ellis K.',      '2h'],
    ['Shift confirmations · Apr 19',    'live',    '  418', '  394', 94, 'Onboarding',      'Maya L.',       '18m'],
    ['Renewal outreach · SMB',          'paused',  ' 2,091',' 1,203',57, 'Qualify',         'Ellis K.',      '1d'],
    ['Compliance sweep · HR',           'draft',   '   —',  '   —',  0, 'Policy',           'Priya S.',      '4d'],
    ['Onboarding · new hires · week 18','live',    '  312', '  298', 95, 'Onboarding',      'Devon R.',      '4h'],
    ['Win/loss · closed-lost Q1',       'complete','   94', '   72', 77, 'Research',        'Ellis K.',      '8d'],
    ['Safety briefing · forklift ops',  'live',    ' 1,104','   918',83, 'Policy',          'Priya S.',      '3h'],
    ['Exit interview · departing',      'draft',   '   —',  '   —',  0, 'Research',         'Maya L.',       '2d'],
    ['BLS recert · expiring 30d',       'scheduled','  218','    0',  0, 'Vendor',          'Priya S.',      '1d'],
    ['NPS · enterprise accounts',       'complete','   86', '   74', 86, 'NPS',             'Ellis K.',      '14d'],
  ];
  const [selected, setSelected] = React.useState(new Set([0, 2]));
  const toggle = (i) => {
    setSelected(s => {
      const ns = new Set(s);
      if (ns.has(i)) ns.delete(i); else ns.add(i);
      return ns;
    });
  };
  return (
    <AppFrame active="campaigns" screenLabel="04a Campaigns · List"
      crumbs={['comms.app','campaigns']}
      topRight={<Btn variant="primary" onClick={() => window.location.href='Builder.html'}>+ New campaign</Btn>}>
      <div style={{ height:'100%', display:'grid', gridTemplateRows:'auto auto auto 1fr', minHeight:0 }}>
        <PageHead eyebrow="04 · CAMPAIGNS" title="Every conversation you've sent,"
          italicTail="every one still running."/>

        {/* filter bar */}
        <div style={{ padding:'14px 28px', borderBottom:'1px solid var(--line)', display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
          {['All · 10','Live · 4','Paused · 1','Draft · 2','Scheduled · 1','Complete · 2'].map((t, i) => (
            <button key={t} style={{
              padding:'6px 12px', borderRadius:999,
              background: i===0?'var(--ink)':'var(--bg-elev)',
              color: i===0?'var(--bg)':'var(--ink-2)',
              border:'1px solid ' + (i===0?'var(--ink)':'var(--line)'),
              fontSize:12,
            }}>{t}</button>
          ))}
          <div style={{ flex:1 }}/>
          <input placeholder="Search campaigns…" style={{ padding:'7px 12px', border:'1px solid var(--line)', borderRadius:8, fontSize:12.5, minWidth:240, background:'var(--bg-elev)', fontFamily:'var(--mono)', color:'var(--ink-2)' }}/>
          <Btn variant="subtle">Filters · 0</Btn>
          <span className="meta">Sort: updated ↓</span>
        </div>

        {/* bulk actions */}
        <div style={{
          padding:'10px 28px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', gap:12,
          background: selected.size ? 'color-mix(in srgb, var(--accent-soft) 60%, var(--bg))' : 'var(--bg)',
          color: selected.size ? 'var(--accent-ink)' : 'var(--ink-3)',
          fontSize:12, fontFamily:'var(--mono)',
        }}>
          {selected.size > 0
            ? <>● {selected.size} SELECTED
                <Btn variant="subtle">Pause</Btn>
                <Btn variant="subtle">Duplicate</Btn>
                <Btn variant="subtle">Export CSV</Btn>
                <Btn variant="subtle">Archive</Btn>
                <span style={{ flex:1 }}/>
                <button onClick={()=>setSelected(new Set())} style={{ background:'transparent', border:0, color:'inherit', cursor:'pointer' }}>Clear ✕</button>
              </>
            : 'SELECT ROWS TO ACT IN BULK · J/K TO NAVIGATE · SPACE TO SELECT · ⌘↵ TO OPEN'}
        </div>

        {/* table */}
        <div style={{ overflow:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead style={{ position:'sticky', top:0, background:'var(--bg)', zIndex:1 }}>
              <tr>
                <th style={{ padding:'10px 14px', borderBottom:'1px solid var(--line)', width:30 }}></th>
                {['NAME','STATUS','SENT','RESP','COMPLETION','TYPE','OWNER','UPDATED',''].map(h=>(
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', borderBottom:'1px solid var(--line)' }} className="meta">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderBottom:'1px solid var(--line)', background: selected.has(i)?'color-mix(in srgb, var(--accent-soft) 35%, var(--bg-elev))':'transparent', cursor:'pointer' }}>
                  <td style={{ padding:'12px 14px' }}>
                    <input type="checkbox" checked={selected.has(i)} onChange={()=>toggle(i)} style={{ accentColor:'var(--ink)' }}/>
                  </td>
                  <td style={{ padding:'12px 14px', fontWeight:500 }}>{r[0]}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <Pill tone={r[1]==='live'?'accent': r[1]==='paused'?'warn': r[1]==='complete'?'neutral':'neutral'}>● {r[1].toUpperCase()}</Pill>
                  </td>
                  <td style={{ padding:'12px 14px', fontFamily:'var(--mono)' }}>{r[2]}</td>
                  <td style={{ padding:'12px 14px', fontFamily:'var(--mono)' }}>{r[3]}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <div className="metric-bar accent" style={{ flex:1, maxWidth:120 }}><i style={{ width: r[4]+'%' }}/></div>
                      <span className="meta">{r[4]}%</span>
                    </div>
                  </td>
                  <td style={{ padding:'12px 14px' }}><span className="chip">{r[5]}</span></td>
                  <td style={{ padding:'12px 14px', color:'var(--ink-2)' }}>{r[6]}</td>
                  <td style={{ padding:'12px 14px', fontFamily:'var(--mono)', color:'var(--ink-3)' }}>{r[7]}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <a href="Campaign Detail.html" className="meta" style={{ color:'var(--ink)' }}>OPEN →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppFrame>
  );
}

function ScreenCampaignDetail() {
  return (
    <AppFrame active="campaigns" screenLabel="04b Campaigns · Detail + drawer"
      crumbs={['comms.app','campaigns','customer-feedback-q2']}
      topRight={<>
        <Pill tone="accent">● LIVE</Pill>
        <Btn variant="subtle">Pause</Btn>
        <Btn variant="subtle">Duplicate</Btn>
        <Btn variant="primary">Export →</Btn>
      </>}>
      <div style={{ height:'100%', display:'grid', gridTemplateColumns:'1fr 400px', minHeight:0 }}>
        <div style={{ overflow:'auto' }}>
          {/* AI Summary Card */}
          <div style={{
            background: 'var(--accent-soft)', border: '1px solid var(--line)',
            borderRadius: 14, padding: 20, margin: '20px 28px 0',
            fontSize: 15, lineHeight: 1.65, color: 'var(--ink)',
          }}>
            <strong>12 of 15 people</strong> have completed their onboarding.
            Maria and Jordan haven't started — Maria hasn't opened the email,
            Jordan started but stopped at the insurance certificate step.
            <strong> 2 insurance certificates</strong> are missing.
            <div style={{ marginTop: 14 }}>
              <input placeholder="Ask about this campaign..." style={{
                width: '100%', padding: '10px 14px', border: '1px solid var(--line)',
                borderRadius: 10, fontSize: 13, fontFamily: 'var(--sans)',
                background: 'var(--bg-elev)',
              }} />
            </div>
          </div>

          <PageHead eyebrow="CAMPAIGN · NPS"
            title="Customer feedback · Q2"
            italicTail="8,614 of 12,402 replied."
            sub="Sent Apr 12 by Ellis. Scheduled to close May 3. Average sentiment +42 — trending up from Q1."/>

          {/* Plain-language summary */}
          <div style={{ margin:'20px 28px 0', padding:20, background:'var(--accent-soft)', border:'1px solid var(--line)', borderRadius:'var(--radius-lg)' }}>
            <p style={{ fontSize:15, lineHeight:1.6, color:'var(--ink)', margin:0 }}>
              <strong>12 of 15 people</strong> have completed their onboarding. <strong>2 are in progress</strong>, 1 hasn't started. You have all documents from 10 people. <strong>2 are missing their insurance certificate.</strong>
            </p>
          </div>

          {/* stat strip */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', borderBottom:'1px solid var(--line)' }}>
            {[
              ['12,402','sent'],['8,614','responded · 69%'],['2m 14s','avg duration'],
              ['+42','NPS · +12 vs Q1'],['$1,418','run cost · est'],
            ].map(([v, l], i) => (
              <div key={i} style={{ padding:'20px 24px', borderLeft: i?'1px solid var(--line)':'none' }}>
                <div style={{ fontSize:26, fontWeight:500, letterSpacing:'-0.02em' }}>{v}</div>
                <div className="meta" style={{ marginTop:4 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* timeline / channel split */}
          <div style={{ padding:'24px 28px', borderBottom:'1px solid var(--line)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
              <span className="meta">RESPONSES · LAST 7 DAYS</span>
              <div style={{ display:'flex', gap:8 }}>
                {['All','SMS','Voice','Email','Link'].map((c, i) => (
                  <span key={c} className="chip" style={i===0?{ borderColor:'var(--ink)', color:'var(--ink)' }:{}}>{c}</span>
                ))}
              </div>
            </div>
            {/* pseudo sparkline */}
            <div style={{ display:'flex', gap:4, height:80, alignItems:'end' }}>
              {Array.from({length:36}).map((_, i) => {
                const h = 20 + Math.abs(Math.sin(i*0.4)) * 55 + (i/36)*10;
                return <div key={i} style={{ flex:1, height:h, background: i>28?'var(--accent)':'var(--ink-2)', opacity: i>28?1:0.55, borderRadius:'2px 2px 0 0' }}/>;
              })}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
              <span className="meta">APR 12</span>
              <span className="meta">NOW</span>
            </div>
          </div>

          {/* recent conversations */}
          <div style={{ padding:'24px 28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
              <span className="meta">RECENT CONVERSATIONS</span>
              <a href="Participants.html" className="meta" style={{ color:'var(--ink-3)' }}>SEE ALL 8,614 →</a>
            </div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr>{['WHO','CHANNEL','SCORE','THEME','DURATION','WHEN',''].map(h=>(
                  <th key={h} style={{ padding:'8px 10px', textAlign:'left', borderBottom:'1px solid var(--line)' }} className="meta">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {[
                  ['Maria Rodriguez','SMS',      '9','export-friction','2:14','4m'],
                  ['Devon Park',     'Voice',    '7','nps-passive',    '3:08','22m'],
                  ['Aisha Nabil',    'Email',    '6','pricing',        '—',   '48m'],
                  ['Luis Ortega',    'Link+SMS', '10','promoter',      '1:42','1h'],
                  ['Priya Shah',     'Voice',    '8','willingness-to-pay','2:55','2h'],
                ].map((r, i) => (
                  <tr key={i} onClick={() => window.location.href='Conversation Replay.html'} style={{ borderBottom:'1px solid var(--line)', cursor:'pointer' }}>
                    <td style={{ padding:'12px 10px', fontWeight:500 }}><a href="Participant Detail.html" onClick={(e)=>e.stopPropagation()} style={{ color:'inherit', textDecoration:'none' }}>{r[0]}</a></td>
                    <td style={{ padding:'12px 10px' }}><span className="chip">{r[1]}</span></td>
                    <td style={{ padding:'12px 10px', fontFamily:'var(--mono)', fontSize:14 }}>{r[2]}</td>
                    <td style={{ padding:'12px 10px' }}><span className="chip">{r[3]}</span></td>
                    <td style={{ padding:'12px 10px', fontFamily:'var(--mono)' }}>{r[4]}</td>
                    <td style={{ padding:'12px 10px', fontFamily:'var(--mono)', color:'var(--ink-3)' }}>{r[5]}</td>
                    <td style={{ padding:'12px 10px' }}><a className="meta" href="Conversation Replay.html" style={{ color:'var(--ink)' }}>OPEN →</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* drawer */}
        <aside style={{ borderLeft:'1px solid var(--line)', background:'var(--bg-elev)', padding:'20px 24px', overflow:'auto', display:'flex', flexDirection:'column', gap:18 }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <span className="meta" style={{ color:'var(--ink-2)' }}>CAMPAIGN CONFIG</span>
            <Btn variant="subtle">Edit</Btn>
          </div>

          <div>
            <div className="meta" style={{ marginBottom:6 }}>FLOW</div>
            <div style={{ padding:10, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg)' }}>
              <div style={{ fontSize:14, fontWeight:500 }}>nps-conversational-pulse</div>
              <div className="meta" style={{ marginTop:2 }}>v 2.4 · 6 BLOCKS · 2M AVG</div>
            </div>
          </div>

          <div>
            <div className="meta" style={{ marginBottom:6 }}>AUDIENCE</div>
            <div style={{ padding:10, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg)' }}>
              <div style={{ fontSize:14 }}>12,402 enterprise customers</div>
              <div className="meta" style={{ marginTop:2 }}>SF · all_customers_q2</div>
            </div>
          </div>

          <div>
            <div className="meta" style={{ marginBottom:6 }}>CHANNELS</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              <span className="chip">1 SMS</span>
              <span className="chip">2 Voice</span>
              <span className="chip">3 Email</span>
              <span className="chip">Link</span>
            </div>
          </div>

          <div>
            <div className="meta" style={{ marginBottom:6 }}>SCHEDULE</div>
            <div style={{ fontSize:13.5, lineHeight:1.5, color:'var(--ink-2)' }}>
              Started Apr 12, 9:00 AM local<br/>
              Quiet hours 9p–8a<br/>
              Closes May 3
            </div>
          </div>

          <div>
            <div className="meta" style={{ marginBottom:6 }}>TOP THEMES</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {[['export-friction',41],['pricing',28],['onboarding',14],['search-quality',9]].map(([t, n]) => (
                <div key={t} style={{ display:'grid', gridTemplateColumns:'1fr 36px', gap:10, alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:12.5, fontFamily:'var(--mono)' }}>{t}</div>
                    <div className="metric-bar" style={{ marginTop:4 }}><i style={{ width: n*2 + '%' }}/></div>
                  </div>
                  <span className="meta" style={{ textAlign:'right' }}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="meta" style={{ marginBottom:6 }}>INTEGRATIONS</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {['Webhook → prod-analytics','Snowflake sync · nightly','Slack alert · #nps-detractors'].map(i => (
                <div key={i} style={{ padding:'8px 10px', border:'1px dashed var(--line-2)', borderRadius:8, fontSize:12.5, color:'var(--ink-2)' }}>● {i}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="meta" style={{ marginBottom:6 }}>DANGER</div>
            <div style={{ display:'flex', gap:6 }}>
              <Btn variant="subtle">Pause</Btn>
              <Btn variant="subtle" style={{ color:'oklch(0.40 0.14 25)' }}>Stop</Btn>
              <Btn variant="subtle" style={{ color:'oklch(0.40 0.14 25)' }}>Archive</Btn>
            </div>
          </div>
        </aside>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenCampaigns, ScreenCampaignDetail });
