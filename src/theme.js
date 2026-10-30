// Achariya Brand Design System: "Achariya Luminous Quest"
// Extracted from official Achariya 25-Year Celebration Emblem (C:\ACHARIYA\Logo.png)
// Signature Colors:
// - Achariya Magenta: #D81B60 (Vibrant) / #C2185B (Heritage Deep)
// - Achariya Sunburst Gold: #F5A623 / #F59E0B / #D97706
// - Achariya Academic Navy: #1565C0 / #0D47A1
// - Achariya Vitality Emerald: #10B981 / #059669
// - Achariya Terracotta Crimson: #E11D48 / #C62828

export const LUMINOUS_THEME = {
  dark: {
    name: 'dark',
    // Backgrounds & Canvas (Deep Obsidian Midnight with warm undertones)
    bg: '#080C16',
    surfaceLowest: '#04070F',
    surfaceLow: '#0E1424',
    card: '#131B30',
    cardElevated: '#1A2542',
    surfaceHigh: '#24345C',
    surfaceHighest: '#2F4374',

    // Borders & Strokes (Clean specular highlights)
    line: 'rgba(255, 255, 255, 0.08)',
    lineHigh: 'rgba(255, 255, 255, 0.16)',
    borderGlow: 'rgba(16, 185, 129, 0.35)',

    // Typography
    tx: '#F8FAFC',
    mu: '#94A3B8',
    dim: '#64748B',
    ink: '#F8FAFC',
    on: '#080C16',

    // Stitch MCP Luminous Energy Accents
    primary: '#10B981',           // Emerald Green (Habit Completion, Success, Focus)
    primaryGlow: 'rgba(16, 185, 129, 0.25)',
    secondary: '#F59E0B',         // Radiant Sunburst Gold (XP, Flame Streaks, Medals)
    secondaryGlow: 'rgba(245, 158, 11, 0.25)',
    tertiary: '#06B6D4',          // Electric Cyan (Waypoints, Focus Sprints)
    tertiaryGlow: 'rgba(6, 182, 212, 0.25)',
    purple: '#A855F7',            // Royal Wisdom
    purpleGlow: 'rgba(168, 85, 247, 0.25)',
    rose: '#F43F5E',              // Heart & Emotional Balance
    roseGlow: 'rgba(244, 63, 94, 0.25)',

    // Achariya Brand Signature Tokens (Tasteful & Minimal)
    achariyaMagenta: '#D81B60',
    achariyaGold: '#F5A623',
    achariyaNavy: '#1565C0',
    achariyaGreen: '#10B981',
    achariyaCrimson: '#C62828',

    // 5 Dimension Specific Colors (Achariya Identity mapping)
    dimColors: {
      P: '#10B981', // Physically Healthy (Growth Green)
      M: '#D81B60', // Mentally Strong (Achariya Royal Magenta)
      I: '#06B6D4', // Intellectually Sharp (Academic Cyan/Navy)
      E: '#F43F5E', // Emotionally Balanced (Terracotta Rose)
      F: '#F59E0B', // Financially Wealthy (Sunburst Gold)
    },

    ci: 1
  },

  light: {
    name: 'light',
    // Backgrounds & Canvas (Pristine Warm Pearl Ivory)
    bg: '#FAF7F2',
    surfaceLowest: '#EDE7DC',
    surfaceLow: '#F4EFE6',
    card: '#FFFFFF',
    cardElevated: '#FAF8F4',
    surfaceHigh: '#EAE5DB',
    surfaceHighest: '#DDD7CB',

    // Borders & Strokes
    line: 'rgba(15, 23, 42, 0.08)',
    lineHigh: 'rgba(15, 23, 42, 0.16)',
    borderGlow: 'rgba(5, 150, 105, 0.30)',

    // Typography
    tx: '#0F172A',
    mu: '#475569',
    dim: '#94A3B8',
    ink: '#0F172A',
    on: '#FFFFFF',

    // Stitch MCP Luminous Energy Accents
    primary: '#059669',           // Emerald Green (Completions)
    primaryGlow: 'rgba(5, 150, 105, 0.15)',
    secondary: '#D97706',         // Amber Sunburst Gold
    secondaryGlow: 'rgba(217, 119, 6, 0.15)',
    tertiary: '#0891B2',          // Ocean Cyan
    tertiaryGlow: 'rgba(8, 145, 178, 0.15)',
    purple: '#9333EA',            // Royal Wisdom
    purpleGlow: 'rgba(147, 51, 234, 0.15)',
    rose: '#E11D48',              // Crimson Rose
    roseGlow: 'rgba(225, 29, 72, 0.15)',

    // Achariya Brand Signature Tokens
    achariyaMagenta: '#C2185B',
    achariyaGold: '#D97706',
    achariyaNavy: '#0D47A1',
    achariyaGreen: '#059669',
    achariyaCrimson: '#B71C1C',

    // 5 Dimension Specific Colors
    dimColors: {
      P: '#059669', // Physically Healthy
      M: '#C2185B', // Mentally Strong (Achariya Magenta)
      I: '#0891B2', // Intellectually Sharp
      E: '#E11D48', // Emotionally Balanced
      F: '#D97706', // Financially Wealthy
    },

    ci: 0
  }
};
