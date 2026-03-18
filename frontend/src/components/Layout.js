import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SearchCommand } from './SearchCommand';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LightDarkToggle } from './LightDarkToggle';
import { Breadcrumbs } from './Breadcrumbs';
import { AdvancedFooter } from './AdvancedFooter';
import { CustomCursor } from './CustomCursor';
import { useTheme } from '../contexts/ThemeContext';
import { ThreeDCanvas } from './ThreeDCanvas';
import { hapticLight } from '../utils/haptics';

// Map routes to 3D scenes
function getSceneForPath(pathname) {
  if (pathname === '/') return 'hero';
  if (pathname === '/work' || pathname.startsWith('/work/')) return 'work';
  if (pathname === '/tools') return 'tools';
  if (pathname === '/contact') return 'contact';
  return 'ambient';
}

// Freeze the outlet content so exit animations show the old page, not the new one
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pageVariants = prefersReducedMotion
  ? { initial: {}, animate: {}, exit: {} }
  : {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
      exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
    };

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
  const { mode } = useTheme();

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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-bg0)' }}>
      {/* Skip to content — a11y */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>
      <CustomCursor />

      {/* Global 3D layer — route-aware scene switching */}
      <ThreeDCanvas
        scene={getSceneForPath(location.pathname)}
        className="fixed inset-0"
        style={{ opacity: location.pathname === '/' ? 0.4 : 0.25 }}
      />

      {/* Ambient blobs — more subtle in light mode */}
      <div
        className="ambient-blob"
        style={{
          width: '600px',
          height: '600px',
          top: '-10%',
          left: '-5%',
          background: mode === 'light'
            ? 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          width: '500px',
          height: '500px',
          bottom: '10%',
          right: '-5%',
          background: mode === 'light'
            ? 'radial-gradient(circle, rgba(0,240,255,0.03) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Navigation */}
      <nav
        data-testid="top-nav"
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          background: scrolled
            ? 'var(--theme-nav-bg)'
            : 'var(--theme-nav-bg-translucent)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--theme-border)' : 'none',
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
                className="w-8 h-8 flex items-center justify-center rounded-lg font-extrabold text-sm"
                style={{
                  background: 'var(--theme-surface-hover)',
                  border: '1px solid var(--theme-border-medium)',
                  color: 'var(--theme-text)',
                  transition: 'border-color 200ms',
                }}
              >
                JT
              </div>
              <span className="font-extrabold tracking-tight" style={{ color: 'var(--theme-text)' }}>
                Jethro <span className="font-light" style={{ color: 'var(--theme-text-muted)' }}>&ldquo;JayTee&rdquo;</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-3">
              <SearchCommand />
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  data-testid={link.testid}
                  onClick={hapticLight}
                  className="relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: 'var(--theme-accent, #00f0ff)' }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <LightDarkToggle />
              <ThemeSwitcher />
              <Link
                to="/contact"
                data-testid="top-nav-link-contact"
                className="ml-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200"
                style={{
                  background: mode === 'light' ? 'black' : 'white',
                  color: mode === 'light' ? 'white' : 'black',
                }}
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              data-testid="top-nav-mobile-menu-button"
              className="md:hidden p-2 transition-colors duration-200"
              style={{ color: 'var(--theme-text-muted)' }}
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
              background: mode === 'light' ? 'rgba(255,255,255,0.98)' : 'rgba(8,9,10,0.98)',
              backdropFilter: 'blur(24px)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--theme-text)' : 'var(--theme-text-muted)',
                    background: isActive ? 'var(--theme-surface-hover)' : 'transparent',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-2 mt-2 px-3">
                <LightDarkToggle />
                <ThemeSwitcher />
              </div>
              <Link
                to="/contact"
                className="mt-2 px-3 py-2.5 text-sm font-semibold rounded-lg text-center transition-colors duration-200"
                style={{
                  background: mode === 'light' ? 'black' : 'white',
                  color: mode === 'light' ? 'white' : 'black',
                }}
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main id="main-content" className="relative z-10" role="main">
        <Breadcrumbs />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FrozenOutlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Advanced Footer */}
      <AdvancedFooter />
    </div>
  );
}
