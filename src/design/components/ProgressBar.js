import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { radius, motion } from '../tokens';

/**
 * Thick, rounded progress track that animates when the value changes.
 * `value` is 0–1. A glossy highlight strip makes the fill read as "candy".
 */
export default function ProgressBar({
  value = 0,
  color,
  height = 14,
  trackColor,
  accessibilityLabel,
  style,
  T: themeOverride
}) {
  const T = useTheme(themeOverride);
  const clamped = Math.max(0, Math.min(1, value || 0));
  const anim = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: clamped,
      duration: motion.duration.slow,
      useNativeDriver: false
    }).start();
  }, [clamped, anim]);

  const fill = color || T.primaryFill;
  const width = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[
        styles.track,
        { height, borderRadius: radius.pill, backgroundColor: trackColor || T.surfaceLowest, borderColor: T.line },
        style
      ]}
    >
      <Animated.View style={[styles.fill, { width, backgroundColor: fill, borderRadius: radius.pill, minWidth: clamped > 0 ? height : 0 }]}>
        <View style={[styles.gloss, { height: Math.max(3, height * 0.28), borderRadius: radius.pill }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1
  },
  fill: {
    height: '100%',
    overflow: 'hidden'
  },
  gloss: {
    position: 'absolute',
    top: 2,
    left: 4,
    right: 4,
    backgroundColor: 'rgba(255,255,255,0.35)'
  }
});
