import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Alert, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GuidesModal from './GuidesModal';
import AgeProfileModal from './AgeProfileModal';
import ClassroomPrintablesModal from './ClassroomPrintablesModal';
import CurriculumBookModal from './CurriculumBookModal';
import { DIMS, HABITS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { isSoundMuted, setSoundMuted, triggerHaptic } from '../haptics';

const PRIVACY_URL = 'https://vishalmurugan1986.github.io/hapitopia/privacy.html';
const SUPPORT_URL = 'https://vishalmurugan1986.github.io/hapitopia/support.html';

export default function MeScreen({ S, update, setTab, T, onLock }) {
  const [showGuides, setShowGuides] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showPrintables, setShowPrintables] = useState(false);
  const [showCurriculumBooks, setShowCurriculumBooks] = useState(false);

  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const muted = S.soundMuted !== undefined ? !!S.soundMuted : isSoundMuted();
  const isDarkTheme = T.name === 'dark';

  const toggleTheme = (targetMode) => {
    triggerHaptic('selection');
    const nextMode = targetMode || (isDarkTheme ? 'light' : 'dark');
    update({ ...S, themeMode: nextMode });
  };

  // Count habit completions
  const completionCount = {};
  Object.values(S.done || {}).forEach((dayList) => {
    if (Array.isArray(dayList)) {
      dayList.forEach((id) => {
        completionCount[id] = (completionCount[id] || 0) + 1;
      });
    }
  });

  const earnedBadges = [];
  DIMS.forEach((d) => {
    HABITS[d.k].forEach((h, i) => {
      const hid = d.k + i;
      if ((completionCount[hid] || 0) >= 7) {
        earnedBadges.push({
          id: hid,
          d,
          name: (t.habits && t.habits[hid] ? t.habits[hid].name : h[0]),
          times: completionCount[hid]
        });
      }
    });
  });

  const toggleLanguage = (targetLang) => {
    triggerHaptic('selection');
    const nextLang = targetLang || (lang === 'en' ? 'ta' : 'en');
    update({ ...S, lang: nextLang });
  };

  const toggleSound = () => {
    const nextMuted = !muted;
    setSoundMuted(nextMuted);
    if (!nextMuted) {
      triggerHaptic('selection');
    }
    update({ ...S, soundMuted: nextMuted });
  };

  const handleReset = () => {
    Alert.alert(
      lang === 'ta' ? 'சுயவிவரத்தை நீக்கவா?' : 'Remove Profile?',
      lang === 'ta'
        ? 'இது இந்த சுயவிவரத்தின் முன்னேற்றத்தை சாதனத்திலிருந்து நீக்கிவிடும்.'
        : 'This will remove this player profile and its progress from this device.',
      [
        { text: lang === 'ta' ? 'ரத்து' : 'Cancel', style: 'cancel' },
        {
          text: lang === 'ta' ? 'நீக்கு' : 'Remove',
          style: 'destructive',
          onPress: () => {
            const currentId = S.id || (S.name ? `${S.name.toLowerCase()}_${S.age || 9}` : '');
            const remaining = (Array.isArray(S.savedProfiles) ? S.savedProfiles : []).filter(p => {
              const pid = p.id || `${(p.name || '').toLowerCase()}_${p.age || 9}`;
              return pid !== currentId;
            });
            update({ lang: S.lang || 'en', savedProfiles: remaining });
            setTab('today');
            if (onLock) onLock();
          }
        }
      ]
    );
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* 1. Hero Child Avatar Banner */}
      <Pressable
        onPress={() => setShowAgeModal(true)}
        style={[
          styles.profileHeroCard,
          {
            backgroundColor: T.cardElevated || T.card,
            borderColor: T.lineHigh
          }
        ]}
      >
        <View style={[styles.avatarGlowBox, { borderColor: T.primary, shadowColor: T.primary }]}>
          <Text style={styles.avatarBig}>{S.avatar || '🦁'}</Text>
          <View style={[styles.onlineBeacon, { backgroundColor: T.primary, borderColor: T.cardElevated || T.card }]} />
        </View>

        <Text style={[styles.nameBig, { color: T.tx }]}>{S.name}</Text>
        <View style={[styles.stageBadge, { backgroundColor: T.secondary + '18', borderColor: T.secondary + '60' }]}>
          <Ionicons name="sparkles" size={12} color={T.secondary} />
          <Text style={[styles.stageBadgeText, { color: T.secondary }]}>
            {lang === 'ta' ? `வயது ${S.age}` : `Age ${S.age}`} · {t.stages[S.age]}
          </Text>
        </View>

        <Text style={[styles.tapHint, { color: T.mu }]}>
          {lang === 'ta' ? 'உளவியல் விவரம் மற்றும் ஹீரோ பயணத்தைக் காண தொடவும்' : 'Tap to view Age Psychology & Hero Journey'}
        </Text>
      </Pressable>

      {/* 2. Gamified Stats Bento Card */}
      <View style={[styles.statsCard, { backgroundColor: T.card, borderColor: T.line }]}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCol, { borderRightColor: T.line, borderRightWidth: 1 }]}>
            <Text style={[styles.statNumber, { color: T.primary }]}>{L.level(S)}</Text>
            <Text style={[styles.statLabel, { color: T.mu }]}>{t.level}</Text>
          </View>
          <View style={[styles.statCol, { borderRightColor: T.line, borderRightWidth: 1 }]}>
            <Text style={[styles.statNumber, { color: T.secondary }]}>{L.xp(S)}</Text>
            <Text style={[styles.statLabel, { color: T.mu }]}>{t.xp}</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={[styles.statNumber, { color: T.tertiary }]}>
              {lang === 'ta' ? `${L.streak(S)}நா` : `${L.streak(S)}d`}
            </Text>
            <Text style={[styles.statLabel, { color: T.mu }]}>{t.streak}</Text>
          </View>
        </View>
      </View>

      {/* 3. Theme, Sound & Language Quick Controls */}
      <View style={[styles.sectionCard, { backgroundColor: T.card, borderColor: T.line }]}>
        <Text style={[styles.menuHeading, { color: T.mu }]}>
          {t.themeSoundHeading || (lang === 'ta' ? 'பயன்முறை, ஒலி & மொழி' : 'Theme, Sound & Language')}
        </Text>

        {/* Day / Night Theme Row */}
        <View
          style={[styles.prefRow, { borderBottomColor: T.line, borderBottomWidth: 1, paddingBottom: 12, marginBottom: 12 }]}
        >
          <View style={styles.prefLeft}>
            <View
              style={[
                styles.menuIconBox,
                {
                  backgroundColor: isDarkTheme ? (T.purple || '#A855F7') + '18' : (T.secondary || '#D97706') + '18',
                  borderColor: isDarkTheme ? (T.purple || '#A855F7') + '45' : (T.secondary || '#D97706') + '45'
                }
              ]}
            >
              <Ionicons
                name={isDarkTheme ? 'moon-outline' : 'sunny-outline'}
                size={18}
                color={isDarkTheme ? (T.purple || '#A855F7') : (T.secondary || '#D97706')}
              />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemTitle, { color: T.tx }]}>
                {t.dayNightMode || (lang === 'ta' ? 'பகல் / இரவு பயன்முறை' : 'Day / Night Mode')}
              </Text>
              <Text style={[styles.menuItemSubtitle, { color: T.mu }]}>
                {isDarkTheme
                  ? (t.nightThemeActive || (lang === 'ta' ? 'இரவு பயன்முறை செயல்பாட்டில் உள்ளது' : 'Night mode (Deep luminous theme)'))
                  : (t.dayThemeActive || (lang === 'ta' ? 'பகல் பயன்முறை செயல்பாட்டில் உள்ளது' : 'Day mode (Bright ivory theme)'))}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.themeSegmentedControl,
              {
                backgroundColor: T.surfaceLowest || '#060E20',
                borderColor: T.lineHigh
              }
            ]}
          >
            <Pressable
              onPress={() => toggleTheme('light')}
              style={[
                styles.themeSegBtn,
                !isDarkTheme && { backgroundColor: T.secondary }
              ]}
              accessibilityRole="button"
              accessibilityLabel="Day mode"
            >
              <Ionicons
                name="sunny"
                size={12}
                color={!isDarkTheme ? '#FFFFFF' : T.mu}
              />
              <Text style={[styles.themeSegText, { color: !isDarkTheme ? '#FFFFFF' : T.mu }]}>
                {t.dayMode || (lang === 'ta' ? 'பகல்' : 'Day')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => toggleTheme('dark')}
              style={[
                styles.themeSegBtn,
                isDarkTheme && { backgroundColor: T.primary }
              ]}
              accessibilityRole="button"
              accessibilityLabel="Night mode"
            >
              <Ionicons
                name="moon"
                size={12}
                color={isDarkTheme ? '#FFFFFF' : T.mu}
              />
              <Text style={[styles.themeSegText, { color: isDarkTheme ? '#FFFFFF' : T.mu }]}>
                {t.nightMode || (lang === 'ta' ? 'இரவு' : 'Night')}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Sound Effects Row */}
        <Pressable
          onPress={toggleSound}
          style={[styles.prefRow, { borderBottomColor: T.line, borderBottomWidth: 1, paddingBottom: 12, marginBottom: 12 }]}
          accessibilityRole="button"
          accessibilityLabel={muted ? 'Unmute Sound' : 'Mute Sound'}
        >
          <View style={styles.prefLeft}>
            <View
              style={[
                styles.menuIconBox,
                {
                  backgroundColor: muted ? (T.surfaceLowest || '#060E20') : T.primary + '18',
                  borderColor: muted ? T.line : T.primary + '45'
                }
              ]}
            >
              <Ionicons
                name={muted ? 'volume-mute-outline' : 'volume-high-outline'}
                size={18}
                color={muted ? T.mu : T.primary}
              />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemTitle, { color: T.tx }]}>
                {lang === 'ta' ? 'விளையாட்டு ஒலி' : 'Game Sound Effects'}
              </Text>
              <Text style={[styles.menuItemSubtitle, { color: T.mu }]}>
                {muted
                  ? (lang === 'ta' ? 'தற்போது ஒலி நிறுத்தப்பட்டுள்ளது' : 'Audio feedback is currently muted')
                  : (lang === 'ta' ? 'இசை ஒலி விளைவுகள் செயல்பாட்டில் உள்ளன' : 'Musical marimba & celesta sounds active')}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.soundTogglePill,
              {
                backgroundColor: muted ? (T.surfaceLowest || '#060E20') : T.primary + '20',
                borderColor: muted ? T.lineHigh : T.primary
              }
            ]}
          >
            <Ionicons
              name={muted ? 'volume-mute' : 'volume-high'}
              size={13}
              color={muted ? T.mu : T.primary}
            />
            <Text style={[styles.soundToggleText, { color: muted ? T.mu : T.primary }]}>
              {muted ? (lang === 'ta' ? 'ஆஃப்' : 'OFF') : (lang === 'ta' ? 'ஆன்' : 'ON')}
            </Text>
          </View>
        </Pressable>

        {/* Language / Translate Row */}
        <View style={styles.prefRow}>
          <View style={styles.prefLeft}>
            <View
              style={[
                styles.menuIconBox,
                {
                  backgroundColor: T.secondary + '18',
                  borderColor: T.secondary + '45'
                }
              ]}
            >
              <Ionicons name="globe-outline" size={18} color={T.secondary} />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemTitle, { color: T.tx }]}>
                {lang === 'ta' ? 'செயலி மொழி (Translate)' : 'App Language (Translate)'}
              </Text>
              <Text style={[styles.menuItemSubtitle, { color: T.mu }]}>
                {lang === 'ta' ? 'தமிழ் மற்றும் ஆங்கிலம் இடையே மாற்றவும்' : 'Switch between English and தமிழ்'}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.langSegmentedControl,
              {
                backgroundColor: T.surfaceLowest || '#060E20',
                borderColor: T.lineHigh
              }
            ]}
          >
            <Pressable
              onPress={() => toggleLanguage('en')}
              style={[
                styles.langSegBtn,
                lang === 'en' && { backgroundColor: T.primary }
              ]}
            >
              <Text style={[styles.langSegText, { color: lang === 'en' ? '#FFFFFF' : T.mu }]}>
                EN
              </Text>
            </Pressable>
            <Pressable
              onPress={() => toggleLanguage('ta')}
              style={[
                styles.langSegBtn,
                lang === 'ta' && { backgroundColor: T.primary }
              ]}
            >
              <Text style={[styles.langSegText, { color: lang === 'ta' ? '#FFFFFF' : T.mu }]}>
                தமிழ்
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* 4. Habit Badges Showcase */}
      <View style={[styles.sectionCard, { backgroundColor: T.card, borderColor: T.line }]}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="ribbon-outline" size={16} color={T.secondary} />
          <Text style={[styles.sectionTitle, { color: T.tx }]}>{t.habitBadges}</Text>
        </View>
        <Text style={[styles.sectionDesc, { color: T.mu }]}>
          {t.earnedBadgeDesc || (lang === 'ta' ? 'ஒரு பழக்கத்தை 7 முறை பயிற்சி செய்த பின் திறக்கப்படும்.' : 'Unlocked after practicing a habit on 7 days.')}
        </Text>

        {earnedBadges.length === 0 ? (
          <View style={[styles.emptyBadgesBox, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
            <Ionicons name="lock-closed-outline" size={24} color={T.mu} />
            <Text style={[styles.emptyBadgesText, { color: T.mu }]}>
              {t.noBadgesYet || (lang === 'ta' ? 'பழக்கங்களை முடித்துப் பதக்கங்களை வெல்லுங்கள்!' : 'Practice habits 7 times to unlock badges!')}
            </Text>
          </View>
        ) : (
          <View style={styles.badgesRow}>
            {earnedBadges.map((b) => (
              <View
                key={b.id}
                style={[
                  styles.badgeChip,
                  {
                    backgroundColor: b.d.c[T.ci] + '18',
                    borderColor: b.d.c[T.ci] + '60'
                  }
                ]}
              >
                <Ionicons name="star" size={13} color={b.d.c[T.ci]} />
                <Text style={[styles.badgeName, { color: T.tx }]} numberOfLines={1}>
                  {b.name}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* 4. Core Features & Publishing Series Menu */}
      <View style={[styles.sectionCard, { backgroundColor: T.card, borderColor: T.line }]}>
        <Text style={[styles.menuHeading, { color: T.mu }]}>
          {lang === 'ta' ? 'முக்கிய தொகுதிகள் & வழிகாட்டிகள்' : 'Curriculum Resources & Framework Modules'}
        </Text>

        {/* 8-Book Publishing Series */}
        <Pressable
          onPress={() => setShowCurriculumBooks(true)}
          style={[styles.menuItem, { borderBottomColor: T.line }]}
        >
          <View style={[styles.menuIconBox, { backgroundColor: T.tertiary + '18', borderColor: T.tertiary + '40' }]}>
            <Ionicons name="book-outline" size={18} color={T.tertiary} />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={[styles.menuItemTitle, { color: T.tx }]}>
              {lang === 'ta' ? '8-புத்தக வெளியீட்டுத் தொடர்' : '8-Book Publishing Curriculum Series'}
            </Text>
            <Text style={[styles.menuItemSubtitle, { color: T.mu }]}>
              {lang === 'ta' ? 'வயது 7 முதல் 14 வரையிலான முழுமையான பாடத்திட்டம்' : 'Age-graded 8-book series with 10 publishing elements'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={T.mu} />
        </Pressable>

        {/* Classroom Printables */}
        <Pressable
          onPress={() => setShowPrintables(true)}
          style={[styles.menuItem, { borderBottomColor: T.line }]}
        >
          <View style={[styles.menuIconBox, { backgroundColor: T.primary + '18', borderColor: T.primary + '40' }]}>
            <Ionicons name="print-outline" size={18} color={T.primary} />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={[styles.menuItemTitle, { color: T.tx }]}>
              {lang === 'ta' ? 'வகுப்பறை & வீட்டு அச்சுப் பிரதிகள்' : 'Classroom & Home Printables (A4)'}
            </Text>
            <Text style={[styles.menuItemSubtitle, { color: T.mu }]}>
              {lang === 'ta' ? 'பழக்க அட்டை, சுவர் போஸ்டர், 8-வார காலண்டர்' : 'Habit Card, Wall Poster, 8-Week Calendar, Handbook'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={T.mu} />
        </Pressable>

        {/* Parent & Teacher Guides */}
        <Pressable
          onPress={() => setShowGuides(true)}
          style={[styles.menuItem, { borderBottomColor: T.line }]}
        >
          <View style={[styles.menuIconBox, { backgroundColor: T.purple + '18', borderColor: T.purple + '40' }]}>
            <Ionicons name="people-outline" size={18} color={T.purple} />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={[styles.menuItemTitle, { color: T.tx }]}>
              {lang === 'ta' ? 'பெற்றோர் & ஆசிரியர் வழிகாட்டிகள்' : 'Parent & Teacher Implementation Guides'}
            </Text>
            <Text style={[styles.menuItemSubtitle, { color: T.mu }]}>
              {lang === 'ta' ? 'பகுதி 8 (4 பெற்றோர் தூண்கள்) & பகுதி 9 (3 பள்ளித் தூண்கள்)' : 'Section 8 (4 Parent Pillars) & Section 9 (3 School Pillars)'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={T.mu} />
        </Pressable>

        {/* Hero Journey & Age Profile */}
        <Pressable
          onPress={() => setShowAgeModal(true)}
          style={[styles.menuItem, { borderBottomWidth: 0, paddingBottom: 2 }]}
        >
          <View style={[styles.menuIconBox, { backgroundColor: T.secondary + '18', borderColor: T.secondary + '40' }]}>
            <Ionicons name="compass-outline" size={18} color={T.secondary} />
          </View>
          <View style={styles.menuItemContent}>
            <Text style={[styles.menuItemTitle, { color: T.tx }]}>
              {lang === 'ta' ? 'ஹீரோ பயணம் & குழந்தை உளவியல்' : 'Hero Journey & Age Psychology Profile'}
            </Text>
            <Text style={[styles.menuItemSubtitle, { color: T.mu }]}>
              {lang === 'ta' ? 'பகுதி 1 (அழைப்பு) & பகுதி 2 (5 உளவியல் பரிமாணங்கள்)' : 'Section 1 (Call to Adventure) & Section 2 (5 Age Domains)'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={T.mu} />
        </Pressable>
      </View>

      {/* 6. Privacy Compliance & Account Actions */}
      <View style={[styles.sectionCard, { backgroundColor: T.card, borderColor: T.line }]}>
        <View style={styles.privacyRow}>
          <Ionicons name="shield-checkmark" size={18} color={T.primary} />
          <Text style={[styles.privacyTitle, { color: T.tx }]}>
            {lang === 'ta' ? 'தனியுரிமை உத்தரவாதம் (DPDP Act 2023 & COPPA)' : 'Privacy & Security Guarantee (DPDP Act 2023)'}
          </Text>
        </View>
        <Text style={[styles.privacyDesc, { color: T.mu }]}>
          {t.privacyDetails || (lang === 'ta' ? 'அனைத்து முன்னேற்றத் தரவுகளும் உங்கள் சாதனத்தில் மட்டுமே இருக்கும். விளம்பரங்களோ, மூன்றாம் தரப்பு கண்காணிப்போ இல்லை.' : 'All habit data is stored 100% locally on this device. Zero cloud sync, zero ads, kid-safe.')}
        </Text>

        <View style={styles.actionButtonsRow}>
          {onLock && (
            <Pressable
              onPress={() => {
                triggerHaptic('light');
                onLock();
              }}
              style={[styles.halfBtn, { borderColor: T.primary, backgroundColor: T.primary + '18' }]}
            >
              <Ionicons name="lock-closed-outline" size={15} color={T.primary} />
              <Text style={[styles.halfBtnText, { color: T.primary }]}>
                {lang === 'ta' ? 'பூட்டு (Lock)' : 'Lock Profile'}
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={handleReset}
            style={[styles.halfBtn, { borderColor: T.line, backgroundColor: T.surfaceLowest || '#060E20' }]}
          >
            <Ionicons name="refresh-outline" size={15} color={T.rose} />
            <Text style={[styles.halfBtnText, { color: T.rose }]}>
              {t.resetProfile || (lang === 'ta' ? 'மீட்டமை' : 'Reset Profile')}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Minimal Understated Attribution Footer */}
      <View style={styles.footerAttribution}>
        <Image
          source={require('../../assets/habitopia_app_icon.png')}
          style={styles.footerLogo}
          resizeMode="contain"
        />
        <View style={styles.footerTextCol}>
          <Text style={[styles.footerTitle, { color: T.tx }]}>Habitopia</Text>
          <Text style={[styles.footerText, { color: T.dim }]}>
            {lang === 'ta'
              ? 'எதிர்காலத்தை வெல்லும் குழந்தையை உருவாக்குவோம்'
              : 'Build a future-proof child'}
          </Text>
        </View>
      </View>

      {/* Legal links (GitHub Pages) */}
      <View style={styles.legalLinksRow}>
        <Pressable
          onPress={() => Linking.openURL(PRIVACY_URL).catch(() => {})}
          style={styles.legalLink}
          accessibilityRole="link"
          accessibilityLabel="Privacy Policy"
        >
          <Ionicons name="shield-checkmark-outline" size={14} color={T.primary} />
          <Text style={[styles.legalLinkText, { color: T.primary }]}>
            {lang === 'ta' ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
          </Text>
        </Pressable>
        <View style={{ width: 1, height: 12, backgroundColor: T.lineHigh }} />
        <Pressable
          onPress={() => Linking.openURL(SUPPORT_URL).catch(() => {})}
          style={styles.legalLink}
          accessibilityRole="link"
          accessibilityLabel="Support and FAQ"
        >
          <Ionicons name="help-buoy-outline" size={14} color={T.primary} />
          <Text style={[styles.legalLinkText, { color: T.primary }]}>
            {lang === 'ta' ? 'ஆதரவு & கேள்விகள்' : 'Support & FAQ'}
          </Text>
        </Pressable>
      </View>

      {/* Modals */}
      <AgeProfileModal
        visible={showAgeModal}
        age={S.age}
        onClose={() => setShowAgeModal(false)}
        S={S}
        T={T}
      />

      <GuidesModal
        visible={showGuides}
        onClose={() => setShowGuides(false)}
        S={S}
        T={T}
      />

      <ClassroomPrintablesModal
        visible={showPrintables}
        onClose={() => setShowPrintables(false)}
        S={S}
        T={T}
      />

      <CurriculumBookModal
        visible={showCurriculumBooks}
        onClose={() => setShowCurriculumBooks(false)}
        S={S}
        T={T}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 36
  },
  footerAttribution: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    marginBottom: 8,
    paddingHorizontal: 16
  },
  footerLogo: {
    width: 36,
    height: 36,
    borderRadius: 10
  },
  footerTextCol: {
    justifyContent: 'center'
  },
  footerTitle: {
    fontSize: 16,
    fontFamily: 'Fredoka',
    fontWeight: 'normal',
    letterSpacing: 0.3
  },
  legalLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 4,
    marginBottom: 12
  },
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 4
  },
  legalLinkText: {
    fontSize: 12,
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14
  },
  profileHeroCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4
  },
  avatarGlowBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4
  },
  avatarBig: {
    fontSize: 40
  },
  onlineBeacon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#0A0F1D'
  },
  nameBig: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3
  },
  stageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 6,
    maxWidth: '95%'
  },
  stageBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    flexShrink: 1,
    textAlign: 'center'
  },
  tapHint: {
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center'
  },
  statsCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    marginBottom: 14
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center'
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800'
  },
  sectionDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10
  },
  emptyBadgesBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 6
  },
  emptyBadgesText: {
    fontSize: 12,
    textAlign: 'center'
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  badgeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  badgeName: {
    fontSize: 11.5,
    fontWeight: '700'
  },
  menuHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  soundTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 14,
    borderWidth: 1
  },
  soundToggleText: {
    fontSize: 11.5,
    fontWeight: '800'
  },
  themeSegmentedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 3,
    gap: 2
  },
  themeSegBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 12
  },
  themeSegText: {
    fontSize: 11.5,
    fontWeight: '800'
  },
  langSegmentedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 3,
    gap: 2
  },
  langSegBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12
  },
  langSegText: {
    fontSize: 11.5,
    fontWeight: '800'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    gap: 12
  },
  menuIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuItemContent: {
    flex: 1
  },
  menuItemTitle: {
    fontSize: 13.5,
    fontWeight: '800'
  },
  menuItemSubtitle: {
    fontSize: 11.5,
    lineHeight: 15,
    marginTop: 1
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  privacyTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    flex: 1
  },
  privacyDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 12
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8
  },
  halfBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 9
  },
  halfBtnText: {
    fontSize: 12,
    fontWeight: '700'
  }
});
