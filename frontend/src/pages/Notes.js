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
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5" style={{ color: 'var(--theme-text)' }}>
            Thinking out loud.
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'var(--theme-text-muted)', fontWeight: 300 }}>
            Observations, frameworks, and distilled thinking from working at the intersection of systems, product, and operations.
          </p>
        </Reveal>
      </header>

      <div className="max-w-3xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse py-8" style={{ borderBottom: '1px solid var(--theme-surface-hover)' }}>
                <div className="h-5 rounded mb-3" style={{ background: 'var(--theme-surface-border)', width: '70%' }} />
                <div className="h-3.5 rounded mb-2" style={{ background: 'var(--theme-surface)', width: '50%' }} />
                <div className="h-3.5 rounded" style={{ background: 'var(--theme-surface)', width: '80%' }} />
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--theme-text-subtle)' }}>No notes published yet.</p>
        ) : (
          <div>
            {notes.map((note, idx) => (
              <Reveal key={note.id} delay={0.2 + (idx * 0.08)} y={15}>
                <div
                  className="py-8"
                  style={{ borderBottom: '1px solid var(--theme-surface-hover)' }}
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
                          style={{ background: 'var(--theme-surface)', color: 'var(--theme-text-subtle)', border: '1px solid var(--theme-surface-border)' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {note.reading_time && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--theme-text-subtle)' }}>
                          <Clock size={10} /> {note.reading_time} min read
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold mb-2 transition-colors duration-200 tracking-tight" style={{ color: 'var(--theme-text-secondary)' }}>
                      {note.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--theme-text-subtle)' }}>{note.excerpt}</p>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium transition-colors duration-200"
                      style={{ color: 'var(--theme-text-subtle)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-text-muted)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--theme-text-subtle)'; }}
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
