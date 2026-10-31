import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
  Share,
  Linking,
  Alert,
  StatusBar as RNStatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DIMS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';

const MANAGEMENT_URL = 'https://vishalmurugan1986.github.io/hapitopia/management.html';

export default function SchoolAuditModal({ visible, onClose, S, T }) {
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 50 : (RNStatusBar.currentHeight || 32) + 12
  );
  const bottomInset = Math.max(insets.bottom, 16);

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const todayStr = L.todayS();
  const audit = L.getAuditSummary(S, todayStr);
  const doneToday = L.doneOn(S, todayStr);
  const allHabitsList = L.allHabits();

  const handleShareCode = async () => {
    triggerHaptic('medium');
    const studentExport = L.generateStudentExport(S);
    try {
      await Share.share({
        title: 'Habitopia Student Audit Code',
        message: studentExport.jsonString
      });
    } catch {
      Alert.alert(
        lang === 'ta' ? 'அறிக்கை தகவல்' : 'Student Audit Data',
        studentExport.jsonString
      );
    }
  };

  const handleOpenPortal = () => {
    triggerHaptic('light');
    Linking.openURL(MANAGEMENT_URL).catch(() => {
      Alert.alert(
        lang === 'ta' ? 'இணைப்பு பிழை' : 'Link Notice',
        'Could not open portal URL in browser.'
      );
    });
  };

  const isReviewNeeded = audit.status === 'review_needed';
  const isVerified = audit.status === 'verified';

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
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: T.line, backgroundColor: T.card }]}>
          <Pressable
            onPress={onClose}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={lang === 'ta' ? 'மூடு' : 'Back'}
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
          <View style={styles.headerTextWrap}>
            <Text style={[styles.headerTitle, { color: T.tx }]} numberOfLines={1}>
              {lang === 'ta' ? 'பள்ளி சரிபார்ப்பு & தணிக்கை' : 'School Verification & Audit'}
            </Text>
            <Text style={[styles.headerSub, { color: T.mu }]} numberOfLines={1}>
              {lang === 'ta' ? 'உண்மையான பதிவு கண்காணிப்பு முறை' : 'Habit Pacing & Anti-Cheat Audit Trail'}
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollPad}
          showsVerticalScrollIndicator={false}
        >
          {/* Student Identification Card */}
          <View style={[styles.card, { backgroundColor: T.card, borderColor: T.line }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="school-outline" size={18} color={T.primary} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>
                {lang === 'ta' ? 'மாணவர் விவரம்' : 'Student Identity'}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <View style={styles.metaCol}>
                <Text style={[styles.metaLabel, { color: T.mu }]}>{lang === 'ta' ? 'பெயர்' : 'Name'}</Text>
                <Text style={[styles.metaVal, { color: T.tx }]}>{S.name || 'Student'}</Text>
              </View>
              <View style={styles.metaCol}>
                <Text style={[styles.metaLabel, { color: T.mu }]}>{lang === 'ta' ? 'வயது / வகுப்பு' : 'Age / Grade'}</Text>
                <Text style={[styles.metaVal, { color: T.tx }]}>
                  {S.age || 10} yrs (Grade {Math.min(8, Math.max(4, (S.age || 10) - 5))})
                </Text>
              </View>
              <View style={styles.metaCol}>
                <Text style={[styles.metaLabel, { color: T.mu }]}>{lang === 'ta' ? 'தேதி' : 'Date'}</Text>
                <Text style={[styles.metaVal, { color: T.tx }]}>{todayStr}</Text>
              </View>
            </View>
          </View>

          {/* Audit Status Diagnostic Banner */}
          <View
            style={[
              styles.auditBanner,
              {
                backgroundColor: isReviewNeeded
                  ? '#FFFBEB'
                  : isVerified
                  ? '#ECFDF5'
                  : T.surfaceLowest || '#060E20',
                borderColor: isReviewNeeded
                  ? '#FDE68A'
                  : isVerified
                  ? '#A7F3D0'
                  : T.line
              }
            ]}
          >
            <View style={styles.auditStatusRow}>
              <Ionicons
                name={
                  isReviewNeeded
                    ? 'alert-circle-outline'
                    : isVerified
                    ? 'checkmark-circle-outline'
                    : 'time-outline'
                }
                size={22}
                color={
                  isReviewNeeded
                    ? '#B45309'
                    : isVerified
                    ? '#047857'
                    : T.mu
                }
              />
              <Text
                style={[
                  styles.auditStatusTitle,
                  {
                    color: isReviewNeeded
                      ? '#B45309'
                      : isVerified
                      ? '#047857'
                      : T.tx
                  }
                ]}
              >
                {lang === 'ta' ? audit.labelTa : audit.label}
              </Text>
            </View>
            <Text
              style={[
                styles.auditStatusDesc,
                {
                  color: isReviewNeeded
                    ? '#92400E'
                    : isVerified
                    ? '#065F46'
                    : T.mu
                }
              ]}
            >
              {isReviewNeeded
                ? (lang === 'ta'
                    ? '3 அல்லது அதற்கு மேற்பட்ட பழக்கங்கள் நொடிகளில் குறிக்கப்பட்டுள்ளன. பணி செய்யாமல் தேர்வு செய்யப்பட்டிருக்க வாய்ப்புள்ளது. ஆசிரியரின் 30-நொடி நேரடி சோதனை பரிந்துரைக்கப்படுகிறது.'
                    : 'Multiple habits were marked within seconds of each other. High probability of speed-marking without task execution. Teacher spot-check recommended.')
                : isVerified
                ? (lang === 'ta'
                    ? 'பழக்கங்கள் காலை, பள்ளி நேரம் மற்றும் மாலை என நாள் முழுவதும் இயல்பான இடைவெளியில் முடிக்கப்பட்டுள்ளன.'
                    : 'Habits completed with natural pacing spread across morning, school hours, and evening slots.')
                : (lang === 'ta'
                    ? `${doneToday.length} பழக்கங்கள் முடிந்துள்ளன. மேலும் பணிகள் நிலுவையில் உள்ளன.`
                    : `${doneToday.length} habits completed so far today. Missions remain in progress.`)}
            </Text>
          </View>

          {/* Today's Timestamped Activity Log */}
          <View style={[styles.card, { backgroundColor: T.card, borderColor: T.line }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="time-outline" size={18} color={T.primary} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>
                {lang === 'ta' ? 'இன்றைய நேரப் பதிவு வரிசை' : "Today's Completion Timeline"}
              </Text>
            </View>

            {doneToday.length === 0 ? (
              <Text style={[styles.emptyText, { color: T.mu }]}>
                {lang === 'ta' ? 'இன்று இதுவரை பழக்கங்கள் குறிக்கப்படவில்லை.' : 'No habits marked yet today.'}
              </Text>
            ) : (
              <View style={styles.timelineList}>
                {doneToday.map((hid, idx) => {
                  const habitObj = allHabitsList.find((h) => h.id === hid);
                  const hName = (t.habits && t.habits[hid] ? t.habits[hid].name : habitObj?.n) || hid;
                  const tsIso = S.habitTimestamps && S.habitTimestamps[todayStr] && S.habitTimestamps[todayStr][hid];
                  const timeFormatted = tsIso
                    ? new Date(tsIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                    : 'Recorded';

                  return (
                    <View key={hid} style={[styles.timelineRow, { borderBottomColor: T.line }]}>
                      <View style={styles.timelineLeft}>
                        <Text style={[styles.timelineIndex, { color: T.mu }]}>#{idx + 1}</Text>
                        <Text style={[styles.timelineHabit, { color: T.tx }]}>{hName}</Text>
                      </View>
                      <View style={[styles.timeBadge, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                        <Text style={[styles.timeText, { color: T.mu }]}>{timeFormatted}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {/* Teacher's 30-Second Verbal Spot-Check Guide */}
          <View style={[styles.card, { backgroundColor: T.card, borderColor: T.line }]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="help-circle-outline" size={18} color={T.secondary} />
              <Text style={[styles.cardTitle, { color: T.tx }]}>
                {lang === 'ta' ? 'ஆசிரியருக்கான 30-நொடி நேரடி சோதனை' : "Teacher's 30-Second Verbal Spot-Check"}
              </Text>
            </View>
            <Text style={[styles.spotDesc, { color: T.mu }]}>
              {lang === 'ta'
                ? 'மாணவர் உண்மையிலேயே பணியைச் செய்தாரா என்பதை அறிய வகுப்பறையில் இந்த எளிய கேள்விகளைக் கேட்கவும்:'
                : 'To verify whether the student genuinely completed the tasks, ask these simple verbal questions:'}
            </Text>

            <View style={styles.questionsList}>
              <View style={[styles.questionBox, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                <Text style={[styles.questionTitle, { color: T.primary }]}>
                  {lang === 'ta' ? '1. வாசிப்பு (Read 10 Pages):' : '1. Reading Habit (Read 10 Pages):'}
                </Text>
                <Text style={[styles.questionPrompt, { color: T.tx }]}>
                  {lang === 'ta'
                    ? '"இன்று நீங்கள் படித்த புத்தகத்தின் பெயர் என்ன? அதில் என்ன நடந்தது என்று ஒரு வரியில் கூறுங்கள்?"'
                    : '"Which book did you read today, and what happened on the last page in one sentence?"'}
                </Text>
              </View>

              <View style={[styles.questionBox, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                <Text style={[styles.questionTitle, { color: T.secondary }]}>
                  {lang === 'ta' ? '2. உடற்பயிற்சி (Move 30):' : '2. Physical Habit (Move 30):'}
                </Text>
                <Text style={[styles.questionPrompt, { color: T.tx }]}>
                  {lang === 'ta'
                    ? '"இன்று என்ன உடற்பயிற்சி அல்லது விளையாட்டு விளையாடினீர்கள்? யாருடன் விளையாடினீர்கள்?"'
                    : '"What game, sport, or physical activity did you do for 30 minutes today?"'}
                </Text>
              </View>

              <View style={[styles.questionBox, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                <Text style={[styles.questionTitle, { color: T.purple || '#A855F7' }]}>
                  {lang === 'ta' ? '3. அன்புச் செயல் (Kind Act Daily):' : '3. Emotional Habit (Kind Act Daily):'}
                </Text>
                <Text style={[styles.questionPrompt, { color: T.tx }]}>
                  {lang === 'ta'
                    ? '"இன்று யாருக்கு உதவி செய்தீர்கள்? என்ன உதவி செய்தீர்கள்?"'
                    : '"Who did you help today at school or home, and what kind act did you do?"'}
                </Text>
              </View>
            </View>
          </View>

          {/* School Management Action Buttons */}
          <View style={styles.actionsWrap}>
            <Pressable
              onPress={handleShareCode}
              style={[styles.primaryActionBtn, { backgroundColor: T.primary }]}
              accessibilityRole="button"
              accessibilityLabel="Share Audit Code"
            >
              <Ionicons name="share-outline" size={18} color="#FFFFFF" />
              <Text style={styles.primaryActionText}>
                {lang === 'ta' ? 'தணிக்கைக் குறியீட்டைப் பகிர்க' : 'Share / Copy Audit Code for School'}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleOpenPortal}
              style={[styles.secondaryActionBtn, { borderColor: T.line, backgroundColor: T.card }]}
              accessibilityRole="button"
              accessibilityLabel="Open School Management Portal"
            >
              <Ionicons name="globe-outline" size={18} color={T.primary} />
              <Text style={[styles.secondaryActionText, { color: T.tx }]}>
                {lang === 'ta' ? 'பள்ளி மேலாண்மை போர்ட்டலைத் திறக்க' : 'Open School Management Portal'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextWrap: {
    flex: 1
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800'
  },
  headerSub: {
    fontSize: 12,
    marginTop: 2
  },
  scroll: {
    flex: 1
  },
  scrollPad: {
    padding: 16,
    gap: 14
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700'
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4
  },
  metaCol: {
    flex: 1
  },
  metaLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2
  },
  metaVal: {
    fontSize: 13,
    fontWeight: '700'
  },
  auditBanner: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14
  },
  auditStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6
  },
  auditStatusTitle: {
    fontSize: 15,
    fontWeight: '800'
  },
  auditStatusDesc: {
    fontSize: 13,
    lineHeight: 18
  },
  timelineList: {
    gap: 8
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1
  },
  timelineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  timelineIndex: {
    fontSize: 12,
    fontWeight: '600',
    width: 24
  },
  timelineHabit: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1
  },
  timeBadge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700'
  },
  emptyText: {
    fontSize: 13,
    fontStyle: 'italic',
    paddingVertical: 8
  },
  spotDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 10
  },
  questionsList: {
    gap: 8
  },
  questionBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10
  },
  questionTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 4
  },
  questionPrompt: {
    fontSize: 12.5,
    lineHeight: 17
  },
  actionsWrap: {
    gap: 10,
    marginTop: 4,
    marginBottom: 16
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 12
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700'
  }
});

