import React from 'react';
import Svg, { Rect, Path, G } from 'react-native-svg';

// Official Habitopia sprout mark, redrawn as vectors from
// assets/habitopia_sprout_logo.svg (same geometry and colours) so it stays
// crisp at every size and can sit inside animated layouts.
const LEAF = 'M0 0 C12 -13 32 -13 42 0 C32 13 12 13 0 0Z';
const LEAVES = [
  { x: 70, y: 108, r: -145, c: '#F0997B' }, // Financial – coral
  { x: 70, y: 108, r: -35, c: '#AFA9EC' }, // Mental – lavender
  { x: 70, y: 84, r: -145, c: '#85B7EB' }, // Intellectual – sky
  { x: 70, y: 84, r: -35, c: '#ED93B1' }, // Emotional – rose
  { x: 70, y: 62, r: -90, c: '#5DCAA5' } // Physical – mint
];

/**
 * <HabitopiaMark size={96} />           navy badge (app-icon style)
 * <HabitopiaMark size={96} badge={false} />  sprout only, for coloured backgrounds
 */
export function HabitopiaMark({ size = 96, badge = true }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 140 140" accessibilityRole="image" accessibilityLabel="Habitopia">
      {badge ? <Rect x="0" y="0" width="140" height="140" rx="36" fill="#042C53" /> : null}
      <Path d="M70 126 L70 60" stroke="#FAC775" strokeWidth="5" strokeLinecap="round" fill="none" />
      <Path d="M30 130 Q70 112 110 130" stroke="#FAC775" strokeWidth="5" strokeLinecap="round" fill="none" />
      {LEAVES.map((l, i) => (
        <G key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(0.85)`}>
          <Path d={LEAF} fill={l.c} />
        </G>
      ))}
    </Svg>
  );
}

export default HabitopiaMark;
