import React, { useState } from 'react';
import { toast } from 'sonner';
import { Send, CheckCircle } from 'lucide-react';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

const services = [
  'Clarity Teardown',
  'System Architecture Sprint',
  'Strategic Operator Support',
  'White-Glove Build',
  'General Inquiry',
  'Partnership',
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

const inputStyle = {
  background: 'rgba(22,25,32,0.8)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: 'rgba(255,255,255,0.9)',
  fontSize: '14px',
  width: '100%',
  transition: 'border-color 200ms',
  outline: 'none',
};

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '',
    budget: '', timeline: '', message: '', honeypot: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in the required fields.');
      return;
    }
    if (form.message.length < 20) {
      toast.error('Please provide a bit more detail in your message.');
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
      toast.success('Intake received. I\'ll be in touch within 48 hours.');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="pt-16">
      <header className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <p className="section-label mb-4">Contact</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
          Let’s structure<br />
          <span className="metallic-text">the ambiguity.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl" style={{ fontWeight: 300 }}>
          Whether you&apos;re forming an early-stage product, navigating business friction, or need clarity under pressure—reach out.
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-6 pb-32">
        {submitted ? (
          <div
            data-testid="contact-submit-status"
            className="py-16 text-center rounded-2xl"
            style={{ background: 'rgba(15,17,21,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <CheckCircle size={40} style={{ color: '#34d399', margin: '0 auto 1rem' }} />
            <h2 className="text-2xl font-extrabold text-white mb-3">Received.</h2>
            <p className="text-white/50 max-w-md mx-auto">
              Your intake has been received. I review every submission personally and will be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <form
            data-testid="contact-intake-form"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={form.honeypot}
              onChange={set('honeypot')}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="section-label mb-2 block">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
                />
              </div>
              <div>
                <label className="section-label mb-2 block">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
                />
              </div>
            </div>

            {/* Company + Service */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="section-label mb-2 block">Company / Project</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={set('company')}
                  placeholder="Optional"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
                />
              </div>
              <div>
                <label className="section-label mb-2 block">How can I help?</label>
                <select
                  value={form.service}
                  onChange={set('service')}
                  style={{ ...inputStyle, backgroundImage: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
                >
                  <option value="" style={{ background: '#0f1115' }}>Select an option</option>
                  {services.map((s) => (
                    <option key={s} value={s} style={{ background: '#0f1115' }}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget + Timeline */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="section-label mb-2 block">Budget range</label>
                <select
                  value={form.budget}
                  onChange={set('budget')}
                  style={{ ...inputStyle, backgroundImage: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
                >
                  <option value="" style={{ background: '#0f1115' }}>Select a range</option>
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
                  style={{ ...inputStyle, backgroundImage: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
                >
                  <option value="" style={{ background: '#0f1115' }}>Select a timeline</option>
                  {timelines.map((t) => (
                    <option key={t} value={t} style={{ background: '#0f1115' }}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="section-label mb-2 block">Tell me about the problem *</label>
              <textarea
                value={form.message}
                onChange={set('message')}
                rows={6}
                placeholder="What’s the situation? What are you trying to achieve? What’s getting in the way?"
                required
                className="resize-none"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(0,240,255,0.3)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; }}
              />
              <p className="text-xs text-white/25 mt-1.5">{form.message.length} characters</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-white/25">All submissions reviewed personally.</p>
              <button
                data-testid="contact-submit-button"
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : <><Send size={14} /> Send Intake</> }
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
