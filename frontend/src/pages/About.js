import React from 'react';
import { Reveal } from '../components/Reveal';
import { Globe, Layers, Hammer } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-16">
      <header className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <Reveal delay={0.1}>
          <p className="section-label mb-4">The Operator &amp; The Ecosystem</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="metallic-text">Architect.</span>{' '}
            <span className="text-white">Operator.</span>{' '}
            <span className="neon-text-cyan">Builder.</span>
          </h1>
          <p className="text-xl text-white/55 leading-relaxed max-w-2xl" style={{ fontWeight: 300 }}>
            My work sits at the intersection of systems thinking, product shaping, and practical business strategy. Here is how the architecture is organized.
          </p>
        </Reveal>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-32">

        {/* Philosophy */}
        <Reveal delay={0.2}>
          <section className="mb-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <p className="section-label mb-6">How I Think</p>
          <div className="space-y-5 text-lg leading-relaxed prose-dark">
            <p>
              I help founders, operators, and businesses turn ambiguity into structure, direction, and leverage. I am strongest when the situation is overloaded, fragmented, or drifting.
            </p>
            <p>
              Rather than focusing only on adding new features, I diagnose systems. Most businesses do not need more features—they need less confusion. My core principles are simple: protect the core, remove product drift, and structure before attempting to scale.
            </p>
            <p>
              The operating method is four phases: <strong>Structure</strong> (find the real shape), <strong>Connect</strong> (see the architecture), <strong>Leverage</strong> (clarify the value), and <strong>Refine</strong> (remove the dilution). This applies whether I&apos;m working on a business operations problem, a product roadmap, or a personal health system.
            </p>
          </div>
        </section>
        </Reveal>

        {/* Brand Architecture */}
        <section className="mb-20" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <Reveal delay={0.1}>
            <p className="section-label mb-3">The Brand Architecture</p>
            <p className="text-white/50 mb-10 text-base" style={{ fontWeight: 300 }}>At the top is the operator. Around that sits a broader ecosystem taking shape.</p>
          </Reveal>

          <div className="space-y-4">
            {/* Nemurium */}
            <Reveal delay={0.2} y={25}>
              <div
                className="interactive-card p-7 rounded-2xl flex items-start gap-6"
                style={{ background: '#0f1115', border: '1px solid rgba(139,92,246,0.18)' }}
              >
                <div
                  className="p-3 rounded-xl shrink-0"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                >
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

            {/* iMMerSiveTechs */}
            <Reveal delay={0.3} y={25}>
              <div
                className="interactive-card ml-6 p-7 rounded-2xl flex items-start gap-6"
                style={{
                  background: 'rgba(15,17,21,0.7)',
                  border: '1px solid var(--theme-glow, rgba(0,240,255,0.12))',
                }}
              >
                <div
                  className="p-3 rounded-xl shrink-0"
                  style={{ background: 'var(--theme-glow, rgba(0,240,255,0.08))', border: '1px solid rgba(0,240,255,0.15)' }}
                >
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

            {/* VibeForge Studios */}
            <Reveal delay={0.4} y={25}>
              <div
                className="interactive-card ml-6 p-7 rounded-2xl flex items-start gap-6"
                style={{
                  background: 'rgba(15,17,21,0.7)',
                  border: '1px solid rgba(59,130,246,0.12)',
                }}
              >
                <div
                  className="p-3 rounded-xl shrink-0"
                  style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
                >
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

        {/* Principles */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '3rem' }}>
          <Reveal delay={0.1}>
            <p className="section-label mb-6">Core Principles</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: '01', title: 'Protect the Core', desc: 'Every decision should serve the central promise of the product or system. Everything else is candidate for removal.' },
              { num: '02', title: 'Structure Before Scale', desc: 'Scaling a broken system creates a bigger broken system. Get the structure right first.' },
              { num: '03', title: 'Remove the Drift', desc: 'Off-core features dilute your message, confuse your users, and drain your resources. Cut them.' },
              { num: '04', title: 'Clarity is the Product', desc: 'In ambiguous situations, the most valuable thing you can deliver is a clear next step and a reason to trust it.' },
            ].map((p, idx) => (
              <Reveal key={p.num} delay={0.2 + (idx * 0.1)} y={20}>
                <div
                  className="interactive-card p-6 rounded-xl"
                  style={{ background: 'rgba(22,25,32,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem' }}>{p.num}</div>
                  <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
