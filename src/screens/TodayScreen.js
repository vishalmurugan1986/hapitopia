import React, { useState, useRef } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HabitDetailModal from './HabitDetailModal';
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
  I2: 'extension-puzzle',  // Memory Play
  I3: 'people',            // Teach to Learn
  I4: 'calculator',        // Math in Life
  I5: 'color-palette',     // Create Not Consume
  I6: 'telescope',         // Weekly Deep Dive

  // Dimension E: Emotionally Balanced (Heart with IQ)
  E0: 'chatbubble-ellipses', // Name the Feeling
  E1: 'heart',             // Kind Act Daily
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
  F6: 'ribbon'             // Value Creation
};

export default function TodayScreen({ S, update, T }) {
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [activeDimFilter, setActiveDimFilter] = useState('ALL');
  const [showAllLibrary, setShowAllLibrary] = useState(false);
  // Per-habit floating +10 XP pop state keyed by habit ID
  const [habitPops, setHabitPops] = useState({});
  const habitAnimsRef = useRef({});

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const todayStr = L.todayS();
  const act = L.activeHabits(S);
  const all35 = L.allHabits();
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

  const toggle = (id) => {
    const list = L.doneOn(S, todayStr);
    const isNowDone = !list.includes(id);
    const nextList = isNowDone ? [...list, id] : list.filter((x) => x !== id);
    const unlockedSweepNow = isNowDone && nextList.length === act.length && !sweepCollected;

    if (isNowDone) {
      triggerHaptic('success');
      const habitObj = all35.find((x) => x.id === id) || act.find((x) => x.id === id);
      const dimKey = habitObj?.dimKey || id.charAt(0) || 'P';
      const dimColor = T.dimColors?.[dimKey] || '#10B981';
      const dimName = (t.dims && t.dims[dimKey]?.name) || habitObj?.d?.n || 'Growth';

      spawnHabitXpPop(id, dimColor, dimName, unlockedSweepNow);
    } else {
      triggerHaptic('medium');
      if (habitAnimsRef.current[id]) {
        habitAnimsRef.current[id].stopAnimation();
      }
      setHabitPops((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }

    const nextS = {
      ...S,
      done: {
        ...(S.done || {}),
        [todayStr]: nextList
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
                  {t.stages[S.age]} · {lang === 'ta' ? `நிலை ${Math.min(currentLvl, 10)}` : `TIER ${Math.min(currentLvl, 10)}`}
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
                {lang === 'ta' ? '5×7 பழக்க முறை' : '5×7 Habit System'}
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
            {DIMS.map((d) => {
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
                      borderColor: isSelected ? dimColor : T.line,
                      backgroundColor: isSelected ? dimColor + '20' : T.card
                    }
                  ]}
                >
                  <View style={[styles.filterDot, { backgroundColor: dimColor }]} />
                  <Text
                    style={[
                      styles.filterText,
                      {
                        color: isSelected ? dimColor : T.mu,
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

        {/* 3. Daily Habit Mission Cards */}
        <View style={styles.missionsHeader}>
          <Text style={[styles.sectionTitle, { color: T.tx, marginBottom: 8 }]} numberOfLines={1}>
            {showAllLibrary
              ? (lang === 'ta' ? '35 பழக்க நூலகம்' : 'All 35 Habits Library')
              : (lang === 'ta' ? 'இன்றைய இலக்குகள்' : 'Daily Missions')}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            {act.length < 35 ? (
              <Pressable
                onPress={() => {
                  triggerHaptic('light');
                  setShowAllLibrary(!showAllLibrary);
                }}
                style={[
                  styles.statusChip,
                  {
                    backgroundColor: showAllLibrary ? T.tertiary + '20' : T.cardElevated,
                    borderColor: showAllLibrary ? T.tertiary : T.line,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    flexShrink: 1
                  }
                ]}
              >
                <Ionicons
                  name={showAllLibrary ? 'checkmark-done-outline' : 'library-outline'}
                  size={12}
                  color={showAllLibrary ? T.tertiary : T.mu}
                />
                <Text
                  style={[styles.statusChipText, { color: showAllLibrary ? T.tertiary : T.mu, flexShrink: 1 }]}
                  numberOfLines={1}
                >
                  {showAllLibrary
                    ? (lang === 'ta' ? `என் நிலை (${act.length})` : `My Tier (${act.length})`)
                    : (lang === 'ta' ? 'அனைத்து 35' : 'All 35')}
                </Text>
              </Pressable>
            ) : <View />}
            <View style={[styles.statusChip, { backgroundColor: T.cardElevated, borderColor: T.line, flexShrink: 0 }]}>
              <Text style={[styles.statusChipText, { color: T.primary }]} numberOfLines={1}>
                {doneToday.length}/{act.length} {lang === 'ta' ? 'முடிந்தது' : 'Completed'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardList}>
          {filteredHabits.map((h) => {
            const isDone = doneToday.includes(h.id);
            const dimColor = T.dimColors[h.dimKey] || h.d.c[T.ci];
            const hData = (t.habits && t.habits[h.id]) || { name: h.n, desc: h.s };
            const dimData = (t.dims && t.dims[h.dimKey]) || { name: h.d.n };
            const slotIcon = slotIcons[h.d.slot] || 'time-outline';
            const habitIcon = HABIT_ICONS[h.id] || 'sparkles';
            const activePop = habitPops[h.id];
            const popVal = habitAnimsRef.current[h.id];

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
                  {/* Custom Thematic Daily Mission Icon Badge */}
                  <View
                    style={[
                      styles.dimIconBox,
                      {
                        backgroundColor: isDone ? dimColor + '26' : dimColor + '16',
                        borderColor: isDone ? dimColor : dimColor + '45'
                      }
                    ]}
                  >
                    <Ionicons name={habitIcon} size={22} color={dimColor} />
                  </View>

                  {/* Content Area */}
                  <View style={styles.cardContent}>
                    {/* Micro Badges Row */}
                    <View style={styles.microBadgesRow}>
                      <View style={[styles.slotBadge, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                        <Ionicons name={slotIcon} size={11} color={T.mu} />
                        <Text style={[styles.slotBadgeText, { color: T.mu }]}>
                          {lang === 'ta' ? (h.d.slot_ta || h.d.slot) : h.d.slot}
                        </Text>
                      </View>
                      <View style={[styles.xpBadge, { backgroundColor: dimColor + '18', borderColor: dimColor + '55' }]}>
                        <Text style={[styles.xpBadgeText, { color: dimColor }]}>+10 XP</Text>
                      </View>
                    </View>

                    {/* Habit Name (English + Tamil) */}
                    <Text style={[styles.habitName, { color: T.tx }]} numberOfLines={1}>
                      {hData.name}
                    </Text>
                    <Text style={[styles.habitDesc, { color: T.mu }]} numberOfLines={1}>
                      {hData.desc || dimData.name}
                    </Text>
                  </View>

                  {/* Tactile Completion Checkbox + Compact +10 XP Badge Matching Respective Habit Color */}
                  <View style={styles.checkboxAnchor}>
                    <Pressable
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: isDone }}
                      onPress={() => toggle(h.id)}
                      hitSlop={10}
                      style={[
                        styles.checkboxBtn,
                        {
                          borderColor: isDone ? dimColor : T.lineHigh,
                          backgroundColor: isDone ? dimColor : 'transparent'
                        }
                      ]}
                    >
                      {isDone ? (
                        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
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
          })}
        </View>

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
                <View style={[styles.bonusTag, { backgroundColor: T.secondary + '20', borderColor: T.secondary + '60' }]}>
                  <Text style={[styles.bonusTagText, { color: T.secondary }]}>+20 XP</Text>
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
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  statusChip: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8
  },
  statusChipText: {
    fontSize: 11,
    fontWeight: '800'
  },
  cardList: {
    gap: 12,
    marginBottom: 16
  },
  missionCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    position: 'relative',
    overflow: 'visible'
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12
  },
  dimIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContent: {
    flex: 1,
    minWidth: 0
  },
  microBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4
  },
  slotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  slotBadgeText: {
    fontSize: 10,
    fontWeight: '600'
  },
  xpBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  xpBadgeText: {
    fontSize: 10,
    fontWeight: '800'
  },
  habitName: {
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: '800',
    letterSpacing: -0.2
  },
  habitDesc: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    marginTop: 1
  },
  checkboxAnchor: {
    width: 56,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible'
  },
  checkboxBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
