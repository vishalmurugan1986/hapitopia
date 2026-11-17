<p align="left">
  <img src="assets/habitopia_sprout_app_icon.png" alt="Habitopia" width="112" />
</p>

# Habitopia: Build a Future-Proof Child

A gamified habit-building app for children aged 7 to 14 (Classes 2 to 8), built with Expo / React Native for Android and iOS. Children grow five dimensions of life (Physical, Mental, Intellectual, Emotional, Financial) through daily missions, proof of practice, XP, quests and real-world experience rewards. Developed for Achariya World Class Education.

The repository also hosts the school's web portals (GitHub Pages, `docs/`).

| Portal | URL |
| :--- | :--- |
| School Management Portal | https://vishalmurugan1986.github.io/hapitopia/management.html |
| Product Landing Showcase | https://vishalmurugan1986.github.io/hapitopia/index.html |
| Child Privacy Policy | https://vishalmurugan1986.github.io/hapitopia/privacy.html |
| Support & FAQ | https://vishalmurugan1986.github.io/hapitopia/support.html |

---

## Contents

- [Curricula](#curricula)
- [Curriculum Resources & Framework Modules](#curriculum-resources--framework-modules)
- [Game System](#game-system)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Building & Releasing](#building--releasing)
- [Web Portals](#web-portals)
- [Privacy & Security](#privacy--security)

---

## Curricula

A school gives each cohort a confidential 4-digit batch code. The child enters it once during onboarding, which assigns one of two independent curricula. Codes are kept in `src/data/baseData.js` (`BATCH_CODES`) and are not published in documentation.

### BAT01: 5×7 Habit Game (35 habits, age-tiered)

Source: *5×7 Habit Game Framework* and *Habit message* documents.

| Dimension | Motto | Habits |
| :--- | :--- | :--- |
| Physically Healthy | Body = First Classroom | Move 30 Every Day · Water First Rule · Sleep Like a Champion · Rainbow Plate · Posture Police · Breathe Reset · Sport a Quarter |
| Mentally Strong | Mind > Mood | Win the Morning · No-Excuse Minute · Fail Fast Log · Focus Sprint 15 · Self-Talk Filter · Gratitude 3 · Digital Boundaries |
| Intellectually Sharp | Brain on Beast Mode | Read 10 Pages · Question Storm · Memory Play · Teach to Learn · Math in Life · Create Not Consume · Weekly Deep Dive |
| Emotionally Balanced | Heart with IQ | Name the Feeling · Kind Act Daily · Pause Button · Friendship Rule · Journal One Line · Sorry Fast, Forgive Faster · Family Connect |
| Financially Wealthy | Money Smart Early | 3-Jar System · Earn a Rupee · Need vs Want · Price Detective · Goal Piggy · Delay Reward · Value Creation |

Daily missions grow with age:

| Level | Ages | Daily missions |
| :--- | :--- | :--- |
| Starter | 7 to 9 | 1 habit per dimension (5), adult guided |
| Builder | 10 to 11 | 3 habits per dimension (15) |
| Master | 12 to 14 | All 7 per dimension (35), self-managed |

Suggested daily rhythm: Morning = Physical + Mental, School hours = Intellectual, Evening = Emotional + Financial, Sunday = family review.

### BAT02: 25-Week Progressive Curriculum (30 habits)

Source: `BAT02_Context` and `BAT02_Architecture` documents.

- **5 Q Power Habits** (Activation Workshop), practised every day from Week 1: Eye Ball Exercise · Speed Reading Card · Concentration Music · Blind Fold Practice · Power Affirmations (Habit Book).
- **25 growth habits**, one added each week in the order Physical → Mental → Intellectual → Emotional → Financial. Week 1 has 6 active habits; Week 25 has all 30.

| Week | Physical | Week | Mental | Week | Intellectual | Week | Emotional | Week | Financial |
| :-: | :-- | :-: | :-- | :-: | :-- | :-: | :-- | :-: | :-- |
| 1 | Sunlight & Warm Up | 2 | Visualize Your Future Self | 3 | 5 Random Brain Gym Exercises | 4 | Active Appreciation | 5 | Goal Piggy |
| 6 | Stay hydrated after brushing | 7 | Digital Boundaries | 8 | Curiosity Questioning | 9 | Daily Kind Act | 10 | Price Detective |
| 11 | Super brain yoga (21 max) | 12 | Journaling Small Goals & Gratitude | 13 | Memory Play (Peg Words) | 14 | Family connect at dinner | 15 | Need vs Want |
| 16 | Fresh fruits and vegetables | 17 | My Warrier Journey | 18 | Brain teasers | 19 | Sorry fast, Forgive faster | 20 | 3 Jar Allocation (50/40/10) |
| 21 | Dinner by 7 PM, Sleep by 10 PM | 22 | Clean workplace rituals | 23 | Memory Recall Exercise | 24 | Pause button (S-R-R) | 25 | Learning Money Concept |

The full names, mottos and weekly order live in `src/data/bat02Data.js` and are checked by `npm run test:bat02`.

### Habit chapters

Every habit (35 + 30) has a chapter in English and Tamil, opened by tapping the habit: name and tagline, why it matters, real-life story, daily practice, weekly challenge, monthly mission, child reflection questions, parent and teacher discussion questions, and a 4-level rubric (Beginner, Developing, Proficient, Master). Data: `src/data/habitChapters.js` (BAT01) and `BAT02_HABIT_CHAPTERS` in `src/data/bat02Data.js`.

---

## Curriculum Resources & Framework Modules

**Me tab → Curriculum Resources & Framework Modules.** Both curricula get all five modules.

| Module | BAT01 | BAT02 |
| :--- | :--- | :--- |
| Curriculum documents | 8-Book Publishing Series, one book per age 7 to 14 (`CurriculumBookModal`) | BAT02 Curriculum Docs: 25-week roadmap with the child's current week, Q Power workshop, 5 dimensions (`Bat02CurriculumModal`) |
| Printables (A4) | Habit card, wall poster, 8-week challenge calendar, parent handbook (`ClassroomPrintablesModal`) | Bilingual 30-habit card (`Bat02CurriculumModal`, Habit Card tab) |
| School Verification & Habit Audit | Proof audit trail, pacing analysis, export code for the school portal (`SchoolAuditModal`) | Same |
| Parent & Teacher Guides | Home support, reinforcement, family review, classroom routine, assessment (`GuidesModal`) | Same |
| Hero Journey & Age Psychology | Welcome letter, hero journey, growth mindset, age 7 to 14 development profiles (`AgeProfileModal`) | Same |

---

## Game System

| Feature | Rule |
| :--- | :--- |
| XP | +10 per completed habit; +20 Clean Sweep bonus when every mission of the day is done |
| Levels | Level = floor(total XP / 100) + 1 |
| Streak | Consecutive days with at least 60% of missions done |
| Weekly score | Scaled to 350. Gold 300+, Silver 240+, Bronze 180+ |
| Weekly quests | Practise a dimension's quest habit on 5 days → +30 XP |
| Weekly boss | Unlocks at Silver (240+) → +100 XP |
| Rewards | Experiences, not toys: park outing, library trip, sport gear, a new course (unlocked by medal tier) |
| Proof | Photo, voice note or video before points are claimed; rapid taps or missing proof are flagged "Needs Review" |
| 30-Day Capstone | A day counts at 60%+; 18 good days to graduate (+500 XP); checkpoints on days 7, 14, 21, 28 |
| Future-Proof Child Index | 30-day consistency per dimension with the 4-level rubric |

Other screens: Week planner with daily log (mood, priorities, gratitude, reading, movement) and a Growth tab with dimension report cards and a monthly review. Multiple children can share one device; each profile has its own 4-digit PIN, and a forgotten PIN is recovered by picking the child's avatar.

The app is fully bilingual (English and தமிழ்); language and sound are switched in the Me tab.

---

## Design System

The UI uses **Sprout Play**, a child-first design system in `src/design/` (full guide: [`src/design/README.md`](src/design/README.md)).

- **Brand:** the official Habitopia sprout mark (`HabitopiaMark`) and an animated welcome hero.
- **Avatars, the "Habi Pals"** (`HabiBuddy`): 8 original animal characters, each with its own colour and prop: Bruno the Bear (Guardian), Ollie the Owl (Scholar), Fennec the Fox (Explorer), Miko the Cat (Thinker), Zip the Bunny (Pioneer), Leo the Lion Cub (Champion), Pip the Seedling (Sprout) and Ella the Elephant (Leader). Distinct shapes help children recognise theirs, which matters because the avatar is also the PIN-recovery key.
- **Dimension icons** (`DimensionIcon`): a custom set used on every screen: Q Power = lightning sunburst, Physical = sneaker, Mental = mountain with a flag, Intellectual = open book with a spark, Emotional = smiling heart, Financial = piggy bank.
- **Themes:** "Sunny Meadow" (day) and "Starry Night" (night), with one colour per growth dimension.
- **Type:** Fredoka for headings and Nunito for body text. Text is never smaller than 12pt and every touch target is at least 48dp.
- **Components:** Button, Card, Chip, ProgressBar, CheckBubble, Keypad, TextField, OptionTile and more.
- **Platform rules:** one safe-area rule for every screen (`screenInsets`), and the same text alignment on Android and iOS.

New UI should be built from these components and tokens rather than hard-coded colours, sizes or fonts.

---

## Project Structure

```
habit-game-app/
├── App.js                    # Root: fonts, theme provider, storage, navigation shell
├── app.json                  # Expo config (bundle id com.achariya.habitopia)
├── assets/                   # App icon, logos, sounds
├── docs/                     # GitHub Pages web portals
├── scratch/                  # Automated verification suites (npm test)
└── src/
    ├── design/               # Sprout Play design system (tokens, themes, components, brand)
    ├── components/           # Header, Navbar
    ├── screens/              # Today, Week, Quests, Growth (ReportCards), Me, Onboarding + modals
    ├── data/                 # Curricula, habit chapters, books, psychology profiles
    ├── i18n/translations.js  # English and Tamil strings
    ├── logic.js              # XP, levels, streaks, scoring, BAT02 weeks, audit export
    ├── haptics.js            # Haptics and sound effects
    └── theme.js              # Back-compat re-export of the design themes
```

---

## Getting Started

Requirements: Node.js 20+ and the Expo Go app on a phone, or an Android emulator / iOS simulator.

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). Press `a` for an Android emulator or `i` for an iOS simulator (macOS only).

State is stored on the device under the AsyncStorage key `habitgame_v1` (profiles, completions, evidence, logs and settings).

---

## Testing

```bash
npm test                 # all four suites
npm run test:bat02       # BAT02: 30 habits, 25-week order, Q Power, translations, batch isolation
npm run test:framework   # BAT01 chapters, rubrics, profiles, books, scoring
npm run test:ui          # profiles, PINs, Clean Sweep, boss, themes
npm run test:playthrough # end-to-end playthrough from onboarding to graduation
```

To check that both platforms compile:

```bash
npx expo export --platform android
npx expo export --platform ios
```

---

## Building & Releasing

`expo export` only bundles the JavaScript. Store builds (`.aab` for Google Play, `.ipa` for the App Store) are made with EAS Build, which needs an Expo account and an EAS project:

```bash
npx eas-cli init
npx eas-cli build --platform android
npx eas-cli build --platform ios
```

---

## Web Portals

`docs/` is served by GitHub Pages from the `main` branch (Settings → Pages → Deploy from a branch → `main` / `docs`). Pushing to `main` publishes changes.

- `management.html`: school dashboard. Teachers import a student's audit code to see participation, completion, proof and "needs review" flags, inspect proof, and export CSV or print reports.

### How the app syncs with the portal

1. In the app the child opens **Me → School Verification & Habit Audit → Share audit code** and sends it to the teacher (WhatsApp, email, etc.).
2. The teacher opens the portal, clicks **Import**, and pastes the whole message.
3. The portal saves imported students **in that browser** (key `habitopia_portal_students_v1`), so they survive reloads. Students are matched by their unique app profile id, so two children with the same name stay separate. Importing a newer code for the same child replaces the older one.
4. Teacher decisions (Confirm Verified, Reset Dishonest Marks) are saved with the student. **Remove Student** deletes a wrong import.
5. Until the first real student is imported for a batch, the portal shows clearly labelled **sample** students.

An audit code is a snapshot of one day. It contains no batch code and no media files: photos, voice notes and videos stay on the child's phone for privacy, and the portal asks the teacher to view them with the child.
- `index.html`: product showcase.
- `privacy.html`: child privacy policy.
- `support.html`: FAQ for students and parents.

The portals use the same Sprout Play theme as the app, with automatic dark mode.

---

## Privacy & Security

- All child data stays on the device (AsyncStorage). There is no cloud sync, no analytics and no ads.
- A parent or guardian must give consent before a player is created.
- Each profile is protected by a 4-digit PIN.
- Designed to follow India's DPDP Act 2023 and COPPA (see `docs/privacy.html`).
- Never commit tokens or credentials. The git remote should not contain a personal access token.

---

Developed for **Achariya World Class Education** · For children aged 7 to 14 (Classes 2 to 8)
