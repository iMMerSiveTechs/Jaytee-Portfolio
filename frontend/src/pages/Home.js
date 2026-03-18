import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, ShieldAlert, ArrowUpRight, Zap
} from 'lucide-react';
import { Reveal, RevealStagger } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { InteractiveSequence } from '../components/InteractiveSequence';

// Subtle dot-grid pattern SVG as data URI
const DOT_GRID = `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='0.8' fill='rgba(255,255,255,0.055)'/%3E%3C/svg%3E")`;

export default function Home() {
  return (
    <div className="pt-16">
      <SEO title="Home" description="I help founders turn ambiguity into structure, direction, and leverage. Systems thinking, product strategy, and operational clarity." path="/" />

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
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 mb-10">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--theme-accent, #00f0ff)' }}
              />
              <span className="section-label" style={{ color: 'var(--theme-accent, #00f0ff)' }}>Operator · Systems Strategist · Builder</span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Headline block */}
            <div className="lg:col-span-7">
              <Reveal delay={0.2} y={30}>
                <h1
                  data-testid="hero-heading"
                  className="font-extrabold tracking-tight leading-[1.03] mb-8"
                  style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)' }}
                >
                  <span
                    style={{
                      display: 'block',
                      background: 'linear-gradient(180deg, var(--theme-text-muted) 0%, var(--theme-text-subtle) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Turns ambiguity into
                  </span>
                  <span style={{ display: 'block', color: 'var(--theme-text)' }}>
                    structure, direction,
                  </span>
                  <span
                    style={{
                      display: 'block',
                      background: 'var(--theme-metallic, linear-gradient(90deg, #00f0ff 0%, #6366f1 60%, #8b5cf6 100%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    and leverage.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p
                  className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
                  style={{ color: 'var(--theme-text-muted)', fontWeight: 300 }}
                >
                  Founder, systems strategist, and product builder working across life, business, and immersive technology ecosystems.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/work"
                    data-testid="hero-cta-primary"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold transition-all duration-200 relative overflow-hidden"
                    style={{
                      boxShadow: '0 4px 20px var(--theme-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px var(--theme-border)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px var(--theme-border)';
                    }}
                  >
                    <span className="relative z-10">Selected Work</span>
                    <ArrowUpRight size={14} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {/* Shimmer effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, var(--theme-border) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s ease-in-out infinite',
                      }}
                    />
                  </Link>
                  <Link
                    to="/work-with-me"
                    data-testid="hero-cta-secondary"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      border: '1px solid var(--theme-border)',
                      background: 'var(--theme-surface)',
                      color: 'var(--theme-text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--theme-accent, #00f0ff)';
                      e.currentTarget.style.borderColor = 'var(--theme-accent, #00f0ff)';
                      e.currentTarget.style.background = 'var(--theme-surface-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--theme-text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--theme-border)';
                      e.currentTarget.style.background = 'var(--theme-surface)';
                    }}
                  >
                    How I Engage <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Operator signal panel */}
            <div className="lg:col-span-5 mt-2">
              <Reveal delay={0.5} y={40}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'var(--theme-bg1)',
                    border: '1px solid var(--theme-surface-border)',
                  }}
                >
                  {/* Panel header */}
                  <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ borderBottom: '1px solid var(--theme-border-subtle)' }}
                  >
                    <span className="section-label">Operator signal</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-text-subtle)' }} />
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-text-subtle)' }} />
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--theme-accent, #00f0ff)', opacity: 0.7 }} />
                    </div>
                  </div>
                  {/* Panel body */}
                  <div className="px-6 py-5 space-y-4">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--theme-text-muted)', fontWeight: 300 }}
                  >
                    I work where things are overloaded, fragmented, or drifting off-core—and turn them into usable systems.
                  </p>
                  <div
                    className="space-y-3 pt-4"
                    style={{ borderTop: '1px solid var(--theme-border-subtle)' }}
                  >
                    {[
                      { k: 'Focus', v: 'Systems · Strategy · Product' },
                      { k: 'Ecosystem', v: 'Nemurium' },
                      { k: 'Studio', v: 'VibeForge Studios' },
                      { k: 'Current status', v: 'Taking selective work' },
                    ].map(({ k, v }) => (
                      <div key={k} className="flex items-center justify-between text-xs">
                        <span style={{ color: 'var(--theme-text-subtle)' }}>{k}</span>
                        <span
                          className="font-medium"
                          style={{ color: 'var(--theme-text-secondary)' }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM SIGNAL STRIP (subtle inline) ─────────────── */}
      <Reveal delay={0.6} shimmer>
        <div
          data-testid="ecosystem-signal-strip"
          style={{
            borderTop: '1px solid var(--theme-border-subtle)',
          borderBottom: '1px solid var(--theme-border-subtle)',
          background: 'var(--theme-surface)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="section-label" style={{ color: 'var(--theme-text-subtle)', flexShrink: 0 }}>
              The Ecosystem
            </span>
            <div
              className="hidden md:block"
              style={{ width: '1px', height: '14px', background: 'var(--theme-border)' }}
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
                    style={{ color: 'var(--theme-border)', fontSize: '0.75rem' }}
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
                    style={{ color: 'var(--theme-text-subtle)' }}
                  >
                    {item.sub}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      </Reveal>

      {/* ─── PROOF OF WORK ──────────────────────────────────────── */}
      <Reveal delay={0.3}>
        <section className="py-12 md:py-14" style={{ background: 'var(--theme-bg1)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Active Build Lanes', value: '3', sub: 'Concurrent projects in motion' },
                { label: 'Operator Tools', value: '5', sub: 'Live instruments in Clarity Lab' },
                { label: 'Work Modes', value: '4', sub: 'Diagnostic · Architecture · Build · Advisory' },
                { label: 'System Types', value: '3', sub: 'Workflow · Product · Human' },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--theme-surface)',
                    border: '1px solid var(--theme-border-subtle)',
                  }}
                >
                  <div className="text-2xl font-extrabold mb-1" style={{ color: 'var(--theme-accent, #00f0ff)' }}>
                    {card.value}
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: 'var(--theme-text-muted)' }}>
                    {card.label}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--theme-text-subtle)' }}>
                    {card.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─── OPERATING SEQUENCE ─────────────────────────────────── */}
      <section
        data-testid="operating-sequence"
        className="py-24 md:py-28"
        style={{ background: 'var(--theme-bg1)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <Reveal delay={0.2}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="section-label mb-3">Signature Process</p>
              <h2
                className="font-extrabold tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--theme-text)' }}
              >
                The Operating Sequence
              </h2>
            </div>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors duration-200 flex items-center gap-1.5"
              style={{ color: 'rgba(0,240,255,0.8)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-accent, #00f0ff)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(0,240,255,0.8)'; }}
            >
              The philosophy behind it <ArrowRight size={13} />
            </Link>
          </div>
          </Reveal>

          <InteractiveSequence />
        </div>
      </section>

      {/* ─── SELECTED SYSTEMS ───────────────────────────────────── */}
      <section className="py-24 md:py-32 relative">
        {/* Subtle mid-page glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, var(--theme-glow, rgba(0,240,255,0.025)) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Section header — editorial */}
          <Reveal delay={0.2}>
            <div className="grid lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-7">
                <p className="section-label mb-4">Selected Systems</p>
                <h2
                  className="font-extrabold tracking-tight mb-5"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.08, color: 'var(--theme-text)' }}
              >
                Where the method becomes something usable.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-10">
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--theme-text-subtle)', fontWeight: 300 }}
              >
                These projects reflect how I apply the same thinking across different problem spaces: operational friction, consumer clarity, and systems people need to rely on in real life.
              </p>
            </div>
          </div>
          </Reveal>

          {/* Primary row */}
          <Reveal delay={0.4} y={30}>
            <div className="grid lg:grid-cols-12 gap-4 mb-4">

            {/* Job Forge — dominant primary */}
            <div
              data-testid="selected-system-job-forge"
              className="lg:col-span-7 rounded-2xl relative overflow-hidden"
              style={{
                background: 'var(--theme-bg1)',
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
                        color: 'var(--theme-accent, #00f0ff)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontSize: '0.6rem',
                      }}
                    >
                      Business Systems
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: 'var(--theme-text-subtle)' }}
                    >
                      VibeForge Studios
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded flex items-center gap-1.5"
                      style={{
                        background: 'rgba(52,211,153,0.08)',
                        border: '1px solid rgba(52,211,153,0.2)',
                        color: '#34d399',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34d399' }} />
                      Beta
                    </span>
                  </div>
                  <h3
                    className="font-extrabold tracking-tight mb-4"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.08, color: 'var(--theme-text)' }}
                  >
                    Job Forge
                  </h3>
                  <p
                    className="text-base leading-relaxed mb-8"
                    style={{ color: 'var(--theme-text-muted)', fontWeight: 300, maxWidth: '36rem' }}
                  >
                    A field-first system designed to reduce friction between the work itself and the operational layers around it. Structure the mess, protect the core, and make the system easier to use under real conditions.
                  </p>
                </div>
                <div
                  className="pt-5 flex items-center justify-between"
                  style={{ borderTop: '1px solid var(--theme-surface-border)' }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--theme-accent, #00f0ff)' }}
                  >
                    System design for real-world friction.
                  </span>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-1 text-xs transition-colors duration-200"
                    style={{ color: 'var(--theme-text-subtle)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-text-secondary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--theme-text-subtle)'; }}
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
                background: 'var(--theme-bg1)',
                border: '1px solid var(--theme-surface-border)',
                minHeight: '380px',
                transition: 'border-color 220ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.22)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--theme-surface-border)'; }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(225deg, rgba(59,130,246,0.035) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              <div className="relative z-10 p-8 flex flex-col h-full" style={{ minHeight: '380px' }}>
                <div className="flex-1">
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="section-label"
                      style={{ color: '#3b82f6' }}
                    >
                      Consumer Utility
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded flex items-center gap-1.5"
                      style={{
                        background: 'rgba(0,240,255,0.06)',
                        border: '1px solid rgba(0,240,255,0.15)',
                        color: 'var(--theme-accent, #00f0ff)',
                        fontSize: '0.6rem',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />
                      Active Build
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-extrabold tracking-tight mb-4"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    ChurnWise
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: 'var(--theme-text-subtle)', fontWeight: 300 }}
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
                          style={{ color: 'var(--theme-text-subtle)', fontSize: '0.6rem' }}
                        >
                          {sig}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="pt-5"
                  style={{ borderTop: '1px solid var(--theme-border-subtle)' }}
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
              background: 'var(--theme-bg1)',
              border: '1px solid var(--theme-border-subtle)',
            }}
          >
            <div className="p-7 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="section-label" style={{ color: '#8b5cf6' }}>Human Systems</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: 'var(--theme-surface)',
                      border: '1px solid var(--theme-surface-border)',
                      color: 'var(--theme-text-subtle)',
                    }}
                  >
                    Working title
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded flex items-center gap-1.5"
                    style={{
                      background: 'rgba(0,240,255,0.06)',
                      border: '1px solid rgba(0,240,255,0.15)',
                      color: 'var(--theme-accent, #00f0ff)',
                      fontSize: '0.6rem',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />
                    Active Build
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3" style={{ color: 'var(--theme-text)' }}>Transplant Tracker</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--theme-text-subtle)', fontWeight: 300, maxWidth: '34rem' }}
                >
                  A more personal and medically relevant system built around continuity, consistency, and everyday management after a major health event. The clarity-first process applies just as much to human-support systems as it does to products and operations.
                </p>
              </div>
              <div
                className="md:w-56 shrink-0"
                style={{
                  paddingLeft: '2rem',
                  borderLeft: '1px solid var(--theme-border-subtle)',
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
              style={{ color: 'var(--theme-text-subtle)' }}
            >
              Across the Nemurium ecosystem.
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
              style={{ color: 'var(--theme-text-subtle)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-text-secondary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--theme-text-subtle)'; }}
            >
              Full portfolio and context <ArrowRight size={13} />
            </Link>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ─── TOOLS PREVIEW ───────────────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{
          borderTop: '1px solid var(--theme-border-subtle)',
          background: 'var(--theme-bg1)',
          backgroundImage: DOT_GRID,
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <Reveal delay={0.2}>
              <div>
                <p className="section-label mb-3" style={{ color: 'var(--theme-accent, #00f0ff)' }}>Clarity Lab</p>
                <h2
                  className="font-extrabold tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--theme-text)' }}
                >
                  Tools built from the method.
                </h2>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: 'var(--theme-text-subtle)', fontWeight: 300, maxWidth: '32rem' }}
                >
                  I build operator tools to accelerate the clarity process. Not demos—instruments. Designed to structure chaos and surface product drift in real time.
                </p>
                <Link
                  to="/tools"
                  data-testid="tools-preview-cta"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold transition-all duration-200"
                  style={{
                    boxShadow: '0 4px 20px var(--theme-surface-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 30px var(--theme-border)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px var(--theme-surface-border)';
                  }}
                >
                  Enter the Lab <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>

            {/* Tool signal cards */}
            <Reveal delay={0.3} y={30}>
              <div className="flex flex-col gap-3">
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: 'var(--theme-bg2)',
                  border: '1px solid rgba(0,240,255,0.12)',
                }}
              >
                <div
                  className="p-2.5 rounded-lg shrink-0"
                  style={{ background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.12)' }}
                >
                  <Sparkles size={15} style={{ color: 'var(--theme-accent, #00f0ff)' }} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--theme-text)' }}>The Chaos Translator</h4>
                  <p className="text-xs" style={{ color: 'var(--theme-text-subtle)', lineHeight: '1.5' }}>
                    Paste messy thinking. Get structured clarity—summary, steps, and a diagnosis of the actual problem.
                  </p>
                </div>
              </div>
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: 'var(--theme-bg2)',
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
                  <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--theme-text)' }}>The Bloat Detector</h4>
                  <p className="text-xs" style={{ color: 'var(--theme-text-subtle)', lineHeight: '1.5' }}>
                    Paste a feature list or pitch. Identify what's core, what's off-core, and what to cut first.
                  </p>
                </div>
              </div>
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: 'var(--theme-bg2)',
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
                  <h4 className="font-bold text-sm mb-1 flex items-center gap-2" style={{ color: 'var(--theme-text)' }}>
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
                  <p className="text-xs" style={{ color: 'var(--theme-text-subtle)', lineHeight: '1.5' }}>
                    Paste a clunky business process. Get the bottleneck diagnosed, dead steps identified, and a leaner architecture designed.
                  </p>
                </div>
              </div>
              <div
                className="p-5 rounded-xl flex items-start gap-4"
                style={{
                  background: 'var(--theme-bg2)',
                  border: '1px solid rgba(37,99,235,0.12)',
                }}
              >
                <div
                  className="p-2.5 rounded-lg shrink-0"
                  style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.15)' }}
                >
                  <Zap size={15} style={{ color: '#2563eb' }} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 flex items-center gap-2" style={{ color: 'var(--theme-text)' }}>
                    The Entropy Audit
                    <span
                      className="text-[0.5rem] font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(37,99,235,0.1)',
                        border: '1px solid rgba(37,99,235,0.2)',
                        color: '#2563eb',
                        letterSpacing: '0.08em',
                      }}
                    >
                      NEW
                    </span>
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--theme-text-subtle)', lineHeight: '1.5' }}>
                    Dump your current chaos. Isolate the noise, find the signal, and get one high-leverage action.
                  </p>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── WORK WITH ME PREVIEW ────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ borderTop: '1px solid var(--theme-border-subtle)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <Reveal delay={0.2}>
              <div className="lg:col-span-4">
                <p className="section-label mb-3">Work With Me</p>
                <h2
                  className="font-extrabold tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', color: 'var(--theme-text)' }}
                >
                  Four ways to engage.
                </h2>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: 'var(--theme-text-subtle)', fontWeight: 300 }}
                >
                  I take on a small number of engagements at a time. Each is direct, outcomes-focused, and scoped for the actual problem.
                </p>
                <Link
                  to="/work-with-me"
                  data-testid="services-preview-cta"
                  className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--theme-accent, #00f0ff)' }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.color = 'var(--theme-accent-light, #5ffdff)';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--theme-accent, #00f0ff)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  Full engagement options <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { num: '01', title: 'Clarity Teardown', sub: 'One concentrated session. One clear diagnosis. Actionable output by end of call.', pricing: 'From $1.5k', accent: 'var(--theme-accent, #00f0ff)' },
                  { num: '02', title: 'System Architecture Sprint', sub: 'Multi-week engagement to rebuild, simplify, and document your operational workflows.', pricing: 'From $8k', accent: '#3b82f6' },
                  { num: '03', title: 'Strategic Operator Support', sub: 'Ongoing advisory. A systems-thinker in your corner as you make high-stakes decisions.', pricing: 'By fit', accent: '#6366f1' },
                  { num: '04', title: 'White-Glove Build', sub: 'Architecture and build via VibeForge Studios. We design and ship the system.', pricing: 'Custom scope', accent: '#8b5cf6', flagship: true },
                ].map((svc, idx) => (
                  <Reveal key={svc.num} delay={0.3 + (idx * 0.1)} y={20}>
                    <div
                      className="p-5 rounded-xl relative"
                      style={{
                        background: svc.flagship ? 'var(--theme-bg1)' : 'var(--theme-bg1)',
                        border: svc.flagship
                          ? '1px solid rgba(0,240,255,0.18)'
                          : '1px solid var(--theme-surface-border)',
                      }}
                    >
                      <div className="section-label mb-2" style={{ color: svc.accent, fontSize: '0.55rem' }}>{svc.num}</div>
                      <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--theme-text)' }}>{svc.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text-subtle)', fontWeight: 300 }}>{svc.sub}</p>
                      {svc.pricing && <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--theme-text-muted)' }}>{svc.pricing}</p>}
                    </div>
                  </Reveal>
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
          borderTop: '1px solid var(--theme-border-subtle)',
          background: 'var(--theme-bg0)',
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
              className="font-extrabold tracking-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.08, color: 'var(--theme-text)' }}
            >
              If something is overloaded, fragmented, or drifting—
              <span style={{ color: 'var(--theme-text-subtle)' }}> that's the conversation.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: 'var(--theme-text-subtle)', fontWeight: 300 }}
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
                  border: '1px solid var(--theme-border)',
                  color: 'var(--theme-text-muted)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-text-secondary)'; e.currentTarget.style.borderColor = 'var(--theme-border)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--theme-text-muted)'; e.currentTarget.style.borderColor = 'var(--theme-border)'; }}
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
