import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AgeProfileModal from '../screens/AgeProfileModal';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';

export default function Header({ S, update, T }) {
  const [showAgeModal, setShowAgeModal] = useState(false);
  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const stageName = t.stages[S.age] || '';
  const streakCount = L.streak(S);
  const currentLvl = L.level(S);
  const sc = L.weekScore(S);

  return (
    <View style={[styles.container, { borderBottomColor: T.line }]}>
      <View style={styles.unifiedRow}>
        {/* Left: Student Profile & Understated Crest */}
        <Pressable
          style={styles.profileBtn}
          onPress={() => setShowAgeModal(true)}
          accessibilityRole="button"
          accessibilityLabel="Open Age Psychology and Hero Journey"
        >
          {/* Avatar with Specular Aura Ring */}
          <View style={[styles.avatarAura, { borderColor: T.primary, shadowColor: T.primary }]}>
            <Text style={styles.avatarText}>{S.avatar || '🦁'}</Text>
            <View style={[styles.auraBeacon, { backgroundColor: T.primary, borderColor: T.bg }]} />
          </View>

          <View style={styles.nameBlock}>
            <View style={styles.nameRow}>
              <Text style={[styles.nameText, { color: T.tx, flexShrink: 1 }]} numberOfLines={1}>{S.name}</Text>
              <View style={[styles.lvlPill, { backgroundColor: T.secondary + '20', borderColor: T.secondary + '60', flexShrink: 0 }]}>
                <Text style={[styles.lvlText, { color: T.secondary }]} numberOfLines={1}>
                  {lang === 'ta' ? `நிலை ${currentLvl}` : `LVL ${currentLvl}`}
                </Text>
              </View>
            </View>
            <View style={styles.subMetaRow}>
              <Text
                style={[styles.stageText, { color: T.mu, flexShrink: 1 }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
              >
                {lang === 'ta' ? `வயது ${S.age}` : `Age ${S.age}`} · {stageName}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* Right: Clean Uncongested Gamified Stats (Streak & Points) */}
        <View style={[styles.rightActions, { flexShrink: 0 }]}>
          {/* Streak Capsule */}
          <View style={[styles.statCapsule, { backgroundColor: T.secondary + '18', borderColor: T.secondary + '50' }]}>
            <Ionicons name="flame" size={13} color={T.secondary} />
            <Text style={[styles.capsuleText, { color: T.secondary }]}>
              {lang === 'ta' ? `${streakCount}நா` : `${streakCount}d`}
            </Text>
          </View>

          {/* Points Capsule */}
          <View style={[styles.statCapsule, { backgroundColor: T.primary + '18', borderColor: T.primary + '50' }]}>
            <Ionicons name="sparkles" size={12} color={T.primary} />
            <Text style={[styles.capsuleText, { color: T.primary }]}>{sc.scaledScore}</Text>
          </View>
        </View>
      </View>

      {/* Age Profile & Hero Journey Modal (Section 1 & 2) */}
      <AgeProfileModal
        visible={showAgeModal}
        age={S.age}
        onClose={() => setShowAgeModal(false)}
        S={S}
        T={T}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1
  },
  unifiedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flex: 1,
    marginRight: 6
  },
  avatarAura: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2
  },
  avatarText: {
    fontSize: 20
  },
  auraBeacon: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#080C16'
  },
  nameBlock: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center'
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  nameText: {
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: -0.2
  },
  lvlPill: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
    borderWidth: 0.8
  },
  lvlText: {
    fontSize: 8.5,
    fontWeight: '900',
    letterSpacing: 0.4
  },
  subMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2
  },
  miniLogo: {
    width: 13,
    height: 13,
    opacity: 0.85
  },
  stageText: {
    fontSize: 11,
    fontWeight: '500'
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  statCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 3.5,
    paddingHorizontal: 7
  },
  capsuleText: {
    fontSize: 10.5,
    fontWeight: '800'
  }
});
