import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box, GitMerge, Crosshair, Shield } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Structure',
    desc: 'Find the true shape inside the mess. Name what it actually is, not what it feels like.',
    accent: 'var(--theme-accent, #00f0ff)',
    icon: Box,
  },
  {
    num: '02',
    title: 'Connect',
    desc: 'See how the parts fit a larger architecture. Understand the system before touching it.',
    accent: '#3b82f6',
    icon: GitMerge,
  },
  {
    num: '03',
    title: 'Leverage',
    desc: 'Clarify where the commercial or strategic value actually lives. Find the real signal.',
    accent: '#6366f1',
    icon: Crosshair,
  },
  {
    num: '04',
    title: 'Refine',
    desc: "Remove dilution. Strengthen the core. Cut what doesn't serve the central promise.",
    accent: '#8b5cf6',
    icon: Shield,
  },
];

function SequenceVisualization({ progress }) {
  // Grid of dots that animate based on progress
  const dots = [];
  const cols = 8;
  const rows = 6;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ r, c, id: `${r}-${c}` });
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          width: '100%',
          maxWidth: '240px',
        }}
      >
        {dots.map((dot) => {
          const idx = dot.r * cols + dot.c;
          const total = rows * cols;
          const normalizedProgress = Math.min(1, Math.max(0, progress));

          // Phase 1 (0-0.25): dots appear scattered → organized
          const appear = normalizedProgress > idx / (total * 4) ? 1 : 0.1;

          // Phase 2 (0.25-0.5): connections form (show borders)
          const connected = normalizedProgress > 0.25;

          // Phase 3 (0.5-0.75): key nodes highlight
          const isKey = (dot.r + dot.c) % 3 === 0;
          const highlighted = normalizedProgress > 0.5 && isKey;

          // Phase 4 (0.75-1): non-essential fade
          const faded = normalizedProgress > 0.75 && !isKey;

          let opacity = appear;
          if (faded) opacity = 0.08;
          if (highlighted) opacity = 1;

          let bg = 'var(--theme-border)';
          if (highlighted) bg = 'var(--theme-accent, #00f0ff)';
          if (faded) bg = 'var(--theme-surface)';

          return (
            <div
              key={dot.id}
              className="rounded-sm transition-all"
              style={{
                width: '100%',
                paddingBottom: '100%',
                background: bg,
                opacity,
                boxShadow: highlighted ? `0 0 8px var(--theme-accent, rgba(0,240,255,0.3))` : 'none',
                border: connected ? '1px solid var(--theme-surface-hover)' : '1px solid transparent',
                transitionDuration: '600ms',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function InteractiveSequence() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const progressBar = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <div ref={ref} className="relative">
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--theme-surface-hover)' }}>
        <motion.div
          className="h-px"
          style={{ width: progressBar, background: 'var(--theme-accent, #00f0ff)' }}
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left: Steps */}
        <div className="lg:col-span-7 space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <StepItem
                key={step.num}
                step={step}
                Icon={Icon}
                index={i}
                scrollProgress={scrollYProgress}
              />
            );
          })}
        </div>

        {/* Right: Visualization */}
        <div className="hidden lg:block lg:col-span-5 sticky top-32">
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'var(--theme-surface)',
              border: '1px solid var(--theme-surface-hover)',
              minHeight: '300px',
            }}
          >
            <p className="text-xs mb-4" style={{ color: 'var(--theme-text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              System State
            </p>
            <SequenceVisualizationMotion scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SequenceVisualizationMotion({ scrollYProgress }) {
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const [currentProgress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = progress.on('change', (v) => setCurrentProgress(v));
    return unsubscribe;
  }, [progress]);

  return <SequenceVisualization progress={currentProgress} />;
}

function StepItem({ step, Icon, index, scrollProgress }) {
  const stepStart = 0.2 + index * 0.15;
  const stepEnd = stepStart + 0.15;
  const opacity = useTransform(scrollProgress, [stepStart - 0.1, stepStart, stepEnd], [0.35, 1, 1]);
  const scale = useTransform(scrollProgress, [stepStart - 0.1, stepStart, stepEnd], [0.98, 1.02, 1]);

  return (
    <motion.div
      data-testid={`operating-sequence-step-${step.title.toLowerCase()}`}
      className="flex flex-col md:flex-row gap-6 md:gap-10 py-8 rounded-xl px-4 -mx-4"
      style={{
        borderTop: '1px solid var(--theme-surface-hover)',
        borderBottom: index === steps.length - 1 ? '1px solid var(--theme-surface-hover)' : 'none',
        opacity,
        scale,
      }}
    >
      <div className="md:w-20 shrink-0 flex items-start gap-3">
        <Icon size={16} style={{ color: step.accent, marginTop: '4px' }} />
        <span
          className="font-extrabold leading-none select-none"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: step.accent,
            opacity: 0.3,
            letterSpacing: '-0.03em',
          }}
        >
          {step.num}
        </span>
      </div>
      <div className="flex-1 pt-1">
        <h3
          className="font-bold text-xl tracking-tight mb-2"
          style={{ color: 'var(--theme-text)' }}
        >
          {step.title}
        </h3>
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--theme-text-subtle)', fontWeight: 300, maxWidth: '38rem' }}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}
