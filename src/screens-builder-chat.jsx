// ============================================================
// Builder · reimagined — natural-language, chat-first.
//
// Warm editorial feel (same DNA as the marketing site).
// Two panes:
//   LEFT  — AI conversation (chat bubbles, quick-start chips,
//           AI-drafted agenda appears as a message, user refines
//           by clicking follow-up suggestions or typing.)
//   RIGHT — Live preview: agenda (editable) + SMS phone (streams
//           as the AI drafts).
//
// Power path preserved: "Advanced mode →" in the top-right
// swaps to the old node editor.
//
// Editing any step opens EditStepModal — no sidebar inspector.
// ============================================================

const { useState: useStateNB, useEffect: useEffectNB, useRef: useRefNB } = React;

// ─────────────────────────────────────────────────────────
// Quick-start templates surfaced as chips inside the chat.
// ─────────────────────────────────────────────────────────
const QUICK_STARTS = [
  { k:'nps',      label:'NPS · customer pulse',     sentence:'I want to ask our 1,200 customers how likely they are to recommend us, and probe on the why.' },
  { k:'research', label:'User research interview',   sentence:'I want to interview 30 ops leads about how they handle vendor onboarding today.' },
  { k:'onboard',  label:'New-hire onboarding',       sentence:'I want to onboard 14 new hires next week — collect W-9, NDA, and direct deposit.' },
  { k:'lead',     label:'Lead qualifier',            sentence:'I want to qualify leads from our contact-us form in 2 minutes, then hand hot ones to an AE.' },
  { k:'exit',     label:'Exit interview',            sentence:'I want to run exit interviews with departing employees — 10 minutes, empathetic tone.' },
];

// The "draft" the AI produces from the user's sentence. Used by the
// preview and the editable agenda. Kept as state so edits are live.
const DRAFT = {
  title: 'Vendor onboarding research · Series B–D ops leads',
  audience: '30 ops leads at Series B–D companies',
  channel: 'Voice-first, SMS fallback, shareable link',
  duration: '~12 min',
  greeting: "Hey {{first_name}} — Ayo at Acme asked me to walk you through 15 minutes on how you handle vendor onboarding. No sales, no deck. Up for it?",
  steps: [
    { k:'intro',   title:'Intro & consent',               modality:'voice', eta:'1 min', prompt: "Quick hello, explain what we're after, get verbal OK to record." },
    { k:'q1',      title:'How do you onboard vendors today?', modality:'voice', eta:'3 min', prompt: "Open-ended — let them talk. If they're vague, probe on the first 48 hours." },
    { k:'q2',      title:'Show us your current tracker',   modality:'video', eta:'3 min', prompt: "Optional screen share. If they decline, verbal walkthrough is fine." },
    { k:'form',    title:'Rank 4 potential improvements',  modality:'form',  eta:'2 min', prompt: "Drag-to-rank. Probe voice on the one they put first." },
    { k:'wrap',    title:'Wrap — anything we missed?',     modality:'voice', eta:'2 min', prompt: "Catch-all. Ask about pricing sensitivity if they haven't mentioned it." },
    { k:'outro',   title:'Thanks & $75 card',              modality:'ack',   eta:'30 s',  prompt: "Confirm email, let them pick the gift card, goodbye." },
  ],
};

const modGlyphNB = (m) => ({ voice:'◔', video:'▢', form:'▤', clip:'▷', doc:'≡', ack:'✓' }[m] || '·');

// ─────────────────────────────────────────────────────────
// Screen — Empty state + lands here when there's no draft yet
// ─────────────────────────────────────────────────────────
function ScreenBuilderChatEmpty() {
  const [input, setInput] = useStateNB('');
  return (
    <AppFrame active="builder" screenLabel="02 Builder · Chat-first · empty"
      crumbs={['comms.app','flows','new']}
      topRight={<>
        <a href="Flow Editor.html" className="ghost" style={{ padding:'8px 14px' }}>Advanced mode →</a>
      </>}>
      <div style={{ height:'100%', display:'grid', placeItems:'center', padding:40, background:'var(--bg)', overflow:'auto' }}>
        <div style={{ maxWidth:780, width:'100%' }}>
          <div className="num-badge" style={{ marginBottom:18 }}>02 · NEW CONVERSATION</div>
          <h1 style={{ fontSize:48, fontWeight:500, letterSpacing:'-0.03em', lineHeight:1.05, margin:0, maxWidth:'16ch' }}>
            What are you trying <span className="italic-serif" style={{ color:'var(--ink-3)' }}>to hear back?</span>
          </h1>
          <p style={{ color:'var(--ink-2)', fontSize:16, marginTop:14, maxWidth:'54ch', lineHeight:1.55 }}>
            Describe it in plain English — one sentence is plenty. I'll draft the whole conversation
            for you. You can rewrite any part with a click.
          </p>

          {/* Big input */}
          <div style={{ marginTop:32, border:'1px solid var(--line-2)', borderRadius:16, background:'var(--bg-elev)', padding:'4px', boxShadow:'0 8px 40px -20px rgba(0,0,0,0.08)' }}>
            <textarea
              value={input} onChange={e=>setInput(e.target.value)}
              placeholder="e.g. I want to interview 30 Series B ops leads about how they handle vendor onboarding today. 15 minutes, voice-first."
              style={{
                width:'100%', minHeight:110, resize:'none', border:0, outline:'none',
                padding:'18px 20px 8px', fontFamily:'var(--sans)', fontSize:17, color:'var(--ink)',
                background:'transparent', lineHeight:1.5, letterSpacing:'-0.005em',
              }}/>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 16px 12px' }}>
              <span className="meta" style={{ color:'var(--ink-3)' }}>
                AI DRAFTS THE CONVERSATION · YOU EDIT THE PARTS THAT MATTER · <KBD>⌘↵</KBD>
              </span>
              <a href="Builder Chat.html" className="primary" style={{ padding:'10px 18px' }}>Draft for me →</a>
            </div>
          </div>

          {/* Quick-starts */}
          <div style={{ marginTop:32 }}>
            <div className="meta" style={{ marginBottom:12 }}>OR START FROM A QUICK-START</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {QUICK_STARTS.map(q => (
                <button key={q.k} onClick={()=>setInput(q.sentence)} style={{
                  padding:'10px 16px', border:'1px solid var(--line)', borderRadius:999,
                  background:'var(--bg-elev)', fontSize:13, color:'var(--ink)', cursor:'pointer',
                  display:'inline-flex', alignItems:'center', gap:8,
                }}>
                  <span className="meta" style={{ color:'var(--ink-3)' }}>↗</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reassurance / preview of what happens next */}
          <div style={{
            marginTop:40, padding:'18px 20px', border:'1px dashed var(--line-2)', borderRadius:12,
            background:'color-mix(in srgb, var(--bg-elev) 50%, transparent)',
            display:'grid', gridTemplateColumns:'24px 1fr auto', gap:14, alignItems:'center',
          }}>
            <span style={{ color:'var(--accent-ink)', fontFamily:'var(--mono)', fontSize:12 }}>◐</span>
            <div>
              <div style={{ fontSize:14, color:'var(--ink)', fontWeight:500 }}>You're never done in one step.</div>
              <div className="meta" style={{ marginTop:2, textTransform:'none', letterSpacing:0, color:'var(--ink-2)' }}>
                I'll draft it, you tweak it, we preview it together, and only you press send.
              </div>
            </div>
            <a href="Flow Editor.html" style={{ color:'var(--ink-3)', fontSize:12, textDecoration:'none' }}>or build it by hand <span style={{ marginLeft:4 }}>→</span></a>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

// ─────────────────────────────────────────────────────────
// Screen — "The AI just drafted it" — canonical view of the
// drafted flow. This is what you land on AFTER clicking
// "Draft for me →". Everything is visible and editable.
//
// Layout:
//   Top hero bar         — AI draft summary ("Here's what I drafted")
//   Left column          — AUDIENCE card + QUESTIONS list (editable)
//   Right column         — live SMS preview · email preview tab
//   Bottom drawer        — "Refine with AI" chat (collapsible)
// ─────────────────────────────────────────────────────────
function ScreenBuilderChat() {
  return (
    <AppFrame active="builder" screenLabel="02 Builder · Drafted flow · review & edit"
      crumbs={['comms.app','flows','vendor-ops-research-q2']}
      topRight={<>
        <span className="meta" style={{ marginRight:10 }}>AUTO-SAVED · 2S AGO</span>
        <a href="Flow Editor.html" className="ghost" style={{ padding:'8px 14px' }}>Advanced mode →</a>
        <a href="Preview.html" className="primary" style={{ padding:'8px 16px' }}>Preview & send →</a>
      </>}>
      <div style={{ height:'100%', display:'grid', gridTemplateRows:'auto 1fr auto', minHeight:0 }}>

        {/* ── AI DRAFT SUMMARY (hero) ───────────────────── */}
        <div style={{ padding:'20px 28px', borderBottom:'1px solid var(--line)', background:'var(--bg-elev)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'32px 1fr auto', gap:14, alignItems:'start' }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:10, fontWeight:500 }}>AI</div>
            <div>
              <div className="meta" style={{ marginBottom:4 }}>HERE'S WHAT I DRAFTED</div>
              <div style={{ fontSize:16, color:'var(--ink)', lineHeight:1.5, maxWidth:'72ch' }}>
                A <strong style={{ fontWeight:500 }}>{DRAFT.duration} voice-first conversation</strong> with <strong style={{ fontWeight:500 }}>{DRAFT.audience}</strong>. Six steps — intro, two open questions, an optional screen share, a rank form, and a wrap-up with budget authority. <span className="italic-serif" style={{ color:'var(--ink-3)' }}>Take a look and rewrite anything that feels off.</span>
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <Pill tone="accent">● DRAFTED · READY TO REVIEW</Pill>
              <div className="meta" style={{ marginTop:6 }}>V 1.0 · 6 STEPS · ~{DRAFT.duration.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* ── MAIN BODY · audience + questions ────────────── */}
        <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', minHeight:0 }}>

          {/* LEFT · audience + questions */}
          <div style={{ overflow:'auto', padding:'24px 28px', borderRight:'1px solid var(--line)' }}>

            {/* Audience card */}
            <div style={{ marginBottom:24, border:'1px solid var(--line)', borderRadius:14, background:'var(--bg-elev)', overflow:'hidden' }}>
              <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span className="meta" style={{ color:'var(--ink-2)' }}>AUDIENCE · WHO WILL RECEIVE THIS</span>
                <Btn variant="subtle">Change</Btn>
              </div>
              <div style={{ padding:'16px 18px', display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', gap:20 }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:500, letterSpacing:'-0.005em' }}>{DRAFT.audience}</div>
                  <div className="meta" style={{ marginTop:4, textTransform:'none', letterSpacing:0, color:'var(--ink-2)' }}>Imported from Salesforce · list: <code style={{ fontFamily:'var(--mono)' }}>ops_leads_series_b_d</code></div>
                </div>
                <div>
                  <div className="meta" style={{ marginBottom:4 }}>SIZE</div>
                  <div style={{ fontFamily:'var(--mono)', fontSize:18, fontWeight:500 }}>30 <span style={{ fontSize:13, color:'var(--ink-3)', fontWeight:400 }}>contacts</span></div>
                </div>
                <div>
                  <div className="meta" style={{ marginBottom:4 }}>CHANNEL</div>
                  <div style={{ fontSize:13.5 }}>Voice → SMS → Email</div>
                </div>
              </div>
              <div style={{ padding:'10px 18px', borderTop:'1px dashed var(--line)', display:'flex', gap:6, flexWrap:'wrap' }}>
                <span className="chip">ops-lead</span>
                <span className="chip">series-B</span>
                <span className="chip">series-C</span>
                <span className="chip">series-D</span>
                <span className="chip">english</span>
                <span className="chip" style={{ borderStyle:'dashed', color:'var(--ink-3)' }}>+ add filter</span>
              </div>
            </div>

            {/* Questions / steps */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
              <span className="meta" style={{ color:'var(--ink-2)' }}>THE CONVERSATION · {DRAFT.steps.length} STEPS · CLICK ANY TO EDIT</span>
              <Btn variant="subtle">Reorder</Btn>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {DRAFT.steps.map((s, i) => <QuestionCard key={s.k} s={s} idx={i}/>)}
              <button style={{
                padding:'12px 14px', border:'1px dashed var(--line-2)', borderRadius:12,
                background:'transparent', color:'var(--ink-3)', fontSize:13,
                textAlign:'left', display:'flex', alignItems:'center', gap:8, cursor:'pointer',
              }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:14 }}>+</span>
                Add a step
                <span className="meta" style={{ marginLeft:'auto' }}>OR DESCRIBE BELOW</span>
              </button>
            </div>

            {/* AI read-on-the-draft */}
            <div style={{ marginTop:22, padding:'14px 16px', border:'1px solid var(--line)', borderRadius:12, background:'var(--accent-soft)' }}>
              <div className="meta" style={{ marginBottom:8, color:'var(--accent-ink)' }}>● A QUICK READ ON YOUR DRAFT</div>
              {[
                ['✓','Length is right',       '8 min is the sweet spot for ops leads.'],
                ['⚠','Question 2 might be leading','Try "walk me through the first 48 hours" instead.'],
                ['✓','Incentive is in',       '$75 gift card — completion rate ~20% higher.'],
              ].map(([g, h, b], i) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'22px 1fr', gap:10, padding:'6px 0', borderBottom: i<2?'1px dashed color-mix(in srgb, var(--accent-ink) 25%, transparent)':'none' }}>
                  <span style={{ color: g==='✓'?'var(--accent-ink)':'oklch(0.42 0.14 60)', fontFamily:'var(--mono)', fontSize:12 }}>{g}</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--accent-ink)' }}>{h}</div>
                    <div style={{ fontSize:12.5, color:'var(--accent-ink)', opacity:0.85, marginTop:2 }}>{b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT · live preview */}
          <div style={{ background:'var(--bg)', display:'grid', gridTemplateRows:'auto 1fr', minHeight:0 }}>
            <PreviewTabs current="agenda"/>
            <div style={{ overflow:'auto', padding:'16px 12px', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
              <span className="meta">PREVIEW · WHAT THE PARTICIPANT WILL SEE</span>
              <PhonePreview/>
              <div className="meta" style={{ marginTop:4 }}>YOU CAN ALSO · <a href="Preview.html" style={{ color:'var(--ink)', borderBottom:'1px solid var(--line-2)' }}>test call me</a> · view full transcript</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM · Refine with AI (dockable chat) ───────── */}
        <RefineWithAI/>
      </div>
    </AppFrame>
  );
}

function QuestionCard({ s, idx }) {
  return (
    <a href="Builder Edit Step.html" style={{
      display:'grid', gridTemplateColumns:'30px 1fr 90px 20px', gap:12,
      padding:'14px 16px', border:'1px solid var(--line)', borderRadius:12,
      background:'var(--bg-elev)', alignItems:'start',
      textDecoration:'none', color:'inherit', cursor:'pointer',
      transition:'border-color 160ms ease, transform 160ms ease',
    }}>
      <span style={{
        width:24, height:24, borderRadius:'50%',
        background:'var(--ink)', color:'var(--bg)',
        display:'grid', placeItems:'center',
        fontFamily:'var(--mono)', fontSize:10.5, fontWeight:600, marginTop:2,
      }}>{idx+1}</span>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <span className="chip" style={{
            background: s.modality==='voice'?'var(--accent-soft)':'var(--chip)',
            color: s.modality==='voice'?'var(--accent-ink)':'var(--ink-2)',
          }}>{modGlyphNB(s.modality)} {s.modality.toUpperCase()}</span>
          <span style={{ fontSize:15, fontWeight:500, letterSpacing:'-0.005em' }}>{s.title}</span>
        </div>

        {/* the AI prompt — shown in full, because this is the DRAFTED view */}
        <div style={{
          marginTop:10, padding:'10px 12px',
          background:'var(--bg)', border:'1px dashed var(--line-2)', borderRadius:8,
          fontFamily:'var(--serif)', fontStyle:'italic', fontSize:14, color:'var(--ink-2)',
          lineHeight:1.5,
        }}>"{s.prompt}"</div>
      </div>
      <div style={{ textAlign:'right' }}>
        <span className="meta">{s.eta.toUpperCase()}</span>
        <div className="meta" style={{ marginTop:6, color:'var(--ink-3)' }}>RETRIES · 2</div>
      </div>
      <span style={{ fontSize:14, color:'var(--ink-3)', marginTop:4 }}>↗</span>
    </a>
  );
}

// Bottom "Refine with AI" dockable chat drawer
function RefineWithAI() {
  return (
    <div style={{ borderTop:'1px solid var(--line)', background:'var(--bg-elev)' }}>
      <div style={{ padding:'10px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px dashed var(--line)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ width:22, height:22, borderRadius:7, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:10 }}>AI</span>
          <span className="meta">REFINE WITH AI — TELL ME WHAT TO CHANGE</span>
        </div>
        <span className="meta">▾ COLLAPSE</span>
      </div>
      <div style={{ padding:'12px 28px 16px', display:'grid', gridTemplateColumns:'1fr auto', gap:12, alignItems:'center' }}>
        <div style={{ border:'1px solid var(--line-2)', borderRadius:12, background:'var(--bg)', padding:'4px 4px 4px 14px', display:'grid', gridTemplateColumns:'1fr auto', gap:10, alignItems:'center' }}>
          <input
            placeholder='e.g. "make question 2 shorter" · "add a demographic question" · "sound more casual"'
            style={{
              width:'100%', border:0, outline:'none', padding:'12px 0',
              fontFamily:'var(--sans)', fontSize:14, background:'transparent', color:'var(--ink)',
            }}/>
          <button style={{
            padding:'8px 16px', borderRadius:10, background:'var(--ink)', color:'var(--bg)',
            border:0, fontSize:13, fontWeight:500,
          }}>Apply ⌘↵</button>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {['Shorter','Warmer','+ Step','Remove step','Translate'].map(c => (
            <button key={c} style={{
              padding:'6px 10px', fontSize:11.5, fontFamily:'var(--mono)',
              border:'1px solid var(--line)', borderRadius:999, background:'var(--bg)',
              color:'var(--ink-2)', cursor:'pointer',
            }}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ who, msg, chips }) {
  const isUser = who === 'USER';
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'36px 1fr', gap:12,
      opacity:isUser?0.95:1,
    }}>
      <div style={{
        width:32, height:32, borderRadius:10,
        background: isUser?'var(--chip)':'var(--ink)',
        color: isUser?'var(--ink)':'var(--bg)',
        display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:11, fontWeight:500,
      }}>{isUser?'EK':'AI'}</div>
      <div>
        <div style={{
          padding:'10px 14px', borderRadius:12,
          background: isUser?'transparent':'var(--bg-elev)',
          border: isUser?'1px dashed var(--line-2)':'1px solid var(--line)',
          color:'var(--ink-2)', fontSize:14.5, lineHeight:1.55,
        }}>
          {isUser ? <span style={{ fontFamily:'var(--serif)', fontStyle:'italic' }}>"{msg}"</span> : msg}
        </div>
        {chips && (
          <div style={{ marginTop:8, display:'flex', flexWrap:'wrap', gap:6 }}>
            {chips.map(c => (
              <button key={c} style={{
                padding:'6px 12px', borderRadius:999,
                border:'1px solid var(--line)', background:'var(--bg-elev)', color:'var(--ink)',
                fontSize:12.5, cursor:'pointer', fontFamily:'var(--sans)',
              }}>{c}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// a special AI message that shows a diff of changes applied
function AgendaDiffCard() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'36px 1fr', gap:12 }}>
      <div style={{ width:32, height:32, borderRadius:10, background:'var(--ink)', color:'var(--bg)', display:'grid', placeItems:'center', fontFamily:'var(--mono)', fontSize:11 }}>AI</div>
      <div style={{ padding:12, border:'1px solid var(--line)', borderRadius:12, background:'var(--accent-soft)', color:'var(--accent-ink)' }}>
        <div className="meta" style={{ marginBottom:8, color:'var(--accent-ink)' }}>● CHANGES APPLIED</div>
        <div style={{ display:'flex', flexDirection:'column', gap:6, fontSize:13 }}>
          <div>− <span style={{ textDecoration:'line-through', opacity:0.6 }}>Step 3 · Screen share required</span></div>
          <div>+ <strong>Step 3 · Screen share (optional)</strong></div>
          <div>+ <strong>Wrap · now asks about budget authority</strong></div>
        </div>
      </div>
    </div>
  );
}

// ── RIGHT PANE COMPONENTS ───────────────────────────────────

function PreviewTabs({ current }) {
  const tabs = [
    ['agenda','Agenda'],
    ['sms','SMS preview'],
    ['email','Email preview'],
    ['voice','Voice sample'],
  ];
  return (
    <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg-elev)' }}>
      <div style={{ display:'inline-flex', background:'var(--chip)', padding:3, borderRadius:8, border:'1px solid var(--line)' }}>
        {tabs.map(([k, l]) => (
          <button key={k} style={{
            padding:'6px 12px', border:0, borderRadius:6,
            background: k===current?'var(--bg-elev)':'transparent',
            color: k===current?'var(--ink)':'var(--ink-3)',
            fontSize:12, fontWeight:500, cursor:'pointer',
            boxShadow: k===current?'0 1px 2px rgba(0,0,0,0.06)':'none',
          }}>{l}</button>
        ))}
      </div>
      <span className="meta">LIVE · UPDATES AS AI DRAFTS</span>
    </div>
  );
}

function AgendaPanel() {
  return (
    <div style={{ padding:'20px 22px', overflow:'auto', borderRight:'1px solid var(--line)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
        <span className="meta">THE AGENDA · CLICK TO EDIT</span>
        <span className="meta">~{DRAFT.duration.toUpperCase()}</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {DRAFT.steps.map((s, i) => <AgendaStep key={s.k} s={s} idx={i}/>)}
      </div>
      <button style={{
        marginTop:10, width:'100%', padding:'10px 12px',
        border:'1px dashed var(--line-2)', borderRadius:10, background:'transparent',
        color:'var(--ink-3)', fontSize:13, cursor:'pointer',
      }}>+ Add a step</button>

      {/* AI feedback / safety net */}
      <div style={{ marginTop:18, padding:14, border:'1px solid var(--line)', borderRadius:12, background:'var(--bg-elev)' }}>
        <div className="meta" style={{ marginBottom:10 }}>A QUICK READ ON YOUR DRAFT</div>
        {[
          ['✓','Length is right','8 min is the sweet spot for ops leads.','ok'],
          ['⚠','Question 2 might be leading','"How do you onboard vendors today?" — consider adding "walk me through…"','warn'],
          ['✓','Incentive is in','$75 gift card. Completion rate will be ~20% higher.','ok'],
        ].map(([g, title, body, tone], i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'22px 1fr', gap:10, padding:'8px 0', borderBottom: i<2?'1px dashed var(--line)':'none' }}>
            <span style={{ color: tone==='ok'?'var(--accent-ink)':'oklch(0.42 0.14 60)', fontFamily:'var(--mono)', fontSize:12 }}>{g}</span>
            <div>
              <div style={{ fontSize:13, fontWeight:500 }}>{title}</div>
              <div className="meta" style={{ marginTop:2, textTransform:'none', letterSpacing:0 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgendaStep({ s, idx }) {
  return (
    <button style={{
      display:'grid', gridTemplateColumns:'26px 1fr auto', gap:10,
      padding:'11px 12px', border:'1px solid var(--line)', borderRadius:10,
      background:'var(--bg-elev)', textAlign:'left', cursor:'pointer',
      width:'100%', fontFamily:'var(--sans)',
    }}>
      <span style={{
        width:22, height:22, borderRadius:'50%',
        background:'var(--chip)', color:'var(--ink)',
        display:'grid', placeItems:'center',
        fontFamily:'var(--mono)', fontSize:10, fontWeight:500,
      }}>{idx+1}</span>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span className="chip" style={{
            background: s.modality==='voice'?'var(--accent-soft)':'var(--chip)',
            color: s.modality==='voice'?'var(--accent-ink)':'var(--ink-2)',
          }}>{modGlyphNB(s.modality)} {s.modality.toUpperCase()}</span>
          <span style={{ fontSize:13.5, fontWeight:500 }}>{s.title}</span>
        </div>
        <div className="meta" style={{ marginTop:4, textTransform:'none', letterSpacing:0 }}>{s.prompt.slice(0, 66)}{s.prompt.length>66?'…':''}</div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
        <span className="meta">{s.eta.toUpperCase()}</span>
        <span className="meta" style={{ color:'var(--ink-3)' }}>↗</span>
      </div>
    </button>
  );
}

function PhonePreview() {
  return (
    <div style={{ padding:'20px 16px', overflow:'auto', display:'flex', alignItems:'flex-start', justifyContent:'center' }}>
      <div style={{
        width: 260, background:'var(--bg-elev)', border:'1px solid var(--line)',
        borderRadius:22, padding:14, boxShadow:'0 24px 60px -20px rgba(0,0,0,0.2)',
      }}>
        <div style={{ textAlign:'center', padding:'2px 0 10px', fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)' }}>
          +1 (555) 012 7737 · 9:14 AM
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8, minHeight:360 }}>
          {[
            ['in','Hi {{first_name}} — Nova at Acme. Got 8 min?'],
            ['out','sure'],
            ['in','Walk me through how you onboard a new vendor today — first 48 hours from their side.'],
            ['out','a lot of emails honestly'],
            ['in','Ha, that tracks. What\'s the single most painful part of those 48 hours?'],
          ].map(([d, t], i) => (
            <div key={i} style={{
              alignSelf: d==='in'?'flex-start':'flex-end',
              maxWidth:'84%', padding:'8px 11px', borderRadius:14,
              background: d==='in'?'var(--chip)':'var(--ink)',
              color: d==='in'?'var(--ink)':'var(--bg)',
              fontSize:12.5, lineHeight:1.4,
            }}>{t}</div>
          ))}
          <div style={{ alignSelf:'flex-start', display:'inline-flex', gap:3, padding:'6px 10px', background:'var(--chip)', borderRadius:12, width:'fit-content' }}>
            {[0,1,2].map(i => <span key={i} style={{ width:4, height:4, borderRadius:'50%', background:'var(--ink-3)' }}/>)}
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:8, paddingTop:6, borderTop:'1px dashed var(--line)', fontFamily:'var(--mono)', fontSize:9, color:'var(--ink-3)', letterSpacing:'0.06em' }}>
          ● STREAMING · WHAT THEY'LL SEE
        </div>
      </div>
    </div>
  );
}

function PreviewFooter() {
  return (
    <div style={{ padding:'12px 20px', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg-elev)' }}>
      <span className="meta">NO ONE HAS RECEIVED THIS YET · YOU CONTROL WHEN IT GOES LIVE</span>
      <div style={{ display:'flex', gap:8 }}>
        <button className="ghost" style={{ padding:'8px 14px' }}>Test call me</button>
        <a className="primary" href="Preview.html" style={{ padding:'8px 16px' }}>Preview & send →</a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Screen — Edit-step modal (lives on its own artboard so you
// can comment, + opened from AgendaStep in prod).
// ─────────────────────────────────────────────────────────
function ScreenBuilderEditStep() {
  return (
    <AppFrame active="builder" screenLabel="02 Builder · Edit step modal"
      crumbs={['comms.app','flows','vendor-ops-research-q2']}
      topRight={<>
        <span className="meta" style={{ marginRight:10 }}>EDITING · STEP 2</span>
        <Btn variant="subtle">Advanced mode →</Btn>
      </>}>
      <div style={{ height:'100%', position:'relative', background:'var(--bg)' }}>
        {/* dimmed underlay to simulate modal overlay */}
        <div style={{
          position:'absolute', inset:0,
          background:'rgba(14,14,12,0.45)', backdropFilter:'blur(2px)',
        }}/>

        {/* modal */}
        <div style={{
          position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          width:720, background:'var(--bg-elev)', border:'1px solid var(--line)',
          borderRadius:18, overflow:'hidden', boxShadow:'0 40px 100px -20px rgba(0,0,0,0.4)',
        }}>
          {/* header */}
          <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div className="meta" style={{ marginBottom:4 }}>STEP 2 · OPEN QUESTION (VOICE)</div>
              <div style={{ fontSize:18, fontWeight:500, letterSpacing:'-0.005em' }}>How do you onboard vendors today?</div>
            </div>
            <button style={{ width:30, height:30, borderRadius:'50%', border:'1px solid var(--line)', background:'var(--bg)', fontSize:14, color:'var(--ink-3)' }}>×</button>
          </div>

          {/* body */}
          <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:18 }}>
            <div>
              <label className="meta" style={{ display:'block', marginBottom:6 }}>WHAT THE AI SAYS — PROMPT</label>
              <textarea defaultValue={DRAFT.steps[1].prompt} style={{
                width:'100%', minHeight:70, resize:'vertical',
                border:'1px solid var(--line-2)', borderRadius:10, padding:'12px 14px',
                fontFamily:'var(--sans)', fontSize:14, color:'var(--ink)', background:'var(--bg)', lineHeight:1.5,
              }}/>
              <div className="meta" style={{ marginTop:6, color:'var(--ink-3)', textTransform:'none', letterSpacing:0 }}>
                Use <code style={{ fontFamily:'var(--mono)', color:'var(--accent-ink)' }}>{'{{first_name}}'}</code> · <code style={{ fontFamily:'var(--mono)', color:'var(--accent-ink)' }}>{'{{company}}'}</code> · <code style={{ fontFamily:'var(--mono)', color:'var(--accent-ink)' }}>{'{{site.name}}'}</code>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div>
                <label className="meta" style={{ display:'block', marginBottom:6 }}>ANSWER TYPE</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['Open voice','Open text','Choice','Rank','Number','Upload'].map((t, i) => (
                    <button key={t} style={{
                      padding:'7px 12px', borderRadius:999,
                      background: i===0?'var(--ink)':'var(--bg)',
                      color: i===0?'var(--bg)':'var(--ink-2)',
                      border:'1px solid ' + (i===0?'var(--ink)':'var(--line)'), fontSize:12,
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="meta" style={{ display:'block', marginBottom:6 }}>CHANNEL OVERRIDE</label>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {['Follow flow','SMS','Voice','Email','Link'].map((t, i) => (
                    <button key={t} style={{
                      padding:'7px 12px', borderRadius:999,
                      background: i===0?'var(--ink)':'var(--bg)',
                      color: i===0?'var(--bg)':'var(--ink-2)',
                      border:'1px solid ' + (i===0?'var(--ink)':'var(--line)'), fontSize:12,
                    }}>{t}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="meta" style={{ display:'block', marginBottom:6 }}>TIME BUDGET</label>
                <div style={{ border:'1px solid var(--line)', borderRadius:10, padding:'10px 12px', background:'var(--bg)', display:'flex', justifyContent:'space-between', fontSize:13 }}>
                  <span>Soft 2 min · hard 4 min</span>
                  <span className="meta">↔</span>
                </div>
              </div>

              <div>
                <label className="meta" style={{ display:'block', marginBottom:6 }}>RETRIES</label>
                <div style={{ border:'1px solid var(--line)', borderRadius:10, padding:'10px 12px', background:'var(--bg)', display:'flex', justifyContent:'space-between', fontSize:13 }}>
                  <span>Ask up to 2 follow-ups</span>
                  <span className="meta">↔</span>
                </div>
              </div>
            </div>

            <div>
              <label className="meta" style={{ display:'block', marginBottom:6 }}>WHAT THE AI LISTENS FOR · OPTIONAL</label>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {['first-48h journey','pain points','tools they use','team size','+ add a signal'].map((t, i) => (
                  <span key={t} className="chip" style={ i===4 ? { borderStyle:'dashed', color:'var(--ink-3)' } : { borderColor:'var(--ink)', color:'var(--ink)' } }>{t}</span>
                ))}
              </div>
              <div className="meta" style={{ marginTop:8, textTransform:'none', letterSpacing:0, color:'var(--ink-3)' }}>
                The AI will probe if any of these are missing from the answer.
              </div>
            </div>

            <div style={{ padding:'12px 14px', border:'1px dashed var(--accent)', borderRadius:10, background:'var(--accent-soft)', color:'var(--accent-ink)', fontSize:13, lineHeight:1.5 }}>
              <strong style={{ fontWeight:500 }}>Suggestion:</strong> The phrase "How do you onboard vendors today" is a bit closed. Try <em style={{ fontFamily:'var(--serif)' }}>"Walk me through what happens the first 48 hours after you bring on a new vendor."</em> <button className="ghost" style={{ marginLeft:8, padding:'4px 10px', fontSize:11 }}>Use this</button>
            </div>
          </div>

          {/* footer */}
          <div style={{ padding:'14px 24px', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <button className="ghost" style={{ padding:'8px 14px', color:'oklch(0.42 0.14 25)' }}>Delete step</button>
            <div style={{ display:'flex', gap:8 }}>
              <button className="ghost" onClick={() => window.location.href='Builder Chat.html'} style={{ padding:'8px 14px' }}>Cancel</button>
              <button className="primary" onClick={() => window.location.href='Builder Chat.html'} style={{ padding:'8px 18px' }}>Save step</button>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenBuilderChatEmpty, ScreenBuilderChat, ScreenBuilderEditStep });
