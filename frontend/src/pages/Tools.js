import React, { useState } from 'react';
import { Sparkles, ShieldAlert, Copy, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

function SkeletonBlock({ className, style }) {
  return (
    <div
      className={`rounded animate-pulse ${className}`}
      style={{ background: 'rgba(255,255,255,0.06)', ...style }}
    />
  );
}

function ChaosTranslator() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || input.length < 10) {
      setError('Please provide at least a sentence of context.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
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
    const text = `Summary:\n${result.summary}\n\nSteps:\n${result.steps.map(s => `${s.stepNumber}. ${s.title}: ${s.content}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Output copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const examplePrompt = "I have an idea for a local service app but it also has a marketplace and a SaaS tool for businesses, and I want to add a social feed, and I don't know who to sell to first...";

  return (
    <div
      data-testid="tools-tab-chaos-translator"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0f1115', border: '1px solid rgba(255,255,255,0.09)' }}
    >
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)' }}>
            <Sparkles size={18} style={{ color: '#00f0ff' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">The Chaos Translator</h2>
            <p className="text-sm text-white/45">Dump your messy, overloaded project idea or business problem. Get structured clarity.</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="section-label">Your input</label>
            <button
              onClick={() => setInput(examplePrompt)}
              className="text-xs text-white/35 hover:text-white/60 transition-colors duration-200"
            >
              Try an example
            </button>
          </div>
          <textarea
            data-testid="tools-input-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            maxLength={3000}
            placeholder="E.g., I have an idea for a local service app but it also has a marketplace and I don’t know where to start..."
            className="w-full resize-none rounded-xl text-sm text-white placeholder-white/25 focus:outline-none"
            style={{
              background: 'rgba(22,25,32,0.8)',
              border: '1px solid rgba(255,255,255,0.09)',
              padding: '14px 16px',
              lineHeight: '1.6',
              transition: 'border-color 200ms',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-white/25">{input.length}/3000</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            data-testid="tools-submit-button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing…' : <><span>Structure Chaos</span> <ArrowRight size={14} /></>}
          </button>
        </div>

        {error && (
          <div className="mt-5 p-4 rounded-xl flex items-start gap-3 text-sm" style={{ background: 'rgba(251,113,133,0.06)', border: '1px solid rgba(251,113,133,0.2)' }}>
            <AlertCircle size={15} style={{ color: '#fb7185', marginTop: '1px', flexShrink: 0 }} />
            <span style={{ color: '#fb7185' }}>{error}</span>
          </div>
        )}

        {loading && (
          <div className="mt-8 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
            <p className="section-label">Diagnosing systems…</p>
            <SkeletonBlock style={{ height: '20px', width: '80%' }} />
            <SkeletonBlock style={{ height: '16px', width: '60%' }} />
            <div className="grid grid-cols-2 gap-3 mt-4">
              <SkeletonBlock style={{ height: '80px' }} />
              <SkeletonBlock style={{ height: '80px' }} />
              <SkeletonBlock style={{ height: '80px' }} />
              <SkeletonBlock style={{ height: '80px' }} />
            </div>
          </div>
        )}

        {result && (
          <div
            data-testid="tools-output-panel"
            className="mt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="section-label" style={{ color: '#00f0ff' }}>Output</p>
              <button
                data-testid="tools-copy-output-button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white/75 transition-colors duration-200"
              >
                {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy output</>}
              </button>
            </div>

            <p className="text-base font-medium mb-7" style={{ color: '#00f0ff' }}>{result.summary}</p>

            <div className="grid md:grid-cols-2 gap-4">
              {result.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-xl"
                  style={{ background: 'rgba(22,25,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="section-label mb-2" style={{ color: '#00f0ff', fontSize: '0.6rem' }}>{step.stepNumber}</div>
                  <h4 className="text-white font-bold text-sm mb-2">{step.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>
          </div>
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
    if (!input.trim() || input.length < 10) {
      setError('Please provide at least a sentence of context.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
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
    const text = `Core Value:\n${result.core_value}\n\nBloat Detected:\n${result.bloat_items.join('\n')}\n\nKeep:\n${result.keep_items.join('\n')}\n\nRecommendation:\n${result.recommendation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Output copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const examplePrompt = "Our new fitness app tracks workouts, counts calories, has a social feed with stories, sells crypto tokens for steps, offers live coaching sessions, has a marketplace for gym gear, and provides AI meal planning.";

  return (
    <div
      data-testid="tools-tab-bloat-detector"
      className="p-7 md:p-10 rounded-2xl relative overflow-hidden"
      style={{ background: '#0f1115', border: '1px solid rgba(255,255,255,0.09)' }}
    >
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}>
            <ShieldAlert size={18} style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">The Bloat Detector</h2>
            <p className="text-sm text-white/45">Paste a feature list or product roadmap. Find the dilution, identify off-core drift, and protect what matters.</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="section-label">Your input</label>
            <button
              onClick={() => setInput(examplePrompt)}
              className="text-xs text-white/35 hover:text-white/60 transition-colors duration-200"
            >
              Try an example
            </button>
          </div>
          <textarea
            data-testid="tools-input-textarea-bloat"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            maxLength={3000}
            placeholder="E.g., Our app does X, Y, Z, also has a marketplace, social feed, and three different user types..."
            className="w-full resize-none rounded-xl text-sm text-white placeholder-white/25 focus:outline-none"
            style={{
              background: 'rgba(22,25,32,0.8)',
              border: '1px solid rgba(255,255,255,0.09)',
              padding: '14px 16px',
              lineHeight: '1.6',
              transition: 'border-color 200ms',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(139,92,246,0.3)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-white/25">{input.length}/3000</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            data-testid="tools-submit-button-bloat"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Scanning…' : <><span>Detect Bloat</span> <ShieldAlert size={14} /></>}
          </button>
        </div>

        {error && (
          <div className="mt-5 p-4 rounded-xl flex items-start gap-3 text-sm" style={{ background: 'rgba(251,113,133,0.06)', border: '1px solid rgba(251,113,133,0.2)' }}>
            <AlertCircle size={15} style={{ color: '#fb7185', marginTop: '1px', flexShrink: 0 }} />
            <span style={{ color: '#fb7185' }}>{error}</span>
          </div>
        )}

        {loading && (
          <div className="mt-8 space-y-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
            <p className="section-label">Scanning for feature sprawl…</p>
            <div className="grid grid-cols-3 gap-3">
              <SkeletonBlock style={{ height: '100px' }} />
              <SkeletonBlock style={{ height: '100px' }} />
              <SkeletonBlock style={{ height: '100px' }} />
            </div>
          </div>
        )}

        {result && (
          <div
            data-testid="tools-output-panel-bloat"
            className="mt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="section-label" style={{ color: '#8b5cf6' }}>Output</p>
              <button
                data-testid="tools-copy-output-button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white/75 transition-colors duration-200"
              >
                {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy output</>}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.15)' }}
              >
                <h4 className="section-label mb-3" style={{ color: '#00f0ff' }}>The True Core</h4>
                <p className="text-sm text-white/65 leading-relaxed">{result.core_value}</p>
              </div>
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(251,113,133,0.04)', border: '1px solid rgba(251,113,133,0.18)' }}
              >
                <h4 className="section-label mb-3" style={{ color: '#fb7185' }}>Bloat Detected</h4>
                <ul className="space-y-2">
                  {result.bloat_items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                      <span style={{ color: '#fb7185', flexShrink: 0, marginTop: '1px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="p-5 rounded-xl"
                style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)' }}
              >
                <h4 className="section-label mb-3" style={{ color: '#8b5cf6' }}>Keep</h4>
                <ul className="space-y-2">
                  {result.keep_items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                      <span style={{ color: '#8b5cf6', flexShrink: 0, marginTop: '1px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="mt-4 p-5 rounded-xl"
              style={{ background: 'rgba(22,25,32,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <h4 className="section-label mb-3">Cut Recommendation</h4>
              <p className="text-sm text-white/65 leading-relaxed">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Tools() {
  const [activeTab, setActiveTab] = useState('chaos');

  return (
    <div data-testid="tools-page" className="pt-16">
      <header className="pt-24 pb-14 max-w-4xl mx-auto px-6">
        <p className="section-label mb-4" style={{ color: '#00f0ff' }}>Clarity Lab</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-5">
          Operator tools.<br />
          <span className="metallic-text">Built from the method.</span>
        </h1>
        <p className="text-xl text-white/50 max-w-2xl" style={{ fontWeight: 300 }}>
          Intelligent tools to accelerate the clarity process. Designed to structure chaos and triage bloat instantly.
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-32">
        {/* Tab selector */}
        <div
          data-testid="tools-tabs"
          className="flex gap-2 mb-8 p-1 rounded-xl w-fit"
          style={{ background: 'rgba(22,25,32,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <button
            onClick={() => setActiveTab('chaos')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === 'chaos'
                ? 'bg-white text-black'
                : 'text-white/50 hover:text-white/75'
            }`}
          >
            Chaos Translator
          </button>
          <button
            onClick={() => setActiveTab('bloat')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === 'bloat'
                ? 'bg-white text-black'
                : 'text-white/50 hover:text-white/75'
            }`}
          >
            Bloat Detector
          </button>
        </div>

        {activeTab === 'chaos' && <ChaosTranslator />}
        {activeTab === 'bloat' && <BloatDetector />}

        {/* Footer note */}
        <p className="mt-8 text-xs text-white/25 text-center">
          These tools are powered by AI and reflect the clarity architecture framework. Results are directional, not prescriptive.
        </p>
      </div>
    </div>
  );
}
