/**
 * Helper utilities for theme-aware styling
 * Use these functions to create dynamic styles that respond to theme changes
 */

export const getThemeStyles = () => {
  const root = document.documentElement;
  return {
    accent: getComputedStyle(root).getPropertyValue('--theme-accent').trim() || '#00f0ff',
    accentLight: getComputedStyle(root).getPropertyValue('--theme-accent-light').trim() || '#5ffdff',
    accentDark: getComputedStyle(root).getPropertyValue('--theme-accent-dark').trim() || '#00c8d4',
    ring: getComputedStyle(root).getPropertyValue('--theme-ring').trim() || 'rgba(0, 240, 255, 0.45)',
    glow: getComputedStyle(root).getPropertyValue('--theme-glow').trim() || 'rgba(0, 240, 255, 0.15)',
  };
};

/**
 * Create theme-aware inline style object
 */
export const themeStyle = (property, value = 'accent') => {
  const varMap = {
    accent: '--theme-accent',
    accentLight: '--theme-accent-light',
    accentDark: '--theme-accent-dark',
    ring: '--theme-ring',
    glow: '--theme-glow',
    gradient: '--theme-gradient',
    metallic: '--theme-metallic',
  };

  return {
    [property]: `var(${varMap[value]}, #00f0ff)`,
  };
};
