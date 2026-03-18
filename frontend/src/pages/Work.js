import React from 'react';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { STATUS_COLORS } from '../utils/statusColors';

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
                color: 'var(--theme-text-subtle)',
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
          color: 'var(--theme-text-subtle)',
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
              style={{ height: '4px', background: 'var(--theme-surface)' }}
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
            <span style={{ fontSize: '0.6rem', color: 'var(--theme-text-subtle)', width: '28px', textAlign: 'right' }}>
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
          color: 'var(--theme-text-subtle)',
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
    status: 'beta',
    statusLabel: 'Beta',
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
    status: 'active build',
    statusLabel: 'Active Build',
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
    status: 'active build',
    statusLabel: 'Active Build',
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
      <SEO title="Work" description="Selected systems and projects — case studies in turning ambiguity into structure and leverage." path="/work" />
      <header
        className="pt-24 pb-16 max-w-6xl mx-auto px-6"
        style={{ borderBottom: '1px solid var(--theme-surface-hover)' }}
      >
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="section-label mb-4">Curated Portfolio</p>
            <h1
              className="font-extrabold tracking-tight mb-0"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.06, color: 'var(--theme-text)' }}
            >
              Selected systems,<br />
              <span
                style={{
                  background: 'linear-gradient(180deg, var(--theme-text) 0%, var(--theme-text-secondary) 100%)',
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
              style={{ color: 'var(--theme-text-subtle)', fontWeight: 300 }}
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
            <Reveal key={system.id} delay={0.2 + (idx * 0.15)} y={40}>
              <div
                data-testid={`work-project-${system.id}`}
                className="py-12 md:py-16"
                style={{
                  borderBottom: idx < systems.length - 1 ? '1px solid var(--theme-surface-hover)' : 'none',
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
                        background: 'var(--theme-surface)',
                        border: '1px solid var(--theme-surface-border)',
                        color: 'var(--theme-text-subtle)',
                      }}
                    >
                      {system.tag}
                    </span>
                    {system.statusLabel && (
                      <span
                        className="text-xs px-2 py-0.5 rounded flex items-center gap-1.5"
                        style={{
                          background: `${STATUS_COLORS[system.status] || 'var(--theme-text-subtle)'}12`,
                          border: `1px solid ${STATUS_COLORS[system.status] || 'var(--theme-text-subtle)'}30`,
                          color: STATUS_COLORS[system.status] || 'var(--theme-text-subtle)',
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />
                        {system.statusLabel}
                      </span>
                    )}
                  </div>
                  <h2
                    className="font-extrabold tracking-tight mb-5"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.08, color: 'var(--theme-text)' }}
                  >
                    {system.title}
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{ color: 'var(--theme-text-muted)', fontWeight: 300, maxWidth: '38rem' }}
                  >
                    {system.description}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{ color: 'var(--theme-text-subtle)', fontWeight: 300, maxWidth: '36rem' }}
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
                  <Link
                    to={`/work/${system.id}`}
                    data-testid={`cta-project-${system.id}`}
                    className="group inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                    style={{
                      background: `${system.accent}08`,
                      border: `1px solid ${system.accent}22`,
                      color: system.accent,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${system.accent}15`;
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${system.accent}08`;
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    View Case Study <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Abstract visual — intentional, not placeholder */}
                <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
                  <Visual />
                </div>
              </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* CTA strip */}
      <Reveal delay={0.3}>
        <div
          className="py-16"
          style={{
            borderTop: '1px solid var(--theme-surface-hover)',
            background: 'var(--theme-bg1)',
          }}
        >
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <p
                className="text-base font-bold mb-1"
                style={{ color: 'var(--theme-text)' }}
              >
                See how this thinking applies to your situation.
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--theme-text-subtle)' }}
              >
                Every engagement starts with a direct conversation about the actual problem.
              </p>
            </div>
            <Link
              to="/contact"
              data-testid="work-bottom-cta"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shrink-0"
              style={{
                background: 'white',
                color: 'black',
                boxShadow: '0 4px 20px var(--theme-shadow-color, rgba(255,255,255,0.1))',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px var(--theme-shadow-color, rgba(255,255,255,0.15))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px var(--theme-shadow-color, rgba(255,255,255,0.1))';
              }}
            >
              Start the conversation <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
