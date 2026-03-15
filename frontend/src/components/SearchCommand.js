import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Wrench, Briefcase, Home, User, Mail, BookOpen, Scissors } from 'lucide-react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';

const STATIC_CONTENT = [
  { id: 'home', title: 'Home', description: 'Portfolio homepage', url: '/', icon: Home, type: 'page' },
  { id: 'about', title: 'About', description: 'Philosophy and brand architecture', url: '/about', icon: User, type: 'page' },
  { id: 'work', title: 'Work', description: 'Selected systems and projects', url: '/work', icon: Briefcase, type: 'page' },
  { id: 'tools', title: 'Clarity Lab', description: 'AI-powered operator tools', url: '/tools', icon: Wrench, type: 'page' },
  { id: 'work-with-me', title: 'Work With Me', description: 'Service tiers and engagement options', url: '/work-with-me', icon: Briefcase, type: 'page' },
  { id: 'notes', title: 'Notes', description: 'Writing and insights', url: '/notes', icon: BookOpen, type: 'page' },
  { id: 'contact', title: 'Contact', description: 'Get in touch', url: '/contact', icon: Mail, type: 'page' },
  { id: 'tool-chaos', title: 'The Chaos Translator', description: 'Structure messy thinking into clarity', url: '/tools', icon: Wrench, type: 'tool' },
  { id: 'tool-bloat', title: 'The Bloat Detector', description: 'Identify core vs off-core features', url: '/tools', icon: Wrench, type: 'tool' },
  { id: 'tool-friction', title: 'The Friction Auditor', description: 'Diagnose workflow bottlenecks', url: '/tools', icon: Wrench, type: 'tool' },
  { id: 'tool-scope', title: 'The Scope Slicer', description: 'Cut scope to protect your core bet', url: '/tools', icon: Scissors, type: 'tool' },
  { id: 'case-job-forge', title: 'Job Forge Case Study', description: 'AI-powered job application system', url: '/work/job-forge', icon: Briefcase, type: 'page' },
  { id: 'case-churnwise', title: 'ChurnWise Case Study', description: 'Predictive churn analytics platform', url: '/work/churnwise', icon: Briefcase, type: 'page' },
  { id: 'case-transplant-tracker', title: 'Transplant Tracker Case Study', description: 'Organ transplant logistics system', url: '/work/transplant-tracker', icon: Briefcase, type: 'page' },
  { id: 'service-teardown', title: 'Clarity Teardown', description: 'One session diagnosis', url: '/work-with-me', icon: Briefcase, type: 'service' },
  { id: 'service-sprint', title: 'System Architecture Sprint', description: 'Multi-week engagement', url: '/work-with-me', icon: Briefcase, type: 'service' },
  { id: 'service-operator', title: 'Strategic Operator Support', description: 'Ongoing advisory', url: '/work-with-me', icon: Briefcase, type: 'service' },
  { id: 'service-build', title: 'White-Glove Build', description: 'Full system delivery', url: '/work-with-me', icon: Briefcase, type: 'service' },
];

export const SearchCommand = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Keyboard shortcut
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Load notes when opened
  useEffect(() => {
    if (open && notes.length === 0) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notes`)
        .then(res => res.json())
        .then(data => {
          const notesData = data.notes || [];
          setNotes(notesData.map(note => ({
            id: `note-${note.id}`,
            title: note.title,
            description: note.summary,
            url: `/notes/${note.slug}`,
            icon: FileText,
            type: 'note',
          })));
        })
        .catch(err => console.error('Failed to load notes:', err))
        .finally(() => setLoading(false));
    }
  }, [open, notes.length]);

  const handleSelect = useCallback((url) => {
    setOpen(false);
    navigate(url);
  }, [navigate]);

  const allContent = [...STATIC_CONTENT, ...notes];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
        }}
        data-testid="search-trigger"
      >
        <Search size={14} />
        <span>Search</span>
        <kbd
          className="ml-1 px-1.5 py-0.5 text-xs rounded"
          style={{
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'monospace',
          }}
        >
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div
          style={{
            background: 'rgba(15, 17, 21, 0.98)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <Command data-testid="search-command">
            <CommandInput
              placeholder="Search pages, tools, services, notes..."
              style={{
                color: 'white',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            />
            <CommandList style={{ maxHeight: '400px' }}>
              <CommandEmpty>
                <div className="py-6 text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {loading ? 'Loading...' : 'No results found.'}
                </div>
              </CommandEmpty>

              <CommandGroup heading="Pages" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {allContent.filter(item => item.type === 'page').map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleSelect(item.url)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        transition: 'background-color 150ms',
                      }}
                      data-testid={`search-result-${item.id}`}
                    >
                      <Icon size={16} style={{ color: 'var(--theme-accent, #00f0ff)' }} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {item.description}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              <CommandGroup heading="Tools" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {allContent.filter(item => item.type === 'tool').map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleSelect(item.url)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        transition: 'background-color 150ms',
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--theme-accent, #00f0ff)' }} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {item.description}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              <CommandGroup heading="Services" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {allContent.filter(item => item.type === 'service').map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleSelect(item.url)}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        transition: 'background-color 150ms',
                      }}
                    >
                      <Icon size={16} style={{ color: 'var(--theme-accent, #00f0ff)' }} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {item.description}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              {notes.length > 0 && (
                <CommandGroup heading="Notes" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {notes.map((item) => {
                    const Icon = item.icon;
                    return (
                      <CommandItem
                        key={item.id}
                        onSelect={() => handleSelect(item.url)}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                        style={{
                          color: 'rgba(255,255,255,0.85)',
                          transition: 'background-color 150ms',
                        }}
                      >
                        <Icon size={16} style={{ color: 'var(--theme-accent, #00f0ff)' }} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            {item.description}
                          </div>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      </CommandDialog>
    </>
  );
};
