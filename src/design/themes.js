import { palette as p } from './tokens';

/**
 * Semantic colour themes: "Sunny Meadow" (day) and "Starry Night" (night).
 *
 * Contract:
 *  - Every colour is 6-digit hex unless it is a stroke (`line*`), so legacy
 *    code may append a 2-digit alpha suffix (e.g. `T.primary + '20'`).
 *  - Accent tokens (`primary`, `secondary`, `dimColors.*` …) are tuned to be
 *    readable as text on `card` / `bg` (≈4.5:1 day, ≥7:1 night).
 *  - `on*` tokens are the text/icon colour to use on top of a solid accent.
 *
 * Legacy keys (`tx`, `mu`, `surfaceLowest`, `ci` …) are kept so existing
 * screens re-skin without edits; prefer the semantic names in new code.
 */

const light = {
  name: 'light',
  isDark: false,
  ci: 0,

  // Canvas & surfaces – warm paper
  bg: p.cream100,
  surfaceLowest: p.cream200, // wells, tracks, inset chips
  surfaceLow: p.cream50,
  card: p.white,
  cardElevated: p.cream50,
  surfaceHigh: p.cream300,
  surfaceHighest: p.cream400,
  ledge: '#E9DBC2', // solid "candy" depth under raised neutral cards

  // Strokes
  line: 'rgba(38, 33, 74, 0.10)',
  lineHigh: 'rgba(38, 33, 74, 0.18)',
  borderGlow: 'rgba(24, 181, 126, 0.35)',

  // Text
  tx: p.ink900,
  mu: p.ink700,
  dim: p.ink500,
  ink: p.ink900,
  on: p.white,

  // Brand accents (text-safe on white)
  primary: p.mint700,
  primaryFill: p.mint500, // big solid buttons / progress fills
  primaryLedge: p.mint900,
  onPrimary: p.white,
  primarySoft: p.mint50,
  primaryGlow: 'rgba(24, 181, 126, 0.18)',

  secondary: p.sun700,
  secondaryFill: p.sun500,
  secondaryLedge: '#D18E00',
  onSecondary: p.ink900,
  secondarySoft: p.sun50,
  secondaryGlow: 'rgba(255, 185, 21, 0.20)',

  tertiary: p.sky700,
  tertiaryFill: p.sky500,
  tertiaryLedge: '#1450A3',
  onTertiary: p.white,
  tertiarySoft: p.sky50,
  tertiaryGlow: 'rgba(47, 140, 255, 0.18)',

  purple: p.grape700,
  purpleGlow: 'rgba(123, 92, 255, 0.16)',
  rose: p.bubble700,
  roseGlow: 'rgba(255, 79, 134, 0.16)',
  coral: p.tangerine700,
  coralGlow: 'rgba(255, 122, 47, 0.16)',

  // Feedback
  success: p.mint700,
  warning: p.sun700,
  danger: p.cherry700,
  dangerFill: p.cherry500,
  onDanger: p.white,

  // Brand constants
  navy: '#042C53',
  gold: p.sun500,
  shadow: '#5A4320',

  // Growth dimensions – one hue each
  dimColors: {
    P: p.mint700, // Physically Healthy
    M: p.grape700, // Mentally Strong
    I: p.sky700, // Intellectually Sharp
    E: p.bubble700, // Emotionally Balanced
    F: p.tangerine700, // Financially Wealthy
    Q: p.sun700 // Q Power Habits
  },
  dimTints: {
    P: p.mint50,
    M: p.grape50,
    I: p.sky50,
    E: p.bubble50,
    F: p.tangerine50,
    Q: p.sun50
  },
  dimFills: {
    P: p.mint500,
    M: p.grape500,
    I: p.sky500,
    E: p.bubble500,
    F: p.tangerine500,
    Q: p.sun500
  }
};

const dark = {
  name: 'dark',
  isDark: true,
  ci: 1,

  // Canvas & surfaces – starry indigo night (no pure black, easy on young eyes)
  bg: p.night900,
  surfaceLowest: p.night950,
  surfaceLow: p.night800,
  card: p.night700,
  cardElevated: p.night600,
  surfaceHigh: p.night500,
  surfaceHighest: p.night400,
  ledge: p.night950,

  line: 'rgba(255, 255, 255, 0.10)',
  lineHigh: 'rgba(255, 255, 255, 0.20)',
  borderGlow: 'rgba(95, 227, 176, 0.40)',

  tx: p.moon50,
  mu: p.moon200,
  dim: p.moon400,
  ink: p.moon50,
  on: p.night900,

  primary: p.mint300,
  primaryFill: p.mint300,
  primaryLedge: p.mint700,
  onPrimary: p.night900,
  primarySoft: '#173F45',
  primaryGlow: 'rgba(95, 227, 176, 0.22)',

  secondary: p.sun300,
  secondaryFill: p.sun300,
  secondaryLedge: p.sun700,
  onSecondary: p.night900,
  secondarySoft: '#3D3448',
  secondaryGlow: 'rgba(255, 212, 94, 0.22)',

  tertiary: p.sky300,
  tertiaryFill: p.sky300,
  tertiaryLedge: p.sky700,
  onTertiary: p.night900,
  tertiarySoft: '#223A6E',
  tertiaryGlow: 'rgba(124, 192, 255, 0.22)',

  purple: p.grape300,
  purpleGlow: 'rgba(174, 155, 255, 0.22)',
  rose: p.bubble300,
  roseGlow: 'rgba(255, 148, 184, 0.22)',
  coral: p.tangerine300,
  coralGlow: 'rgba(255, 170, 112, 0.22)',

  success: p.mint300,
  warning: p.sun300,
  danger: p.cherry300,
  dangerFill: p.cherry500,
  onDanger: p.white,

  navy: '#042C53',
  gold: p.sun300,
  shadow: p.black,

  dimColors: {
    P: p.mint300,
    M: p.grape300,
    I: p.sky300,
    E: p.bubble300,
    F: p.tangerine300,
    Q: p.sun300
  },
  dimTints: {
    P: '#173F45',
    M: '#2F2A6E',
    I: '#223A6E',
    E: '#432B5E',
    F: '#43304F',
    Q: '#3D3448'
  },
  dimFills: {
    P: p.mint300,
    M: p.grape300,
    I: p.sky300,
    E: p.bubble300,
    F: p.tangerine300,
    Q: p.sun300
  }
};

export const THEMES = { light, dark };

/** Resolve the active theme from the stored preference and OS scheme. */
export function resolveTheme(themeMode, systemScheme) {
  const isDark = themeMode === 'light' ? false : themeMode === 'dark' ? true : systemScheme === 'dark';
  const base = isDark ? dark : light;
  // `gold` / `i` aliases are read by older screens.
  return { ...base, gold: base.secondary, i: base.tertiary };
}
