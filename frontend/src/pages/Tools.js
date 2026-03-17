import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldAlert, Zap, Scissors, Copy, Check, AlertCircle, ArrowRight, Terminal, X, ChevronRight, RefreshCw, Wrench, Flame } from 'lucide-react';
import { toast } from 'sonner';
import { hapticMedium } from '../utils/haptics';
import { Skeleton } from '../components/ui/skeleton';
import { SEO } from '../components/SEO';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

// ─── Shared primitives ────────────────────────────────────────────────────────

function ErrorBanner({ error, onRetry, onFix }) {
  const parsed = parseError(error);
  return (
    <div
      className="mt-5 p-5 rounded-xl"
      style={{ background: 'rgba(251,113,133,0.05)', border: '1px solid rgba(251,113,133,0.18)' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <AlertCircle size={14} style={{ color: '#fb7185', flexShrink: 0, marginTop: '2px' }} />
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: '#fb7185' }}>{parsed.title}</p>
          {parsed.detail && (
            <p className="text-xs mt-1" style={{ color: 'rgba(251,113,133,0.7)' }}>{parsed.detail}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 ml-6">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
          style={{
            background: 'rgba(251,113,133,0.1)',
            border: '1px solid rgba(251,113,133,0.2)',
            color: '#fb7185',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(251,113,133,0.18)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(251,113,133,0.1)'; }}
        >
          <RefreshCw size={11} /> Try again
        </button>
        {parsed.fixable && onFix && (
          <button
            onClick={onFix}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{
              background: 'rgba(0,240,255,0.06)',
              border: '1px solid rgba(0,240,255,0.15)',
              color: 'var(--theme-accent, #00f0ff)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,240,255,0.12)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,240,255,0.06)'; }}
          >
            <Wrench size={11} /> Fix it
          </button>
        )}
      </div>
    </div>
  );
}

function parseError(message) {
  const lower = (message || '').toLowerCase();
  if (lower.includes('too short') || lower.includes('at least')) {
    return { title: 'Input too short', detail: 'Add more detail or context for a better analysis.', fixable: true, fixType: 'expand' };
  }
  if (lower.includes('too long') || lower.includes('3000')) {
    return { title: 'Input too long', detail: 'Trim your input to under 3,000 characters.', fixable: true, fixType: 'trim' };
  }
  if (lower.includes('parse') || lower.includes('json')) {
    return { title: 'AI response was malformed', detail: 'The AI returned an unexpected format. Running again usually fixes this.', fixable: false };
  }
  if (lower.includes('not configured') || lower.includes('llm service')) {
    return { title: 'Service unavailable', detail: 'The AI service is not configured on the server. Contact support.', fixable: false };
  }
  if (lower.includes('network') || lower.includes('fetch') || lower.includes('failed to fetch')) {
    return { title: 'Network error', detail: 'Could not reach the server. Check your connection and try again.', fixable: false };
  }
  return { title: message || 'Something went wrong', detail: null, fixable: false };
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

function ToolCTA({ accent, resultText }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clarity-lab-result.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Result exported.');
    setTimeout(() => setExporting(false), 1500);
  };

  return (
    <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
        What to do with this
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <Link
          to="/contact"
          state={{ service: 'Clarity Teardown' }}
          className="p-4 rounded-xl text-left transition-all duration-200"
          style={{ background: `rgba(255,255,255,0.03)`, border: `1px solid rgba(255,255,255,0.08)` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          <p className="text-sm font-semibold text-white mb-1">Turn this into a working plan</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Book a Clarity Teardown — starting at $1.5k.</p>
        </Link>
        <Link
          to="/contact"
          state={{ toolOutput: resultText, service: 'General Inquiry' }}
          className="p-4 rounded-xl text-left transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        >
          <p className="text-sm font-semibold text-white mb-1">Send this with your inquiry</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Pre-fill your contact form with this result.</p>
        </Link>
      </div>
      <button
        onClick={handleExport}
        disabled={exporting}
        className="mt-3 w-full p-3 rounded-xl text-left text-xs transition-all duration-200 disabled:opacity-50"
        style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
      >
        {exporting ? 'Exported ✓' : 'Export result as .txt'}
      </button>
    </div>
  );
}

function ToolInput({ value, onChange, placeholder, testid, focusColor, onExample, rows = 5, label = 'Describe the process' }) {
  const inputId = testid || 'tool-input';
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={inputId} className="section-label">{label}</label>
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
        id={inputId}
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
  const handleClick = () => {
    hapticMedium();
    onClick();
  };
  return (
    <div className="flex justify-end mt-5">
      <button
        data-testid="tools-submit-button"
        type="button"
        onClick={handleClick}
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

// ─── Skeleton Loaders ──────────────────────────────────────────────────────────

function ChaosSkeletonLoader() {
  return (
    <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
      <div className="flex items-center gap-2 mb-5">
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Analyzing structure…</span>
      </div>
      <Skeleton className="h-5 w-3/4 mb-3 bg-white/[0.06]" />
      <Skeleton className="h-4 w-1/2 mb-6 bg-white/[0.04]" />
      <div className="grid grid-cols-2 gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="p-4 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
            <Skeleton className="h-3 w-8 mb-3 bg-cyan-400/10" />
            <Skeleton className="h-4 w-3/4 mb-2 bg-white/[0.06]" />
            <Skeleton className="h-3 w-full bg-white/[0.04]" />
            <Skeleton className="h-3 w-2/3 mt-1 bg-white/[0.03]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BloatSkeletonLoader() {
  return (
    <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
      <div className="flex items-center gap-2 mb-5">
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/10 border-t-violet-400/60 animate-spin" />
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Scanning for feature sprawl…</span>
      </div>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Core', color: 'rgba(0,240,255,0.06)' },
          { label: 'Drift', color: 'rgba(251,113,133,0.06)' },
          { label: 'Keep', color: 'rgba(139,92,246,0.06)' },
        ].map((col) => (
          <div key={col.label} className="p-5 rounded-xl" style={{ background: col.color, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Skeleton className="h-2.5 w-16 mb-4 bg-white/[0.08]" />
            <Skeleton className="h-4 w-full mb-2 bg-white/[0.05]" />
            <Skeleton className="h-3 w-4/5 mb-2 bg-white/[0.04]" />
            <Skeleton className="h-3 w-3/5 bg-white/[0.03]" />
          </div>
        ))}
      </div>
      <div className="p-5 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
        <Skeleton className="h-2.5 w-24 mb-3 bg-white/[0.08]" />
        <Skeleton className="h-4 w-full mb-2 bg-white/[0.05]" />
        <Skeleton className="h-3 w-3/4 bg-white/[0.04]" />
      </div>
    </div>
  );
}

function FrictionSkeletonLoader() {
  return (
    <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
      <div className="flex items-center gap-2 mb-5">
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/10 border-t-orange-400/60 animate-spin" />
        <span className="text-xs font-medium" style={{ color: FRICTION_ACCENT, opacity: 0.6 }}>Auditing process flow…</span>
      </div>
      <div className="p-5 rounded-xl mb-4" style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.1)' }}>
        <Skeleton className="h-2.5 w-2/5 mb-3 bg-orange-400/10" />
        <Skeleton className="h-4 w-[90%] mb-2 bg-white/[0.06]" />
        <Skeleton className="h-3.5 w-[70%] bg-white/[0.04]" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="p-5 rounded-xl" style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.08)' }}>
          <Skeleton className="h-2.5 w-1/2 mb-4 bg-rose-400/10" />
          {[1,2,3].map(i => <Skeleton key={i} className="h-8 w-full mb-2 bg-white/[0.04]" />)}
        </div>
        <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Skeleton className="h-2.5 w-[55%] mb-4 bg-white/[0.08]" />
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-7 w-full mb-2 bg-white/[0.04]" />)}
        </div>
      </div>
      <div className="p-4 rounded-xl" style={{ background: 'rgba(249,115,22,0.03)', border: '1px solid rgba(249,115,22,0.08)' }}>
        <Skeleton className="h-2.5 w-[30%] mb-3 bg-orange-400/8" />
        <Skeleton className="h-4 w-[85%] bg-white/[0.05]" />
      </div>
    </div>
  );
}

function ScopeSkeletonLoader() {
  return (
    <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
      <div className="flex items-center gap-2 mb-5">
        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/10 border-t-emerald-400/60 animate-spin" />
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Slicing scope…</span>
      </div>
      {/* Core Bet */}
      <div className="p-5 rounded-xl mb-4" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)' }}>
        <Skeleton className="h-2.5 w-20 mb-3 bg-emerald-400/10" />
        <Skeleton className="h-4 w-[90%] mb-2 bg-white/[0.06]" />
        <Skeleton className="h-3 w-[60%] bg-white/[0.04]" />
      </div>
      {/* MVP + Deferred */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="p-5 rounded-xl" style={{ background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.08)' }}>
          <Skeleton className="h-2.5 w-24 mb-4 bg-emerald-400/8" />
          {[1,2,3].map(i => <Skeleton key={i} className="h-10 w-full mb-2 bg-white/[0.04]" />)}
        </div>
        <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Skeleton className="h-2.5 w-28 mb-4 bg-white/[0.08]" />
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-8 w-full mb-2 bg-white/[0.04]" />)}
        </div>
      </div>
      {/* Cut + Signal */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl" style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.08)' }}>
          <Skeleton className="h-2.5 w-24 mb-4 bg-rose-400/8" />
          {[1,2].map(i => <Skeleton key={i} className="h-6 w-full mb-2 bg-white/[0.04]" />)}
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.08)' }}>
          <Skeleton className="h-2.5 w-28 mb-3 bg-emerald-400/8" />
          <Skeleton className="h-4 w-[85%] bg-white/[0.05]" />
        </div>
      </div>
    </div>
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
      let data;
      try { data = await res.json(); } catch { throw new Error('Unexpected server response. Please try again.'); }
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data.data);
    } catch (err) { console.error('ChaosTranslator error:', err); setError(err.message || 'System disruption. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleFix = () => {
    const parsed = parseError(error);
    if (parsed.fixType === 'expand') {
      setInput(prev => prev + '\n\n[Add more context: who is the target user? What problem does this solve? What does success look like?]');
    } else if (parsed.fixType === 'trim') {
      setInput(prev => prev.slice(0, 2900));
    }
    setError('');
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Summary:\n${result.summary}\n\nSteps:\n${result.steps.map(s => `${s.stepNumber}. ${s.title}\n${s.content}`).join('\n\n')}`
    ).then(() => {
      setCopied(true); toast.success('Output copied.');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => toast.error('Failed to copy to clipboard.'));
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
        {error && <ErrorBanner error={error} onRetry={run} onFix={handleFix} />}
        {loading && <ChaosSkeletonLoader />}

        {result && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <OutputHeader accent="var(--theme-accent, #00f0ff)" copied={copied} onCopy={copy} />
            <div className="p-5 rounded-xl mb-5" style={{ background: 'rgba(0,240,255,0.035)', border: '1px solid rgba(0,240,255,0.12)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)', fontStyle: 'italic' }}>
                "{result.summary}"
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
            <ToolCTA
              accent="var(--theme-accent, #00f0ff)"
              resultText={`Summary:\n${result.summary}\n\nSteps:\n${result.steps.map(s => `${s.stepNumber}. ${s.title}\n${s.content}`).join('\n\n')}`}
            />
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
      let data;
      try { data = await res.json(); } catch { throw new Error('Unexpected server response. Please try again.'); }
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data.data);
    } catch (err) { console.error('BloatDetector error:', err); setError(err.message || 'Scanner failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleFix = () => {
    const parsed = parseError(error);
    if (parsed.fixType === 'expand') {
      setInput(prev => prev + '\n\n[Add more context: what features exist? What is the core promise? Who is the user?]');
    } else if (parsed.fixType === 'trim') {
      setInput(prev => prev.slice(0, 2900));
    }
    setError('');
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Core Value:\n${result.core_value}\n\nBloat Detected:\n${result.bloat_items.map(i => `• ${i}`).join('\n')}\n\nKeep:\n${result.keep_items.map(i => `• ${i}`).join('\n')}\n\nRecommendation:\n${result.recommendation}`
    ).then(() => {
      setCopied(true); toast.success('Output copied.');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => toast.error('Failed to copy to clipboard.'));
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
        {error && <ErrorBanner error={error} onRetry={run} onFix={handleFix} />}
        {loading && <BloatSkeletonLoader />}

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
            <ToolCTA
              accent="#8b5cf6"
              resultText={`Core Value: ${result.core_value}\n\nBloat: ${result.bloat_items.join(', ')}\n\nKeep: ${result.keep_items.join(', ')}\n\nRecommendation: ${result.recommendation}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tool 3: Friction Auditor ─────────────────────────────────────────────────
const FRICTION_ACCENT = '#f97316';

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
      let data;
      try { data = await res.json(); } catch { throw new Error('Unexpected server response. Please try again.'); }
      if (!res.ok) throw new Error(data.detail || 'Audit failed.');
      setResult(data.data);
    } catch (err) { console.error('FrictionAuditor error:', err); setError(err.message || 'Audit failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleFix = () => {
    const parsed = parseError(error);
    if (parsed.fixType === 'expand') {
      setInput(prev => prev + '\n\n[Add more detail: walk through each step, who is involved, what tools are used, how long each step takes.]');
    } else if (parsed.fixType === 'trim') {
      setInput(prev => prev.slice(0, 2900));
    }
    setError('');
  };

  const copy = () => {
    if (!result) return;
    const lines = [
      `Primary Bottleneck:\n${result.bottleneck}`,
      `\nSteps to Eliminate:\n${result.eliminate_steps.map(s => `— ${s.step}: ${s.reason}`).join('\n')}`,
      `\nStreamlined Architecture:\n${result.streamlined_architecture.map(p => `${p.phase}. ${p.name}: ${p.description}`).join('\n')}`,
      `\nEfficiency Signal:\n${result.efficiency_signal}`,
    ];
    navigator.clipboard.writeText(lines.join('')).then(() => {
      setCopied(true); toast.success('Audit output copied.');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => toast.error('Failed to copy to clipboard.'));
  };

  return (
    <div
      data-testid="tools-tab-friction-auditor"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0c0e12', border: `1px solid rgba(249,115,22,0.14)` }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(to right, transparent, rgba(249,115,22,0.4), transparent)` }} />
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-7">
          <div className="p-2.5 rounded-lg shrink-0 mt-0.5" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
            <Zap size={16} style={{ color: FRICTION_ACCENT }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">The Friction Auditor</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Paste a clunky business process. Get the bottleneck diagnosed, dead steps identified, and a leaner architecture designed.
            </p>
          </div>
        </div>

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

        <SubmitButton loading={loading} onClick={run} loadingText="Auditing process…" idleText="Run the Audit" icon={Zap} />
        {error && <ErrorBanner error={error} onRetry={run} onFix={handleFix} />}
        {loading && <FrictionSkeletonLoader />}

        {result && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <OutputHeader accent={FRICTION_ACCENT} copied={copied} onCopy={copy} />

            {/* Primary Bottleneck */}
            <div className="p-6 rounded-xl mb-5 relative overflow-hidden" style={{ background: 'rgba(249,115,22,0.05)', border: `1px solid rgba(249,115,22,0.22)` }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, ${FRICTION_ACCENT}, rgba(249,115,22,0.3), transparent)` }} />
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded shrink-0 mt-0.5" style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}>
                  <Zap size={12} style={{ color: FRICTION_ACCENT }} />
                </div>
                <div>
                  <p className="section-label mb-2" style={{ color: FRICTION_ACCENT }}>Primary Bottleneck</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>{result.bottleneck}</p>
                </div>
              </div>
            </div>

            {/* Steps to Eliminate + Streamlined Architecture */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-5 rounded-xl" style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.12)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <X size={12} style={{ color: '#fb7185' }} />
                  <p className="section-label" style={{ color: '#fb7185' }}>Steps to Eliminate</p>
                </div>
                <ul className="space-y-3">
                  {result.eliminate_steps.map((item, i) => (
                    <li key={i} className="flex flex-col gap-0.5">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold shrink-0" style={{ color: '#fb7185', opacity: 0.6, marginTop: '1px' }}>—</span>
                        <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.72)', textDecoration: 'line-through', textDecorationColor: 'rgba(251,113,133,0.35)', textDecorationThickness: '1px' }}>{item.step}</span>
                      </div>
                      <p className="text-xs leading-relaxed pl-4" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <p className="section-label">Streamlined Architecture</p>
                </div>
                <ol className="space-y-0">
                  {result.streamlined_architecture.map((phase, i) => (
                    <li key={i} className="flex gap-4 py-3" style={{ borderBottom: i < result.streamlined_architecture.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <span className="font-extrabold shrink-0" style={{ fontSize: '0.75rem', color: FRICTION_ACCENT, opacity: 0.45, letterSpacing: '-0.02em', paddingTop: '2px', minWidth: '20px' }}>{phase.phase}</span>
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">{phase.name}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{phase.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Efficiency Signal */}
            <div className="p-5 rounded-xl flex items-start gap-4" style={{ background: 'rgba(249,115,22,0.03)', border: '1px solid rgba(249,115,22,0.1)' }}>
              <div className="p-1.5 rounded shrink-0" style={{ background: 'rgba(249,115,22,0.08)', marginTop: '2px' }}>
                <Zap size={11} style={{ color: FRICTION_ACCENT, opacity: 0.7 }} />
              </div>
              <div>
                <p className="section-label mb-1.5" style={{ color: FRICTION_ACCENT, opacity: 0.7 }}>Efficiency Signal</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontStyle: 'italic' }}>"{result.efficiency_signal}"</p>
              </div>
            </div>
            <ToolCTA
              accent={FRICTION_ACCENT}
              resultText={`Bottleneck: ${result.bottleneck}\n\nEliminate: ${result.eliminate_steps.map(s => s.step).join(', ')}\n\nEfficiency Signal: ${result.efficiency_signal}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tool 4: Scope Slicer ─────────────────────────────────────────────────────
const SCOPE_ACCENT = '#10b981'; // emerald — precision, sharpness

function ScopeSlicer() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (input.trim().length < 10) { setError('Please describe your project scope in more detail.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BACKEND}/api/tools/scope-slice`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      let data;
      try { data = await res.json(); } catch { throw new Error('Unexpected server response. Please try again.'); }
      if (!res.ok) throw new Error(data.detail || 'Scope analysis failed.');
      setResult(data.data);
    } catch (err) { console.error('ScopeSlicer error:', err); setError(err.message || 'Scope analysis failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleFix = () => {
    const parsed = parseError(error);
    if (parsed.fixType === 'expand') {
      setInput(prev => prev + '\n\n[Add more detail: list every feature you plan to build, who the target user is, and what the core problem is.]');
    } else if (parsed.fixType === 'trim') {
      setInput(prev => prev.slice(0, 2900));
    }
    setError('');
  };

  const copy = () => {
    if (!result) return;
    const lines = [
      `Core Bet:\n${result.core_bet}`,
      `\nMVP Scope:\n${result.mvp_scope.map(f => `• ${f.feature}: ${f.reason}`).join('\n')}`,
      `\nDeferred:\n${result.deferred.map(f => `• ${f.feature} (${f.version}): ${f.reason}`).join('\n')}`,
      `\nCut Entirely:\n${result.cut_entirely.map(c => `✕ ${c}`).join('\n')}`,
      `\nLaunch Signal:\n${result.launch_signal}`,
    ];
    navigator.clipboard.writeText(lines.join('')).then(() => {
      setCopied(true); toast.success('Scope output copied.');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => toast.error('Failed to copy to clipboard.'));
  };

  return (
    <div
      data-testid="tools-tab-scope-slicer"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0c0e12', border: `1px solid rgba(16,185,129,0.14)` }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)` }} />
      <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-7">
          <div className="p-2.5 rounded-lg shrink-0 mt-0.5" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Scissors size={16} style={{ color: SCOPE_ACCENT }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">
              The Scope Slicer
              <span
                className="ml-2 text-xs font-semibold px-2 py-0.5 rounded align-middle"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  color: SCOPE_ACCENT,
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                }}
              >
                NEW
              </span>
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Paste an ambitious project scope. Get it ruthlessly sliced to a high-leverage MVP — what to build first, what to defer, and what to cut.
            </p>
          </div>
        </div>

        <ToolInput
          testid="tools-input-textarea-scope"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Describe everything you plan to build. List all features, integrations, and ideas — even the ambitious ones.\n\nExample: "We want to build a platform that does X, Y, Z with features A, B, C, D, E, F, G..."`}
          focusColor="rgba(16,185,129,0.3)"
          rows={6}
          onExample={() => setInput(
            'We\'re building an all-in-one platform for freelancers. It needs: time tracking, invoicing, proposal generation, client portal, project management with Kanban boards, a built-in CRM, expense tracking, tax estimation, contract templates with e-signatures, a public portfolio builder, real-time chat with clients, AI writing assistant for proposals, payment processing (Stripe + crypto), team collaboration features, white-label option for agencies, mobile app (iOS + Android), browser extension for time tracking, Slack/Discord integrations, and an analytics dashboard. We want to launch in 3 months with a team of 2 developers.'
          )}
        />

        <SubmitButton loading={loading} onClick={run} loadingText="Slicing scope…" idleText="Slice It Down" icon={Scissors} />
        {error && <ErrorBanner error={error} onRetry={run} onFix={handleFix} />}
        {loading && <ScopeSkeletonLoader />}

        {result && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <OutputHeader accent={SCOPE_ACCENT} copied={copied} onCopy={copy} />

            {/* Core Bet */}
            <div className="p-6 rounded-xl mb-5 relative overflow-hidden" style={{ background: 'rgba(16,185,129,0.05)', border: `1px solid rgba(16,185,129,0.22)` }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(to right, ${SCOPE_ACCENT}, rgba(16,185,129,0.3), transparent)` }} />
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded shrink-0 mt-0.5" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <Scissors size={12} style={{ color: SCOPE_ACCENT }} />
                </div>
                <div>
                  <p className="section-label mb-2" style={{ color: SCOPE_ACCENT }}>The Core Bet</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)', fontStyle: 'italic' }}>"{result.core_bet}"</p>
                </div>
              </div>
            </div>

            {/* MVP Scope + Deferred — side by side */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* MVP Scope */}
              <div className="p-5 rounded-xl" style={{ background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.12)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Check size={12} style={{ color: SCOPE_ACCENT }} />
                  <p className="section-label" style={{ color: SCOPE_ACCENT }}>Build in v1 (MVP)</p>
                </div>
                <ul className="space-y-3">
                  {result.mvp_scope.map((item, i) => (
                    <li key={i} className="flex flex-col gap-0.5">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: SCOPE_ACCENT, opacity: 0.7 }}>→</span>
                        <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>{item.feature}</span>
                      </div>
                      <p className="text-xs leading-relaxed pl-4" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deferred */}
              <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <p className="section-label">Defer to Later</p>
                </div>
                <ul className="space-y-3">
                  {result.deferred.map((item, i) => (
                    <li key={i} className="flex flex-col gap-0.5">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded shrink-0" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', fontSize: '0.6rem' }}>{item.version}</span>
                        <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.feature}</span>
                      </div>
                      <p className="text-xs leading-relaxed pl-10" style={{ color: 'rgba(255,255,255,0.35)' }}>{item.reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cut Entirely + Launch Signal */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Cut Entirely */}
              <div className="p-5 rounded-xl" style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.12)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <X size={12} style={{ color: '#fb7185' }} />
                  <p className="section-label" style={{ color: '#fb7185' }}>Cut Entirely</p>
                </div>
                <ul className="space-y-2">
                  {result.cut_entirely.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#fb7185', flexShrink: 0, marginTop: '2px', fontSize: '0.7rem' }}>✕</span>
                      <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through', textDecorationColor: 'rgba(251,113,133,0.3)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Launch Signal */}
              <div className="p-5 rounded-xl flex items-start gap-4" style={{ background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.1)' }}>
                <div className="p-1.5 rounded shrink-0" style={{ background: 'rgba(16,185,129,0.08)', marginTop: '2px' }}>
                  <Zap size={11} style={{ color: SCOPE_ACCENT, opacity: 0.7 }} />
                </div>
                <div>
                  <p className="section-label mb-1.5" style={{ color: SCOPE_ACCENT, opacity: 0.7 }}>Launch Signal</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', fontStyle: 'italic' }}>"{result.launch_signal}"</p>
                </div>
              </div>
            </div>
            <ToolCTA
              accent={SCOPE_ACCENT}
              resultText={`Core Bet: ${result.core_bet}\n\nMVP: ${result.mvp_scope.map(s => s.feature).join(', ')}\n\nDeferred: ${result.deferred.map(s => s.feature).join(', ')}\n\nCut: ${result.cut_entirely.join(', ')}\n\nLaunch Signal: ${result.launch_signal}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tool 5: Entropy Audit ───────────────────────────────────────────────────
const ENTROPY_ACCENT = '#2563eb';

function EntropyAudit() {
  const [input, setInput] = useState('');
  const [domain, setDomain] = useState('operations');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (input.trim().length < 10) { setError('Please provide at least a sentence of context.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BACKEND}/api/tools/entropy-audit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, domain }),
      });
      let data;
      try { data = await res.json(); } catch { throw new Error('Unexpected server response. Please try again.'); }
      if (!res.ok) throw new Error(data.detail || 'Audit failed.');
      setResult(data.data);
    } catch (err) { console.error('EntropyAudit error:', err); setError(err.message || 'System disruption. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleFix = () => {
    const parsed = parseError(error);
    if (parsed.fixType === 'expand') {
      setInput(prev => prev + '\n\n[Add more: what are you worried about? What tasks are piling up? What feels urgent vs. what IS urgent?]');
    } else if (parsed.fixType === 'trim') {
      setInput(prev => prev.slice(0, 2900));
    }
    setError('');
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Noise: ${result.noise}\n\nSignal: ${result.signal}\n\nLeverage: ${result.leverage}\n${result.leverage_detail}`
    ).then(() => {
      setCopied(true); toast.success('Output copied.');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => toast.error('Failed to copy to clipboard.'));
  };

  return (
    <div
      data-testid="tools-tab-entropy-audit"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0c0e12', border: `1px solid ${ENTROPY_ACCENT}18` }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(to right, transparent, ${ENTROPY_ACCENT}50, transparent)` }} />
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-7">
          <div className="p-2.5 rounded-lg shrink-0 mt-0.5" style={{ background: `${ENTROPY_ACCENT}12`, border: `1px solid ${ENTROPY_ACCENT}25` }}>
            <Flame size={16} style={{ color: ENTROPY_ACCENT }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">The Entropy Audit</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Dump your current chaos. The system will isolate the signal from the noise.</p>
          </div>
        </div>

        <ToolInput
          testid="tools-entropy-input"
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Dump everything on your mind — tasks, worries, decisions, frustrations. The messier, the better."
          focusColor={`${ENTROPY_ACCENT}40`}
          onExample={() => setInput("I have 3 clients waiting, my invoices are late, I need to hire an admin but have no cash flow, I'm behind on a product launch, my co-founder wants to pivot, and I'm tired. Also need to update the website and respond to a partnership inquiry that's been sitting for 2 weeks.")}
        />

        {/* Domain toggle */}
        <div className="flex items-center gap-4 mt-4 mb-2">
          {['operations', 'strategy'].map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: domain === d ? ENTROPY_ACCENT : 'rgba(255,255,255,0.4)' }}>
              <input
                type="radio"
                name="entropy-domain"
                value={d}
                checked={domain === d}
                onChange={() => setDomain(d)}
                style={{ accentColor: ENTROPY_ACCENT }}
              />
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </label>
          ))}
        </div>

        <SubmitButton loading={loading} onClick={run} loadingText="Auditing entropy…" idleText="Run Analysis" icon={ArrowRight} />
        {error && <ErrorBanner error={error} onRetry={run} onFix={handleFix} />}

        {loading && (
          <div className="mt-8 space-y-4">
            <Skeleton className="h-28 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem' }}>
            <OutputHeader accent={ENTROPY_ACCENT} copied={copied} onCopy={copy} />

            {/* 3-column output grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* The Noise */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  opacity: 0.6,
                }}
              >
                <p className="text-xs font-bold mb-3" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>The Noise (Ignore)</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{result.noise}</p>
              </div>

              {/* The Signal */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(245,158,11,0.04)',
                  border: '1px solid rgba(245,158,11,0.15)',
                }}
              >
                <p className="text-xs font-bold mb-3" style={{ color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>The Signal (Fix)</p>
                <p className="text-sm font-semibold leading-relaxed text-white">{result.signal}</p>
              </div>

              {/* The Leverage */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(15,17,21,0.95)',
                  border: `1px solid ${ENTROPY_ACCENT}25`,
                }}
              >
                <p className="text-xs font-bold mb-3" style={{ color: ENTROPY_ACCENT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>The Leverage (Execute)</p>
                <p className="text-xl font-bold text-white mb-2">{result.leverage}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{result.leverage_detail}</p>
              </div>
            </div>

            <ToolCTA
              accent={ENTROPY_ACCENT}
              resultText={`Noise: ${result.noise}\n\nSignal: ${result.signal}\n\nLeverage: ${result.leverage}\n${result.leverage_detail}`}
            />
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
  { key: 'scope',   label: 'Scope Slicer',       accent: SCOPE_ACCENT },
  { key: 'entropy', label: 'Entropy Audit',      accent: ENTROPY_ACCENT },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Tools() {
  const [activeTab, setActiveTab] = useState('chaos');

  return (
    <div data-testid="tools-page" className="pt-16">
      <SEO title="Clarity Lab" description="AI-powered operator tools — translate chaos, detect bloat, audit friction, slice scope, and run entropy audits." path="/tools" />
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
              Five working instruments built from the same clarity-first framework.
              Run them against real problems for real output.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-32">
        {/* Tab bar */}
        <div
          data-testid="tools-tabs"
          role="tablist"
          aria-label="Clarity Lab tools"
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
                id={`tools-tab-${tab.key}`}
                data-testid={`tools-tab-${tab.key}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2"
                style={{
                  background: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#08090a' : 'rgba(255,255,255,0.45)',
                  flexShrink: 0,
                }}
              >
                {(tab.key === 'friction' || tab.key === 'scope' || tab.key === 'entropy') && (
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

        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tools-tab-${activeTab}`}>
          {activeTab === 'chaos'    && <ChaosTranslator />}
          {activeTab === 'bloat'    && <BloatDetector />}
          {activeTab === 'friction' && <FrictionAuditor />}
          {activeTab === 'scope'    && <ScopeSlicer />}
          {activeTab === 'entropy'  && <EntropyAudit />}
        </div>

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
