import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { toast } from 'sonner';
import { ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { hapticMedium } from '../utils/haptics';
import { SEO } from '../components/SEO';
import { AnimatePresence, motion } from 'framer-motion';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

const services = [
  'Clarity Teardown',
  'System Architecture Sprint',
  'Strategic Operator Support',
  'White-Glove Build',
  'General Inquiry',
  'Partnership or Collaboration',
];

const budgets = [
  'Not sure yet',
  'Under $2,500',
  '$2,500 – $7,500',
  '$7,500 – $20,000',
  '$20,000+',
];

const timelines = [
  'Flexible',
  'ASAP',
  'Within 1 month',
  '1–3 months',
  '3+ months',
];

const fieldStyle = {
  background: 'rgba(18,21,28,0.9)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '11px 14px',
  color: 'rgba(255,255,255,0.88)',
  fontSize: '14px',
  width: '100%',
  transition: 'border-color 200ms',
  outline: 'none',
  fontFamily: 'inherit',
};

const focus = () => (e) => { e.target.style.borderColor = 'var(--theme-accent, #00f0ff)'; };
const blur = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; };

const stepVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2 } }),
};

export default function Contact() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '',
    budget: '', timeline: '', message: '', honeypot: '',
    triedAlready: '', breakingMost: '', successLooksLike: ''
  });
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill from tool-to-lead flow or URL params
  useEffect(() => {
    if (location.state?.toolOutput) {
      setForm(f => ({
        ...f,
        message: location.state.toolOutput,
        service: location.state.service || f.service,
      }));
    }
    const svc = searchParams.get('service');
    if (svc) setForm(f => ({ ...f, service: svc }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const goNext = () => {
    hapticMedium();
    if (step === 0 && !form.service) {
      toast.error('Please select what fits best.');
      return;
    }
    if (step === 0 && !form.message.trim()) {
      toast.error('Please describe the situation.');
      return;
    }
    if (step === 0 && form.message.trim().length < 20) {
      toast.error('Please share a bit more context (at least 20 characters).');
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    hapticMedium();
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    hapticMedium();
    if (!form.name.trim()) { toast.error('Name is required.'); return; }
    if (!form.email.trim()) { toast.error('Email is required.'); return; }
    setSubmitting(true);
    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tried_already: form.triedAlready,
          breaking_most: form.breakingMost,
          success_looks_like: form.successLooksLike,
        }),
      });
      let data;
      try { data = await res.json(); } catch { throw new Error('Unexpected server response. Please try again.'); }
      if (!res.ok) throw new Error(data.detail || 'Submission failed.');
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / 4) * 100;

  return (
    <div data-testid="contact-page" className="pt-16">
      <SEO title="Contact" description="Get in touch — describe your situation and I'll respond with real thoughts within 48 hours." path="/contact" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 pt-24 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Left column: intent */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="section-label mb-4">Get In Touch</p>
            <h1
              className="font-extrabold tracking-tight text-white mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.07 }}
            >
              If something is overloaded,<br />
              <span
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(160,166,178,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                let's talk about it.
              </span>
            </h1>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}
            >
              I read every submission personally. If it's a real problem with real context, I'll respond with real thoughts—not a sales sequence.
            </p>
            <div className="space-y-3">
              {[
                { label: 'Response time', value: 'Within 48 hours' },
                { label: 'Who reads this', value: 'Jethro, directly' },
                { label: 'What happens next', value: 'A short back-and-forth, or a call' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span style={{ color: 'rgba(255,255,255,0.32)' }}>{label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
            </Reveal>
          </div>

          {/* Right column: form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.3}>
            {submitted ? (
              <div
                data-testid="contact-submit-status"
                className="py-16 text-center rounded-2xl h-full flex flex-col items-center justify-center"
                style={{
                  background: 'rgba(15,17,21,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <CheckCircle size={36} style={{ color: '#34d399', marginBottom: '1rem' }} />
                <h2 className="text-xl font-extrabold text-white mb-3 tracking-tight">Received.</h2>
                <p
                  className="text-sm max-w-sm mx-auto leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  I review every submission personally. You'll hear back within 48 hours—if the timing or fit isn't right, I'll tell you that clearly too.
                </p>
              </div>
            ) : (
              <form
                data-testid="contact-intake-form"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  name="website"
                  value={form.honeypot}
                  onChange={set('honeypot')}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Step {step + 1} of 4
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {['What\'s the friction?', 'Diagnostic depth', 'Context', 'Let\'s connect'][step]}
                    </span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-1 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${progress}%`,
                        background: 'var(--theme-accent, #00f0ff)',
                      }}
                    />
                  </div>
                </div>

                {/* Step content */}
                <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
                  <AnimatePresence mode="wait" custom={direction}>
                    {step === 0 && (
                      <motion.div
                        key="step-0"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-5"
                      >
                        <div>
                          <label htmlFor="contact-service" className="section-label mb-2 block">What fits best? *</label>
                          <select
                            id="contact-service"
                            value={form.service}
                            onChange={set('service')}
                            style={{ ...fieldStyle, backgroundImage: 'none' }}
                            onFocus={focus()}
                            onBlur={blur}
                            aria-required="true"
                          >
                            <option value="" style={{ background: '#0f1115' }}>Select a service type</option>
                            {services.map((s) => (
                              <option key={s} value={s} style={{ background: '#0f1115' }}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="contact-message" className="section-label mb-2 block">What's the core problem? *</label>
                          <textarea
                            id="contact-message"
                            name="message"
                            data-testid="contact-message-input"
                            value={form.message}
                            onChange={set('message')}
                            rows={5}
                            placeholder="Describe the problem, the situation, or what you're trying to figure out. The more specific, the more useful my response."
                            required
                            aria-required="true"
                            className="resize-none"
                            style={fieldStyle}
                            onFocus={focus()}
                            onBlur={blur}
                          />
                          <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                            {form.message.length} characters
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-5"
                      >
                        <div>
                          <label htmlFor="contact-tried" className="section-label mb-2 block">What have you tried already?</label>
                          <textarea
                            id="contact-tried"
                            value={form.triedAlready}
                            onChange={set('triedAlready')}
                            rows={3}
                            placeholder="Tools, consultants, internal efforts — what's been attempted so far?"
                            className="resize-none"
                            style={fieldStyle}
                            onFocus={focus()}
                            onBlur={blur}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-breaking" className="section-label mb-2 block">What is breaking most right now?</label>
                          <textarea
                            id="contact-breaking"
                            value={form.breakingMost}
                            onChange={set('breakingMost')}
                            rows={3}
                            placeholder="The single biggest pain point or failure mode you're experiencing."
                            className="resize-none"
                            style={fieldStyle}
                            onFocus={focus()}
                            onBlur={blur}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-success" className="section-label mb-2 block">What does success look like?</label>
                          <textarea
                            id="contact-success"
                            value={form.successLooksLike}
                            onChange={set('successLooksLike')}
                            rows={3}
                            placeholder="In 90 days, what would 'fixed' actually look and feel like?"
                            className="resize-none"
                            style={fieldStyle}
                            onFocus={focus()}
                            onBlur={blur}
                          />
                        </div>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                          All fields optional — but the more context, the better the first response.
                        </p>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-5"
                      >
                        <div>
                          <label htmlFor="contact-company" className="section-label mb-2 block">Company / Project</label>
                          <input
                            id="contact-company"
                            type="text"
                            value={form.company}
                            onChange={set('company')}
                            placeholder="Optional"
                            style={fieldStyle}
                            onFocus={focus()}
                            onBlur={blur}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="contact-budget" className="section-label mb-2 block">Budget range</label>
                            <select
                              id="contact-budget"
                              value={form.budget}
                              onChange={set('budget')}
                              style={{ ...fieldStyle, backgroundImage: 'none' }}
                              onFocus={focus()}
                              onBlur={blur}
                            >
                              <option value="" style={{ background: '#0f1115' }}>Select if known</option>
                              {budgets.map((b) => (
                                <option key={b} value={b} style={{ background: '#0f1115' }}>{b}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="contact-timeline" className="section-label mb-2 block">Timeline</label>
                            <select
                              id="contact-timeline"
                              value={form.timeline}
                              onChange={set('timeline')}
                              style={{ ...fieldStyle, backgroundImage: 'none' }}
                              onFocus={focus()}
                              onBlur={blur}
                            >
                              <option value="" style={{ background: '#0f1115' }}>Select if known</option>
                              {timelines.map((t) => (
                                <option key={t} value={t} style={{ background: '#0f1115' }}>{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="contact-name" className="section-label mb-2 block">Name *</label>
                            <input
                              id="contact-name"
                              type="text"
                              name="name"
                              data-testid="contact-name-input"
                              value={form.name}
                              onChange={set('name')}
                              placeholder="Your name"
                              required
                              aria-required="true"
                              style={fieldStyle}
                              onFocus={focus()}
                              onBlur={blur}
                            />
                          </div>
                          <div>
                            <label htmlFor="contact-email" className="section-label mb-2 block">Email *</label>
                            <input
                              id="contact-email"
                              type="email"
                              name="email"
                              data-testid="contact-email-input"
                              value={form.email}
                              onChange={set('email')}
                              placeholder="your@email.com"
                              required
                              aria-required="true"
                              style={fieldStyle}
                              onFocus={focus()}
                              onBlur={blur}
                            />
                          </div>
                        </div>
                        <div
                          className="rounded-xl p-4"
                          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Summary</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span style={{ color: 'rgba(255,255,255,0.35)' }}>Service</span>
                              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{form.service || '—'}</span>
                            </div>
                            {form.company && (
                              <div className="flex justify-between">
                                <span style={{ color: 'rgba(255,255,255,0.35)' }}>Company</span>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{form.company}</span>
                              </div>
                            )}
                            {form.budget && (
                              <div className="flex justify-between">
                                <span style={{ color: 'rgba(255,255,255,0.35)' }}>Budget</span>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{form.budget}</span>
                              </div>
                            )}
                            {form.timeline && (
                              <div className="flex justify-between">
                                <span style={{ color: 'rgba(255,255,255,0.35)' }}>Timeline</span>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{form.timeline}</span>
                              </div>
                            )}
                            {form.triedAlready && (
                              <div className="flex justify-between">
                                <span style={{ color: 'rgba(255,255,255,0.35)' }}>Tried</span>
                                <span className="text-right max-w-[200px] truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{form.triedAlready}</span>
                              </div>
                            )}
                            {form.breakingMost && (
                              <div className="flex justify-between">
                                <span style={{ color: 'rgba(255,255,255,0.35)' }}>Breaking</span>
                                <span className="text-right max-w-[200px] truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{form.breakingMost}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between pt-4">
                  <div>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                      >
                        <ArrowLeft size={13} /> Back
                      </button>
                    )}
                    {step === 0 && (
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
                        Every submission read personally.
                      </p>
                    )}
                  </div>

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                      style={{
                        background: 'var(--theme-accent, #00f0ff)',
                        color: 'black',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px var(--theme-glow, rgba(0,240,255,0.2))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Continue <ArrowRight size={13} />
                    </button>
                  ) : (
                    <button
                      data-testid="contact-submit-button"
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      style={{
                        background: 'white',
                        color: 'black',
                        boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
                      }}
                      onMouseEnter={(e) => {
                        if (!submitting) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,255,255,0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.1)';
                      }}
                    >
                      {submitting
                        ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black/70 animate-spin" /> Sending…</>
                        : <><span className="relative z-10">Send this</span><ArrowUpRight size={14} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></>}
                    </button>
                  )}
                </div>
              </form>
            )}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="pb-24" />
    </div>
  );
}
