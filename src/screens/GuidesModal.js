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
import { createStyles, screenInsets } from '../design';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PARENT_GUIDE, TEACHER_GUIDE, CURRICULUM_GUIDE_EXTRAS } from '../data';

export default function GuidesModal({ visible, onClose, S, T }) {
  const insets = useSafeAreaInsets();
  const [guideTab, setGuideTab] = useState('parent');

  if (!visible) return null;

  const { top: topInset, bottom: bottomInset } = screenInsets(insets);

  const lang = S.lang || 'en';
  const batch = S.batch === 'BAT02' ? 'BAT02' : 'BAT01';
  const isBat01 = batch === 'BAT01';
  // Shared guidance plus one entry written for this child's curriculum.
  const parentGuide = [...PARENT_GUIDE, CURRICULUM_GUIDE_EXTRAS[batch].parent];
  const teacherGuide = [...TEACHER_GUIDE, CURRICULUM_GUIDE_EXTRAS[batch].teacher];

  return (
    <Modal visible={visible} animationType="slide" transparent={false} statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
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
            {lang === 'ta' ? 'பெற்றோர் & ஆசிரியர் வழிகாட்டிகள்' : 'Parent & Teacher Implementation Guides'}
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollPad}
          showsVerticalScrollIndicator={false}
        >
          {/* Segmented Switcher */}
          <View style={[styles.tabBar, { backgroundColor: T.surfaceLowest, borderColor: T.line }]}>
            <Pressable
              onPress={() => setGuideTab('parent')}
              style={[
                styles.tabItem,
                guideTab === 'parent' && {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.rose + '50',
                  borderWidth: 1
                }
              ]}
            >
              <Ionicons
                name="home-outline"
                size={14}
                color={guideTab === 'parent' ? T.rose : T.mu}
              />
              <Text
                style={[
                  styles.tabItemText,
                  { color: guideTab === 'parent' ? T.tx : T.mu, fontWeight: guideTab === 'parent' ? '800' : '600' }
                ]}
                numberOfLines={1}
              >
                {lang === 'ta' ? 'பெற்றோர் வழிகாட்டி' : (isBat01 ? 'Parent Guide (Sec 8)' : 'Parent Guide')}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setGuideTab('teacher')}
              style={[
                styles.tabItem,
                guideTab === 'teacher' && {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.purple + '50',
                  borderWidth: 1
                }
              ]}
            >
              <Ionicons
                name="school-outline"
                size={14}
                color={guideTab === 'teacher' ? T.purple : T.mu}
              />
              <Text
                style={[
                  styles.tabItemText,
                  { color: guideTab === 'teacher' ? T.tx : T.mu, fontWeight: guideTab === 'teacher' ? '800' : '600' }
                ]}
                numberOfLines={1}
              >
                {lang === 'ta' ? 'ஆசிரியர் வழிகாட்டி' : (isBat01 ? 'Teacher Guide (Sec 9)' : 'Teacher Guide')}
              </Text>
            </Pressable>
          </View>

          {/* Cards List */}
          <View style={styles.cardsList}>
            {guideTab === 'parent' ? (
              parentGuide.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.card,
                    {
                      borderColor: T.line,
                      backgroundColor: T.card,
                      borderLeftColor: T.rose,
                      borderLeftWidth: 4
                    }
                  ]}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={[styles.numBadge, { backgroundColor: T.rose + '18' }]}>
                      <Text style={[styles.numText, { color: T.rose }]}>{idx + 1}</Text>
                    </View>
                    <Text style={[styles.cardTitle, { color: T.tx }]}>
                      {lang === 'ta' ? (item.title_ta || item.title) : item.title}
                    </Text>
                  </View>
                  <Text style={[styles.cardContent, { color: T.tx }]}>
                    {lang === 'ta' ? (item.content_ta || item.content) : item.content}
                  </Text>
                </View>
              ))
            ) : (
              teacherGuide.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.card,
                    {
                      borderColor: T.line,
                      backgroundColor: T.card,
                      borderLeftColor: T.purple,
                      borderLeftWidth: 4
                    }
                  ]}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={[styles.numBadge, { backgroundColor: T.purple + '18' }]}>
                      <Text style={[styles.numText, { color: T.purple }]}>{idx + 1}</Text>
                    </View>
                    <Text style={[styles.cardTitle, { color: T.tx }]}>
                      {lang === 'ta' ? (item.title_ta || item.title) : item.title}
                    </Text>
                  </View>
                  <Text style={[styles.cardContent, { color: T.tx }]}>
                    {lang === 'ta' ? (item.content_ta || item.content) : item.content}
                  </Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = createStyles({
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
    gap: 6,
    paddingVertical: 8,
    borderRadius: 9
  },
  tabItemText: {
    fontSize: 11.5,
    flexShrink: 1
  },
  cardsList: {
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
    gap: 8,
    marginBottom: 8
  },
  numBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numText: {
    fontSize: 11,
    fontWeight: '900'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1
  },
  cardContent: {
    fontSize: 12.5,
    lineHeight: 18
  }
});
