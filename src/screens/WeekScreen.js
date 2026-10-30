import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DailyLogModal from './DailyLogModal';
import { DIMS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';

export default function WeekScreen({ S, update, T }) {
  const [showLog, setShowLog] = useState(false);
  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const sc = L.weekScore(S);
  const act = L.activeHabits(S);
  const w0 = L.weekDays()[0];
  const wd = L.weekDays();
  const todayStr = L.todayS();
  const isSunday = new Date().getDay() === 0;

  // Toggle habit on any specific day in the 5x7 matrix
  const toggleMatrixCell = (habitId, dateStr) => {
    triggerHaptic('light');
    const dayList = L.doneOn(S, dateStr);
    const nextList = dayList.includes(habitId)
      ? dayList.filter((x) => x !== habitId)
      : [...dayList, habitId];

    update({
      ...S,
      done: {
        ...(S.done || {}),
        [dateStr]: nextList
      }
    });
  };

  const dayHeaders = lang === 'ta'
    ? ['தி', 'செ', 'பு', 'வி', 'வெ', 'ச', 'ஞா']
    : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Medal progress calculation
  const nextTarget = sc.scaledScore >= 300 ? 350 : sc.scaledScore >= 240 ? 300 : sc.scaledScore >= 180 ? 240 : 180;
  const targetLabel = lang === 'ta'
    ? (sc.scaledScore >= 300 ? 'தங்க தேர்ச்சி' : sc.scaledScore >= 240 ? 'தங்க நிலை (300)' : sc.scaledScore >= 180 ? 'வெள்ளி நிலை (240)' : 'வெண்கல நிலை (180)')
    : (sc.scaledScore >= 300 ? 'Gold Mastery' : sc.scaledScore >= 240 ? 'Gold Tier (300)' : sc.scaledScore >= 180 ? 'Silver Tier (240)' : 'Bronze Tier (180)');
  const progressPct = Math.min(100, Math.round((sc.scaledScore / 350) * 100));

  const dimVectorIcons = {
    P: 'fitness-outline',
    M: 'compass-outline',
    I: 'bulb-outline',
    E: 'heart-outline',
    F: 'wallet-outline'
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* 1. Weekly Score & Medal Mastery Card */}
      <View
        style={[
          styles.scoreCard,
          {
            backgroundColor: T.cardElevated || T.card,
            borderColor: T.lineHigh
          }
        ]}
      >
        <View style={styles.scoreTopRow}>
          <View style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
            <View style={styles.scoreBadgeRow}>
              <Ionicons name="ribbon-outline" size={15} color={T.secondary} />
              <Text style={[styles.scoreBadgeText, { color: T.secondary }]}>
                {lang === 'ta' ? 'வாராந்திர மதிப்பெண்' : 'Weekly 350-Point Score'}
              </Text>
            </View>
            <View style={styles.bigScoreRow}>
              <Text style={[styles.bigScoreText, { color: T.tx }]}>{sc.scaledScore}</Text>
              <Text style={[styles.maxScoreText, { color: T.mu }]}>
                / 350 {lang === 'ta' ? 'புள்ளிகள்' : 'PTS'}
              </Text>
            </View>
          </View>

          {/* Current Medal Tier Pill */}
          <View
            style={[
              styles.medalTierPill,
              {
                backgroundColor: sc.tier > 0 ? T.secondary + '18' : T.surfaceLowest || '#060E20',
                borderColor: sc.tier > 0 ? T.secondary + '60' : T.line
              }
            ]}
          >
            <Ionicons
              name={sc.tier >= 3 ? 'trophy' : sc.tier >= 2 ? 'medal' : sc.tier >= 1 ? 'shield-checkmark' : 'ellipse-outline'}
              size={15}
              color={sc.tier > 0 ? T.secondary : T.mu}
            />
            <Text
              style={[
                styles.medalTierText,
                { color: sc.tier > 0 ? T.secondary : T.mu }
              ]}
            >
              {t.medals[sc.tier]}
            </Text>
          </View>
        </View>

        {/* Progress Bar towards Next Medal Tier */}
        <View style={styles.progressBlock}>
          <View style={styles.progressLabels}>
            <Text style={[styles.targetLabel, { color: T.mu }]}>
              {targetLabel}: {Math.max(0, nextTarget - sc.scaledScore)} {lang === 'ta' ? 'புள்ளிகள் தேவை' : 'PTS needed'}
            </Text>
            <Text style={[styles.percentLabel, { color: T.primary }]}>{progressPct}%</Text>
          </View>
          <View style={[styles.rail, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
            <View
              style={[
                styles.fill,
                {
                  width: `${Math.max(progressPct, 4)}%`,
                  backgroundColor: sc.tier >= 2 ? T.secondary : T.primary
                }
              ]}
            />
          </View>
        </View>

        {/* Medal Threshold Markers */}
        <View style={[styles.thresholdRow, { borderTopColor: T.line }]}>
          <View style={styles.thresholdItem}>
            <View style={[styles.threshDot, { backgroundColor: sc.scaledScore >= 180 ? T.primary : T.mu }]} />
            <Text style={[styles.threshText, { color: T.mu }]}>
              {lang === 'ta' ? 'வெண்கலம்: 180+' : 'Bronze: 180+'}
            </Text>
          </View>
          <View style={styles.thresholdItem}>
            <View style={[styles.threshDot, { backgroundColor: sc.scaledScore >= 240 ? T.secondary : T.mu }]} />
            <Text style={[styles.threshText, { color: T.mu }]}>
              {lang === 'ta' ? 'வெள்ளி: 240+' : 'Silver: 240+'}
            </Text>
          </View>
          <View style={styles.thresholdItem}>
            <View style={[styles.threshDot, { backgroundColor: sc.scaledScore >= 300 ? T.secondary : T.mu }]} />
            <Text style={[styles.threshText, { color: T.secondary }]}>
              {lang === 'ta' ? 'தங்கம்: 300+' : 'Gold: 300+'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Primary CTA: Open Section 5 Daily Log */}
      <Pressable
        onPress={() => setShowLog(true)}
        style={[
          styles.dailyLogBtn,
          {
            backgroundColor: T.primary,
            shadowColor: T.primary
          }
        ]}
      >
        <Ionicons name="journal" size={18} color="#FFFFFF" />
        <Text style={styles.dailyLogBtnText}>
          {t.openDailyLog || (lang === 'ta' ? 'தினசரி நாட்குறிப்பு & சிந்தனை' : 'Open Daily Log & Reflection')}
        </Text>
      </Pressable>

      {/* 3. Interactive 5x7 Visual Habit Matrix Grid */}
      <View
        style={[
          styles.matrixCard,
          {
            backgroundColor: T.card,
            borderColor: T.line
          }
        ]}
      >
        <View style={styles.matrixHeaderRow}>
          <View>
            <Text style={[styles.matrixTitle, { color: T.tx }]}>
              {lang === 'ta' ? '5×7 வாராந்திர பழக்க அட்டவணை' : '5×7 Weekly Habit Matrix'}
            </Text>
            <Text style={[styles.matrixSubtitle, { color: T.mu }]}>
              {lang === 'ta' ? '5 பரிமாணங்கள் × 7 நாட்கள் = 35 பழக்கப் புள்ளிகள்' : '5 Dimensions × 7 Days = 35 Habit Checkpoints'}
            </Text>
          </View>
        </View>

        {/* Days Header Row */}
        <View style={styles.gridHeaderRow}>
          <View style={styles.habitColHeader}>
            <Text style={[styles.colHeaderText, { color: T.mu }]}>
              {lang === 'ta' ? 'பழக்கம்' : 'HABIT'}
            </Text>
          </View>
          <View style={styles.daysColHeader}>
            {wd.map((d, i) => {
              const isToday = d === todayStr;
              return (
                <View
                  key={d}
                  style={[
                    styles.dayHeaderCell,
                    isToday && { backgroundColor: T.primary + '20', borderRadius: 6 }
                  ]}
                >
                  <Text
                    style={[
                      styles.dayLetter,
                      { color: isToday ? T.primary : T.mu, fontWeight: isToday ? '900' : '600' }
                    ]}
                  >
                    {dayHeaders[i]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* 5 Dimension Habit Rows */}
        {act.map((h) => {
          const dimColor = T.dimColors[h.dimKey] || h.d.c[T.ci];
          const hData = (t.habits && t.habits[h.id]) || { name: h.n };
          const dimIcon = dimVectorIcons[h.dimKey] || 'ellipse-outline';

          return (
            <View key={h.id} style={[styles.matrixRow, { borderBottomColor: T.line }]}>
              {/* Left Column: Habit Identifier */}
              <View style={styles.habitNameCol}>
                <View style={[styles.dimTagSmall, { backgroundColor: dimColor + '18', borderColor: dimColor + '40' }]}>
                  <Ionicons name={dimIcon} size={13} color={dimColor} />
                </View>
                <Text style={[styles.matrixHabitText, { color: T.tx }]} numberOfLines={1}>
                  {hData.name}
                </Text>
              </View>

              {/* Right Column: 7 Day Touch Cells */}
              <View style={styles.cellsRow}>
                {wd.map((d) => {
                  const dayCompleted = L.doneOn(S, d).includes(h.id);
                  const isToday = d === todayStr;

                  return (
                    <Pressable
                      key={d}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: dayCompleted }}
                      onPress={() => toggleMatrixCell(h.id, d)}
                      style={[
                        styles.matrixCell,
                        {
                          borderColor: dayCompleted ? dimColor : isToday ? T.lineHigh : T.line,
                          backgroundColor: dayCompleted ? dimColor : T.surfaceLowest || '#060E20'
                        },
                        isToday && !dayCompleted && { borderWidth: 1.5, borderColor: T.tertiary + '80' }
                      ]}
                    >
                      {dayCompleted ? (
                        <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                      ) : (
                        <View style={[styles.cellDot, { backgroundColor: T.line }]} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}

        {/* Day Score & 60% CEO Rule Summary Row */}
        <View style={styles.matrixFooterRow}>
          <View style={styles.habitColHeader}>
            <Text style={[styles.ceoRuleLabel, { color: T.secondary }]}>
              {lang === 'ta' ? '60% CEO விதி' : '60% Rule'}
            </Text>
          </View>
          <View style={styles.daysColHeader}>
            {wd.map((d) => {
              const count = act.filter((h) => L.doneOn(S, d).includes(h.id)).length;
              const isCEO = L.dayPct(S, d) >= 0.6;
              return (
                <View key={d} style={styles.dayFooterCell}>
                  <Text
                    style={[
                      styles.dayCountText,
                      { color: isCEO ? T.primary : count > 0 ? T.secondary : T.mu, fontWeight: isCEO ? '900' : '600' }
                    ]}
                  >
                    {count}/{act.length}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* 4. Sunday Family Review & Next Week Goal */}
      <View
        style={[
          styles.reviewCard,
          {
            backgroundColor: T.card,
            borderColor: T.line
          }
        ]}
      >
        <View style={styles.reviewHeaderRow}>
          <Ionicons name="people-outline" size={18} color={T.primary} />
          <Text style={[styles.reviewTitle, { color: T.tx }]}>
            {t.sundayReviewTitle || (lang === 'ta' ? 'ஞாயிறு குடும்ப ஆய்வு' : 'Sunday Family Review')}
          </Text>
          {isSunday && (
            <View style={[styles.activePill, { backgroundColor: T.primary + '20', borderColor: T.primary }]}>
              <Text style={[styles.activePillText, { color: T.primary }]}>
                {lang === 'ta' ? 'இன்று' : 'TODAY'}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.reviewDesc, { color: T.mu }]}>
          {t.sundayReviewDesc || (lang === 'ta' ? 'குடும்பமாக ஒன்று கூடி வெற்றிகளைக் கொண்டாடி, அடுத்த வாரத்திற்கான ஒரு முக்கிய இலக்கை நிர்ணயியுங்கள்.' : 'Gather as a family to celebrate wins and set one main goal for next week.')}
        </Text>

        <TextInput
          style={[
            styles.goalInput,
            {
              borderColor: T.line,
              backgroundColor: T.surfaceLowest || '#060E20',
              color: T.tx
            }
          ]}
          multiline
          placeholder={t.nextWeekGoalPlaceholder || (lang === 'ta' ? 'அடுத்த வாரத்திற்கான குடும்பப் பழக்க இலக்கு...' : 'Our family habit goal for next week...')}
          placeholderTextColor={T.mu}
          value={(S.goals || {})[w0] || ''}
          onChangeText={(v) =>
            update({
              ...S,
              goals: {
                ...(S.goals || {}),
                [w0]: v
              }
            })
          }
        />
      </View>

      {/* Daily Log Modal (Section 5) */}
      <DailyLogModal
        visible={showLog}
        onClose={() => setShowLog(false)}
        S={S}
        update={update}
        T={T}
      />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 36
  },
  scoreCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4
  },
  scoreTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  scoreBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2
  },
  scoreBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  bigScoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6
  },
  bigScoreText: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5
  },
  maxScoreText: {
    fontSize: 14,
    fontWeight: '600'
  },
  medalTierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexShrink: 0
  },
  medalTierText: {
    fontSize: 12,
    fontWeight: '800'
  },
  progressBlock: {
    marginTop: 14,
    marginBottom: 12
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  targetLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    flex: 1,
    marginRight: 8
  },
  percentLabel: {
    fontSize: 12,
    fontWeight: '800'
  },
  rail: {
    height: 9,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: 5
  },
  thresholdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
    borderTopWidth: 1,
    paddingTop: 10
  },
  thresholdItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  threshDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  threshText: {
    fontSize: 11,
    fontWeight: '600'
  },
  dailyLogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3
  },
  dailyLogBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2
  },
  matrixCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16
  },
  matrixHeaderRow: {
    marginBottom: 12
  },
  matrixTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  matrixSubtitle: {
    fontSize: 11.5,
    marginTop: 2
  },
  gridHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 8,
    marginBottom: 6
  },
  habitColHeader: {
    flex: 1
  },
  colHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  daysColHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 175
  },
  dayHeaderCell: {
    width: 23,
    alignItems: 'center',
    paddingVertical: 2
  },
  dayLetter: {
    fontSize: 11
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1
  },
  habitNameCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 6
  },
  dimTagSmall: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  matrixHabitText: {
    fontSize: 12,
    fontWeight: '700',
    flex: 1
  },
  cellsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 175
  },
  matrixCell: {
    width: 23,
    height: 23,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellDot: {
    width: 4,
    height: 4,
    borderRadius: 2
  },
  matrixFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10
  },
  ceoRuleLabel: {
    fontSize: 11,
    fontWeight: '800'
  },
  dayFooterCell: {
    width: 23,
    alignItems: 'center'
  },
  dayCountText: {
    fontSize: 9.5
  },
  reviewCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  reviewTitle: {
    fontSize: 15,
    fontWeight: '800',
    flex: 1
  },
  activePill: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  activePillText: {
    fontSize: 9,
    fontWeight: '900'
  },
  reviewDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10
  },
  goalInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    fontSize: 13,
    minHeight: 56,
    textAlignVertical: 'top'
  }
});
