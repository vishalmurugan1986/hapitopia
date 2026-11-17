import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from './AppText';
import PressableScale from './PressableScale';
import { useTheme } from '../ThemeContext';
import { radius, space, typeScale, touch, depth } from '../tokens';

/**
 * Inline feedback message.
 *   <Banner tone="danger" message="PINs do not match" />
 */
export function Banner({ tone = 'danger', message, icon, style, T: themeOverride }) {
  const T = useTheme(themeOverride);
  if (!message) return null;
  const hue = tone === 'success' ? T.success : tone === 'info' ? T.tertiary : tone === 'warning' ? T.warning : T.danger;
  const defaultIcon = tone === 'success' ? 'checkmark-circle' : tone === 'info' ? 'information-circle' : 'alert-circle';
  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[styles.banner, { backgroundColor: hue + (T.isDark ? '22' : '14'), borderColor: hue + '70' }, style]}
    >
      <Ionicons name={icon || defaultIcon} size={20} color={hue} />
      <AppText variant="bodyStrong" color={hue} style={styles.bannerText}>
        {message}
      </AppText>
    </View>
  );
}

/** "Step 1 of 2" segmented indicator. */
export function StepIndicator({ step, total, label, T: themeOverride }) {
  const T = useTheme(themeOverride);
  return (
    <View style={styles.stepWrap} accessible accessibilityLabel={label || `Step ${step} of ${total}`}>
      <View style={styles.stepTrack}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[styles.stepSeg, { backgroundColor: i < step ? T.primaryFill : T.surfaceHigh }]}
          />
        ))}
      </View>
      {label ? (
        <AppText variant="label" tone="muted" align="center">
          {label}
        </AppText>
      ) : null}
    </View>
  );
}

/** Row of PIN bubbles that fill as digits are typed and shake-tint on error. */
export function PinDots({ length = 4, filled = 0, error = false, T: themeOverride }) {
  const T = useTheme(themeOverride);
  const hue = error ? T.danger : T.primaryFill;
  return (
    <View style={styles.dots} accessible accessibilityLabel={`${filled} of ${length} digits entered`}>
      {Array.from({ length }).map((_, i) => {
        const on = i < filled;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: on ? hue : T.card,
                borderColor: on ? hue : T.lineHigh,
                transform: [{ scale: on ? 1 : 0.86 }]
              }
            ]}
          />
        );
      })}
    </View>
  );
}

// Single-line TextInputs must not carry a lineHeight: iOS shifts the text out
// of the box and Android clips it (the "text hides while typing" bug).
const { lineHeight: _ignoredLineHeight, ...INPUT_TYPE } = typeScale.bodyStrong;

const DEFAULT_KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['C', '0', '⌫']
];

/**
 * Chunky on-screen number pad. `onKey` receives '0'–'9', 'C' (clear) or '⌫'.
 * Use '' in `keys` for an empty slot.
 */
export function Keypad({ onKey, keys = DEFAULT_KEYS, lang = 'en', T: themeOverride }) {
  const T = useTheme(themeOverride);
  const labelFor = (k) =>
    k === '⌫' ? (lang === 'ta' ? 'அழி' : 'Delete') : k === 'C' ? (lang === 'ta' ? 'அனைத்தையும் அழி' : 'Clear') : k;

  return (
    <View style={styles.keypad}>
      {keys.map((row, r) => (
        <View key={r} style={styles.keyRow}>
          {row.map((k, c) => {
            if (k === '') return <View key={`s${r}${c}`} style={styles.keySlot} />;
            const isAction = k === 'C' || k === '⌫';
            return (
              <PressableScale
                key={`${r}${c}${k}`}
                containerStyle={styles.keySlot}
                onPress={() => onKey(k)}
                haptic={null}
                scaleTo={0.92}
                accessibilityRole="button"
                accessibilityLabel={labelFor(k)}
              >
                {({ pressed }) => (
                  <View
                    style={[
                      styles.key,
                      {
                        backgroundColor: pressed ? T.primarySoft : isAction ? T.surfaceLowest : T.card,
                        borderColor: T.line,
                        borderBottomColor: T.ledge,
                        borderBottomWidth: pressed ? 1.5 + depth.ledgePressed : 1.5 + depth.ledge,
                        marginTop: pressed ? depth.ledge - depth.ledgePressed : 0
                      }
                    ]}
                  >
                    {k === '⌫' ? (
                      <Ionicons name="backspace-outline" size={28} color={T.tertiary} />
                    ) : k === 'C' ? (
                      <AppText variant="heading" color={T.danger}>
                        C
                      </AppText>
                    ) : (
                      <AppText variant="display">{k}</AppText>
                    )}
                  </View>
                )}
              </PressableScale>
            );
          })}
        </View>
      ))}
    </View>
  );
}

/**
 * Labelled text input with validation state.
 *   status: 'default' | 'valid' | 'invalid'
 */
export function TextField({ label, icon, iconColor, hint, status = 'default', style, inputStyle, T: themeOverride, ...inputProps }) {
  const T = useTheme(themeOverride);
  const [focused, setFocused] = useState(false);
  const border = status === 'valid' ? T.success : status === 'invalid' ? T.danger : focused ? T.tertiary : T.lineHigh;
  return (
    <View style={[styles.field, style]}>
      {label ? (
        <View style={styles.fieldLabelRow}>
          {icon ? <Ionicons name={icon} size={20} color={iconColor || T.primary} /> : null}
          <AppText variant="subheading" style={styles.flex1}>
            {label}
          </AppText>
          {hint}
        </View>
      ) : null}
      <View style={[styles.inputWrap, { borderColor: border, backgroundColor: T.surfaceLow }]}>
        <TextInput
          placeholderTextColor={T.dim}
          {...inputProps}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus && inputProps.onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur && inputProps.onBlur(e);
          }}
          style={[INPUT_TYPE, styles.input, { color: T.tx }, inputStyle]}
        />
        {status === 'valid' ? <Ionicons name="checkmark-circle" size={24} color={T.success} /> : null}
        {status === 'invalid' ? <Ionicons name="close-circle" size={24} color={T.danger} /> : null}
      </View>
    </View>
  );
}

/**
 * Selectable tile for grids (age picker, avatar picker). Shows a check badge
 * when selected. Put any content inside.
 */
export function OptionTile({ selected, onPress, color, accessibilityLabel, children, style, T: themeOverride }) {
  const T = useTheme(themeOverride);
  const hue = color || T.primary;
  return (
    <PressableScale
      containerStyle={styles.tileSlot}
      onPress={onPress}
      scaleTo={0.93}
      accessibilityRole="radio"
      accessibilityState={{ selected: !!selected }}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={[
          styles.tile,
          {
            backgroundColor: selected ? hue + (T.isDark ? '2E' : '1A') : T.card,
            borderColor: selected ? hue : T.line,
            borderBottomColor: selected ? hue : T.ledge
          },
          style
        ]}
      >
        {children}
        {selected ? (
          <View style={[styles.tileCheck, { backgroundColor: hue, borderColor: T.card }]}>
            <Ionicons name="checkmark" size={14} color={T.isDark ? T.on : '#FFFFFF'} />
          </View>
        ) : null}
      </View>
    </PressableScale>
  );
}

/** Large tappable consent / agreement checkbox row. */
export function CheckRow({ checked, onPress, label, T: themeOverride }) {
  const T = useTheme(themeOverride);
  return (
    <PressableScale
      onPress={onPress}
      scaleTo={0.98}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!checked }}
      accessibilityLabel={label}
    >
      <View
        style={[
          styles.checkRow,
          { backgroundColor: checked ? T.primarySoft : T.card, borderColor: checked ? T.primary : T.lineHigh }
        ]}
      >
        <View style={[styles.checkBox, { backgroundColor: checked ? T.primary : T.card, borderColor: checked ? T.primary : T.mu }]}>
          {checked ? <Ionicons name="checkmark" size={20} color={T.isDark ? T.on : '#FFFFFF'} /> : null}
        </View>
        <AppText variant="bodySm" style={styles.flex1}>
          {label}
        </AppText>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    borderRadius: radius.lg,
    borderWidth: 1.5
  },
  bannerText: { flex: 1 },
  stepWrap: { alignItems: 'center', gap: space.sm },
  stepTrack: { flexDirection: 'row', gap: space.xs + 2, width: 140 },
  stepSeg: { flex: 1, height: 8, borderRadius: radius.pill },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: space.lg },
  dot: { width: 24, height: 24, borderRadius: 12, borderWidth: 3 },
  keypad: { gap: space.md, width: '100%', maxWidth: 340, alignSelf: 'center' },
  keyRow: { flexDirection: 'row', gap: space.md },
  keySlot: { flex: 1 },
  key: {
    height: 64,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  field: { gap: space.sm },
  fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    borderWidth: 2,
    borderRadius: radius.lg,
    paddingHorizontal: space.lg,
    minHeight: touch.minTarget + 8
  },
  input: {
    flex: 1,
    paddingVertical: space.md,
    fontSize: 17,
    ...Platform.select({ web: { outlineStyle: 'none' }, android: { textAlignVertical: 'center' }, default: {} })
  },
  tileSlot: { flex: 1 },
  tile: {
    minHeight: 72,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderBottomWidth: 2 + depth.ledgeSmall,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: space.sm,
    paddingHorizontal: space.xs,
    gap: space.xs
  },
  tileCheck: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 2
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
