# Habitopia - Build a future-proof child

A full-stack gamified mobile habit app built with Expo (React Native) designed to empower children aged 7-14 with lifelong physical, mental, emotional, social, and spiritual habits.

---

## 📱 Supported Platforms

1. **Android & iOS (Mobile App)**: Native mobile app built with Expo SDK 54, React Native 0.79, and React 19, compiling directly to high-performance Hermes bytecode for production app stores.
2. **Web Showcase & Hosting Portal (`/docs`)**: Free static landing page, store privacy policy, and support portal ready to be deployed instantly on GitHub Pages or any static host for App Store & Google Play Store compliance.

---

## 📚 Complete Framework Architecture & Coverage

| Framework Section | Status | Implementation in Codebase |
| :--- | :---: | :--- |
| **Section 1: Book Introduction & Hero Journey** | ✅ Complete | [`src/data/psychologyProfiles.js`](file:///c:/ACHARIYA/habit-game-app/src/data/psychologyProfiles.js) & [`src/screens/AgeProfileModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/AgeProfileModal.js). Contains Welcome letter, Hero journey story, Growth mindset explanation, and "Why habits matter". |
| **Section 2: Age Psychology Profiles (Ages 7–14, Class 2–8)** | ✅ Complete | Cognitive, Emotional, Social, Physical development, and Learning characteristics for each age stage (*Playful Starter* to *Future CEO*) in [`src/screens/AgeProfileModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/AgeProfileModal.js). |
| **Section 3: 35 Habit Chapters (All 35 Bespoke)** | ✅ Complete | [`src/data/habitChapters.js`](file:///c:/ACHARIYA/habit-game-app/src/data/habitChapters.js) & [`src/screens/HabitDetailModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/HabitDetailModal.js). All 35 habits have dedicated real-life stories, "Why it matters", daily practice routines, weekly challenges, monthly missions, child reflection questions, parent discussion prompts, teacher discussion prompts, and 4-tier rubrics in English and தமிழ். |
| **Section 4: Gamification System** | ✅ Complete | XP points, Levels, 🔥 Streaks, Habit badges, Avatars, Weekly Quests, Weekly Boss Challenge, Experience-based rewards (park, library, sport gear, course). |
| **Section 5: Weekly Planner & Daily Log** | ✅ Complete | [`src/screens/WeekScreen.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/WeekScreen.js) & [`src/screens/DailyLogModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/DailyLogModal.js). 3 priorities (*Win the Morning*), 5 mood emojis, Gratitude 3, pages read (*Read 10 Pages*), minutes moved (*Move 30*), daily reflection, and Sunday family review goal. |
| **Section 6: Monthly Growth Review** | ✅ Complete | [`src/screens/MonthlyReviewScreen.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/MonthlyReviewScreen.js). Top 3 wins, challenges faced, lessons learned (*Fail Fast*), next month goals, parent & teacher observations (+150 XP bonus). |
| **Section 7: Dimension Report Cards** | ✅ Complete | [`src/screens/ReportCardsScreen.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/ReportCardsScreen.js). Automatic 30-day mastery calculations across all 5 dimensions with 4 performance levels (*Beginner, Developing, Proficient, Master*) and Future-Proof Child Index (*CEO of life*). |
| **Section 8: Parent Guide** | ✅ Complete | [`src/screens/GuidesModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/GuidesModal.js). Positive reinforcement, home routines, Sunday family review protocol, screen-time boundaries. |
| **Section 9: Teacher Guide** | ✅ Complete | [`src/screens/GuidesModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/GuidesModal.js). Classroom morning routine check-in, weekly deep dive & *Teach to Learn* peer mentoring, evidence collection. |
| **Section 10: Capstone Challenge** | ✅ Complete | [`src/screens/QuestsScreen.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/QuestsScreen.js). 30-day challenge integrating all 35 habits, checkpoints at Days 7, 14, 21, 28, and graduation criteria (≥ 60% completion on at least 18 days for 500 XP). |
| **Section 11: 8-Book Publishing Series & Output Format** | ✅ Complete | [`src/data/curriculumBooks.js`](file:///c:/ACHARIYA/habit-game-app/src/data/curriculumBooks.js) & [`src/screens/CurriculumBookModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/CurriculumBookModal.js). All 8 books (Ages 7 to 14) with Titles, Themes, Learning Outcomes, 10-Section Table of Contents, Detailed Chapter Structure, Sample Lessons, Classroom-Ready Worksheets, Diagnostic Assessments, and Parent/Teacher Guides in 5 tabs. |
| **All 4 Printable Classroom Formats & PDF Export** | ✅ Complete | [`src/screens/ClassroomPrintablesModal.js`](file:///c:/ACHARIYA/habit-game-app/src/screens/ClassroomPrintablesModal.js) & [`src/printHtml.js`](file:///c:/ACHARIYA/habit-game-app/src/printHtml.js). Printable Habit Card (Tamil + English), Classroom Wall Poster, 8-Week Challenge Calendar, and Parent Handbook with 1-tap **Official PDF Export** powered by `expo-print` & `expo-sharing`. |
| **Tactile Haptic Feedback** | ✅ Complete | [`src/haptics.js`](file:///c:/ACHARIYA/habit-game-app/src/haptics.js). Real-time tactile feedback on habit toggling, quest bonus collection, boss defeat, and review completion. |
| **Bilingual Localization** | ✅ Complete | [`src/i18n/translations.js`](file:///c:/ACHARIYA/habit-game-app/src/i18n/translations.js). 100% English & தமிழ் support across all 35 habits, taglines, rubrics, guides, and UI. |
| **Child Privacy & Compliance** | ✅ Complete | India DPDP Act 2023 & COPPA parental consent gating, 100% on-device storage. |

---

## 🏗️ Folder Structure

```
habit-game-app/
├── App.js                         # Root orchestrator with SafeArea & Themes
├── package.json                   # Expo SDK 58, React Native 0.88, React 19.3
├── app.json                       # Mobile bundle configuration
└── src/
    ├── data/
    │   ├── habitChapters.js       # Section 3: All 35 bespoke habit chapters
    │   ├── curriculumBooks.js     # Publishing Series: All 8 books, TOC & Worksheets
    │   └── psychologyProfiles.js  # Section 1 & 2: Hero journey & age psychology profiles
    ├── data.js                    # 35 habits, dimension metadata, rewards, guides
    ├── logic.js                   # XP, streak, 350-scale scoring, 30d analytics
    ├── i18n/
    │   └── translations.js        # English & Tamil bilingual dictionary
    ├── components/
    │   ├── Header.js              # User avatar, streak chip, language toggle
    │   └── Navbar.js              # 7-tab bottom navigation
    └── screens/
        ├── OnboardingScreen.js    # Consent, Name, Age (7-14), Avatar, Language
        ├── TodayScreen.js         # Morning / School / Evening habit checklist
        ├── HabitDetailModal.js    # Section 3: Deep habit story, challenges, rubrics
        ├── CurriculumBookModal.js # 8-Book Series Viewer, Table of Contents & Worksheets
        ├── AgeProfileModal.js     # Section 1 & 2: Hero Journey & Age Psychology
        ├── ClassroomPrintablesModal.js # Printable Card, Wall Poster, 8-Wk Calendar
        ├── QuestsScreen.js        # Quests, Weekly Boss, 30-Day Capstone
        ├── WeekScreen.js          # 350-point score, MTWTFSS dots, Sunday review
        ├── DailyLogModal.js       # 3 priorities, mood, gratitude, pages, minutes
        ├── MonthlyReviewScreen.js # Section 6: Wins, challenges, observations
        ├── ReportCardsScreen.js   # Section 7: 5 Dimension 4-tier report cards
        ├── RewardsScreen.js       # Experience rewards (park, library, sport gear)
        ├── GuidesModal.js         # Sections 8 & 9 Parent & Teacher Guides
        └── MeScreen.js            # Profile, badges, compliance, printables
```

---

## 🚀 How to Run Locally & Build

### Development (Expo Go)
```bash
cd c:\ACHARIYA\habit-game-app
npx expo start -c
```
- **Android**: Scan with the Expo Go app.
- **iOS**: Scan with the Camera app and tap *Open in Expo Go*.

### Production Bytecode Export
```bash
# Export Android Hermes Bytecode bundle
npx expo export --platform android

# Export iOS Hermes Bytecode bundle
npx expo export --platform ios
```

### Full Game Simulation & Verification
```bash
# Run full automated end-to-end game playthrough simulation
node scratch/run_full_game_playthrough.mjs
```

---

## 🌐 Free Static Hosting Portal (`/docs`)

Deploying the `/docs` folder to GitHub Pages:
1. In your GitHub repository settings, go to **Pages**.
2. Select **Source**: `Deploy from a branch`.
3. Select **Branch**: `main` and Folder: `/docs`.
4. Click **Save**.

Your live URLs will be immediately ready for App Store & Google Play Store submission:
- **Showcase / Landing**: `https://<username>.github.io/<repo>/`
- **Privacy Policy**: `https://<username>.github.io/<repo>/privacy.html`
- **Support & FAQ**: `https://<username>.github.io/<repo>/support.html`
