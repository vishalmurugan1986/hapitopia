# Sprout Play — Habitopia Design System

A child-first UI system for Habitopia (ages 7–14, Class 2–8). Everything visual
comes from this folder: tokens, the two themes, fonts, and the shared components.

```js
import { AppText, Button, Card, Chip, ProgressBar, IconBubble, CheckBubble,
         SectionHeader, StatBadge, EmptyState, PressableScale,
         HabiBuddy, DimensionIcon, HabitopiaMark,
         space, radius, typeScale, useTheme } from '../design';
```

## Principles

| # | Principle | How it is enforced |
|---|-----------|--------------------|
| 1 | **Readable first** – body ≥ 14pt, captions ≥ 12pt | `typeScale`, `MIN_FONT_SIZE`, `createStyles` floor |
| 2 | **Big, forgiving targets** – ≥ 48dp | `touch.minTarget`, `Button`, `CheckBubble`, `Chip` hit-slop |
| 3 | **Friendly shapes** – generous radii, chunky "candy" depth | `radius`, `depth.ledge`, `Card variant="raised"` |
| 4 | **Colour carries meaning** – one hue per growth dimension | `T.dimColors` / `T.dimTints` / `T.dimFills`, `DimensionIcon` (also `dimKey` on `IconBubble` and `Chip`) |
| 5 | **Calm canvas, joyful accents** | warm paper / starry-indigo backgrounds, saturated colour only for progress & rewards |
| 6 | **Tactile feedback everywhere** | `PressableScale` (spring squish + haptic) is the base of every tappable |

## Tokens (`tokens.js`)

- **Spacing** – 4pt grid: `xxs 2 · xs 4 · sm 8 · md 12 · lg 16 · xl 20 · xxl 24 · xxxl 32 · huge 40`
- **Radius** – `xs 6 · sm 10 · md 14 · lg 18 · xl 24 · xxl 32 · pill`
- **Type** – Fredoka (rounded display: titles, numbers, buttons) + Nunito (body).
  Weight is carried by the font family, never `fontWeight`, so iOS/Android/web match.

  | variant | face | size/line |
  |---|---|---|
  | `hero` | Fredoka Bold | 34/40 |
  | `display` | Fredoka Bold | 28/34 |
  | `title` | Fredoka SemiBold | 22/28 |
  | `heading` | Fredoka SemiBold | 19/25 |
  | `subheading` | Nunito ExtraBold | 16/22 |
  | `body` / `bodyStrong` | Nunito SemiBold / Bold | 15/22 |
  | `bodySm` | Nunito SemiBold | 14/20 |
  | `label` | Nunito ExtraBold | 13/18 |
  | `caption` | Nunito Bold | 12/16 |
  | `number` | Fredoka Bold | 20/24 |
  | `button` | Fredoka SemiBold | 17/22 |

- **Motion** – `motion.spring` for presses, `motion.springBouncy` for celebrations.

## Themes (`themes.js`)

| Token | Sunny Meadow (day) | Starry Night (night) | Use |
|---|---|---|---|
| `bg` | warm cream | deep indigo | screen canvas |
| `card` / `cardElevated` | white / paper | indigo 700/600 | surfaces |
| `surfaceLowest` | cream 200 | night 950 | wells, tracks, inset chips |
| `ledge` | sand | night 950 | solid depth under raised cards |
| `tx` / `mu` / `dim` | plum ink 900/700/500 | moon 50/200/400 | text hierarchy |
| `primary` (mint) | text-safe accent | pastel accent | growth, completion |
| `secondary` (sun) | amber | gold | XP, streaks, rewards |
| `tertiary` (sky) | blue | light blue | learning, info |
| `*Fill` / `*Ledge` / `on*` | — | — | solid buttons: fill, ledge, text on top |
| `dimColors.{Q,P,M,I,E,F}` | | | dimension hue (text-safe) |

Rules:
- All colours are 6-digit hex so `T.primary + '20'` alpha tints keep working.
- Text on a solid accent uses `T.on` / `T.onPrimary` / `T.onSecondary` — never hard-code `#FFFFFF`
  (white on night-mode pastels is unreadable).
- Read the theme with the `T` prop (legacy screens) or `useTheme()` (components).

## Components (`components/`)

| Component | Purpose |
|---|---|
| `AppText` | Text bound to `typeScale`; `variant`, `tone` (`muted`, `primary`…), `color` |
| `PressableScale` | Base tappable: spring squish + haptic. `containerStyle` for layout (e.g. `flex: 1`) |
| `Button` | Chunky candy button. `variant` primary/secondary/tertiary/outline/ghost/danger; `size` sm/md/lg |
| `Card` | `raised` (default, ledge) · `flat` · `tinted` (`tint` hue) · `inset`; `onPress` optional |
| `Chip` | Filters/tags; `selected`, `color`, `icon`, `size="sm"` |
| `ProgressBar` | Animated thick track, `value` 0–1 |
| `IconBubble` | Squircle icon holder; `solid` for completed/celebration |
| `CheckBubble` | 48dp completion toggle with bouncy check |
| `SectionHeader` | Screen-section title with icon and right slot |
| `StatBadge` | Header capsules (streak, points) |
| `EmptyState` | Friendly zero state |
| `Keypad` / `PinDots` | Chunky number pad and PIN bubbles (shared by PIN create + login) |
| `TextField` | Labelled input with `valid` / `invalid` state |
| `OptionTile` | Selectable grid tile with check badge (age, avatar pickers) |
| `CheckRow` | Large consent checkbox row |
| `Banner` | Inline success / error / info message |
| `StepIndicator` | "Step 1 of 3" segmented progress |

## Migrating legacy screens

Large legacy screens use `createStyles` (drop-in for `StyleSheet.create`). It maps
`fontWeight` → design font family, snaps font sizes to the ramp with a 12pt floor,
scales line heights, snaps radii to the scale and lifts near-48 touch targets.

When a screen is next touched, prefer replacing hand-rolled pills, cards and rails
with the components above (see `screens/TodayScreen.js`, `screens/OnboardingScreen.js`, `components/Header.js`,
`components/Navbar.js` for fully migrated examples). Do not add new hard-coded
hex colours, font sizes or radii outside this folder.
