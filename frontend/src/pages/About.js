import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, RevealStagger } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { EcosystemGraph } from '../components/EcosystemGraph';
import {
  Globe, Layers, Hammer, ArrowRight, Shield, Target,
  Compass, Lightbulb, Cpu, Users, TrendingUp, Crosshair,
  Zap, Box, GitMerge
} from 'lucide-react';

const timeline = [
  { year: '2018', label: 'Immersive Tech Exploration', desc: 'Started exploring XR, spatial computing, and immersive system design.' },
  { year: '2020', label: 'Systems Thinking Shift', desc: 'Moved from feature-building to diagnosing system-level problems. Consulting began.' },
  { year: '2022', label: 'iMMerSiveTechs Founded', desc: 'Formalized XR and spatial technology development under its own layer.' },
  { year: '2023', label: 'Nemurium Ecosystem', desc: 'Unified all ventures under one architectural umbrella. Strategy met product.' },
  { year: '2024', label: 'VibeForge Studios', desc: 'Builder engine activated. Strategy turns to shipped product under real conditions.' },
  { year: 'Now', label: 'Selective Operator Work', desc: 'Taking a small number of high-clarity engagements. Building tools from the method.' },
];

const operatingMethod = [
  {
    num: '01', title: 'Structure', icon: Box,
    desc: 'Find the true shape inside the mess. Name what it actually is, not what it feels like. This is where most engagements begin — diagnosis before direction.',
    accent: 'var(--theme-accent, #00f0ff)',
  },
  {
    num: '02', title: 'Connect', icon: GitMerge,
    desc: 'See how the parts fit a larger architecture. Understand the system before touching it. No changes without understanding the full dependency map.',
    accent: '#3b82f6',
  },
  {
    num: '03', title: 'Leverage', icon: Crosshair,
    desc: 'Clarify where the commercial or strategic value actually lives. Find the real signal — the one thing that matters most and build from there.',
    accent: '#6366f1',
  },
  {
    num: '04', title: 'Refine', icon: Shield,
    desc: "Remove dilution. Strengthen the core. Cut what doesn't serve the central promise. The goal is a system that's leaner, clearer, and harder to break.",
    accent: '#8b5cf6',
  },
];

const principles = [
  { num: '01', title: 'Protect the Core', icon: Shield, desc: 'Every decision should serve the central promise of the product or system. Everything else is candidate for removal.' },
  { num: '02', title: 'Structure Before Scale', icon: Compass, desc: 'Scaling a broken system creates a bigger broken system. Get the structure right first.' },
  { num: '03', title: 'Remove the Drift', icon: Target, desc: 'Off-core features dilute your message, confuse your users, and drain your resources. Cut them.' },
  { num: '04', title: 'Clarity is the Product', icon: Lightbulb, desc: 'In ambiguous situations, the most valuable thing you can deliver is a clear next step and a reason to trust it.' },
  { num: '05', title: 'Design for the Second Operator', icon: Users, desc: "Build systems that work when you leave the room. If only you can run it, it's a dependency, not a system." },
  { num: '06', title: 'Compound, Don\'t Sprawl', icon: TrendingUp, desc: 'Every new element should strengthen what already exists. Growth without compounding is just noise at higher volume.' },
];

const capabilities = [
  { title: 'Systems Diagnosis', desc: 'Mapping what\'s broken, where friction lives, and what the actual structure looks like under the surface.', icon: Cpu },
  { title: 'Product Strategy', desc: 'Finding the irreducible core of a product and cutting everything that dilutes the message or the experience.', icon: Target },
  { title: 'Operational Architecture', desc: 'Designing workflows, handoffs, and decision frameworks that make the system easier to operate under real conditions.', icon: Compass },
  { title: 'Immersive Technology', desc: 'XR, spatial computing, and immersive experience design — where technology meets embodied human interaction.', icon: Globe },
];

export default function About() {
  return (
    <div className="pt-16">
      <SEO title="About" description="Philosophy, operating method, and brand architecture behind Jethro JayTee — systems strategist and operator." path="/about" />
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <header className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        <Reveal delay={0.1}>
          <p className="section-label mb-4" style={{ color: 'var(--theme-accent, #00f0ff)' }}>The Operator &amp; The Ecosystem</p>
        </Reveal>
        <Reveal delay={0.2} y={30}>
          <h1
            className="font-extrabold tracking-tight mb-8"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)', lineHeight: 1.04 }}
          >
            <span className="metallic-text">Architect.</span>{' '}
            <span className="text-white">Operator.</span>{' '}
            <span className="neon-text-cyan">Builder.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="grid lg:grid-cols-12 gap-8">
            <p className="lg:col-span-7 text-xl text-white/55 leading-relaxed" style={{ fontWeight: 300 }}>
              I work at the intersection of systems thinking, product shaping, and practical business strategy.
              My approach is diagnostic, not decorative — I find the structure inside the mess, protect what matters,
              and remove everything that doesn&apos;t serve the core.
            </p>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--theme-accent, #00f0ff)' }} />
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>Currently taking selective work</span>
                </div>
              </div>
              <Link
                to="/work-with-me"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--theme-accent, #00f0ff)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                See how I engage <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </Reveal>
      </header>

      <div className="max-w-5xl mx-auto px-6 pb-32">

        {/* ─── Philosophy ─────────────────────────────────────────── */}
        <Reveal delay={0.2}>
          <section className="mb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
            <p className="section-label mb-6">How I Think</p>
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-5 text-lg leading-relaxed prose-dark">
                <p>
                  I help founders, operators, and businesses turn ambiguity into structure, direction, and leverage.
                  I am strongest when the situation is overloaded, fragmented, or drifting.
                </p>
                <p>
                  Rather than focusing only on adding new features, I diagnose systems. Most businesses do not need
                  more features — they need less confusion. My core principles are simple: protect the core,
                  remove product drift, and structure before attempting to scale.
                </p>
                <p>
                  This applies whether I&apos;m working on a business operations problem, a product roadmap,
                  an immersive technology system, or a personal health architecture.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(15,17,21,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="section-label mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Quick facts</p>
                  <div className="space-y-3">
                    {[
                      { k: 'Focus', v: 'Systems · Strategy · Product' },
                      { k: 'Ecosystem', v: 'Nemurium' },
                      { k: 'Studio', v: 'VibeForge Studios' },
                      { k: 'XR Layer', v: 'iMMerSiveTechs' },
                      { k: 'Method', v: 'Structure → Connect → Leverage → Refine' },
                    ].map(({ k, v }) => (
                      <div key={k} className="flex items-center justify-between text-xs" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>{k}</span>
                        <span className="font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ─── Operating Method (The Sequence) ────────────────────── */}
        <section className="mb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <Reveal delay={0.1}>
            <p className="section-label mb-3">The Operating Method</p>
            <h2
              className="font-extrabold tracking-tight text-white mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Four phases. One architecture.
            </h2>
            <p className="text-sm mb-12" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300, maxWidth: '36rem' }}>
              Every engagement follows the same diagnostic sequence. The method applies regardless of whether the problem is a product, a business, or a workflow.
            </p>
          </Reveal>

          <div className="space-y-0">
            {operatingMethod.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.num} delay={0.2 + (i * 0.08)} y={15}>
                  <div
                    className="interactive-card flex flex-col md:flex-row gap-6 md:gap-10 py-8 rounded-xl px-5 -mx-5"
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      borderBottom: i === operatingMethod.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <div className="md:w-20 shrink-0 flex items-start gap-4">
                      <span
                        className="font-extrabold leading-none select-none"
                        style={{ fontSize: '2rem', color: step.accent, opacity: 0.25, letterSpacing: '-0.03em' }}
                      >
                        {step.num}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={15} style={{ color: step.accent, opacity: 0.7 }} />
                        <h3 className="font-bold text-lg tracking-tight text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: '38rem' }}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ─── Capabilities ───────────────────────────────────────── */}
        <section className="mb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <Reveal delay={0.1}>
            <p className="section-label mb-3">What I Do</p>
            <h2
              className="font-extrabold tracking-tight text-white mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Areas of depth
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <Reveal key={cap.title} delay={0.2 + (idx * 0.08)} y={20}>
                  <div
                    className="interactive-card p-6 rounded-xl flex items-start gap-5"
                    style={{ background: 'rgba(22,25,32,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.1)' }}
                    >
                      <Icon size={16} style={{ color: 'var(--theme-accent, #00f0ff)', opacity: 0.7 }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm mb-2">{cap.title}</h3>
                      <p className="text-xs text-white/42 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ─── Brand Architecture ─────────────────────────────────── */}
        <section className="mb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <Reveal delay={0.1}>
            <p className="section-label mb-3">The Brand Architecture</p>
            <p className="text-white/50 mb-10 text-base" style={{ fontWeight: 300 }}>At the top is the operator. Around that sits a broader ecosystem taking shape.</p>
          </Reveal>

          {/* Interactive Ecosystem Graph */}
          <Reveal delay={0.15}>
            <div
              className="rounded-2xl p-6 mb-10"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <EcosystemGraph />
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.2} y={25}>
              <div
                className="interactive-card p-7 rounded-2xl flex items-start gap-6"
                style={{ background: '#0f1115', border: '1px solid rgba(139,92,246,0.18)' }}
              >
                <div className="p-3 rounded-xl shrink-0" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <Globe size={18} style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Nemurium</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    The larger immersive ecosystem framing the products, systems, and tools being built across utility, workflow, and digital experience. Nemurium is the umbrella — the territory where this work lives and compounds.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3} y={25}>
              <div
                className="interactive-card ml-6 p-7 rounded-2xl flex items-start gap-6"
                style={{ background: 'rgba(15,17,21,0.7)', border: '1px solid var(--theme-glow, rgba(0,240,255,0.12))' }}
              >
                <div className="p-3 rounded-xl shrink-0" style={{ background: 'var(--theme-glow, rgba(0,240,255,0.08))', border: '1px solid rgba(0,240,255,0.15)' }}>
                  <Layers size={18} style={{ color: 'var(--theme-accent, #00f0ff)' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">iMMerSiveTechs</h3>
                  <div className="section-label mb-2" style={{ color: 'var(--theme-accent, #00f0ff)', fontSize: '0.6rem' }}>Within Nemurium</div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    The dedicated immersive technology layer and spatial/XR tooling direction. This is where the work goes deeper into technology infrastructure for immersive experiences.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4} y={25}>
              <div
                className="interactive-card ml-6 p-7 rounded-2xl flex items-start gap-6"
                style={{ background: 'rgba(15,17,21,0.7)', border: '1px solid rgba(59,130,246,0.12)' }}
              >
                <div className="p-3 rounded-xl shrink-0" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                  <Hammer size={18} style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">VibeForge Studios</h3>
                  <div className="section-label mb-2" style={{ color: '#3b82f6', fontSize: '0.6rem' }}>Builder Engine</div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    The studio layer and engine room where these products, tools, and system experiences are shaped, coded, and forged into usable form. VibeForge is where strategy becomes product.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Timeline ──────────────────────────────────────────── */}
        <section className="mb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <Reveal delay={0.1}>
            <p className="section-label mb-3">The Arc</p>
            <h2
              className="font-extrabold tracking-tight text-white mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              How this evolved
            </h2>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[18px] top-2 bottom-2 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, rgba(0,240,255,0.2), rgba(139,92,246,0.15), rgba(255,255,255,0.05))' }}
            />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={0.15 + (i * 0.06)} y={12}>
                  <div className="flex gap-6 md:gap-8 py-5" style={{ borderBottom: i < timeline.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div className="relative shrink-0 w-9 flex justify-center">
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-1.5"
                        style={{
                          background: i === timeline.length - 1 ? 'var(--theme-accent, #00f0ff)' : 'rgba(255,255,255,0.15)',
                          boxShadow: i === timeline.length - 1 ? '0 0 10px var(--theme-glow, rgba(0,240,255,0.3))' : 'none',
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-xs font-bold" style={{ color: i === timeline.length - 1 ? 'var(--theme-accent, #00f0ff)' : 'rgba(255,255,255,0.3)' }}>{item.year}</span>
                        <span className="text-sm font-semibold text-white">{item.label}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Core Principles ────────────────────────────────────── */}
        <section className="mb-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <Reveal delay={0.1}>
            <p className="section-label mb-3">Core Principles</p>
            <h2
              className="font-extrabold tracking-tight text-white mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              What I believe about systems
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.num} delay={0.15 + (idx * 0.06)} y={20}>
                  <div
                    className="interactive-card p-6 rounded-xl h-full"
                    style={{ background: 'rgba(22,25,32,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={14} style={{ color: 'var(--theme-accent, #00f0ff)', opacity: 0.5 }} />
                      <div className="section-label" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem' }}>{p.num}</div>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{p.title}</h3>
                    <p className="text-xs text-white/42 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ─── CTA ────────────────────────────────────────────────── */}
        <Reveal delay={0.2}>
          <div
            className="p-8 md:p-10 rounded-2xl"
            style={{ background: 'rgba(15,17,21,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <h2 className="text-xl font-extrabold text-white mb-3 tracking-tight">
                  If this resonates, let&apos;s talk about what you&apos;re building.
                </h2>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                  Every engagement begins with a direct, honest conversation about the actual problem. No templates, no filler.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200"
                >
                  Start the Conversation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
