// ============================================================
// Phase 8 · LIVE CONVERSATION — real-time agent↔participant view
//
// The "cockpit". Modalities exposed as tabs across the top-center
// of the stage. Each tab swaps the central surface; the transcript
// column (left) and the intervention panel (right) stay put.
//
// MODALITIES (6):
//   1. VOICE            — waveform, call controls
//   2. VIDEO            — participant tile + agent tile
//   3. FORM             — conversational form block in-stage
//   4. PRESENT · VIDEO  — show a clip, watch them react
//   5. PRESENT · DOC    — share a document, page-sync
//   6. SCREEN SHARE     — participant shows you their screen
//
// Each keeps the same chrome so it feels like one cockpit.
// ============================================================

const { useState: useStateL } = React;

// ---------- shared chrome ----------
function LiveChrome({ modality, setModality, children, screenLabel }) {
  const modalities = [
    ['voice',  'Voice',    '◔', 'Live Voice.html'],
    ['video',  'Video',    '▢', 'Live Video.html'],
    ['form',   'Form',     '▤', 'Live Form.html'],
    ['present','Present · video', '▷', 'Live Present Video.html'],
    ['doc',    'Present · doc',   '≡', 'Live Present Doc.html'],
    ['screen', 'Screen share',    '⛶', 'Live Screen Share.html'],
  ];
  return (
    <AppFrame active="live" screenLabel={screenLabel}
      crumbs={['comms.app','live','s_2u8x4lq9']}
      topRight={<>
        <Pill tone="accent">● RECORDING · 04:32</Pill>
        <Btn variant="subtle">Invite</Btn>
        <Btn variant="subtle">Transcript</Btn>
        <Btn variant="subtle" onClick={() => window.location.href='Home.html'} style={{ color:'oklch(0.40 0.14 25)' }}>End</Btn>
      </>}>
      <div style={{ height:'100%', display:'grid', gridTemplateRows:'auto 1fr', minHeight:0 }}>
        {/* session head */}
        <div style={{ padding:'16px 24px', borderBottom:'1px solid var(--line)', display:'grid', gridTemplateColumns:'1fr auto', gap:16, alignItems:'center', background:'var(--bg)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:14 }}>MR</div>
            <div>
              <div style={{ fontSize:16, fontWeight:500 }}>Maria Rodriguez · <span className="meta" style={{ fontSize:11 }}>s_2u8x4lq9</span></div>
              <div className="meta">ONBOARDING Q2 · SEATTLE · ENTERPRISE · 3Y</div>
            </div>
          </div>
          <div style={{ display:'inline-flex', background:'var(--chip)', padding:3, borderRadius:10, border:'1px solid var(--line)' }}>
            {modalities.map(([k, t, g, href]) => (
              <button key={k} onClick={()=>{ if(href) window.location.href=href; else setModality?.(k); }} style={{
                padding:'7px 12px', border:0, borderRadius:8,
                background: k===modality?'var(--bg-elev)':'transparent',
                color: k===modality?'var(--ink)':'var(--ink-3)',
                fontSize:12, fontWeight:500, cursor:'pointer',
                display:'inline-flex', alignItems:'center', gap:6,
                boxShadow: k===modality?'0 1px 2px rgba(0,0,0,0.06)':'none',
              }}><span style={{ fontFamily:'var(--mono)', fontSize:10 }}>{g}</span>{t}</button>
            ))}
          </div>
        </div>

        {/* 3-column stage */}
        <div style={{ display:'grid', gridTemplateColumns:'340px 1fr 320px', minHeight:0 }}>
          <LiveTranscript/>
          <div style={{ borderLeft:'1px solid var(--line)', borderRight:'1px solid var(--line)', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
            {children}
          </div>
          <LiveIntervention/>
        </div>
      </div>
    </AppFrame>
  );
}

function LiveTranscript() {
  const lines = [
    ['AI',  '00:12', "Thanks for joining, Maria. I'll need your W-9, COI, and a signed NDA. Want to start with the W-9?"],
    ['PAR', '00:28', "Yeah — I'll upload the W-9 first. Can I take a picture?"],
    ['AI',  '00:34', "A photo is fine. Please make sure all four corners are visible."],
    ['SYS', '00:58', "Document received · W-9 · validated by OCR"],
    ['AI',  '01:02', "Perfect. Now the insurance certificate — same thing, snap a photo or upload."],
    ['PAR', '01:48', "Here you go."],
    ['SYS', '02:14', "Document received · COI · validated"],
    ['AI',  '02:20', "Great. Last one — I'll walk you through the NDA. It's about three minutes."],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:0 }}>
      <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>LIVE TRANSCRIPT</span>
        <span className="meta">EN (AUTO)</span>
      </div>
      <div style={{ overflow:'auto', padding:'14px 18px', display:'flex', flexDirection:'column', gap:12, flex:1 }}>
        {lines.map((l, i) => {
          const [who, t, msg] = l;
          if (who === 'SYS') {
            return (
              <div key={i} style={{ padding:'8px 10px', borderRadius:8, background:'var(--accent-soft)', color:'var(--accent-ink)', border:'1px dashed var(--accent)', fontFamily:'var(--mono)', fontSize:11 }}>
                ● {t} · {msg}
              </div>
            );
          }
          const isAI = who === 'AI';
          return (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'36px 1fr', gap:10 }}>
              <div>
                <div style={{ width:28, height:28, borderRadius:8, background: isAI?'var(--ink)':'var(--chip)', color: isAI?'var(--bg)':'var(--ink)', display:'grid', placeItems:'center', fontSize:10, fontFamily:'var(--mono)' }}>{isAI?'AI':'MR'}</div>
                <div className="meta" style={{ marginTop:4, fontSize:9 }}>{t}</div>
              </div>
              <div style={{ padding:'8px 10px', borderRadius:10, border: isAI?'1px solid var(--line)':'1px dashed var(--line-2)', background: isAI?'var(--bg-elev)':'transparent', fontSize:12.5, color:'var(--ink-2)', lineHeight:1.45 }}>
                "{msg}"
              </div>
            </div>
          );
        })}
        {/* typing */}
        <div style={{ display:'grid', gridTemplateColumns:'36px 1fr', gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontSize:10, fontFamily:'var(--mono)' }}>AI</div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 10px', borderRadius:10, background:'var(--bg-elev)', border:'1px solid var(--line)', width:'fit-content' }}>
            {[0,1,2].map(i=> <span key={i} style={{ width:4, height:4, borderRadius:'50%', background:'var(--ink-3)' }}/>)}
            <span className="meta" style={{ marginLeft:4 }}>listening…</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveIntervention() {
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:0, overflow:'auto' }}>
      <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>AGENT CONSOLE</span>
        <Pill tone="accent">● LIVE</Pill>
      </div>

      <div style={{ padding:'14px 18px', display:'flex', flexDirection:'column', gap:16 }}>
        <div>
          <div className="meta" style={{ marginBottom:8 }}>CONVERSATION INSIGHTS</div>
          {[
            ['Engagement',85,'+4'],['Clarity',92,'—'],['Completion',67,'+12'],['Sentiment',78,'+2'],
          ].map(([l, v, t], i) => (
            <div key={i} style={{ marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3 }}>
                <span className="meta">{l.toUpperCase()}</span>
                <span><span style={{ fontFamily:'var(--mono)', fontWeight:500 }}>{v}%</span> <span className="meta" style={{ color: t==='—'?'var(--ink-3)':'var(--accent-ink)' }}>{t!=='—' && '▲'} {t}</span></span>
              </div>
              <div className={'metric-bar ' + (i===0?'accent':'')}><i style={{ width: v+'%' }}/></div>
            </div>
          ))}
        </div>

        <div>
          <div className="meta" style={{ marginBottom:6 }}>AUTO-TAGS</div>
          <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
            {['W-9 received','COI received','Out-of-state','1099-eligible','Seattle zone 3','Spanish-opt'].map(t => <span key={t} className="chip" style={{ fontSize:10 }}>{t}</span>)}
          </div>
        </div>

        <div>
          <div className="meta" style={{ marginBottom:8 }}>INTERVENE</div>
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <Btn variant="subtle" style={{ textAlign:'left', justifyContent:'flex-start' }}>✎ Whisper a hint to AI</Btn>
            <Btn variant="subtle" style={{ textAlign:'left' }}>↗ Take over (speak as agent)</Btn>
            <Btn variant="subtle" style={{ textAlign:'left' }}>⤴ Transfer to specialist</Btn>
            <Btn variant="subtle" style={{ textAlign:'left' }}>○ Pause conversation</Btn>
          </div>
        </div>

        <div>
          <div className="meta" style={{ marginBottom:6 }}>SUGGESTED NEXT STEP</div>
          <div style={{ padding:10, border:'1px dashed var(--accent)', borderRadius:8, background:'var(--accent-soft)', color:'var(--accent-ink)', fontSize:12, lineHeight:1.5 }}>
            NDA is the last item. 2 retries if Maria gets stuck. Manager Jordan is online — escalate with one click.
          </div>
        </div>

        <div>
          <div className="meta" style={{ marginBottom:6 }}>AGENT CONFIG</div>
          <div style={{ fontSize:11, fontFamily:'var(--mono)', color:'var(--ink-3)', lineHeight:1.6 }}>
            nova-v4.2 · temp 0.3<br/>
            HIPAA-safe · redact PII<br/>
            LATENCY 180ms · STT 99.2%<br/>
            COST $0.014
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODALITY SURFACES — each is a central-column render
// ============================================================

function StageVoice() {
  return (
    <div style={{ padding:28, height:'100%', display:'grid', gridTemplateRows:'auto 1fr auto', gap:18 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>● VOICE · NOVA-V4.2</span>
        <span className="meta">+1 (206) ···· 2131</span>
      </div>

      {/* Caller tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, alignSelf:'center' }}>
        {[
          ['AI · Nova',  'var(--ink)', 'var(--bg)', 'speaking'],
          ['Maria R.',   'var(--chip)','var(--ink)','listening'],
        ].map(([name, bg, fg, state], i) => (
          <div key={i} style={{
            background: bg, color: fg,
            borderRadius:18, padding:'28px 24px',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            gap:14, minHeight:260, border:'1px solid var(--line)',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ width:72, height:72, borderRadius:'50%',
              background: i===0 ? 'color-mix(in srgb, var(--accent) 70%, transparent)' : 'var(--ink)',
              color: i===0 ? 'var(--ink)' : 'var(--bg)',
              display:'grid', placeItems:'center',
              fontFamily:'var(--mono)', fontSize:20, fontWeight:500,
              boxShadow: state==='speaking' ? '0 0 0 8px color-mix(in srgb, var(--accent) 25%, transparent), 0 0 0 16px color-mix(in srgb, var(--accent) 10%, transparent)' : 'none',
              transition:'box-shadow 200ms ease',
            }}>{i===0?'AI':'MR'}</div>
            <div style={{ fontSize:15, fontWeight:500 }}>{name}</div>
            <div className="meta" style={{ color: i===0?'rgba(255,255,255,0.6)':'var(--ink-3)' }}>● {state.toUpperCase()}</div>
            {/* mini wave */}
            <div style={{ display:'inline-flex', gap:2, alignItems:'end', height:18 }}>
              {Array.from({length:18}).map((_,k) => (
                <span key={k} style={{
                  width:2, height: state==='speaking' ? 4 + Math.abs(Math.sin((k+i)*0.9))*14 : 3,
                  background: i===0?'var(--bg)':'var(--ink-2)', borderRadius:1, opacity: state==='speaking'?1:0.4,
                }}/>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* big waveform + controls */}
      <div style={{ border:'1px solid var(--line)', borderRadius:14, padding:16, background:'var(--bg-elev)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <button style={{ width:44, height:44, borderRadius:'50%', border:0, background:'var(--ink)', color:'var(--bg)', fontSize:14 }}>▮▮</button>
          <div style={{ flex:1, display:'flex', alignItems:'end', gap:2, height:40 }}>
            {Array.from({length:140}).map((_, i) => {
              const h = 6 + Math.abs(Math.sin(i*0.3)) * 28;
              const active = i < 90;
              return <div key={i} style={{ width:2, height:h, background: active?'var(--ink-2)':'var(--line-2)', borderRadius:1 }}/>;
            })}
          </div>
          <span className="meta">04:32 / 06:40</span>
        </div>
        <div style={{ marginTop:12, display:'flex', gap:8, flexWrap:'wrap' }}>
          {['Mute','Hold','Keypad','Add participant','Route to human','Hang up'].map((t, i) => (
            <button key={t} className="ghost" style={{ padding:'8px 14px', fontSize:12, ...(i===5?{ color:'oklch(0.40 0.14 25)', borderColor:'oklch(0.40 0.14 25)' }:{}) }}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StageVideo() {
  return (
    <div style={{ padding:24, height:'100%', display:'grid', gridTemplateRows:'auto 1fr auto', gap:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>● VIDEO · 1080p · ENCRYPTED</span>
        <span className="meta">BITRATE 2.4MBPS · 30FPS</span>
      </div>

      {/* participant tile — full */}
      <div style={{
        position:'relative', borderRadius:16, overflow:'hidden',
        background:'linear-gradient(135deg, #1a1c20, #0a0a0a)',
        border:'1px solid var(--line)',
      }}>
        {/* pseudo video — striped placeholder */}
        <div style={{ position:'absolute', inset:0,
          background:'repeating-linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 12px, transparent 12px, transparent 24px)' }}/>
        <div style={{ position:'absolute', left:16, bottom:16, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.15)', color:'#fff', fontFamily:'var(--mono)', fontSize:11, display:'grid', placeItems:'center' }}>MR</div>
          <div style={{ color:'#fff', fontSize:13 }}>Maria Rodriguez <span className="meta" style={{ color:'rgba(255,255,255,0.5)', marginLeft:6 }}>● SPEAKING</span></div>
        </div>
        <div style={{ position:'absolute', right:16, top:16, display:'flex', gap:6 }}>
          <Pill tone="accent">● REC</Pill>
          <span className="chip" style={{ background:'rgba(255,255,255,0.1)', color:'#fff', borderColor:'rgba(255,255,255,0.15)' }}>04:32</span>
        </div>
        {/* face-shape placeholder */}
        <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center' }}>
          <div style={{ width:180, height:180, borderRadius:'50%', border:'1px dashed rgba(255,255,255,0.15)', display:'grid', placeItems:'center', color:'rgba(255,255,255,0.35)', fontFamily:'var(--mono)', fontSize:10 }}>
            PARTICIPANT · CAMERA FEED
          </div>
        </div>
        {/* self-view tile */}
        <div style={{ position:'absolute', right:16, bottom:16, width:170, height:110, borderRadius:10, background:'#222', border:'1px solid rgba(255,255,255,0.15)', display:'grid', placeItems:'center', color:'rgba(255,255,255,0.4)', fontFamily:'var(--mono)', fontSize:10 }}>
            AI AVATAR · NOVA
        </div>
      </div>

      {/* controls */}
      <div style={{ display:'flex', justifyContent:'center', gap:8, padding:10, border:'1px solid var(--line)', borderRadius:14, background:'var(--bg-elev)' }}>
        {['Mute','Camera','Background','Chat','Share screen','Record','Captions','Leave'].map((t, i) => (
          <button key={t} className="ghost" style={{ padding:'8px 12px', fontSize:12, ...(i===7?{ color:'oklch(0.40 0.14 25)', borderColor:'oklch(0.40 0.14 25)' }:{}) }}>{t}</button>
        ))}
      </div>
    </div>
  );
}

function StageForm() {
  return (
    <div style={{ padding:'28px', height:'100%', overflow:'auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>● IN-CONVERSATION FORM · ONBOARDING STEP 3/5</span>
        <span className="meta">SENT VIA SMS · AUTO-SAVES</span>
      </div>
      <div style={{ maxWidth:620, margin:'0 auto', background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:16, padding:'28px 32px' }}>
        <div className="meta" style={{ marginBottom:8 }}>STEP 3 / 5 · DIRECT DEPOSIT</div>
        <h3 style={{ ...window.APP_SCALE.titleMd, margin:'0 0 10px' }}>
          Where should we <span className="italic-serif" style={{ color:'var(--ink-3)' }}>send your paycheck?</span>
        </h3>
        <p style={{ fontSize:13.5, color:'var(--ink-2)', margin:'0 0 22px', lineHeight:1.5 }}>
          Your routing and account numbers are stored encrypted. You can update this any time in your profile.
        </p>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <AuthField label="Account holder name" value="Maria D. Rodriguez"/>
          <AuthField label="Bank name" value="Chase"/>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <AuthField label="Routing number" value="•••• •• 421"/>
            <AuthField label="Account number" value="•••• •••• 8814"/>
          </div>
          <div>
            <label className="meta" style={{ marginBottom:6, display:'block' }}>ACCOUNT TYPE</label>
            <div style={{ display:'flex', gap:6 }}>
              {['Checking','Savings'].map((t, i) => (
                <button key={t} style={{
                  flex:1, padding:'10px 14px', borderRadius:10,
                  background: i===0?'var(--ink)':'var(--bg-elev)',
                  color: i===0?'var(--bg)':'var(--ink-2)',
                  border:'1px solid ' + (i===0?'var(--ink)':'var(--line)'),
                  fontSize:13, cursor:'pointer',
                }}>{t}</button>
              ))}
            </div>
          </div>
          <label style={{ display:'flex', gap:8, fontSize:12, color:'var(--ink-2)', lineHeight:1.5 }}>
            <input type="checkbox" defaultChecked style={{ accentColor:'var(--ink)', marginTop:2 }}/>
            I authorize Harbor to deposit wages to this account via ACH.
          </label>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:24, paddingTop:16, borderTop:'1px solid var(--line)' }}>
          <span className="meta">● ENCRYPTED · AUTO-SAVED 2S AGO</span>
          <div style={{ display:'flex', gap:8 }}>
            <Btn variant="subtle">← Back</Btn>
            <Btn variant="primary">Save & continue →</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

function StagePresentVideo() {
  return (
    <div style={{ padding:24, height:'100%', display:'grid', gridTemplateRows:'auto 1fr auto', gap:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>● PRESENTING · VIDEO CLIP</span>
        <span className="meta">CONCEPT-A-V2.MP4 · 01:42</span>
      </div>

      {/* video surface */}
      <div style={{ position:'relative', background:'#111', borderRadius:14, overflow:'hidden', border:'1px solid var(--line)' }}>
        {/* stripe placeholder */}
        <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 10px, transparent 10px, transparent 20px)' }}/>
        <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', color:'rgba(255,255,255,0.4)', fontFamily:'var(--mono)', fontSize:11, letterSpacing:'0.08em' }}>
          CLIP · 1080P · SHARED WITH MARIA
        </div>
        {/* participant reaction tile */}
        <div style={{ position:'absolute', right:16, top:16, width:170, height:110, borderRadius:10, background:'#222', border:'1px solid rgba(255,255,255,0.15)', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 8px, transparent 8px, transparent 16px)' }}/>
          <div style={{ position:'absolute', left:8, bottom:6, color:'#fff', fontSize:11, display:'flex', alignItems:'center', gap:6 }}>
            <span className="recording-dot"/> MARIA · REACTION
          </div>
        </div>
        {/* emotion markers on timeline */}
        <div style={{ position:'absolute', left:16, bottom:16, right:200, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ color:'#fff', fontFamily:'var(--mono)', fontSize:11 }}>00:48</span>
          <div style={{ flex:1, height:6, background:'rgba(255,255,255,0.15)', borderRadius:3, position:'relative' }}>
            <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'47%', background:'var(--accent)', borderRadius:3 }}/>
            {[18,34,52,78].map((p, i) => (
              <span key={i} style={{ position:'absolute', left:p+'%', top:-8, width:2, height:22, background: i===2?'var(--accent)':'rgba(255,255,255,0.5)' }}/>
            ))}
          </div>
          <span className="meta" style={{ color:'rgba(255,255,255,0.5)' }}>01:42</span>
        </div>
      </div>

      {/* reaction markers log */}
      <div style={{ border:'1px solid var(--line)', borderRadius:12, padding:14, background:'var(--bg-elev)' }}>
        <div className="meta" style={{ marginBottom:8 }}>REACTIONS · AUTO-DETECTED</div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', fontSize:12 }}>
          {[
            ['00:18','smile · mild',''],
            ['00:34','frown','confusion?'],
            ['00:52','head nod','agreement'],
            ['01:18','verbal: "interesting"',''],
          ].map((m, i) => (
            <div key={i} style={{ display:'flex', gap:8, alignItems:'center', padding:'6px 10px', border:'1px solid var(--line)', borderRadius:8 }}>
              <span className="meta">{m[0]}</span>
              <span style={{ color:'var(--ink-2)' }}>{m[1]}</span>
              {m[2] && <span className="meta" style={{ color:'var(--accent-ink)' }}>· {m[2]}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StagePresentDoc() {
  return (
    <div style={{ padding:24, height:'100%', display:'grid', gridTemplateRows:'auto 1fr auto', gap:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>● PRESENTING · DOCUMENT · PAGE 4 / 12</span>
        <span className="meta">MEDICATION-ADMIN-SOP-V4.PDF · SYNCED</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'140px 1fr', gap:14, minHeight:0 }}>
        {/* thumbs */}
        <div style={{ border:'1px solid var(--line)', borderRadius:12, background:'var(--bg-elev)', padding:10, overflow:'auto' }}>
          {Array.from({length:12}).map((_, i) => (
            <div key={i} style={{
              marginBottom:8, padding:6, borderRadius:6,
              background: i===3?'var(--accent-soft)':'transparent',
              border:'1px solid ' + (i===3?'var(--accent-ink)':'var(--line)'),
            }}>
              <div style={{ aspectRatio:'8/11', background:'var(--chip)', borderRadius:4,
                backgroundImage:'repeating-linear-gradient(0deg, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 2px, transparent 2px, transparent 6px)' }}/>
              <div className="meta" style={{ textAlign:'center', marginTop:4 }}>P {i+1}</div>
            </div>
          ))}
        </div>

        {/* page */}
        <div style={{ border:'1px solid var(--line)', borderRadius:12, background:'#fff', padding:'36px 48px', overflow:'auto', position:'relative', color:'#111', fontFamily:'var(--serif)', fontSize:14, lineHeight:1.7 }}>
          <div className="meta" style={{ color:'var(--ink-3)', marginBottom:18, fontFamily:'var(--mono)' }}>SECTION 4 · PATIENT REFUSAL PROTOCOL</div>
          <h2 style={{ fontFamily:'var(--sans)', fontSize:24, fontWeight:500, letterSpacing:'-0.01em', margin:'0 0 14px' }}>When a patient declines a medication</h2>
          <p style={{ margin:'0 0 14px' }}>
            A patient may refuse a prescribed medication at any time. Your role is to document the refusal
            accurately, communicate potential consequences in plain language, and escalate per the policy.
          </p>
          <p style={{ margin:'0 0 14px' }}>
            <strong style={{ fontFamily:'var(--sans)', fontWeight:500 }}>1.</strong> Confirm the refusal verbally and in writing. Use the standard refusal form; do not interpret.
          </p>
          <p style={{ margin:'0 0 14px' }}>
            <strong style={{ fontFamily:'var(--sans)', fontWeight:500 }}>2.</strong> Check vitals and document the patient's stated reason. If the patient reports symptoms (dizziness, nausea), check vitals before any subsequent dose.
          </p>
          {/* live highlight box */}
          <div style={{ margin:'18px 0', padding:'12px 14px', border:'1px dashed oklch(0.62 0.17 148)', borderRadius:8, background:'oklch(0.94 0.06 148 / 0.5)', fontFamily:'var(--sans)', fontSize:13, color:'oklch(0.32 0.12 148)' }}>
            ● AI REFERENCED THIS SECTION AT 03:14
          </div>
          <p style={{ margin:0 }}>
            <strong style={{ fontFamily:'var(--sans)', fontWeight:500 }}>3.</strong> Escalate to the on-shift RN if the refusal involves anti-hypertensive, anti-coagulant, or psychiatric medications.
          </p>
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:10, border:'1px solid var(--line)', borderRadius:12, background:'var(--bg-elev)' }}>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="subtle">← Prev page</Btn>
          <Btn variant="subtle">Next page →</Btn>
        </div>
        <span className="meta">FOLLOWING TOGETHER · MARIA SEEING P 4</span>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="subtle">Highlight</Btn>
          <Btn variant="subtle">Annotate</Btn>
          <Btn variant="primary">Ask a question →</Btn>
        </div>
      </div>
    </div>
  );
}

function StageScreenShare() {
  return (
    <div style={{ padding:24, height:'100%', display:'grid', gridTemplateRows:'auto 1fr auto', gap:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span className="meta" style={{ color:'var(--ink-2)' }}>● SCREEN SHARE · MARIA'S SCREEN · READ-ONLY</span>
        <span className="meta">1440 × 900 · 30FPS · LATENCY 240MS</span>
      </div>

      {/* fake browser/app frame as the shared screen */}
      <div style={{ border:'1px solid var(--line)', borderRadius:12, background:'var(--bg-elev)', overflow:'hidden' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', borderBottom:'1px solid var(--line)', background:'var(--bg)' }}>
          <span style={{ display:'inline-flex', gap:5 }}>
            {[0,1,2].map(i => <span key={i} style={{ width:9, height:9, borderRadius:'50%', background:'var(--line-2)' }}/>)}
          </span>
          <div style={{ fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', padding:'3px 8px', background:'var(--chip)', borderRadius:5, minWidth:280 }}>
            ⌕  harbor.atsapp.com/candidate/41b2f0/onboarding
          </div>
          <span className="meta" style={{ marginLeft:'auto' }}>CHROME · 114</span>
        </div>
        <div style={{ padding:'18px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, color:'var(--ink-2)' }}>
          <div>
            <div className="meta" style={{ marginBottom:6 }}>FORM 2848 · POWER OF ATTORNEY</div>
            <div style={{ padding:'10px 12px', border:'1px solid var(--line)', borderRadius:8, fontSize:13 }}>Taxpayer name · <span style={{ fontFamily:'var(--mono)' }}>Maria D. Rodriguez</span></div>
            <div style={{ padding:'10px 12px', border:'1px solid var(--line)', borderRadius:8, fontSize:13, marginTop:6 }}>Tax form number · <span style={{ fontFamily:'var(--mono)' }}>W-9</span></div>
            <div style={{ padding:'10px 12px', border:'2px solid var(--accent)', borderRadius:8, fontSize:13, marginTop:6, background:'color-mix(in srgb, var(--accent-soft) 60%, transparent)' }}>
              Year / period · <span style={{ fontFamily:'var(--mono)' }}>___________</span>
              <div className="meta" style={{ color:'var(--accent-ink)', marginTop:4 }}>● AI SEES MARIA STUCK HERE · 38S</div>
            </div>
          </div>
          <div style={{ padding:'14px 16px', border:'1px dashed var(--line-2)', borderRadius:8, fontSize:13, fontFamily:'var(--serif)', fontStyle:'italic' }}>
            "I'm not sure what to put for year or period — I started in March."
            <div className="meta" style={{ marginTop:6, fontStyle:'normal', fontFamily:'var(--mono)' }}>— MARIA · SAID 12S AGO</div>
          </div>
        </div>
        {/* cursor indicator */}
        <div style={{ position:'absolute' }}/>
      </div>

      {/* controls */}
      <div style={{ display:'flex', justifyContent:'space-between', padding:10, border:'1px solid var(--line)', borderRadius:12, background:'var(--bg-elev)', gap:8 }}>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="subtle">Point</Btn>
          <Btn variant="subtle">Draw</Btn>
          <Btn variant="subtle">Request control</Btn>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="subtle">Ask AI to help Maria</Btn>
          <Btn variant="primary">Send hint: "Put 2026"</Btn>
        </div>
      </div>
    </div>
  );
}

// ---------- wrapper screen per modality ----------
function ScreenLive({ modality='voice' }) {
  const map = {
    voice:   <StageVoice/>,
    video:   <StageVideo/>,
    form:    <StageForm/>,
    present: <StagePresentVideo/>,
    doc:     <StagePresentDoc/>,
    screen:  <StageScreenShare/>,
  };
  const labelMap = {
    voice:   '08a Live · Voice',
    video:   '08b Live · Video',
    form:    '08c Live · Conversational form',
    present: '08d Live · Present video',
    doc:     '08e Live · Present document',
    screen:  '08f Live · Screen share',
  };
  const [m, setM] = useStateL(modality);
  return <LiveChrome screenLabel={labelMap[m]} modality={m} setModality={setM}>{map[m]}</LiveChrome>;
}

// Per-modality wrappers (used by standalone pages)
const ScreenLiveVoice         = () => <ScreenLive modality="voice"/>;
const ScreenLiveVideo         = () => <ScreenLive modality="video"/>;
const ScreenLiveForm          = () => <ScreenLive modality="form"/>;
const ScreenLivePresentVideo  = () => <ScreenLive modality="present"/>;
const ScreenLivePresentDoc    = () => <ScreenLive modality="doc"/>;
const ScreenLiveScreen        = () => <ScreenLive modality="screen"/>;

Object.assign(window, {
  ScreenLive,
  ScreenLiveVoice, ScreenLiveVideo, ScreenLiveForm,
  ScreenLivePresentVideo, ScreenLivePresentDoc, ScreenLiveScreen,
});
