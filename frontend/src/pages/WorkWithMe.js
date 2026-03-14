import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const tiers = [
  {
    id: 1,
    testid: 'service-tier-1',
    title: 'Clarity Teardown',
    for: 'Founders with a specific friction point or a product that feels unclear.',
    what: 'A concentrated strategy session to diagnose immediate friction in your product or workflow. You walk out with a clear problem statement, a structured diagnosis, and a prioritized set of next actions.',
    format: 'Single session · 90 minutes',
    accent: '#00f0ff',
  },
  {
    id: 2,
    testid: 'service-tier-2',
    title: 'System Architecture Sprint',
    for: 'Operators who know something is structurally broken but need help diagnosing and rebuilding.',
    what: 'A multi-week engagement to rebuild, simplify, and structure your operational workflows. We map the current state, identify the core breaks, and design a leaner, more reliable system.',
    format: 'Multi-week · Structured engagement',
    accent: '#3b82f6',
  },
  {
    id: 3,
    testid: 'service-tier-3',
    title: 'Strategic Operator Support',
    for: 'Founders who want a clear-eyed systems-thinker available as they grow.',
    what: 'Ongoing advisory for founders needing a clarity-first perspective in their corner. Available as a sounding board for big decisions, system design choices, and product direction.',
    format: 'Ongoing · Monthly retainer',
    accent: '#8b5cf6',
  },
  {
    id: 4,
    testid: 'service-tier-4',
    title: 'White-Glove Build',
    flagship: true,
    for: 'Businesses that need a system designed and built, not just advised on.',
    what: 'Full system design and build advisory via VibeForge Studios. We architect and build the solution. From workflow automation to product development, this is end-to-end engagement.',
    format: 'Project-based · VibeForge Studios',
    accent: '#00f0ff',
  },
];

export default function WorkWithMe() {
  return (
    <div className="pt-16">
      <header className="pt-24 pb-16 max-w-5xl mx-auto px-6">
        <p className="section-label mb-4">Work With Me</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="text-white">Elegant service framing</span><br />
          <span className="metallic-text">for complex situations.</span>
        </h1>
        <p className="text-xl text-white/50 max-w-2xl" style={{ fontWeight: 300 }}>
          Four ways to engage. Each designed for a different kind of problem, depth of need, and type of working relationship.
        </p>
      </header>

      <div
        data-testid="service-tiers"
        className="max-w-5xl mx-auto px-6 pb-24"
      >
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              data-testid={tier.testid}
              className="p-8 rounded-2xl flex flex-col relative"
              style={{
                background: '#0f1115',
                border: tier.flagship
                  ? `1px solid rgba(0,240,255,0.25)`
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: tier.flagship ? '0 0 32px rgba(0,240,255,0.06)' : 'none',
              }}
            >
              {tier.flagship && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-bold flex items-center gap-1"
                  style={{ background: '#00f0ff', color: '#08090a' }}
                >
                  <Star size={10} /> Flagship
                </div>
              )}
              <div className="flex-1">
                <div className="section-label mb-3" style={{ color: tier.accent }}>{tier.format}</div>
                <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight">{tier.title}</h3>
                <p
                  className="text-sm text-white/40 mb-4 pb-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <strong className="text-white/55 font-medium">Best for:</strong> {tier.for}
                </p>
                <p className="text-sm text-white/55 leading-relaxed">{tier.what}</p>
              </div>
              <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: tier.accent }}
                >
                  Inquire <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How I work */}
        <div
          className="p-8 md:p-10 rounded-2xl"
          style={{ background: 'rgba(15,17,21,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="section-label mb-5">How I Work</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Selective intake', desc: 'I take on a small number of engagements at a time to maintain quality and depth of attention.' },
              { title: 'Direct communication', desc: 'No account managers or middlemen. You work directly with me from first call to final output.' },
              { title: 'Results, not reports', desc: 'The output is a cleaner system, a clearer strategy, or a product that actually works—not a 40-page deck.' },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
