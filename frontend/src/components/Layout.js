import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home', testid: 'top-nav-link-home', exact: true },
  { to: '/about', label: 'About', testid: 'top-nav-link-about' },
  { to: '/work', label: 'Work', testid: 'top-nav-link-work' },
  { to: '/tools', label: 'Lab', testid: 'top-nav-link-tools' },
  { to: '/work-with-me', label: 'Work With Me', testid: 'top-nav-link-work-with-me' },
  { to: '/notes', label: 'Notes', testid: 'top-nav-link-notes' },
];

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#08090a' }}>
      {/* Ambient blobs */}
      <div
        className="ambient-blob"
        style={{
          width: '600px',
          height: '600px',
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          width: '500px',
          height: '500px',
          bottom: '10%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Navigation */}
      <nav
        data-testid="top-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-white/10' : ''
        }`}
        style={{
          background: scrolled
            ? 'rgba(8,9,10,0.92)'
            : 'rgba(8,9,10,0.6)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white font-extrabold text-sm"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'border-color 200ms',
                }}
              >
                JT
              </div>
              <span className="font-extrabold text-white tracking-tight">
                Jethro <span className="text-white/60 font-light">&ldquo;JayTee&rdquo;</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  data-testid={link.testid}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/55 hover:text-white/85 hover:bg-white/[0.03]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: '#00f0ff' }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <Link
                to="/contact"
                data-testid="top-nav-link-contact"
                className="ml-3 px-4 py-2 text-sm font-semibold rounded-lg text-base bg-white text-black hover:bg-white/90 transition-colors duration-200"
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              data-testid="top-nav-mobile-menu-button"
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{
              background: 'rgba(8,9,10,0.98)',
              backdropFilter: 'blur(24px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive ? 'text-white bg-white/[0.06]' : 'text-white/55 hover:text-white hover:bg-white/[0.03]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mt-2 px-3 py-2.5 text-sm font-semibold rounded-lg bg-white text-black text-center transition-colors duration-200 hover:bg-white/90"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        id="footer"
        style={{
          background: '#08090a',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
        className="relative z-10"
      >
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl mb-16">
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-5"
            >
              Let&apos;s structure the ambiguity.
            </h2>
            <p className="text-white/55 mb-8 text-lg leading-relaxed">
              Reach out to discuss strategy, partnerships, or building systems that protect your core.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors duration-200"
            >
              Start the Conversation
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm text-white/35"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 flex items-center justify-center rounded text-white font-extrabold text-xs"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                JT
              </div>
              <span>Jethro &ldquo;JayTee&rdquo; &mdash; Operator &amp; Builder</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-white/20">&copy; 2025 Nemurium</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
