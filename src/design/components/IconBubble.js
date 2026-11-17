import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';
import { radius } from '../tokens';
import DimensionIcon from '../brand/DimensionIcon';

const SIZES = { sm: { box: 36, icon: 18 }, md: { box: 48, icon: 24 }, lg: { box: 60, icon: 30 }, xl: { box: 76, icon: 38 } };

/**
 * Soft "squircle" holding an icon in a dimension or brand colour.
 *  solid=false → tinted background, coloured icon (default)
 *  solid=true  → full colour fill with a ledge, contrasting icon (celebration)
 */
export default function IconBubble({ name, dimKey, color, size = 'md', solid = false, shape = 'squircle', style, T: themeOverride }) {
  const T = useTheme(themeOverride);
  const hue = color || T.primary;
  const s = SIZES[size] || SIZES.md;

  return (
    <View
      style={[
        {
          width: s.box,
          height: s.box,
          borderRadius: shape === 'circle' ? s.box / 2 : s.box <= 40 ? radius.md : radius.lg,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: solid ? hue : hue + (T.isDark ? '26' : '18'),
          borderWidth: solid ? 0 : 1.5,
          borderColor: hue + (T.isDark ? '45' : '30'),
          borderBottomWidth: solid ? 3 : 1.5,
          borderBottomColor: solid ? 'rgba(0,0,0,0.18)' : hue + (T.isDark ? '45' : '30')
        },
        style
      ]}
    >
      {dimKey ? (
        // Habitopia's own dimension icon (Q/P/M/I/E/F) instead of a stock glyph.
        <DimensionIcon
          dimKey={dimKey}
          size={Math.round(s.icon * 1.1)}
          color={solid ? (T.isDark ? T.on : '#FFFFFF') : hue}
          accent={solid ? hue : '#FFFFFF'}
        />
      ) : (
        <Ionicons name={name} size={s.icon} color={solid ? (T.isDark ? T.on : '#FFFFFF') : hue} />
      )}
    </View>
  );
}
