import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
  Alert,
  StatusBar as RNStatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DIMS, PARENT_GUIDE } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import { triggerHaptic } from '../haptics';

export default function ClassroomPrintablesModal({ visible, onClose, S, T }) {
  const insets = useSafeAreaInsets();
  const [activeFormat, setActiveFormat] = useState('card'); // 'card' | 'poster' | 'calendar' | 'handbook'

  if (!visible) return null;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 50 : (RNStatusBar.currentHeight || 32) + 12
  );
  const bottomInset = Math.max(insets.bottom, 16);

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const WEEKS_CALENDAR = [
    { wk: 1, focus: 'Physical Ignition', focusTa: 'உடல்தகுதி தொடக்கம்', goal: 'Water First + Move 30 daily', goalTa: 'முதலில் தண்ணீர் + தினமும் 30 நிமிட உடற்பயிற்சி', xp: '100 XP' },
    { wk: 2, focus: 'Mindset Foundation', focusTa: 'மன உறுதி அடித்தளம்', goal: 'Win the Morning + Gratitude 3', goalTa: 'காலையை வெல்லுங்கள் + 3 நன்றிகள்', xp: '100 XP' },
    { wk: 3, focus: 'Curiosity Unleashed', focusTa: 'அறிவுக்கூர்மை விழிப்புணர்வு', goal: 'Read 10 Pages + Question Storm', goalTa: '10 பக்கங்கள் வாசிப்பு + கேள்விப் புயல்', xp: '100 XP' },
    { wk: 4, focus: 'Emotional Intelligence', focusTa: 'உணர்ச்சி சமநிலை', goal: 'Name the Feeling + Kind Act Daily', goalTa: 'உணர்வைப் பெயரிடு + தினசரி அன்புச் செயல்', xp: '150 XP' },
    { wk: 5, focus: 'Money Mastery', focusTa: 'பண மேலாண்மை', goal: '3-Jar System + Need vs Want', goalTa: '3-ஜாடி முறை + தேவை எதிர் ஆசை', xp: '150 XP' },
    { wk: 6, focus: 'Deep Dive & Creation', focusTa: 'ஆய்வு மற்றும் படைப்பு', goal: 'Create Not Consume + Teach to Learn', goalTa: 'உருவாக்கு + கற்பித்துக் கற்றுக்கொள்', xp: '200 XP' },
    { wk: 7, focus: 'Leadership & Resilience', focusTa: 'தலைமை மற்றும் மன உறுதி', goal: 'Digital Boundaries + Sorry Fast', goalTa: 'டிஜிட்டல் எல்லைகள் + விரைவான மன்னிப்பு', xp: '200 XP' },
    { wk: 8, focus: 'Future CEO Capstone', focusTa: 'எதிர்கால CEO நிறைவு', goal: 'All 35 habits full integration', goalTa: 'அனைத்து 35 பழக்கங்களின் முழு ஒருங்கிணைப்பு', xp: '500 XP' }
  ];

  const handlePrint = () => {
    triggerHaptic('medium');
    Alert.alert(
      lang === 'ta' ? 'அச்சுப் பிரதி வழிமுறை' : 'A4 Printable Resource',
      lang === 'ta'
        ? 'இந்த வடிவம் A4 தாள்களுக்கு ஏற்றவாறு நேர்த்தியாக அமைக்கப்பட்டுள்ளது. இதை ஸ்கிரீன்ஷாட் எடுத்தோ அல்லது ஆவண கோப்பாகவோ அச்சிட்டு வகுப்பறை அல்லது குளிர்சாதனப் பெட்டியில் ஒட்டலாம்!'
        : 'This layout is custom-formatted for standard A4 paper. You can screenshot or save to print directly for classrooms or home habit boards!'
    );
  };

  const formats = [
    { k: 'card', label: lang === 'ta' ? 'பழக்க அட்டை' : 'Habit Card', icon: 'card-outline' },
    { k: 'poster', label: lang === 'ta' ? 'சுவரொட்டி' : 'Poster', icon: 'easel-outline' },
    { k: 'calendar', label: lang === 'ta' ? 'காலண்டர்' : '8-Wk Plan', icon: 'calendar-outline' },
    { k: 'handbook', label: lang === 'ta' ? 'கையேடு' : 'Handbook', icon: 'book-outline' }
  ];

  const dimVectorIcons = {
    P: 'fitness-outline',
    M: 'compass-outline',
    I: 'bulb-outline',
    E: 'shield-checkmark-outline',
    F: 'wallet-outline'
  };

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
          <Text style={[styles.headerTitle, { color: T.tx }]} numberOfLines={1}>
            {lang === 'ta' ? 'அச்சுப் பதிப்பு & கையேடுகள் (A4)' : 'Classroom & Home Printables (A4)'}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollPad} showsVerticalScrollIndicator={false}>
          {/* Format Selector */}
          <View style={[styles.tabBar, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
            {formats.map((item) => {
              const isSelected = activeFormat === item.k;
              return (
                <Pressable
                  key={item.k}
                  onPress={() => {
                    triggerHaptic('light');
                    setActiveFormat(item.k);
                  }}
                  style={[
                    styles.tabItem,
                    isSelected && {
                      backgroundColor: T.cardElevated || T.card,
                      borderColor: T.primary + '50',
                      borderWidth: 1
                    }
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={13}
                    color={isSelected ? T.primary : T.mu}
                  />
                  <Text
                    style={[
                      styles.tabItemText,
                      { color: isSelected ? T.tx : T.mu, fontWeight: isSelected ? '800' : '600' }
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Action Banner: Print */}
          <Pressable
            style={[styles.printBtn, { backgroundColor: T.primary }]}
            onPress={handlePrint}
          >
            <Ionicons name="print-outline" size={17} color="#FFFFFF" />
            <Text style={styles.printBtnText}>
              {lang === 'ta' ? 'அச்சிடு / சேமி (A4 வடிவம்)' : 'Print / Save Format (A4)'}
            </Text>
          </Pressable>

          {/* Format 1: Printable Habit Card (Tamil + English) */}
          {activeFormat === 'card' && (
            <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
              <View style={styles.printableHeader}>
                <Text style={[styles.printAppTitle, { color: T.tx }]}>THE 5×7 HABIT GAME</Text>
                <Text style={[styles.printAppTitleTa, { color: T.secondary }]}>5×7 பழக்க விளையாட்டு</Text>
                <Text style={[styles.printChildName, { color: T.tx }]}>
                  {S.name} · {lang === 'ta' ? `வயது ${S.age}` : `Age ${S.age}`} ({t.stages[S.age]})
                </Text>
              </View>

              <View style={[styles.divider, { backgroundColor: T.line }]} />

              {DIMS.map((d) => {
                const dimColor = T.dimColors[d.k] || d.c[T.ci];
                const dimIcon = dimVectorIcons[d.k] || 'ellipse-outline';
                return (
                  <View key={d.k} style={styles.cardDimSection}>
                    <View style={styles.dimHeadingRow}>
                      <Ionicons name={dimIcon} size={15} color={dimColor} />
                      <Text style={[styles.dimHeading, { color: dimColor }]}>
                        {d.n} / {TRANSLATIONS.ta.dims[d.k].name} ({d.slot})
                      </Text>
                    </View>
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                      const hid = d.k + i;
                      const enH = TRANSLATIONS.en.habits[hid];
                      const taH = TRANSLATIONS.ta.habits[hid];
                      return (
                        <View key={hid} style={[styles.bilingualHabitRow, { borderBottomColor: T.line }]}>
                          <Text style={[styles.habitNum, { color: T.mu }]}>{i + 1}.</Text>
                          <View style={{ flex: 1 }}>
                            <Text style={[styles.bilingualEn, { color: T.tx }]}>{enH.name}</Text>
                            <Text style={[styles.bilingualTa, { color: T.mu }]}>{taH.name}</Text>
                          </View>
                          <View style={[styles.checkboxBox, { borderColor: T.line }]} />
                        </View>
                      );
                    })}
                  </View>
                );
              })}

              <View style={[styles.quoteBox, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.secondary + '40' }]}>
                <Text style={[styles.quoteText, { color: T.tx }]}>
                  {t.ceoQuote}
                </Text>
              </View>
            </View>
          )}

          {/* Format 2: Classroom Wall Poster */}
          {activeFormat === 'poster' && (
            <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
              <View style={styles.printableHeader}>
                <Text style={[styles.printAppTitle, { color: T.tx }]}>THE 5×7 HABIT GAME</Text>
                <Text style={[styles.printAppTitleTa, { color: T.secondary }]}>வகுப்பறை சுவரொட்டி · WALL POSTER</Text>
                <Text style={[styles.printChildName, { color: T.mu }]}>
                  35 Habits · 5 Dimensions · Ages 7–14 (Class 2 to 8)
                </Text>
              </View>

              <View style={[styles.divider, { backgroundColor: T.line }]} />

              {DIMS.map((d) => {
                const dimColor = T.dimColors[d.k] || d.c[T.ci];
                const dimIcon = dimVectorIcons[d.k] || 'ellipse-outline';

                return (
                  <View key={d.k} style={[styles.posterDimCard, { borderLeftColor: dimColor }]}>
                    <View style={styles.dimHeadingRow}>
                      <Ionicons name={dimIcon} size={15} color={dimColor} />
                      <Text style={[styles.posterDimTitle, { color: dimColor }]}>
                        {d.n} · {d.slot}
                      </Text>
                    </View>
                    <Text style={[styles.posterDimTag, { color: T.mu }]}>{d.t}</Text>

                    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                      const hid = d.k + i;
                      const enH = TRANSLATIONS.en.habits[hid];
                      const taH = TRANSLATIONS.ta.habits[hid];
                      return (
                        <View key={hid} style={[styles.posterHabitRow, { borderBottomColor: T.line }]}>
                          <Text style={[styles.posterHabitNum, { color: dimColor }]}>{i + 1}</Text>
                          <View style={{ flex: 1 }}>
                            <Text style={[styles.posterHabitName, { color: T.tx }]}>
                              {enH.name} <Text style={{ color: T.mu }}>({taH.name})</Text>
                            </Text>
                            <Text style={[styles.posterHabitDesc, { color: T.mu }]}>{enH.desc}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}

              <View style={[styles.quoteBox, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.secondary + '40' }]}>
                <Text style={[styles.quoteText, { color: T.tx }]}>
                  {t.ceoQuote}
                </Text>
              </View>
            </View>
          )}

          {/* Format 3: 8-Week Challenge Calendar */}
          {activeFormat === 'calendar' && (
            <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
              <View style={styles.printableHeader}>
                <Text style={[styles.printAppTitle, { color: T.tx }]}>8-WEEK HABIT CALENDAR</Text>
                <Text style={[styles.printAppTitleTa, { color: T.secondary }]}>8-வார பழக்க சவால் அட்டவணை</Text>
                <Text style={[styles.printChildName, { color: T.mu }]}>
                  Progression from Starter to Future CEO
                </Text>
              </View>

              <View style={[styles.divider, { backgroundColor: T.line }]} />

              {WEEKS_CALENDAR.map((w) => (
                <View key={w.wk} style={[styles.calendarRowCard, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20' }]}>
                  <View style={[styles.calWkBadge, { backgroundColor: T.primary + '20', borderColor: T.primary + '50' }]}>
                    <Text style={[styles.calWkNum, { color: T.primary }]}>{w.wk}</Text>
                    <Text style={[styles.calWkLbl, { color: T.primary }]}>
                      {lang === 'ta' ? 'வாரம்' : 'WK'}
                    </Text>
                  </View>
                  <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={[styles.calFocus, { color: T.tx }]}>
                      {lang === 'ta' ? w.focusTa : w.focus}
                    </Text>
                    <Text style={[styles.calGoal, { color: T.mu }]}>
                      {lang === 'ta' ? (w.goalTa || w.goal) : w.goal}
                    </Text>
                  </View>
                  <View style={[styles.calXpBadge, { backgroundColor: T.secondary + '18', borderColor: T.secondary + '40' }]}>
                    <Text style={[styles.calXpText, { color: T.secondary }]}>{w.xp}</Text>
                  </View>
                </View>
              ))}

              <View style={[styles.quoteBox, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.secondary + '40' }]}>
                <Text style={[styles.quoteText, { color: T.tx }]}>
                  {lang === 'ta'
                    ? '“இலக்குகள் நாம் எங்கு செல்ல வேண்டும் என்று காட்டுகின்றன; பழக்கங்களே நம்மை அங்கு கொண்டு சேர்க்கும் வாகனங்கள்.”'
                    : '“Goals tell you where you want to go, but habits are the system that actually takes you there.”'}
                </Text>
              </View>
            </View>
          )}

          {/* Format 4: Parent Handbook */}
          {activeFormat === 'handbook' && (
            <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
              <View style={styles.printableHeader}>
                <Text style={[styles.printAppTitle, { color: T.tx }]}>PARENT HANDBOOK</Text>
                <Text style={[styles.printAppTitleTa, { color: T.secondary }]}>பெற்றோர் வழிகாட்டிக் கையேடு</Text>
                <Text style={[styles.printChildName, { color: T.mu }]}>
                  {lang === 'ta'
                    ? 'வீட்டில் எதிர்காலத் தலைவரை வளர்த்தெடுத்தல்'
                    : 'Nurturing the Future-Proof Child at Home'}
                </Text>
              </View>

              <View style={[styles.divider, { backgroundColor: T.line }]} />

              {PARENT_GUIDE.map((pg, i) => (
                <View key={i} style={[styles.handbookCard, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20' }]}>
                  <Text style={[styles.handbookTitle, { color: T.primary }]}>
                    {i + 1}. {lang === 'ta' ? (pg.title_ta || pg.title) : pg.title}
                  </Text>
                  <Text style={[styles.handbookBody, { color: T.tx }]}>
                    {lang === 'ta' ? (pg.content_ta || pg.content) : pg.content}
                  </Text>
                </View>
              ))}
            </View>
          )}
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
    fontSize: 15.5,
    fontWeight: '900',
    flex: 1
  },
  scrollPad: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 12
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 3
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    borderRadius: 9
  },
  tabItemText: {
    fontSize: 11
  },
  printBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 11
  },
  printBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14
  },
  printableHeader: {
    alignItems: 'center',
    paddingVertical: 8
  },
  printAppTitle: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  printAppTitleTa: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2
  },
  printChildName: {
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 4
  },
  divider: {
    height: 1,
    marginVertical: 10
  },
  cardDimSection: {
    marginBottom: 14
  },
  dimHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6
  },
  dimHeading: {
    fontSize: 12.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    flex: 1
  },
  bilingualHabitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1
  },
  habitNum: {
    fontSize: 11,
    fontWeight: '700',
    width: 18
  },
  bilingualEn: {
    fontSize: 12,
    fontWeight: '700'
  },
  bilingualTa: {
    fontSize: 11,
    marginTop: 1
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1
  },
  quoteBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 10
  },
  quoteText: {
    fontSize: 12,
    lineHeight: 17,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  posterDimCard: {
    borderLeftWidth: 4,
    paddingLeft: 10,
    marginBottom: 14
  },
  posterDimTitle: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    flex: 1
  },
  posterDimTag: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 6
  },
  posterHabitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 5,
    borderBottomWidth: 1
  },
  posterHabitNum: {
    fontSize: 11.5,
    fontWeight: '800',
    width: 16
  },
  posterHabitName: {
    fontSize: 12,
    fontWeight: '700'
  },
  posterHabitDesc: {
    fontSize: 11,
    lineHeight: 14,
    marginTop: 1
  },
  calendarRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8
  },
  calWkBadge: {
    borderWidth: 1,
    borderRadius: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calWkNum: {
    fontSize: 14,
    fontWeight: '900'
  },
  calWkLbl: {
    fontSize: 8,
    fontWeight: '800'
  },
  calFocus: {
    fontSize: 12.5,
    fontWeight: '800'
  },
  calGoal: {
    fontSize: 11,
    marginTop: 1
  },
  calXpBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6
  },
  calXpText: {
    fontSize: 10,
    fontWeight: '800'
  },
  handbookCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },
  handbookTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4
  },
  handbookBody: {
    fontSize: 12,
    lineHeight: 17
  }
});
