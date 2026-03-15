import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

export const LightDarkToggle = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      className="h-9 w-9 rounded-lg relative overflow-hidden"
      data-testid="light-dark-toggle"
      style={{
        color: 'var(--theme-text-muted, rgba(255,255,255,0.7))',
        transition: 'all 200ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--theme-text, rgba(255,255,255,0.95))';
        e.currentTarget.style.backgroundColor = 'var(--theme-surface, rgba(255,255,255,0.05))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--theme-text-muted, rgba(255,255,255,0.7))';
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {mode === 'dark' ? (
        <Sun size={16} className="transition-transform duration-300 rotate-0" />
      ) : (
        <Moon size={16} className="transition-transform duration-300 rotate-0" />
      )}
    </Button>
  );
};
