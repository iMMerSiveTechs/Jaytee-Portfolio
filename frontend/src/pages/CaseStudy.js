import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Box, GitMerge, Crosshair, Shield } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { projects } from '../content/siteContent';

const phaseIconMap = { Box, GitMerge, Crosshair, Shield };
const caseStudies = Object.fromEntries(projects.map((project) => [project.id, project]));

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const study = caseStudies[slug];

  if (!study) {
    return (
      <div className="pt-28 max-w-2xl mx-auto px-6 text-center">
        <p className="text-white/40 mb-6">Case study not found.</p>
        <button onClick={() => navigate('/work')} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
          Back to Work
        </button>
      </div>
    );
  }

  const slugs = Object.keys(caseStudies);
  const currentIdx = slugs.indexOf(slug);
  const nextSlug = slugs[(currentIdx + 1) % slugs.length];
  const nextStudy = caseStudies[nextSlug];
  const caseStudy = study.caseStudy;

  return (
    <div className="pt-16">
      <SEO
        title={`${study.title} — Case Study`}
        description={`${study.tagline} ${caseStudy.ambiguity.content.slice(0, 120)}...`}
        path={`/work/${slug}`}
      />

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-32">
        {/* Back link */}
        <Reveal delay={0.1}>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Work
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal delay={0.15}>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-5">
              <span className="section-label" style={{ color: study.accent }}>{study.label}</span>
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                {study.tag}
              </span>
            </div>
            <h1
              className="font-extrabold text-white tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.07 }}
            >
              {study.title}
            </h1>
            <p className="text-lg" style={{ color: study.accent, fontWeight: 500 }}>
              {study.tagline}
            </p>
          </div>
        </Reveal>

        {/* Ambiguity Section */}
        <Reveal delay={0.2}>
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${study.accent}12`, border: `1px solid ${study.accent}25` }}
              >
                <span className="text-xs font-bold" style={{ color: study.accent }}>01</span>
              </div>
              <h2 className="text-xl font-bold text-white">{caseStudy.ambiguity.heading}</h2>
            </div>
            <p
              className="text-base leading-[1.85]"
              style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: '42rem' }}
            >
              {caseStudy.ambiguity.content}
            </p>
          </section>
        </Reveal>

        {/* Architecture Section */}
        <Reveal delay={0.25}>
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${study.accent}12`, border: `1px solid ${study.accent}25` }}
              >
                <span className="text-xs font-bold" style={{ color: study.accent }}>02</span>
              </div>
              <h2 className="text-xl font-bold text-white">{caseStudy.architecture.heading}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {caseStudy.architecture.phases.map((phase, i) => {
                const Icon = phaseIconMap[phase.icon] || Box;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={16} style={{ color: study.accent }} />
                      <h3 className="text-sm font-bold text-white">{phase.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
                      {phase.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Leverage Section */}
        <Reveal delay={0.3}>
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${study.accent}12`, border: `1px solid ${study.accent}25` }}
              >
                <span className="text-xs font-bold" style={{ color: study.accent }}>03</span>
              </div>
              <h2 className="text-xl font-bold text-white">{caseStudy.leverage.heading}</h2>
            </div>
            <p
              className="text-base leading-[1.85] mb-8"
              style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: '42rem' }}
            >
              {caseStudy.leverage.content}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {caseStudy.leverage.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: `${study.accent}06`,
                    border: `1px solid ${study.accent}15`,
                  }}
                >
                  <div className="text-2xl font-extrabold mb-1" style={{ color: study.accent }}>
                    {metric.value}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.35}>
          <section
            className="rounded-2xl p-8 md:p-10 mb-16"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h2 className="text-lg font-bold text-white mb-2">Discuss This System</h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              If this kind of thinking applies to your situation, let's talk about it.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
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
          </section>
        </Reveal>

        {/* Next case study */}
        <Reveal delay={0.4}>
          <Link
            to={`/work/${nextSlug}`}
            className="group flex items-center justify-between rounded-xl p-6 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${nextStudy.accent}30`;
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            <div>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Next Case Study</span>
              <h3 className="text-lg font-bold text-white mt-1">{nextStudy.title}</h3>
              <p className="text-sm" style={{ color: nextStudy.accent }}>{nextStudy.tagline}</p>
            </div>
            <ArrowRight size={18} style={{ color: 'rgba(255,255,255,0.3)' }} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
