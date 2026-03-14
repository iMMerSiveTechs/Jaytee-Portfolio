import React, { useState } from 'react';
import { Sparkles, ShieldAlert, Copy, Check, AlertCircle, ArrowRight, Terminal } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

function SkeletonBlock({ style }) {
  return (
    <div
      className="rounded animate-pulse"
      style={{ background: 'rgba(255,255,255,0.055)', ...style }}
    />
  );
}

function ResultPanel({ children, accent = '#00f0ff' }) {
  return (
    <div
      className="mt-8"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingTop: '1.75rem',
      }}
    >
      {children}
    </div>
  );
}

function ToolInput({ value, onChange, placeholder, testid, focusColor, onExample, exampleLabel = 'Try an example', maxLength = 3000, rows = 5 }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="section-label">Your input</label>
        <button
          onClick={onExample}
          className="text-xs transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
        >
          {exampleLabel}
        </button>
      </div>
      <textarea
        data-testid={testid}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl text-sm text-white placeholder-white/20 focus:outline-none"
        style={{
          background: 'rgba(18,21,28,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '14px 16px',
          lineHeight: '1.65',
          transition: 'border-color 200ms',
          fontFamily: 'inherit',
        }}
        onFocus={(e) => { e.target.style.borderColor = focusColor; }}
        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
      />
      <div className="mt-1">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{value.length} / {maxLength}</span>
      </div>
    </div>
  );
}

function ChaosTranslator() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || input.length < 10) { setError('Please provide at least a sentence of context.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BACKEND}/api/tools/chaos-translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data.data);
    } catch (err) {
      setError(err.message || 'System disruption. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Summary:\n${result.summary}\n\nSteps:\n${result.steps.map(s => `${s.stepNumber}. ${s.title}\n${s.content}`).join('\n\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Output copied.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="tools-tab-chaos-translator"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{
        background: '#0c0e12',
        border: '1px solid rgba(0,240,255,0.1)',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.3), transparent)',
      }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-7">
          <div className="flex items-start gap-4">
            <div
              className="p-2.5 rounded-lg shrink-0 mt-0.5"
              style={{ background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.14)' }}
            >
              <Sparkles size={16} style={{ color: '#00f0ff' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">The Chaos Translator</h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Paste overloaded thinking. Get structure, direction, and a clear first step.</p>
            </div>
          </div>
        </div>

        <ToolInput
          testid="tools-input-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the situation. What's the idea, the problem, or the mess? The more honest, the better the output."
          focusColor="rgba(0,240,255,0.25)"
          onExample={() => setInput("I have an idea for a local service app but it also has a marketplace and a SaaS tool for businesses, and I want to add a social feed, and I don't know who to sell to first or what the core product even is.")}
        />

        <div className="flex justify-end mt-5">
          <button
            data-testid="tools-submit-button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#ffffff', color: '#08090a' }}
          >
            {loading ? (
              <><span className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black/70 animate-spin" /> Analyzing…</>
            ) : (
              <><span>Structure this</span><ArrowRight size={13} /></>
            )}
          </button>
        </div>

        {error && (
          <div
            className="mt-5 p-4 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(251,113,133,0.05)', border: '1px solid rgba(251,113,133,0.18)' }}
          >
            <AlertCircle size={14} style={{ color: '#fb7185', flexShrink: 0, marginTop: '1px' }} />
            <span className="text-sm" style={{ color: '#fb7185' }}>{error}</span>
          </div>
        )}

        {loading && (
          <ResultPanel>
            <p className="section-label mb-4">Diagnosing…</p>
            <div className="space-y-3">
              <SkeletonBlock style={{ height: '18px', width: '75%' }} />
              <SkeletonBlock style={{ height: '14px', width: '55%' }} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              {[1,2,3,4].map(i => <SkeletonBlock key={i} style={{ height: '88px' }} />)}
            </div>
          </ResultPanel>
        )}

        {result && (
          <ResultPanel accent="#00f0ff">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Terminal size={12} style={{ color: '#00f0ff' }} />
                <span className="section-label" style={{ color: '#00f0ff' }}>Output</span>
              </div>
              <button
                data-testid="tools-copy-output-button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
              </button>
            </div>

            {/* Summary */}
            <div
              className="p-5 rounded-xl mb-5"
              style={{
                background: 'rgba(0,240,255,0.035)',
                border: '1px solid rgba(0,240,255,0.12)',
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.82)', fontStyle: 'italic' }}
              >
                “{result.summary}”
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {result.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="flex gap-5 p-4 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span
                    className="font-extrabold shrink-0"
                    style={{ color: '#00f0ff', opacity: 0.5, fontSize: '0.75rem', paddingTop: '2px', letterSpacing: '-0.02em' }}
                  >
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ResultPanel>
        )}
      </div>
    </div>
  );
}

function BloatDetector() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || input.length < 10) { setError('Please provide at least a sentence of context.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BACKEND}/api/tools/bloat-detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data.data);
    } catch (err) {
      setError(err.message || 'Scanner failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Core Value:\n${result.core_value}\n\nBloat Detected:\n${result.bloat_items.map(i => `• ${i}`).join('\n')}\n\nKeep:\n${result.keep_items.map(i => `• ${i}`).join('\n')}\n\nRecommendation:\n${result.recommendation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Output copied.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="tools-tab-bloat-detector"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{
        background: '#0c0e12',
        border: '1px solid rgba(139,92,246,0.12)',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.35), transparent)',
      }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-7">
          <div
            className="p-2.5 rounded-lg shrink-0 mt-0.5"
            style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.16)' }}
          >
            <ShieldAlert size={16} style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">The Bloat Detector</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Paste a feature list, pitch, or roadmap. Find the core, identify the drift, and get a cut recommendation.</p>
          </div>
        </div>

        <ToolInput
          testid="tools-input-textarea-bloat"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="List the features, describe the product, or paste the pitch. What does it do? What's it supposed to do? Who is it for?"
          focusColor="rgba(139,92,246,0.25)"
          onExample={() => setInput("Our new fitness app tracks workouts, counts calories, has a social feed with stories, sells crypto tokens for steps, offers live coaching sessions, has a marketplace for gym gear, and provides AI meal planning. Core promise: help people exercise more.")}
        />

        <div className="flex justify-end mt-5">
          <button
            data-testid="tools-submit-button-bloat"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#ffffff', color: '#08090a' }}
          >
            {loading ? (
              <><span className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black/70 animate-spin" /> Scanning…</>
            ) : (
              <><span>Detect Bloat</span><ShieldAlert size={13} /></>
            )}
          </button>
        </div>

        {error && (
          <div
            className="mt-5 p-4 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(251,113,133,0.05)', border: '1px solid rgba(251,113,133,0.18)' }}
          >
            <AlertCircle size={14} style={{ color: '#fb7185', flexShrink: 0, marginTop: '1px' }} />
            <span className="text-sm" style={{ color: '#fb7185' }}>{error}</span>
          </div>
        )}

        {loading && (
          <ResultPanel>
            <p className="section-label mb-4">Scanning for feature sprawl…</p>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3].map(i => <SkeletonBlock key={i} style={{ height: '110px' }} />)}
            </div>
          </ResultPanel>
        )}

        {result && (
          <ResultPanel accent="#8b5cf6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Terminal size={12} style={{ color: '#8b5cf6' }} />
                <span className="section-label" style={{ color: '#8b5cf6' }}>Output</span>
              </div>
              <button
                data-testid="tools-copy-output-button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.12)' }}
              >
                <p className="section-label mb-3" style={{ color: '#00f0ff' }}>The True Core</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{result.core_value}</p>
              </div>
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.15)' }}
              >
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
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(139,92,246,0.03)', border: '1px solid rgba(139,92,246,0.12)' }}
              >
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

            <div
              className="p-5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="section-label mb-3">Recommendation</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>{result.recommendation}</p>
            </div>
          </ResultPanel>
        )}
      </div>
    </div>
  );
}

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
            <p className="section-label mb-4" style={{ color: '#00f0ff' }}>Clarity Lab</p>
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
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
            >
              These are working instruments—not demos. They reflect the same clarity-first process used in direct engagements. Run them against real problems for real output.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-32">
        {/* Tab bar */}
        <div
          data-testid="tools-tabs"
          className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{
            background: 'rgba(18,21,28,0.95)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {[
            { key: 'chaos', label: 'Chaos Translator', accent: '#00f0ff' },
            { key: 'bloat', label: 'Bloat Detector', accent: '#8b5cf6' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.key ? '#ffffff' : 'transparent',
                color: activeTab === tab.key ? '#08090a' : 'rgba(255,255,255,0.45)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'chaos' && <ChaosTranslator />}
        {activeTab === 'bloat' && <BloatDetector />}

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
