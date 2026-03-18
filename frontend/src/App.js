import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSmoothScroll } from './utils/smoothScroll';
import Layout from './components/Layout';
import { Toaster } from './components/ui/sonner';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Tools = lazy(() => import('./pages/Tools'));
const WorkWithMe = lazy(() => import('./pages/WorkWithMe'));
const Notes = lazy(() => import('./pages/Notes'));
const NoteDetail = lazy(() => import('./pages/NoteDetail'));
const Contact = lazy(() => import('./pages/Contact'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: 'var(--theme-surface-border)', borderTopColor: 'var(--theme-accent, #00f0ff)' }}
        />
        <span className="text-xs" style={{ color: 'var(--theme-text-subtle)' }}>Loading…</span>
      </div>
    </div>
  );
}

function AnimatedOutlet() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
  };

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/work', element: <Work /> },
    { path: '/work/:slug', element: <CaseStudy /> },
    { path: '/tools', element: <Tools /> },
    { path: '/work-with-me', element: <WorkWithMe /> },
    { path: '/notes', element: <Notes /> },
    { path: '/notes/:slug', element: <NoteDetail /> },
    { path: '/contact', element: <Contact /> },
  ];

  const currentRoute = routes.find(r => {
    if (r.path === location.pathname) return true;
    if (r.path.includes(':')) {
      const pattern = r.path.replace(/:[^/]+/g, '[^/]+');
      return new RegExp(`^${pattern}$`).test(location.pathname);
    }
    return false;
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<PageLoader />}>
          {currentRoute?.element}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  useSmoothScroll();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ErrorBoundary><Suspense fallback={<PageLoader />}><Home /></Suspense></ErrorBoundary>} />
        <Route path="about" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><About /></Suspense></ErrorBoundary>} />
        <Route path="work" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><Work /></Suspense></ErrorBoundary>} />
        <Route path="work/:slug" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><CaseStudy /></Suspense></ErrorBoundary>} />
        <Route path="tools" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><Tools /></Suspense></ErrorBoundary>} />
        <Route path="work-with-me" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><WorkWithMe /></Suspense></ErrorBoundary>} />
        <Route path="notes" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><Notes /></Suspense></ErrorBoundary>} />
        <Route path="notes/:slug" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><NoteDetail /></Suspense></ErrorBoundary>} />
        <Route path="contact" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><Contact /></Suspense></ErrorBoundary>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Toaster richColors position="top-right" />
          <AppContent />
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}
