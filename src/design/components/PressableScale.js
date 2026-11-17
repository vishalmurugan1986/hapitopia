import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { motion } from '../tokens';
import { triggerHaptic } from '../../haptics';

/**
 * Pressable that gently squishes when touched – the base interaction for every
 * tappable surface so the whole app shares one tactile "feel".
 */
export default function PressableScale({
  onPress,
  disabled,
  haptic = 'light',
  scaleTo = motion.pressScale,
  style,
  containerStyle,
  children,
  onPressIn,
  onPressOut,
  ...rest
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value) => {
    Animated.spring(scale, { toValue: value, ...motion.spring }).start();
  };

  return (
    <Pressable
      style={containerStyle}
      disabled={disabled}
      onPressIn={(e) => {
        animateTo(scaleTo);
        onPressIn && onPressIn(e);
      }}
      onPressOut={(e) => {
        animateTo(1);
        onPressOut && onPressOut(e);
      }}
      onPress={(e) => {
        if (haptic) triggerHaptic(haptic);
        onPress && onPress(e);
      }}
      {...rest}
    >
      {(state) => (
        <Animated.View style={[{ transform: [{ scale }] }, typeof style === 'function' ? style(state) : style]}>
          {typeof children === 'function' ? children(state) : children}
        </Animated.View>
      )}
    </Pressable>
  );
}
