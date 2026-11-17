import { Platform } from 'react-native';

/**
 * Habitopia "Sprout Play" design tokens.
 *
 * Single source of truth for every visual decision in the app. Screens and
 * components must read from here (directly or through the theme) instead of
 * hard-coding sizes, radii, fonts or colours.
 *
 * Design principles (children aged 7–14):
 *  1. Readable first  – body text never below 14pt, captions never below 12pt.
 *  2. Big, forgiving targets – every tappable thing is at least 48dp.
 *  3. Friendly shapes – generous rounded corners, chunky "candy" depth.
 *  4. Colour carries meaning – each growth dimension owns one hue, used
 *     consistently for icons, tags, progress and celebrations.
 *  5. Calm canvas, joyful accents – warm neutral backgrounds keep long reading
 *     comfortable; saturated colour is reserved for progress and rewards.
 */

// ---------------------------------------------------------------------------
// Raw palette – kid-brightened evolution of the official Sprout logo colours.
// Every value is 6-digit hex so screens can append 2-digit alpha (e.g. + '20').
// ---------------------------------------------------------------------------
export const palette = {
  // Sprout mint (growth, completion, primary actions)
  mint50: '#E8FBF3',
  mint300: '#5FE3B0',
  mint500: '#18B57E',
  mint700: '#0E8A5F',
  mint900: '#06573B',

  // Sunshine gold (XP, streaks, medals, rewards)
  sun50: '#FFF6DB',
  sun300: '#FFD45E',
  sun500: '#FFB915',
  sun700: '#B26B00',
  sun900: '#7A4800',

  // Sky blue (learning, quests, information)
  sky50: '#E8F3FF',
  sky300: '#7CC0FF',
  sky500: '#2F8CFF',
  sky700: '#1B6AD0',

  // Grape (mind, focus)
  grape50: '#F1EDFF',
  grape300: '#AE9BFF',
  grape500: '#7B5CFF',
  grape700: '#5B3FD6',

  // Bubblegum (heart, emotions)
  bubble50: '#FFEDF3',
  bubble300: '#FF94B8',
  bubble500: '#FF4F86',
  bubble700: '#C92A62',

  // Tangerine (money, energy)
  tangerine50: '#FFF0E6',
  tangerine300: '#FFAA70',
  tangerine500: '#FF7A2F',
  tangerine700: '#C2500C',

  // Cherry (errors, destructive)
  cherry300: '#FF8A80',
  cherry500: '#F0443A',
  cherry700: '#C02A21',

  // Neutrals – warm "paper" for day, deep "starry indigo" for night
  cream50: '#FFFBF4',
  cream100: '#FFF6E9',
  cream200: '#F8EEDD',
  cream300: '#EFE2CC',
  cream400: '#E3D3B8',

  ink900: '#26214A', // primary text (deep plum ink — softer than black)
  ink700: '#5E587E',
  ink500: '#8E88AA',

  night950: '#0E0B2B',
  night900: '#151238',
  night800: '#1D1948',
  night700: '#252058',
  night600: '#2E2869',
  night500: '#3A337D',
  night400: '#4A4294',

  moon50: '#F8F6FF',
  moon200: '#C3BDEA',
  moon400: '#958FC4',

  white: '#FFFFFF',
  black: '#000000'
};

// ---------------------------------------------------------------------------
// Spacing – 4pt grid.
// ---------------------------------------------------------------------------
export const space = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40
};

// ---------------------------------------------------------------------------
// Corner radii – friendly and generous. `pill` for fully rounded capsules.
// ---------------------------------------------------------------------------
export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  pill: 999
};

// Snap any legacy radius to the nearest step on the scale.
export const RADIUS_STEPS = [radius.xs, radius.sm, radius.md, radius.lg, radius.xl, radius.xxl];

// ---------------------------------------------------------------------------
// Typography
//  - Display face: Fredoka  (rounded, playful – titles, numbers, buttons)
//  - Text face:    Nunito   (rounded terminals, highly legible – body copy)
// ---------------------------------------------------------------------------
export const fontFamily = {
  displayMedium: 'Fredoka_500Medium',
  displaySemiBold: 'Fredoka_600SemiBold',
  displayBold: 'Fredoka_700Bold',
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semiBold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
  black: 'Nunito_900Black'
};

/** Resolve a text-face font family for a numeric/string font weight. */
export function textFontForWeight(weight) {
  const w = parseInt(weight, 10) || (weight === 'bold' ? 700 : 400);
  if (w >= 900) return fontFamily.black;
  if (w >= 800) return fontFamily.extraBold;
  if (w >= 700) return fontFamily.bold;
  if (w >= 600) return fontFamily.semiBold;
  if (w >= 500) return fontFamily.medium;
  return fontFamily.regular;
}

/** Resolve a display-face font family for a numeric/string font weight. */
export function displayFontForWeight(weight) {
  const w = parseInt(weight, 10) || (weight === 'bold' ? 700 : 400);
  if (w >= 700) return fontFamily.displayBold;
  if (w >= 600) return fontFamily.displaySemiBold;
  return fontFamily.displayMedium;
}

// Minimum sizes enforced across the app (see principle 1).
export const MIN_FONT_SIZE = 12;
// Text at/above this size is treated as a heading and set in the display face.
export const DISPLAY_FONT_THRESHOLD = 18;

/**
 * Named type ramp. `fontWeight` is intentionally omitted: weight is carried by
 * the font family so rendering is identical on iOS, Android and web.
 */
// Android adds extra top padding to custom fonts, which pushes text below the
// visual centre of pills, buttons and keypad keys. Turning it off makes text
// sit identically on Android and iOS.
export const textPlatformFix = Platform.OS === 'android' ? { includeFontPadding: false } : {};

export const typeScale = {
  hero: { ...textPlatformFix, fontFamily: fontFamily.displayBold, fontSize: 34, lineHeight: 40 },
  display: { ...textPlatformFix, fontFamily: fontFamily.displayBold, fontSize: 28, lineHeight: 34 },
  title: { ...textPlatformFix, fontFamily: fontFamily.displaySemiBold, fontSize: 22, lineHeight: 28 },
  heading: { ...textPlatformFix, fontFamily: fontFamily.displaySemiBold, fontSize: 19, lineHeight: 25 },
  subheading: { ...textPlatformFix, fontFamily: fontFamily.extraBold, fontSize: 16, lineHeight: 22 },
  body: { ...textPlatformFix, fontFamily: fontFamily.semiBold, fontSize: 15, lineHeight: 22 },
  bodyStrong: { ...textPlatformFix, fontFamily: fontFamily.bold, fontSize: 15, lineHeight: 22 },
  bodySm: { ...textPlatformFix, fontFamily: fontFamily.semiBold, fontSize: 14, lineHeight: 20 },
  label: { ...textPlatformFix, fontFamily: fontFamily.extraBold, fontSize: 13, lineHeight: 18, letterSpacing: 0.2 },
  caption: { ...textPlatformFix, fontFamily: fontFamily.bold, fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
  number: { ...textPlatformFix, fontFamily: fontFamily.displayBold, fontSize: 20, lineHeight: 24 },
  button: { ...textPlatformFix, fontFamily: fontFamily.displaySemiBold, fontSize: 17, lineHeight: 22, letterSpacing: 0.2 }
};

// Snap any legacy font size onto the ramp (keeps hierarchy, removes the 28
// one-off sizes found in the audit, and lifts everything below 12pt).
const FONT_STEPS = [12, 13, 14, 15, 16, 17, 19, 22, 26, 28, 34, 40];
export function snapFontSize(size) {
  if (typeof size !== 'number') return size;
  // Children need a lift on small text: anything authored below 13 moves up a step.
  const lifted = size < 13 ? size + 1.5 : size;
  const target = Math.max(MIN_FONT_SIZE, lifted);
  return FONT_STEPS.reduce((best, s) => (Math.abs(s - target) < Math.abs(best - target) ? s : best), FONT_STEPS[0]);
}

// ---------------------------------------------------------------------------
// Sizing & touch
// ---------------------------------------------------------------------------
export const touch = {
  minTarget: 48,
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 }
};

export const iconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 30,
  xxl: 40
};

// Chunky "candy" depth: a solid ledge under raised surfaces, plus a soft
// shadow on iOS/web. The ledge colour comes from the theme.
export const depth = {
  ledge: 4,
  ledgePressed: 1,
  ledgeSmall: 3
};

// ---------------------------------------------------------------------------
// Motion – springs feel bouncy and alive without being slow.
// ---------------------------------------------------------------------------
export const motion = {
  pressScale: 0.96,
  spring: { friction: 6, tension: 180, useNativeDriver: true },
  springBouncy: { friction: 4, tension: 160, useNativeDriver: true },
  duration: { fast: 140, base: 240, slow: 420, celebrate: 900 }
};

export const layout = {
  screenPadding: space.lg,
  maxContentWidth: 640
};
