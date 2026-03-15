import React, { createContext, useContext, useState, useEffect } from 'react';

// Premium metallic color themes based on reference images
const THEMES = {
  cyan: {
    name: 'Cyan Electric',
    accent: '#00f0ff',
    accentLight: '#5ffdff',
    accentDark: '#00c8d4',
    ring: 'rgba(0, 240, 255, 0.45)',
    glow: 'rgba(0, 240, 255, 0.15)',
    gradient: 'linear-gradient(135deg, #00f0ff 0%, #00c8d4 100%)',
    metallic: 'linear-gradient(135deg, #00f0ff 0%, #5ffdff 50%, #00c8d4 100%)',
  },
  sapphire: {
    name: 'Sapphire Blue',
    accent: '#3b82f6',
    accentLight: '#60a5fa',
    accentDark: '#2563eb',
    ring: 'rgba(59, 130, 246, 0.45)',
    glow: 'rgba(59, 130, 246, 0.15)',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    metallic: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
  },
  emerald: {
    name: 'Emerald',
    accent: '#10b981',
    accentLight: '#34d399',
    accentDark: '#059669',
    ring: 'rgba(16, 185, 129, 0.45)',
    glow: 'rgba(16, 185, 129, 0.15)',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    metallic: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
  },
  ruby: {
    name: 'Ruby Red',
    accent: '#ef4444',
    accentLight: '#f87171',
    accentDark: '#dc2626',
    ring: 'rgba(239, 68, 68, 0.45)',
    glow: 'rgba(239, 68, 68, 0.15)',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    metallic: 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
  },
  royal: {
    name: 'Royal Purple',
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    accentDark: '#7c3aed',
    ring: 'rgba(139, 92, 246, 0.45)',
    glow: 'rgba(139, 92, 246, 0.15)',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    metallic: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)',
  },
  rose: {
    name: 'Rose Gold',
    accent: '#f97316',
    accentLight: '#fb923c',
    accentDark: '#ea580c',
    ring: 'rgba(249, 115, 22, 0.45)',
    glow: 'rgba(249, 115, 22, 0.15)',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    metallic: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
  },
  amber: {
    name: 'Amber Gold',
    accent: '#fbbf24',
    accentLight: '#fcd34d',
    accentDark: '#f59e0b',
    ring: 'rgba(251, 191, 36, 0.45)',
    glow: 'rgba(251, 191, 36, 0.15)',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    metallic: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%)',
  },
  magenta: {
    name: 'Magenta',
    accent: '#ec4899',
    accentLight: '#f472b6',
    accentDark: '#db2777',
    ring: 'rgba(236, 72, 153, 0.45)',
    glow: 'rgba(236, 72, 153, 0.15)',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    metallic: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
  },
  teal: {
    name: 'Teal',
    accent: '#14b8a6',
    accentLight: '#2dd4bf',
    accentDark: '#0d9488',
    ring: 'rgba(20, 184, 166, 0.45)',
    glow: 'rgba(20, 184, 166, 0.15)',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    metallic: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 50%, #0d9488 100%)',
  },
  lime: {
    name: 'Lime',
    accent: '#84cc16',
    accentLight: '#a3e635',
    accentDark: '#65a30d',
    ring: 'rgba(132, 204, 22, 0.45)',
    glow: 'rgba(132, 204, 22, 0.15)',
    gradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    metallic: 'linear-gradient(135deg, #a3e635 0%, #84cc16 50%, #65a30d 100%)',
  },
  indigo: {
    name: 'Indigo',
    accent: '#6366f1',
    accentLight: '#818cf8',
    accentDark: '#4f46e5',
    ring: 'rgba(99, 102, 241, 0.45)',
    glow: 'rgba(99, 102, 241, 0.15)',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    metallic: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)',
  },
  obsidian: {
    name: 'Obsidian',
    accent: '#71717a',
    accentLight: '#a1a1aa',
    accentDark: '#52525b',
    ring: 'rgba(113, 113, 122, 0.45)',
    glow: 'rgba(113, 113, 122, 0.15)',
    gradient: 'linear-gradient(135deg, #71717a 0%, #52525b 100%)',
    metallic: 'linear-gradient(135deg, #a1a1aa 0%, #71717a 50%, #52525b 100%)',
  },
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function createCustomTheme(color) {
  const rgb = hexToRgb(color);
  if (!rgb) return THEMES.cyan;

  // Create lighter and darker variants
  const lighter = `rgb(${Math.min(rgb.r + 40, 255)}, ${Math.min(rgb.g + 40, 255)}, ${Math.min(rgb.b + 40, 255)})`;
  const darker = `rgb(${Math.max(rgb.r - 40, 0)}, ${Math.max(rgb.g - 40, 0)}, ${Math.max(rgb.b - 40, 0)})`;

  return {
    name: 'Custom',
    accent: color,
    accentLight: lighter,
    accentDark: darker,
    ring: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45)`,
    glow: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
    gradient: `linear-gradient(135deg, ${color} 0%, ${darker} 100%)`,
    metallic: `linear-gradient(135deg, ${lighter} 0%, ${color} 50%, ${darker} 100%)`,
  };
}

export const ThemeProvider = ({ children }) => {
  const [themeKey, setThemeKey] = useState('cyan');
  const [customColor, setCustomColor] = useState(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const savedCustom = localStorage.getItem('portfolio-custom-color');
    
    if (savedCustom) {
      setCustomColor(savedCustom);
      setThemeKey('custom');
    } else if (saved && THEMES[saved]) {
      setThemeKey(saved);
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const theme = themeKey === 'custom' && customColor
      ? createCustomTheme(customColor)
      : THEMES[themeKey] || THEMES.cyan;

    const root = document.documentElement;
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-accent-light', theme.accentLight);
    root.style.setProperty('--theme-accent-dark', theme.accentDark);
    root.style.setProperty('--theme-ring', theme.ring);
    root.style.setProperty('--theme-glow', theme.glow);
    root.style.setProperty('--theme-gradient', theme.gradient);
    root.style.setProperty('--theme-metallic', theme.metallic);

    // Also update shadcn ring color
    root.style.setProperty('--ring', theme.ring);
  }, [themeKey, customColor]);

  const setTheme = (key) => {
    if (key === 'custom') {
      // Don't set custom without a color
      return;
    }
    setThemeKey(key);
    setCustomColor(null);
    localStorage.setItem('portfolio-theme', key);
    localStorage.removeItem('portfolio-custom-color');
  };

  const setCustomTheme = (color) => {
    setCustomColor(color);
    setThemeKey('custom');
    localStorage.setItem('portfolio-custom-color', color);
    localStorage.setItem('portfolio-theme', 'custom');
  };

  const currentTheme = themeKey === 'custom' && customColor
    ? createCustomTheme(customColor)
    : THEMES[themeKey] || THEMES.cyan;

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeKey,
        themes: THEMES,
        setTheme,
        setCustomTheme,
        customColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
