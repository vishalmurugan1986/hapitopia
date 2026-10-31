import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DIMS, DIM_RUBRICS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';

export default function ReportCardsScreen({ S, update, T, initialSubTab = 'rubrics' }) {
  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [activeTab, setActiveTab] = useState(initialSubTab); // 'rubrics' | 'review'
  const [expandedDim, setExpandedDim] = useState(null);

  // Future-Proof CEO index
  const fpIndex = L.futureProofIndex(S);

  // Monthly review state
  const currentMonthKey = L.monthS();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthKey);
  const monthlyData = (S.monthly && S.monthly[selectedMonth]) || {
    wins: ['', '', ''],
    challenges: '',
    lessons: '',
    goals: '',
    parentObs: '',
    teacherObs: '',
    completed: false
  };

  const bonusKey = `review-${selectedMonth}`;
  const isAwarded = !!(S.bonus && S.bonus[bonusKey]);

  const toggleExpand = (key) => {
    setExpandedDim(expandedDim === key ? null : key);
  };

  const shiftMonth = (delta) => {
    triggerHaptic('light');
    const [yr, mo] = selectedMonth.split('-').map(Number);
    const d = new Date(yr, (mo - 1) + delta, 1);
    const nextKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (nextKey <= currentMonthKey) {
      setSelectedMonth(nextKey);
    }
  };

  const updateMonthField = (patch) => {
    if (!update) return;
    update({
      ...S,
      monthly: {
        ...(S.monthly || {}),
        [selectedMonth]: {
          ...monthlyData,
          ...patch
        }
      }
    });
  };

  const getWin = (index) => (monthlyData.wins && monthlyData.wins[index]) || '';
  const setWin = (index, val) => {
    const list = [...((monthlyData.wins && monthlyData.wins.length === 3) ? monthlyData.wins : ['', '', ''])];
    list[index] = val;
    updateMonthField({ wins: list });
  };

  const handleSaveMonthlyReview = () => {
    triggerHaptic('success');
    const nextBonus = isAwarded
      ? S.bonus || {}
      : { ...(S.bonus || {}), [bonusKey]: 150 };

    if (update) {
      update({
        ...S,
        monthly: {
          ...(S.monthly || {}),
          [selectedMonth]: {
            ...monthlyData,
            completed: true
          }
        },
        bonus: nextBonus
      });
    }

    Alert.alert(
      lang === 'ta' ? 'அருமை!' : 'Great Job!',
      lang === 'ta'
        ? 'மாதாந்திர வளர்ச்சி ஆய்வு சேமிக்கப்பட்டது! (+150 XP)'
        : 'Monthly Growth Review saved successfully! (+150 XP)'
    );
  };

  const dimVectorIcons = {
    P: 'fitness-outline',
    M: 'compass-outline',
    I: 'bulb-outline',
    E: 'shield-checkmark-outline',
    F: 'wallet-outline'
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollPad}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerBlock}>
        <View style={styles.badgeRow}>
          <Ionicons name="trending-up" size={14} color={T.primary} />
          <Text style={[styles.badgeText, { color: T.primary }]}>
            {lang === 'ta' ? 'பிரிவு 6 & 7' : 'SECTION 6 & 7'}
          </Text>
        </View>
        <Text style={[styles.title, { color: T.tx }]}>
          {lang === 'ta' ? 'வளர்ச்சி & செயல்திறன் மதிப்பீடு' : 'Growth & Diagnostic Mastery'}
        </Text>
        <Text style={[styles.subtitle, { color: T.mu }]}>
          {lang === 'ta' ? '5 பரிமாண அறிக்கை அட்டை மற்றும் 30-நாள் மாதாந்திர ஆய்வு' : 'Dimension Report Cards and 30-Day Monthly Review'}
        </Text>
      </View>

      {/* Segmented Switcher */}
      <View style={[styles.tabBar, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
        <Pressable
          onPress={() => setActiveTab('rubrics')}
          style={[
            styles.tabItem,
            activeTab === 'rubrics' && {
              backgroundColor: T.cardElevated || T.card,
              borderColor: T.primary + '50',
              borderWidth: 1
            }
          ]}
        >
          <Ionicons
            name="stats-chart"
            size={14}
            color={activeTab === 'rubrics' ? T.primary : T.mu}
          />
          <Text
            style={[
              styles.tabItemText,
              { color: activeTab === 'rubrics' ? T.tx : T.mu, fontWeight: activeTab === 'rubrics' ? '800' : '600' }
            ]}
            numberOfLines={1}
          >
            {lang === 'ta' ? 'மதிப்பீட்டு அட்டை' : 'Report Cards (Sec 7)'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('review')}
          style={[
            styles.tabItem,
            activeTab === 'review' && {
              backgroundColor: T.cardElevated || T.card,
              borderColor: T.secondary + '50',
              borderWidth: 1
            }
          ]}
        >
          <Ionicons
            name="reader"
            size={14}
            color={activeTab === 'review' ? T.secondary : T.mu}
          />
          <Text
            style={[
              styles.tabItemText,
              { color: activeTab === 'review' ? T.tx : T.mu, fontWeight: activeTab === 'review' ? '800' : '600' }
            ]}
            numberOfLines={1}
          >
            {lang === 'ta' ? 'மாதாந்திர ஆய்வு' : 'Monthly Review (Sec 6)'}
          </Text>
        </Pressable>
      </View>

      {/* VIEW 1: Dimension Report Cards (Section 7) */}
      {activeTab === 'rubrics' && (
        <View style={styles.viewBlock}>
          {/* Hero Future-Proof CEO Index Card */}
          <View
            style={[
              styles.heroIndexCard,
              {
                backgroundColor: T.cardElevated || T.card,
                borderColor: fpIndex.isCeoReady ? T.primary : T.secondary
              }
            ]}
          >
            <View style={styles.ceoBadgeRow}>
              <Ionicons name="ribbon" size={16} color={T.secondary} />
              <Text style={[styles.heroIndexTitle, { color: T.secondary }]}>
                {t.ceoReadinessTitle}
              </Text>
            </View>
            <Text style={[styles.heroIndexQuote, { color: T.tx }]}>
              {t.ceoQuote}
            </Text>

            <View style={styles.indexScoreRow}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={[styles.indexNumber, { color: T.tx }]}>
                  {fpIndex.index}%
                </Text>
                <Text style={[styles.indexCaption, { color: T.mu }]}>
                  {lang === 'ta' ? 'முழுமையான தகுதி நிலை' : 'Overall Index Score'}
                </Text>
              </View>

              <View
                style={[
                  styles.statusChip,
                  {
                    backgroundColor: fpIndex.isCeoReady ? T.primary + '20' : T.secondary + '20',
                    borderColor: fpIndex.isCeoReady ? T.primary : T.secondary
                  }
                ]}
              >
                <Ionicons
                  name={fpIndex.isCeoReady ? 'checkmark-circle' : 'hourglass-outline'}
                  size={14}
                  color={fpIndex.isCeoReady ? T.primary : T.secondary}
                />
                <Text
                  style={[
                    styles.statusChipText,
                    { color: fpIndex.isCeoReady ? T.primary : T.secondary }
                  ]}
                >
                  {fpIndex.isCeoReady
                    ? (lang === 'ta' ? 'CEO தகுதி பெற்றார் (≥60%)' : 'CEO Ready (≥60%)')
                    : (lang === 'ta' ? 'முன்னேறி வருகிறார்' : 'In Progress (<60%)')}
                </Text>
              </View>
            </View>

            {/* CEO Rule Progress Rail */}
            <View style={[styles.ceoRail, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
              <View
                style={[
                  styles.ceoFill,
                  {
                    width: `${Math.min(100, Math.max(fpIndex.index, 4))}%`,
                    backgroundColor: fpIndex.isCeoReady ? T.primary : T.secondary
                  }
                ]}
              />
            </View>
          </View>

          {/* 5 Dimension Rubric Cards */}
          <View style={styles.dimensionsList}>
            {DIMS.map((d) => {
              const dimColor = T.dimColors[d.k] || d.c[T.ci];
              const rubric = DIM_RUBRICS[d.k] || {};
              const dimData = (t.dims && t.dims[d.k]) || { name: d.n, tagline: d.t };
              const dimScore = (fpIndex.breakdown && fpIndex.breakdown[d.k]) || 0;
              const isExpanded = expandedDim === d.k;
              const dimIcon = dimVectorIcons[d.k] || 'ellipse-outline';

              // Determine diagnostic tier
              const tierKey =
                dimScore >= 86
                  ? 'master'
                  : dimScore >= 66
                    ? 'proficient'
                    : dimScore >= 41
                      ? 'developing'
                      : 'beginner';

              const tierName = (t.performanceLevels && t.performanceLevels[tierKey]) || tierKey;

              return (
                <View
                  key={d.k}
                  style={[
                    styles.dimCard,
                    {
                      backgroundColor: T.card,
                      borderColor: isExpanded ? dimColor : T.line,
                      borderLeftColor: dimColor,
                      borderLeftWidth: 4
                    }
                  ]}
                >
                  <Pressable
                    onPress={() => toggleExpand(d.k)}
                    style={styles.dimCardHeader}
                    accessibilityRole="button"
                    accessibilityLabel={`Toggle rubric for ${dimData.name}`}
                  >
                    <View style={[styles.dimIconBox, { backgroundColor: dimColor + '18', borderColor: dimColor + '40' }]}>
                      <Ionicons name={dimIcon} size={18} color={dimColor} />
                    </View>

                    <View style={styles.dimCardHeaderContent}>
                      <Text style={[styles.dimNameText, { color: T.tx }]}>
                        {dimData.name}
                      </Text>
                      <Text style={[styles.dimTaglineText, { color: T.mu }]}>
                        {dimData.tagline}
                      </Text>
                    </View>

                    <View style={styles.dimScoreBox}>
                      <Text style={[styles.dimScoreText, { color: dimColor }]}>
                        {dimScore}%
                      </Text>
                      <View style={[styles.dimTierBadge, { backgroundColor: dimColor + '18', borderColor: dimColor + '40' }]}>
                        <Text style={[styles.dimTierText, { color: dimColor }]}>
                          {lang === 'ta'
                            ? ({ beginner: 'தொடக்கம்', developing: 'வளர்ச்சி', proficient: 'திறமை', master: 'நிபுணர்' }[tierKey] || tierKey.toUpperCase())
                            : tierKey.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </Pressable>

                  {/* Expanded 4-Level Diagnostic Rubric */}
                  {isExpanded && (
                    <View style={[styles.expandedRubric, { borderTopColor: T.line }]}>
                      <Text style={[styles.rubricHeading, { color: T.tx }]}>
                        {t.rubricCriteria || (lang === 'ta' ? 'செயல்திறன் நிலைகள்' : 'Performance Rubric Levels')}
                      </Text>

                      {['beginner', 'developing', 'proficient', 'master'].map((lvl) => {
                        const isCurrentLvl = lvl === tierKey;
                        const levelTitle = (t.performanceLevels && t.performanceLevels[lvl]) || lvl;
                        const criteriaText = (lang === 'ta' && rubric.ta && rubric.ta[lvl]) ? rubric.ta[lvl] : (rubric[lvl] || '');

                        return (
                          <View
                            key={lvl}
                            style={[
                              styles.rubricTierItem,
                              {
                                backgroundColor: isCurrentLvl ? dimColor + '14' : T.surfaceLowest || '#060E20',
                                borderColor: isCurrentLvl ? dimColor : T.line
                              }
                            ]}
                          >
                            <View style={styles.rubricTierHeader}>
                              <Ionicons
                                name={isCurrentLvl ? 'radio-button-on' : 'radio-button-off'}
                                size={14}
                                color={isCurrentLvl ? dimColor : T.mu}
                              />
                              <Text
                                style={[
                                  styles.rubricTierTitle,
                                  { color: isCurrentLvl ? dimColor : T.tx, fontWeight: isCurrentLvl ? '800' : '600' }
                                ]}
                              >
                                {levelTitle}
                              </Text>
                              {isCurrentLvl && (
                                <View style={[styles.currentTag, { backgroundColor: dimColor }]}>
                                  <Text style={styles.currentTagText}>
                                    {lang === 'ta' ? 'தற்போதைய' : 'CURRENT'}
                                  </Text>
                                </View>
                              )}
                            </View>
                            <Text style={[styles.rubricCriteriaDesc, { color: T.mu }]}>
                              {criteriaText}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* VIEW 2: Monthly Growth Review (Section 6) */}
      {activeTab === 'review' && (
        <View style={styles.viewBlock}>
          {/* Header Card */}
          <View
            style={[
              styles.reviewHeroCard,
              {
                backgroundColor: T.cardElevated || T.card,
                borderColor: T.lineHigh
              }
            ]}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <View style={styles.badgeRow}>
                <Ionicons name="calendar-outline" size={14} color={T.secondary} />
                <Text style={[styles.badgeText, { color: T.secondary }]}>
                  {lang === 'ta' ? 'பிரிவு 6' : 'SECTION 6'}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Pressable
                  onPress={() => shiftMonth(-1)}
                  hitSlop={8}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: T.line,
                    backgroundColor: T.surfaceLowest || '#060E20',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Ionicons name="chevron-back" size={14} color={T.tx} />
                </Pressable>
                <Text style={{ fontSize: 12, fontWeight: '800', color: T.secondary }}>{selectedMonth}</Text>
                <Pressable
                  disabled={selectedMonth >= currentMonthKey}
                  onPress={() => shiftMonth(1)}
                  hitSlop={8}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: T.line,
                    backgroundColor: T.surfaceLowest || '#060E20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: selectedMonth >= currentMonthKey ? 0.35 : 1
                  }}
                >
                  <Ionicons name="chevron-forward" size={14} color={T.tx} />
                </Pressable>
              </View>
            </View>
            <Text style={[styles.reviewHeroTitle, { color: T.tx }]}>
              {t.monthlyReviewTitle}
            </Text>
            <Text style={[styles.reviewHeroSubtitle, { color: T.mu }]}>
              {t.monthlyReviewSubtitle}
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            {/* 1. Top 3 Wins */}
            <View style={[styles.formCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.formCardHeader}>
                <Ionicons name="trophy-outline" size={16} color={T.primary} />
                <Text style={[styles.formCardTitle, { color: T.tx }]}>{t.topWins}</Text>
              </View>
              {[0, 1, 2].map((idx) => (
                <View key={idx} style={styles.winInputRow}>
                  <Text style={[styles.winNum, { color: T.primary }]}>#{idx + 1}</Text>
                  <TextInput
                    style={[styles.singleLineInput, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20', color: T.tx }]}
                    placeholder={idx === 0 ? t.winPlaceholder : `${t.topWins} ${idx + 1}...`}
                    placeholderTextColor={T.mu}
                    value={getWin(idx)}
                    onChangeText={(val) => setWin(idx, val)}
                  />
                </View>
              ))}
            </View>

            {/* 2. Biggest Challenges */}
            <View style={[styles.formCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.formCardHeader}>
                <Ionicons name="alert-circle-outline" size={16} color={T.secondary} />
                <Text style={[styles.formCardTitle, { color: T.tx }]}>{t.challenges}</Text>
              </View>
              <TextInput
                style={[styles.multilineInput, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20', color: T.tx }]}
                multiline
                placeholder={t.challengesPlaceholder}
                placeholderTextColor={T.mu}
                value={monthlyData.challenges || ''}
                onChangeText={(val) => updateMonthField({ challenges: val })}
              />
            </View>

            {/* 3. Fail Fast Lessons */}
            <View style={[styles.formCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.formCardHeader}>
                <Ionicons name="bulb-outline" size={16} color={T.tertiary} />
                <Text style={[styles.formCardTitle, { color: T.tx }]}>{t.lessonsLearned}</Text>
              </View>
              <TextInput
                style={[styles.multilineInput, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20', color: T.tx }]}
                multiline
                placeholder={t.lessonsPlaceholder}
                placeholderTextColor={T.mu}
                value={monthlyData.lessons || ''}
                onChangeText={(val) => updateMonthField({ lessons: val })}
              />
            </View>

            {/* 4. Next Month Goals */}
            <View style={[styles.formCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.formCardHeader}>
                <Ionicons name="flag-outline" size={16} color={T.purple} />
                <Text style={[styles.formCardTitle, { color: T.tx }]}>{t.nextMonthGoals}</Text>
              </View>
              <TextInput
                style={[styles.multilineInput, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20', color: T.tx }]}
                multiline
                placeholder={t.goalsPlaceholder}
                placeholderTextColor={T.mu}
                value={monthlyData.goals || ''}
                onChangeText={(val) => updateMonthField({ goals: val })}
              />
            </View>

            {/* 5. Parent Observations */}
            <View style={[styles.formCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.formCardHeader}>
                <Ionicons name="home-outline" size={16} color={T.rose} />
                <Text style={[styles.formCardTitle, { color: T.tx }]}>{t.parentObs}</Text>
              </View>
              <TextInput
                style={[styles.multilineInput, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20', color: T.tx }]}
                multiline
                placeholder={t.parentObsPlaceholder}
                placeholderTextColor={T.mu}
                value={monthlyData.parentObs || ''}
                onChangeText={(val) => updateMonthField({ parentObs: val })}
              />
            </View>

            {/* 6. Teacher Observations */}
            <View style={[styles.formCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.formCardHeader}>
                <Ionicons name="school-outline" size={16} color={T.tertiary} />
                <Text style={[styles.formCardTitle, { color: T.tx }]}>{t.teacherObs}</Text>
              </View>
              <TextInput
                style={[styles.multilineInput, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20', color: T.tx }]}
                multiline
                placeholder={t.teacherObsPlaceholder}
                placeholderTextColor={T.mu}
                value={monthlyData.teacherObs || ''}
                onChangeText={(val) => updateMonthField({ teacherObs: val })}
              />
            </View>

            {/* Save Monthly Review Button */}
            <Pressable
              onPress={handleSaveMonthlyReview}
              style={[
                styles.saveReviewBtn,
                {
                  backgroundColor: T.primary,
                  shadowColor: T.primary
                }
              ]}
            >
              <Ionicons name="checkmark-done" size={18} color="#FFFFFF" />
              <Text style={styles.saveReviewBtnText}>{t.saveReviewBtn}</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  scrollPad: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 36
  },
  headerBlock: {
    marginBottom: 14
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 2
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 17
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    padding: 3,
    marginBottom: 16
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 11
  },
  tabItemText: {
    fontSize: 12,
    flexShrink: 1
  },
  viewBlock: {
    gap: 14
  },
  heroIndexCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 2
  },
  ceoBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4
  },
  heroIndexTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    flex: 1
  },
  heroIndexQuote: {
    fontSize: 12.5,
    lineHeight: 17,
    fontStyle: 'italic',
    marginBottom: 14
  },
  indexScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  indexNumber: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5
  },
  indexCaption: {
    fontSize: 11,
    fontWeight: '500'
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexShrink: 0
  },
  statusChipText: {
    fontSize: 11.5,
    fontWeight: '800'
  },
  ceoRail: {
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden'
  },
  ceoFill: {
    height: '100%',
    borderRadius: 4
  },
  dimensionsList: {
    gap: 10
  },
  dimCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden'
  },
  dimCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
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
  dimCardHeaderContent: {
    flex: 1,
    minWidth: 0
  },
  dimNameText: {
    fontSize: 14,
    fontWeight: '800'
  },
  dimTaglineText: {
    fontSize: 11.5,
    marginTop: 1
  },
  dimScoreBox: {
    alignItems: 'flex-end',
    gap: 2
  },
  dimScoreText: {
    fontSize: 15,
    fontWeight: '900'
  },
  dimTierBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 5
  },
  dimTierText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  expandedRubric: {
    borderTopWidth: 1,
    padding: 12,
    gap: 8
  },
  rubricHeading: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2
  },
  rubricTierItem: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10
  },
  rubricTierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3
  },
  rubricTierTitle: {
    fontSize: 12,
    flex: 1
  },
  currentTag: {
    borderRadius: 4,
    paddingVertical: 1,
    paddingHorizontal: 5
  },
  currentTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  rubricCriteriaDesc: {
    fontSize: 11.5,
    lineHeight: 16
  },
  reviewHeroCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14
  },
  reviewHeroTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  reviewHeroSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2
  },
  formSection: {
    gap: 12
  },
  formCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12
  },
  formCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8
  },
  formCardTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    flex: 1
  },
  winInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  },
  winNum: {
    fontSize: 12,
    fontWeight: '800',
    width: 22
  },
  singleLineInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12.5
  },
  multilineInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 12.5,
    minHeight: 52,
    textAlignVertical: 'top'
  },
  saveReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 12,
    marginTop: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3
  },
  saveReviewBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800'
  }
});
