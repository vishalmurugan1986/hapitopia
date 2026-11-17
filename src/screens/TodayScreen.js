import React, { useState, useRef } from 'react';
import { View, Pressable, ScrollView, StyleSheet, Animated } from 'react-native';
import HabitDetailModal from './HabitDetailModal';
import HabitEvidenceModal from './HabitEvidenceModal';
import { DIMS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';
import {
  AppText,
  Card,
  Chip,
  IconBubble,
  ProgressBar,
  CheckBubble,
  SectionHeader,
  EmptyState,
  space,
  radius,
  layout
} from '../design';

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
  B2_P0: 'sunny',                // Exposure to Sunlight & Do Warm Up Exercise
  B2_P1: 'water',                // Stay hydrated after brushing
  B2_P2: 'body',                 // Super brain yoga (21 max)
  B2_P3: 'nutrition',            // Eat Fresh fruits and vegetables
  B2_P4: 'moon',                 // Dinner before 7:00 PM and Sleep at 10:00 PM

  // BAT02 Dimension M: Mentally Strong
  B2_M0: 'telescope',            // Visualize Your Future Self
  B2_M1: 'phone-portrait',       // Digital Boundaries
  B2_M2: 'journal',              // Journaling my Small Goals & Gratitude
  B2_M3: 'shield',               // My Warrier Journey
  B2_M4: 'bed',                  // Clean workplace rituals

  // BAT02 Dimension I: Intellectually Sharp
  B2_I0: 'fitness',              // Practice 5 Random Brain Gym Exercise
  B2_I1: 'help-circle',          // Curiosity Questioning
  B2_I2: 'shapes',               // Memory Play (Words, Peg Words)
  B2_I3: 'extension-puzzle',     // Brain teasers
  B2_I4: 'bulb',                 // Memory Recall Exercise

  // BAT02 Dimension E: Emotionally Balanced
  B2_E0: 'thumbs-up',            // Active Appreciation
  B2_E1: 'heart',                // Daily Kind Act
  B2_E2: 'people',               // Family connect at dinner
  B2_E3: 'hand-left',            // Sorry fast, Forgive faster
  B2_E4: 'pause-circle',         // Pause button (S-R-R)

  // BAT02 Dimension F: Financially Wealthy
  B2_F0: 'wallet',               // Goal Piggy (Delayed Gratification)
  B2_F1: 'search',               // Price Detective
  B2_F2: 'git-compare',          // Need vs Want
  B2_F3: 'layers',               // 3 Jar Allocation System
  B2_F4: 'cash'                  // Learning Money Concept
};

export default function TodayScreen({ S, update, T }) {
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [evidenceHabit, setEvidenceHabit] = useState(null);
  const [activeDimFilter, setActiveDimFilter] = useState('ALL');
  const [showAllLibrary, setShowAllLibrary] = useState(false);
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

  const doneCount = doneToday.length;
  const totalCount = act.length;
  const remaining = Math.max(totalCount - doneCount, 0);
  const tierLabel = isBat02
    ? (lang === 'ta' ? `வாரம் ${bat02Week}/25` : `Week ${bat02Week} of 25`)
    : `${t.stages[S.age] || ''}`;
  const heroMessage = totalCount === 0
    ? ''
    : isSweep
      ? (lang === 'ta' ? 'அற்புதம்! இன்றைய அனைத்தும் முடிந்தது 🎉' : 'Amazing! You cleared every mission today 🎉')
      : doneCount === 0
        ? (lang === 'ta' ? 'உங்கள் முதல் பணியைத் தொடங்குங்கள்!' : "Let's start your first mission!")
        : (lang === 'ta' ? `இன்னும் ${remaining} மட்டுமே! தொடருங்கள்!` : `Only ${remaining} to go — keep it up!`);

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
      ? 'mic'
      : evObj?.type === 'video'
        ? 'videocam'
        : evObj?.type === 'photo'
          ? 'camera'
          : 'attach';
    const evLabel = evObj?.type === 'audio'
      ? (lang === 'ta' ? 'குரல்' : 'Audio')
      : evObj?.type === 'video'
        ? (lang === 'ta' ? 'வீடியோ' : 'Video')
        : evObj?.type === 'photo'
          ? (lang === 'ta' ? 'புகைப்படம்' : 'Photo')
          : (lang === 'ta' ? 'சான்று' : 'Proof');

    return (
      <Card
        key={h.id}
        variant={isDone ? 'tinted' : 'raised'}
        tint={dimColor}
        padding={space.md}
        style={activePop ? { borderColor: dimColor } : null}
      >
        <View style={styles.cardRow}>
          <Pressable
            style={styles.cardMain}
            onPress={() => setSelectedHabit(h)}
            accessibilityRole="button"
            accessibilityLabel={`${hData.name}. ${isDone ? 'Done' : 'Not done yet'}. Open habit chapter`}
          >
            <IconBubble name={habitIcon} color={dimColor} solid={isDone} />
            <View style={styles.cardContent}>
              <AppText variant="subheading" numberOfLines={2}>
                {hData.name}
              </AppText>
              <AppText variant="bodySm" tone="muted" numberOfLines={1}>
                {hData.desc || dimData.name}
              </AppText>
              <View style={styles.tagRow}>
                <Chip size="sm" icon={slotIcon} label={lang === 'ta' ? (h.d.slot_ta || h.d.slot) : h.d.slot} color={T.mu} />
                {isDone ? (
                  <Chip size="sm" icon={evIcon} label={evLabel} color={T.primary} />
                ) : (
                  <Chip size="sm" icon="star" label="+10 XP" color={T.secondary} />
                )}
              </View>
            </View>
          </Pressable>

          <View style={styles.checkAnchor}>
            <CheckBubble
              checked={isDone}
              color={dimColor}
              onPress={() => toggle(h.id)}
              accessibilityLabel={isDone ? `Review proof for ${hData.name}` : `Mark ${hData.name} as done`}
            />

            {activePop && popVal && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.popWrap,
                  {
                    opacity: popVal.interpolate({
                      inputRange: [0, 0.14, 0.68, 1],
                      outputRange: [0, 1, 1, 0]
                    }),
                    transform: [
                      {
                        translateY: popVal.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [6, -6, -18]
                        })
                      },
                      {
                        scale: popVal.interpolate({
                          inputRange: [0, 0.25, 0.68, 1],
                          outputRange: [0.6, 1.12, 1, 0.85]
                        })
                      }
                    ]
                  }
                ]}
              >
                <View style={[styles.popBox, { backgroundColor: T.secondaryFill, borderBottomColor: T.secondaryLedge }]}>
                  <AppText variant="label" color={T.onSecondary}>
                    +{activePop.earnedXp} XP
                  </AppText>
                </View>
              </Animated.View>
            )}
          </View>
        </View>
      </Card>
    );
  };

  const qHabits = filteredHabits.filter((h) => h.dimKey === 'Q');
  const growthHabits = filteredHabits.filter((h) => h.dimKey !== 'Q');
  const shouldSplitSections = isBat02 && activeDimFilter === 'ALL' && qHabits.length > 0 && growthHabits.length > 0;

  // iconProps: { dimKey } for a dimension, or { icon } for a stock glyph
  const renderGroupLabel = (iconProps, color, title, done, total) => (
    <View style={styles.groupLabel}>
      <Chip {...iconProps} label={title} color={color} />
      <AppText variant="label" tone="muted">
        {done}/{total} {lang === 'ta' ? 'முடிந்தது' : 'done'}
      </AppText>
    </View>
  );

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1. Today's adventure – progress hero */}
        <Card variant="tinted" tint={T.primary} padding={space.lg}>
          <View style={styles.heroTop}>
            <View style={styles.heroText}>
              <Chip size="sm" icon={isBat02 ? 'calendar' : 'ribbon'} label={tierLabel} color={T.tertiary} />
              <AppText variant="display" style={styles.heroTitle}>
                {lang === 'ta' ? 'இன்றைய சாகசம்' : "Today's Adventure"}
              </AppText>
              <AppText variant="body" tone="muted">
                {heroMessage}
              </AppText>
            </View>
            <View
              style={[styles.heroCounter, { backgroundColor: T.card, borderColor: T.primary + '40', borderBottomColor: T.primary + '70' }]}
              accessible
              accessibilityLabel={`${doneCount} of ${totalCount} missions done`}
            >
              <AppText variant="display" tone="primary" style={styles.heroCount}>
                {doneCount}
              </AppText>
              <AppText variant="caption" tone="muted">
                {lang === 'ta' ? `/ ${totalCount}` : `of ${totalCount}`}
              </AppText>
            </View>
          </View>
          <ProgressBar
            value={totalCount ? doneCount / totalCount : 0}
            height={16}
            trackColor={T.card}
            style={styles.heroBar}
            accessibilityLabel={`${doneCount} of ${totalCount} missions done`}
          />
        </Card>

        {/* 2. Dimension filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
          style={styles.filterScroll}
        >
          <Chip
            icon="apps"
            label={`${lang === 'ta' ? 'அனைத்தும்' : 'All'} · ${baseHabits.length}`}
            color={T.tx}
            selected={activeDimFilter === 'ALL'}
            onPress={() => setActiveDimFilter('ALL')}
          />
          {(all35.length > 0 ? batchDims : []).map((d) => {
            const dimColor = T.dimColors[d.k] || d.c[T.ci];
            const dimData = (t.dims && t.dims[d.k]) || { name: d.n };
            const habitsInDim = baseHabits.filter((h) => h.dimKey === d.k);
            // Hide dimensions with nothing unlocked yet (e.g. early BAT02 weeks).
            if (habitsInDim.length === 0 && activeDimFilter !== d.k) return null;
            const doneInDim = habitsInDim.filter((h) => doneToday.includes(h.id)).length;
            return (
              <Chip
                key={d.k}
                dimKey={d.k}
                label={`${shortDimName(dimData.name)} · ${doneInDim}/${habitsInDim.length}`}
                accessibilityLabel={`${dimData.name}, ${doneInDim} of ${habitsInDim.length} done`}
                color={dimColor}
                selected={activeDimFilter === d.k}
                onPress={() => setActiveDimFilter(d.k)}
              />
            );
          })}
        </ScrollView>

        {/* 3. Missions */}
        <SectionHeader
          title={lang === 'ta' ? 'தினசரி பணிகள்' : 'My Missions'}
          icon="rocket"
          iconColor={T.secondary}
        />

        {all35.length > 0 && act.length < all35.length && (
          <View style={styles.modeRow}>
            <Chip
              icon="flash"
              label={isBat02
                ? (lang === 'ta' ? `இந்த வாரம் (${act.length})` : `This week (${act.length})`)
                : (lang === 'ta' ? `என் நிலை (${act.length})` : `My level (${act.length})`)}
              color={T.primary}
              selected={!showAllLibrary}
              onPress={() => setShowAllLibrary(false)}
            />
            <Chip
              icon="library"
              label={isBat02
                ? (lang === 'ta' ? 'அனைத்து 30' : 'All 30 habits')
                : (lang === 'ta' ? 'அனைத்து 35' : 'All 35 habits')}
              color={T.purple}
              selected={showAllLibrary}
              onPress={() => setShowAllLibrary(true)}
            />
          </View>
        )}

        {filteredHabits.length === 0 ? (
          <EmptyState
            icon="leaf-outline"
            title={lang === 'ta' ? 'விரைவில் வருகிறது!' : 'Coming soon!'}
            message={lang === 'ta'
              ? `${S?.batch || 'BAT'} பழக்கங்கள் விரைவில் சேர்க்கப்படும்.`
              : `Habits for ${S?.batch || 'your batch'} will appear here soon.`}
          />
        ) : shouldSplitSections ? (
          <View style={styles.cardList}>
            {renderGroupLabel(
              { dimKey: 'Q' },
              T.dimColors.Q,
              lang === 'ta' ? 'Q பவர் பழக்கங்கள்' : 'Q Power Habits',
              qHabits.filter((h) => doneToday.includes(h.id)).length,
              qHabits.length
            )}
            {qHabits.map(renderHabitCard)}
            <View style={styles.groupGap} />
            {renderGroupLabel(
              { icon: 'trending-up' },
              T.primary,
              lang === 'ta' ? `வளர்ச்சிப் பழக்கங்கள்` : 'Growth Habits',
              growthHabits.filter((h) => doneToday.includes(h.id)).length,
              growthHabits.length
            )}
            {growthHabits.map(renderHabitCard)}
          </View>
        ) : (
          <View style={styles.cardList}>{filteredHabits.map(renderHabitCard)}</View>
        )}

        {/* 4. Clean-sweep reward */}
        <Card variant={isSweep ? 'tinted' : 'raised'} tint={T.secondary} style={styles.sweepCard}>
          <View style={styles.sweepRow}>
            <IconBubble name={isSweep ? 'gift' : 'gift-outline'} color={T.secondary} size="lg" solid={isSweep} />
            <View style={styles.sweepText}>
              <View style={styles.sweepTitleRow}>
                <AppText variant="heading" style={styles.flexShrink}>
                  {lang === 'ta' ? 'தினசரி போனஸ்' : 'Clean Sweep Bonus'}
                </AppText>
                <Chip size="sm" icon="star" label="+20 XP" color={T.secondary} selected={isSweep} />
              </View>
              <AppText variant="bodySm" tone="muted">
                {isSweep
                  ? (lang === 'ta' ? `அனைத்து ${totalCount} பழக்கங்களும் முடிந்தன! போனஸ் திறக்கப்பட்டது!` : `All ${totalCount} missions done — bonus unlocked!`)
                  : (lang === 'ta' ? `போனஸைத் திறக்க இன்னும் ${remaining} பணிகள்!` : `Finish ${remaining} more ${remaining === 1 ? 'mission' : 'missions'} to open your gift!`)}
              </AppText>
            </View>
          </View>
        </Card>

        <HabitDetailModal
          visible={!!selectedHabit}
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
          S={S}
          T={T}
        />

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

// "Physically Healthy" → "Physically" keeps filter chips short for small screens.
function shortDimName(name = '') {
  const first = String(name).split(/\s+/)[0];
  return first.length >= 3 ? first : name;
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  container: {
    paddingHorizontal: space.lg,
    paddingTop: space.xs,
    paddingBottom: space.huge,
    gap: space.lg,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center'
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md
  },
  heroText: {
    flex: 1,
    minWidth: 0,
    gap: space.xs
  },
  heroTitle: {
    marginTop: space.xs
  },
  heroCounter: {
    width: 76,
    height: 76,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderBottomWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroCount: {
    fontSize: 32,
    lineHeight: 36
  },
  heroBar: {
    marginTop: space.lg
  },
  filterScroll: {
    marginHorizontal: -space.lg
  },
  filterRow: {
    paddingHorizontal: space.lg,
    gap: space.sm
  },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
    marginTop: -space.sm
  },
  cardList: {
    gap: space.md
  },
  groupLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  groupGap: {
    height: space.sm
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm
  },
  cardMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minWidth: 0
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
    gap: 2
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.xs + 2,
    marginTop: space.xs + 2
  },
  checkAnchor: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  popWrap: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
    zIndex: 10
  },
  popBox: {
    paddingHorizontal: space.sm + 2,
    paddingVertical: space.xs,
    borderRadius: radius.pill,
    borderBottomWidth: 3
  },
  sweepCard: {
    marginTop: space.xs
  },
  sweepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md
  },
  sweepText: {
    flex: 1,
    minWidth: 0,
    gap: space.xs
  },
  sweepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm
  },
  flexShrink: {
    flexShrink: 1
  }
});
