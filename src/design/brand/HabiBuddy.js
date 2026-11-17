import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect, G } from 'react-native-svg';
import { getAvatarMeta, resolveAvatarId } from '../../data';

/**
 * "Habi Pals" – Habitopia's original avatar characters. Each pal is a
 * different animal with its own silhouette, colour and signature prop, so a
 * child can spot theirs instantly – important because the avatar is also the
 * PIN-recovery key. Avatar ids are unchanged, so saved players keep theirs.
 *
 *   Guardian  → Bruno the Bear (shield badge)
 *   Scholar   → Ollie the Owl (graduation cap)
 *   Explorer  → Fennec the Fox (explorer scarf)
 *   Thinker   → Miko the Cat (round glasses)
 *   Pioneer   → Zip the Bunny (flight goggles)
 *   Champion  → Leo the Lion Cub (gold medal)
 *   Sprout    → Pip the Seedling (leaf hair)
 *   Leader    → Ella the Elephant (star crown)
 */

const INK = '#26214A';
const CREAM = '#FFF6E9';
const BLUSH = '#FF94B8';

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  const r = c((n >> 16) & 255);
  const g = c((n >> 8) & 255);
  const b = c(n & 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Shared friendly face: big sparkly eyes, rosy cheeks, smile.
function Face({ y = 52, gap = 13, eye = 6.5, smileY, cheeks = true, smile = true }) {
  const sy = smileY ?? y + 13;
  return (
    <G>
      <Ellipse cx={50 - gap} cy={y} rx={eye} ry={eye * 1.12} fill="#FFFFFF" />
      <Ellipse cx={50 + gap} cy={y} rx={eye} ry={eye * 1.12} fill="#FFFFFF" />
      <Circle cx={50 - gap + 1} cy={y + 1.2} r={eye * 0.58} fill={INK} />
      <Circle cx={50 + gap + 1} cy={y + 1.2} r={eye * 0.58} fill={INK} />
      <Circle cx={50 - gap + 2.4} cy={y - 0.8} r={eye * 0.22} fill="#FFFFFF" />
      <Circle cx={50 + gap + 2.4} cy={y - 0.8} r={eye * 0.22} fill="#FFFFFF" />
      {cheeks ? (
        <G>
          <Ellipse cx={50 - gap - 7} cy={y + 10} rx="5" ry="3" fill={BLUSH} opacity="0.85" />
          <Ellipse cx={50 + gap + 7} cy={y + 10} rx="5" ry="3" fill={BLUSH} opacity="0.85" />
        </G>
      ) : null}
      {smile ? (
        <Path d={`M45 ${sy} Q50 ${sy + 5} 55 ${sy}`} stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      ) : null}
    </G>
  );
}

const PALS = {
  // Bruno the Bear – Guardian
  'shield-checkmark': (c) => (
    <G>
      <Circle cx="24" cy="26" r="12" fill={c} />
      <Circle cx="76" cy="26" r="12" fill={c} />
      <Circle cx="24" cy="26" r="6" fill={shade(c, 60)} />
      <Circle cx="76" cy="26" r="6" fill={shade(c, 60)} />
      <Circle cx="50" cy="56" r="36" fill={c} />
      <Ellipse cx="50" cy="70" rx="15" ry="11" fill={shade(c, 75)} />
      <Ellipse cx="50" cy="64" rx="5.5" ry="4" fill={INK} />
      <Face y={50} smileY={70} cheeks={false} />
      <Ellipse cx="22" cy="62" rx="5" ry="3" fill={BLUSH} opacity="0.8" />
      <Ellipse cx="78" cy="62" rx="5" ry="3" fill={BLUSH} opacity="0.8" />
      <Path d="M50 84 L59 87 L59 93 Q59 99 50 101 Q41 99 41 93 L41 87 Z" fill="#FFD45E" stroke="#B26B00" strokeWidth="2" />
      <Path d="M46 93 L49 96 L54 90" stroke="#B26B00" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </G>
  ),

  // Ollie the Owl – Scholar
  school: (c) => (
    <G>
      <Path d="M18 34 L22 12 L36 26 Z" fill={shade(c, -35)} />
      <Path d="M82 34 L78 12 L64 26 Z" fill={shade(c, -35)} />
      <Ellipse cx="50" cy="58" rx="36" ry="38" fill={c} />
      <Ellipse cx="50" cy="74" rx="20" ry="18" fill={shade(c, 70)} />
      <Path d="M40 76 Q44 79 48 76 M52 76 Q56 79 60 76 M44 84 Q48 87 52 84" stroke={shade(c, 20)} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Circle cx="36" cy="50" r="13" fill={CREAM} />
      <Circle cx="64" cy="50" r="13" fill={CREAM} />
      <Circle cx="37" cy="51" r="6.5" fill={INK} />
      <Circle cx="65" cy="51" r="6.5" fill={INK} />
      <Circle cx="39" cy="48.5" r="2.2" fill="#FFFFFF" />
      <Circle cx="67" cy="48.5" r="2.2" fill="#FFFFFF" />
      <Path d="M45 60 L55 60 L50 68 Z" fill="#FFB915" />
      {/* graduation cap */}
      <Path d="M50 4 L82 15 L50 26 L18 15 Z" fill={INK} />
      <Rect x="35" y="19" width="30" height="9" rx="3" fill={INK} />
      <Path d="M79 16 L79 30" stroke="#FFD45E" strokeWidth="2.5" strokeLinecap="round" />
      <Circle cx="79" cy="32" r="3.5" fill="#FFD45E" />
    </G>
  ),

  // Fennec the Fox – Explorer
  compass: (c) => (
    <G>
      <Path d="M14 14 L40 30 L22 48 Z" fill={c} />
      <Path d="M86 14 L60 30 L78 48 Z" fill={c} />
      <Path d="M20 22 L34 32 L25 41 Z" fill={INK} opacity="0.75" />
      <Path d="M80 22 L66 32 L75 41 Z" fill={INK} opacity="0.75" />
      <Path d="M50 92 C30 92 14 74 14 54 C14 38 30 28 50 28 C70 28 86 38 86 54 C86 74 70 92 50 92 Z" fill={c} />
      <Path d="M50 92 C36 92 22 80 18 64 C30 62 42 68 50 76 C58 68 70 62 82 64 C78 80 64 92 50 92 Z" fill={CREAM} />
      <Ellipse cx="50" cy="74" rx="5" ry="3.6" fill={INK} />
      <Face y={54} gap={14} smileY={79} cheeks={false} />
      {/* explorer scarf */}
      <Path d="M24 92 Q50 100 76 92 L76 98 Q50 106 24 98 Z" fill="#2F8CFF" />
      <Path d="M66 97 L74 108 L64 106 Z" fill="#2F8CFF" />
    </G>
  ),

  // Miko the Cat – Thinker
  bulb: (c) => (
    <G>
      <Path d="M18 40 L22 10 L44 28 Z" fill={c} />
      <Path d="M82 40 L78 10 L56 28 Z" fill={c} />
      <Path d="M23 30 L25 18 L35 27 Z" fill={BLUSH} />
      <Path d="M77 30 L75 18 L65 27 Z" fill={BLUSH} />
      <Ellipse cx="50" cy="58" rx="37" ry="34" fill={c} />
      <Path d="M44 30 L46 40 M50 28 L50 39 M56 30 L54 40" stroke={shade(c, -40)} strokeWidth="3" strokeLinecap="round" />
      <Face y={54} gap={14} smileY={70} />
      <Path d="M48 64 L52 64 L50 67 Z" fill={BLUSH} />
      {/* thinking glasses */}
      <Circle cx="36" cy="54" r="10" fill="none" stroke={INK} strokeWidth="3" />
      <Circle cx="64" cy="54" r="10" fill="none" stroke={INK} strokeWidth="3" />
      <Path d="M46 54 L54 54" stroke={INK} strokeWidth="3" />
      {/* whiskers */}
      <Path d="M8 62 L24 64 M8 70 L24 68 M92 62 L76 64 M92 70 L76 68" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </G>
  ),

  // Zip the Bunny – Pioneer
  rocket: (c) => (
    <G>
      <Ellipse cx="35" cy="20" rx="9" ry="24" fill={c} transform="rotate(-10 35 20)" />
      <Ellipse cx="65" cy="20" rx="9" ry="24" fill={c} transform="rotate(10 65 20)" />
      <Ellipse cx="35" cy="22" rx="4.5" ry="17" fill={BLUSH} transform="rotate(-10 35 22)" />
      <Ellipse cx="65" cy="22" rx="4.5" ry="17" fill={BLUSH} transform="rotate(10 65 22)" />
      <Circle cx="50" cy="62" r="33" fill={c} />
      <Face y={62} gap={13} smileY={77} />
      <Path d="M47 72 L53 72 L50 75 Z" fill={BLUSH} />
      <Rect x="46.5" y="80" width="3" height="5" rx="1" fill="#FFFFFF" />
      <Rect x="50.5" y="80" width="3" height="5" rx="1" fill="#FFFFFF" />
      {/* flight goggles on forehead */}
      <Path d="M18 44 Q50 34 82 44" stroke="#7A4800" strokeWidth="5" fill="none" />
      <Circle cx="39" cy="41" r="8.5" fill="#7CC0FF" stroke="#7A4800" strokeWidth="3.5" />
      <Circle cx="61" cy="41" r="8.5" fill="#7CC0FF" stroke="#7A4800" strokeWidth="3.5" />
      <Circle cx="36" cy="38" r="2.4" fill="#FFFFFF" />
      <Circle cx="58" cy="38" r="2.4" fill="#FFFFFF" />
    </G>
  ),

  // Leo the Lion Cub – Champion
  trophy: (c) => (
    <G>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <Circle key={i} cx={50 + 33 * Math.cos(a)} cy={54 + 33 * Math.sin(a)} r="12" fill={shade(c, -45)} />;
      })}
      <Circle cx="50" cy="54" r="34" fill={shade(c, -45)} />
      <Circle cx="30" cy="30" r="8" fill={c} />
      <Circle cx="70" cy="30" r="8" fill={c} />
      <Circle cx="50" cy="56" r="27" fill={c} />
      <Ellipse cx="50" cy="66" rx="11" ry="8" fill={shade(c, 70)} />
      <Path d="M45 61 L55 61 L50 66 Z" fill={INK} />
      <Face y={50} gap={11} eye={5.5} smileY={68} cheeks={false} />
      {/* gold medal */}
      <Path d="M43 84 L47 94 M57 84 L53 94" stroke="#2F8CFF" strokeWidth="4" />
      <Circle cx="50" cy="98" r="7" fill="#FFD45E" stroke="#B26B00" strokeWidth="2" />
    </G>
  ),

  // Pip the Seedling – Sprout
  leaf: (c) => (
    <G>
      <Path d="M50 30 L50 16" stroke={shade(c, -60)} strokeWidth="3.5" strokeLinecap="round" />
      <Path d="M50 18 C38 2 18 6 16 18 C28 28 44 26 50 18 Z" fill="#7BD94F" stroke={shade(c, -60)} strokeWidth="2" />
      <Path d="M50 18 C62 2 82 6 84 18 C72 28 56 26 50 18 Z" fill="#5FE3B0" stroke={shade(c, -60)} strokeWidth="2" />
      <Path d="M28 16 Q36 18 44 20 M72 16 Q64 18 56 20" stroke={shade(c, -60)} strokeWidth="1.5" fill="none" opacity="0.6" />
      <Path d="M50 30 C74 30 86 48 86 64 C86 82 70 94 50 94 C30 94 14 82 14 64 C14 48 26 30 50 30 Z" fill={c} />
      <Ellipse cx="38" cy="42" rx="12" ry="6" fill="#FFFFFF" opacity="0.25" />
      <Face y={60} gap={13} smileY={74} />
    </G>
  ),

  // Ella the Elephant – Leader
  diamond: (c) => (
    <G>
      <Ellipse cx="18" cy="52" rx="16" ry="24" fill={shade(c, -20)} />
      <Ellipse cx="82" cy="52" rx="16" ry="24" fill={shade(c, -20)} />
      <Ellipse cx="18" cy="52" rx="9" ry="15" fill={CREAM} opacity="0.7" />
      <Ellipse cx="82" cy="52" rx="9" ry="15" fill={CREAM} opacity="0.7" />
      <Circle cx="50" cy="52" r="30" fill={c} />
      <Path d="M44 62 C44 80 40 90 50 96 C56 99 62 94 58 90 C54 86 56 76 56 62 Z" fill={c} />
      <Path d="M47 72 Q51 73 55 72 M47 80 Q51 81 55 80" stroke={shade(c, -35)} strokeWidth="1.8" fill="none" />
      <Face y={48} gap={12} eye={5.5} smile={false} />
      {/* star crown */}
      <Path
        d="M50 6 L55 17 L67 18 L58 26 L61 38 L50 32 L39 38 L42 26 L33 18 L45 17 Z"
        fill="#FFD45E"
        stroke="#B26B00"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </G>
  )
};

export default function HabiBuddy({ avatar, size = 56 }) {
  const meta = getAvatarMeta(avatar);
  const id = resolveAvatarId(avatar);
  const draw = PALS[id] || PALS.leaf;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 110" accessibilityRole="image" accessibilityLabel={meta.label}>
      {draw(meta.color)}
    </Svg>
  );
}
