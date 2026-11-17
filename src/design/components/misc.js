import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import PressableScale from './PressableScale';
import { useTheme } from '../ThemeContext';
import { radius, space, motion, touch } from '../tokens';

/** Section title with optional emoji/icon, subtitle and right-side slot. */
export function SectionHeader({ title, subtitle, icon, iconColor, right, style, T: themeOverride }) {
  const T = useTheme(themeOverride);
  return (
    <View style={[styles.sectionRow, style]}>
      <View style={styles.sectionLeft}>
        {icon ? <Ionicons name={icon} size={22} color={iconColor || T.primary} /> : null}
        <View style={{ flexShrink: 1 }}>
          <AppText variant="title" numberOfLines={1}>
            {title}
          </AppText>
          {subtitle ? (
            <AppText variant="bodySm" tone="muted" numberOfLines={2}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
      </View>
      {right ? <View style={styles.sectionRight}>{right}</View> : null}
    </View>
  );
}

/** Compact stat capsule – e.g. streak flame or star points in the header. */
export function StatBadge({ icon, value, color, accessibilityLabel, T: themeOverride }) {
  const T = useTheme(themeOverride);
  const hue = color || T.secondary;
  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.stat,
        {
          backgroundColor: hue + (T.isDark ? '22' : '16'),
          borderColor: hue + (T.isDark ? '55' : '40')
        }
      ]}
    >
      <Ionicons name={icon} size={18} color={hue} />
      <AppText variant="number" style={styles.statValue} color={hue}>
        {value}
      </AppText>
    </View>
  );
}

/** Big, satisfying completion toggle with a bouncy check. */
export function CheckBubble({ checked, onPress, color, accessibilityLabel, T: themeOverride }) {
  const T = useTheme(themeOverride);
  const pop = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const hue = color || T.primary;

  useEffect(() => {
    Animated.spring(pop, { toValue: checked ? 1 : 0, ...motion.springBouncy }).start();
  }, [checked, pop]);

  const scale = pop.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });

  return (
    <PressableScale
      onPress={onPress}
      haptic={null}
      scaleTo={0.88}
      hitSlop={touch.hitSlop}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!checked }}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={[
          styles.check,
          {
            backgroundColor: checked ? hue : T.card,
            borderColor: checked ? hue : T.lineHigh,
            borderBottomColor: checked ? 'rgba(0,0,0,0.2)' : T.lineHigh
          }
        ]}
      >
        <Animated.View style={{ transform: [{ scale }], opacity: pop }}>
          <Ionicons name="checkmark" size={26} color={T.isDark ? T.on : '#FFFFFF'} />
        </Animated.View>
      </View>
    </PressableScale>
  );
}

/** Friendly empty / zero state with a big icon. */
export function EmptyState({ icon = 'sparkles-outline', title, message, action, T: themeOverride }) {
  const T = useTheme(themeOverride);
  return (
    <View style={[styles.empty, { backgroundColor: T.card, borderColor: T.line }]}>
      <View style={[styles.emptyIcon, { backgroundColor: T.primary + '16' }]}>
        <Ionicons name={icon} size={34} color={T.primary} />
      </View>
      {title ? (
        <AppText variant="heading" align="center">
          {title}
        </AppText>
      ) : null}
      {message ? (
        <AppText variant="body" tone="muted" align="center">
          {message}
        </AppText>
      ) : null}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    flexShrink: 1
  },
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    minHeight: 38
  },
  statValue: {
    fontSize: 17,
    lineHeight: 22
  },
  check: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 2.5,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  empty: {
    alignItems: 'center',
    gap: space.md,
    padding: space.xxl,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderStyle: 'dashed'
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
