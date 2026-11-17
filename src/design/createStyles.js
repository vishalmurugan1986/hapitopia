import { StyleSheet } from 'react-native';
import {
  RADIUS_STEPS,
  DISPLAY_FONT_THRESHOLD,
  snapFontSize,
  textFontForWeight,
  displayFontForWeight,
  touch,
  textPlatformFix
} from './tokens';

/**
 * Drop-in replacement for `StyleSheet.create` that conforms a style sheet to
 * the Sprout Play design system:
 *
 *  - text styles get the design-system font family for their weight (Nunito
 *    for body, Fredoka for headings ≥ 18pt) – weight lives in the family so it
 *    renders identically on every platform;
 *  - font sizes snap onto the type ramp with a 12pt floor;
 *  - line heights are scaled with the font size so text never clips;
 *  - corner radii snap onto the radius scale (circles are preserved);
 *  - `minHeight` on things that are already ≥ 40 is lifted to the 48dp target.
 *
 * This is the migration bridge for the large legacy screens. New UI should be
 * composed from `src/design/components` and the named `typeScale` instead.
 */
export function conformStyle(style) {
  if (!style || typeof style !== 'object') return style;
  const out = { ...style };

  const isText = out.fontSize != null || out.fontWeight != null;
  if (isText && !out.fontFamily) {
    const originalSize = typeof out.fontSize === 'number' ? out.fontSize : 14;
    const size = snapFontSize(originalSize);
    out.fontSize = size;
    out.fontFamily =
      size >= DISPLAY_FONT_THRESHOLD
        ? displayFontForWeight(out.fontWeight ?? '700')
        : textFontForWeight(out.fontWeight ?? '600');
    // Weight is encoded in the family; a numeric weight on top of a static
    // family can trigger faux-bold on Android, so drop it.
    delete out.fontWeight;
    Object.assign(out, textPlatformFix);
    if (typeof out.lineHeight === 'number') {
      out.lineHeight = Math.max(Math.round(out.lineHeight * (size / originalSize)), Math.round(size * 1.25));
    }
    if (typeof out.letterSpacing === 'number' && out.letterSpacing > 1) {
      // Wide tracking on uppercase micro-labels hurts early readers.
      out.letterSpacing = 0.6;
    }
  }

  if (typeof out.borderRadius === 'number') {
    const w = out.width;
    const h = out.height;
    const isCircle = typeof w === 'number' && w === h && out.borderRadius >= w / 2 - 1;
    if (isCircle) {
      out.borderRadius = w / 2;
    } else if (out.borderRadius > 2) {
      out.borderRadius = RADIUS_STEPS.reduce(
        (best, r) => (Math.abs(r - out.borderRadius) < Math.abs(best - out.borderRadius) ? r : best),
        RADIUS_STEPS[0]
      );
    }
  }

  if (typeof out.minHeight === 'number' && out.minHeight >= 40 && out.minHeight < touch.minTarget) {
    out.minHeight = touch.minTarget;
  }

  return out;
}

export function createStyles(styles) {
  const conformed = {};
  Object.keys(styles).forEach((key) => {
    conformed[key] = conformStyle(styles[key]);
  });
  return StyleSheet.create(conformed);
}
