import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

export default function NoteDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND}/api/notes/${slug}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setNote(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 max-w-2xl mx-auto px-6 animate-pulse">
        <div className="h-6 rounded mb-8" style={{ background: 'rgba(255,255,255,0.07)', width: '50%' }} />
        <div className="h-8 rounded mb-4" style={{ background: 'rgba(255,255,255,0.08)', width: '80%' }} />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-4 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />)}
        </div>
      </div>
    );
  }

  if (notFound || !note) {
    return (
      <div className="pt-28 max-w-2xl mx-auto px-6 text-center">
        <p className="text-white/40 mb-6">Note not found.</p>
        <button onClick={() => navigate(-1)} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
          Go back
        </button>
      </div>
    );
  }

  const date = note.created_at
    ? new Date(note.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  // Simple markdown-like rendering
  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.slice(2, -2);
        return <p key={i} className="font-bold text-white/90 mt-6 mb-2">{text}</p>;
      }
      if (line.trim() === '') return <br key={i} />;
      // Inline bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-white/65 leading-[1.8] text-base" style={{ fontWeight: 300 }}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-white/85 font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div data-testid="notes-detail" className="pt-16">
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* Breadcrumb */}
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/65 transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={13} /> All Notes
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
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
          {date && <span className="text-xs text-white/25">{date}</span>}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5">
          {note.title}
        </h1>

        {/* Excerpt */}
        <p
          className="text-lg text-white/55 mb-10 pb-10 leading-relaxed"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', fontWeight: 300 }}
        >
          {note.excerpt}
        </p>

        {/* Content */}
        <div className="space-y-1">
          {renderContent(note.content)}
        </div>
      </div>
    </div>
  );
}
