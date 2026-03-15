import React, { useState } from 'react';
import { Sparkles, ShieldAlert, Zap, Copy, Check, AlertCircle, ArrowRight, Terminal, X, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

// ─── Shared primitives ────────────────────────────────────────────────────────
function SkeletonBlock({ style }) {
  return (
    <div
      className="rounded animate-pulse"
      style={{ background: 'rgba(255,255,255,0.055)', ...style }}
    />
  );
}

function ErrorBanner({ message }) {
  return (
    <div
      className="mt-5 p-4 rounded-xl flex items-start gap-3"
      style={{ background: 'rgba(251,113,133,0.05)', border: '1px solid rgba(251,113,133,0.18)' }}
    >
      <AlertCircle size={14} style={{ color: '#fb7185', flexShrink: 0, marginTop: '2px' }} />
      <span className="text-sm" style={{ color: '#fb7185' }}>{message}</span>
    </div>
  );
}

function OutputHeader({ accent, copied, onCopy }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Terminal size={12} style={{ color: accent }} />
        <span className="section-label" style={{ color: accent }}>Output</span>
      </div>
      <button
        data-testid="tools-copy-output-button"
        onClick={onCopy}
        className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
        style={{ color: 'rgba(255,255,255,0.35)' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
      >
        {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
      </button>
    </div>
  );
}

function ToolInput({ value, onChange, placeholder, testid, focusColor, onExample, rows = 5 }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="section-label">Describe the process</label>
        <button
          type="button"
          onClick={onExample}
          className="text-xs transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.28)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.28)'; }}
        >
          Try an example
        </button>
      </div>
      <textarea
        data-testid={testid}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={3000}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl text-sm text-white focus:outline-none"
        style={{
          background: 'rgba(18,21,28,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '14px 16px',
          lineHeight: '1.65',
          transition: 'border-color 200ms',
          fontFamily: 'inherit',
          color: 'rgba(255,255,255,0.85)',
        }}
        onFocus={(e) => { e.target.style.borderColor = focusColor; }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
      />
      <span className="text-xs mt-1 block" style={{ color: 'rgba(255,255,255,0.18)' }}>
        {value.length} / 3000
      </span>
    </div>
  );
}

function SubmitButton({ loading, disabled, onClick, accent, loadingText, idleText, icon: Icon }) {
  return (
    <div className="flex justify-end mt-5">
      <button
        data-testid="tools-submit-button"
        type="button"
        onClick={onClick}
        disabled={loading || disabled}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: '#ffffff', color: '#08090a' }}
      >
        {loading
          ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black/70 animate-spin" />{loadingText}</>  
          : <><span>{idleText}</span>{Icon && <Icon size={13} />}</>}
      </button>
    </div>
  );
}

function ResultDivider() {
  return (
    <div
      className="mt-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}
    />
  );
}

// ─── Tool 1: Chaos Translator ─────────────────────────────────────────────────
function ChaosTranslator() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (input.trim().length < 10) { setError('Please provide at least a sentence of context.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BACKEND}/api/tools/chaos-translate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data.data);
    } catch (err) { setError(err.message || 'System disruption. Please try again.'); }
    finally { setLoading(false); }
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Summary:\n${result.summary}\n\nSteps:\n${result.steps.map(s => `${s.stepNumber}. ${s.title}\n${s.content}`).join('\n\n')}`
    );
    setCopied(true); toast.success('Output copied.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="tools-tab-chaos-translator"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0c0e12', border: '1px solid rgba(0,240,255,0.1)' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.3), transparent)' }} />
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-7">
          <div className="p-2.5 rounded-lg shrink-0 mt-0.5" style={{ background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.14)' }}>
            <Sparkles size={16} style={{ color: 'var(--theme-accent, #00f0ff)' }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">The Chaos Translator</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Paste overloaded thinking. Get structure, direction, and a clear first step.</p>
          </div>
        </div>

        <ToolInput
          testid="tools-input-textarea"
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the situation. What's the idea, the problem, or the mess? The more honest, the better the output."
          focusColor="rgba(0,240,255,0.25)"
          onExample={() => setInput("I have an idea for a local service app but it also has a marketplace and a SaaS tool for businesses, and I want to add a social feed, and I don't know who to sell to first or what the core product even is.")}
        />
        <SubmitButton loading={loading} onClick={run} loadingText="Analyzing…" idleText="Structure this" icon={ArrowRight} />
        {error && <ErrorBanner message={error} />}

        {loading && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <p className="section-label mb-4">Diagnosing…</p>
            <SkeletonBlock style={{ height: '18px', width: '75%', marginBottom: '10px' }} />
            <SkeletonBlock style={{ height: '14px', width: '55%' }} />
            <div className="grid grid-cols-2 gap-3 mt-5">
              {[1,2,3,4].map(i => <SkeletonBlock key={i} style={{ height: '88px' }} />)}
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <OutputHeader accent="var(--theme-accent, #00f0ff)" copied={copied} onCopy={copy} />
            <div className="p-5 rounded-xl mb-5" style={{ background: 'rgba(0,240,255,0.035)', border: '1px solid rgba(0,240,255,0.12)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)', fontStyle: 'italic' }}>
                “{result.summary}”
              </p>
            </div>
            <div className="space-y-3">
              {result.steps.map((step) => (
                <div key={step.stepNumber} className="flex gap-5 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-extrabold shrink-0" style={{ color: 'var(--theme-accent, #00f0ff)', opacity: 0.5, fontSize: '0.75rem', paddingTop: '2px', letterSpacing: '-0.02em' }}>{step.stepNumber}</span>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tool 2: Bloat Detector ───────────────────────────────────────────────────
function BloatDetector() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (input.trim().length < 10) { setError('Please provide at least a sentence of context.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BACKEND}/api/tools/bloat-detect`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data.data);
    } catch (err) { setError(err.message || 'Scanner failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Core Value:\n${result.core_value}\n\nBloat Detected:\n${result.bloat_items.map(i => `• ${i}`).join('\n')}\n\nKeep:\n${result.keep_items.map(i => `• ${i}`).join('\n')}\n\nRecommendation:\n${result.recommendation}`
    );
    setCopied(true); toast.success('Output copied.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="tools-tab-bloat-detector"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0c0e12', border: '1px solid rgba(139,92,246,0.12)' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.35), transparent)' }} />
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-7">
          <div className="p-2.5 rounded-lg shrink-0 mt-0.5" style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.16)' }}>
            <ShieldAlert size={16} style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">The Bloat Detector</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Paste a feature list, pitch, or roadmap. Find the core, identify the drift, and get a cut recommendation.</p>
          </div>
        </div>

        <ToolInput
          testid="tools-input-textarea-bloat"
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="List the features, describe the product, or paste the pitch. What does it do? What's it supposed to do? Who is it for?"
          focusColor="rgba(139,92,246,0.25)"
          onExample={() => setInput("Our new fitness app tracks workouts, counts calories, has a social feed with stories, sells crypto tokens for steps, offers live coaching sessions, has a marketplace for gym gear, and provides AI meal planning. Core promise: help people exercise more.")}
        />
        <SubmitButton loading={loading} onClick={run} loadingText="Scanning…" idleText="Detect Bloat" icon={ShieldAlert} />
        {error && <ErrorBanner message={error} />}

        {loading && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <p className="section-label mb-4">Scanning for feature sprawl…</p>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3].map(i => <SkeletonBlock key={i} style={{ height: '110px' }} />)}
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <OutputHeader accent="#8b5cf6" copied={copied} onCopy={copy} />
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div className="p-5 rounded-xl" style={{ background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.12)' }}>
                <p className="section-label mb-3" style={{ color: 'var(--theme-accent, #00f0ff)' }}>The True Core</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{result.core_value}</p>
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.15)' }}>
                <p className="section-label mb-3" style={{ color: '#fb7185' }}>Off-Core Drift</p>
                <ul className="space-y-2">
                  {result.bloat_items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#fb7185', flexShrink: 0, marginTop: '2px', fontSize: '0.7rem' }}>—</span>
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(139,92,246,0.03)', border: '1px solid rgba(139,92,246,0.12)' }}>
                <p className="section-label mb-3" style={{ color: '#8b5cf6' }}>Keep</p>
                <ul className="space-y-2">
                  {result.keep_items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#8b5cf6', flexShrink: 0, marginTop: '2px', fontSize: '0.7rem' }}>—</span>
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="section-label mb-3">Recommendation</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tool 3: Friction Auditor ─────────────────────────────────────────────────
const FRICTION_ACCENT = '#f97316'; // orange — heat, friction, bottleneck

function FrictionAuditor() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (input.trim().length < 10) { setError('Please describe your process in more detail.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BACKEND}/api/tools/friction-audit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Audit failed.');
      setResult(data.data);
    } catch (err) { setError(err.message || 'Audit failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const copy = () => {
    if (!result) return;
    const lines = [
      `Primary Bottleneck:\n${result.bottleneck}`,
      `\nSteps to Eliminate:\n${result.eliminate_steps.map(s => `— ${s.step}: ${s.reason}`).join('\n')}`,
      `\nStreamlined Architecture:\n${result.streamlined_architecture.map(p => `${p.phase}. ${p.name}: ${p.description}`).join('\n')}`,
      `\nEfficiency Signal:\n${result.efficiency_signal}`,
    ];
    navigator.clipboard.writeText(lines.join(''));
    setCopied(true); toast.success('Audit output copied.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="tools-tab-friction-auditor"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0c0e12', border: `1px solid rgba(249,115,22,0.14)` }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(to right, transparent, rgba(249,115,22,0.4), transparent)`,
      }} />
      {/* Subtle corner glow */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '220px', height: '220px',
        background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-7">
          <div
            className="p-2.5 rounded-lg shrink-0 mt-0.5"
            style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            <Zap size={16} style={{ color: FRICTION_ACCENT }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">
              The Friction Auditor
              <span
                className="ml-2 text-xs font-semibold px-2 py-0.5 rounded align-middle"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.2)',
                  color: FRICTION_ACCENT,
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                }}
              >
                NEW
              </span>
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Paste a clunky business process. Get the bottleneck diagnosed, dead steps identified, and a leaner architecture designed.
            </p>
          </div>
        </div>

        {/* Input */}
        <ToolInput
          testid="tools-input-textarea-friction"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Walk through the process step by step. For example:\n\n"New client emails us → we manually check availability in a spreadsheet → someone calls them back → they fill out a PDF form and email it back → we re-enter it into our system → someone else reviews and approves → we call to confirm..."`}
          focusColor="rgba(249,115,22,0.3)"
          rows={6}
          onExample={() => setInput(
            'A new client submits a quote request via our website. Someone from sales manually checks a shared spreadsheet for pricing, then emails a quote PDF. If the client accepts, they sign it and email it back. We then manually re-enter their details into our CRM, raise an invoice in a separate accounting tool, email the invoice, wait for payment confirmation, and then email a welcome pack attachment. The whole thing takes 2–3 days and involves 5 different people.'
          )}
        />

        <SubmitButton
          loading={loading}
          onClick={run}
          loadingText="Auditing process…"
          idleText="Run the Audit"
          icon={Zap}
        />

        {error && <ErrorBanner message={error} />}

        {/* Loading skeleton — hints at the multi-section output structure */}
        {loading && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <p className="section-label mb-5" style={{ color: FRICTION_ACCENT }}>Auditing process flow…</p>
            {/* Bottleneck */}
            <div className="p-5 rounded-xl mb-4" style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.1)' }}>
              <SkeletonBlock style={{ height: '12px', width: '40%', marginBottom: '10px' }} />
              <SkeletonBlock style={{ height: '16px', width: '90%', marginBottom: '8px' }} />
              <SkeletonBlock style={{ height: '14px', width: '70%' }} />
            </div>
            {/* Steps + Architecture */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-5 rounded-xl" style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.08)' }}>
                <SkeletonBlock style={{ height: '10px', width: '50%', marginBottom: '12px' }} />
                {[1,2,3].map(i => <SkeletonBlock key={i} style={{ height: '32px', marginBottom: '8px' }} />)}
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <SkeletonBlock style={{ height: '10px', width: '55%', marginBottom: '12px' }} />
                {[1,2,3,4].map(i => <SkeletonBlock key={i} style={{ height: '28px', marginBottom: '8px' }} />)}
              </div>
            </div>
            {/* Efficiency Signal */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(249,115,22,0.03)', border: '1px solid rgba(249,115,22,0.08)' }}>
              <SkeletonBlock style={{ height: '12px', width: '30%', marginBottom: '10px' }} />
              <SkeletonBlock style={{ height: '16px', width: '85%' }} />
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <OutputHeader accent={FRICTION_ACCENT} copied={copied} onCopy={copy} />

            {/* Primary Bottleneck — most prominent */}
            <div
              className="p-6 rounded-xl mb-5 relative overflow-hidden"
              style={{
                background: 'rgba(249,115,22,0.05)',
                border: `1px solid rgba(249,115,22,0.22)`,
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(to right, ${FRICTION_ACCENT}, rgba(249,115,22,0.3), transparent)`,
              }} />
              <div className="flex items-start gap-3">
                <div
                  className="p-1.5 rounded shrink-0 mt-0.5"
                  style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}
                >
                  <Zap size={12} style={{ color: FRICTION_ACCENT }} />
                </div>
                <div>
                  <p className="section-label mb-2" style={{ color: FRICTION_ACCENT }}>Primary Bottleneck</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    {result.bottleneck}
                  </p>
                </div>
              </div>
            </div>

            {/* Steps to Eliminate + Streamlined Architecture — side by side on md+ */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">

              {/* Steps to Eliminate */}
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.12)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <X size={12} style={{ color: '#fb7185' }} />
                  <p className="section-label" style={{ color: '#fb7185' }}>Steps to Eliminate</p>
                </div>
                <ul className="space-y-3">
                  {result.eliminate_steps.map((item, i) => (
                    <li key={i} className="flex flex-col gap-0.5">
                      <div className="flex items-start gap-2">
                        <span
                          className="text-xs font-semibold shrink-0"
                          style={{
                            color: '#fb7185',
                            opacity: 0.6,
                            marginTop: '1px',
                            letterSpacing: '0.02em',
                          }}
                        >
                          —
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: 'rgba(255,255,255,0.72)',
                            textDecoration: 'line-through',
                            textDecorationColor: 'rgba(251,113,133,0.35)',
                            textDecorationThickness: '1px',
                          }}
                        >
                          {item.step}
                        </span>
                      </div>
                      <p
                        className="text-xs leading-relaxed pl-4"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                      >
                        {item.reason}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Streamlined Architecture */}
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <p className="section-label">Streamlined Architecture</p>
                </div>
                <ol className="space-y-0">
                  {result.streamlined_architecture.map((phase, i) => (
                    <li
                      key={i}
                      className="flex gap-4 py-3"
                      style={{
                        borderBottom:
                          i < result.streamlined_architecture.length - 1
                            ? '1px solid rgba(255,255,255,0.05)'
                            : 'none',
                      }}
                    >
                      {/* Phase number */}
                      <span
                        className="font-extrabold shrink-0"
                        style={{
                          fontSize: '0.75rem',
                          color: FRICTION_ACCENT,
                          opacity: 0.45,
                          letterSpacing: '-0.02em',
                          paddingTop: '2px',
                          minWidth: '20px',
                        }}
                      >
                        {phase.phase}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">{phase.name}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {phase.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Efficiency Signal — closing statement */}
            <div
              className="p-5 rounded-xl flex items-start gap-4"
              style={{
                background: 'rgba(249,115,22,0.03)',
                border: '1px solid rgba(249,115,22,0.1)',
              }}
            >
              <div
                className="p-1.5 rounded shrink-0"
                style={{ background: 'rgba(249,115,22,0.08)', marginTop: '2px' }}
              >
                <Zap size={11} style={{ color: FRICTION_ACCENT, opacity: 0.7 }} />
              </div>
              <div>
                <p className="section-label mb-1.5" style={{ color: FRICTION_ACCENT, opacity: 0.7 }}>Efficiency Signal</p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.72)', fontStyle: 'italic' }}
                >
                  “{result.efficiency_signal}”
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: 'chaos',   label: 'Chaos Translator',  accent: 'var(--theme-accent, #00f0ff)' },
  { key: 'bloat',   label: 'Bloat Detector',     accent: '#8b5cf6' },
  { key: 'friction', label: 'Friction Auditor',  accent: FRICTION_ACCENT },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Tools() {
  const [activeTab, setActiveTab] = useState('chaos');

  return (
    <div data-testid="tools-page" className="pt-16">
      <header
        className="pt-24 pb-14 max-w-4xl mx-auto px-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="section-label mb-4" style={{ color: 'var(--theme-accent, #00f0ff)' }}>Clarity Lab</p>
            <h1
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.06 }}
            >
              Operator tools.<br />
              <span
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(170,176,188,0.82) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Built from the method.
              </span>
            </h1>
          </div>
          <div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
              Three working instruments built from the same clarity-first framework.
              Run them against real problems for real output.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-32">
        {/* Tab bar — scrollable on mobile */}
        <div
          data-testid="tools-tabs"
          className="flex gap-1 mb-8 p-1 rounded-xl overflow-x-auto"
          style={{
            background: 'rgba(18,21,28,0.95)',
            border: '1px solid rgba(255,255,255,0.07)',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                data-testid={`tools-tab-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2"
                style={{
                  background: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#08090a' : 'rgba(255,255,255,0.45)',
                  flexShrink: 0,
                }}
              >
                {tab.key === 'friction' && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isActive ? '#08090a' : tab.accent,
                      opacity: isActive ? 0.4 : 0.7,
                    }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'chaos'   && <ChaosTranslator />}
        {activeTab === 'bloat'   && <BloatDetector />}
        {activeTab === 'friction' && <FrictionAuditor />}

        <p
          className="mt-8 text-xs text-center"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Powered by AI. Output is directional, not prescriptive. Part of the Nemurium operator toolkit.
        </p>
      </div>
    </div>
  );
}
