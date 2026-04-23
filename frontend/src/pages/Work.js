import React from 'react';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { projects } from '../content/siteContent';

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

const visualByProjectId = {
  'job-forge': JobForgeVisual,
  churnwise: ChurnWiseVisual,
  'transplant-tracker': TransplantVisual,
};

const systems = projects.map((project) => ({
  ...project,
  Visual: visualByProjectId[project.id],
}));

export default function Work() {
  return (
    <div className="pt-16">
      <SEO title="Work" description="Selected systems and projects — case studies in turning ambiguity into structure and leverage." path="/work" />
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
            <Reveal key={system.id} delay={0.2 + (idx * 0.15)} y={40}>
              <div
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
                  {Visual ? <Visual /> : null}
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
              data-testid="work-bottom-cta"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 shrink-0"
              style={{
                background: 'white',
                color: 'black',
                boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.1)';
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
