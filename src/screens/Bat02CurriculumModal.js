import React, { useEffect, useMemo, useState } from 'react';
import { View, Modal, ScrollView, StyleSheet, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HabitDetailModal from './HabitDetailModal';
import { DIMS_BAT02, BAT02_WEEKLY_ADDITIONS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';
import {
  AppText,
  Card,
  Chip,
  IconBubble,
  PressableScale,
  ProgressBar,
  screenInsets,
  space,
  radius,
  touch
} from '../design';

/**
 * BAT02 curriculum documents & framework modules, built from the BAT02
 * context and architecture docs:
 *   Roadmap     – the 25-week progressive architecture (5 Q Power + 1 new habit / week)
 *   Q Power     – the 5 activation-workshop habits practised daily
 *   Dimensions  – 5 dimensions × 5 habits with their mottos
 *   Habit Card  – bilingual printable card of all 30 habits
 * Every habit opens its full 12-element chapter (HabitDetailModal).
 * `initialTab` lets the Me screen open it straight on the printable card.
 */
export default function Bat02CurriculumModal({ visible, onClose, S, T, initialTab = 'roadmap' }) {
  const insets = useSafeAreaInsets();
  const { top, bottom } = screenInsets(insets);
  const [tab, setTab] = useState(initialTab);
  const [openHabit, setOpenHabit] = useState(null);

  useEffect(() => {
    if (visible) setTab(initialTab);
  }, [visible, initialTab]);

  const lang = S.lang || 'en';
  const ta = lang === 'ta';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const week = L.getBat02Week({ ...S, batch: 'BAT02' });
  const habits = useMemo(() => L.allHabits({ ...S, batch: 'BAT02' }), [S]);
  const byId = useMemo(() => Object.fromEntries(habits.map((h) => [h.id, h])), [habits]);

  const nameOf = (id, fallback) => (t.habits && t.habits[id] && t.habits[id].name) || fallback;
  const descOf = (id, fallback) => (t.habits && t.habits[id] && t.habits[id].desc) || fallback;
  const dimName = (d) => (t.dims && t.dims[d.k] && t.dims[d.k].name) || d.n;
  const open = (id) => byId[id] && setOpenHabit(byId[id]);

  const tabs = [
    { k: 'roadmap', icon: 'map', label: ta ? '25 வாரங்கள்' : '25-Week Map' },
    { k: 'q', icon: 'flash', label: ta ? 'Q பவர்' : 'Q Power' },
    { k: 'dims', icon: 'leaf', label: ta ? 'பரிமாணங்கள்' : 'Dimensions' },
    { k: 'card', icon: 'print', label: ta ? 'பழக்க அட்டை' : 'Habit Card' }
  ];

  const HabitRow = ({ id, fallbackName, fallbackDesc, dimKey, right }) => (
    <PressableScale onPress={() => open(id)} scaleTo={0.98} accessibilityRole="button" accessibilityLabel={nameOf(id, fallbackName)}>
      <View style={[styles.habitRow, { borderColor: T.line }]}>
        <IconBubble dimKey={dimKey} color={T.dimColors[dimKey]} size="sm" />
        <View style={styles.flex1}>
          <AppText variant="bodyStrong" numberOfLines={2}>
            {nameOf(id, fallbackName)}
          </AppText>
          {fallbackDesc ? (
            <AppText variant="bodySm" tone="muted" numberOfLines={2}>
              {descOf(id, fallbackDesc)}
            </AppText>
          ) : null}
        </View>
        {right || <Ionicons name="chevron-forward" size={20} color={T.dim} />}
      </View>
    </PressableScale>
  );

  const renderRoadmap = () => (
    <View style={styles.stack}>
      <Card variant="tinted" tint={T.tertiary}>
        <View style={styles.rowCenter}>
          <IconBubble name="map" color={T.tertiary} />
          <View style={styles.flex1}>
            <AppText variant="heading">{ta ? `நீங்கள் வாரம் ${week} இல் உள்ளீர்கள்` : `You are on Week ${week} of 25`}</AppText>
            <AppText variant="bodySm" tone="muted">
              {ta
                ? 'ஒவ்வொரு வாரமும் 5 Q பவர் பழக்கங்களுடன் ஒரு புதிய வளர்ச்சிப் பழக்கம் சேரும்.'
                : 'Each week adds one new growth habit on top of the 5 daily Q Power habits.'}
            </AppText>
          </View>
        </View>
        <ProgressBar value={week / 25} style={styles.mtMd} color={T.tertiaryFill} trackColor={T.card} />
      </Card>

      {BAT02_WEEKLY_ADDITIONS.map((w) => {
        const isNow = w.week === week;
        const isDone = w.week < week;
        const hue = T.dimColors[w.dimKey];
        return (
          <PressableScale key={w.week} onPress={() => open(w.id)} scaleTo={0.98} accessibilityRole="button" accessibilityLabel={`Week ${w.week}: ${nameOf(w.id, w.name)}`}>
            <View
              style={[
                styles.weekRow,
                {
                  backgroundColor: isNow ? hue + (T.isDark ? '26' : '14') : T.card,
                  borderColor: isNow ? hue : T.line,
                  borderBottomColor: isNow ? hue : T.ledge
                }
              ]}
            >
              <View style={[styles.weekNum, { backgroundColor: isDone || isNow ? hue : T.surfaceLowest }]}>
                <AppText variant="number" color={isDone || isNow ? (T.isDark ? T.on : '#FFFFFF') : T.mu}>
                  {w.week}
                </AppText>
              </View>
              <View style={styles.flex1}>
                <AppText variant="label" color={hue} numberOfLines={1}>
                  {dimName(DIMS_BAT02.find((d) => d.k === w.dimKey))}
                </AppText>
                <AppText variant="bodyStrong" numberOfLines={2}>
                  + {nameOf(w.id, w.name)}
                </AppText>
                <AppText variant="caption" tone="muted">
                  {ta ? `மொத்தம் ${w.week + 5} பழக்கங்கள்` : `${w.week + 5} habits in total`}
                </AppText>
              </View>
              {isNow ? <Chip size="sm" label={ta ? 'இப்போது' : 'Now'} color={hue} selected /> : null}
              {isDone ? <Ionicons name="checkmark-circle" size={24} color={hue} /> : null}
            </View>
          </PressableScale>
        );
      })}
    </View>
  );

  const renderQ = () => {
    const qDim = DIMS_BAT02.find((d) => d.k === 'Q');
    return (
      <View style={styles.stack}>
        <Card variant="tinted" tint={T.dimColors.Q}>
          <View style={styles.rowCenter}>
            <IconBubble dimKey="Q" color={T.dimColors.Q} solid />
            <View style={styles.flex1}>
              <AppText variant="heading">{ta ? 'Q பவர் பழக்கங்கள்' : 'Q Power Habits'}</AppText>
              <AppText variant="bodySm" tone="muted">
                {ta ? 'செயல்படுத்தும் பயிலரங்கம் · வாரம் 1 முதல் தினமும்' : 'Activation Workshop · practised every day from Week 1'}
              </AppText>
            </View>
          </View>
        </Card>
        <Card padding={space.sm}>
          {habits
            .filter((h) => h.dimKey === 'Q')
            .map((h) => (
              <HabitRow key={h.id} id={h.id} fallbackName={h.n} fallbackDesc={h.s} dimKey="Q" />
            ))}
        </Card>
        <AppText variant="caption" tone="muted" align="center">
          {qDim ? qDim.t : ''}
        </AppText>
      </View>
    );
  };

  const renderDims = () => (
    <View style={styles.stack}>
      {DIMS_BAT02.filter((d) => d.k !== 'Q').map((d) => (
        <Card key={d.k} padding={space.sm}>
          <View style={[styles.rowCenter, styles.dimHead]}>
            <IconBubble dimKey={d.k} color={T.dimColors[d.k]} />
            <View style={styles.flex1}>
              <AppText variant="heading" color={T.dimColors[d.k]}>
                {dimName(d)}
              </AppText>
              <AppText variant="bodySm" tone="muted">
                {d.t}
              </AppText>
            </View>
          </View>
          {habits
            .filter((h) => h.dimKey === d.k)
            .map((h) => {
              const wk = BAT02_WEEKLY_ADDITIONS.find((w) => w.id === h.id);
              return (
                <HabitRow
                  key={h.id}
                  id={h.id}
                  fallbackName={h.n}
                  dimKey={d.k}
                  right={wk ? <Chip size="sm" label={ta ? `வா ${wk.week}` : `Wk ${wk.week}`} color={wk.week <= week ? T.dimColors[d.k] : T.dim} /> : null}
                />
              );
            })}
        </Card>
      ))}
    </View>
  );

  const renderCard = () => {
    const en = TRANSLATIONS.en;
    const tm = TRANSLATIONS.ta;
    return (
      <View style={styles.stack}>
        <Card>
          <View style={styles.printHead}>
            <AppText variant="title" align="center">
              HABITOPIA · BAT02
            </AppText>
            <AppText variant="label" tone="secondary" align="center">
              30 Habits · 25 Weeks · 5 Q Power + 25 Growth
            </AppText>
            <AppText variant="caption" tone="muted" align="center">
              30 பழக்கங்கள் · 25 வாரங்கள்
            </AppText>
          </View>
          {DIMS_BAT02.map((d) => (
            <View key={d.k} style={styles.printDim}>
              <View style={[styles.printDimBar, { backgroundColor: T.dimColors[d.k] }]} />
              <View style={styles.flex1}>
                <AppText variant="subheading" color={T.dimColors[d.k]}>
                  {d.n}
                  {tm.dims && tm.dims[d.k] ? ` / ${tm.dims[d.k].name}` : ''}
                </AppText>
                {habits
                  .filter((h) => h.dimKey === d.k)
                  .map((h, i) => (
                    <View key={h.id} style={styles.printHabit}>
                      <View style={[styles.printBox, { borderColor: T.lineHigh }]} />
                      <View style={styles.flex1}>
                        <AppText variant="bodySm">
                          {i + 1}. {(en.habits && en.habits[h.id] && en.habits[h.id].name) || h.n}
                        </AppText>
                        {tm.habits && tm.habits[h.id] ? (
                          <AppText variant="caption" tone="muted">
                            {tm.habits[h.id].name}
                          </AppText>
                        ) : null}
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </Card>
        <PressableScale
          onPress={() => {
            triggerHaptic('medium');
            Alert.alert(
              ta ? 'அச்சிட' : 'Print this card',
              ta
                ? 'இந்த அட்டை A4 தாளுக்கு ஏற்றது. ஸ்கிரீன்ஷாட் எடுத்து அச்சிடலாம்.'
                : 'This card is laid out for A4 paper. Take a screenshot to print it for the classroom or the fridge!'
            );
          }}
          accessibilityRole="button"
          accessibilityLabel={ta ? 'அச்சிடும் வழிமுறை' : 'How to print'}
        >
          <View style={[styles.printBtn, { backgroundColor: T.primaryFill, borderBottomColor: T.primaryLedge }]}>
            <Ionicons name="print" size={20} color={T.onPrimary} />
            <AppText variant="button" color={T.onPrimary}>
              {ta ? 'அச்சிடுவது எப்படி' : 'How to print'}
            </AppText>
          </View>
        </PressableScale>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false} statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={[styles.root, { backgroundColor: T.bg, paddingTop: top, paddingBottom: bottom }]}>
        <View style={styles.header}>
          <PressableScale onPress={onClose} hitSlop={touch.hitSlop} accessibilityRole="button" accessibilityLabel={ta ? 'மூடு' : 'Close'}>
            <View style={[styles.roundBtn, { backgroundColor: T.card, borderColor: T.line, borderBottomColor: T.ledge }]}>
              <Ionicons name="chevron-down" size={24} color={T.tx} />
            </View>
          </PressableScale>
          <View style={styles.flex1}>
            <AppText variant="caption" tone="muted">
              BAT02 · {ta ? 'பாடத்திட்ட ஆவணங்கள்' : 'Curriculum Docs'}
            </AppText>
            <AppText variant="title" numberOfLines={1}>
              {ta ? '25-வார வளர்ச்சிப் பயணம்' : '25-Week Growth Journey'}
            </AppText>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs} style={styles.tabsScroll}>
          {tabs.map((x) => (
            <Chip key={x.k} icon={x.icon} label={x.label} color={T.tertiary} selected={tab === x.k} onPress={() => setTab(x.k)} />
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {tab === 'roadmap' && renderRoadmap()}
          {tab === 'q' && renderQ()}
          {tab === 'dims' && renderDims()}
          {tab === 'card' && renderCard()}
        </ScrollView>

        <HabitDetailModal visible={!!openHabit} habit={openHabit} onClose={() => setOpenHabit(null)} S={{ ...S, batch: 'BAT02' }} T={T} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex1: { flex: 1, minWidth: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingBottom: space.sm
  },
  roundBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabsScroll: { flexGrow: 0, flexShrink: 0 },
  tabs: { paddingHorizontal: space.lg, paddingVertical: space.sm, gap: space.sm },
  body: {
    paddingHorizontal: space.lg,
    paddingTop: space.sm,
    paddingBottom: space.huge,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center'
  },
  stack: { gap: space.md },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  mtMd: { marginTop: space.md },
  dimHead: { padding: space.sm, paddingBottom: space.md },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.md,
    paddingHorizontal: space.sm,
    borderTopWidth: 1,
    minHeight: touch.minTarget
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.md,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderBottomWidth: 4
  },
  weekNum: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  printHead: { gap: 2, marginBottom: space.md },
  printDim: { flexDirection: 'row', gap: space.sm, marginTop: space.md },
  printDimBar: { width: 5, borderRadius: 3 },
  printHabit: { flexDirection: 'row', alignItems: 'flex-start', gap: space.sm, marginTop: space.sm },
  printBox: { width: 18, height: 18, borderRadius: 5, borderWidth: 2, marginTop: 1 },
  printBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    minHeight: 56,
    borderRadius: radius.lg,
    borderBottomWidth: 4
  }
});
