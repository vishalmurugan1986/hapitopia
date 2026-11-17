import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import PressableScale from './PressableScale';
import { useTheme } from '../ThemeContext';
import { radius, space, depth } from '../tokens';

/**
 * Surface container.
 *  variant="raised"  – white card sitting on a solid ledge (default, playful depth)
 *  variant="flat"    – bordered card, no depth (dense lists, nested content)
 *  variant="tinted"  – soft colour wash; pass `tint` (6-digit hex) for the hue
 *  variant="inset"   – recessed well for tracks, stats and inner groups
 * Passing `onPress` makes the card tappable with the shared squish feedback.
 */
export default function Card({
  variant = 'raised',
  tint,
  padding = space.lg,
  onPress,
  haptic = 'light',
  accessibilityLabel,
  style,
  children,
  T: themeOverride
}) {
  const T = useTheme(themeOverride);

  let surface;
  switch (variant) {
    case 'flat':
      surface = { backgroundColor: T.card, borderColor: T.line, borderWidth: 1.5 };
      break;
    case 'tinted': {
      const hue = tint || T.primary;
      surface = {
        backgroundColor: hue + (T.isDark ? '24' : '14'),
        borderColor: hue + (T.isDark ? '55' : '40'),
        borderWidth: 1.5,
        borderBottomWidth: 1.5 + depth.ledgeSmall,
        borderBottomColor: hue + (T.isDark ? '80' : '55')
      };
      break;
    }
    case 'inset':
      surface = { backgroundColor: T.surfaceLowest, borderColor: T.line, borderWidth: 1 };
      break;
    case 'raised':
    default:
      surface = {
        backgroundColor: T.card,
        borderColor: T.line,
        borderWidth: 1.5,
        borderBottomWidth: 1.5 + depth.ledge,
        borderBottomColor: T.ledge,
        ...Platform.select({
          ios: { shadowColor: T.shadow, shadowOpacity: T.isDark ? 0.3 : 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
          default: {}
        })
      };
  }

  const body = <View style={[styles.base, { padding }, surface, style]}>{children}</View>;

  if (!onPress) return body;
  return (
    <PressableScale onPress={onPress} haptic={haptic} accessibilityRole="button" accessibilityLabel={accessibilityLabel} scaleTo={0.98}>
      {body}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl
  }
});
