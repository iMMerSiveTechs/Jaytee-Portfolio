import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Box, GitMerge, Crosshair, Shield,
  Sparkles, ShieldAlert, ArrowUpRight, Zap
} from 'lucide-react';

// Subtle dot-grid pattern SVG as data URI
const DOT_GRID = `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='rgba(255,255,255,0.055)'/%3E%3C/svg%3E")`;

const sequenceSteps = [
  { num: '01', title: 'Structure', desc: 'Find the true shape inside the mess. Name what it actually is, not what it feels like.', accent: '#00f0ff', testid: 'operating-sequence-step-structure' },
  { num: '02', title: 'Connect', desc: 'See how the parts fit a larger architecture. Understand the system before touching it.', accent: '#3b82f6', testid: 'operating-sequence-step-connect' },
  { num: '03', title: 'Leverage', desc: 'Clarify where the commercial or strategic value actually lives. Find the real signal.', accent: '#6366f1', testid: 'operating-sequence-step-leverage' },
  { num: '04', title: 'Refine', desc: "Remove dilution. Strengthen the core. Cut what doesn't serve the central promise.", accent: '#8b5cf6', testid: 'operating-sequence-step-refine' },
];

export default function Home() {
  return (
    <div className="pt-16">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-24 overflow-hidden">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: DOT_GRID, opacity: 1 }}
        />
        {/* Glow sweeps */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '-15%', left: '-8%',
            width: '55%', height: '65%',
            background: 'radial-gradient(ellipse, rgba(0,240,255,0.055) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute', top: '20%', right: '-5%',
            width: '40%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.055) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#00f0ff' }}
            />
            <span className="section-label" style={{ color: '#00f0ff' }}>Operator · Systems Strategist · Builder</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Headline block */}
            <div className="lg:col-span-7">
              <h1
                data-testid="hero-heading"
                className="font-extrabold tracking-tight leading-[1.03] mb-8"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)' }}
              >
                <span
                  style={{
                    display: 'block',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(180,185,195,0.4) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Turns ambiguity into
                </span>
                <span style={{ display: 'block', color: '#ffffff' }}>
                  structure, direction,
                </span>
                <span
                  style={{
                    display: 'block',
                    background: 'linear-gradient(90deg, #00f0ff 0%, #6366f1 60%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  and leverage.
                </span>
              </h1>
              <p
                className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
                style={{ color: 'rgba(255,255,255,0.52)', fontWeight: 300 }}
              >
                Founder, systems strategist, and product builder working across life, business, and immersive technology ecosystems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/92 transition-colors duration-200"
                >
                  Selected Work <ArrowUpRight size={14} />
                </Link>
                <Link
                  to="/work-with-me"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'rgba(255,255,255,0.025)',
                    color: 'rgba(255,255,255,0.72)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
                >
                  How I Engage <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Operator signal panel */}
            <div className="lg:col-span-5 mt-2">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(15,17,21,0.85)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Panel header */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="section-label">Operator signal</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                    <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                    <span className="w-2 h-2 rounded-full" style={{ background: '#00f0ff', opacity: 0.7 }} />
                  </div>
                </div>
                {/* Panel body */}
                <div className="px-6 py-5 space-y-4">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.62)', fontWeight: 300 }}
                  >
                    I work where things are overloaded, fragmented, or drifting off-core—and turn them into usable systems.
                  </p>
                  <div
                    className="space-y-3 pt-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {[
                      { k: 'Focus', v: 'Systems · Strategy · Product' },
                      { k: 'Ecosystem', v: 'Nemurium' },
                      { k: 'Studio', v: 'VibeForge Studios' },
                      { k: 'Current status', v: 'Taking selective work' },
                    ].map(({ k, v }) => (
                      <div key={k} className="flex items-center justify-between text-xs">
                        <span style={{ color: 'rgba(255,255,255,0.35)' }}>{k}</span>
                        <span
                          className="font-medium"
                          style={{ color: 'rgba(255,255,255,0.72)' }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM SIGNAL STRIP (subtle inline) ─────────────── */}
      <div
        data-testid="ecosystem-signal-strip"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.28)', flexShrink: 0 }}>
              The Ecosystem
            </span>
            <div
              className="hidden md:block"
              style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }}
            />
            {[
              { label: 'Nemurium', sub: 'Immersive Ecosystem', testid: 'ecosystem-signal-nemurium', color: 'rgba(139,92,246,0.85)' },
              { label: 'iMMerSiveTechs', sub: 'XR & Spatial', testid: 'ecosystem-signal-immersivetechs', color: 'rgba(0,240,255,0.85)' },
              { label: 'VibeForge Studios', sub: 'Builder Engine', testid: 'ecosystem-signal-vibeforge', color: 'rgba(59,130,246,0.85)' },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && (
                  <span
                    className="hidden md:inline"
                    style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem' }}
                  >
                    /
                  </span>
                )}
                <div
                  data-testid={item.testid}
                  className="flex items-baseline gap-2"
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-xs hidden sm:inline"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                  >
                    {item.sub}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ─── OPERATING SEQUENCE ─────────────────────────────────── */}
      <section
        data-testid="operating-sequence"
        className="py-24 md:py-28"
        style={{ background: 'rgba(15,17,21,0.35)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="section-label mb-3">Signature Process</p>
              <h2
                className="font-extrabold tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#ffffff' }}
              >
                The Operating Sequence
              </h2>
            </div>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors duration-200 flex items-center gap-1.5"
              style={{ color: 'rgba(0,240,255,0.8)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00f0ff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,240,255,0.8)'; }}
            >
              The philosophy behind it <ArrowRight size={13} />
            </Link>
          </div>

          {/* Editorial list — not a card grid */}
          <div className="space-y-0">
            {sequenceSteps.map((step, i) => (
              <div
                key={step.num}
                data-testid={step.testid}
                className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 group"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  borderBottom: i === sequenceSteps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {/* Step number — big typographic element */}
                <div className="md:w-24 shrink-0 flex items-start">
                  <span
                    className="font-extrabold leading-none select-none"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                      color: step.accent,
                      opacity: 0.25,
                      letterSpacing: '-0.03em',
                      transition: 'opacity 220ms',
                    }}
                    // Ref workaround for group-hover: use inline JS
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.25'; }}
                  >
                    {step.num}
                  </span>
                </div>
                {/* Step content */}
                <div className="flex-1 pt-1">
                  <h3
                    className="font-bold text-xl tracking-tight mb-2"
                    style={{ color: 'rgba(255,255,255,0.90)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '38rem' }}
                  >
                    {step.desc}
                  </p>
                </div>
                {/* Accent rule — right side */}
                <div
                  className="hidden lg:flex items-center justify-end md:w-32 shrink-0"
                >
                  <div
                    className="h-px w-12"
                    style={{ background: `linear-gradient(to right, transparent, ${step.accent})`, opacity: 0.25 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SELECTED SYSTEMS ───────────────────────────────────── */}
      <section className="py-24 md:py-32 relative">
        {/* Subtle mid-page glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,240,255,0.025) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section header — editorial */}
          <div className="grid lg:grid-cols-12 gap-8 mb-14">
            <div className="lg:col-span-7">
              <p className="section-label mb-4">Selected Systems</p>
              <h2
                className="font-extrabold tracking-tight text-white mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.08 }}
              >
                Where the method becomes something usable.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-10">
              <p
                className="text-base leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}
              >
                These projects reflect how I apply the same thinking across different problem spaces: operational friction, consumer clarity, and systems people need to rely on in real life.
              </p>
            </div>
          </div>

          {/* Primary row */}
          <div className="grid lg:grid-cols-12 gap-4 mb-4">

            {/* Job Forge — dominant primary */}
            <div
              data-testid="selected-system-job-forge"
              className="lg:col-span-7 rounded-2xl relative overflow-hidden"
              style={{
                background: '#0f1115',
                border: '1px solid rgba(0,240,255,0.18)',
                minHeight: '380px',
              }}
            >
              {/* Accent sweep */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(0,240,255,0.04) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              {/* Top-right corner mark */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 0, height: 0,
                borderTop: '48px solid rgba(0,240,255,0.08)',
                borderLeft: '48px solid transparent',
              }} />
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full" style={{ minHeight: '380px' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="px-2.5 py-1 rounded text-xs font-semibold"
                      style={{
                        background: 'rgba(0,240,255,0.08)',
                        border: '1px solid rgba(0,240,255,0.18)',
                        color: '#00f0ff',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontSize: '0.6rem',
                      }}
                    >
                      Business Systems
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'rgba(255,255,255,0.2)' }}
                    >
                      VibeForge Studios
                    </span>
                  </div>
                  <h3
                    className="font-extrabold tracking-tight text-white mb-4"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.08 }}
                  >
                    Job Forge
                  </h3>
                  <p
                    className="text-base leading-relaxed mb-8"
                    style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, maxWidth: '36rem' }}
                  >
                    A field-first system designed to reduce friction between the work itself and the operational layers around it. Structure the mess, protect the core, and make the system easier to use under real conditions.
                  </p>
                </div>
                <div
                  className="pt-5 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: '#00f0ff' }}
                  >
                    System design for real-world friction.
                  </span>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-1 text-xs transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
                  >
                    View <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* ChurnWise — secondary */}
            <div
              data-testid="selected-system-churnwise"
              className="lg:col-span-5 rounded-2xl relative overflow-hidden"
              style={{
                background: '#0f1115',
                border: '1px solid rgba(255,255,255,0.07)',
                minHeight: '380px',
                transition: 'border-color 220ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.22)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(225deg, rgba(59,130,246,0.035) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              <div className="relative z-10 p-8 flex flex-col h-full" style={{ minHeight: '380px' }}>
                <div className="flex-1">
                  <div className="mb-6">
                    <span
                      className="section-label"
                      style={{ color: '#3b82f6' }}
                    >
                      Consumer Utility
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-white tracking-tight mb-4"
                  >
                    ChurnWise
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: 'rgba(255,255,255,0.48)', fontWeight: 300 }}
                  >
                    A cleaner, more focused way to understand and manage subscription drag. Turning a common frustration into something more visible, usable, and controlled.
                  </p>
                  {/* Signal lines — abstract visual texture */}
                  <div className="space-y-2 mt-4">
                    {['Subscription visibility', 'Usage signals', 'Drag reduction'].map((sig, i) => (
                      <div key={sig} className="flex items-center gap-3">
                        <div
                          className="rounded-full"
                          style={{
                            width: `${60 + i * 15}%`,
                            height: '3px',
                            background: `rgba(59,130,246,${0.2 - i * 0.04})`,
                          }}
                        />
                        <span
                          className="text-xs whitespace-nowrap"
                          style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem' }}
                        >
                          {sig}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="text-sm font-medium" style={{ color: '#3b82f6' }}>
                    Clear product thinking applied to everyday software.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transplant Tracker — quieter third, full-width, horizontal */}
          <div
            data-testid="selected-system-transplant-tracker"
            className="rounded-2xl"
            style={{
              background: 'rgba(15,17,21,0.45)',
              border: '1px solid rgba(255,255,255,0.055)',
            }}
          >
            <div className="p-7 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="section-label" style={{ color: '#8b5cf6' }}>Human Systems</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    Working title
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-3">Transplant Tracker</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300, maxWidth: '34rem' }}
                >
                  A more personal and medically relevant system built around continuity, consistency, and everyday management after a major health event. The clarity-first process applies just as much to human-support systems as it does to products and operations.
                </p>
              </div>
              <div
                className="md:w-56 shrink-0"
                style={{
                  paddingLeft: '2rem',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#8b5cf6', fontWeight: 400 }}
                >
                  A human system problem, approached with the clarity-first mindset.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <div
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Across the Nemurium ecosystem.
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.38)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.72)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
            >
              Full portfolio and context <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TOOLS PREVIEW ───────────────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(15,17,21,0.45)',
          backgroundImage: DOT_GRID,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="section-label mb-3" style={{ color: '#00f0ff' }}>Clarity Lab</p>
              <h2
                className="font-extrabold text-white tracking-tight mb-5"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
              >
                Tools built from the method.
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '32rem' }}
              >
                I build operator tools to accelerate the clarity process. Not demos—instruments. Designed to structure chaos and surface product drift in real time.
              </p>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/92 transition-colors duration-200"
              >
                Enter the Lab <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Tool signal cards */}
            <div className="flex flex-col gap-3">
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: 'rgba(22,25,32,0.85)',
                  border: '1px solid rgba(0,240,255,0.12)',
                }}
              >
                <div
                  className="p-2.5 rounded-lg shrink-0"
                  style={{ background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.12)' }}
                >
                  <Sparkles size={15} style={{ color: '#00f0ff' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">The Chaos Translator</h4>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: '1.5' }}>
                    Paste messy thinking. Get structured clarity—summary, steps, and a diagnosis of the actual problem.
                  </p>
                </div>
              </div>
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: 'rgba(22,25,32,0.85)',
                  border: '1px solid rgba(139,92,246,0.12)',
                }}
              >
                <div
                  className="p-2.5 rounded-lg shrink-0"
                  style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.15)' }}
                >
                  <ShieldAlert size={15} style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">The Bloat Detector</h4>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: '1.5' }}>
                    Paste a feature list or pitch. Identify what's core, what's off-core, and what to cut first.
                  </p>
                </div>
              </div>
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: 'rgba(22,25,32,0.85)',
                  border: '1px solid rgba(249,115,22,0.12)',
                }}
              >
                <div
                  className="p-2.5 rounded-lg shrink-0"
                  style={{ background: 'rgba(249,115,22,0.07)', border: '1px solid rgba(249,115,22,0.15)' }}
                >
                  <Zap size={15} style={{ color: '#f97316' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                    The Friction Auditor
                    <span
                      className="text-[0.5rem] font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.2)',
                        color: '#f97316',
                        letterSpacing: '0.08em',
                      }}
                    >
                      NEW
                    </span>
                  </h4>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: '1.5' }}>
                    Paste a clunky business process. Get the bottleneck diagnosed, dead steps identified, and a leaner architecture designed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORK WITH ME PREVIEW ────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <p className="section-label mb-3">Work With Me</p>
              <h2
                className="font-extrabold text-white tracking-tight mb-5"
                style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)' }}
              >
                Four ways to engage.
              </h2>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}
              >
                I take on a small number of engagements at a time. Each is direct, outcomes-focused, and scoped for the actual problem.
              </p>
              <Link
                to="/work-with-me"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                Full engagement options <ArrowRight size={13} />
              </Link>
            </div>
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { num: '01', title: 'Clarity Teardown', sub: 'One concentrated session. One clear diagnosis. Actionable output by end of call.', accent: '#00f0ff' },
                  { num: '02', title: 'System Architecture Sprint', sub: 'Multi-week engagement to rebuild, simplify, and document your operational workflows.', accent: '#3b82f6' },
                  { num: '03', title: 'Strategic Operator Support', sub: 'Ongoing advisory. A systems-thinker in your corner as you make high-stakes decisions.', accent: '#6366f1' },
                  { num: '04', title: 'White-Glove Build', sub: 'Architecture and build via VibeForge Studios. We design and ship the system.', accent: '#8b5cf6', flagship: true },
                ].map((svc) => (
                  <div
                    key={svc.num}
                    className="p-5 rounded-xl relative"
                    style={{
                      background: svc.flagship ? 'rgba(15,17,21,0.9)' : '#0f1115',
                      border: svc.flagship
                        ? '1px solid rgba(0,240,255,0.18)'
                        : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div className="section-label mb-2" style={{ color: svc.accent, fontSize: '0.55rem' }}>{svc.num}</div>
                    <h3 className="text-sm font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{svc.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(12,13,16,0.8)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(0,240,255,0.04) 0%, transparent 65%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Let's talk</p>
            <h2
              className="font-extrabold text-white tracking-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.08 }}
            >
              If something is overloaded, fragmented, or drifting—
              <span style={{ color: 'rgba(255,255,255,0.45)' }}> that's the conversation.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}
            >
              Whether you're forming an early-stage product, navigating business friction, or need clarity under pressure—reach out directly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/92 transition-colors duration-200"
              >
                Start the Conversation <ArrowUpRight size={15} />
              </Link>
              <Link
                to="/work-with-me"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-colors duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.55)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
              >
                View Engagements <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
