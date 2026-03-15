import React, { useState, useEffect } from 'react';
import { Reveal } from '../components/Reveal';
import { SocialShare } from '../components/SocialShare';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND}/api/notes`)
      .then((r) => r.json())
      .then((data) => setNotes(data.notes || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="notes-index" className="pt-16">
      <SEO title="Notes" description="Writing and insights on systems thinking, product strategy, and operational clarity." path="/notes" />
      <header className="pt-24 pb-16 max-w-3xl mx-auto px-6">
        <Reveal delay={0.1}>
          <p className="section-label mb-4">Notes</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Thinking out loud.
          </h1>
          <p className="text-lg text-white/50 max-w-xl" style={{ fontWeight: 300 }}>
            Observations, frameworks, and distilled thinking from working at the intersection of systems, product, and operations.
          </p>
        </Reveal>
      </header>

      <div className="max-w-3xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse py-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="h-5 rounded mb-3" style={{ background: 'rgba(255,255,255,0.08)', width: '70%' }} />
                <div className="h-3.5 rounded mb-2" style={{ background: 'rgba(255,255,255,0.05)', width: '50%' }} />
                <div className="h-3.5 rounded" style={{ background: 'rgba(255,255,255,0.04)', width: '80%' }} />
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <p className="text-white/35 text-sm">No notes published yet.</p>
        ) : (
          <div>
            {notes.map((note, idx) => (
              <Reveal key={note.id} delay={0.2 + (idx * 0.08)} y={15}>
                <div
                  className="py-8"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Link
                    to={`/notes/${note.slug}`}
                    data-testid="notes-item"
                    className="block group mb-3"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {note.tags && note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {note.reading_time && (
                        <span className="flex items-center gap-1 text-xs text-white/25">
                          <Clock size={10} /> {note.reading_time} min read
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-white/85 mb-2 group-hover:text-white transition-colors duration-200 tracking-tight">
                      {note.title}
                    </h2>
                    <p className="text-sm text-white/40 leading-relaxed mb-3">{note.excerpt}</p>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium text-white/35 group-hover:text-white/60 transition-colors duration-200"
                    >
                      Read more <ArrowRight size={11} />
                    </span>
                  </Link>
                  <div className="mt-3">
                    <SocialShare
                      title={note.title}
                      url={`${window.location.origin}/notes/${note.slug}`}
                      excerpt={note.excerpt}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
