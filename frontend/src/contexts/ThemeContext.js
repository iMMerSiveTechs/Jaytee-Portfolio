import React, { createContext, useContext, useState, useEffect } from 'react';

// Premium metallic color themes
const ACCENT_THEMES = {
  cyan: {
    name: 'Cyan Electric',
    accent: '#00f0ff',
    accentLight: '#5ffdff',
    accentDark: '#00c8d4',
    ring: 'rgba(0, 240, 255, 0.45)',
    glow: 'rgba(0, 240, 255, 0.15)',
    gradient: 'linear-gradient(135deg, #00f0ff 0%, #00c8d4 100%)',
    metallic: 'linear-gradient(135deg, #5ffdff 0%, #00f0ff 50%, #00c8d4 100%)',
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

// Mode definitions
const MODE_TOKENS = {
  dark: {
    bg0: '#08090a',
    bg1: '#0f1115',
    bg2: '#161920',
    surface: 'rgba(255,255,255,0.04)',
    surfaceHover: 'rgba(255,255,255,0.06)',
    surfaceBorder: 'rgba(255,255,255,0.08)',
    text: 'rgba(255,255,255,0.95)',
    textSecondary: 'rgba(255,255,255,0.72)',
    textMuted: 'rgba(255,255,255,0.55)',
    textSubtle: 'rgba(255,255,255,0.35)',
    border: 'rgba(255,255,255,0.10)',
    borderMedium: 'rgba(255,255,255,0.12)',
    borderSubtle: 'rgba(255,255,255,0.06)',
    shadow: '0 18px 55px rgba(0,0,0,0.55)',
    shadowSoft: '0 10px 30px rgba(0,0,0,0.45)',
    panel: 'rgba(255,255,255,0.04)',
    panelBorder: 'rgba(255,255,255,0.08)',
    navBg: 'rgba(8,9,10,0.92)',
    navBgTranslucent: 'rgba(8,9,10,0.6)',
  },
  light: {
    bg0: '#ffffff',
    bg1: '#f8f9fa',
    bg2: '#e9ecef',
    surface: 'rgba(0,0,0,0.02)',
    surfaceHover: 'rgba(0,0,0,0.04)',
    surfaceBorder: 'rgba(0,0,0,0.08)',
    text: 'rgba(0,0,0,0.92)',
    textSecondary: 'rgba(0,0,0,0.72)',
    textMuted: 'rgba(0,0,0,0.55)',
    textSubtle: 'rgba(0,0,0,0.40)',
    border: 'rgba(0,0,0,0.10)',
    borderMedium: 'rgba(0,0,0,0.12)',
    borderSubtle: 'rgba(0,0,0,0.06)',
    shadow: '0 18px 55px rgba(0,0,0,0.08)',
    shadowSoft: '0 10px 30px rgba(0,0,0,0.06)',
    panel: 'rgba(0,0,0,0.02)',
    panelBorder: 'rgba(0,0,0,0.08)',
    navBg: 'rgba(255,255,255,0.92)',
    navBgTranslucent: 'rgba(255,255,255,0.6)',
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

// Calculate relative luminance for contrast checks
function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

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
  if (!rgb) return ACCENT_THEMES.cyan;

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
  const [mode, setMode] = useState('dark');
  const [accentKey, setAccentKey] = useState('cyan');
  const [customColor, setCustomColor] = useState(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio-mode');
    const savedAccent = localStorage.getItem('portfolio-theme');
    const savedCustom = localStorage.getItem('portfolio-custom-color');
    
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
    
    if (savedCustom) {
      setCustomColor(savedCustom);
      setAccentKey('custom');
    } else if (savedAccent && ACCENT_THEMES[savedAccent]) {
      setAccentKey(savedAccent);
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const accentTheme = accentKey === 'custom' && customColor
      ? createCustomTheme(customColor)
      : ACCENT_THEMES[accentKey] || ACCENT_THEMES.cyan;

    const modeTokens = MODE_TOKENS[mode];

    const root = document.documentElement;

    // In light mode, use darker accent variant if contrast is too low on white
    const rgb = hexToRgb(accentTheme.accent);
    let contrastAccent = accentTheme.accent;
    if (mode === 'light' && rgb) {
      const lum = luminance(rgb.r, rgb.g, rgb.b);
      // WCAG AA needs 4.5:1 contrast ratio against white (luminance 1.0)
      const ratio = (1.05) / (lum + 0.05);
      if (ratio < 3) {
        // Use the dark variant for better contrast
        contrastAccent = accentTheme.accentDark;
      }
    }

    // Accent colors
    root.style.setProperty('--theme-accent', accentTheme.accent);
    root.style.setProperty('--theme-accent-contrast', contrastAccent);
    root.style.setProperty('--theme-accent-light', accentTheme.accentLight);
    root.style.setProperty('--theme-accent-dark', accentTheme.accentDark);
    root.style.setProperty('--theme-ring', accentTheme.ring);
    root.style.setProperty('--theme-glow', accentTheme.glow);
    root.style.setProperty('--theme-gradient', accentTheme.gradient);
    root.style.setProperty('--theme-metallic', accentTheme.metallic);

    // Mode-specific tokens
    root.style.setProperty('--theme-bg0', modeTokens.bg0);
    root.style.setProperty('--theme-bg1', modeTokens.bg1);
    root.style.setProperty('--theme-bg2', modeTokens.bg2);
    root.style.setProperty('--theme-surface', modeTokens.surface);
    root.style.setProperty('--theme-surface-hover', modeTokens.surfaceHover);
    root.style.setProperty('--theme-surface-border', modeTokens.surfaceBorder);
    root.style.setProperty('--theme-text', modeTokens.text);
    root.style.setProperty('--theme-text-secondary', modeTokens.textSecondary);
    root.style.setProperty('--theme-text-muted', modeTokens.textMuted);
    root.style.setProperty('--theme-text-subtle', modeTokens.textSubtle);
    root.style.setProperty('--theme-border', modeTokens.border);
    root.style.setProperty('--theme-border-medium', modeTokens.borderMedium);
    root.style.setProperty('--theme-border-subtle', modeTokens.borderSubtle);
    root.style.setProperty('--theme-shadow', modeTokens.shadow);
    root.style.setProperty('--theme-shadow-soft', modeTokens.shadowSoft);
    root.style.setProperty('--theme-panel', modeTokens.panel);
    root.style.setProperty('--theme-panel-border', modeTokens.panelBorder);
    root.style.setProperty('--theme-nav-bg', modeTokens.navBg);
    root.style.setProperty('--theme-nav-bg-translucent', modeTokens.navBgTranslucent);

    // Set data attribute for CSS targeting
    root.setAttribute('data-theme-mode', mode);

    // Update body background
    document.body.style.background = modeTokens.bg0;

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) metaThemeColor.setAttribute('content', modeTokens.bg0);
  }, [mode, accentKey, customColor]);

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('portfolio-mode', newMode);
  };

  const setAccent = (key) => {
    if (key === 'custom') return;
    setAccentKey(key);
    setCustomColor(null);
    localStorage.setItem('portfolio-theme', key);
    localStorage.removeItem('portfolio-custom-color');
  };

  const setCustomAccent = (color) => {
    setCustomColor(color);
    setAccentKey('custom');
    localStorage.setItem('portfolio-custom-color', color);
    localStorage.setItem('portfolio-theme', 'custom');
  };

  const currentAccent = accentKey === 'custom' && customColor
    ? createCustomTheme(customColor)
    : ACCENT_THEMES[accentKey] || ACCENT_THEMES.cyan;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        accent: currentAccent,
        accentKey,
        accents: ACCENT_THEMES,
        setAccent,
        setCustomAccent,
        customColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
