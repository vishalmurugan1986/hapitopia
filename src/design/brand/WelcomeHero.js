import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, StyleSheet, AccessibilityInfo } from 'react-native';
import { HabitopiaMark } from './HabitopiaLogo';
import AppText from '../components/AppText';
import { useTheme } from '../ThemeContext';
import DimensionIcon from './DimensionIcon';
import { space } from '../tokens';

const ORBIT = ['P', 'M', 'I', 'E', 'F'];
const STAGE = 240;
const MARK = 112;
const BUBBLE = 46;
const RADIUS = 96;

/**
 * Welcome hero: the Habitopia sprout mark glowing in a sunny halo, with the
 * five growth dimensions floating around it like friendly planets, and a
 * multicolour wordmark whose letters borrow the leaf colours.
 * Motion is gentle, loops forever and is skipped when Reduce Motion is on.
 */
export default function WelcomeHero({ lang = 'en', tagline }) {
  const T = useTheme();
  const float = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let loop;
    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((on) => {
        setReduceMotion(!!on);
        if (on) return;
        loop = Animated.loop(
          Animated.sequence([
            Animated.timing(float, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(float, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
          ])
        );
        loop.start();
      })
      .catch(() => {});
    return () => loop && loop.stop();
  }, [float]);

  const bob = float.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
  const bobAlt = float.interpolate({ inputRange: [0, 1], outputRange: [-5, 5] });
  const glow = float.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1.06] });

  const letters = 'Habitopia'.split('');
  const letterColors = [T.dimColors.P, T.dimColors.M, T.dimColors.I, T.dimColors.E, T.dimColors.F, T.dimColors.Q];

  return (
    <View style={styles.wrap} accessible accessibilityRole="header" accessibilityLabel={`Habitopia. ${tagline || ''}`}>
      <View style={styles.stage}>
        {/* sunny halo */}
        <Animated.View
          style={[styles.halo, styles.haloOuter, { backgroundColor: T.secondaryFill + '1F', transform: [{ scale: reduceMotion ? 1 : glow }] }]}
        />
        <View style={[styles.halo, styles.haloInner, { backgroundColor: T.secondaryFill + '33' }]} />

        {/* orbiting dimension bubbles */}
        {ORBIT.map((k, i) => {
          const angle = (-90 + (360 / ORBIT.length) * i) * (Math.PI / 180);
          const x = STAGE / 2 + RADIUS * Math.cos(angle) - BUBBLE / 2;
          const y = STAGE / 2 + RADIUS * Math.sin(angle) - BUBBLE / 2;
          return (
            <Animated.View
              key={k}
              style={[
                styles.bubble,
                {
                  left: x,
                  top: y,
                  backgroundColor: T.card,
                  borderColor: T.dimColors[k] + '55',
                  borderBottomColor: T.dimColors[k] + '99',
                  transform: [{ translateY: reduceMotion ? 0 : i % 2 ? bob : bobAlt }]
                }
              ]}
            >
              <DimensionIcon dimKey={k} size={26} color={T.dimColors[k]} accent={T.card} />
            </Animated.View>
          );
        })}

        {/* the mark */}
        <Animated.View style={[styles.mark, { transform: [{ translateY: reduceMotion ? 0 : bob }] }]}>
          <HabitopiaMark size={MARK} />
        </Animated.View>
      </View>

      {lang === 'ta' ? (
        <AppText variant="hero" align="center">
          ஹேபிடோபியா
        </AppText>
      ) : (
        <View style={styles.wordmark}>
          {letters.map((ch, i) => (
            <AppText key={i} variant="hero" color={i === 0 ? T.tx : letterColors[(i - 1) % letterColors.length]} style={styles.letter}>
              {ch}
            </AppText>
          ))}
        </View>
      )}
      {tagline ? (
        <AppText variant="body" tone="muted" align="center">
          {tagline}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: space.xs
  },
  stage: {
    width: STAGE,
    height: STAGE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  halo: {
    position: 'absolute',
    borderRadius: 999
  },
  haloOuter: {
    width: 200,
    height: 200
  },
  haloInner: {
    width: 150,
    height: 150
  },
  mark: {
    width: MARK,
    height: MARK,
    borderRadius: 32,
    shadowColor: '#042C53',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8
  },
  bubble: {
    position: 'absolute',
    width: BUBBLE,
    height: BUBBLE,
    borderRadius: BUBBLE / 2,
    borderWidth: 2,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wordmark: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  letter: {
    fontSize: 40,
    lineHeight: 48
  }
});
