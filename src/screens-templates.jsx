// ============================================================
// Phase 3 · TEMPLATES — gallery + categories + detail
// ============================================================

function ScreenTemplates() {
  const cats = [
    ['all','All', 48],
    ['feedback','Customer feedback', 9],
    ['research','User research', 7],
    ['leads','Lead qualification', 6],
    ['onboard','Onboarding', 11],
    ['training','Training', 5],
    ['policy','Policy & broadcast', 4],
    ['vendor','Vendor / contractor', 6],
  ];
  const tpls = [
    ['NPS · conversational pulse',         'feedback', 'Voice + SMS · 2 min',   'Conversational NPS with AI probe on passive/detractor answers.', 4821],
    ['Exit interview · departing employee','feedback', 'Voice · 8 min',          'Structured + open-ended probing, routed to People Ops.', 612],
    ['Lead qualifier · inbound form',      'leads',    'Voice or SMS · 2 min',   'Replaces the "contact us" form. Hot leads alert an AE in real time.', 2912],
    ['Usability interview · remote',       'research', 'Video · 15 min',         'AI-moderated remote interview with screen share and think-aloud prompts.', 431],
    ['Concept test · 3-way compare',       'research', 'Video + form · 12 min',  'Show 3 concepts, ask reactions, score preference, route qual data.', 217],
    ['W-9 + I-9 onboarding',               'onboard',  'Voice + SMS · 5 min',    'Collects W-9, I-9, direct deposit form. OCR validation in-conversation.', 1840],
    ['Shift availability · weekly sweep',  'onboard',  'SMS · 30 sec',           'Sends every Monday at 7am local. Updates your scheduler automatically.', 2261],
    ['BLS/ACLS recert reminder',           'vendor',   'Voice + Email · 4 min',  '30-day renewal outreach with signed ack and LMS hand-off.', 302],
    ['Safety briefing · ack required',     'policy',   'SMS · 90 sec',           'Policy update broadcast with signed ack. Auto-escalates non-responders.', 1472],
    ['Product knowledge check',            'training', 'Voice · 10 min',         'Adaptive role-play scored against a rubric you upload.', 289],
    ['Win/loss interview',                 'research', 'Voice · 12 min',         'AI-moderated deal postmortem for AEs to launch after every close-lost.', 166],
    ['Annual recertification',             'training', 'Voice · 8 min',          'Auto-scheduled, auto-graded, routed to LMS.', 412],
  ];
  const [cat, setCat] = React.useState('all');
  const [q, setQ]   = React.useState('');
  const filtered = tpls.filter(t => (cat==='all' || t[1]===cat) && t[0].toLowerCase().includes(q.toLowerCase()));

  return (
    <AppFrame active="templates" screenLabel="03a Templates · Gallery"
      crumbs={['comms.app','templates']}
      topRight={<Btn variant="primary">+ New template</Btn>}>
      <div style={{ height:'100%', display:'grid', gridTemplateRows:'auto auto 1fr', minHeight:0 }}>
        <PageHead eyebrow="03 · TEMPLATE GALLERY" title="Start from" italicTail="a proven conversation."
          sub="Vetted by the Comms team. Fork, customize, and publish in minutes."/>

        {/* filter bar */}
        <div style={{ padding:'14px 28px', borderBottom:'1px solid var(--line)', display:'grid', gridTemplateColumns:'1fr auto', gap:16, alignItems:'center' }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {cats.map(([k, t, n]) => (
              <button key={k} onClick={()=>setCat(k)} style={{
                padding:'6px 12px', borderRadius:999,
                background: cat===k ? 'var(--ink)' : 'var(--bg-elev)',
                color: cat===k ? 'var(--bg)' : 'var(--ink-2)',
                border:'1px solid ' + (cat===k?'var(--ink)':'var(--line)'),
                fontSize:12, display:'inline-flex', alignItems:'center', gap:6,
              }}>
                {t}
                <span className="meta" style={{ color:'inherit', opacity:0.7, fontSize:10 }}>{n}</span>
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search templates…"
              style={{ padding:'7px 12px', border:'1px solid var(--line)', borderRadius:8, fontSize:12.5, minWidth:220, background:'var(--bg-elev)', fontFamily:'var(--mono)', color:'var(--ink-2)' }}/>
            <span className="meta">{filtered.length} · sort: most used ↓</span>
          </div>
        </div>

        {/* grid */}
        <div style={{ overflow:'auto', padding:'20px 28px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14 }}>
            {filtered.map(([name, k, meta, desc, uses]) => (
              <a key={name} href="Template Detail.html" style={{ display:'block' }}>
                <div style={{
                  padding:20, border:'1px solid var(--line)', borderRadius:12,
                  background:'var(--bg-elev)', minHeight:200,
                  display:'flex', flexDirection:'column', gap:12,
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span className="chip">{k.toUpperCase()}</span>
                    <span className="meta">↗</span>
                  </div>
                  <div>
                    <div style={{ fontSize:16, fontWeight:500, letterSpacing:'-0.005em' }}>{name}</div>
                    <div className="meta" style={{ marginTop:4, textTransform:'none', letterSpacing:0 }}>{meta}</div>
                  </div>
                  <p style={{ margin:0, fontSize:13, color:'var(--ink-2)', lineHeight:1.5 }}>{desc}</p>
                  <div style={{ marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'end', paddingTop:10, borderTop:'1px dashed var(--line)' }}>
                    <span className="meta">USED · {uses.toLocaleString()}×</span>
                    <span style={{ fontSize:12, color:'var(--accent-ink)', fontWeight:500 }}>Use template →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function ScreenTemplateDetail() {
  return (
    <AppFrame active="templates" screenLabel="03b Templates · Detail"
      crumbs={['comms.app','templates','nps-conversational-pulse']}
      topRight={<><Btn variant="subtle" onClick={() => window.location.href='Preview.html'}>Preview</Btn><Btn variant="primary" onClick={() => window.location.href='Builder Chat.html'}>Use this template →</Btn></>}>
      <div style={{ height:'100%', overflow:'auto' }}>
        <PageHead eyebrow="TEMPLATE · FEEDBACK" title="NPS · conversational pulse"
          italicTail="with AI probes."
          sub="The Typeform replacement. Sends an NPS, then lets Comms ask ‘why’ in the participant's own words. 8× the response rate of a static form."/>

        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:0, borderBottom:'1px solid var(--line)' }}>
          {/* Flow preview */}
          <div style={{ padding:'24px 28px', borderRight:'1px solid var(--line)' }}>
            <div className="meta" style={{ marginBottom:12 }}>FLOW · 6 BLOCKS · 2 MIN AVG</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth: 460 }}>
              {[
                ['Say','Intro','"Hey — quick question about your experience..."'],
                ['Ask','0–10 rating','"How likely are you to recommend us?"'],
                ['Branch','Score-based fork','≤6 detractor · 7–8 passive · 9–10 promoter'],
                ['Ask','The why','AI adapts probe based on score'],
                ['Score','Tag themes','Auto-tagged · export/search/pricing/etc.'],
                ['Handoff','Route','Detractors → CSM, promoters → referrals'],
              ].map(([t, n, d], i) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'60px 1fr', gap:10, padding:10, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)' }}>
                  <span className="chip" style={{
                    background: t==='Branch'?'var(--accent-soft)':'var(--chip)',
                    color: t==='Branch'?'var(--accent-ink)':'var(--ink-2)',
                    width:'fit-content',
                  }}>{t}</span>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:500 }}>{n}</div>
                    <div className="meta" style={{ marginTop:2, textTransform:'none', letterSpacing:0 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* meta */}
          <div style={{ padding:'24px 28px', display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <div className="meta" style={{ marginBottom:8 }}>EXAMPLE TRANSCRIPT</div>
              <div style={{ padding:12, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)', fontSize:13, color:'var(--ink-2)', lineHeight:1.55 }}>
                <div><span className="meta" style={{ marginRight:6 }}>AI</span>"On a 0-10, how likely are you to recommend Harbor?"</div>
                <div style={{ marginTop:8, fontFamily:'var(--serif)', fontStyle:'italic' }}>"Honestly a 7. Search is great, export is painful."</div>
                <div style={{ marginTop:8 }}><span className="meta" style={{ marginRight:6 }}>AI</span>"Got it. What would the best version of that feature look like?"</div>
              </div>
            </div>

            <div>
              <div className="meta" style={{ marginBottom:6 }}>OUTPUTS</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {['score_0_10','category','theme_tags','attributed_quote','sentiment','recommended_action'].map(c => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>

            <div>
              <div className="meta" style={{ marginBottom:6 }}>PERFORMANCE (AVG)</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
                {[['94%','open rate'],['68%','completion'],['2m 04s','duration']].map(([v, l], i) => (
                  <div key={i} style={{ padding:12, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)' }}>
                    <div style={{ fontSize:20, fontWeight:500, letterSpacing:'-0.01em' }}>{v}</div>
                    <div className="meta" style={{ marginTop:4, fontSize:10 }}>{l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* related */}
        <div style={{ padding:'24px 28px' }}>
          <div className="meta" style={{ marginBottom:10 }}>RELATED TEMPLATES</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
            {[
              ['Exit interview · departing employee','612×'],
              ['Win/loss interview','166×'],
              ['Concept test · 3-way compare','217×'],
            ].map(([n, u], i) => (
              <a key={i} href="Template Detail.html" style={{ display:'block', padding:14, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)', textDecoration:'none', color:'inherit' }}>
                <div style={{ fontSize:13.5, fontWeight:500 }}>{n}</div>
                <div className="meta" style={{ marginTop:4 }}>USED {u}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenTemplates, ScreenTemplateDetail });
