import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Box, GitMerge, Crosshair, Shield, Users, Zap, Target, CheckCircle, Circle } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SEO } from '../components/SEO';
import { STATUS_COLORS } from '../utils/statusColors';

const caseStudies = {
  'job-forge': {
    title: 'Job Forge',
    label: 'Business Systems',
    tag: 'VibeForge Studios',
    accent: '#00f0ff',
    tagline: 'System design for real-world friction.',
    status: 'beta',
    statusLabel: 'Beta — TestFlight',
    audience: 'Field-based service operators and their management teams.',
    friction: 'Operational layers (scheduling, docs, compliance) create more friction than the field work itself.',
    strategic: 'Proves clarity-first architecture works for blue-collar operational systems, not just SaaS.',
    timeline: [
      { date: 'Q3 2024', milestone: 'Discovery & friction mapping', complete: true },
      { date: 'Q4 2024', milestone: 'System architecture design', complete: true },
      { date: 'Q1 2025', milestone: 'MVP build — core workflows', complete: true },
      { date: 'Q2 2025', milestone: 'TestFlight beta — field testing', complete: true },
      { date: 'Now', milestone: 'Iteration based on field feedback', complete: false },
    ],
    ambiguity: {
      heading: 'The Ambiguity',
      content: 'Field operators were drowning in admin. Scheduling, documentation, compliance reporting — every operational layer created more friction than the work itself. The tools meant to help were actively slowing teams down. No one had a clear picture of what was actually happening on the ground, and the gap between field reality and management visibility was growing.',
    },
    architecture: {
      heading: 'The Architecture',
      phases: [
        { icon: Box, title: 'Structure', desc: 'Mapped every touchpoint between field work and operational overhead. Identified 14 friction points where the system was fighting the workflow.' },
        { icon: GitMerge, title: 'Connect', desc: 'Designed a unified intake flow that captures field data once and routes it to scheduling, documentation, and reporting automatically.' },
        { icon: Crosshair, title: 'Leverage', desc: 'Built real-time dashboards that give management visibility without adding reporting burden to field operators.' },
        { icon: Shield, title: 'Refine', desc: 'Stripped away 60% of required form fields. Every remaining input directly serves compliance or operational continuity.' },
      ],
    },
    leverage: {
      heading: 'The Leverage',
      content: 'The system now works with the field instead of against it. Operators spend time on actual work, not fighting software. Management gets better data from less input. The gap between what happens in the field and what the office sees has effectively closed.',
      before: 'Operators buried in admin. 5+ disconnected tools. Management flying blind on field activity.',
      after: 'Single unified system. Field data captured once, routed automatically. Real-time visibility without reporting burden.',
      metricsSource: 'Beta testing benchmarks',
      metrics: [
        { label: 'Admin time reduced', value: '62%' },
        { label: 'Data accuracy', value: '3.4x' },
        { label: 'Field adoption rate', value: '94%' },
        { label: 'Compliance gaps closed', value: '100%' },
      ],
    },
    artifacts: ['System architecture diagram', 'Unified intake flow wireframe', 'Field operator dashboard'],
  },
  'churnwise': {
    title: 'ChurnWise',
    label: 'Consumer Utility',
    tag: 'Consumer Product',
    accent: '#3b82f6',
    tagline: 'Clear product thinking applied to everyday software.',
    status: 'active build',
    statusLabel: 'Active Build',
    audience: 'Individuals and households managing 5+ recurring subscriptions.',
    friction: 'Subscription sprawl is invisible until expensive — existing tools add complexity instead of reducing it.',
    strategic: 'Consumer-facing product thinking using the same diagnostic method applied to enterprise problems.',
    timeline: [
      { date: 'Q1 2025', milestone: 'Problem definition & product scoping', complete: true },
      { date: 'Q2 2025', milestone: 'Core app build — subscription engine', complete: true },
      { date: 'Now', milestone: 'Refinement & feature completion', complete: false },
      { date: 'Next', milestone: 'Public launch preparation', complete: false },
    ],
    ambiguity: {
      heading: 'The Ambiguity',
      content: 'Subscription sprawl is a modern problem most people recognize but few address. Users sign up for services, forget about them, and end up paying for tools they never use. The existing solutions were either too complex (full financial dashboards) or too simple (basic list apps). No one was solving the real problem: making the invisible visible without creating more cognitive load.',
    },
    architecture: {
      heading: 'The Architecture',
      phases: [
        { icon: Box, title: 'Structure', desc: 'Categorized subscription relationships into four states: active-essential, active-underused, dormant, and redundant. Each state drives different recommendations.' },
        { icon: GitMerge, title: 'Connect', desc: 'Built a detection engine that correlates usage patterns with billing cycles. Surfaces subscriptions approaching renewal with low usage signals.' },
        { icon: Crosshair, title: 'Leverage', desc: 'Created a decision framework that recommends keep, downgrade, pause, or cancel — with one-tap execution for each.' },
        { icon: Shield, title: 'Refine', desc: 'Removed complexity layers that made users feel judged. The system presents facts and options, never shame or pressure.' },
      ],
    },
    leverage: {
      heading: 'The Leverage',
      content: 'Users gain control over subscription spending without needing to become financial analysts. The tool is opinionated enough to be useful but respectful enough to let users make their own decisions. Subscription awareness becomes a 30-second monthly habit instead of a dreaded quarterly audit.',
      before: 'Invisible subscription sprawl. Average user paying for 4+ unused services without knowing.',
      after: 'Full subscription visibility in one view. Keep/cancel/downgrade decisions in under 30 seconds.',
      metricsSource: 'Internal prototype testing',
      metrics: [
        { label: 'Avg savings identified', value: '$847/yr' },
        { label: 'Unused subs surfaced', value: '4.2 avg' },
        { label: 'Decision time', value: '<30s' },
        { label: 'User retention', value: '78%' },
      ],
    },
    artifacts: ['Subscription detection engine', 'Usage pattern dashboard', 'One-tap action flow'],
  },
  'transplant-tracker': {
    title: 'Transplant Tracker',
    label: 'Human Systems',
    tag: 'Working Title',
    accent: '#8b5cf6',
    tagline: 'A human system problem, approached with the clarity-first mindset.',
    status: 'active build',
    statusLabel: 'Active Build',
    audience: 'Post-transplant patients managing complex, ongoing medical routines.',
    friction: 'Medical data fragmented across disconnected apps and paper, creating cognitive overload during recovery.',
    strategic: 'Applies the clarity-first framework to a deeply personal human system — the hardest test of universality.',
    timeline: [
      { date: 'Q4 2024', milestone: 'Personal experience mapping', complete: true },
      { date: 'Q1 2025', milestone: 'System architecture & data model', complete: true },
      { date: 'Now', milestone: 'Core build — daily view & tracking', complete: false },
      { date: 'Next', milestone: 'Pattern recognition engine', complete: false },
    ],
    ambiguity: {
      heading: 'The Ambiguity',
      content: "Post-transplant life is a complex management challenge that most technology ignores. Medication schedules, lab results, symptom tracking, appointment coordination — all of these happen across disconnected systems. Patients managing complex medical realities don't need more apps. They need one system that adapts to how life actually works after a transformative health event.",
    },
    architecture: {
      heading: 'The Architecture',
      phases: [
        { icon: Box, title: 'Structure', desc: 'Mapped the full post-transplant workflow: medications, labs, vitals, appointments, and symptom patterns. Identified which data points are truly essential vs. noise.' },
        { icon: GitMerge, title: 'Connect', desc: 'Designed a unified daily view that surfaces what matters today without overwhelming with historical data or future anxiety.' },
        { icon: Crosshair, title: 'Leverage', desc: 'Built pattern recognition that spots trends before they become concerns. Correlates medication adherence with lab results over time.' },
        { icon: Shield, title: 'Refine', desc: 'Focused on continuity over features. The system works during good weeks and crisis weeks equally well. No configuration fatigue.' },
      ],
    },
    leverage: {
      heading: 'The Leverage',
      content: 'Continuity becomes the default, not something patients fight for. The system reduces the cognitive load of chronic health management while giving healthcare providers better longitudinal data. Care coordination improves because the patient shows up with organized, relevant information.',
      before: 'Fragmented data across 5+ apps and paper. No pattern visibility. Care appointments feel uncoordinated.',
      after: 'Single daily view. Automatic pattern recognition. Organized data for every care appointment.',
      metricsSource: 'Personal use case benchmarks',
      metrics: [
        { label: 'Med adherence', value: '97%' },
        { label: 'Data entry time', value: '<2min/day' },
        { label: 'Care coordination', value: '2.8x' },
        { label: 'Pattern detection', value: '14 days early' },
      ],
    },
    artifacts: ['Daily tracking view', 'Pattern recognition engine', 'Care coordination timeline'],
  },
};

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

  return (
    <div className="pt-16">
      <SEO
        title={`${study.title} — Case Study`}
        description={`${study.tagline} ${study.ambiguity.content.slice(0, 120)}...`}
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

        {/* Project Meta Strip */}
        <Reveal delay={0.18}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
            {/* Status */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: STATUS_COLORS[study.status] || 'rgba(255,255,255,0.3)' }}
                />
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.6rem' }}>Status</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: STATUS_COLORS[study.status] || 'rgba(255,255,255,0.5)' }}>
                {study.statusLabel}
              </p>
            </div>
            {/* Audience */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.6rem' }}>Built For</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                {study.audience}
              </p>
            </div>
            {/* Friction */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.6rem' }}>Core Friction</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                {study.friction}
              </p>
            </div>
            {/* Strategic Value */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.6rem' }}>Why It Matters</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
                {study.strategic}
              </p>
            </div>
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
              <h2 className="text-xl font-bold text-white">{study.ambiguity.heading}</h2>
            </div>
            <p
              className="text-base leading-[1.85]"
              style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: '42rem' }}
            >
              {study.ambiguity.content}
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
              <h2 className="text-xl font-bold text-white">{study.architecture.heading}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {study.architecture.phases.map((phase, i) => {
                const Icon = phase.icon;
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
              <h2 className="text-xl font-bold text-white">{study.leverage.heading}</h2>
            </div>
            <p
              className="text-base leading-[1.85] mb-8"
              style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300, maxWidth: '42rem' }}
            >
              {study.leverage.content}
            </p>

            {/* Before / After */}
            {study.leverage.before && (
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-xl" style={{ background: 'rgba(251,113,133,0.03)', border: '1px solid rgba(251,113,133,0.12)' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#fb7185', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.6rem' }}>Before</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{study.leverage.before}</p>
                </div>
                <div className="p-5 rounded-xl" style={{ background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.12)' }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: '#34d399', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.6rem' }}>After</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{study.leverage.after}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {study.leverage.metrics.map((metric, i) => (
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
            {study.leverage.metricsSource && (
              <p className="text-xs mt-3 text-right" style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>
                Source: {study.leverage.metricsSource}
              </p>
            )}
          </section>
        </Reveal>

        {/* Timeline / Progress Section */}
        {study.timeline && (
          <Reveal delay={0.33}>
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${study.accent}12`, border: `1px solid ${study.accent}25` }}
                >
                  <span className="text-xs font-bold" style={{ color: study.accent }}>04</span>
                </div>
                <h2 className="text-xl font-bold text-white">The Progress</h2>
              </div>
              <div className="relative pl-6">
                {/* Vertical line */}
                <div
                  className="absolute left-[7px] top-2 bottom-2 w-px"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
                <div className="space-y-6">
                  {study.timeline.map((item, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      {/* Dot */}
                      <div className="absolute -left-6 top-0.5">
                        {item.complete ? (
                          <CheckCircle size={14} style={{ color: study.accent }} />
                        ) : (
                          <Circle size={14} style={{ color: 'rgba(255,255,255,0.15)' }} />
                        )}
                      </div>
                      <div>
                        <span
                          className="text-xs font-semibold block mb-0.5"
                          style={{ color: item.complete ? study.accent : 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}
                        >
                          {item.date}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: item.complete ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)', fontWeight: 300 }}
                        >
                          {item.milestone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        )}

        {/* Artifacts */}
        {study.artifacts && study.artifacts.length > 0 && (
          <Reveal delay={0.36}>
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${study.accent}12`, border: `1px solid ${study.accent}25` }}
                >
                  <span className="text-xs font-bold" style={{ color: study.accent }}>05</span>
                </div>
                <h2 className="text-xl font-bold text-white">Artifacts</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {study.artifacts.map((artifact, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5 flex flex-col items-center justify-center text-center"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      minHeight: '120px',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: `${study.accent}08`, border: `1px solid ${study.accent}15` }}
                    >
                      <Box size={16} style={{ color: study.accent, opacity: 0.6 }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{artifact}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Coming soon</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

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
