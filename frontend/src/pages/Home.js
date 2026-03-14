import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Box, GitMerge, Crosshair, Shield,
  Globe, Layers, Hammer, Sparkles, ShieldAlert,
  Network, ArrowUpRight
} from 'lucide-react';

const sequenceSteps = [
  { icon: Box, num: '01', title: 'Structure', desc: 'Find the true shape inside the mess.', testid: 'operating-sequence-step-structure', accent: '#00f0ff' },
  { icon: GitMerge, num: '02', title: 'Connect', desc: 'See how parts fit a bigger architecture.', testid: 'operating-sequence-step-connect', accent: '#3b82f6' },
  { icon: Crosshair, num: '03', title: 'Leverage', desc: 'Clarify the commercial or strategic value.', testid: 'operating-sequence-step-leverage', accent: '#6366f1' },
  { icon: Shield, num: '04', title: 'Refine', desc: 'Remove dilution, strengthen the core.', testid: 'operating-sequence-step-refine', accent: '#8b5cf6' },
];

const ecosystemItems = [
  { icon: Globe, label: 'Nemurium', sub: 'Immersive Ecosystem', testid: 'ecosystem-signal-nemurium', color: 'rgba(139,92,246,0.8)' },
  { icon: Layers, label: 'iMMerSiveTechs', sub: 'XR & Spatial Layer', testid: 'ecosystem-signal-immersivetechs', color: 'rgba(0,240,255,0.8)' },
  { icon: Hammer, label: 'VibeForge Studios', sub: 'Builder Engine', testid: 'ecosystem-signal-vibeforge', color: 'rgba(59,130,246,0.8)' },
];

export default function Home() {
  return (
    <div className="pt-16">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-28 overflow-hidden">
        {/* Subtle hero backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '-20%', left: '-10%',
            width: '65%', height: '70%',
            background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 65%)',
            borderRadius: '50%', filter: 'blur(80px)'
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-5%',
            width: '45%', height: '55%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)',
            borderRadius: '50%', filter: 'blur(80px)'
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-10 rounded-full" style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.15)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00f0ff' }} />
            <span className="section-label" style={{ color: '#00f0ff', letterSpacing: '0.16em' }}>Operator &amp; Systems Strategist</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <h1
                data-testid="hero-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] mb-8"
              >
                <span className="metallic-text">Turns ambiguity into</span><br />
                <span style={{ color: '#ffffff' }}>structure, direction,</span><br />
                <span className="neon-text-cyan">and leverage.</span>
              </h1>
              <p className="text-xl text-white/55 leading-relaxed mb-10 max-w-xl" style={{ fontWeight: 300 }}>
                Founder, systems strategist, and product builder working across life, business, and immersive technology ecosystems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200"
                >
                  View Selected Work <ArrowUpRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}
                >
                  Work With Me <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Operator Panel Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: 'rgba(15,17,21,0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="section-label mb-5">The Method</p>
                <p className="text-white/70 text-base leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                  I work where things are overloaded, fragmented, or drifting off-core—and turn them into usable systems. Protect the core, remove the clutter.
                </p>
                <div className="space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Focus areas</span>
                    <span className="text-white/75 font-medium">Systems · Strategy · Product</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Ecosystem</span>
                    <span className="text-white/75 font-medium">Nemurium</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40">Studio</span>
                    <span className="text-white/75 font-medium">VibeForge Studios</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OPERATING SEQUENCE ───────────────────────────────── */}
      <section
        data-testid="operating-sequence"
        className="py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,17,21,0.4)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <p className="section-label mb-2">Signature Process</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">The Operating Sequence</h2>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: '#00f0ff' }}
            >
              Understand the philosophy <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sequenceSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  data-testid={step.testid}
                  className="p-6 rounded-xl group"
                  style={{
                    background: 'rgba(22,25,32,0.6)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'border-color 200ms, background 200ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                    e.currentTarget.style.background = 'rgba(22,25,32,0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'rgba(22,25,32,0.6)';
                  }}
                >
                  <Icon size={20} style={{ color: step.accent, marginBottom: '1rem', opacity: 0.8 }} />
                  <div className="section-label mb-2" style={{ color: step.accent, fontSize: '0.6rem' }}>{step.num}</div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SELECTED SYSTEMS ─────────────────────────────────── */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 max-w-2xl">
            <p className="section-label mb-3">Selected Systems</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Where the method becomes something usable.
            </h2>
            <p className="text-white/50 text-lg mb-6" style={{ fontWeight: 300 }}>
              These projects reflect how I apply the same thinking across different problem spaces: operational friction, consumer clarity, and systems people need to rely on in real life.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-white/60"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Network size={14} style={{ color: '#8b5cf6' }} />
              Selected systems across the broader <strong className="text-white/80 font-semibold ml-1">Nemurium</strong>&nbsp;ecosystem.
            </div>
          </div>

          {/* Systems Grid */}
          <div className="grid lg:grid-cols-12 gap-5 mb-5">
            {/* Job Forge — Primary */}
            <div
              data-testid="selected-system-job-forge"
              className="lg:col-span-7 p-8 md:p-10 rounded-2xl relative overflow-hidden"
              style={{
                background: '#0f1115',
                border: '1px solid rgba(0,240,255,0.15)',
                boxShadow: '0 0 28px rgba(0,240,255,0.06)',
                minHeight: '340px',
              }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="section-label mb-4" style={{ color: '#00f0ff' }}>Business Systems</div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">Job Forge</h3>
                  <p className="text-white/55 leading-relaxed text-base mb-6" style={{ fontWeight: 300 }}>
                    A field-first system designed to reduce friction between the work itself and the operational layers around it. It represents my strongest business-facing thinking: structure the mess, protect the core, and make the system easier to use under real conditions.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                  <span className="text-sm font-medium" style={{ color: '#00f0ff' }}>System design for real-world friction.</span>
                </div>
              </div>
            </div>

            {/* ChurnWise — Secondary */}
            <div
              data-testid="selected-system-churnwise"
              className="lg:col-span-5 p-8 md:p-10 rounded-2xl relative overflow-hidden"
              style={{
                background: '#0f1115',
                border: '1px solid rgba(255,255,255,0.07)',
                minHeight: '340px',
                transition: 'border-color 220ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="section-label mb-4" style={{ color: '#3b82f6' }}>Consumer Utility</div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">ChurnWise</h3>
                  <p className="text-white/55 leading-relaxed text-base mb-6" style={{ fontWeight: 300 }}>
                    A cleaner, more focused way to understand and manage subscription drag. It reflects the product side of my work—turning a common frustration into something more visible, usable, and controlled.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                  <span className="text-sm font-medium" style={{ color: '#3b82f6' }}>Clear product thinking applied to everyday software.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transplant Tracker — Quieter Third */}
          <div
            data-testid="selected-system-transplant-tracker"
            className="p-8 md:p-10 rounded-2xl flex flex-col md:flex-row gap-8 items-start"
            style={{
              background: 'rgba(15,17,21,0.5)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="section-label" style={{ color: '#8b5cf6' }}>Human Systems</div>
                <span
                  className="text-xs px-2 py-0.5 rounded text-white/40"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  Working Title
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">Transplant Tracker</h3>
              <p className="text-white/50 leading-relaxed" style={{ fontWeight: 300 }}>
                A more personal and medically relevant system built around continuity, consistency, and everyday management after a major health event. It shows that the same clarity-first process applies just as much to human-support systems as it does to products and operations.
              </p>
            </div>
            <div
              className="md:w-64 pt-6 md:pt-0"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', paddingLeft: '2rem' }}
            >
              <p className="text-sm font-medium" style={{ color: '#8b5cf6' }}>A human system problem, approached with the clarity-first mindset.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/75 transition-colors duration-200"
            >
              Full portfolio with context <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM SIGNAL STRIP ───────────────────────────── */}
      <section
        data-testid="ecosystem-signal-strip"
        className="py-16"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="md:w-48 shrink-0">
              <p className="section-label mb-1">The Ecosystem</p>
              <p className="text-xs text-white/30">The broader architecture</p>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch', display: 'none' }} className="md:block" />
            <div className="flex flex-wrap gap-4 flex-1">
              {ecosystemItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    data-testid={item.testid}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <Icon size={14} style={{ color: item.color, opacity: 0.85 }} />
                    <div>
                      <div className="text-sm font-semibold text-white/80">{item.label}</div>
                      <div className="text-xs text-white/35">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOOLS PREVIEW ────────────────────────────────────── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: 'rgba(15,17,21,0.3)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3" style={{ color: '#00f0ff' }}>Clarity Lab</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5">
                Tools from the method.
              </h2>
              <p className="text-white/50 text-lg mb-8 leading-relaxed" style={{ fontWeight: 300 }}>
                I don&apos;t just consult on systems—I build intelligent tools to accelerate the process. Try out the public versions of my operator tools designed to structure chaos and detect feature bloat instantly.
              </p>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200"
              >
                Enter the Lab <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <div
                className="p-5 rounded-xl flex items-center gap-4"
                style={{ background: 'rgba(22,25,32,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="p-3 rounded-xl" style={{ background: 'rgba(0,240,255,0.08)' }}>
                  <Sparkles size={18} style={{ color: '#00f0ff' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">The Chaos Translator</h4>
                  <p className="text-xs text-white/40">Converts messy braindumps into structured steps.</p>
                </div>
              </div>
              <div
                className="p-5 rounded-xl flex items-center gap-4"
                style={{ background: 'rgba(22,25,32,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="p-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.08)' }}>
                  <ShieldAlert size={18} style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-0.5">The Bloat Detector</h4>
                  <p className="text-xs text-white/40">Identifies off-core drift in roadmaps and pitches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORK WITH ME PREVIEW ─────────────────────────────── */}
      <section
        className="py-24 md:py-32"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="section-label mb-3">Work With Me</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">How I engage.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              { title: 'Clarity Teardown', sub: 'A concentrated strategy session to diagnose immediate friction in your product or workflow.' },
              { title: 'System Architecture Sprint', sub: 'A multi-week engagement to rebuild, simplify, and structure your operational workflows.' },
            ].map((svc) => (
              <div
                key={svc.title}
                className="p-7 rounded-xl"
                style={{
                  background: '#0f1115',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
                <p className="text-sm text-white/45 mb-5 leading-relaxed">{svc.sub}</p>
                <Link
                  to="/work-with-me"
                  className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                  style={{ color: '#00f0ff' }}
                >
                  Learn more <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
          <Link
            to="/work-with-me"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
          >
            View all engagement options <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section
        className="py-28"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(15,17,21,0.5)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Ready to structure the ambiguity?
          </h2>
          <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto" style={{ fontWeight: 300 }}>
            Whether you&apos;re forming an early-stage product, navigating business friction, or need clarity under pressure—let&apos;s talk.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200"
          >
            Start the Conversation <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
