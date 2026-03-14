import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
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
    </>
  );
}
