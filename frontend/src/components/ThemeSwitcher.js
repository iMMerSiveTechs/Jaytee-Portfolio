import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const ThemeSwitcher = () => {
  const { themes, themeKey, setTheme, setCustomTheme, customColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState(customColor || '#00f0ff');

  const handleCustomSubmit = () => {
    if (/^#[0-9A-F]{6}$/i.test(customInput)) {
      setCustomTheme(customInput);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg"
          data-testid="theme-switcher-button"
          style={{
            color: 'rgba(255,255,255,0.7)',
            transition: 'color 200ms, background-color 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.95)';
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Palette size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-4"
        style={{
          background: 'rgba(22, 25, 32, 0.98)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
        }}
        data-testid="theme-switcher-panel"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Theme Accent</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Choose a metallic accent color
            </p>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className="group relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2"
                style={{
                  background: theme.metallic,
                  border: themeKey === key ? `2px solid ${theme.accent}` : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: themeKey === key ? `0 0 20px ${theme.glow}` : 'none',
                  transition: 'all 200ms',
                  focusRing: theme.ring,
                }}
                data-testid={`theme-option-${key}`}
                title={theme.name}
                onMouseEnter={(e) => {
                  if (themeKey !== key) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 0 16px ${theme.glow}`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (themeKey !== key) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {themeKey === key && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(2px)',
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'white' }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Custom Color Picker */}
          <div
            className="pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <label className="text-xs font-medium text-white block mb-2">
              Custom Color
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="#00f0ff"
                className="h-9 text-sm"
                data-testid="theme-custom-input"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              />
              <Button
                onClick={handleCustomSubmit}
                size="sm"
                className="h-9 px-4"
                data-testid="theme-custom-apply"
                style={{
                  background: 'white',
                  color: 'black',
                  transition: 'opacity 200ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
