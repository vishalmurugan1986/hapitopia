// Habitopia Official Sprout Brand Design System
// Extracted from official Habitopia Sprout Logo & Emblem
// Signature Colors:
// - Sprout Navy: #042C53 (Badge Background)
// - Sprout Golden Sand: #FAC775 (Stem & Ground Arc)
// - Mint Emerald: #5DCAA5 (Top Leaf / Dimension P)
// - Soft Sky Blue: #85B7EB (Middle-Left Leaf / Dimension I)
// - Soft Rose Pink: #ED93B1 (Middle-Right Leaf / Dimension E)
// - Warm Coral Peach: #F0997B (Bottom-Left Leaf / Dimension F)
// - Soft Lavender: #AFA9EC (Bottom-Right Leaf / Dimension M)
// - Wordmark Charcoal: #2C2C2A
// - Wordmark Muted Slate: #5F5E5A

export const LUMINOUS_THEME = {
  dark: {
    name: 'dark',
    // Backgrounds & Canvas (Deep Sprout Navy with rich undertones)
    bg: '#021427',
    surfaceLowest: '#010B17',
    surfaceLow: '#031B34',
    card: '#042C53',
    cardElevated: '#093C6F',
    surfaceHigh: '#0E4B89',
    surfaceHighest: '#145DA7',

    // Borders & Strokes
    line: 'rgba(255, 255, 255, 0.10)',
    lineHigh: 'rgba(255, 255, 255, 0.18)',
    borderGlow: 'rgba(93, 202, 165, 0.35)',

    // Typography
    tx: '#F8FAFC',
    mu: '#94A3B8',
    dim: '#64748B',
    ink: '#F8FAFC',
    on: '#021427',

    // Energy Accents from Logo
    primary: '#5DCAA5',           // Sprout Mint Emerald (Completions, Focus)
    primaryGlow: 'rgba(93, 202, 165, 0.25)',
    secondary: '#FAC775',         // Sprout Golden Sand (XP, Streaks, Medals)
    secondaryGlow: 'rgba(250, 199, 117, 0.25)',
    tertiary: '#85B7EB',          // Sprout Sky Blue (Quests, Sprints)
    tertiaryGlow: 'rgba(133, 183, 235, 0.25)',
    purple: '#AFA9EC',            // Sprout Lavender Purple
    purpleGlow: 'rgba(175, 169, 236, 0.25)',
    rose: '#ED93B1',              // Sprout Soft Rose
    roseGlow: 'rgba(237, 147, 177, 0.25)',
    coral: '#F0997B',             // Sprout Warm Coral
    coralGlow: 'rgba(240, 153, 123, 0.25)',

    // Brand Tokens
    navy: '#042C53',
    gold: '#FAC775',

    // 5 Dimension Specific Colors (Matching the 5 Sprout Leaves exactly)
    dimColors: {
      P: '#5DCAA5', // Physically Healthy (Mint Emerald - Top Leaf)
      M: '#AFA9EC', // Mentally Strong (Soft Lavender - Bottom-Right Leaf)
      I: '#85B7EB', // Intellectually Sharp (Soft Sky Blue - Middle-Left Leaf)
      E: '#ED93B1', // Emotionally Balanced (Soft Rose Pink - Middle-Right Leaf)
      F: '#F0997B', // Financially Wealthy (Warm Coral Peach - Bottom-Left Leaf)
      Q: '#FAC775', // Q Power Habits (Activation Workshop Gold)
    },

    ci: 1
  },

  light: {
    name: 'light',
    // Backgrounds & Canvas (Clean White & Soft Slate)
    bg: '#F8FAFC',
    surfaceLowest: '#E9EEF4',
    surfaceLow: '#F1F5F9',
    card: '#FFFFFF',
    cardElevated: '#F8FAFC',
    surfaceHigh: '#E2E8F0',
    surfaceHighest: '#CBD5E1',

    // Borders & Strokes
    line: 'rgba(4, 44, 83, 0.08)',
    lineHigh: 'rgba(4, 44, 83, 0.16)',
    borderGlow: 'rgba(46, 157, 120, 0.25)',

    // Typography (From Logo Wordmark)
    tx: '#2C2C2A',                // Logo Wordmark Charcoal
    mu: '#5F5E5A',                // Logo Tagline Warm Slate
    dim: '#8C8B85',
    ink: '#2C2C2A',
    on: '#FFFFFF',

    // Energy Accents (High-contrast decent tones matching logo hues)
    primary: '#2E9D78',           // Rich Mint Emerald
    primaryGlow: 'rgba(46, 157, 120, 0.15)',
    secondary: '#C68A24',         // Rich Amber Gold
    secondaryGlow: 'rgba(198, 138, 36, 0.15)',
    tertiary: '#2D7FCD',          // Intellectual Sky Azure
    tertiaryGlow: 'rgba(45, 127, 205, 0.15)',
    purple: '#6C64B5',            // Royal Lavender
    purpleGlow: 'rgba(108, 100, 181, 0.15)',
    rose: '#C94B73',              // Rich Rose Pink
    roseGlow: 'rgba(201, 75, 115, 0.15)',
    coral: '#D4623C',             // Terracotta Coral
    coralGlow: 'rgba(212, 98, 60, 0.15)',

    // Brand Tokens
    navy: '#042C53',
    gold: '#FAC775',

    // 5 Dimension Specific Colors
    dimColors: {
      P: '#2E9D78', // Physically Healthy (Rich Mint Emerald)
      M: '#6C64B5', // Mentally Strong (Royal Lavender)
      I: '#2D7FCD', // Intellectually Sharp (Intellectual Azure)
      E: '#C94B73', // Emotionally Balanced (Rich Rose Pink)
      F: '#D4623C', // Financially Wealthy (Terracotta Coral)
      Q: '#C68A24', // Q Power Habits (Rich Amber Gold)
    },

    ci: 0
  }
};
