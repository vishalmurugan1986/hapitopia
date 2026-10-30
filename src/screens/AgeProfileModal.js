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
import { BOOK_INTRO, AGE_PROFILES } from '../data/psychologyProfiles';
import { triggerHaptic } from '../haptics';

export default function AgeProfileModal({ visible, age = 7, onClose, S, T }) {
  const insets = useSafeAreaInsets();
  const [selectedAge, setSelectedAge] = useState(age || S?.age || 7);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'intro'

  useEffect(() => {
    if (age || S?.age) {
      setSelectedAge(age || S?.age || 7);
    }
  }, [age, S?.age]);

  if (!visible) return null;

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 50 : (RNStatusBar.currentHeight || 32) + 12
  );
  const bottomInset = Math.max(insets.bottom, 16);

  const lang = S?.lang || 'en';
  const intro = BOOK_INTRO[lang] || BOOK_INTRO.en;
  const profile = AGE_PROFILES[selectedAge] || AGE_PROFILES[7];
  const profileData = profile[lang] || profile.en;
  const stageName = lang === 'ta' ? profile.stageTa : profile.stage;

  const switchAge = (a) => {
    triggerHaptic('light');
    setSelectedAge(a);
  };

  const switchTab = (tab) => {
    triggerHaptic('light');
    setActiveTab(tab);
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
            {lang === 'ta' ? 'பருவ வளர்ச்சி & ஹீரோ பயணம்' : 'Hero Journey & Psychology'}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollPad}
          showsVerticalScrollIndicator={false}
        >
          {/* Age Level Selector (7 to 14) */}
          <Text style={[styles.selectorLabel, { color: T.mu }]}>
            {lang === 'ta' ? 'பருவ வயதைத் தேர்ந்தெடு (வகுப்பு 2 முதல் 8):' : 'Select Age Level (Class 2 to 8):'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ageScroll}>
            {[7, 8, 9, 10, 11, 12, 13, 14].map((a) => {
              const isSelected = selectedAge === a;
              const stageShort = (lang === 'ta' ? AGE_PROFILES[a].stageTa : AGE_PROFILES[a].stage).split(' ')[0];
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
                    {stageShort}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Hero Stage Banner */}
          <View
            style={[
              styles.heroCard,
              {
                backgroundColor: T.cardElevated || T.card,
                borderColor: T.lineHigh
              }
            ]}
          >
            <View style={styles.heroBadgeRow}>
              <Ionicons name="compass" size={15} color={T.secondary} />
              <Text style={[styles.heroStage, { color: T.secondary }]}>
                {lang === 'ta' ? `வயது ${selectedAge} (${profile.classGrade})` : `Age ${selectedAge} (${profile.classGrade})`} · {stageName}
              </Text>
            </View>
            <Text style={[styles.heroTheme, { color: T.tx }]}>
              {lang === 'ta' ? (profile.themeTa || profile.theme) : profile.theme}
            </Text>
          </View>

          {/* Tab Selector */}
          <View style={[styles.tabBar, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
            <Pressable
              onPress={() => switchTab('profile')}
              style={[
                styles.tabItem,
                activeTab === 'profile' && {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.primary + '50',
                  borderWidth: 1
                }
              ]}
            >
              <Ionicons
                name="bulb-outline"
                size={14}
                color={activeTab === 'profile' ? T.primary : T.mu}
              />
              <Text
                style={[
                  styles.tabItemText,
                  { color: activeTab === 'profile' ? T.tx : T.mu, fontWeight: activeTab === 'profile' ? '800' : '600' }
                ]}
                numberOfLines={1}
              >
                {lang === 'ta' ? 'பருவ உளவியல்' : 'Age Psychology (Sec 2)'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => switchTab('intro')}
              style={[
                styles.tabItem,
                activeTab === 'intro' && {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.secondary + '50',
                  borderWidth: 1
                }
              ]}
            >
              <Ionicons
                name="shield-outline"
                size={14}
                color={activeTab === 'intro' ? T.secondary : T.mu}
              />
              <Text
                style={[
                  styles.tabItemText,
                  { color: activeTab === 'intro' ? T.tx : T.mu, fontWeight: activeTab === 'intro' ? '800' : '600' }
                ]}
                numberOfLines={1}
              >
                {lang === 'ta' ? 'ஹீரோ பயணம்' : 'Hero Journey (Sec 1)'}
              </Text>
            </Pressable>
          </View>

          {/* Section 2: Age Psychology Profile across 5 developmental domains */}
          {activeTab === 'profile' ? (
            <View style={styles.cardsBlock}>
              {/* 1. Cognitive Development */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="bulb-outline" size={16} color={T.tertiary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'அறிவாற்றல் வளர்ச்சி (Cognitive)' : 'Cognitive Development'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{profileData.cognitive}</Text>
              </View>

              {/* 2. Emotional Development */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="heart-outline" size={16} color={T.rose} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'உணர்ச்சி வளர்ச்சி (Emotional)' : 'Emotional Development'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{profileData.emotional}</Text>
              </View>

              {/* 3. Social Development */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="people-outline" size={16} color={T.purple} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'சமூக வளர்ச்சி (Social)' : 'Social Development'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{profileData.social}</Text>
              </View>

              {/* 4. Physical Development */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="fitness-outline" size={16} color={T.primary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'உடல் வளர்ச்சி (Physical)' : 'Physical Development'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{profileData.physical}</Text>
              </View>

              {/* 5. Learning Characteristics */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="school-outline" size={16} color={T.secondary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'கற்கும் பண்புகள் (Learning Characteristics)' : 'Learning Characteristics'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{profileData.learning}</Text>
              </View>
            </View>
          ) : (
            /* Section 1: Book Intro & Hero's Journey (All 5 Essential Elements) */
            <View style={styles.cardsBlock}>
              {/* 1. Welcome Letter */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="mail-outline" size={16} color={T.primary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>{intro.welcomeTitle}</Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{intro.welcomeLetter}</Text>
              </View>

              {/* 2. Hero's Journey Story */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="sparkles-outline" size={16} color={T.secondary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>{intro.heroJourneyTitle}</Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{intro.heroJourneyStory}</Text>
              </View>

              {/* 3. Why Habits Matter */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="compass-outline" size={16} color={T.tertiary} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'பழக்கங்கள் ஏன் முக்கியம்?' : 'Why Habits Matter'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{intro.whyHabitsMatter}</Text>
              </View>

              {/* 4. Growth Mindset Explanation */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="trending-up-outline" size={16} color={T.purple} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'வளரும் மனப்பான்மை (Growth Mindset)' : 'Growth Mindset'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{intro.growthMindset}</Text>
              </View>

              {/* 5. Habit Game Overview */}
              <View style={[styles.card, { borderColor: T.line, backgroundColor: T.card }]}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="grid-outline" size={16} color={T.rose} />
                  <Text style={[styles.cardTitle, { color: T.tx }]}>
                    {lang === 'ta' ? '5×7 விளையாட்டு கண்ணோட்டம்' : 'Habit Game Overview'}
                  </Text>
                </View>
                <Text style={[styles.cardBody, { color: T.tx }]}>{intro.gameOverview}</Text>
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
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: -4
  },
  ageScroll: {
    gap: 8,
    paddingVertical: 4
  },
  agePill: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 54
  },
  agePillNum: {
    fontSize: 15,
    fontWeight: '900'
  },
  agePillStage: {
    fontSize: 9.5,
    fontWeight: '600',
    marginTop: 1
  },
  heroCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4
  },
  heroStage: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    flex: 1
  },
  heroTheme: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22
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
    gap: 6,
    paddingVertical: 8,
    borderRadius: 9
  },
  tabItemText: {
    fontSize: 11.5,
    flexShrink: 1
  },
  cardsBlock: {
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
  cardBody: {
    fontSize: 12.5,
    lineHeight: 18
  }
});
