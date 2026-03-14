import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const tiers = [
  {
    id: 1,
    testid: 'service-tier-1',
    num: '01',
    title: 'Clarity Teardown',
    for: 'A specific friction point. A product that feels unclear. A decision that\'s been circling too long.',
    what: 'One concentrated session. I diagnose the immediate friction in your product or workflow, name the actual problem, and give you a structured set of next actions to take out of the room.',
    format: 'Single session · 90 min',
    accentColor: '#00f0ff',
    accentBg: 'rgba(0,240,255,0.04)',
    accentBorder: 'rgba(0,240,255,0.12)',
  },
  {
    id: 2,
    testid: 'service-tier-2',
    num: '02',
    title: 'System Architecture Sprint',
    for: 'Something is structurally broken and you know it. The system is making the work harder than it should be.',
    what: 'A multi-week engagement to map the current state, identify the core breaks, and design a leaner, more reliable system. We build the architecture together, then you run it.',
    format: 'Multi-week · Structured',
    accentColor: '#3b82f6',
    accentBg: 'rgba(59,130,246,0.04)',
    accentBorder: 'rgba(59,130,246,0.12)',
  },
  {
    id: 3,
    testid: 'service-tier-3',
    num: '03',
    title: 'Strategic Operator Support',
    for: 'You\'re growing and you want a clear-eyed systems-thinker available as you make high-stakes decisions.',
    what: 'Ongoing advisory. I\'m a sounding board for product direction, system design, and business structure decisions. Available on a retainer basis—not as a full-time advisor, but as someone who knows your architecture.',
    format: 'Monthly retainer',
    accentColor: '#8b5cf6',
    accentBg: 'rgba(139,92,246,0.04)',
    accentBorder: 'rgba(139,92,246,0.12)',
  },
  {
    id: 4,
    testid: 'service-tier-4',
    num: '04',
    title: 'White-Glove Build',
    flagship: true,
    for: 'You need a system designed and built—not just advised on. End-to-end, from architecture to delivery.',
    what: 'Full system design and build via VibeForge Studios. We architect the solution, build it, and hand off something that works under real conditions. This is the highest-touch engagement I offer.',
    format: 'Project-based · VibeForge Studios',
    accentColor: '#00f0ff',
    accentBg: 'rgba(0,240,255,0.04)',
    accentBorder: 'rgba(0,240,255,0.22)',
  },
];

export default function WorkWithMe() {
  return (
    <div className="pt-16">
      <header
        className="pt-24 pb-16 max-w-5xl mx-auto px-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="section-label mb-4">Work With Me</p>
            <h1
              className="font-extrabold tracking-tight mb-0"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              <span className="text-white">How I engage.</span><br />
              <span
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(160,166,178,0.85) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Four ways to work.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}
            >
              I take on a small number of engagements at any given time. Every engagement is direct—you work with me, not a team. Every output is scoped to the actual problem.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            >
              Have a specific situation? Reach out directly. <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      <div
        data-testid="service-tiers"
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <div className="space-y-4 mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              data-testid={tier.testid}
              className="rounded-2xl relative overflow-hidden"
              style={{
                background: '#0f1115',
                border: `1px solid ${tier.accentBorder}`,
                boxShadow: tier.flagship ? '0 0 40px rgba(0,240,255,0.04)' : 'none',
              }}
            >
              {tier.flagship && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(0,240,255,0.5), transparent)',
                  }}
                />
              )}

              <div className="p-7 md:p-9 flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Left: number + title */}
                <div className="md:w-64 shrink-0">
                  <div className="flex items-start gap-4">
                    <span
                      className="font-extrabold leading-none"
                      style={{
                        fontSize: '1.75rem',
                        color: tier.accentColor,
                        opacity: 0.3,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {tier.num}
                    </span>
                    <div>
                      {tier.flagship && (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold mb-2"
                          style={{
                            background: 'rgba(0,240,255,0.1)',
                            color: '#00f0ff',
                            border: '1px solid rgba(0,240,255,0.2)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.1em',
                          }}
                        >
                          FLAGSHIP
                        </span>
                      )}
                      <h3
                        className="font-extrabold text-white tracking-tight"
                        style={{ fontSize: '1.1rem', lineHeight: 1.2 }}
                      >
                        {tier.title}
                      </h3>
                      <p
                        className="text-xs mt-2"
                        style={{ color: tier.accentColor, opacity: 0.7 }}
                      >
                        {tier.format}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: copy + CTA */}
                <div className="flex-1">
                  <p
                    className="text-xs mb-4 leading-relaxed"
                    style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontStyle: 'italic',
                      borderLeft: `2px solid ${tier.accentColor}22`,
                      paddingLeft: '10px',
                    }}
                  >
                    Best for: {tier.for}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: 'rgba(255,255,255,0.58)', fontWeight: 300 }}
                  >
                    {tier.what}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                    style={{ color: tier.accentColor }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                  >
                    Get in touch about this <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How I work */}
        <div
          className="p-8 md:p-10 rounded-2xl"
          style={{
            background: 'rgba(15,17,21,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p className="section-label mb-7">What working with me looks like</p>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                title: 'Selective intake',
                desc: 'I limit active engagements to maintain depth. If I\'m at capacity, I\'ll tell you upfront rather than take your money and underdeliver.',
              },
              {
                title: 'No middlemen',
                desc: 'No account managers. No delegate calls. You work directly with me from the first conversation to the final output.',
              },
              {
                title: 'Systems, not slides',
                desc: 'The deliverable is a cleaner system, a clearer strategy, or a product that works—not a polished deck that nobody uses.',
              },
            ].map((item) => (
              <div key={item.title}>
                <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div
            className="mt-10 pt-7"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/92 transition-colors duration-200"
            >
              Start the Conversation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
