import React, { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { toast } from 'sonner';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

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

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '',
    budget: '', timeline: '', message: '', honeypot: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const focus = (color) => (e) => { e.target.style.borderColor = 'var(--theme-accent, #00f0ff)'; };
  const blur = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Name, email, and message are required.');
      return;
    }
    if (form.message.length < 20) {
      toast.error('Please share a bit more context in your message.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Submission failed.');
      setSubmitted(true);
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="pt-16">
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
                let’s talk about it.
              </span>
            </h1>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 300 }}
            >
              I read every submission personally. If it’s a real problem with real context, I’ll respond with real thoughts—not a sales sequence.
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
                  I review every submission personally. You’ll hear back within 48 hours—if the timing or fit isn’t right, I’ll tell you that clearly too.
                </p>
              </div>
            ) : (
              <form
                data-testid="contact-intake-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input
                  type="text"
                  name="website"
                  value={form.honeypot}
                  onChange={set('honeypot')}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label mb-2 block">Name *</label>
                    <input
                      type="text"
                      name="name"
                      data-testid="contact-name-input"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Your name"
                      required
                      style={fieldStyle}
                      onFocus={focus('rgba(0,240,255,0.28)')}
                      onBlur={blur}
                    />
                  </div>
                  <div>
                    <label className="section-label mb-2 block">Email *</label>
                    <input
                      type="email"
                      name="email"
                      data-testid="contact-email-input"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="your@email.com"
                      required
                      style={fieldStyle}
                      onFocus={focus('rgba(0,240,255,0.28)')}
                      onBlur={blur}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label mb-2 block">Company / Project</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={set('company')}
                      placeholder="Optional"
                      style={fieldStyle}
                      onFocus={focus('rgba(0,240,255,0.28)')}
                      onBlur={blur}
                    />
                  </div>
                  <div>
                    <label className="section-label mb-2 block">What fits best?</label>
                    <select
                      value={form.service}
                      onChange={set('service')}
                      style={{ ...fieldStyle, backgroundImage: 'none' }}
                      onFocus={focus('rgba(0,240,255,0.28)')}
                      onBlur={blur}
                    >
                      <option value="" style={{ background: '#0f1115' }}>Select if applicable</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: '#0f1115' }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label mb-2 block">Budget range</label>
                    <select
                      value={form.budget}
                      onChange={set('budget')}
                      style={{ ...fieldStyle, backgroundImage: 'none' }}
                      onFocus={focus('rgba(0,240,255,0.28)')}
                      onBlur={blur}
                    >
                      <option value="" style={{ background: '#0f1115' }}>Select if known</option>
                      {budgets.map((b) => (
                        <option key={b} value={b} style={{ background: '#0f1115' }}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="section-label mb-2 block">Timeline</label>
                    <select
                      value={form.timeline}
                      onChange={set('timeline')}
                      style={{ ...fieldStyle, backgroundImage: 'none' }}
                      onFocus={focus('rgba(0,240,255,0.28)')}
                      onBlur={blur}
                    >
                      <option value="" style={{ background: '#0f1115' }}>Select if known</option>
                      {timelines.map((t) => (
                        <option key={t} value={t} style={{ background: '#0f1115' }}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="section-label mb-2 block">What’s the situation? *</label>
                  <textarea
                    name="message"
                    data-testid="contact-message-input"
                    value={form.message}
                    onChange={set('message')}
                    rows={5}
                    placeholder="Describe the problem, the situation, or what you’re trying to figure out. The more specific, the more useful my response."
                    required
                    className="resize-none"
                    style={fieldStyle}
                    onFocus={focus('rgba(0,240,255,0.28)')}
                    onBlur={blur}
                  />
                  <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {form.message.length} characters
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
                    Every submission read personally.
                  </p>
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
                    {!submitting && (
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 2s ease-in-out infinite',
                        }}
                      />
                    )}
                  </button>
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
