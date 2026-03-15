import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { useSmoothScroll } from './utils/smoothScroll';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Tools from './pages/Tools';
import WorkWithMe from './pages/WorkWithMe';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import Contact from './pages/Contact';
import { Toaster } from './components/ui/sonner';

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
        {currentRoute?.element}
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  useSmoothScroll();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="work" element={<Work />} />
        <Route path="tools" element={<Tools />} />
        <Route path="work-with-me" element={<WorkWithMe />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:slug" element={<NoteDetail />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Toaster richColors position="top-right" />
      <AppContent />
    </ThemeProvider>
  );
}
