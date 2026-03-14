import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Smartphone, Activity, ArrowRight } from 'lucide-react';

const systems = [
  {
    id: 'job-forge',
    icon: Briefcase,
    label: 'Business Systems',
    title: 'Job Forge',
    tag: 'VibeForge Studios',
    accent: '#00f0ff',
    accentBg: 'rgba(0,240,255,0.05)',
    accentBorder: 'rgba(0,240,255,0.18)',
    tagline: 'System design for real-world friction.',
    description: 'A field-first system designed to reduce friction between the work itself and the operational layers around it. It represents my strongest business-facing thinking: structure the mess, protect the core, and make the system easier to use under real conditions.',
    detail: 'Job Forge addresses a specific class of problem that field-based operators face: the system supporting their work creates more friction than the work itself. Documentation tools, scheduling systems, reporting workflows—all of these can become obstacles rather than enablers.',
    reverse: false,
  },
  {
    id: 'churnwise',
    icon: Smartphone,
    label: 'Consumer Utility',
    title: 'ChurnWise',
    tag: 'Consumer Product',
    accent: '#3b82f6',
    accentBg: 'rgba(59,130,246,0.05)',
    accentBorder: 'rgba(59,130,246,0.15)',
    tagline: 'Clear product thinking applied to everyday software.',
    description: 'A cleaner, more focused way to understand and manage subscription drag. It reflects the product side of my work—turning a common frustration into something more visible, usable, and controlled.',
    detail: 'Subscription sprawl is a modern problem most people are aware of but few actively address. ChurnWise is about making the invisible visible: showing exactly what you\'re committed to, what you\'re not using, and what to do about it—without judgment or complexity.',
    reverse: true,
  },
  {
    id: 'transplant-tracker',
    icon: Activity,
    label: 'Human Systems',
    title: 'Transplant Tracker',
    tag: 'Working Title',
    accent: '#8b5cf6',
    accentBg: 'rgba(139,92,246,0.05)',
    accentBorder: 'rgba(139,92,246,0.12)',
    tagline: 'A human system problem, approached with the clarity-first mindset.',
    description: 'A more personal and medically relevant system built around continuity, consistency, and everyday management after a major health event. It shows that the same clarity-first process applies just as much to human-support systems as it does to products and operations.',
    detail: 'The insight behind Transplant Tracker is that people managing complex medical realities don\'t need more apps—they need one system that adapts to how life actually works after a transformative health event. Continuity, not complexity.',
    reverse: false,
  },
];

export default function Work() {
  return (
    <div className="pt-16">
      <header className="pt-24 pb-16 max-w-6xl mx-auto px-6">
        <p className="section-label mb-4">Curated Portfolio</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Selected systems,<br />
          <span className="metallic-text">proven thinking.</span>
        </h1>
        <p className="text-xl text-white/50 max-w-2xl" style={{ fontWeight: 300 }}>
          Selected systems, products, and studio ventures demonstrating range without looking scattered. The same method. Different problem spaces.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 pb-32 space-y-8">
        {systems.map((system) => {
          const Icon = system.icon;
          return (
            <div
              key={system.id}
              data-testid={`work-project-${system.id}`}
              className={`p-8 md:p-12 rounded-2xl flex flex-col md:flex-row gap-10 items-start ${
                system.reverse ? 'md:flex-row-reverse' : ''
              }`}
              style={{
                background: '#0f1115',
                border: `1px solid ${system.accentBorder}`,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="p-2.5 rounded-lg"
                    style={{ background: system.accentBg, border: `1px solid ${system.accentBorder}` }}
                  >
                    <Icon size={16} style={{ color: system.accent }} />
                  </div>
                  <div className="section-label" style={{ color: system.accent }}>{system.label}</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">{system.title}</h2>
                <p className="text-white/55 leading-relaxed text-base mb-5" style={{ fontWeight: 300 }}>{system.description}</p>
                <p className="text-white/40 leading-relaxed text-sm mb-7" style={{ fontWeight: 300 }}>{system.detail}</p>
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded text-xs text-white/50"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {system.tag}
                  </span>
                </div>
              </div>
              <div
                className="md:w-64 lg:w-80 w-full aspect-video rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: system.accentBg,
                  border: `1px solid ${system.accentBorder}`,
                }}
              >
                <div className="text-center">
                  <Icon size={28} style={{ color: system.accent, opacity: 0.4, margin: '0 auto 8px' }} />
                  <p className="text-xs" style={{ color: system.accent, opacity: 0.5 }}>System preview</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <section
        className="py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,17,21,0.4)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">Interested in how this applies to your work?</h3>
            <p className="text-white/45 text-base">Let&apos;s discuss the problem you&apos;re facing.</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200 shrink-0"
          >
            Start a conversation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
