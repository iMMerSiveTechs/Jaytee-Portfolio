import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, Sparkles, ShieldAlert, Zap,
  Mail, Github, Linkedin, Twitter,
  Home, User, Briefcase, Wrench, BookOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { hapticMedium } from '../utils/haptics';

export const AdvancedFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribing(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Subscription failed.');
      toast.success(data.message || 'You\'re in. Welcome to the signal.');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const quickTools = [
    { icon: Sparkles, name: 'Chaos Translator', url: '/tools', color: 'var(--theme-accent, #00f0ff)' },
    { icon: ShieldAlert, name: 'Bloat Detector', url: '/tools', color: '#8b5cf6' },
    { icon: Zap, name: 'Friction Auditor', url: '/tools', color: '#f97316' },
  ];

  const siteMap = [
    {
      category: 'Navigate',
      links: [
        { to: '/', label: 'Home', icon: Home },
        { to: '/about', label: 'About', icon: User },
        { to: '/work', label: 'Work', icon: Briefcase },
        { to: '/tools', label: 'Lab', icon: Wrench },
      ],
    },
    {
      category: 'Engage',
      links: [
        { to: '/work-with-me', label: 'Work With Me', icon: Briefcase },
        { to: '/notes', label: 'Notes', icon: BookOpen },
        { to: '/contact', label: 'Contact', icon: Mail },
      ],
    },
  ];

  const socials = [
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <footer
      id="footer"
      className="relative z-10"
      style={{
        background: 'var(--theme-bg0, #08090a)',
        borderTop: '1px solid var(--theme-border-subtle, rgba(255,255,255,0.06))',
      }}
      data-testid="advanced-footer"
    >
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <h2
              className="font-extrabold tracking-tight mb-4"
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                lineHeight: 1.1,
                color: 'var(--theme-text, white)',
              }}
            >
              If something is overloaded or drifting off-core,
              <span style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.42))' }}> that is the conversation.</span>
            </h2>
            <Link
              to="/contact"
              data-testid="footer-cta-primary"
              onClick={hapticMedium}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: 'var(--theme-text, white)',
                color: 'var(--theme-bg0, black)',
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
              Start the Conversation
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.4))', letterSpacing: '0.08em' }}>
                QUICK ACCESS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {quickTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.name}
                      to={tool.url}
                      data-testid={`footer-tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="interactive-card group p-4 rounded-xl transition-all duration-200"
                      style={{
                        background: 'var(--theme-surface, rgba(255,255,255,0.03))',
                        border: '1px solid var(--theme-border-subtle, rgba(255,255,255,0.06))',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${tool.color}30`;
                        e.currentTarget.style.background = `${tool.color}08`;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--theme-border-subtle, rgba(255,255,255,0.06))';
                        e.currentTarget.style.background = 'var(--theme-surface, rgba(255,255,255,0.03))';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon size={16} className="mb-2" style={{ color: tool.color }} />
                      <p className="text-xs font-semibold" style={{ color: 'var(--theme-text, white)' }}>{tool.name}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.4))', letterSpacing: '0.08em' }}>
                STAY UPDATED
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--theme-text-muted, rgba(255,255,255,0.5))' }}>
                Occasional insights on systems thinking, product strategy, and operator tools.
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  data-testid="footer-newsletter-input"
                  className="flex-1 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                  style={{
                    background: 'var(--theme-surface, rgba(255,255,255,0.04))',
                    border: '1px solid var(--theme-border, rgba(255,255,255,0.1))',
                    color: 'var(--theme-text, white)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--theme-accent, #00f0ff)';
                    e.currentTarget.style.background = 'var(--theme-surface, rgba(255,255,255,0.06))';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--theme-border, rgba(255,255,255,0.1))';
                    e.currentTarget.style.background = 'var(--theme-surface, rgba(255,255,255,0.04))';
                  }}
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  data-testid="footer-newsletter-submit"
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50"
                  style={{
                    background: 'var(--theme-accent, #00f0ff)',
                    color: 'var(--theme-bg0, black)',
                  }}
                  onMouseEnter={(e) => {
                    if (!subscribing) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px var(--theme-glow, rgba(0,240,255,0.3))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-10" style={{ borderTop: '1px solid var(--theme-border-subtle, rgba(255,255,255,0.06))' }}>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {siteMap.map((section) => (
                <div key={section.category}>
                  <p className="text-xs font-semibold mb-3" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.4))', letterSpacing: '0.08em' }}>
                    {section.category.toUpperCase()}
                  </p>
                  <div className="space-y-2">
                    {section.links.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="group flex items-center gap-2 text-sm transition-all duration-200"
                          style={{ color: 'var(--theme-text-muted, rgba(255,255,255,0.5))' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--theme-accent, #00f0ff)';
                            e.currentTarget.style.transform = 'translateX(2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--theme-text-muted, rgba(255,255,255,0.5))';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                          data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Icon size={13} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.4))', letterSpacing: '0.08em' }}>
                  SERVICES
                </p>
                <div className="space-y-2">
                  {['Clarity Teardown', 'System Sprint', 'Operator Support', 'White-Glove Build'].map((service) => (
                    <Link
                      key={service}
                      to="/work-with-me"
                      className="block text-sm transition-colors duration-200"
                      style={{ color: 'var(--theme-text-muted, rgba(255,255,255,0.5))' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-text, white)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--theme-text-muted, rgba(255,255,255,0.5))'; }}
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.4))', letterSpacing: '0.08em' }}>
                SITE MAP
              </p>
              <div
                className="p-4 rounded-xl relative overflow-hidden"
                style={{
                  background: 'var(--theme-surface, rgba(255,255,255,0.02))',
                  border: '1px solid var(--theme-border-subtle, rgba(255,255,255,0.06))',
                }}
              >
                <div className="space-y-2">
                  {[
                    { label: 'Home', to: '/', status: 'live' },
                    { label: 'Work', to: '/work', status: 'live' },
                    { label: 'Tools', to: '/tools', status: 'live', badge: '4 tools' },
                    { label: 'Work With Me', to: '/work-with-me', status: 'live', badge: '4 tiers' },
                  ].map((page) => (
                    <Link
                      key={page.to}
                      to={page.to}
                      className="group flex items-center justify-between p-2 rounded-lg transition-all duration-200"
                      style={{ background: 'transparent' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--theme-glow, rgba(0,240,255,0.05))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: 'var(--theme-accent, #00f0ff)' }}
                        />
                        <span className="text-xs font-medium" style={{ color: 'var(--theme-text, white)' }}>
                          {page.label}
                        </span>
                      </div>
                      {page.badge && (
                        <span
                          className="text-[0.625rem] px-2 py-0.5 rounded"
                          style={{
                            background: 'var(--theme-glow, rgba(0,240,255,0.1))',
                            color: 'var(--theme-accent, #00f0ff)',
                            border: '1px solid var(--theme-glow, rgba(0,240,255,0.2))',
                          }}
                        >
                          {page.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          style={{ borderTop: '1px solid var(--theme-border-subtle, rgba(255,255,255,0.06))' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center rounded-lg font-extrabold text-xs transition-all duration-200"
              style={{
                background: 'var(--theme-glow, rgba(0,240,255,0.08))',
                border: '1px solid var(--theme-glow, rgba(0,240,255,0.15))',
                color: 'var(--theme-accent, #00f0ff)',
              }}
            >
              JT
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--theme-text, white)' }}>
                Jethro JayTee
              </p>
              <p className="text-xs" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.35))' }}>
                Operator and Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-testid={`footer-social-${social.label.toLowerCase()}`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    background: 'var(--theme-surface, rgba(255,255,255,0.03))',
                    border: '1px solid var(--theme-border-subtle, rgba(255,255,255,0.06))',
                    color: 'var(--theme-text-muted, rgba(255,255,255,0.4))',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--theme-accent, #00f0ff)';
                    e.currentTarget.style.color = 'var(--theme-accent, #00f0ff)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--theme-border-subtle, rgba(255,255,255,0.06))';
                    e.currentTarget.style.color = 'var(--theme-text-muted, rgba(255,255,255,0.4))';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.25))' }}>
            <span>Nemurium</span>
            <span style={{ color: 'var(--theme-border-subtle, rgba(255,255,255,0.1))' }}>/</span>
            <span>VibeForge Studios</span>
            <span style={{ color: 'var(--theme-border-subtle, rgba(255,255,255,0.1))' }}>/</span>
            <span>&copy; 2025</span>
          </div>
        </div>
      </div>

      <div
        className="absolute top-4 right-6 flex items-center gap-2"
        style={{ opacity: 0.4 }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: 'var(--theme-accent, #00f0ff)' }}
        />
        <span className="text-[0.625rem]" style={{ color: 'var(--theme-text-subtle, rgba(255,255,255,0.3))' }}>
          Live
        </span>
      </div>
    </footer>
  );
};
