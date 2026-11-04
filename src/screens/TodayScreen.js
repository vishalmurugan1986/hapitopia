import React, { useState, useRef } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Animated, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitDetailModal from './HabitDetailModal';
import HabitEvidenceModal from './HabitEvidenceModal';
import { DIMS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';

// 35 Unique, Distinct Vector Icons for Every Daily Mission Habit
const HABIT_ICONS = {
  // Dimension P: Physically Healthy (Body = First Classroom)
  P0: 'bicycle',           // Move 30 Every Day
  P1: 'water',             // Water First Rule
  P2: 'bed',               // Sleep Like a Champion
  P3: 'restaurant',        // Rainbow Plate
  P4: 'body',              // Posture Police
  P5: 'leaf',              // Breathe Reset
  P6: 'football',          // Sport a Quarter

  // Dimension M: Mentally Strong (Mind > Mood)
  M0: 'alarm',             // Win the Morning
  M1: 'rocket',            // No-Excuse Minute
  M2: 'journal',           // Fail Fast Log
  M3: 'flame',             // Focus Sprint 15
  M4: 'shield-checkmark',  // Self-Talk Filter
  M5: 'sparkles',          // Gratitude 3
  M6: 'eye-off',           // Digital Boundaries

  // Dimension I: Intellectually Sharp (Brain on Beast Mode)
  I0: 'book',              // Read 10 Pages
  I1: 'help-circle',       // Question Storm
  I2: 'shapes',  // Memory Play
  I3: 'people',            // Teach to Learn
  I4: 'calculator',        // Math in Life
  I5: 'color-palette',     // Create Not Consume
  I6: 'telescope',         // Weekly Deep Dive

  // Dimension E: Emotionally Balanced (Heart with IQ)
  E0: 'chatbubble-ellipses', // Name the Feeling
  E1: 'sparkles',             // Kind Act Daily
  E2: 'pause-circle',      // Pause Button
  E3: 'ear',               // Friendship Rule
  E4: 'document-text',     // Journal One Line
  E5: 'hand-left',         // Sorry Fast, Forgive Faster
  E6: 'home',              // Family Connect

  // Dimension F: Financially Wealthy (Money Smart Early)
  F0: 'layers',            // 3-Jar System
  F1: 'cash',              // Earn a Rupee
  F2: 'git-compare',       // Need vs Want
  F3: 'search',            // Price Detective
  F4: 'wallet',            // Goal Piggy
  F5: 'hourglass',         // Delay Reward
  F6: 'ribbon',             // Value Creation

  // BAT02: 5 Q Power Habits (Activation Workshop)
  B2_Q0: 'eye',                  // Eye Ball Exercise
  B2_Q1: 'speedometer',          // Speed Reading Card
  B2_Q2: 'musical-notes',        // Concentration Music
  B2_Q3: 'glasses',              // Blind Fold Practice
  B2_Q4: 'flash',                // Power Affirmations

  // BAT02 Dimension P: Physically Healthy
  B2_P0: 'sunny',                // Exposure to Sunlight & Warm Up
  B2_P1: 'leaf',                 // Regular Deep Breathing
  B2_P2: 'water',                // Adequate Hydration
  B2_P3: 'nutrition',            // Healthy Breakfast
  B2_P4: 'body',                 // Proper Posture While Sitting & Standing

  // BAT02 Dimension M: Mentally Strong
  B2_M0: 'telescope',            // Visualize Future Self
  B2_M1: 'sparkles',             // Daily Gratitude Practice
  B2_M2: 'flame',                // Daily Affirmations
  B2_M3: 'pause-circle',         // Mindful Pause
  B2_M4: 'book',                 // Read Inspiring Stories

  // BAT02 Dimension I: Intellectually Sharp
  B2_I0: 'shapes',               // Practice Brain Gym / Sudoku / Chess
  B2_I1: 'bulb',                 // Learn One New Skill
  B2_I2: 'help-circle',          // Ask Why Questions Daily
  B2_I3: 'journal',              // Daily Journaling
  B2_I4: 'people',               // Teach What You Learnt

  // BAT02 Dimension E: Emotionally Balanced
  B2_E0: 'chatbubble-ellipses',  // Emotion Check-in
  B2_E1: 'ear',                  // Deep Listening
  B2_E2: 'heart',                // Help Someone Daily
  B2_E3: 'ribbon',               // Express Appreciation
  B2_E4: 'shield-checkmark',     // Respond, Do Not React

  // BAT02 Dimension F: Financially Wealthy
  B2_F0: 'layers',               // 4-Jars Savings Method
  B2_F1: 'git-compare',          // Differentiate Needs vs. Wants
  B2_F2: 'calculator',           // Track Daily Expenses
  B2_F3: 'search',               // Value Before Price Thinking
  B2_F4: 'cash'                  // Learning Money Concept
};

export default function TodayScreen({ S, update, T }) {
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [evidenceHabit, setEvidenceHabit] = useState(null);
  const [activeDimFilter, setActiveDimFilter] = useState('ALL');
  const [showAllLibrary, setShowAllLibrary] = useState(false);
  const [showWeekModal, setShowWeekModal] = useState(false);
  // Per-habit floating +10 XP pop state keyed by habit ID
  const [habitPops, setHabitPops] = useState({});
  const habitAnimsRef = useRef({});

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const todayStr = L.todayS();
  const isBat02 = (S?.batch === 'BAT02');
  const bat02Week = L.getBat02Week(S);
  const batchDims = L.getBatchDims(S);
  const act = L.activeHabits(S);
  const all35 = L.allHabits(S);
  const baseHabits = showAllLibrary ? all35 : act;
  const doneToday = L.doneOn(S, todayStr);
  const currentLvl = L.level(S);
  const totalXp = L.xp(S);
  const xpIntoLevel = totalXp % 100;
  const sc = L.weekScore(S);
  const isSweep = act.length > 0 && doneToday.length === act.length;
  const sweepKey = `sweep-${todayStr}`;
  const sweepCollected = !!(S.bonus && S.bonus[sweepKey]);

  const spawnHabitXpPop = (id, dimColor, dimName, unlockedSweepNow) => {
    if (!habitAnimsRef.current[id]) {
      habitAnimsRef.current[id] = new Animated.Value(0);
    }
    const anim = habitAnimsRef.current[id];
    anim.stopAnimation();
    anim.setValue(0);

    setHabitPops((prev) => ({
      ...prev,
      [id]: {
        earnedXp: unlockedSweepNow ? 30 : 10,
        isSweepBonus: unlockedSweepNow,
        dimColor,
        dimName,
        icon: HABIT_ICONS[id] || 'sparkles'
      }
    }));

    // 0 -> 0.5 (spring pop in), hold 1200ms at 0.5 (100% visible), 0.5 -> 1 (settle & fade out onto ✓)
    Animated.sequence([
      Animated.spring(anim, {
        toValue: 0.5,
        friction: 5,
        tension: 85,
        useNativeDriver: true
      }),
      Animated.delay(1200),
      Animated.timing(anim, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true
      })
    ]).start(({ finished }) => {
      if (finished) {
        setHabitPops((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    });
  };

  // Open Evidence Submission Modal before claiming points (or to review/update existing evidence)
  const toggle = (id) => {
    triggerHaptic('selection');
    const habitObj = all35.find((x) => x.id === id) || act.find((x) => x.id === id);
    if (habitObj) {
      setEvidenceHabit(habitObj);
    }
  };

  const handleSubmitEvidence = (id, evidenceData) => {
    setEvidenceHabit(null);
    const list = L.doneOn(S, todayStr);
    const wasAlreadyDone = list.includes(id);
    const nextList = wasAlreadyDone ? list : [...list, id];
    const unlockedSweepNow = !wasAlreadyDone && nextList.length === act.length && !sweepCollected;

    triggerHaptic('success');
    const habitObj = all35.find((x) => x.id === id) || act.find((x) => x.id === id);
    const dimKey = habitObj?.dimKey || id.charAt(0) || 'P';
    const dimColor = T.dimColors?.[dimKey] || T.primary;
    const dimName = (t.dims && t.dims[dimKey]?.name) || habitObj?.d?.n || 'Growth';

    if (!wasAlreadyDone) {
      spawnHabitXpPop(id, dimColor, dimName, unlockedSweepNow);
    }

    // Timestamp, Media Evidence & Integrity Audit Tracking
    const nowIso = new Date().toISOString();
    const curTimestamps = { ...((S && S.habitTimestamps && S.habitTimestamps[todayStr]) || {}) };
    curTimestamps[id] = curTimestamps[id] || nowIso;

    const curEvidence = { ...((S && S.habitEvidence && S.habitEvidence[todayStr]) || {}) };
    curEvidence[id] = {
      ...evidenceData,
      habitId: id,
      habitName: (t.habits && t.habits[id]?.name) || habitObj?.n || id,
      timestamp: nowIso
    };

    // Velocity / Rapid-tap check (< 15s between marks)
    const times = Object.values(curTimestamps).map((tVal) => new Date(tVal).getTime()).sort((a, b) => a - b);
    let rapidTaps = 0;
    if (times.length >= 3) {
      for (let i = 1; i < times.length; i++) {
        if (times[i] - times[i - 1] < 15000) rapidTaps++;
      }
    }
    const isRapid = rapidTaps >= 2;

    const nextS = {
      ...S,
      done: {
        ...(S.done || {}),
        [todayStr]: nextList
      },
      habitTimestamps: {
        ...(S.habitTimestamps || {}),
        [todayStr]: curTimestamps
      },
      habitEvidence: {
        ...(S.habitEvidence || {}),
        [todayStr]: curEvidence
      },
      auditFlags: {
        ...(S.auditFlags || {}),
        [todayStr]: {
          ...((S && S.auditFlags && S.auditFlags[todayStr]) || {}),
          rapidTap: isRapid,
          lastUpdated: nowIso
        }
      }
    };

    // Auto-award clean sweep bonus if all completed
    if (unlockedSweepNow) {
      nextS.bonus = {
        ...(S.bonus || {}),
        [sweepKey]: 20
      };
    }

    update(nextS);
  };

  const handleRemoveCompletion = (id) => {
    setEvidenceHabit(null);
    triggerHaptic('medium');
    if (habitAnimsRef.current[id]) {
      habitAnimsRef.current[id].stopAnimation();
    }
    setHabitPops((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    const list = L.doneOn(S, todayStr);
    const nextList = list.filter((x) => x !== id);
    const nowIso = new Date().toISOString();

    const curTimestamps = { ...((S && S.habitTimestamps && S.habitTimestamps[todayStr]) || {}) };
    delete curTimestamps[id];

    const curEvidence = { ...((S && S.habitEvidence && S.habitEvidence[todayStr]) || {}) };
    delete curEvidence[id];

    const nextS = {
      ...S,
      done: {
        ...(S.done || {}),
        [todayStr]: nextList
      },
      habitTimestamps: {
        ...(S.habitTimestamps || {}),
        [todayStr]: curTimestamps
      },
      habitEvidence: {
        ...(S.habitEvidence || {}),
        [todayStr]: curEvidence
      },
      auditFlags: {
        ...(S.auditFlags || {}),
        [todayStr]: {
          ...((S && S.auditFlags && S.auditFlags[todayStr]) || {}),
          lastUpdated: nowIso
        }
      }
    };

    update(nextS);
  };

  const filteredHabits = activeDimFilter === 'ALL'
    ? baseHabits
    : baseHabits.filter((h) => h.dimKey === activeDimFilter);

  // Time slot config with vector icons
  const slotIcons = {
    'Morning': 'sunny-outline',
    'School hours': 'school-outline',
    'Evening': 'moon-outline'
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1. Hero Status & XP Mastery Bento Card (Stitch Spec) */}
        <View
          style={[
            styles.heroCard,
            {
              backgroundColor: T.cardElevated || T.card,
              borderColor: T.lineHigh
            }
          ]}
        >
          <View style={styles.heroTopRow}>
            <View style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
              <View style={styles.badgeRow}>
                <Ionicons name="shield-checkmark" size={14} color={T.secondary} />
                <Text style={[styles.tierLabel, { color: T.secondary }]} numberOfLines={1}>
                  {isBat02
                    ? `BAT02 · ${lang === 'ta' ? `வாரம் ${bat02Week}/25` : `Week ${bat02Week}/25`} · ${lang === 'ta' ? `நிலை ${Math.min(currentLvl, 10)}` : `TIER ${Math.min(currentLvl, 10)}`}`
                    : `${t.stages[S.age]} · ${lang === 'ta' ? `நிலை ${Math.min(currentLvl, 10)}` : `TIER ${Math.min(currentLvl, 10)}`}`}
                </Text>
              </View>
              <Text style={[styles.heroTitle, { color: T.tx }]}>
                {lang === 'ta' ? 'தினசரி பழக்கப் பயணம்' : 'Daily Habit Quest'}
              </Text>
            </View>

            {/* Weekly Score Pill */}
            <View style={[styles.scorePill, { backgroundColor: T.secondary + '18', borderColor: T.secondary + '60' }]}>
              <Ionicons name="trophy" size={13} color={T.secondary} />
              <Text style={[styles.scorePillText, { color: T.secondary }]}>
                {sc.scaledScore} {lang === 'ta' ? 'புள்ளிகள்' : 'PTS'}
              </Text>
            </View>
          </View>

          {/* XP Progress Track */}
          <View style={styles.xpBlock}>
            <View style={styles.xpRow}>
              <Text style={[styles.xpCount, { color: T.primary }]}>
                {xpIntoLevel} <Text style={{ color: T.mu, fontSize: 13, fontWeight: '500' }}>/ 100 XP</Text>
              </Text>
              <Text style={[styles.xpNext, { color: T.tertiary }]}>
                {100 - xpIntoLevel} XP {lang === 'ta' ? `நிலை ${currentLvl + 1}க்கு` : `to Level ${currentLvl + 1}`}
              </Text>
            </View>

            {/* Glowing Rail */}
            <View style={[styles.xpRail, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
              <View
                style={[
                  styles.xpFill,
                  {
                    width: `${Math.max(xpIntoLevel, 4)}%`,
                    backgroundColor: T.primary
                  }
                ]}
              />
            </View>
          </View>

          {/* Clearance Footnote */}
          <View style={[styles.heroFoot, { borderTopColor: T.line }]}>
            <View style={styles.footItem}>
              <Ionicons name="grid-outline" size={14} color={T.tertiary} />
              <Text style={[styles.footText, { color: T.mu }]}>
                {isBat02
                  ? (lang === 'ta' ? '25-வார பாடத்திட்டம்' : '25-Week Curriculum')
                  : (lang === 'ta' ? '5×7 பழக்க முறை' : '5×7 Habit System')}
              </Text>
            </View>
            <View style={styles.footItem}>
              <View
                style={[
                  styles.footDot,
                  { backgroundColor: doneToday.length === act.length ? T.primary : T.secondary }
                ]}
              />
              <Text style={[styles.footCount, { color: T.tx }]}>
                {doneToday.length}/{act.length} {lang === 'ta' ? 'முடிந்தது' : 'Cleared Today'}
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Dimension Filter Pills (Horizontal Scroll) */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {/* ALL Tab */}
            <Pressable
              onPress={() => setActiveDimFilter('ALL')}
              style={[
                styles.filterPill,
                {
                  borderColor: activeDimFilter === 'ALL' ? T.primary : T.line,
                  backgroundColor: activeDimFilter === 'ALL' ? T.primary + '20' : T.card
                }
              ]}
            >
              <Ionicons
                name="apps"
                size={13}
                color={activeDimFilter === 'ALL' ? T.primary : T.mu}
              />
              <Text
                style={[
                  styles.filterText,
                  { color: activeDimFilter === 'ALL' ? T.primary : T.mu, fontWeight: activeDimFilter === 'ALL' ? '800' : '600' }
                ]}
              >
                {lang === 'ta' ? 'அனைத்தும்' : 'All Missions'} ({baseHabits.length})
              </Text>
            </Pressable>

            {/* 5 Dimensions */}
            {(all35.length > 0 ? batchDims : []).map((d) => {
              const isSelected = activeDimFilter === d.k;
              const dimColor = T.dimColors[d.k] || d.c[T.ci];
              const dimData = (t.dims && t.dims[d.k]) || { name: d.n };
              const habitsInDim = baseHabits.filter((h) => h.dimKey === d.k);
              const doneInDim = habitsInDim.filter((h) => doneToday.includes(h.id)).length;

              return (
                <Pressable
                  key={d.k}
                  onPress={() => setActiveDimFilter(d.k)}
                  style={[
                    styles.filterPill,
                    {
                      borderColor: isSelected ? T.primary : T.line,
                      backgroundColor: isSelected ? T.primary + '18' : T.card
                    }
                  ]}
                >
                  <View style={[styles.filterDot, { backgroundColor: isSelected ? T.primary : T.mu }]} />
                  <Text
                    style={[
                      styles.filterText,
                      {
                        color: isSelected ? T.primary : T.mu,
                        fontWeight: isSelected ? '800' : '600'
                      }
                    ]}
                  >
                    {dimData.name} ({doneInDim}/{habitsInDim.length})
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 3. Daily Habit Mission Cards (Uncongested Header & Sub-Bar) */}
        <View style={styles.missionsHeader}>
          {/* Main Header Row: Title on Left, Done Count & Week Pill on Right */}
          <View style={styles.missionsHeaderRow}>
            <Text style={[styles.sectionTitle, { color: T.tx }]} numberOfLines={1}>
              {lang === 'ta' ? 'தினசரி இலக்குகள்' : 'Daily Missions'}
            </Text>

            <View style={styles.missionsHeaderRight}>
              {isBat02 && (
                <Pressable
                  onPress={() => {
                    triggerHaptic('light');
                    setShowWeekModal(true);
                  }}
                  style={[
                    styles.statusChip,
                    {
                      backgroundColor: T.secondary + '18',
                      borderColor: T.secondary + '60'
                    }
                  ]}
                >
                  <Ionicons name="calendar-outline" size={11} color={T.secondary} />
                  <Text style={[styles.statusChipText, { color: T.secondary }]} numberOfLines={1}>
                    {lang === 'ta' ? `வாரம் ${bat02Week}/25` : `Week ${bat02Week}/25`}
                  </Text>
                </Pressable>
              )}

              <View style={[styles.statusChip, { backgroundColor: T.primary + '18', borderColor: T.primary + '50' }]}>
                <Ionicons name="checkmark-done" size={11} color={T.primary} />
                <Text style={[styles.statusChipText, { color: T.primary }]} numberOfLines={1}>
                  {doneToday.length}/{act.length} {lang === 'ta' ? 'முடிந்தது' : 'Done'}
                </Text>
              </View>
            </View>
          </View>

          {/* Uncongested Segmented Mode Selector (Active Week vs All Habits Library) */}
          {all35.length > 0 && act.length < all35.length && (
            <View style={styles.missionsSubBar}>
              <Pressable
                onPress={() => {
                  triggerHaptic('light');
                  setShowAllLibrary(false);
                }}
                style={[
                  styles.segmentedToggleBtn,
                  {
                    backgroundColor: !showAllLibrary ? T.primary + '20' : T.cardElevated || T.card,
                    borderColor: !showAllLibrary ? T.primary : T.line
                  }
                ]}
              >
                <Ionicons
                  name="flash-outline"
                  size={12}
                  color={!showAllLibrary ? T.primary : T.mu}
                />
                <Text
                  style={[
                    styles.segmentedToggleText,
                    { color: !showAllLibrary ? T.primary : T.mu, fontWeight: !showAllLibrary ? '800' : '600' }
                  ]}
                  numberOfLines={1}
                >
                  {isBat02
                    ? (lang === 'ta' ? `வாரம் ${bat02Week} இலக்குகள் (${act.length})` : `Week ${bat02Week} Active (${act.length})`)
                    : (lang === 'ta' ? `நிலை இலக்குகள் (${act.length})` : `Active Tier (${act.length})`)}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  triggerHaptic('light');
                  setShowAllLibrary(true);
                }}
                style={[
                  styles.segmentedToggleBtn,
                  {
                    backgroundColor: showAllLibrary ? T.secondary + '20' : T.cardElevated || T.card,
                    borderColor: showAllLibrary ? T.secondary : T.line
                  }
                ]}
              >
                <Ionicons
                  name="library-outline"
                  size={12}
                  color={showAllLibrary ? T.secondary : T.mu}
                />
                <Text
                  style={[
                    styles.segmentedToggleText,
                    { color: showAllLibrary ? T.secondary : T.mu, fontWeight: showAllLibrary ? '800' : '600' }
                  ]}
                  numberOfLines={1}
                >
                  {isBat02
                    ? (lang === 'ta' ? 'அனைத்து 30 பாடத்திட்டம்' : 'All 30 Curriculum')
                    : (lang === 'ta' ? 'அனைத்து 35 பழக்கங்கள்' : 'All 35 Habits')}
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Habit Card List with Uncongested Section Grouping for BAT02 */}
        {(() => {
          if (filteredHabits.length === 0) {
            return (
              <View
                style={{
                  padding: 24,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: T.line,
                  backgroundColor: T.cardElevated || T.card,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 12
                }}
              >
                <Ionicons name="sparkles-outline" size={26} color={T.mu} />
                <Text style={{ fontSize: 13, fontWeight: '700', color: T.mu, marginTop: 8, textAlign: 'center' }}>
                  {lang === 'ta'
                    ? `${S?.batch || 'BAT'} காலியாக உள்ளது. விரைவில் புதிய பழக்கங்கள் சேர்க்கப்படும்.`
                    : `${S?.batch || 'Batch'} is empty. Habits will be configured soon.`}
                </Text>
              </View>
            );
          }

          const renderHabitCard = (h) => {
            const isDone = doneToday.includes(h.id);
            const dimColor = T.dimColors[h.dimKey] || h.d.c[T.ci];
            const hData = (t.habits && t.habits[h.id]) || { name: h.n, desc: h.s };
            const dimData = (t.dims && t.dims[h.dimKey]) || { name: h.d.n };
            const slotIcon = slotIcons[h.d.slot] || 'time-outline';
            const habitIcon = HABIT_ICONS[h.id] || 'sparkles';
            const activePop = habitPops[h.id];
            const popVal = habitAnimsRef.current[h.id];
            const evObj = L.getHabitEvidence(S, h.id, todayStr);
            const evIcon = evObj?.type === 'audio'
              ? 'mic-outline'
              : evObj?.type === 'video'
              ? 'videocam-outline'
              : evObj?.type === 'photo'
              ? 'camera-outline'
              : 'attach-outline';
            const evLabel = evObj?.type === 'audio'
              ? (lang === 'ta' ? 'குரல்' : 'Audio')
              : evObj?.type === 'video'
              ? (lang === 'ta' ? 'வீடியோ' : 'Video')
              : evObj?.type === 'photo'
              ? (lang === 'ta' ? 'புகைப்படம்' : 'Photo')
              : (lang === 'ta' ? 'சான்று தேவை' : 'Proof Req');

            return (
              <View
                key={h.id}
                style={[
                  styles.missionCard,
                  {
                    backgroundColor: isDone ? dimColor + '14' : T.card,
                    borderColor: activePop ? dimColor : isDone ? dimColor + '65' : T.line
                  }
                ]}
              >
                <Pressable
                  style={styles.cardInner}
                  onPress={() => setSelectedHabit(h)}
                  accessibilityRole="button"
                  accessibilityLabel={`Open details for ${hData.name}`}
                >
                  {/* Thematic Daily Mission Icon Badge with Dimension Color */}
                  <View
                    style={[
                      styles.dimIconBox,
                      {
                        backgroundColor: isDone ? dimColor + '26' : dimColor + '16',
                        borderColor: isDone ? dimColor : dimColor + '45'
                      }
                    ]}
                  >
                    <Ionicons name={habitIcon} size={19} color={dimColor} />
                  </View>

                  {/* Content Area */}
                  <View style={styles.cardContent}>
                    {/* Micro Badges Row */}
                    <View style={styles.microBadgesRow}>
                      <View style={[styles.slotBadge, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                        <Ionicons name={slotIcon} size={10} color={T.mu} />
                        <Text style={[styles.slotBadgeText, { color: T.mu }]}>
                          {lang === 'ta' ? (h.d.slot_ta || h.d.slot) : h.d.slot}
                        </Text>
                      </View>
                      <View style={[styles.xpBadge, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                        <Text style={[styles.xpBadgeText, { color: T.mu }]}>+10 XP</Text>
                      </View>
                      {isDone && (
                        <View style={[styles.evidenceBadge, { backgroundColor: T.primary + '18', borderColor: T.primary + '40' }]}>
                          <Ionicons name={evIcon} size={10} color={T.primary} />
                          <Text style={[styles.evidenceBadgeText, { color: T.primary }]}>{evLabel}</Text>
                        </View>
                      )}
                    </View>

                    {/* Habit Name */}
                    <Text style={[styles.habitName, { color: T.tx }]} numberOfLines={2}>
                      {hData.name}
                    </Text>
                    <Text style={[styles.habitDesc, { color: T.mu }]} numberOfLines={1}>
                      {hData.desc || dimData.name}
                    </Text>
                  </View>

                  {/* Tactile Completion Checkbox */}
                  <View style={styles.checkboxAnchor}>
                    <Pressable
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: isDone }}
                      onPress={() => toggle(h.id)}
                      hitSlop={10}
                      style={[
                        styles.checkboxBtn,
                        {
                          borderColor: isDone ? T.primary : T.lineHigh,
                          backgroundColor: isDone ? T.primary : 'transparent'
                        }
                      ]}
                    >
                      {isDone ? (
                        <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                      ) : (
                        <View style={[styles.emptyDot, { borderColor: T.mu }]} />
                      )}
                    </Pressable>

                    {activePop && popVal && (
                      <Animated.View
                        pointerEvents="none"
                        style={[
                          styles.habitFloatingXpWrap,
                          {
                            opacity: popVal.interpolate({
                              inputRange: [0, 0.14, 0.68, 1],
                              outputRange: [0, 1, 1, 0]
                            }),
                            transform: [
                              {
                                scale: popVal.interpolate({
                                  inputRange: [0, 0.25, 0.68, 1],
                                  outputRange: [0.7, 1.06, 1, 0.85]
                                })
                              }
                            ]
                          }
                        ]}
                      >
                        <View
                          style={[
                            styles.habitFloatingXpBox,
                            {
                              backgroundColor: dimColor,
                              borderColor: 'rgba(255, 255, 255, 0.65)',
                              shadowColor: dimColor
                            }
                          ]}
                        >
                          <Text style={[styles.habitFloatingXpText, { color: '#FFFFFF' }]}>
                            +{activePop.earnedXp} XP
                          </Text>
                        </View>
                      </Animated.View>
                    )}
                  </View>
                </Pressable>
              </View>
            );
          };

          // For BAT02 when viewing ALL, split into 2 clear uncongested sections:
          // Section A: Q Power Habits (Activation Workshop Core, 5 habits)
          // Section B: Growth Dimension Habits (Weekly Progression additions)
          const qHabits = filteredHabits.filter((h) => h.dimKey === 'Q');
          const growthHabits = filteredHabits.filter((h) => h.dimKey !== 'Q');
          const shouldSplitSections = isBat02 && activeDimFilter === 'ALL' && qHabits.length > 0 && growthHabits.length > 0;

          if (shouldSplitSections) {
            return (
              <View style={styles.cardList}>
                {/* Section A: Q Power Habits */}
                <View style={styles.bat02SectionDivider}>
                  <View style={[styles.bat02SectionBadge, { backgroundColor: (T.dimColors.Q || '#FAC775') + '22', borderColor: (T.dimColors.Q || '#FAC775') + '55' }]}>
                    <Ionicons name="flash" size={12} color={T.dimColors.Q || '#FAC775'} />
                    <Text style={[styles.bat02SectionTitle, { color: T.dimColors.Q || '#FAC775' }]}>
                      {lang === 'ta' ? 'Q பவர் பழக்கங்கள்' : 'Q Power Habits'}
                    </Text>
                  </View>
                  <Text style={[styles.bat02SectionSub, { color: T.mu }]}>
                    {qHabits.filter((h) => doneToday.includes(h.id)).length}/5 {lang === 'ta' ? 'முடிந்தது' : 'Cleared'}
                  </Text>
                </View>
                {qHabits.map(renderHabitCard)}

                {/* Section B: Weekly Progression Habits */}
                <View style={[styles.bat02SectionDivider, { marginTop: 18 }]}>
                  <View style={[styles.bat02SectionBadge, { backgroundColor: T.primary + '18', borderColor: T.primary + '45' }]}>
                    <Ionicons name="trending-up" size={12} color={T.primary} />
                    <Text style={[styles.bat02SectionTitle, { color: T.primary }]}>
                      {lang === 'ta' ? `வளர்ச்சிப் பழக்கங்கள் (வாரம் ${bat02Week})` : `Growth Habits (Week ${bat02Week})`}
                    </Text>
                  </View>
                  <Text style={[styles.bat02SectionSub, { color: T.mu }]}>
                    {growthHabits.filter((h) => doneToday.includes(h.id)).length}/{growthHabits.length} {lang === 'ta' ? 'முடிந்தது' : 'Cleared'}
                  </Text>
                </View>
                {growthHabits.map(renderHabitCard)}
              </View>
            );
          }

          return <View style={styles.cardList}>{filteredHabits.map(renderHabitCard)}</View>;
        })()}

        {/* 4. Daily Clean Sweep Milestone Banner */}
        <View
          style={[
            styles.sweepBanner,
            {
              backgroundColor: isSweep ? T.primary + '18' : T.cardElevated,
              borderColor: isSweep ? T.primary + '60' : T.line
            }
          ]}
        >
          <View style={styles.sweepRow}>
            <View
              style={[
                styles.sweepIconBox,
                {
                  backgroundColor: isSweep ? T.primary + '25' : T.secondary + '20',
                  borderColor: isSweep ? T.primary : T.secondary
                }
              ]}
            >
              <Ionicons
                name={isSweep ? 'gift' : 'gift-outline'}
                size={24}
                color={isSweep ? T.primary : T.secondary}
              />
            </View>
            <View style={styles.sweepContent}>
              <View style={styles.sweepTitleRow}>
                <Text style={[styles.sweepTitle, { color: T.tx }]}>
                  {lang === 'ta' ? 'தினசரி போனஸ் (Clean Sweep)' : 'Daily Clean Sweep'}
                </Text>
                <View style={[styles.bonusTag, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                  <Text style={[styles.bonusTagText, { color: T.mu }]}>+20 XP</Text>
                </View>
              </View>
              <Text style={[styles.sweepDesc, { color: T.mu }]}>
                {isSweep
                  ? (lang === 'ta' ? `அனைத்து ${act.length} பழக்கங்களும் முடிக்கப்பட்டன! போனஸ் சேர்க்கப்பட்டது!` : `All ${act.length} habits cleared today! +20 XP bonus unlocked!`)
                  : (lang === 'ta' ? `இன்றைய போனஸைப் பெற இன்னும் ${act.length - doneToday.length} பழக்கங்களை முடியுங்கள்!` : `Complete ${act.length - doneToday.length} more missions today to unlock bonus!`)}
              </Text>
            </View>
          </View>
        </View>

        {/* Habit Chapter Modal (Section 3 with 12 Pedagogical Elements) */}
        <HabitDetailModal
          visible={!!selectedHabit}
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
          S={S}
          T={T}
        />

        {/* Mandatory Habit Media Evidence Modal (Photo / Audio / Video Proof) */}
        <HabitEvidenceModal
          visible={!!evidenceHabit}
          habit={evidenceHabit}
          existingEvidence={evidenceHabit ? L.getHabitEvidence(S, evidenceHabit.id, todayStr) : null}
          isAlreadyDone={evidenceHabit ? doneToday.includes(evidenceHabit.id) : false}
          onClose={() => setEvidenceHabit(null)}
          onSubmitEvidence={handleSubmitEvidence}
          onRemoveCompletion={handleRemoveCompletion}
          S={S}
          T={T}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 32
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2
  },
  tierLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    flexShrink: 1
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexShrink: 0
  },
  scorePillText: {
    fontSize: 12,
    fontWeight: '800'
  },
  xpBlock: {
    marginTop: 14,
    marginBottom: 12
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6
  },
  xpCount: {
    fontSize: 18,
    fontWeight: '800'
  },
  xpNext: {
    fontSize: 11,
    fontWeight: '700'
  },
  xpRail: {
    height: 9,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  xpFill: {
    height: '100%',
    borderRadius: 5
  },
  heroFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 10
  },
  footItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  footText: {
    fontSize: 11.5,
    fontWeight: '600'
  },
  footDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5
  },
  footCount: {
    fontSize: 12,
    fontWeight: '800'
  },
  filterSection: {
    marginBottom: 14
  },
  filterRow: {
    gap: 8,
    paddingVertical: 2
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  filterText: {
    fontSize: 12
  },
  missionsHeader: {
    marginBottom: 10
  },
  missionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  missionsHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  missionsSubBar: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 4
  },
  segmentedToggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1
  },
  segmentedToggleText: {
    fontSize: 11,
    fontWeight: '700'
  },
  bat02SectionDivider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 2
  },
  bat02SectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 7,
    borderWidth: 1
  },
  bat02SectionTitle: {
    fontSize: 11.5,
    fontWeight: '800'
  },
  bat02SectionSub: {
    fontSize: 11,
    fontWeight: '700'
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 16.5,
    fontWeight: '900',
    letterSpacing: -0.2,
    flexShrink: 1
  },
  statusChip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  statusChipText: {
    fontSize: 10.5,
    fontWeight: '800'
  },
  cardList: {
    gap: 9,
    marginBottom: 14
  },
  missionCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    position: 'relative',
    overflow: 'visible'
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10
  },
  dimIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center'
  },
  microBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 3
  },
  slotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 1.5,
    paddingHorizontal: 5
  },
  slotBadgeText: {
    fontSize: 9.5,
    fontWeight: '600'
  },
  xpBadge: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 1.5,
    paddingHorizontal: 5
  },
  xpBadgeText: {
    fontSize: 9.5,
    fontWeight: '800'
  },
  evidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 1.5,
    paddingHorizontal: 5
  },
  evidenceBadgeText: {
    fontSize: 9.5,
    fontWeight: '800'
  },
  habitName: {
    fontSize: 14.5,
    lineHeight: 19,
    fontWeight: '800',
    letterSpacing: -0.2
  },
  habitDesc: {
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: '400',
    marginTop: 1
  },
  checkboxAnchor: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible'
  },
  checkboxBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 1.5
  },
  // Compact ┌─────────┐ │ +10 XP │ └─────────┘ Badge Centered & Fading Directly on ✓
  habitFloatingXpWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    elevation: 8
  },
  habitFloatingXpBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6
  },
  habitFloatingXpText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.2
  },
  sweepBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14
  },
  sweepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  sweepIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sweepContent: {
    flex: 1
  },
  sweepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2
  },
  sweepTitle: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    marginRight: 6
  },
  bonusTag: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 6,
    flexShrink: 0
  },
  bonusTagText: {
    fontSize: 10,
    fontWeight: '800'
  },
  sweepDesc: {
    fontSize: 11.5,
    lineHeight: 16
  }
});
