import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
  StatusBar as RNStatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CURRICULUM_BOOKS } from '../data/curriculumBooks';
import { TRANSLATIONS } from '../i18n/translations';
import { triggerHaptic } from '../haptics';

export default function CurriculumBookModal({ visible, initialAge = 7, onClose, S, T }) {
  const insets = useSafeAreaInsets();
  const [selectedAge, setSelectedAge] = useState(initialAge || S?.age || 7);
  const [subTab, setSubTab] = useState('overview'); // 'overview' | 'lesson' | 'worksheets' | 'assessment' | 'guides'

  useEffect(() => {
    if (initialAge || S?.age) {
      setSelectedAge(initialAge || S?.age || 7);
    }
  }, [initialAge, S?.age]);

  if (!visible) return null;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 50 : (RNStatusBar.currentHeight || 32) + 12
  );
  const bottomInset = Math.max(insets.bottom, 16);

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const bookData = CURRICULUM_BOOKS[selectedAge] || CURRICULUM_BOOKS[7];
  const content = bookData[lang] || bookData.en;

  const switchTab = (tab) => {
    triggerHaptic('light');
    setSubTab(tab);
  };

  const switchAge = (age) => {
    triggerHaptic('light');
    setSelectedAge(age);
  };

  const subTabs = [
    { k: 'overview', label: lang === 'ta' ? 'பொருளடக்கம்' : 'Overview & ToC', icon: 'book-outline' },
    { k: 'lesson', label: lang === 'ta' ? 'மாதிரி பாடம்' : 'Sample Lesson', icon: 'reader-outline' },
    { k: 'worksheets', label: lang === 'ta' ? 'பயிற்சித் தாள்கள்' : 'Worksheets', icon: 'document-text-outline' },
    { k: 'assessment', label: lang === 'ta' ? 'மதிப்பீடு' : 'Rubric', icon: 'stats-chart-outline' },
    { k: 'guides', label: lang === 'ta' ? 'வழிகாட்டிகள்' : 'Home & School', icon: 'people-outline' }
  ];

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
            {lang === 'ta' ? '8-நூல் பாடத்திட்ட வெளியீட்டுத் தொடர்' : '8-Book Publishing Series'}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollPad}
          showsVerticalScrollIndicator={false}
        >
          {/* Age Level Selector (7 to 14) */}
          <Text style={[styles.selectorLabel, { color: T.mu }]}>
            {lang === 'ta' ? 'வயதைத் தேர்ந்தெடு (வகுப்பு 2 முதல் 8):' : 'Select Age Level (Class 2 to 8):'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ageScroll}>
            {[7, 8, 9, 10, 11, 12, 13, 14].map((a) => {
              const isSelected = selectedAge === a;
              return (
                <Pressable
                  key={a}
                  onPress={() => switchAge(a)}
                  style={[
                    styles.agePill,
                    {
                      borderColor: isSelected ? T.primary : T.line,
                      backgroundColor: isSelected ? T.primary + '20' : T.surfaceLowest || '#060E20'
                    }
                  ]}
                >
                  <Text style={[styles.agePillNum, { color: isSelected ? T.primary : T.tx }]}>{a}</Text>
                  <Text style={[styles.agePillStage, { color: isSelected ? T.primary : T.mu }]}>
                    {lang === 'ta'
                      ? (CURRICULUM_BOOKS[a].stageTa || CURRICULUM_BOOKS[a].stage).split(' ')[0]
                      : CURRICULUM_BOOKS[a].stage.split(' ')[0]}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Book Hero Banner */}
          <View
            style={[
              styles.bookBanner,
              {
                backgroundColor: T.cardElevated || T.card,
                borderColor: T.lineHigh
              }
            ]}
          >
            <View style={styles.bookBadgeRow}>
              <Ionicons name="book" size={14} color={T.secondary} />
              <Text style={[styles.bookGradeBadge, { color: T.secondary }]}>
                {bookData.grade} · {lang === 'ta' ? bookData.stageTa : bookData.stage}
              </Text>
            </View>
            <Text style={[styles.bookTitle, { color: T.tx }]}>{content.bookTitle}</Text>
            <Text style={[styles.bookTheme, { color: T.mu }]}>{content.theme}</Text>
          </View>

          {/* 5-SubTab Navigation Bar */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {subTabs.map((item) => {
              const isSelected = subTab === item.k;
              return (
                <Pressable
                  key={item.k}
                  onPress={() => switchTab(item.k)}
                  style={[
                    styles.tabItem,
                    {
                      borderColor: isSelected ? T.primary : T.line,
                      backgroundColor: isSelected ? T.primary + '20' : T.surfaceLowest || '#060E20'
                    }
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={14}
                    color={isSelected ? T.primary : T.mu}
                  />
                  <Text
                    style={[
                      styles.tabItemText,
                      { color: isSelected ? T.primary : T.mu, fontWeight: isSelected ? '800' : '600' }
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* TAB 1: Overview & Table of Contents */}
          {subTab === 'overview' && (
            <View style={styles.contentBlock}>
              {/* Learning Outcomes */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="sparkles-outline" size={16} color={T.primary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'கற்றல் விளைவுகள்' : 'Key Learning Outcomes'}
                  </Text>
                </View>
                {(content.learningOutcomes || []).map((outcome, idx) => (
                  <View key={idx} style={styles.outcomeRow}>
                    <Ionicons name="checkmark-circle" size={14} color={T.primary} style={{ marginTop: 2 }} />
                    <Text style={[styles.outcomeText, { color: T.tx }]}>{outcome}</Text>
                  </View>
                ))}
              </View>

              {/* Chapter Architecture */}
              {content.chapterStructure && (
                <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                  <View style={styles.cardHeaderRow}>
                    <Ionicons name="layers-outline" size={16} color={T.secondary} />
                    <Text style={[styles.cardTitle, { color: T.tx }]}>
                      {lang === 'ta' ? 'அத்தியாய கட்டமைப்பு' : 'Chapter Architecture'}
                    </Text>
                  </View>
                  <Text style={[styles.bodyText, { color: T.tx }]}>{content.chapterStructure}</Text>
                </View>
              )}

              {/* Table of Contents */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="list-outline" size={16} color={T.tertiary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'பாடப் பொருளடக்கம் (10 தொகுதிகள்)' : 'Table of Contents (Curriculum Units)'}
                  </Text>
                </View>
                {(content.tableOfContents || content.toc || []).map((unit, idx) => (
                  <View key={idx} style={[styles.tocRow, { borderBottomColor: T.line }]}>
                    <Text style={[styles.tocNum, { color: T.primary }]}>U{idx + 1}</Text>
                    <Text style={[styles.tocText, { color: T.tx }]}>{unit}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* TAB 2: Sample Lesson Chapter */}
          {subTab === 'lesson' && (
            <View style={styles.contentBlock}>
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="reader-outline" size={16} color={T.primary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {content.sampleLesson?.title || (lang === 'ta' ? 'மாதிரி பாடம்' : 'Sample Lesson')}
                  </Text>
                </View>
              </View>

              {content.sampleLesson?.story && (
                <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                  <View style={styles.cardHeaderRow}>
                    <Ionicons name="book-outline" size={16} color={T.purple} />
                    <Text style={[styles.cardTitle, { color: T.tx }]}>
                      {lang === 'ta' ? 'பாடக் கதை & உவமை' : 'Lesson Story & Metaphor'}
                    </Text>
                  </View>
                  <Text style={[styles.bodyText, { color: T.tx }]}>{content.sampleLesson.story}</Text>
                </View>
              )}

              {content.sampleLesson?.dailyPractice && (
                <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                  <View style={styles.cardHeaderRow}>
                    <Ionicons name="flash-outline" size={16} color={T.secondary} />
                    <Text style={[styles.cardTitle, { color: T.tx }]}>
                      {lang === 'ta' ? 'தினசரி பயிற்சி முறை' : 'Daily Practice Action'}
                    </Text>
                  </View>
                  <Text style={[styles.bodyText, { color: T.tx }]}>{content.sampleLesson.dailyPractice}</Text>
                </View>
              )}

              {content.sampleLesson?.reflection && (
                <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                  <View style={styles.cardHeaderRow}>
                    <Ionicons name="bulb-outline" size={16} color={T.tertiary} />
                    <Text style={[styles.cardTitle, { color: T.tx }]}>
                      {lang === 'ta' ? 'சிந்தனை & கற்றல் வினா' : 'Reflection & Inquiry Question'}
                    </Text>
                  </View>
                  <Text style={[styles.bodyText, { color: T.tx }]}>{content.sampleLesson.reflection}</Text>
                </View>
              )}
            </View>
          )}

          {/* TAB 3: Worksheets */}
          {subTab === 'worksheets' && (
            <View style={styles.contentBlock}>
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="document-text-outline" size={16} color={T.primary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'பாடப் பயிற்சித் தாள்கள் (4 தொகுதிகள்)' : 'Curriculum Worksheets (4 Core Modules)'}
                  </Text>
                </View>
                {(content.worksheets || []).map((ws, idx) => (
                  <View key={idx} style={[styles.wsItem, { borderBottomColor: T.line }]}>
                    <Text style={[styles.wsTitle, { color: T.tx }]}>
                      {idx + 1}. {ws.name || ws.title}
                    </Text>
                    <Text style={[styles.wsDesc, { color: T.mu }]}>{ws.desc}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* TAB 4: Assessment & Rubric */}
          {subTab === 'assessment' && (
            <View style={styles.contentBlock}>
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="ribbon-outline" size={16} color={T.secondary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'தேர்ச்சி மதிப்பீட்டு அளவுகோல்' : 'Mastery Assessment Criteria'}
                  </Text>
                </View>
                <Text style={[styles.bodyText, { color: T.tx }]}>
                  {content.assessments || content.assessment || ''}
                </Text>
              </View>
            </View>
          )}

          {/* TAB 5: Guides */}
          {subTab === 'guides' && (
            <View style={styles.contentBlock}>
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="home-outline" size={16} color={T.rose} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'பெற்றோர் வழிகாட்டுதல்' : 'Parent Implementation Guide'}
                  </Text>
                </View>
                <Text style={[styles.bodyText, { color: T.tx }]}>
                  {content.parentResources || content.parentGuide || ''}
                </Text>
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="school-outline" size={16} color={T.purple} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'ஆசிரியர் வழிகாட்டுதல்' : 'Teacher Implementation Guide'}
                  </Text>
                </View>
                <Text style={[styles.bodyText, { color: T.tx }]}>
                  {content.teacherResources || content.teacherGuide || ''}
                </Text>
              </View>
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
  selectorLabel: {
    fontSize: 12,
    fontWeight: '700'
  },
  ageScroll: {
    gap: 8,
    paddingVertical: 2
  },
  agePill: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 46
  },
  agePillNum: {
    fontSize: 15,
    fontWeight: '900'
  },
  agePillStage: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1
  },
  bookBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14
  },
  bookBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4
  },
  bookGradeBadge: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    flex: 1
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  bookTheme: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2
  },
  tabScroll: {
    gap: 8,
    paddingVertical: 2
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 12
  },
  tabItemText: {
    fontSize: 11.5
  },
  contentBlock: {
    gap: 10
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
    marginBottom: 8
  },
  cardTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    flex: 1
  },
  bodyText: {
    fontSize: 12.5,
    lineHeight: 18
  },
  tocRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 7,
    borderBottomWidth: 1
  },
  tocNum: {
    fontSize: 11,
    fontWeight: '800',
    width: 22
  },
  tocText: {
    fontSize: 12.5,
    lineHeight: 17,
    flex: 1
  },
  lessonTagline: {
    fontSize: 12,
    fontWeight: '700',
    fontStyle: 'italic'
  },
  wsItem: {
    paddingVertical: 8,
    borderBottomWidth: 1
  },
  wsTitle: {
    fontSize: 13,
    fontWeight: '700'
  },
  wsDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2
  },
  outcomeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginVertical: 4
  },
  outcomeText: {
    fontSize: 12.5,
    lineHeight: 18,
    flex: 1
  }
});
