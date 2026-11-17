import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import PressableScale from './PressableScale';
import { useTheme } from '../ThemeContext';
import { radius, space, depth, touch, iconSize } from '../tokens';

function resolveColors(T, variant) {
  switch (variant) {
    case 'secondary':
      return { bg: T.secondaryFill, fg: T.onSecondary, ledge: T.secondaryLedge, border: 'transparent' };
    case 'tertiary':
      return { bg: T.tertiaryFill, fg: T.onTertiary, ledge: T.tertiaryLedge, border: 'transparent' };
    case 'danger':
      return { bg: T.dangerFill, fg: T.onDanger, ledge: T.danger, border: 'transparent' };
    case 'outline':
      return { bg: T.card, fg: T.tx, ledge: T.ledge, border: T.lineHigh };
    case 'ghost':
      return { bg: 'transparent', fg: T.primary, ledge: null, border: 'transparent' };
    case 'primary':
    default:
      return { bg: T.primaryFill, fg: T.onPrimary, ledge: T.primaryLedge, border: 'transparent' };
  }
}

/**
 * Chunky "candy" button with a solid ledge that compresses when pressed.
 *   <Button title="Start Quest" icon="rocket" onPress={...} />
 *   <Button variant="outline" size="sm" title="Later" />
 */
export default function Button({
  title,
  icon,
  iconRight,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onPress,
  haptic = 'medium',
  accessibilityLabel,
  style,
  T: themeOverride
}) {
  const T = useTheme(themeOverride);
  const c = resolveColors(T, variant);
  const isSmall = size === 'sm';
  const height = isSmall ? 40 : size === 'lg' ? 60 : touch.minTarget + 4;
  const ledge = c.ledge ? (isSmall ? depth.ledgeSmall : depth.ledge) : 0;

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled || loading}
      haptic={haptic}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      hitSlop={isSmall ? touch.hitSlop : undefined}
      style={[fullWidth && styles.fullWidth, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.base,
            {
              minHeight: height,
              paddingHorizontal: isSmall ? space.md : space.xl,
              backgroundColor: c.bg,
              borderColor: c.border,
              borderWidth: variant === 'outline' ? 2 : 0,
              borderBottomWidth: (variant === 'outline' ? 2 : 0) + (pressed ? Math.min(ledge, depth.ledgePressed) : ledge),
              borderBottomColor: c.ledge || c.border,
              marginTop: pressed ? ledge - Math.min(ledge, depth.ledgePressed) : 0,
              opacity: disabled ? 0.45 : 1
            }
          ]}
        >
          {loading ? (
            <ActivityIndicator color={c.fg} />
          ) : (
            <>
              {icon ? <Ionicons name={icon} size={isSmall ? iconSize.sm : iconSize.md} color={c.fg} /> : null}
              {title ? (
                <AppText variant={isSmall ? 'label' : 'button'} color={c.fg} numberOfLines={1}>
                  {title}
                </AppText>
              ) : null}
              {iconRight ? <Ionicons name={iconRight} size={isSmall ? iconSize.sm : iconSize.md} color={c.fg} /> : null}
            </>
          )}
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    borderRadius: radius.lg
  },
  fullWidth: {
    alignSelf: 'stretch'
  }
});
