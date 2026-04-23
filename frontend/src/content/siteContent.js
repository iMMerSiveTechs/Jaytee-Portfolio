import { Home, User, Briefcase, Wrench, Mail, BookOpen } from 'lucide-react';

export const pages = [
  { id: 'home', title: 'Home', description: 'Portfolio homepage', url: '/', icon: Home, type: 'page' },
  { id: 'about', title: 'About', description: 'Philosophy and brand architecture', url: '/about', icon: User, type: 'page' },
  { id: 'work', title: 'Work', description: 'Selected systems and projects', url: '/work', icon: Briefcase, type: 'page' },
  { id: 'tools', title: 'Clarity Lab', description: 'AI-powered operator tools', url: '/tools', icon: Wrench, type: 'page' },
  { id: 'work-with-me', title: 'Work With Me', description: 'Service tiers and engagement options', url: '/work-with-me', icon: Briefcase, type: 'page' },
  { id: 'notes', title: 'Notes', description: 'Writing and insights', url: '/notes', icon: BookOpen, type: 'page' },
  { id: 'contact', title: 'Contact', description: 'Get in touch', url: '/contact', icon: Mail, type: 'page' },
];

export const projects = [
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
    reverse: false,
    searchDescription: 'Field-first business system for reducing operational friction between field work and admin layers.',
    caseStudy: {
      ambiguity: {
        heading: 'The Ambiguity',
        content: 'Field operators were drowning in admin. Scheduling, documentation, compliance reporting — every operational layer created more friction than the work itself. The tools meant to help were actively slowing teams down. No one had a clear picture of what was actually happening on the ground, and the gap between field reality and management visibility was growing.',
      },
      architecture: {
        heading: 'The Architecture',
        phases: [
          { icon: 'Box', title: 'Structure', desc: 'Mapped every touchpoint between field work and operational overhead. Identified 14 friction points where the system was fighting the workflow.' },
          { icon: 'GitMerge', title: 'Connect', desc: 'Designed a unified intake flow that captures field data once and routes it to scheduling, documentation, and reporting automatically.' },
          { icon: 'Crosshair', title: 'Leverage', desc: 'Built real-time dashboards that give management visibility without adding reporting burden to field operators.' },
          { icon: 'Shield', title: 'Refine', desc: 'Stripped away 60% of required form fields. Every remaining input directly serves compliance or operational continuity.' },
        ],
      },
      leverage: {
        heading: 'The Leverage',
        content: 'The system now works with the field instead of against it. Operators spend time on actual work, not fighting software. Management gets better data from less input. The gap between what happens in the field and what the office sees has effectively closed.',
        metrics: [
          { label: 'Admin time reduced', value: '62%' },
          { label: 'Data accuracy', value: '3.4x' },
          { label: 'Field adoption rate', value: '94%' },
          { label: 'Compliance gaps closed', value: '100%' },
        ],
      },
    },
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
    reverse: true,
    searchDescription: 'Consumer subscription-clarity tool for making recurring software spending visible and manageable.',
    caseStudy: {
      ambiguity: {
        heading: 'The Ambiguity',
        content: 'Subscription sprawl is a modern problem most people recognize but few address. Users sign up for services, forget about them, and end up paying for tools they never use. The existing solutions were either too complex (full financial dashboards) or too simple (basic list apps). No one was solving the real problem: making the invisible visible without creating more cognitive load.',
      },
      architecture: {
        heading: 'The Architecture',
        phases: [
          { icon: 'Box', title: 'Structure', desc: 'Categorized subscription relationships into four states: active-essential, active-underused, dormant, and redundant. Each state drives different recommendations.' },
          { icon: 'GitMerge', title: 'Connect', desc: 'Built a detection engine that correlates usage patterns with billing cycles. Surfaces subscriptions approaching renewal with low usage signals.' },
          { icon: 'Crosshair', title: 'Leverage', desc: 'Created a decision framework that recommends keep, downgrade, pause, or cancel — with one-tap execution for each.' },
          { icon: 'Shield', title: 'Refine', desc: 'Removed complexity layers that made users feel judged. The system presents facts and options, never shame or pressure.' },
        ],
      },
      leverage: {
        heading: 'The Leverage',
        content: 'Users gain control over subscription spending without needing to become financial analysts. The tool is opinionated enough to be useful but respectful enough to let users make their own decisions. Subscription awareness becomes a 30-second monthly habit instead of a dreaded quarterly audit.',
        metrics: [
          { label: 'Avg savings identified', value: '$847/yr' },
          { label: 'Unused subs surfaced', value: '4.2 avg' },
          { label: 'Decision time', value: '<30s' },
          { label: 'User retention', value: '78%' },
        ],
      },
    },
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
    detail: "People managing complex medical realities don't need more apps—they need one system that adapts to how life actually works after a transformative health event. Continuity, not complexity.",
    reverse: false,
    searchDescription: 'Continuity-first health-management system for life after a major transplant event.',
    caseStudy: {
      ambiguity: {
        heading: 'The Ambiguity',
        content: "Post-transplant life is a complex management challenge that most technology ignores. Medication schedules, lab results, symptom tracking, appointment coordination — all of these happen across disconnected systems. Patients managing complex medical realities don't need more apps. They need one system that adapts to how life actually works after a transformative health event.",
      },
      architecture: {
        heading: 'The Architecture',
        phases: [
          { icon: 'Box', title: 'Structure', desc: 'Mapped the full post-transplant workflow: medications, labs, vitals, appointments, and symptom patterns. Identified which data points are truly essential vs. noise.' },
          { icon: 'GitMerge', title: 'Connect', desc: 'Designed a unified daily view that surfaces what matters today without overwhelming with historical data or future anxiety.' },
          { icon: 'Crosshair', title: 'Leverage', desc: 'Built pattern recognition that spots trends before they become concerns. Correlates medication adherence with lab results over time.' },
          { icon: 'Shield', title: 'Refine', desc: 'Focused on continuity over features. The system works during good weeks and crisis weeks equally well. No configuration fatigue.' },
        ],
      },
      leverage: {
        heading: 'The Leverage',
        content: 'Continuity becomes the default, not something patients fight for. The system reduces the cognitive load of chronic health management while giving healthcare providers better longitudinal data. Care coordination improves because the patient shows up with organized, relevant information.',
        metrics: [
          { label: 'Med adherence', value: '97%' },
          { label: 'Data entry time', value: '<2min/day' },
          { label: 'Care coordination', value: '2.8x' },
          { label: 'Pattern detection', value: '14 days early' },
        ],
      },
    },
  },
];

export const tools = [
  { id: 'tool-chaos', title: 'The Chaos Translator', description: 'Structure messy thinking into clarity', url: '/tools', type: 'tool' },
  { id: 'tool-bloat', title: 'The Bloat Detector', description: 'Identify core vs off-core features', url: '/tools', type: 'tool' },
  { id: 'tool-friction', title: 'The Friction Auditor', description: 'Diagnose workflow bottlenecks', url: '/tools', type: 'tool' },
  { id: 'tool-scope', title: 'The Scope Slicer', description: 'Cut scope to protect your core bet', url: '/tools', type: 'tool' },
];

export const services = [
  { id: 'service-teardown', title: 'Clarity Teardown', description: 'One session diagnosis', url: '/work-with-me', type: 'service' },
  { id: 'service-sprint', title: 'System Architecture Sprint', description: 'Multi-week engagement', url: '/work-with-me', type: 'service' },
  { id: 'service-operator', title: 'Strategic Operator Support', description: 'Ongoing advisory', url: '/work-with-me', type: 'service' },
  { id: 'service-build', title: 'White-Glove Build', description: 'Full system delivery', url: '/work-with-me', type: 'service' },
];

export const socials = [];
