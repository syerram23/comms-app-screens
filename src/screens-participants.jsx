// ============================================================
// Phase 5 · PARTICIPANTS CRM — list + profile + segments
// ============================================================

function ScreenParticipants() {
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const orgs = [
    { id: 'all', name: 'All People', count: 47 },
    { id: 'harbor', name: 'Harbor Inc.', count: 12, children: [
      { id: 'harbor-ops', name: 'Operations', count: 8 },
      { id: 'harbor-fin', name: 'Finance', count: 4 },
    ]},
    { id: 'novus', name: 'Novus Staffing LLC', count: 15 },
    { id: 'summit', name: 'Summit Field Services', count: 8 },
    { id: 'individual', name: 'Individual', count: 12 },
  ];

  const people = [
    { id: 'p1', name: 'María Ortega', email: 'maria@novusstaffing.co', org: 'Novus Staffing LLC', orgId: 'novus', status: 'Active', lastConvo: 'Onboarding · 2h ago' },
    { id: 'p2', name: 'Jordan Reyes', email: 'j.reyes@novusstaffing.co', org: 'Novus Staffing LLC', orgId: 'novus', status: 'Pending', lastConvo: 'Onboarding · Not started' },
    { id: 'p3', name: 'Devin Park', email: 'd.park@harbor.co', org: 'Harbor Inc.', orgId: 'harbor-ops', status: 'Active', lastConvo: 'NPS Survey · 1d ago' },
    { id: 'p4', name: 'Aisha Bello', email: 'a.bello@harbor.co', org: 'Harbor Inc.', orgId: 'harbor-ops', status: 'Active', lastConvo: 'Onboarding · Complete' },
    { id: 'p5', name: 'Taylor Nguyen', email: 't.nguyen@summitfield.co', org: 'Summit Field Services', orgId: 'summit', status: 'Active', lastConvo: 'Compliance · 3d ago' },
    { id: 'p6', name: 'Sam Okonkwo', email: 's.okonkwo@harbor.co', org: 'Harbor Inc.', orgId: 'harbor-fin', status: 'Active', lastConvo: 'Check-in · 5d ago' },
    { id: 'p7', name: 'Ashley Tran', email: 'a.tran@novusstaffing.co', org: 'Novus Staffing LLC', orgId: 'novus', status: 'Active', lastConvo: 'Onboarding · Partial' },
    { id: 'p8', name: 'Nina Patel', email: 'n.patel@individual.co', org: 'Individual', orgId: 'individual', status: 'Active', lastConvo: 'Feedback · 1w ago' },
  ];

  const parentOrgIds = orgs.filter(o => o.children).reduce((acc, o) => {
    o.children.forEach(c => { acc[c.id] = o.id; });
    return acc;
  }, {});

  const filtered = people.filter(p => {
    const orgMatch = selectedOrg === 'all' || p.orgId === selectedOrg || parentOrgIds[p.orgId] === selectedOrg;
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase());
    return orgMatch && searchMatch;
  });

  const togglePerson = (id) => {
    setSelectedPeople(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    const allIds = filtered.map(p => p.id);
    const allSelected = allIds.every(id => selectedPeople.includes(id));
    if (allSelected) {
      setSelectedPeople(prev => prev.filter(id => !allIds.includes(id)));
    } else {
      setSelectedPeople(prev => [...new Set([...prev, ...allIds])]);
    }
  };

  return (
    <AppFrame active="people" screenLabel="05a Participants · People"
      crumbs={['people']}
      topRight={<>
        <button className="ghost" onClick={() => setShowUpload(true)} style={{ padding: '8px 14px' }}>Upload CSV</button>
        <button className="ghost" style={{ padding: '8px 14px' }}>Add person</button>
      </>}>
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 0 }}>
        {/* Left column — Org tree */}
        <div style={{ borderRight: '1px solid var(--line)', padding: 16, background: 'var(--bg)', overflowY: 'auto' }}>
          <div className="meta" style={{ marginBottom: 10 }}>ORGANIZATIONS</div>
          {orgs.map(org => (
            <div key={org.id}>
              <div onClick={() => setSelectedOrg(org.id)} style={{
                padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: selectedOrg === org.id ? 'var(--accent-soft)' : 'transparent',
                borderLeft: selectedOrg === org.id ? '3px solid var(--accent)' : '3px solid transparent',
                fontWeight: selectedOrg === org.id ? 500 : 400,
                color: selectedOrg === org.id ? 'var(--ink)' : 'var(--ink-2)',
              }}>
                <span>{org.name}</span>
                <span className="meta" style={{ fontSize: 10 }}>{org.count}</span>
              </div>
              {org.children && org.children.map(child => (
                <div key={child.id} onClick={() => setSelectedOrg(child.id)} style={{
                  padding: '6px 12px 6px 32px', cursor: 'pointer', fontSize: 12,
                  display: 'flex', justifyContent: 'space-between',
                  background: selectedOrg === child.id ? 'var(--accent-soft)' : 'transparent',
                  borderLeft: selectedOrg === child.id ? '3px solid var(--accent)' : '3px solid transparent',
                  color: selectedOrg === child.id ? 'var(--ink)' : 'var(--ink-3)',
                }}>
                  <span>{child.name}</span>
                  <span className="meta" style={{ fontSize: 10 }}>{child.count}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right column — People table */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
            <input placeholder="Search people..." value={search} onChange={e => setSearch(e.target.value)} style={{
              width: '100%', padding: 10, border: '1px solid var(--line)', borderRadius: 10,
              fontSize: 13, fontFamily: 'var(--sans)', background: 'var(--bg)', color: 'var(--ink)',
              boxSizing: 'border-box',
            }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', width: 32 }}>
                    <input type="checkbox" onChange={toggleAll}
                      checked={filtered.length > 0 && filtered.every(p => selectedPeople.includes(p.id))}
                      style={{ accentColor: 'var(--accent)' }} />
                  </th>
                  <th className="meta" style={{ padding: '10px 14px', textAlign: 'left' }}>NAME</th>
                  <th className="meta" style={{ padding: '10px 14px', textAlign: 'left' }}>EMAIL</th>
                  <th className="meta" style={{ padding: '10px 14px', textAlign: 'left' }}>ORGANIZATION</th>
                  <th className="meta" style={{ padding: '10px 14px', textAlign: 'left' }}>LAST CONVERSATION</th>
                  <th className="meta" style={{ padding: '10px 14px', textAlign: 'left' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <input type="checkbox" checked={selectedPeople.includes(p.id)}
                        onChange={() => togglePerson(p.id)} style={{ accentColor: 'var(--accent)' }} />
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <a href="Participant Detail.html" style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', cursor: 'pointer' }}>{p.name}</a>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{p.email}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="chip" style={{ fontSize: 12 }}>{p.org}</span>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ink-3)' }}>{p.lastConvo}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <Pill tone={p.status === 'Active' ? 'accent' : 'neutral'}>{p.status}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected bottom bar */}
          {selectedPeople.length > 0 && (
            <div style={{
              padding: '10px 16px', borderTop: '1px solid var(--line)', background: 'var(--bg-elev)',
              display: 'flex', alignItems: 'center', gap: 12, fontSize: 13,
            }}>
              <span style={{ fontWeight: 500 }}>{selectedPeople.length} selected</span>
              <span style={{ color: 'var(--ink-4)' }}>&middot;</span>
              <a href="Send.html" style={{ color: 'var(--accent-ink)', textDecoration: 'none', fontWeight: 500 }}>Send conversation &rarr;</a>
              <span style={{ color: 'var(--ink-4)' }}>|</span>
              <span style={{ color: 'var(--ink-3)', cursor: 'pointer' }}>Remove from list</span>
            </div>
          )}
        </div>
      </div>

      {/* CSV Upload Modal */}
      {showUpload && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,14,12,0.5)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
          <div style={{ width: 520, background: 'var(--bg-elev)', borderRadius: 16, padding: 28, boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Import people</div>
              <button onClick={() => setShowUpload(false)} style={{ background: 'none', border: 'none', fontSize: 18, color: 'var(--ink-3)', cursor: 'pointer' }}>{'\u00D7'}</button>
            </div>

            <div className="meta" style={{ marginBottom: 8 }}>STEP 1 {'\u00B7'} DOWNLOAD TEMPLATE</div>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 8 }}>Your CSV should have these columns:</p>
            <div style={{ border: '1px solid var(--line)', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
              <table style={{ width: '100%', fontSize: 11, fontFamily: 'var(--mono)', borderCollapse: 'collapse' }}>
                <tr style={{ background: 'var(--chip)' }}>
                  <th style={{ padding: '6px 10px', textAlign: 'left', borderRight: '1px solid var(--line)' }}>first_name</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', borderRight: '1px solid var(--line)' }}>last_name</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', borderRight: '1px solid var(--line)' }}>email</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', borderRight: '1px solid var(--line)' }}>phone</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left', borderRight: '1px solid var(--line)' }}>organization</th>
                  <th style={{ padding: '6px 10px', textAlign: 'left' }}>tags</th>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', color: 'var(--ink-3)', borderRight: '1px solid var(--line)' }}>Mar{'\u00ED'}a</td>
                  <td style={{ padding: '6px 10px', color: 'var(--ink-3)', borderRight: '1px solid var(--line)' }}>Ortega</td>
                  <td style={{ padding: '6px 10px', color: 'var(--ink-3)', borderRight: '1px solid var(--line)' }}>maria@co.com</td>
                  <td style={{ padding: '6px 10px', color: 'var(--ink-3)', borderRight: '1px solid var(--line)' }}>+1 312...</td>
                  <td style={{ padding: '6px 10px', color: 'var(--ink-3)', borderRight: '1px solid var(--line)' }}>Novus</td>
                  <td style={{ padding: '6px 10px', color: 'var(--ink-3)' }}>vendor</td>
                </tr>
              </table>
            </div>
            <a style={{ fontSize: 12, color: 'var(--accent-ink)' }}>Download CSV template {'\u2192'}</a>

            <div className="meta" style={{ marginTop: 20, marginBottom: 8 }}>STEP 2 {'\u00B7'} UPLOAD YOUR FILE</div>
            <div style={{ border: '2px dashed var(--line)', borderRadius: 12, padding: 32, textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 24, color: 'var(--ink-4)', marginBottom: 8 }}>{'\u2191'}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Drop your CSV here or click to browse</div>
              <div style={{ fontSize: 11, color: 'var(--ink-4)', marginTop: 4 }}>CSV files up to 10MB</div>
            </div>

            <div className="meta" style={{ marginBottom: 8 }}>PREVIEW</div>
            <div style={{ background: 'var(--accent-soft)', borderRadius: 8, padding: 12, fontSize: 13, color: 'var(--accent-ink)', marginBottom: 16 }}>
              47 people found {'\u00B7'} 3 organizations detected {'\u00B7'} 0 duplicates
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowUpload(false)} className="ghost" style={{ padding: '8px 16px' }}>Cancel</button>
              <button onClick={() => setShowUpload(false)} className="primary" style={{ padding: '8px 16px' }}>Import 47 people</button>
            </div>
          </div>
        </div>
      )}
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
