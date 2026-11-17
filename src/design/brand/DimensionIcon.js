import React from 'react';
import Svg, { Path, Circle, Ellipse, Rect, G, Line } from 'react-native-svg';

/**
 * Habitopia's own icon set for the growth dimensions (24×24 grid). Each icon
 * is a concrete object a child already knows, so the dimension reads without
 * words:
 *   Q  Power Habits        → lightning bolt in a sunburst (switch on!)
 *   P  Physically Healthy  → running sneaker
 *   M  Mentally Strong     → mountain with a summit flag
 *   I  Intellectually Sharp→ open book with a spark of an idea
 *   E  Emotionally Balanced→ smiling heart
 *   F  Financially Wealthy → piggy bank with a coin
 *
 * `color` fills the shape; `accent` draws the small details (defaults to white,
 * pass the bubble/background colour when the icon sits on a solid fill).
 */
const ICONS = {
  Q: (c, a) => (
    <G>
      {Array.from({ length: 8 }).map((_, i) => {
        const ang = (i / 8) * Math.PI * 2;
        return (
          <Line
            key={i}
            x1={12 + 9.4 * Math.cos(ang)}
            y1={12 + 9.4 * Math.sin(ang)}
            x2={12 + 11.4 * Math.cos(ang)}
            y2={12 + 11.4 * Math.sin(ang)}
            stroke={c}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <Circle cx="12" cy="12" r="7.6" fill={c} />
      <Path d="M13 6.2 L8.6 12.8 H11.6 L10.9 17.8 L15.4 11 H12.4 Z" fill={a} />
    </G>
  ),
  P: (c, a) => (
    <G>
      <Path
        d="M2 15.6 C2 14.2 3 13.2 4.4 13.1 L7.7 12.8 L10.2 8.2 C10.7 7.3 11.9 7.1 12.7 7.7 L14.3 9 C15.3 9.8 16.6 10.3 17.9 10.5 L19.8 10.8 C21.1 11 22 12 22 13.3 V15.6 Z"
        fill={c}
      />
      <Rect x="2" y="16.4" width="20" height="3" rx="1.5" fill={c} opacity="0.6" />
      <Path d="M10.8 10.6 L12.4 11.6 M9.8 12.4 L11.4 13.4" stroke={a} strokeWidth="1.3" strokeLinecap="round" />
      <Path d="M1 8 H5 M0.5 10.6 H3.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </G>
  ),
  M: (c, a) => (
    <G>
      <Path d="M1.5 21 L9.5 8.2 L13.2 13.6 L15.8 10 L22.5 21 Z" fill={c} />
      <Path d="M9.5 8.2 L12 12.2 L10.6 11.6 L9.2 12.8 L7.6 11.7 Z" fill={a} />
      <Path d="M9.5 8.2 V2.6" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      <Path d="M9.5 2.6 L14.4 4.2 L9.5 5.8 Z" fill={c} />
    </G>
  ),
  I: (c, a) => (
    <G>
      <Path d="M2.5 8.2 C5.6 7.2 8.9 7.6 12 9.8 C15.1 7.6 18.4 7.2 21.5 8.2 V20 C18.4 19 15.1 19.4 12 21.6 C8.9 19.4 5.6 19 2.5 20 Z" fill={c} />
      <Path d="M12 9.8 V21.6" stroke={a} strokeWidth="1.4" />
      <Path d="M5 11.4 C6.8 11.1 8.4 11.5 9.8 12.4 M5 14.4 C6.8 14.1 8.4 14.5 9.8 15.4 M14.2 12.4 C15.6 11.5 17.2 11.1 19 11.4" stroke={a} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.85" />
      <Path d="M12 0.8 L12.9 3.3 L15.4 4.2 L12.9 5.1 L12 7.6 L11.1 5.1 L8.6 4.2 L11.1 3.3 Z" fill={c} />
    </G>
  ),
  E: (c, a) => (
    <G>
      <Path
        d="M12 21.2 C12 21.2 2.6 15.6 2.6 9.4 C2.6 6.3 5 4.2 7.8 4.2 C9.7 4.2 11.2 5.2 12 6.6 C12.8 5.2 14.3 4.2 16.2 4.2 C19 4.2 21.4 6.3 21.4 9.4 C21.4 15.6 12 21.2 12 21.2 Z"
        fill={c}
      />
      <Circle cx="9.2" cy="10.4" r="1.2" fill={a} />
      <Circle cx="14.8" cy="10.4" r="1.2" fill={a} />
      <Path d="M9.2 13.2 Q12 15.8 14.8 13.2" stroke={a} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </G>
  ),
  F: (c, a) => (
    <G>
      <Circle cx="13" cy="4" r="2.8" fill={c} />
      <Path d="M13 2.7 V5.3" stroke={a} strokeWidth="1.1" strokeLinecap="round" />
      <Ellipse cx="11.5" cy="14" rx="8.3" ry="6.2" fill={c} />
      <Path d="M7.6 9 L9 5.8 L11.4 8.4 Z" fill={c} />
      <Ellipse cx="20.2" cy="13.6" rx="2.2" ry="2.1" fill={c} />
      <Circle cx="19.7" cy="13.2" r="0.55" fill={a} />
      <Circle cx="20.9" cy="13.2" r="0.55" fill={a} />
      <Rect x="6.2" y="18.6" width="2.6" height="3.4" rx="1" fill={c} />
      <Rect x="13.6" y="18.6" width="2.6" height="3.4" rx="1" fill={c} />
      <Path d="M9.6 10.4 H13.4" stroke={a} strokeWidth="1.4" strokeLinecap="round" />
      <Circle cx="15.6" cy="12.2" r="0.9" fill={a} />
      <Path d="M3.4 13 C2 12.6 1.6 11.2 2.6 10.6" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </G>
  )
};

export default function DimensionIcon({ dimKey, size = 24, color = '#26214A', accent = '#FFFFFF' }) {
  const draw = ICONS[dimKey];
  if (!draw) return null;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {draw(color, accent)}
    </Svg>
  );
}
