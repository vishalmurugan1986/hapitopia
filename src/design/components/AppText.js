import React from 'react';
import { Text } from 'react-native';
import { typeScale } from '../tokens';
import { useTheme } from '../ThemeContext';

const TONES = {
  default: (T) => T.tx,
  muted: (T) => T.mu,
  subtle: (T) => T.dim,
  primary: (T) => T.primary,
  secondary: (T) => T.secondary,
  tertiary: (T) => T.tertiary,
  danger: (T) => T.danger,
  onPrimary: (T) => T.onPrimary,
  onSecondary: (T) => T.onSecondary
};

/**
 * Text primitive bound to the type ramp.
 *   <AppText variant="title">Daily Missions</AppText>
 *   <AppText variant="caption" tone="muted">Morning</AppText>
 * `color` overrides `tone` (e.g. a dimension colour).
 */
export default function AppText({
  variant = 'body',
  tone = 'default',
  color,
  align,
  style,
  T: themeOverride,
  children,
  ...rest
}) {
  const T = useTheme(themeOverride);
  const resolvedColor = color || (TONES[tone] ? TONES[tone](T) : T.tx);
  return (
    <Text
      maxFontSizeMultiplier={1.4}
      {...rest}
      style={[typeScale[variant] || typeScale.body, { color: resolvedColor }, align && { textAlign: align }, style]}
    >
      {children}
    </Text>
  );
}
