import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  Platform,
  KeyboardAvoidingView,
  StatusBar as RNStatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';

export default function DailyLogModal({ visible, S, update, onClose, T }) {
  const insets = useSafeAreaInsets();
  const [selDay, setSelDay] = useState(L.todayS());

  if (!visible) return null;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 50 : (RNStatusBar.currentHeight || 32) + 12
  );
  const bottomInset = Math.max(insets.bottom, 16);

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const wd = L.weekDays();
  const allLogs = S.log || {};
  const currentLog = allLogs[selDay] || {};

  const setField = (patch) => {
    update({
      ...S,
      log: {
        ...allLogs,
        [selDay]: {
          ...currentLog,
          ...patch
        }
      }
    });
  };

  const getArray = (key) => currentLog[key] || ['', '', ''];
  const setArrayItem = (key, idx, val) => {
    const list = [...getArray(key)];
    list[idx] = val;
    setField({ [key]: list });
  };

  const MOODS = [
    ['happy-outline', lang === 'ta' ? 'அருமை' : 'Great', '#10B981'],
    ['sunny-outline', lang === 'ta' ? 'நன்று' : 'Good', '#F59E0B'],
    ['ellipse-outline', lang === 'ta' ? 'சரி' : 'Okay', '#06B6D4'],
    ['rainy-outline', lang === 'ta' ? 'சோர்வு' : 'Low', '#8B5CF6'],
    ['cloudy-outline', lang === 'ta' ? 'வருத்தம்' : 'Sad', '#EC4899']
  ];

  const sumStat = (key) => wd.reduce((acc, d) => acc + (Number((allLogs[d] || {})[key]) || 0), 0);
  const sanitizeNumber = (v) => v.replace(/[^0-9]/g, '').slice(0, 4);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View
        style={[
          styles.root,
          {
            backgroundColor: T.bg,
            paddingTop: topInset,
            paddingBottom: bottomInset
          }
        ]}
      >
        {/* Safe Camera-Notch-Aware Header */}
        <View style={[styles.header, { borderBottomColor: T.line, backgroundColor: T.card }]}>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={lang === 'ta' ? 'திரும்பு' : 'Back to Week'}
            style={[
              styles.backBtn,
              {
                backgroundColor: T.primary + '16',
                borderColor: T.primary + '45'
              }
            ]}
          >
            <Ionicons name="chevron-back" size={20} color={T.primary} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: T.tx }]} numberOfLines={1}>
            {t.dailyLogTitle}
          </Text>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <ScrollView
          contentContainerStyle={styles.scrollPad}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Week Day Picker Row */}
          <View style={styles.dayPickerRow}>
            {wd.map((d, i) => {
              const isSelected = d === selDay;
              const dayInitial = lang === 'ta'
                ? ['தி', 'செ', 'பு', 'வி', 'வெ', 'ச', 'ஞா'][i]
                : ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i];

              return (
                <Pressable
                  key={d}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelDay(d)}
                  style={[
                    styles.dayCell,
                    {
                      borderColor: isSelected ? T.primary : T.line,
                      backgroundColor: isSelected ? T.primary + '20' : T.surfaceLowest || '#060E20'
                    }
                  ]}
                >
                  <Text style={[styles.dayInitial, { color: isSelected ? T.primary : T.tx }]}>
                    {dayInitial}
                  </Text>
                  <Text style={[styles.dateText, { color: isSelected ? T.primary : T.mu }]}>
                    {d.slice(8)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* 1. My 3 Priorities (Win the Morning) */}
          <View style={[styles.card, { backgroundColor: T.card, borderColor: T.line }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="checkbox-outline" size={17} color={T.primary} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>{t.myPriorities}</Text>
            </View>
            {[0, 1, 2].map((i) => (
              <TextInput
                key={i}
                style={[
                  styles.input,
                  {
                    borderColor: T.line,
                    backgroundColor: T.surfaceLowest || '#060E20',
                    color: T.tx
                  }
                ]}
                placeholder={`${t.priority} ${i + 1}`}
                placeholderTextColor={T.mu}
                value={getArray('priorities')[i]}
                onChangeText={(v) => setArrayItem('priorities', i, v)}
              />
            ))}
          </View>

          {/* 2. Mood Tracker */}
          <View style={[styles.card, { backgroundColor: T.card, borderColor: T.line }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="sunny-outline" size={17} color={T.primary} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>{t.moodTracker}</Text>
            </View>
            <View style={styles.moodRow}>
              {MOODS.map(([iconName, label, color]) => {
                const isSelected = currentLog.mood === label;
                return (
                  <Pressable
                    key={label}
                    onPress={() => setField({ mood: label })}
                    style={[
                      styles.moodCell,
                      {
                        borderColor: isSelected ? color : T.line,
                        backgroundColor: isSelected ? color + '20' : T.surfaceLowest || '#060E20'
                      }
                    ]}
                  >
                    <Ionicons name={iconName} size={22} color={isSelected ? color : T.mu} />
                    <Text style={[styles.moodLabel, { color: isSelected ? color : T.mu }]}>{label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 3. Gratitude 3 (Before Sleep) */}
          <View style={[styles.card, { backgroundColor: T.card, borderColor: T.line }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="sparkles-outline" size={17} color={T.purple} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>{t.gratitudeTitle}</Text>
            </View>
            {[0, 1, 2].map((i) => (
              <TextInput
                key={i}
                style={[
                  styles.input,
                  {
                    borderColor: T.line,
                    backgroundColor: T.surfaceLowest || '#060E20',
                    color: T.tx
                  }
                ]}
                placeholder={`${t.goodThing} ${i + 1}`}
                placeholderTextColor={T.mu}
                value={getArray('gratitude')[i]}
                onChangeText={(v) => setArrayItem('gratitude', i, v)}
              />
            ))}
          </View>

          {/* 4. Reading & Fitness Trackers */}
          <View style={styles.metricsRow}>
            {/* Pages Read */}
            <View style={[styles.halfCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.metricHeader}>
                <Ionicons name="book-outline" size={16} color={T.tertiary} />
                <Text style={[styles.metricTitle, { color: T.tx }]} numberOfLines={1}>
                  {lang === 'ta' ? 'வாசித்த பக்கங்கள்' : 'Pages Read'}
                </Text>
              </View>
              <TextInput
                style={[
                  styles.numInput,
                  {
                    borderColor: T.line,
                    backgroundColor: T.surfaceLowest || '#060E20',
                    color: T.tx
                  }
                ]}
                keyboardType="numeric"
                maxLength={4}
                placeholder="10"
                placeholderTextColor={T.mu}
                value={String(currentLog.pages || '')}
                onChangeText={(v) => setField({ pages: sanitizeNumber(v) })}
              />
              <Text style={[styles.metricSubtitle, { color: T.mu }]}>
                {lang === 'ta' ? 'இலக்கு: 10+' : 'Target: 10+'}
              </Text>
            </View>

            {/* Minutes Moved */}
            <View style={[styles.halfCard, { backgroundColor: T.card, borderColor: T.line }]}>
              <View style={styles.metricHeader}>
                <Ionicons name="fitness-outline" size={16} color={T.primary} />
                <Text style={[styles.metricTitle, { color: T.tx }]} numberOfLines={1}>
                  {lang === 'ta' ? 'உடற்பயிற்சி (நிமி)' : 'Minutes Moved'}
                </Text>
              </View>
              <TextInput
                style={[
                  styles.numInput,
                  {
                    borderColor: T.line,
                    backgroundColor: T.surfaceLowest || '#060E20',
                    color: T.tx
                  }
                ]}
                keyboardType="numeric"
                maxLength={4}
                placeholder="30"
                placeholderTextColor={T.mu}
                value={String(currentLog.fitness || '')}
                onChangeText={(v) => setField({ fitness: sanitizeNumber(v) })}
              />
              <Text style={[styles.metricSubtitle, { color: T.mu }]}>
                {lang === 'ta' ? 'இலக்கு: 30+' : 'Target: 30+'}
              </Text>
            </View>
          </View>

          {/* 5. Evening Reflection */}
          <View style={[styles.card, { backgroundColor: T.card, borderColor: T.line }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="moon-outline" size={17} color={T.tertiary} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>{t.dailyReflection}</Text>
            </View>
            <TextInput
              style={[
                styles.reflectionInput,
                {
                  borderColor: T.line,
                  backgroundColor: T.surfaceLowest || '#060E20',
                  color: T.tx
                }
              ]}
              multiline
              placeholder={t.reflectionPlaceholder}
              placeholderTextColor={T.mu}
              value={currentLog.reflection || ''}
              onChangeText={(v) => setField({ reflection: v })}
            />
          </View>

          {/* 6. Weekly Summary Totals */}
          <View style={[styles.summaryCard, { backgroundColor: T.cardElevated || T.card, borderColor: T.lineHigh }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="stats-chart" size={16} color={T.secondary} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>{t.weeklySummary}</Text>
            </View>
            <View style={styles.summaryStatsRow}>
              <View style={styles.summaryCol}>
                <Text style={[styles.summaryBigNum, { color: T.tertiary }]}>{sumStat('pages')}</Text>
                <Text style={[styles.summaryLabel, { color: T.mu }]}>{t.pagesSummary}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryCol}>
                <Text style={[styles.summaryBigNum, { color: T.primary }]}>{sumStat('fitness')}</Text>
                <Text style={[styles.summaryLabel, { color: T.mu }]}>{t.minsSummary}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: 1,
    gap: 12
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    flex: 1
  },
  scrollPad: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 12
  },
  dayPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 4
  },
  dayCell: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center'
  },
  dayInitial: {
    fontSize: 13,
    fontWeight: '800'
  },
  dateText: {
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 2
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    marginBottom: 8
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6
  },
  moodCell: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 4
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '700'
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10
  },
  halfCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8
  },
  metricTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    flex: 1
  },
  numInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center'
  },
  metricSubtitle: {
    fontSize: 10.5,
    textAlign: 'center',
    marginTop: 4
  },
  reflectionInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    minHeight: 64,
    textAlignVertical: 'top'
  },
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14
  },
  summaryStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center'
  },
  summaryBigNum: {
    fontSize: 24,
    fontWeight: '900'
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
});
