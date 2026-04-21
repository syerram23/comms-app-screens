// ============================================================
// Phase 5 · PARTICIPANTS CRM — list + profile + segments
// ============================================================

function ScreenParticipants() {
  const people = [
    ['MR','Maria Rodriguez','RN · 3y',         'Seattle, WA',    'active',     98, '2h',   'enterprise'],
    ['DP','Devon Park',     'Electrician · 5y','Austin, TX',     'active',     91, '14m',  'smb'],
    ['AN','Aisha Nabil',    'CDL-A · 2y',      'Newark, NJ',     'pending',    76, '3d',   'starter'],
    ['LO','Luis Ortega',    'Picker · 1y',     'Fontana, CA',    'active',     88, '32m',  'enterprise'],
    ['PS','Priya Shah',     'LPN · 4y',        'Chicago, IL',    'offboarded', 94, '14d',  'enterprise'],
    ['JM','Jordan Miles',   'Ops Lead · 6y',   'Brooklyn, NY',   'active',     84, '1h',   'enterprise'],
    ['SA','Sana Ahmed',     'CDL-A · 1y',      'Houston, TX',    'active',     72, '4h',   'smb'],
    ['RK','Ryota Kimura',   'Warehouse · 2y',  'Long Beach, CA', 'active',     81, '22m',  'starter'],
    ['NB','Nia Brooks',     'RN · 7y',         'Atlanta, GA',    'active',     96, '12m',  'enterprise'],
    ['MV','Mateo Vargas',   'Electrician · 3y','Phoenix, AZ',    'pending',    68, '2d',   'starter'],
    ['TL','Tess Lam',       'LPN · 2y',        'San Jose, CA',   'active',     89, '3h',   'enterprise'],
    ['KO','Kenji Okafor',   'CDL-A · 4y',      'Dallas, TX',     'active',     85, '58m',  'smb'],
  ];
  const [selected, setSelected] = React.useState(3);
  const w = people[selected];

  return (
    <AppFrame active="people" screenLabel="05a Participants · List + profile"
      crumbs={['comms.app','participants','all']}
      topRight={<>
        <Btn variant="subtle" onClick={() => window.location.href='Segments.html'}>+ Segment</Btn>
        <Btn variant="subtle">Import</Btn>
        <Btn variant="primary">+ Participant</Btn>
      </>}>
      <div style={{ height:'100%', display:'grid', gridTemplateColumns:'420px 1fr', minHeight:0 }}>
        {/* list column */}
        <div style={{ borderRight:'1px solid var(--line)', display:'grid', gridTemplateRows:'auto auto 1fr', minHeight:0 }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--line)' }}>
            <div className="meta" style={{ marginBottom:8 }}>12,492 PARTICIPANTS · 8 REGIONS</div>
            <div style={{
              border:'1px solid var(--line)', borderRadius:8,
              padding:'8px 12px', background:'var(--bg-elev)',
              fontFamily:'var(--mono)', fontSize:12.5, color:'var(--ink-2)',
            }}>
              ⌕ <span style={{ color:'var(--accent-ink)' }}>cert:expiring&lt;30d</span> AND zone:west
            </div>
          </div>

          {/* segments chips */}
          <div style={{ padding:'10px 20px', borderBottom:'1px solid var(--line)', display:'flex', gap:6, flexWrap:'wrap' }}>
            <span className="meta" style={{ alignSelf:'center', marginRight:6 }}>SEGMENTS</span>
            {['All','Active · 8,914','Enterprise · 412','Expiring 30d · 62','Offboarded · 88'].map((s, i) => (
              <button key={s} style={{
                padding:'4px 10px', borderRadius:999, fontSize:11, fontFamily:'var(--mono)',
                background: i===0?'var(--ink)':'var(--bg-elev)',
                color: i===0?'var(--bg)':'var(--ink-2)',
                border:'1px solid ' + (i===0?'var(--ink)':'var(--line)'),
              }}>{s}</button>
            ))}
          </div>

          <div style={{ overflow:'auto' }}>
            {people.map((p, i) => (
              <button key={i} onClick={()=>setSelected(i)} onDoubleClick={()=>window.location.href='Participant Detail.html'} style={{
                width:'100%', textAlign:'left',
                display:'grid', gridTemplateColumns:'36px 1fr auto', gap:12,
                padding:'12px 18px', border:0,
                background: selected===i?'var(--chip)':'transparent',
                borderLeft: selected===i?'2px solid var(--accent)':'2px solid transparent',
                borderBottom:'1px solid var(--line)', cursor:'pointer',
              }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontSize:12, fontFamily:'var(--mono)' }}>{p[0]}</div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:13.5, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p[1]}</div>
                  <div className="meta">{p[2]} · {p[3]}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:11, fontFamily:'var(--mono)', color: p[4]==='active'?'var(--accent-ink)':p[4]==='pending'?'oklch(0.38 0.14 60)':'var(--ink-3)' }}>● {p[4].toUpperCase()}</div>
                  <div className="meta">{p[6]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* profile column */}
        <div style={{ overflow:'auto' }}>
          <div style={{ padding:'28px 32px', borderBottom:'1px solid var(--line)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ display:'flex', gap:16 }}>
                <div style={{ width:64, height:64, borderRadius:14, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontSize:20, fontFamily:'var(--mono)', fontWeight:500 }}>{w[0]}</div>
                <div>
                  <div style={{ fontSize:24, fontWeight:500, letterSpacing:'-0.01em' }}>{w[1]}</div>
                  <div className="meta" style={{ marginTop:6 }}>{w[2].toUpperCase()} · {w[3].toUpperCase()}</div>
                  <div style={{ marginTop:10, display:'flex', gap:6, flexWrap:'wrap' }}>
                    <Pill tone="accent">● {w[4].toUpperCase()}</Pill>
                    <span className="chip">{w[7].toUpperCase()}</span>
                    <span className="chip">RN</span>
                    <span className="chip">BLS</span>
                    <Pill tone="warn">ACLS · EXPIRES 30D</Pill>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <Btn variant="ghost" onClick={() => window.location.href='Builder.html'}>Message</Btn>
                <Btn variant="primary" onClick={() => window.location.href='Builder.html'}>Start conversation</Btn>
              </div>
            </div>
          </div>

          {/* stat grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid var(--line)' }}>
            {[
              ['Response rate', '98%', 'over 47 convos'],
              ['Sentiment',     '+86', 'positive'],
              ['Preferred',     'SMS', 'voice as fallback'],
              ['Avg completion','1m 42s', 'top decile'],
            ].map(([k, v, s], i) => (
              <div key={i} style={{ padding:'18px 24px', borderLeft: i?'1px solid var(--line)':'none' }}>
                <div className="meta">{k.toUpperCase()}</div>
                <div style={{ fontSize:24, fontWeight:500, letterSpacing:'-0.02em', marginTop:6 }}>{v}</div>
                <div className="meta" style={{ marginTop:2 }}>{s}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', minHeight:340 }}>
            {/* timeline */}
            <div style={{ padding:'24px 32px', borderRight:'1px solid var(--line)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                <span className="meta">TIMELINE · LAST 30 DAYS</span>
                <span className="meta">47 CONVERSATIONS</span>
              </div>
              <div style={{ marginTop:14, display:'flex', flexDirection:'column', gap:0 }}>
                {[
                  ['2h', 'Completed', 'Safety check survey · 92% clarity', 'accent'],
                  ['1d', 'Reminder sent', 'ACLS renewal · SMS', ''],
                  ['4d', 'Conversation', 'Shift-swap request · resolved', ''],
                  ['9d', 'Training', 'Sharps protocol · passed 9/10', 'accent'],
                  ['14d', 'Onboarding', 'W-9, BLS, NDA received', ''],
                  ['22d', 'Acknowledgment', 'Q2 policy update · signed', 'accent'],
                ].map(([t, k, d, a], i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'48px 140px 1fr', padding:'10px 0', borderBottom:'1px solid var(--line)', gap:14, alignItems:'center' }}>
                    <span className="meta">{t}</span>
                    <span style={{ fontSize:12, fontFamily:'var(--mono)', color: a==='accent'?'var(--accent-ink)':'var(--ink-2)' }}>● {k.toUpperCase()}</span>
                    <span style={{ fontSize:13, color:'var(--ink-2)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* attributes */}
            <div style={{ padding:'24px 32px' }}>
              <div className="meta" style={{ marginBottom:10 }}>ATTRIBUTES</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                {[
                  ['Preferred channel','SMS → Voice escalation'],
                  ['Language','English, Spanish'],
                  ['Contact window','8a–6p PT, weekdays'],
                  ['Tier','Enterprise · 3y tenure'],
                  ['Manager','Jordan Miles'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display:'grid', gridTemplateColumns:'120px 1fr', fontSize:13 }}>
                    <span className="meta">{k.toUpperCase()}</span>
                    <span style={{ color:'var(--ink-2)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="meta" style={{ marginBottom:8 }}>CREDENTIALS</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {[
                  ['RN · Licensed',   'FULL',   'var(--accent-ink)'],
                  ['BLS · CPR',       'FULL',   'var(--accent-ink)'],
                  ['ACLS',            '30D',    'oklch(0.40 0.14 60)'],
                  ['I-9 · on file',   'FULL',   'var(--accent-ink)'],
                ].map(([k, s, c], i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr auto', padding:'6px 0', borderBottom:'1px dashed var(--line)', fontSize:12.5 }}>
                    <span>{k}</span>
                    <span className="meta" style={{ color: c }}>● {s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function ScreenSegments() {
  const segs = [
    ['ENT','Enterprise · active',         412,  'tier:enterprise AND status:active', 'Ellis K.','2d'],
    ['EXP','Expiring certs · 30d',        62,   'cert.expires_within_days:30',        'Priya S.','1d'],
    ['WST','West coast · RN',             218,  'role:RN AND region:west',            'Ellis K.','4d'],
    ['SPN','Spanish-preferring',          3,148,'lang:es OR lang:es-MX',              'Maya L.', '8d'],
    ['OFF','Offboarded · last 90d',       88,   'status:offboarded AND offboarded_at>90d', 'Ellis K.','12d'],
    ['NPS','Detractors · Q2',             114,  'last_nps:≤6 AND last_nps.at:q2',     'Devon R.','3d'],
  ];
  return (
    <AppFrame active="people" screenLabel="05b Participants · Segments"
      crumbs={['comms.app','participants','segments']}
      topRight={<Btn variant="primary">+ Build segment</Btn>}>
      <div style={{ height:'100%', overflow:'auto' }}>
        <PageHead eyebrow="SEGMENTS" title="Dynamic cohorts" italicTail="that update themselves."
          sub="Queries over your participant attributes and event history. Attach them to flows, campaigns, or automations."/>
        <div style={{ padding:'14px 28px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', gap:12 }}>
          <input placeholder="Search segments…" style={{ padding:'7px 12px', border:'1px solid var(--line)', borderRadius:8, fontSize:12.5, minWidth:240, background:'var(--bg-elev)', fontFamily:'var(--mono)', color:'var(--ink-2)' }}/>
          <div style={{ flex:1 }}/>
          <span className="meta">6 segments · all auto-update</span>
        </div>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr>{['','NAME','SIZE','QUERY','OWNER','UPDATED',''].map((h, j) => (
              <th key={'h'+j} style={{ padding:'10px 18px', textAlign:'left', borderBottom:'1px solid var(--line)' }} className="meta">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {segs.map((s, i) => (
              <tr key={i} style={{ borderBottom:'1px solid var(--line)' }}>
                <td style={{ padding:'14px 18px' }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:'var(--chip)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:10, fontWeight:500 }}>{s[0]}</div>
                </td>
                <td style={{ padding:'14px 18px', fontWeight:500 }}>{s[1]}</td>
                <td style={{ padding:'14px 18px', fontFamily:'var(--mono)' }}>{typeof s[2]==='number' ? s[2].toLocaleString() : s[2]}</td>
                <td style={{ padding:'14px 18px', fontFamily:'var(--mono)', color:'var(--ink-2)', fontSize:12 }}>{s[3]}</td>
                <td style={{ padding:'14px 18px', color:'var(--ink-2)' }}>{s[4]}</td>
                <td style={{ padding:'14px 18px', fontFamily:'var(--mono)', color:'var(--ink-3)' }}>{s[5]}</td>
                <td style={{ padding:'14px 18px' }}><a href="Participants.html" className="meta" style={{ color:'var(--ink)' }}>OPEN →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenParticipants, ScreenSegments });
