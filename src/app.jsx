// ============================================================
// App root — lays out ALL screens on the design canvas, organized by phase.
// ============================================================

const { useState: useStateRoot, useEffect: useEffectRoot } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "state": "normal",
  "mode": "light",
  "accent": "signal",
  "liveModality": "voice"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweaks] = useStateRoot({ ...TWEAK_DEFAULTS });

  useEffectRoot(() => {
    document.documentElement.dataset.mode = tweaks.mode;
    document.documentElement.dataset.accent = tweaks.accent;
    document.documentElement.dataset.state = tweaks.state;
  }, [tweaks]);

  // Tweaks protocol
  const [editMode, setEditMode] = useStateRoot(false);
  useEffectRoot(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditMode(true);
      if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setKey = (k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return next;
    });
  };

  const AB = ({ label, width=1280, height=820, children }) => (
    <DCArtboard label={label} width={width} height={height}>{children}</DCArtboard>
  );

  return (
    <>
      <DesignCanvas>
        {/* ── PHASE 1 · FOUNDATION ─────────────────────────── */}
        <DCSection
          title="Phase 1 · Foundation"
          subtitle="App shell + Home. Design tokens forked from the marketing site — warm neutrals, signal-green accent, Instrument Serif italics, JetBrains Mono meta."
        >
          <AB label="01 · Home / Dashboard"><ScreenHome/></AB>
          <AB label="Chrome · isolated · sidebar" width={260} height={640}>
            <div style={{ width:'100%', height:'100%', background:'var(--bg)' }}><Sidebar active="builder"/></div>
          </AB>
          <AB label="Chrome · isolated · top bar" width={1000} height={100}>
            <div style={{ width:'100%', height:'100%', background:'var(--bg)' }}>
              <TopBar crumbs={['comms.app','harbor','flows','onboarding-q2-2026']} unread={3}/>
            </div>
          </AB>
        </DCSection>

        {/* ── PHASE 2 · BUILDER ─────────────────────────────── */}
        <DCSection
          title="Phase 2 · Builder · chat-first (default)"
          subtitle="Business users describe what they want in plain English. The AI drafts, the preview is live. Advanced mode pivots to the node editor for power users."
        >
          <AB label="02 · New conversation · empty state"><ScreenBuilderChatEmpty/></AB>
          <AB label="02 · Chat mid-draft · agenda + SMS live preview"><ScreenBuilderChat/></AB>
          <AB label="02 · Edit step · modal (no sidebar inspector)"><ScreenBuilderEditStep/></AB>
        </DCSection>

        <DCSection
          title="Phase 2 · Builder · Advanced mode (node editor)"
          subtitle="Same capability, power-user surface. Accessible via 'Advanced mode →' in the top-right of the chat builder. Kept for teams who want to hand-wire complex branching flows."
        >
          <AB label="02a · Session wizard (classic)"><ScreenWizard/></AB>
          <AB label="02b · Flow editor · drag nodes, click to inspect"><ScreenFlowEditor/></AB>
          <AB label="02c · Preview & test run"><ScreenBuilderPreview/></AB>
          <AB label="02d · Dispatch (go live)"><ScreenDispatch/></AB>
        </DCSection>

        {/* ── PHASE 3 · TEMPLATES ───────────────────────────── */}
        <DCSection
          title="Phase 3 · Templates"
          subtitle="A vetted library of conversations. Click a chip to filter, a card to see the flow, or use-template to fork."
        >
          <AB label="03a · Template gallery"><ScreenTemplates/></AB>
          <AB label="03b · Template detail"><ScreenTemplateDetail/></AB>
        </DCSection>

        {/* ── PHASE 4 · CAMPAIGNS ───────────────────────────── */}
        <DCSection
          title="Phase 4 · Campaigns"
          subtitle="Every conversation you've sent and every one still running. Click checkboxes to see bulk-actions bar; open a row for the detail + drawer."
        >
          <AB label="04a · Campaign list · bulk actions"><ScreenCampaigns/></AB>
          <AB label="04b · Campaign detail + config drawer"><ScreenCampaignDetail/></AB>
        </DCSection>

        {/* ── PHASE 5 · PARTICIPANTS ────────────────────────── */}
        <DCSection
          title="Phase 5 · Participant CRM"
          subtitle="Every participant, every conversation, one record. List drives the profile pane on the right; segments are query-based cohorts that stay fresh."
        >
          <AB label="05a · Participant list + profile"><ScreenParticipants/></AB>
          <AB label="05b · Segments"><ScreenSegments/></AB>
        </DCSection>

        {/* ── PHASE 6 · AUTH ────────────────────────────────── */}
        <DCSection
          title="Phase 6 · Auth & Onboarding"
          subtitle="Editorial dark/light split. Email + SSO (Google / Okta / MS) · magic-link · invite-accept · first-run wizard."
        >
          <AB label="06a · Sign up"><ScreenSignUp/></AB>
          <AB label="06b · Log in"><ScreenLogin/></AB>
          <AB label="06c · Magic link sent"><ScreenMagicLink/></AB>
          <AB label="06d · First-run onboarding"><ScreenOnboarding/></AB>
        </DCSection>

        {/* ── PHASE 7 · SETTINGS ────────────────────────────── */}
        <DCSection
          title="Phase 7 · Settings"
          subtitle="Profile · Team · Billing · API keys + webhooks · Integrations · Audit log."
        >
          <AB label="07a · Profile"><ScreenSettingsProfile/></AB>
          <AB label="07b · Team & members"><ScreenSettingsTeam/></AB>
          <AB label="07c · Billing & usage"><ScreenSettingsBilling/></AB>
          <AB label="07d · API & webhooks"><ScreenSettingsAPI/></AB>
          <AB label="07e · Integrations"><ScreenSettingsIntegrations/></AB>
          <AB label="07f · Audit log"><ScreenSettingsAudit/></AB>
        </DCSection>

        {/* ── PHASE 8 · LIVE CONVERSATION ───────────────────── */}
        <DCSection
          title="Phase 8 · Live Conversation · all modalities"
          subtitle="The cockpit. Transcript on the left, the stage in the middle (click any modality tab), and the agent-intervention console on the right. Six modes across the top swap the center stage."
        >
          <AB label="08a · Voice"><ScreenLive modality="voice"/></AB>
          <AB label="08b · Video"><ScreenLive modality="video"/></AB>
          <AB label="08c · Conversational form"><ScreenLive modality="form"/></AB>
          <AB label="08d · Present · video"><ScreenLive modality="present"/></AB>
          <AB label="08e · Present · document"><ScreenLive modality="doc"/></AB>
          <AB label="08f · Screen share"><ScreenLive modality="screen"/></AB>
        </DCSection>

        {/* ── PHASE 9 · EDGE STATES ─────────────────────────── */}
        <DCSection
          title="Phase 9 · Edge & error states"
          subtitle="The screens you hope nobody sees. 404 · permission-denied · upgrade-required · rate-limit · empty workspace · invite accept · offline."
        >
          <AB label="09a · 404"><Screen404/></AB>
          <AB label="09b · Permission denied"><ScreenPermissionDenied/></AB>
          <AB label="09c · Upgrade required"><ScreenUpgradeRequired/></AB>
          <AB label="09d · API rate limit"><ScreenRateLimit/></AB>
          <AB label="09e · Empty workspace · first run"><ScreenEmptyWorkspace/></AB>
          <AB label="09f · Offline"><ScreenOffline/></AB>
          <AB label="09g · Invite accept"><ScreenInviteAccept/></AB>
        </DCSection>

        {/* ── PHASE 10 · PARTICIPANT FLOW ───────────────────── */}
        <DCSection
          title="Phase 10 · Participant flow · Acme Inc. receives a research invite"
          subtitle="The receiver's journey, end to end. Email from a real sender at Acme → branded Comms link → consent → device check → voice OR video interview → thank-you with incentive. No app, no login."
        >
          <AB label="10a · Email inbox · Acme invite highlighted"><ScreenParticipantInbox/></AB>
          <AB label="10b · Email opened · the invite itself"><ScreenParticipantEmail/></AB>
          <AB label="10c · Landing page · pick a modality"><ScreenParticipantLanding/></AB>
          <AB label="10d · Consent"><ScreenParticipantConsent/></AB>
          <AB label="10e · Device check · mic & camera"><ScreenParticipantDeviceCheck/></AB>
          <AB label="10f · Live interview · VOICE"><ScreenParticipantVoice/></AB>
          <AB label="10g · Live interview · VIDEO"><ScreenParticipantVideo/></AB>
          <AB label="10h · Thank you · incentive"><ScreenParticipantThanks/></AB>
        </DCSection>

        {/* ── PHASE 11 · SHAREABLE LINK + AGENDA ─────────────── */}
        <DCSection
          title="Phase 11 · Shareable link + agenda-driven conversation"
          subtitle="Same engine, different front door. Anyone with the link goes through a lightweight identity gate (name · email · captcha) before entering the SAME agenda-driven conversation — which walks through voice, video, and form steps, one after the other. The operator's flow builder mirrors the same agenda."
        >
          <AB label="11a · Shareable link · landing (no auth)"><ScreenLinkLanding/></AB>
          <AB label="11b · Gate · first / last / email / captcha"><ScreenLinkGate/></AB>
          <AB label="11c · Step 1 · Intro (voice)"><ScreenAgendaIntro/></AB>
          <AB label="11d · Step 3 · Show us your workflow (video + screenshare)"><ScreenAgendaVideoQ/></AB>
          <AB label="11e · Step 5 · Form · rank priorities"><ScreenAgendaForm/></AB>
          <AB label="11f · Operator view · same agenda in the flow builder"><ScreenBuilderAgenda/></AB>
        </DCSection>
      </DesignCanvas>

      {/* Tweaks panel */}
      {editMode && (
        <div style={{
          position:'fixed', right:16, bottom:16, width:280,
          background:'var(--bg-elev)', border:'1px solid var(--line-2)',
          borderRadius:12, padding:14, fontSize:13,
          boxShadow:'0 18px 60px -20px rgba(0,0,0,0.35)', zIndex:1000,
        }}>
          <div className="meta" style={{ marginBottom:10, color:'var(--ink-2)' }}>TWEAKS</div>

          <TRow label="State preview">
            {['normal','empty','loading','error'].map(s => (
              <SegBtn key={s} on={tweaks.state === s} onClick={() => setKey('state', s)}>{s}</SegBtn>
            ))}
          </TRow>
          <TRow label="Mode">
            {['light','dark'].map(s => (
              <SegBtn key={s} on={tweaks.mode === s} onClick={() => setKey('mode', s)}>{s}</SegBtn>
            ))}
          </TRow>
          <TRow label="Accent">
            {['signal','cobalt','ember'].map(s => (
              <SegBtn key={s} on={tweaks.accent === s} onClick={() => setKey('accent', s)}>{s}</SegBtn>
            ))}
          </TRow>
          <div className="meta" style={{ fontSize:10, marginTop:8, color:'var(--ink-3)', lineHeight:1.5 }}>
            Each Live modality is its own artboard. Click the chip tabs inside the artboard to switch modalities live. Use ⌘+scroll on the canvas to zoom.
          </div>
        </div>
      )}
    </>
  );
}

function TRow({ label, children }) {
  return (
    <div style={{ marginBottom:10 }}>
      <div className="meta" style={{ fontSize:10, marginBottom:6 }}>{label.toUpperCase()}</div>
      <div style={{ display:'grid', gridAutoFlow:'column', gridAutoColumns:'1fr', gap:2, background:'var(--chip)', padding:2, borderRadius:8 }}>{children}</div>
    </div>
  );
}
function SegBtn({ on, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: on?'var(--bg-elev)':'transparent', border:0, padding:'6px 6px', borderRadius:6,
      fontSize:11, color: on?'var(--ink)':'var(--ink-3)', cursor:'pointer', fontFamily:'var(--mono)',
      textTransform:'capitalize', boxShadow: on?'0 1px 2px rgba(0,0,0,0.06)':'none',
    }}>{children}</button>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
