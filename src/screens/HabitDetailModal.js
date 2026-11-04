import React, { useState } from 'react';
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
import { HABIT_CHAPTERS } from '../data/habitChapters';
import { TRANSLATIONS } from '../i18n/translations';

export default function HabitDetailModal({ visible, habit, onClose, S, T }) {
  const insets = useSafeAreaInsets();
  const [subTab, setSubTab] = useState('story'); // 'story' | 'challenges' | 'discussion' | 'rubric'

  const isVisible = visible !== undefined ? visible : !!habit;
  if (!isVisible || !habit) return null;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 50 : (RNStatusBar.currentHeight || 32) + 12
  );
  const bottomInset = Math.max(insets.bottom, 16);

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const chapter = (HABIT_CHAPTERS[habit.id] && HABIT_CHAPTERS[habit.id][lang]) || {
    name: habit.n,
    tagline: habit.s,
    whyItMatters: lang === 'ta'
      ? 'இந்த நற்பழக்கம் உனது எதிர்காலத்தை உருவாக்கும் மாபெரும் சக்தியாகும். தினமும் பயிற்சி செய்வதன் மூலம் உன் ஆற்றல் பெருமளவில் வளரும்.'
      : 'This habit builds your future foundation. Consistent daily practice transforms potential into real-world mastery.',
    story: lang === 'ta'
      ? 'ஒவ்வொரு சிறந்த சாதனையாளரும் ஒரு சிறிய பழக்கத்துடன் தொடங்கினர். தொடர்ந்து முயற்சி செய்யும்போது எந்தப் பெரிய இலக்கையும் அடையலாம்.'
      : 'Every champion started with a single small habit. Consistency turns ordinary actions into extraordinary results.',
    dailyPractice: habit.s,
    weeklyChallenge: lang === 'ta' ? 'இந்த வாரம் 5 நாட்கள் தவறாமல் இந்த பழக்கத்தை முடித்து சவாலை வெல்.' : 'Complete this habit on 5 days this week to master the quest.',
    monthlyMission: lang === 'ta' ? 'இந்த மாதம் முழுவதும் இந்த பழக்கத்தை உன் இயல்பான வழக்கமாக மாற்று.' : 'Embed this habit into your natural daily routine for the entire month.',
    reflectionQuestions: [
      lang === 'ta' ? 'இந்த பழக்கத்தைச் செய்யும்போது உன் மனம் எப்படி உணர்கிறது?' : 'How does practicing this habit make you feel?',
      lang === 'ta' ? 'இதை மேலும் சிறப்பாகச் செய்ய நீ என்ன செய்வாய்?' : 'What can you do to make this habit even easier tomorrow?'
    ],
    parentQuestions: [
      lang === 'ta' ? 'குழந்தை இந்த பழக்கத்தைச் செய்ய நாம் எவ்வாறு உறுதுணையாக இருக்கலாம்?' : 'How can we support our child in practicing this habit daily at home?'
    ],
    teacherQuestions: [
      lang === 'ta' ? 'வகுப்பறையில் இந்த பழக்கத்தை மாணவர்கள் கடைப்பிடிக்க என்ன வாய்ப்புகளை உருவாக்கலாம்?' : 'What classroom opportunities can encourage students to practice this habit?'
    ],
    rubric: {
      beginner: lang === 'ta' ? 'நினைவூட்டும்போது மட்டும் செய்கிறார்.' : 'Practices only when reminded.',
      developing: lang === 'ta' ? 'வாரத்தில் சில நாட்கள் செய்கிறார்.' : 'Consistent with occasional support.',
      proficient: lang === 'ta' ? 'சுயமாக தினமும் செய்கிறார்.' : 'Independent and disciplined daily.',
      master: lang === 'ta' ? 'வாழ்க்கையோடு இணைந்துவிட்டது; மற்றவர்க்கும் வழிகாட்டுகிறார்.' : 'Deeply embedded, mentors peers.'
    }
  };

  const dimColor = T.dimColors[habit.dimKey] || (habit.d ? habit.d.c[T.ci] : T.primary);
  const slotLabel = lang === 'ta'
    ? (habit.d?.slot_ta || habit.d?.slot || 'தினசரி நேரம்')
    : (habit.d?.slot || 'Daily Routine Slot');

  const habitLoop = chapter.habitLoop || {
    cue: lang === 'ta'
      ? `${slotLabel} (தினசரி நினைவூட்டல் தருணம்)`
      : `${slotLabel} (Daily anchor trigger)`,
    routine: chapter.dailyPractice,
    reward: lang === 'ta'
      ? '+10 XP புள்ளிகள், மனநிறைவு மற்றும் 7-நாள் பழக்கப் பதக்கம்'
      : '+10 XP points, inner pride, and progress toward the 7-Day Habit Badge'
  };

  const funActivityText = chapter.funActivity || (
    lang === 'ta'
      ? `குடும்பம் அல்லது நண்பர்களுடன் இணைந்து "${chapter.name}" பழக்கத்தை ஒரு சிறிய விளையாட்டாக இன்றே செய்து மகிழுங்கள்!`
      : `Team up with family or a friend today and turn "${chapter.name}" into a fun 2-minute mini-game!`
  );

  const subTabs = [
    { k: 'story', label: lang === 'ta' ? 'பாடம்' : 'Story', icon: 'book-outline' },
    { k: 'challenges', label: lang === 'ta' ? 'சவால்' : 'Quests', icon: 'shield-checkmark-outline' },
    { k: 'discussion', label: lang === 'ta' ? 'வழிகாட்டுதல்' : 'Coaching', icon: 'chatbubbles-outline' },
    { k: 'rubric', label: lang === 'ta' ? 'அளவுகோல்' : 'Rubric', icon: 'ribbon-outline' }
  ];

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false} onRequestClose={onClose}>
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
            {chapter.name}
          </Text>
          <View style={[styles.dimBadge, { backgroundColor: dimColor + '18', borderColor: dimColor + '40' }]}>
            <Text style={[styles.dimBadgeText, { color: dimColor }]}>
              {habit.dimKey} · {habit.id}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollPad}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Habit Title Card */}
          <View
            style={[
              styles.heroCard,
              {
                backgroundColor: T.cardElevated || T.card,
                borderColor: dimColor + '60',
                borderLeftColor: dimColor,
                borderLeftWidth: 4
              }
            ]}
          >
            <Text style={[styles.habitTitle, { color: T.tx }]}>{chapter.name}</Text>
            <Text style={[styles.habitTagline, { color: T.mu }]}>{chapter.tagline}</Text>
          </View>

          {/* Sub Tabs */}
          <View style={[styles.tabBar, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
            {subTabs.map((item) => {
              const isSelected = subTab === item.k;
              return (
                <Pressable
                  key={item.k}
                  onPress={() => setSubTab(item.k)}
                  style={[
                    styles.tabItem,
                    isSelected && {
                      backgroundColor: T.cardElevated || T.card,
                      borderColor: dimColor + '50',
                      borderWidth: 1
                    }
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={13}
                    color={isSelected ? dimColor : T.mu}
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

          {/* Tab 1: Story & Meaning */}
          {subTab === 'story' && (
            <View style={styles.tabContentBlock}>
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="sparkles" size={16} color={dimColor} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'இது ஏன் முக்கியம்? (அறிவியல் பின்னணி)' : 'Why It Matters (The Science)'}
                  </Text>
                </View>
                <Text style={[styles.sectionBody, { color: T.tx }]}>{chapter.whyItMatters}</Text>
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="book" size={16} color={dimColor} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'உத்வேகக் கதை & உவமை' : 'Story & Metaphor'}
                  </Text>
                </View>
                <Text style={[styles.sectionBody, { color: T.tx }]}>{chapter.story}</Text>
              </View>
            </View>
          )}

          {/* Tab 2: Quests & Habit Loop */}
          {subTab === 'challenges' && (
            <View style={styles.tabContentBlock}>
              {/* Habit Loop Breakdown: Cue -> Routine -> Reward */}
              <View style={[styles.card, { borderColor: dimColor + '50', backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="sync-circle-outline" size={16} color={dimColor} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'பழக்கச் சுழற்சி (தூண்டுதல் → செயல் → பரிசு)' : 'Habit Loop (Cue → Routine → Reward)'}
                  </Text>
                </View>
                <View style={styles.loopStepsCol}>
                  <View style={[styles.loopStepRow, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20' }]}>
                    <Text style={[styles.loopTag, { color: T.secondary }]}>
                      {lang === 'ta' ? '1. தூண்டுதல் (Cue):' : '1. Cue:'}
                    </Text>
                    <Text style={[styles.loopVal, { color: T.tx }]}>{habitLoop.cue}</Text>
                  </View>
                  <View style={[styles.loopStepRow, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20' }]}>
                    <Text style={[styles.loopTag, { color: T.primary }]}>
                      {lang === 'ta' ? '2. செயல் (Routine):' : '2. Routine:'}
                    </Text>
                    <Text style={[styles.loopVal, { color: T.tx }]}>{habitLoop.routine}</Text>
                  </View>
                  <View style={[styles.loopStepRow, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20' }]}>
                    <Text style={[styles.loopTag, { color: T.tertiary }]}>
                      {lang === 'ta' ? '3. பரிசு (Reward):' : '3. Reward:'}
                    </Text>
                    <Text style={[styles.loopVal, { color: T.tx }]}>{habitLoop.reward}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="checkmark-circle-outline" size={16} color={T.primary} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'தினசரி பயிற்சி (Daily Quest)' : 'Daily Quest Action'}
                  </Text>
                </View>
                <Text style={[styles.sectionBody, { color: T.tx }]}>{chapter.dailyPractice}</Text>
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="flame-outline" size={16} color={T.secondary} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'வாராந்திர சவால் (Weekly Quest)' : 'Weekly Quest Target'}
                  </Text>
                </View>
                <Text style={[styles.sectionBody, { color: T.tx }]}>{chapter.weeklyChallenge}</Text>
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="trophy-outline" size={16} color={T.tertiary} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? '30-நாள் முழு இலக்கு (Monthly Mission)' : '30-Day Transformation Goal'}
                  </Text>
                </View>
                <Text style={[styles.sectionBody, { color: T.tx }]}>{chapter.monthlyMission}</Text>
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="game-controller-outline" size={16} color={T.purple} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'வேடிக்கைச் செயல்பாடு (Fun Activity)' : 'Fun Activity & Micro-Game'}
                  </Text>
                </View>
                <Text style={[styles.sectionBody, { color: T.tx }]}>{funActivityText}</Text>
              </View>
            </View>
          )}

          {/* Tab 3: Discussion & Parent/Teacher Coaching */}
          {subTab === 'discussion' && (
            <View style={styles.tabContentBlock}>
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="person-outline" size={16} color={T.tertiary} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'சுய சிந்தனை கேள்விகள்' : 'Self-Reflection Questions'}
                  </Text>
                </View>
                {chapter.reflectionQuestions.map((q, idx) => (
                  <Text key={idx} style={[styles.questionText, { color: T.tx }]}>
                    • {q}
                  </Text>
                ))}
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="home-outline" size={16} color={T.rose} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'பெற்றோர் வழிகாட்டுதல் உதவிக்குறிப்பு' : 'Parent Coaching Guide'}
                  </Text>
                </View>
                {chapter.parentQuestions.map((q, idx) => (
                  <Text key={idx} style={[styles.questionText, { color: T.tx }]}>
                    • {q}
                  </Text>
                ))}
              </View>

              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="school-outline" size={16} color={T.purple} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'ஆசிரியர் வகுப்பறை இணைப்பு' : 'Teacher Classroom Connection'}
                  </Text>
                </View>
                {chapter.teacherQuestions.map((q, idx) => (
                  <Text key={idx} style={[styles.questionText, { color: T.tx }]}>
                    • {q}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Tab 4: Mastery Rubric */}
          {subTab === 'rubric' && (
            <View style={styles.tabContentBlock}>
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="ribbon-outline" size={16} color={dimColor} />
                  <Text style={[styles.sectionTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'பழக்க தேர்ச்சி அளவுகோல்' : 'Habit Mastery Rubric (4 Levels)'}
                  </Text>
                </View>

                {['beginner', 'developing', 'proficient', 'master'].map((lvl) => {
                  const levelTitle = (t.performanceLevels && t.performanceLevels[lvl]) || lvl;
                  const criteria = chapter.rubric[lvl] || '';

                  return (
                    <View
                      key={lvl}
                      style={[
                        styles.rubricRow,
                        {
                          borderBottomColor: T.line,
                          backgroundColor: lvl === 'master' ? dimColor + '12' : 'transparent'
                        }
                      ]}
                    >
                      <View style={styles.rubricLabelGroup}>
                        <View style={[styles.rubricDot, { backgroundColor: dimColor }]} />
                        <Text style={[styles.rubricLevelTitle, { color: dimColor }]}>
                          {levelTitle}
                        </Text>
                      </View>
                      <Text style={[styles.rubricCriteria, { color: T.tx }]}>{criteria}</Text>
                    </View>
                  );
                })}
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
  dimBadge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8
  },
  dimBadgeText: {
    fontSize: 11,
    fontWeight: '800'
  },
  scrollPad: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 12
  },
  heroCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  habitTagline: {
    fontSize: 12.5,
    marginTop: 2
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
    gap: 4,
    paddingVertical: 8,
    borderRadius: 9
  },
  tabItemText: {
    fontSize: 11
  },
  tabContentBlock: {
    gap: 12
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
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    flex: 1
  },
  sectionBody: {
    fontSize: 13,
    lineHeight: 18
  },
  loopStepsCol: {
    gap: 8
  },
  loopStepRow: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  loopTag: {
    fontSize: 11.5,
    fontWeight: '800',
    marginBottom: 2
  },
  loopVal: {
    fontSize: 12.5,
    lineHeight: 17
  },
  questionText: {
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 6
  },
  rubricRow: {
    paddingVertical: 8,
    borderBottomWidth: 1
  },
  rubricLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2
  },
  rubricDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  rubricLevelTitle: {
    fontSize: 12,
    fontWeight: '800'
  },
  rubricCriteria: {
    fontSize: 12,
    lineHeight: 16,
    paddingLeft: 12
  }
});
