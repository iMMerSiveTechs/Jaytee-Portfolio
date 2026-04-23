import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Wrench, Briefcase, Home, User, Mail, BookOpen, Scissors } from 'lucide-react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { pages, projects, tools, services } from '../content/siteContent';
import { buildApiUrl, hasBackend } from '../utils/config';

const pageIconMap = {
  home: Home,
  about: User,
  work: Briefcase,
  tools: Wrench,
  'work-with-me': Briefcase,
  notes: BookOpen,
  contact: Mail,
};

const toolIconMap = {
  'tool-chaos': Wrench,
  'tool-bloat': Wrench,
  'tool-friction': Wrench,
  'tool-scope': Scissors,
};

const COMMAND_CONTENT = [
  ...pages,
  ...tools.map((tool) => ({
    ...tool,
    icon: toolIconMap[tool.id] || Wrench,
  })),
  ...projects.map((project) => ({
    id: `case-${project.id}`,
    title: `${project.title} Case Study`,
    description: project.searchDescription,
    url: `/work/${project.id}`,
    icon: Briefcase,
    type: 'page',
  })),
  ...services,
].map((item) => ({
  ...item,
  icon: item.icon || pageIconMap[item.id] || Briefcase,
}));

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
      if (!hasBackend()) return;

      const notesUrl = buildApiUrl('/api/notes');
      if (!notesUrl) return;

      setLoading(true);
      fetch(notesUrl)
        .then(res => res.json())
        .then(data => {
          const notesData = data.notes || [];
          setNotes(notesData.map(note => ({
            id: `note-${note.id}`,
            title: note.title,
            description: note.excerpt,
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

  const allContent = [...COMMAND_CONTENT, ...notes];

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
