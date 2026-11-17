import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import PressableScale from './PressableScale';
import { useTheme } from '../ThemeContext';
import { radius, space, iconSize, touch } from '../tokens';
import DimensionIcon from '../brand/DimensionIcon';

/**
 * Rounded capsule used for filters, tags and small status labels.
 *  - Selectable filter:  <Chip label="Body" selected onPress={...} color={T.dimColors.P} />
 *  - Static tag:         <Chip label="+10 XP" icon="star" size="sm" />
 * `color` must be 6-digit hex (alpha is appended for the tint).
 */
export default function Chip({
  label,
  icon,
  dimKey,
  color,
  selected = false,
  onPress,
  size = 'md',
  accessibilityLabel,
  style,
  T: themeOverride
}) {
  const T = useTheme(themeOverride);
  const hue = color || T.primary;
  const isSmall = size === 'sm';

  const content = (
    <View
      style={[
        styles.base,
        {
          minHeight: isSmall ? 26 : onPress ? 40 : 34,
          paddingHorizontal: isSmall ? space.sm : space.md,
          backgroundColor: selected ? hue : hue + (T.isDark ? '22' : '14'),
          borderColor: selected ? hue : hue + (T.isDark ? '50' : '35')
        },
        style
      ]}
    >
      {dimKey ? (
        <DimensionIcon
          dimKey={dimKey}
          size={isSmall ? 14 : 18}
          color={selected ? (T.isDark ? T.on : T.onPrimary) : hue}
          accent={selected ? hue : T.isDark ? T.card : '#FFFFFF'}
        />
      ) : icon ? (
        <Ionicons name={icon} size={isSmall ? 12 : iconSize.sm} color={selected ? (T.isDark ? T.on : T.onPrimary) : hue} />
      ) : null}
      <AppText
        variant={isSmall ? 'caption' : 'label'}
        color={selected ? (T.isDark ? T.on : T.onPrimary) : hue}
        numberOfLines={1}
      >
        {label}
      </AppText>
    </View>
  );

  if (!onPress) return content;
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel || label}
      hitSlop={{ top: (touch.minTarget - 40) / 2, bottom: (touch.minTarget - 40) / 2 }}
    >
      {content}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: space.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1.5
  }
});
