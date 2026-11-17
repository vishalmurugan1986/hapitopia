import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AgeProfileModal from '../screens/AgeProfileModal';
import { getAvatarMeta } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { AppText, PressableScale, StatBadge, ProgressBar, HabiBuddy, space, radius } from '../design';

function greetingFor(lang) {
  const h = new Date().getHours();
  if (lang === 'ta') return h < 12 ? 'காலை வணக்கம்' : h < 17 ? 'மதிய வணக்கம்' : 'மாலை வணக்கம்';
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

/**
 * App header: friendly greeting, avatar (opens the Hero Journey), level-up
 * progress, and the two numbers kids care about most – streak and points.
 */
export default function Header({ S, update, T }) {
  const [showAgeModal, setShowAgeModal] = useState(false);
  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const streakCount = L.streak(S);
  const currentLvl = L.level(S);
  const xpIntoLevel = L.xp(S) % 100;
  const sc = L.weekScore(S);
  const avMeta = getAvatarMeta(S.avatar);
  const firstName = (S.name || '').trim().split(/\s+/)[0];

  return (
    <View style={[styles.container, { backgroundColor: T.bg }]}>
      <View style={styles.row}>
        <PressableScale
          containerStyle={styles.profileSlot}
          style={styles.profileBtn}
          onPress={() => setShowAgeModal(true)}
          accessibilityRole="button"
          accessibilityLabel={`${S.name}, level ${currentLvl}. Open your Hero Journey`}
        >
          <View
            style={[
              styles.avatar,
              { backgroundColor: avMeta.color + '26', borderColor: avMeta.color, borderBottomColor: avMeta.color }
            ]}
          >
            <HabiBuddy avatar={S.avatar} size={46} />
            <View style={[styles.levelBadge, { backgroundColor: T.secondaryFill, borderColor: T.bg }]}>
              <AppText variant="caption" color={T.onSecondary} style={styles.levelBadgeText}>
                {currentLvl}
              </AppText>
            </View>
          </View>

          <View style={styles.nameBlock}>
            <AppText variant="caption" tone="muted" numberOfLines={1}>
              {greetingFor(lang)} 👋
            </AppText>
            <AppText variant="heading" numberOfLines={1}>
              {firstName}
            </AppText>
            <View style={styles.levelRow}>
              <ProgressBar
                value={xpIntoLevel / 100}
                height={8}
                color={T.secondaryFill}
                style={styles.levelBar}
                accessibilityLabel={`${xpIntoLevel} of 100 XP to level ${currentLvl + 1}`}
              />
              <AppText variant="caption" tone="secondary" numberOfLines={1}>
                {lang === 'ta' ? `நிலை ${currentLvl}` : `Lv ${currentLvl}`}
              </AppText>
            </View>
          </View>
        </PressableScale>

        <View style={styles.stats}>
          <StatBadge
            icon="flame"
            value={streakCount}
            color={T.coral}
            accessibilityLabel={lang === 'ta' ? `${streakCount} நாள் தொடர்` : `${streakCount} day streak`}
          />
          <StatBadge
            icon="star"
            value={sc.scaledScore}
            color={T.secondary}
            accessibilityLabel={lang === 'ta' ? `${sc.scaledScore} புள்ளிகள்` : `${sc.scaledScore} points this week`}
          />
        </View>
      </View>

      <AgeProfileModal visible={showAgeModal} age={S.age} onClose={() => setShowAgeModal(false)} S={S} T={T} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: space.lg,
    paddingTop: space.xs,
    paddingBottom: space.md
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm
  },
  profileSlot: {
    flex: 1,
    minWidth: 0
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    flex: 1,
    minWidth: 0
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  levelBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  levelBadgeText: {
    fontSize: 12,
    lineHeight: 15
  },
  nameBlock: {
    flex: 1,
    minWidth: 0
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginTop: 3
  },
  levelBar: {
    flex: 1,
    width: undefined,
    maxWidth: 110
  },
  stats: {
    flexDirection: 'row',
    gap: space.xs + 2
  }
});
