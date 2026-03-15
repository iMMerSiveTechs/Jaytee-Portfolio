import React, { useState, useEffect } from 'react';
import { Reveal } from '../components/Reveal';
import { SocialShare } from '../components/SocialShare';
import { SEO } from '../components/SEO';
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

  // Enhanced markdown rendering
  const renderInline = (text) => {
    // Process inline formatting: bold, inline code, links
    const tokens = [];
    let remaining = text;
    let key = 0;
    while (remaining.length > 0) {
      // Inline code
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        tokens.push(<code key={key++} className="prose-dark">{codeMatch[1]}</code>);
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }
      // Links
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        tokens.push(<a key={key++} href={linkMatch[2]} className="prose-dark" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>);
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }
      // Bold
      const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
      if (boldMatch) {
        tokens.push(<strong key={key++} className="text-white/85 font-semibold">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }
      // Regular text — consume until next special char
      const nextSpecial = remaining.search(/[`[*]/);
      if (nextSpecial === -1) {
        tokens.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        // Special char that didn't match a pattern — consume it as text
        tokens.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        tokens.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }
    return tokens;
  };

  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Horizontal rule
      if (line.trim() === '---' || line.trim() === '***') {
        elements.push(<hr key={i} className="prose-dark" />);
        i++;
        continue;
      }

      // Heading 2
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="prose-dark">{line.slice(3)}</h2>);
        i++;
        continue;
      }

      // Heading 3
      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="prose-dark">{line.slice(4)}</h3>);
        i++;
        continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        const quoteLines = [];
        while (i < lines.length && lines[i].startsWith('> ')) {
          quoteLines.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <blockquote key={`bq-${i}`} className="prose-dark">
            {quoteLines.map((ql, qi) => <p key={qi}>{renderInline(ql)}</p>)}
          </blockquote>
        );
        continue;
      }

      // Unordered list
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItems = [];
        while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
          listItems.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="prose-dark">
            {listItems.map((item, li) => <li key={li}>{renderInline(item)}</li>)}
          </ul>
        );
        continue;
      }

      // Ordered list
      const olMatch = line.match(/^(\d+)\.\s/);
      if (olMatch) {
        const listItems = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
          listItems.push(lines[i].replace(/^\d+\.\s/, ''));
          i++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="prose-dark">
            {listItems.map((item, li) => <li key={li}>{renderInline(item)}</li>)}
          </ol>
        );
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Bold-only line (legacy support)
      if (line.startsWith('**') && line.endsWith('**') && line.indexOf('**', 2) === line.length - 2) {
        const text = line.slice(2, -2);
        elements.push(<p key={i} className="font-bold text-white/90 mt-6 mb-2">{text}</p>);
        i++;
        continue;
      }

      // Regular paragraph
      elements.push(
        <p key={i} className="prose-dark">
          {renderInline(line)}
        </p>
      );
      i++;
    }

    return elements;
  };

  return (
    <div data-testid="notes-detail" className="pt-16">
      <SEO title={note.title} description={note.summary || ''} path={`/notes/${slug}`} type="article" article={{ publishedTime: note.created_at, tags: note.tags }} />
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* Breadcrumb */}
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/65 transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={13} /> All Notes
        </Link>

        {/* Meta + Sharing */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div className="flex items-center gap-3 flex-wrap">
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
          <SocialShare title={note.title} excerpt={note.excerpt} />
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

        {/* Bottom share bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/65 transition-colors duration-200"
          >
            <ArrowLeft size={13} /> Back to all notes
          </Link>
          <SocialShare title={note.title} excerpt={note.excerpt} />
        </div>
      </div>
    </div>
  );
}
