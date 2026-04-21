// ============================================================
// Phase 2 · BUILDER — session wizard + flow editor + preview + dispatch
// ============================================================
const { useState: useStateB, useRef: useRefB, useEffect: useEffectB } = React;

// ---------- 2a · Session wizard (3 steps) ----------
function ScreenWizard() {
  const [step, setStep] = useStateB(1);
  const [goal, setGoal] = useStateB('onboarding');
  const [channels, setChannels] = useStateB({ sms: true, voice: true, email: false, link: true });
  const steps = ['Goal', 'Channels', 'Audience'];

  return (
    <AppFrame active="builder" screenLabel="02a Builder · Session wizard"
      crumbs={['comms.app','flows','new']}
      topRight={<><Btn variant="ghost">Save draft</Btn><Btn variant="primary" onClick={() => window.location.href='Builder Chat.html'}>Continue →</Btn></>}>
      <div style={{ height:'100%', display:'grid', gridTemplateRows:'auto 1fr', overflow:'auto' }}>
        <PageHead eyebrow="02 · NEW SESSION" title="What are you trying" italicTail="to hear back?"
          sub="Comms drafts the conversation. You'll edit the blocks in the next step."/>
        {/* stepper */}
        <div style={{ padding:'16px 28px', borderBottom:'1px solid var(--line)', display:'flex', gap:24, alignItems:'center', background:'var(--bg-elev)' }}>
          {steps.map((s,i) => {
            const n = i + 1;
            const active = n === step, done = n < step;
            return (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{
                  width:22, height:22, borderRadius:'50%',
                  background: done ? 'var(--accent)' : active ? 'var(--ink)' : 'transparent',
                  color: done||active ? 'var(--bg)' : 'var(--ink-3)',
                  border: done||active ? 'none' : '1px solid var(--line-2)',
                  display:'grid', placeItems:'center', fontSize:11, fontFamily:'var(--mono)',
                }}>{done ? '✓' : n}</span>
                <span style={{ fontSize:13, fontWeight: active?500:400, color: active?'var(--ink)':'var(--ink-3)' }}>{s}</span>
                {i<steps.length-1 && <span style={{ width:40, height:1, background:'var(--line)' }}/>}
              </div>
            );
          })}
          <div style={{ flex:1 }}/>
          <span className="meta">STEP {step} / 3 · <KBD>⌘↵</KBD> TO CONTINUE</span>
        </div>

        {/* body */}
        <div style={{ padding:'28px', overflow:'auto' }}>
          {step === 1 && (
            <div style={{ maxWidth: 820 }}>
              <div className="meta" style={{ marginBottom:12 }}>PICK A GOAL — OR DESCRIBE YOUR OWN</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, marginBottom: 18 }}>
                {[
                  ['onboarding','Onboarding','Collect docs, sign NDAs, route to manager'],
                  ['feedback','Feedback · NPS','Pulse survey with structured follow-ups'],
                  ['research','Research interview','Open-ended probe, AI-moderated'],
                  ['qualify','Lead qualification','Route hot leads to a human in real time'],
                  ['training','Training check','Adaptive rubric against your materials'],
                  ['policy','Policy ack','Broadcast + signed acknowledgment'],
                ].map(([k, t, d]) => (
                  <button key={k} onClick={()=>setGoal(k)} style={{
                    textAlign:'left', padding:16, borderRadius:10, cursor:'pointer',
                    background:'var(--bg-elev)',
                    border:'1px solid ' + (goal===k ? 'var(--ink)' : 'var(--line)'),
                    boxShadow: goal===k ? '0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)' : 'none',
                  }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span className="meta" style={{ color: goal===k?'var(--accent-ink)':'var(--ink-3)' }}>{goal===k?'●':'○'} {k.toUpperCase()}</span>
                      <span className="meta">·</span>
                    </div>
                    <div style={{ fontSize:15, fontWeight:500 }}>{t}</div>
                    <div className="meta" style={{ marginTop:4, color:'var(--ink-3)', textTransform:'none', letterSpacing:0 }}>{d}</div>
                  </button>
                ))}
              </div>

              <div className="meta" style={{ marginBottom:8 }}>OR DESCRIBE IT IN YOUR OWN WORDS</div>
              <textarea
                placeholder="e.g. Interview 50 Series A ops leads about their tooling. Ten minutes max. Probe on CRM and analytics pain."
                style={{
                  width:'100%', minHeight:96, resize:'vertical',
                  border:'1px solid var(--line)', borderRadius:10, padding:14,
                  fontFamily:'var(--sans)', fontSize:14, color:'var(--ink)',
                  background:'var(--bg-elev)', lineHeight:1.5,
                }}/>
              <div style={{ marginTop:10, display:'flex', gap:8, alignItems:'center' }}>
                <span className="meta" style={{ color:'var(--accent-ink)' }}>● AI will draft the flow</span>
                <span className="meta">· est. 6–8 blocks · 4m avg completion</span>
              </div>

              <div style={{ marginTop:22, display:'flex', justifyContent:'flex-end', gap:8 }}>
                <Btn variant="subtle" onClick={() => window.location.href='Builder.html'}>Cancel</Btn>
                <Btn variant="primary" onClick={()=>setStep(2)}>Continue → <KBD>⌘↵</KBD></Btn>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ maxWidth: 820 }}>
              <div className="meta" style={{ marginBottom:12 }}>WHICH CHANNELS SHOULD COMMS REACH THEM ON?</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10 }}>
                {[
                  ['sms',   'SMS',    'Texts. Best response rates for short check-ins.'],
                  ['voice', 'Voice',  'Inbound + outbound calls in 40+ languages.'],
                  ['email', 'Email',  'Long-form, best for long fuses.'],
                  ['link',  'Shareable link', 'Drop in Slack, LinkedIn, badge scan. No login.'],
                ].map(([k, t, d]) => (
                  <label key={k} style={{
                    display:'grid', gridTemplateColumns:'24px 1fr auto', gap:12,
                    padding:16, border:'1px solid ' + (channels[k]?'var(--ink)':'var(--line)'),
                    borderRadius:10, background:'var(--bg-elev)', cursor:'pointer', alignItems:'center',
                    boxShadow: channels[k]?'0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)':'none',
                  }}>
                    <input type="checkbox" checked={channels[k]} onChange={()=>setChannels(c=>({ ...c, [k]: !c[k] }))} style={{ accentColor:'var(--ink)' }}/>
                    <div>
                      <div style={{ fontSize:15, fontWeight:500 }}>{t}</div>
                      <div className="meta" style={{ textTransform:'none', letterSpacing:0 }}>{d}</div>
                    </div>
                    {channels[k] && <span className="meta" style={{ color:'var(--accent-ink)' }}>● ON</span>}
                  </label>
                ))}
              </div>

              <div style={{ marginTop:22, padding:14, border:'1px dashed var(--line-2)', borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13, color:'var(--ink-2)' }}>
                <span>Quiet hours: 9pm–8am local · Max 2 retries before escalation · Spanish auto-detect ON</span>
                <Btn variant="subtle">Advanced ↗</Btn>
              </div>

              <div style={{ marginTop:22, display:'flex', justifyContent:'space-between', gap:8 }}>
                <Btn variant="subtle" onClick={()=>setStep(1)}>← Back</Btn>
                <Btn variant="primary" onClick={()=>setStep(3)}>Continue → <KBD>⌘↵</KBD></Btn>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ maxWidth: 820 }}>
              <div className="meta" style={{ marginBottom:12 }}>WHO ARE THEY?</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:18 }}>
                {[
                  ['upload','Upload CSV','contacts.csv'],
                  ['sf','Salesforce','contacts · all_customers'],
                  ['hs','HubSpot','list · trial_signups'],
                  ['link','Public link','anyone who opens it'],
                ].map(([k, t, d]) => (
                  <div key={k} style={{ padding:14, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)' }}>
                    <span className="chip" style={{ textTransform:'uppercase' }}>{k}</span>
                    <div style={{ fontSize:14, fontWeight:500, marginTop:10 }}>{t}</div>
                    <div className="meta" style={{ marginTop:2, textTransform:'none' }}>{d}</div>
                  </div>
                ))}
              </div>

              <div className="meta" style={{ marginBottom:8 }}>UPLOAD PREVIEW</div>
              <div style={{ border:'1px solid var(--line)', borderRadius:10, overflow:'hidden', background:'var(--bg-elev)' }}>
                <div style={{ padding:'10px 14px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', fontFamily:'var(--mono)', fontSize:12 }}>
                  <span>contacts · trial_signups_q2.csv</span>
                  <span>1,218 rows · 4 cols</span>
                </div>
                <table style={{ width:'100%', fontSize:12.5, fontFamily:'var(--mono)', borderCollapse:'collapse' }}>
                  <thead>
                    <tr>{['name','phone','email','tier'].map(h => <th key={h} style={{ padding:'10px 14px', textAlign:'left', borderBottom:'1px solid var(--line)', color:'var(--ink-3)', fontWeight:500 }}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {[
                      ['Maria Rodriguez','+1 (206) 555 2131','maria.r@harbor.co','enterprise'],
                      ['Devon Park',     '+1 (512) 555 4408','devon@meridian.io','smb'],
                      ['Aisha Nabil',    '+44 20 7946 0981', 'aisha@clipboard.io','starter'],
                    ].map((r,i)=>(
                      <tr key={i} style={{ borderTop:'1px solid var(--line)' }}>
                        {r.map((c,j)=><td key={j} style={{ padding:'10px 14px', color:'var(--ink-2)' }}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop:22, display:'flex', justifyContent:'space-between', gap:8 }}>
                <Btn variant="subtle" onClick={()=>setStep(2)}>← Back</Btn>
                <Btn variant="primary" onClick={() => window.location.href='Builder Chat.html'}>Draft the flow → <KBD>⌘↵</KBD></Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppFrame>
  );
}

// ---------- 2b · Flow editor (interactive drag + wire) ----------
function ScreenFlowEditor() {
  // Interactive node positions. Drag via mouse. Wired with SVG paths.
  const [nodes, setNodes] = useStateB([
    { id:'start',  type:'Start',   title:'Inbound · SMS link opened',           x: 60,  y: 40,  meta:'Triggered · 218 so far' },
    { id:'intro',  type:'Say',     title:'Greet + identify',                    x: 60,  y: 160, meta:'"Hi {{name}} — Maria from Comms..."' },
    { id:'ask1',   type:'Ask',     title:'Confirm shift availability',          x: 60,  y: 280, meta:'Voice OR text · max 2 retries' },
    { id:'branch', type:'Branch',  title:'If available → collect docs',         x: 60,  y: 400, meta:'3 branches · AI-routed' },
    { id:'doc',    type:'Collect', title:'Upload W-9 · OCR',                    x:-150, y: 520, meta:'Required · expires 48h' },
    { id:'sign',   type:'Sign',    title:'e-Sign NDA',                          x: 60,  y: 520, meta:'DocuSign · routed' },
    { id:'end',    type:'Handoff', title:'Escalate if sentiment < 40',          x: 270, y: 520, meta:'Human in the loop' },
  ]);
  const [selId, setSelId] = useStateB('ask1');
  const dragRef = useRefB(null);

  const onMouseDownNode = (id) => (e) => {
    e.stopPropagation();
    setSelId(id);
    const start = { x: e.clientX, y: e.clientY };
    const initial = nodes.find(n => n.id === id);
    const move = (ev) => {
      setNodes(ns => ns.map(n => n.id === id ? { ...n, x: initial.x + (ev.clientX - start.x), y: initial.y + (ev.clientY - start.y) } : n));
    };
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // wire edges (from → to)
  const edges = [
    ['start','intro'],['intro','ask1'],['ask1','branch'],
    ['branch','doc'],['branch','sign'],['branch','end'],
  ];
  const nodeSize = { w: 260, h: 82 };
  // offset applied so negative x is visible (editor canvas origin)
  const ox = 200, oy = 20;
  const sel = nodes.find(n => n.id === selId);

  return (
    <AppFrame active="builder" screenLabel="02b Builder · Flow editor (interactive)"
      crumbs={['comms.app','flows','onboarding-q2-2026','edit']}
      topRight={<>
        <span className="meta" style={{ marginRight:10 }}>v0.14 · DRAFT · UNSAVED</span>
        <Btn variant="subtle" onClick={() => window.location.href='Preview.html'}>Preview</Btn>
        <Btn variant="subtle">Test run</Btn>
        <Btn variant="primary" onClick={() => window.location.href='Send.html'}>Publish →</Btn>
      </>}>
      <div style={{ height:'100%', display:'grid', gridTemplateColumns:'240px 1fr 320px', minWidth:0 }}>
        {/* left — block palette */}
        <div style={{ borderRight:'1px solid var(--line)', display:'flex', flexDirection:'column', overflow:'auto' }}>
          <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--line)' }}>
            <div className="meta" style={{ marginBottom:8 }}>BLOCKS · DRAG ONTO CANVAS</div>
            <input placeholder="Filter blocks…" style={{
              width:'100%', padding:'7px 10px', border:'1px solid var(--line)',
              borderRadius:8, fontSize:12, background:'var(--bg-elev)', fontFamily:'var(--mono)', color:'var(--ink-2)',
            }}/>
          </div>
          <div style={{ padding:8, display:'flex', flexDirection:'column', gap:4 }}>
            {[
              ['Say','◐','AI speaks or texts'],
              ['Ask','◑','Open question'],
              ['Choose','◒','Multiple choice'],
              ['Collect','□','Upload + OCR'],
              ['Sign','✎','e-signature'],
              ['Video','▷','Show a clip'],
              ['Form','▤','Web form in-chat'],
              ['Branch','◇','AI-routed split'],
              ['Score','≡','Rubric scorer'],
              ['Handoff','↗','Route to human'],
              ['Delay','○','Wait / schedule'],
              ['Webhook','⎔','Call your API'],
            ].map(([n, g, d]) => (
              <div key={n} style={{
                padding:'8px 10px', border:'1px solid var(--line)', borderRadius:8,
                background:'var(--bg-elev)', cursor:'grab',
                display:'grid', gridTemplateColumns:'20px 1fr', gap:8, alignItems:'center',
              }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-3)' }}>{g}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:500 }}>{n}</div>
                  <div className="meta" style={{ fontSize:10, textTransform:'none', letterSpacing:0 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* canvas */}
        <div className="grid-bg soft" style={{ position:'relative', background:'var(--bg)', overflow:'hidden' }}>
          {/* Toolbar */}
          <div style={{ position:'absolute', top:12, left:12, zIndex:3, display:'flex', gap:6 }}>
            {['Select','Pan','Connect','Comment'].map(t => (
              <button key={t} style={{
                padding:'6px 10px', border:'1px solid var(--line)', borderRadius:8,
                background:'var(--bg-elev)', fontSize:12, color:'var(--ink-2)',
              }}>{t}</button>
            ))}
          </div>
          <div style={{ position:'absolute', top:12, right:12, zIndex:3, display:'flex', gap:6, alignItems:'center' }}>
            <span className="meta">100%</span>
            <button style={{ padding:'6px 10px', border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-elev)', fontSize:12 }}>⊕</button>
            <button style={{ padding:'6px 10px', border:'1px solid var(--line)', borderRadius:8, background:'var(--bg-elev)', fontSize:12 }}>⊖</button>
          </div>

          {/* SVG edges */}
          <svg style={{ position:'absolute', inset:0, pointerEvents:'none', width:'100%', height:'100%' }}>
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" fill="var(--ink-3)"/>
              </marker>
            </defs>
            {edges.map(([from, to], i) => {
              const a = nodes.find(n => n.id === from);
              const b = nodes.find(n => n.id === to);
              if (!a || !b) return null;
              const x1 = a.x + ox + nodeSize.w/2, y1 = a.y + oy + nodeSize.h;
              const x2 = b.x + ox + nodeSize.w/2, y2 = b.y + oy;
              const midy = (y1 + y2) / 2;
              return (
                <path key={i}
                  d={`M ${x1} ${y1} C ${x1} ${midy} ${x2} ${midy} ${x2} ${y2}`}
                  stroke="var(--ink-3)" strokeWidth="1.4" fill="none" markerEnd="url(#arr)"/>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map(n => (
            <div key={n.id}
              onMouseDown={onMouseDownNode(n.id)}
              onClick={()=>setSelId(n.id)}
              style={{
                position:'absolute',
                left: n.x + ox, top: n.y + oy,
                width: nodeSize.w, padding:12,
                background:'var(--bg-elev)',
                border:'1px solid ' + (selId===n.id ? 'var(--ink)' : 'var(--line)'),
                borderRadius:12, cursor:'grab', userSelect:'none',
                boxShadow: selId===n.id
                  ? '0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent), 0 12px 30px -15px rgba(0,0,0,0.25)'
                  : '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -16px rgba(0,0,0,0.15)',
                zIndex: selId===n.id ? 2 : 1,
              }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span className="chip" style={{
                  background: n.type==='Branch' ? 'var(--accent-soft)' : 'var(--chip)',
                  color: n.type==='Branch' ? 'var(--accent-ink)' : 'var(--ink-2)',
                }}>{n.type}</span>
                <span className="meta">⠿</span>
              </div>
              <div style={{ marginTop:8, fontSize:13.5, fontWeight:500, lineHeight:1.3 }}>{n.title}</div>
              <div className="meta" style={{ marginTop:4, textTransform:'none', letterSpacing:0 }}>{n.meta}</div>
              {/* ports */}
              <span style={{ position:'absolute', top:-5, left:'50%', transform:'translateX(-50%)', width:10, height:10, borderRadius:'50%', background:'var(--bg-elev)', border:'1px solid var(--ink-3)' }}/>
              <span style={{ position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:10, height:10, borderRadius:'50%', background:'var(--bg-elev)', border:'1px solid var(--ink-3)' }}/>
            </div>
          ))}

          {/* status bar */}
          <div style={{
            position:'absolute', bottom:0, left:0, right:0,
            padding:'8px 14px', background:'color-mix(in srgb, var(--bg) 92%, transparent)',
            borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between',
            fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)',
          }}>
            <span>7 blocks · 1 branch · 2 required documents · {nodes.length} on canvas</span>
            <span style={{ display:'flex', gap:18 }}>
              <span>SAVED · just now</span>
              <span>AGENT · nova-v4.2</span>
              <span style={{ color:'var(--ink)' }}>J/K TO NAVIGATE · ⌘S TO SAVE</span>
            </span>
          </div>
        </div>

        {/* inspector */}
        <div style={{ borderLeft:'1px solid var(--line)', padding:20, overflow:'auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <span className="meta" style={{ color:'var(--ink-2)' }}>INSPECTOR</span>
            <span className="chip">{sel?.type || 'NONE'}</span>
          </div>

          {sel && <>
            <div className="meta" style={{ marginBottom:4 }}>BLOCK NAME</div>
            <input defaultValue={sel.title} style={{
              width:'100%', padding:'8px 10px', border:'1px solid var(--line)', borderRadius:8,
              fontSize:13, background:'var(--bg-elev)', color:'var(--ink)',
            }}/>

            <div className="meta" style={{ margin:'14px 0 4px' }}>PROMPT</div>
            <div style={{
              background:'var(--bg)', border:'1px solid var(--line)', borderRadius:10,
              padding:10, fontSize:13, color:'var(--ink-2)', lineHeight:1.5, minHeight:88,
            }}>
              "Great. Can you work the Friday 6 AM to 2 PM shift at{' '}
              <span style={{ background:'var(--accent-soft)', padding:'0 4px', borderRadius:4, color:'var(--accent-ink)' }}>{'{{site.name}}'}</span>? A yes or no is fine."
            </div>

            <div className="meta" style={{ margin:'14px 0 4px' }}>EXPECTED</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {['yes','no','maybe','+ custom'].map(c => <span key={c} className="chip">{c}</span>)}
            </div>

            <div className="meta" style={{ margin:'14px 0 4px' }}>CHANNEL OVERRIDE</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              <span className="chip" style={{ borderColor:'var(--ink)', color:'var(--ink)' }}>SMS</span>
              <span className="chip" style={{ borderColor:'var(--ink)', color:'var(--ink)' }}>Voice</span>
              <span className="chip">Email</span>
              <span className="chip">Link</span>
            </div>

            <div className="meta" style={{ margin:'14px 0 4px' }}>GUARDRAILS</div>
            <div style={{ fontSize:13, color:'var(--ink-2)', lineHeight:1.6 }}>
              <div>· Max 2 retries, then escalate</div>
              <div>· No medical / legal advice</div>
              <div>· Switch to Spanish if detected</div>
            </div>

            <div className="meta" style={{ margin:'14px 0 4px' }}>OUTGOING EDGES</div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {edges.filter(([f]) => f === sel.id).map(([_, to], i) => {
                const n = nodes.find(nn => nn.id === to);
                return (
                  <div key={i} style={{ fontSize:12.5, display:'flex', justifyContent:'space-between', padding:'6px 8px', border:'1px dashed var(--line-2)', borderRadius:6 }}>
                    <span>→ {n?.title || to}</span>
                    <span className="meta">#{to}</span>
                  </div>
                );
              })}
            </div>
          </>}
        </div>
      </div>
    </AppFrame>
  );
}

// ---------- 2c · Preview / test run ----------
function ScreenBuilderPreview() {
  const waveBarsBM = Array.from({length:80}, (_,i) => Math.abs(Math.sin(i * 0.3)) * 16 + 4);

  return (
    <AppFrame active="builder" screenLabel="02c Builder · Preview / test run"
      crumbs={['comms.app','session','preview','live']}
      topRight={<><a href="Builder.html" className="ghost" style={{ padding:'8px 14px', borderRadius:999 }}>{'\u2190'} Edit flow</a><a href="Send.html" className="primary" style={{ padding:'8px 14px', borderRadius:999 }}>Looks good \u2014 Send \u2192</a></>}>
      <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
        {/* Titlebar */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 16px', borderBottom:'1px solid var(--line)', background:'var(--bg-elev)', minHeight:36 }}>
          <div style={{ display:'flex', gap:5 }}>
            <span style={{ width:10, height:10, borderRadius:'50%', background:'#ff5f57' }}/>
            <span style={{ width:10, height:10, borderRadius:'50%', background:'#febc2e' }}/>
            <span style={{ width:10, height:10, borderRadius:'50%', background:'#28c840' }}/>
          </div>
          <span style={{ fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', flex:1 }}>comms.app / session / preview / live</span>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span className="recording-dot"/>
            <span className="meta" style={{ color:'var(--accent-ink)' }}>RECORDING</span>
          </div>
          <span className="meta" style={{ marginLeft:12 }}>04:32</span>
        </div>

        {/* 3-column content */}
        <div style={{ flex:1, display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr', minHeight:0 }}>

          {/* Column 1 — Live Transcript */}
          <div style={{ borderRight:'1px solid var(--line)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span className="meta">LIVE TRANSCRIPT</span>
              <div className="wave" style={{ display:'flex', alignItems:'flex-end', gap:2, height:14 }}>
                {[6,10,14,8,12].map((h,i) => (
                  <span key={i} style={{ width:2, height:h, background:'var(--accent)', borderRadius:1, animation:`pulse-ring 1.2s ${i*0.1}s infinite alternate` }}/>
                ))}
              </div>
            </div>
            <div style={{ flex:1, overflow:'auto', padding:'16px 20px', display:'flex', flexDirection:'column', gap:16 }}>
              {/* AI bubble */}
              <div>
                <div className="meta" style={{ marginBottom:4 }}>AI \u00b7 00:12</div>
                <div style={{ fontSize:13, lineHeight:1.55, color:'var(--ink)' }}>
                  Thanks for joining, Maria. Before we start, I'll need your W-9, your general liability cert, and a signed NDA. Want to begin with the W-9?
                </div>
              </div>
              {/* Participant bubble */}
              <div style={{ alignSelf:'flex-end', maxWidth:'85%' }}>
                <div className="meta" style={{ marginBottom:4, textAlign:'right' }}>PARTICIPANT \u00b7 00:28</div>
                <div style={{ fontSize:13, lineHeight:1.55, padding:'10px 14px', background:'var(--accent-soft)', borderRadius:12 }}>
                  Yeah \u2014 I'll upload the W-9 first. Can I take a picture?
                </div>
              </div>
              {/* AI bubble */}
              <div>
                <div className="meta" style={{ marginBottom:4 }}>AI \u00b7 00:34</div>
                <div style={{ fontSize:13, lineHeight:1.55, color:'var(--ink)' }}>
                  A photo is fine. Please make sure all four corners are visible.
                </div>
              </div>
              {/* System bubble */}
              <div style={{ alignSelf:'center' }}>
                <span className="chip" style={{ background:'var(--accent-soft)', color:'var(--accent-ink)', borderColor:'transparent' }}>
                  \u2713 Document received \u00b7 W-9 \u00b7 validated by OCR
                </span>
              </div>
              {/* AI typing */}
              <div>
                <div className="meta" style={{ marginBottom:4 }}>AI \u00b7 typing...</div>
                <div style={{ display:'flex', gap:4 }}>
                  {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--ink-3)', opacity:0.5 }}/>)}
                </div>
              </div>
            </div>
            {/* Voice scrubber */}
            <div style={{ padding:'10px 20px', borderTop:'1px solid var(--line)', display:'flex', alignItems:'center', gap:12, background:'var(--bg-elev)' }}>
              <div style={{ width:34, height:34, borderRadius:'50%', background:'var(--ink)', display:'grid', placeItems:'center', color:'var(--bg)', fontSize:12, cursor:'pointer' }}>\u25B6</div>
              <div style={{ flex:1, display:'flex', alignItems:'center', gap:1, height:24 }}>
                {waveBarsBM.map((h, i) => (
                  <span key={i} style={{ width:2, height:h, background: i < 54 ? 'var(--accent)' : 'var(--line-2)', borderRadius:1 }}/>
                ))}
              </div>
              <span className="meta">04:32 / 06:40</span>
            </div>
          </div>

          {/* Column 2 — Documents */}
          <div style={{ borderRight:'1px solid var(--line)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span className="meta">DOCUMENTS</span>
              <span className="meta">2 of 3</span>
            </div>
            <div style={{ flex:1, overflow:'auto', padding:'16px 16px', display:'flex', flexDirection:'column', gap:12 }}>
              {/* Doc 1 */}
              <div style={{ border:'1px solid var(--line)', borderRadius:12, padding:'14px 16px', background:'var(--bg-elev)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span style={{ width:18, height:18, borderRadius:'50%', background:'var(--accent)', display:'grid', placeItems:'center', color:'white', fontSize:10, fontWeight:700 }}>\u2713</span>
                  <span style={{ fontSize:14, fontWeight:500 }}>W-9 Form</span>
                </div>
                <div className="meta" style={{ marginBottom:8 }}>RECEIVED \u00b7 OCR VALIDATED \u00b7 00:58</div>
                <div style={{ padding:'8px 10px', background:'var(--chip)', borderRadius:6, fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-2)' }}>
                  IRS_W9_MRODRIGUEZ.pdf \u00b7 212KB
                </div>
              </div>
              {/* Doc 2 */}
              <div style={{ border:'1px solid var(--line)', borderRadius:12, padding:'14px 16px', background:'var(--bg-elev)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span style={{ width:18, height:18, borderRadius:'50%', background:'var(--accent)', display:'grid', placeItems:'center', color:'white', fontSize:10, fontWeight:700 }}>\u2713</span>
                  <span style={{ fontSize:14, fontWeight:500 }}>Insurance cert</span>
                </div>
                <div className="meta" style={{ marginBottom:8 }}>RECEIVED \u00b7 OCR VALIDATED \u00b7 02:14</div>
                <div style={{ padding:'8px 10px', background:'var(--chip)', borderRadius:6, fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-2)' }}>
                  COI_2026_MR.pdf \u00b7 340KB
                </div>
              </div>
              {/* Doc 3 */}
              <div style={{ border:'1px solid var(--line)', borderRadius:12, padding:'14px 16px', background:'var(--bg-elev)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span style={{ width:18, height:18, borderRadius:'50%', border:'2px dashed var(--line-2)', display:'grid', placeItems:'center', fontSize:10, color:'var(--ink-4)' }}>\u25CB</span>
                  <span style={{ fontSize:14, fontWeight:500, color:'var(--ink-3)' }}>Signed NDA</span>
                </div>
                <div className="meta">AWAITING SIGNATURE</div>
              </div>
            </div>
          </div>

          {/* Column 3 — Insights */}
          <div style={{ display:'flex', flexDirection:'column', overflow:'hidden' }}>
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span className="meta">CONVERSATION INSIGHTS</span>
              <span className="chip" style={{ background:'var(--accent-soft)', color:'var(--accent-ink)', borderColor:'transparent', fontSize:9 }}>LIVE</span>
            </div>
            <div style={{ flex:1, overflow:'auto', padding:'16px 16px' }}>
              {/* Metrics */}
              {[
                ['Engagement','85%',85,'+4'],
                ['Clarity','92%',92,''],
                ['Completion','67%',67,'+12'],
                ['Sentiment','78%',78,'+2'],
              ].map(([label,value,pct,trend]) => (
                <div key={label} style={{ marginBottom:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                    <span style={{ fontSize:13 }}>{label}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:14, fontWeight:500 }}>{value}</span>
                      {trend && <span style={{ fontSize:10, fontFamily:'var(--mono)', color:'var(--accent-ink)', background:'var(--accent-soft)', padding:'1px 5px', borderRadius:4 }}>{trend}</span>}
                    </div>
                  </div>
                  <div className="metric-bar accent" style={{ height:4 }}>
                    <i style={{ width:`${pct}%` }}/>
                  </div>
                </div>
              ))}

              <div className="hairline" style={{ margin:'16px 0' }}/>

              {/* Metadata grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
                {[
                  ['TYPE','Onboarding'],
                  ['CHANNEL','Voice + link'],
                  ['LANGUAGE','EN (auto)'],
                  ['DURATION','04:32'],
                ].map(([k,v]) => (
                  <div key={k}>
                    <div className="meta" style={{ marginBottom:2 }}>{k}</div>
                    <div style={{ fontSize:13, fontWeight:500 }}>{v}</div>
                  </div>
                ))}
              </div>

              <div className="hairline" style={{ margin:'16px 0' }}/>

              {/* Auto-tagged */}
              <div className="meta" style={{ marginBottom:8 }}>AUTO-TAGGED</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {['W-9 received','Insurance verified','Out-of-state','1099-eligible'].map(tag => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div style={{ padding:'6px 16px', borderTop:'1px solid var(--line)', background:'var(--bg-elev)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span className="meta">AGENT: convo-v4.2 \u00b7 HIPAA-safe</span>
          <span className="meta">LATENCY 180ms \u00b7 STT 99.2% \u00b7 COST $0.014</span>
        </div>
      </div>
    </AppFrame>
  );
}

// ---------- 2d · Dispatch ----------
function ScreenDispatch() {
  return (
    <AppFrame active="builder" screenLabel="02d Builder · Dispatch (go live)"
      crumbs={['comms.app','flows','onboarding-q2-2026','dispatch']}
      topRight={<Btn variant="primary" onClick={() => window.location.href='Campaigns.html'}>Send to 1,218 people ●</Btn>}>
      <div style={{ height:'100%', overflow:'auto' }}>
        <PageHead eyebrow="02 · DISPATCH" title="Ready to reach" italicTail="1,218 people."
          sub="Review audience, channels, and schedule. This will use ~1,108 conversations on your Pro plan."/>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:0, borderBottom:'1px solid var(--line)' }}>
          <div style={{ padding:'24px 28px', borderRight:'1px solid var(--line)' }}>
            <div className="meta" style={{ marginBottom:10 }}>AUDIENCE</div>
            <div style={{ padding:14, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)', marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:500 }}>trial_signups_q2.csv</div>
                  <div className="meta" style={{ marginTop:4 }}>1,218 CONTACTS · 3 DEDUPED · 0 BLOCKLISTED</div>
                </div>
                <Btn variant="subtle">Change</Btn>
              </div>
            </div>
            <div className="meta" style={{ marginBottom:10 }}>CHANNELS · FALLBACK ORDER</div>
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>
              {[
                ['SMS','1st attempt', true],
                ['Voice','if no reply 30m', true],
                ['Email','if no reply 24h', true],
                ['Link','always', true],
              ].map(([c, s, on], i) => (
                <div key={i} style={{ flex:1, padding:14, border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:14, fontWeight:500 }}>{c}</span>
                    <span className="meta" style={{ color: on?'var(--accent-ink)':'var(--ink-3)' }}>● {on?'ON':'OFF'}</span>
                  </div>
                  <div className="meta" style={{ marginTop:4, textTransform:'none', letterSpacing:0 }}>{s}</div>
                </div>
              ))}
            </div>

            <div className="meta" style={{ marginBottom:10 }}>SCHEDULE</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                ['Send now',        'first batch in < 60s', true],
                ['Schedule',        'Apr 19 · 9:00 AM local'],
              ].map(([t, s, on]) => (
                <label key={t} style={{
                  padding:14, border:'1px solid ' + (on?'var(--ink)':'var(--line)'),
                  borderRadius:10, background:'var(--bg-elev)',
                  boxShadow: on?'0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)':'none',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:14, fontWeight:500 }}>{t}</span>
                    {on && <span className="meta" style={{ color:'var(--accent-ink)' }}>●</span>}
                  </div>
                  <div className="meta" style={{ marginTop:4, textTransform:'none', letterSpacing:0 }}>{s}</div>
                </label>
              ))}
            </div>
          </div>

          <div style={{ padding:'24px 28px' }}>
            <div className="meta" style={{ marginBottom:10 }}>BILLING PREVIEW</div>
            <div style={{ border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-elev)', padding:16 }}>
              {[
                ['Projected conversations','~1,108'],
                ['Plan allowance remaining','217 of 500'],
                ['Overage estimate','608 × $0.18 = $109.44'],
                ['Setup cost','$0'],
              ].map(([k, v], i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom: i<3?'1px dashed var(--line)':'none', fontSize:13.5 }}>
                  <span style={{ color:'var(--ink-2)' }}>{k}</span>
                  <span style={{ fontFamily:'var(--mono)' }}>{v}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, paddingTop:10, borderTop:'1px solid var(--line)' }}>
                <span style={{ fontSize:14, fontWeight:500 }}>Estimated total</span>
                <span style={{ fontSize:18, fontWeight:500, fontFamily:'var(--mono)' }}>$109.44</span>
              </div>
            </div>
            <div className="meta" style={{ marginTop:12, color:'var(--ink-3)' }}>
              No throttling. Actual total bills at the end of your period.
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenWizard, ScreenFlowEditor, ScreenBuilderPreview, ScreenDispatch });
