import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Abstract visual panels — CSS-only, no placeholders
function JobForgeVisual() {
  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{
        background: 'rgba(0,240,255,0.03)',
        border: '1px solid rgba(0,240,255,0.12)',
        minHeight: '220px',
        padding: '24px',
      }}
    >
      {/* Abstract workflow nodes */}
      <div className="space-y-3">
        {[
          { label: 'Field intake', w: '100%', c: 'rgba(0,240,255,0.5)' },
          { label: 'Workflow routing', w: '78%', c: 'rgba(0,240,255,0.35)' },
          { label: 'Documentation layer', w: '60%', c: 'rgba(0,240,255,0.22)' },
          { label: 'Reporting output', w: '88%', c: 'rgba(0,240,255,0.15)' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="rounded-sm"
              style={{ width: row.w, height: '6px', background: row.c, flexShrink: 0 }}
            />
            <span
              style={{
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.25)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {row.label}
            </span>
          </div>
        ))}
      </div>
      {/* Corner label */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '16px',
          fontSize: '0.55rem',
          color: 'rgba(0,240,255,0.3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        VibeForge Studios
      </div>
    </div>
  );
}

function ChurnWiseVisual() {
  const subs = [
    { name: 'Tool A', active: true, pct: 92 },
    { name: 'Tool B', active: false, pct: 12 },
    { name: 'Service C', active: true, pct: 67 },
    { name: 'Platform D', active: false, pct: 8 },
    { name: 'App E', active: true, pct: 45 },
  ];
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(59,130,246,0.03)',
        border: '1px solid rgba(59,130,246,0.12)',
        minHeight: '220px',
        padding: '20px',
      }}
    >
      <div
        className="text-xs mb-3"
        style={{
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontSize: '0.55rem',
        }}
      >
        Subscription Stack
      </div>
      <div className="space-y-2.5">
        {subs.map((sub) => (
          <div key={sub.name} className="flex items-center gap-3">
            <div
              className="rounded-sm"
              style={{
                width: '8px',
                height: '8px',
                background: sub.active ? 'rgba(59,130,246,0.7)' : 'rgba(251,113,133,0.5)',
                flexShrink: 0,
              }}
            />
            <div
              className="flex-1 rounded-sm"
              style={{ height: '4px', background: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="rounded-sm"
                style={{
                  width: `${sub.pct}%`,
                  height: '4px',
                  background: sub.active ? 'rgba(59,130,246,0.45)' : 'rgba(251,113,133,0.3)',
                }}
              />
            </div>
            <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', width: '28px', textAlign: 'right' }}>
              {sub.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransplantVisual() {
  const weeks = [3, 7, 5, 9, 6, 8, 4, 7, 9, 10, 8, 9];
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'rgba(139,92,246,0.025)',
        border: '1px solid rgba(139,92,246,0.1)',
        minHeight: '180px',
        padding: '20px',
      }}
    >
      <div
        className="text-xs mb-4"
        style={{
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontSize: '0.55rem',
        }}
      >
        Continuity Signal
      </div>
      <div className="flex items-end gap-1.5" style={{ height: '60px' }}>
        {weeks.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h * 10}%`,
              background: `rgba(139,92,246,${0.15 + i * 0.02})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const systems = [
  {
    id: 'job-forge',
    label: 'Business Systems',
    title: 'Job Forge',
    tag: 'VibeForge Studios',
    accent: '#00f0ff',
    accentBorder: 'rgba(0,240,255,0.18)',
    tagline: 'System design for real-world friction.',
    description: 'A field-first system designed to reduce friction between the work itself and the operational layers around it. Structure the mess, protect the core, and make the system easier to use under real conditions.',
    detail: 'Job Forge addresses the specific problem that field-based operators face: the system supporting the work creates more friction than the work itself. Documentation, scheduling, reporting—all of these become obstacles rather than enablers. The goal is to remove that friction entirely.',
    Visual: JobForgeVisual,
    reverse: false,
  },
  {
    id: 'churnwise',
    label: 'Consumer Utility',
    title: 'ChurnWise',
    tag: 'Consumer Product',
    accent: '#3b82f6',
    accentBorder: 'rgba(59,130,246,0.15)',
    tagline: 'Clear product thinking applied to everyday software.',
    description: 'A cleaner, more focused way to understand and manage subscription drag. Turning a common frustration into something more visible, usable, and controlled—without judgment or added complexity.',
    detail: "Subscription sprawl is a modern problem most people are aware of but few address. ChurnWise makes the invisible visible: showing exactly what you're committed to, what you're not using, and what to do about it.",
    Visual: ChurnWiseVisual,
    reverse: true,
  },
  {
    id: 'transplant-tracker',
    label: 'Human Systems',
    title: 'Transplant Tracker',
    tag: 'Working Title',
    accent: '#8b5cf6',
    accentBorder: 'rgba(139,92,246,0.12)',
    tagline: 'A human system problem, approached with the clarity-first mindset.',
    description: 'A personal and medically relevant system built around continuity, consistency, and everyday management after a major health event. The clarity-first process applies just as much to human-support systems as it does to products and operations.',
    detail: "People managing complex medical realities don't need more apps\u2014they need one system that adapts to how life actually works after a transformative health event. Continuity, not complexity.",
    Visual: TransplantVisual,
    reverse: false,
  },
];

export default function Work() {
  return (
    <div className="pt-16">
      <header
        className="pt-24 pb-16 max-w-6xl mx-auto px-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="section-label mb-4">Curated Portfolio</p>
            <h1
              className="font-extrabold tracking-tight text-white mb-0"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.06 }}
            >
              Selected systems,<br />
              <span
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(170,176,188,0.88) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                proven thinking.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}
            >
              The same method across different problem spaces. Each project reflects a specific class of friction and a specific kind of clarity.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 space-y-0">
        {systems.map((system, idx) => {
          const { Visual } = system;
          return (
            <div
              key={system.id}
              data-testid={`work-project-${system.id}`}
              className="py-12 md:py-16"
              style={{
                borderBottom: idx < systems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <div
                className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-start ${
                  system.reverse ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="section-label"
                      style={{ color: system.accent }}
                    >
                      {system.label}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {system.tag}
                    </span>
                  </div>
                  <h2
                    className="font-extrabold text-white tracking-tight mb-5"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.08 }}
                  >
                    {system.title}
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: '38rem' }}
                  >
                    {system.description}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300, maxWidth: '36rem' }}
                  >
                    {system.detail}
                  </p>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-sm font-medium"
                      style={{ color: system.accent }}
                    >
                      {system.tagline}
                    </span>
                  </div>
                </div>

                {/* Abstract visual — intentional, not placeholder */}
                <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
                  <Visual />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA strip */}
      <div
        className="py-16"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(15,17,21,0.4)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p
              className="text-base font-bold text-white mb-1"
            >
              See how this thinking applies to your situation.
            </p>
            <p
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Every engagement starts with a direct conversation about the actual problem.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/92 transition-colors duration-200 shrink-0"
          >
            Start the conversation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
