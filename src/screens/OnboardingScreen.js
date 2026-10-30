import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  Platform,
  KeyboardAvoidingView,
  StatusBar as RNStatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AVATARS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic, isSoundMuted, toggleSoundMuted } from '../haptics';

const AGE_ROWS = [
  [7, 8, 9, 10],
  [11, 12, 13, 14]
];

const AVATAR_ROWS = [
  AVATARS.slice(0, 4),
  AVATARS.slice(4, 8)
];

export default function OnboardingScreen({
  S = {},
  update,
  T,
  onUnlock,
  initialScreen = 'welcome'
}) {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 48 : (RNStatusBar.currentHeight || 28) + 6
  );
  const bottomInset = Math.max(insets.bottom, 14);

  // Screen modes: 'welcome' | 'pinSetup' | 'profile' | 'quickLogin'
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [lang, setLang] = useState(S?.lang || 'en');
  const [showQrModal, setShowQrModal] = useState(false);

  // All profiles created on this device
  const savedProfiles = Array.isArray(S?.savedProfiles) && S.savedProfiles.length > 0
    ? S.savedProfiles
    : S?.name
      ? [S]
      : [];

  // Selected saved profile for PIN unlock
  const [selectedProfile, setSelectedProfile] = useState(
    savedProfiles[0] || null
  );

  // Screen 2A: PIN Setup draft
  const [pinStep, setPinStep] = useState(1); // 1: enter, 2: confirm
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [pinSuccess, setPinSuccess] = useState('');
  const isTransitioningRef = useRef(false);

  // Screen 2B: Profile draft
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [consent, setConsent] = useState(false);
  const [profileErr, setProfileErr] = useState('');

  // Screen 3: Saved Profile Quick Login
  const [loginPin, setLoginPin] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryFeedback, setRecoveryFeedback] = useState('');
  const [recoveredPin, setRecoveredPin] = useState(null);

  const activeTargetProfile = selectedProfile || (S?.name ? S : null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Change language on the fly
  const handleSelectLang = (newLang) => {
    triggerHaptic('light');
    setLang(newLang);
    if (S && S.name) {
      update({ ...S, lang: newLang });
    }
  };

  // Start "I'm New" flow cleanly
  const startNewPlayerFlow = () => {
    triggerHaptic('medium');
    isTransitioningRef.current = false;
    setPinStep(1);
    setPin1('');
    setPin2('');
    setPinErr('');
    setPinSuccess('');
    setName('');
    setAge(0);
    setAvatar(AVATARS[0]);
    setConsent(false);
    setProfileErr('');
    setCurrentScreen('pinSetup');
  };

  // Open Quick Login for a specific saved profile on this device
  const openSavedProfileLogin = (profileItem) => {
    triggerHaptic('light');
    isTransitioningRef.current = false;
    setSelectedProfile(profileItem);
    if (profileItem?.lang) {
      setLang(profileItem.lang);
    }
    setLoginPin('');
    setLoginErr('');
    setLoginSuccess('');
    setRecoveryFeedback('');
    setRecoveredPin(null);
    setCurrentScreen('quickLogin');
  };

  // Navigation handlers
  const handleBack = () => {
    triggerHaptic('light');
    isTransitioningRef.current = false;
    setPinErr('');
    setPinSuccess('');
    setProfileErr('');
    setLoginErr('');
    setLoginSuccess('');

    if (currentScreen === 'pinSetup') {
      if (pinStep === 2) {
        setPinStep(1);
        setPin2('');
      } else {
        setCurrentScreen('welcome');
      }
    } else if (currentScreen === 'profile') {
      setPinStep(1);
      setPin1('');
      setPin2('');
      setCurrentScreen('pinSetup');
    } else if (currentScreen === 'quickLogin') {
      setCurrentScreen('welcome');
    }
  };

  // --- SCREEN 2A: NUMPAD HANDLERS ---
  const handlePinSetupKeyPress = (key) => {
    if (isTransitioningRef.current) return;
    triggerHaptic('light');
    setPinErr('');
    setPinSuccess('');

    if (key === 'C') {
      if (pinStep === 2) {
        setPin2('');
      } else {
        setPin1('');
      }
      return;
    }

    if (key === '⌫') {
      if (pinStep === 2) {
        if (pin2.length > 0) {
          setPin2(pin2.slice(0, -1));
        } else {
          setPinStep(1);
          setPin1(pin1.slice(0, -1));
        }
      } else {
        setPin1(pin1.slice(0, -1));
      }
      return;
    }

    // Number keys '0'-'9'
    if (pinStep === 1) {
      if (pin1.length < 4) {
        const next = pin1 + key;
        setPin1(next);
        if (next.length === 4) {
          triggerHaptic('medium');
          isTransitioningRef.current = true;
          setTimeout(() => {
            setPinStep(2);
            isTransitioningRef.current = false;
          }, 180);
        }
      }
    } else if (pinStep === 2) {
      if (pin2.length < 4) {
        const next = pin2 + key;
        setPin2(next);
        if (next.length === 4) {
          if (next === pin1) {
            triggerHaptic('success');
            isTransitioningRef.current = true;
            setPinSuccess(t.pinMatchedSuccess || 'PIN matched! Proceeding...');
            setTimeout(() => {
              setPinSuccess('');
              isTransitioningRef.current = false;
              setCurrentScreen('profile');
            }, 450);
          } else {
            triggerHaptic('warning');
            isTransitioningRef.current = true;
            setPinErr(t.pinMismatchErr || 'PINs do not match. Please re-enter Step 2.');
            setTimeout(() => {
              setPin2('');
              isTransitioningRef.current = false;
            }, 650);
          }
        }
      }
    }
  };

  // --- SCREEN 2B: START PLAYING ---
  const handleStartPlaying = () => {
    if (!name.trim()) {
      triggerHaptic('warning');
      setProfileErr(
        lang === 'ta'
          ? 'தயவுசெய்து உங்கள் செல்லப் பெயரை உள்ளிடவும்.'
          : 'Please enter your nickname to continue.'
      );
      return;
    }
    if (!age) {
      triggerHaptic('warning');
      setProfileErr(
        lang === 'ta'
          ? 'தயவுசெய்து உங்கள் வயதைத் தேர்ந்தெடுக்கவும் (7–14).'
          : 'Please select your age (7–14).'
      );
      return;
    }
    if (!consent) {
      triggerHaptic('warning');
      setProfileErr(
        lang === 'ta'
          ? 'தொடங்குவதற்கு பெற்றோர் ஒப்புதலை உறுதி செய்யவும்.'
          : 'Please confirm parental consent to start playing.'
      );
      return;
    }

    triggerHaptic('success');
    const cleanName = name.trim();
    const profileId = `${cleanName.toLowerCase()}_${age}_${Date.now()}`;
    const newProfile = {
      id: profileId,
      name: cleanName,
      age: age,
      avatar: avatar,
      pin: pin1.length === 4 ? pin1 : '1234',
      lang: lang,
      parentConsent: true,
      done: {},
      claims: {},
      goals: {},
      bonus: {},
      log: {},
      monthly: {},
      savedProfiles: [...savedProfiles]
    };

    update(newProfile);
    if (onUnlock) {
      onUnlock();
    }
  };

  // --- SCREEN 3: SAVED PROFILE QUICK LOGIN NUMPAD HANDLERS ---
  const handleQuickLoginKeyPress = (key) => {
    if (isTransitioningRef.current) return;
    triggerHaptic('light');
    setLoginErr('');

    if (!activeTargetProfile) {
      triggerHaptic('warning');
      setLoginErr(
        t.noProfileFound ||
        "No saved profile selected. Please tap 'I'm New' to get started!"
      );
      return;
    }

    if (key === '⌫') {
      setLoginPin(loginPin.slice(0, -1));
      return;
    }
    if (key === '' || key === ' ') return;

    if (loginPin.length < 4) {
      const next = loginPin + key;
      setLoginPin(next);

      if (next.length === 4) {
        const storedPin = activeTargetProfile.pin || '1234';
        if (next === storedPin) {
          triggerHaptic('success');
          isTransitioningRef.current = true;
          setLoginSuccess(
            lang === 'ta'
              ? `நல்வரவு, ${activeTargetProfile.name}!`
              : `Welcome back, ${activeTargetProfile.name}!`
          );
          setTimeout(() => {
            isTransitioningRef.current = false;
            update({
              ...activeTargetProfile,
              lang,
              savedProfiles
            });
            if (onUnlock) onUnlock();
          }, 300);
        } else {
          triggerHaptic('warning');
          isTransitioningRef.current = true;
          setLoginErr(
            t.incorrectPinErr || 'Incorrect PIN. Try again or tap the recovery icon below.'
          );
          setTimeout(() => {
            setLoginPin('');
            isTransitioningRef.current = false;
          }, 650);
        }
      }
    }
  };

  // Avatar recovery check
  const handleAvatarRecoverySelect = (selectedAvatar) => {
    triggerHaptic('light');
    if (!activeTargetProfile) {
      setRecoveredPin(null);
      setRecoveryFeedback(
        t.noProfileFound || 'No saved profile found on this device.'
      );
      return;
    }
    if (activeTargetProfile.avatar === selectedAvatar) {
      triggerHaptic('success');
      setRecoveredPin(activeTargetProfile.pin || '1234');
      setRecoveryFeedback(
        `${t.identityVerified || 'Identity Verified! Welcome back, '}${activeTargetProfile.name}!`
      );
    } else {
      triggerHaptic('warning');
      setRecoveredPin(null);
      setRecoveryFeedback(
        lang === 'ta'
          ? 'இது உங்கள் அவதார் இல்லை. மீண்டும் முயற்சிக்கவும்!'
          : 'That was not your chosen avatar. Try again!'
      );
    }
  };

  // --- RENDER STICKY HEADER ---
  const renderStickyHeader = (showBack = true) => (
    <View style={[styles.stickyHeader, { borderBottomColor: T.line }]}>
      {showBack ? (
        <Pressable
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={[
            styles.backBtn,
            { borderColor: T.line, backgroundColor: T.cardElevated || T.card }
          ]}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <Ionicons name="chevron-back" size={20} color={T.tx} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            triggerHaptic('light');
            setShowQrModal(true);
          }}
          style={[
            styles.qrGuideBtn,
            {
              borderColor: T.lineHigh,
              backgroundColor: T.cardElevated || T.card
            }
          ]}
          accessibilityRole="button"
          accessibilityLabel="Open How to Play QR Guide"
        >
          <Ionicons
            name="qr-code-outline"
            size={18}
            color={T.tx}
          />
        </Pressable>
      )}

      {/* Right: Sticky [ EN | தமிழ் ] Toggle */}
      <View
        style={[
          styles.langPill,
          { borderColor: T.lineHigh, backgroundColor: T.cardElevated || T.card }
        ]}
      >
        <Pressable
          onPress={() => handleSelectLang('en')}
          style={[
            styles.langSegment,
            lang === 'en' && { backgroundColor: T.primary }
          ]}
          accessibilityRole="button"
          accessibilityLabel="Switch to English"
        >
          <Text
            style={[
              styles.langSegmentText,
              { color: lang === 'en' ? '#FFFFFF' : T.mu }
            ]}
          >
            EN
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleSelectLang('ta')}
          style={[
            styles.langSegment,
            lang === 'ta' && { backgroundColor: T.primary }
          ]}
          accessibilityRole="button"
          accessibilityLabel="Switch to Tamil"
        >
          <Text
            style={[
              styles.langSegmentText,
              { color: lang === 'ta' ? '#FFFFFF' : T.mu }
            ]}
          >
            தமிழ்
          </Text>
        </Pressable>
      </View>
    </View>
  );

  // --- 1. SCREEN 1: CLEAN MINIMAL WELCOME / MAIN INTERFACE ---
  if (currentScreen === 'welcome') {
    const gameLoopSteps =
      lang === 'ta'
        ? [
          { icon: 'leaf-outline', color: T.primary, label: '35 பழக்கங்கள்' },
          { icon: 'grid-outline', color: T.secondary, label: '5 பரிமாணங்கள்' },
          { icon: 'people-outline', color: T.tertiary, label: 'வயது 7-14' }
        ]
        : [
          { icon: 'leaf-outline', color: T.primary, label: '35 Habits' },
          { icon: 'grid-outline', color: T.secondary, label: '5 Dimensions' },
          { icon: 'people-outline', color: T.tertiary, label: 'Ages 7-14' }
        ];

    return (
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
        <StatusBar style={T.name === 'dark' ? 'light' : 'dark'} />
        {renderStickyHeader(false)}

        <ScrollView
          contentContainerStyle={styles.welcomeScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.welcomeCenterGroup}>
            {/* 1. Prominent Hero Achariya Logo Card */}
            <View
              style={[
                styles.logoCard,
                {
                  borderColor: T.lineHigh,
                  backgroundColor: T.surfaceLowest || '#060E20',
                  shadowColor: T.primary,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.25,
                  shadowRadius: 16,
                  elevation: 6
                }
              ]}
            >
              <Image
                source={require('../../assets/achariya_logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* 2. Bold Title & Tagline */}
            <View style={styles.titleBlock}>
              <Text style={[styles.mainH1, { color: T.tx }, lang !== 'ta' && styles.brandFont]}>
                {lang === 'ta' ? 'ஹேபிடோபியா' : 'Habitopia'}
              </Text>
              <Text style={[styles.mainSubtitle, { color: T.mu }]}>
                {lang === 'ta'
                  ? 'எதிர்காலத்தை வெல்லும் குழந்தையை உருவாக்குவோம்'
                  : 'Build a future-proof child'}
              </Text>
            </View>

            {/* 3. High-Impact Single-Line Game Loop Pill */}
            <View
              style={[
                styles.minimalLoopPill,
                {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.line
                }
              ]}
            >
              {gameLoopSteps.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <View style={styles.minimalLoopItem}>
                    <Ionicons name={item.icon} size={15} color={item.color} />
                    <Text
                      style={[styles.minimalLoopText, { color: T.tx }]}
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                  </View>
                  {idx < gameLoopSteps.length - 1 && (
                    <View
                      style={[
                        styles.minimalLoopDot,
                        { backgroundColor: T.lineHigh }
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>

            {/* 4. Saved Profiles on This Device (Clean Minimal Single-Row Cards) */}
            {savedProfiles.length > 0 && (
              <View style={styles.savedProfilesSection}>
                <Text style={[styles.savedProfilesHeading, { color: T.mu }]}>
                  {lang === 'ta'
                    ? 'யார் விளையாடுகிறார்கள்?'
                    : 'WHO IS PLAYING?'}
                </Text>

                <View style={styles.savedProfilesList}>
                  {savedProfiles.map((prof, idx) => {
                    const profXp = L.xp(prof);
                    const profLvl = L.level(prof);

                    return (
                      <Pressable
                        key={prof.id || `prof-${prof.name}-${idx}`}
                        onPress={() => openSavedProfileLogin(prof)}
                        style={({ pressed }) => [
                          styles.savedPlayerCard,
                          {
                            backgroundColor: pressed
                              ? T.primary + '18'
                              : T.cardElevated || T.card,
                            borderColor: T.lineHigh
                          }
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel={`Unlock profile ${prof.name}`}
                      >
                        <View
                          style={[
                            styles.savedAvatarBox,
                            {
                              backgroundColor: T.surfaceLowest || '#060E20',
                              borderColor: T.line
                            }
                          ]}
                        >
                          <Text style={styles.savedPlayerAvatar}>
                            {prof.avatar || '🦁'}
                          </Text>
                        </View>

                        <View style={styles.savedPlayerTextCol}>
                          <Text
                            style={[styles.savedPlayerTitle, { color: T.tx }]}
                            numberOfLines={1}
                          >
                            {prof.name}
                          </Text>
                          <Text
                            style={[styles.savedPlayerSub, { color: T.mu }]}
                            numberOfLines={1}
                          >
                            {lang === 'ta'
                              ? `வயது ${prof.age} · நிலை ${profLvl} · ${profXp} XP`
                              : `Age ${prof.age} · Level ${profLvl} · ${profXp} XP`}
                          </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color={T.mu} />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}

            {/* 5. Clean Primary Action Button */}
            <View style={styles.welcomeActions}>
              <Pressable
                onPress={startNewPlayerFlow}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  {
                    backgroundColor: T.primary,
                    opacity: pressed ? 0.9 : 1
                  }
                ]}
                accessibilityRole="button"
                accessibilityLabel="I'm New"
              >
                <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>
                  {lang === 'ta' ? 'புதிய வீரர்' : 'New Player'}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* How to Play QR Guide Modal */}
        <Modal
          visible={showQrModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowQrModal(false)}
        >
          <View style={styles.modalBackdrop}>
            <View
              style={[
                styles.qrModalCard,
                {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.lineHigh
                }
              ]}
            >
              <View style={styles.modalHeaderRow}>
                <View style={styles.qrHeaderTitleRow}>
                  <Ionicons name="qr-code" size={19} color={T.primary} />
                  <Text style={[styles.modalTitle, { color: T.tx }]}>
                    {lang === 'ta' ? 'விளையாடுவது எப்படி?' : (<>How to Play <Text style={styles.brandFont}>Habitopia</Text></>)}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setShowQrModal(false)}
                  style={styles.closeModalBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                >
                  <Ionicons name="close" size={20} color={T.mu} />
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.qrScrollContent}
              >
                {/* QR Code Container */}
                <View style={[styles.qrCodeBox, { borderColor: T.primary + '40', backgroundColor: '#FFFFFF' }]}>
                  <Image
                    source={require('../../assets/guide_qr.png')}
                    style={styles.qrImage}
                    resizeMode="contain"
                  />
                </View>

                <Text style={[styles.qrScanHint, { color: T.tx }]}>
                  {lang === 'ta'
                    ? 'பெற்றோர் அல்லது ஆசிரியர் மொபைலில் ஸ்கேன் செய்து முழு வழிகாட்டியைப் படிக்கலாம்'
                    : 'Scan with parent or teacher phone to open complete web guide'}
                </Text>
                <View style={[styles.qrUrlBadge, { backgroundColor: T.primary + '18', borderColor: T.primary + '40' }]}>
                  <Ionicons name="link-outline" size={13} color={T.primary} />
                  <Text style={[styles.qrUrlText, { color: T.primary }]} numberOfLines={1}>
                    vishalmurugan1986.github.io/hapitopia
                  </Text>
                </View>

                {/* 5 Game Rules for Children */}
                <View style={styles.qrRulesList}>
                  <View style={[styles.qrRuleItem, { borderColor: T.line, backgroundColor: T.surfaceLowest || T.card }]}>
                    <View style={styles.qrRuleTextCol}>
                      <Text style={[styles.qrRuleTitle, { color: T.tx }]}>
                        {lang === 'ta' ? '1. நாள்தோறும் 5 பழக்கங்கள் (+10 XP)' : '1. Daily 5 Missions (+10 XP each)'}
                      </Text>
                      <Text style={[styles.qrRuleDesc, { color: T.mu }]}>
                        {lang === 'ta'
                          ? 'உடல், மனம், அறிவு, இதயம், பணம் ஆகிய 5 பகுதிகளிலும் ஒரு பழக்கத்தைச் செய்து XP வெல்லுங்கள்.'
                          : 'Complete 1 habit across physical, mental, brain, heart, and money dimensions daily.'}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.qrRuleItem, { borderColor: T.line, backgroundColor: T.surfaceLowest || T.card }]}>
                    <View style={styles.qrRuleTextCol}>
                      <Text style={[styles.qrRuleTitle, { color: T.tx }]}>
                        {lang === 'ta' ? '2. கிளீன் ஸ்வீப் போனஸ் (+20 XP)' : '2. Clean Sweep Bonus (+20 XP)'}
                      </Text>
                      <Text style={[styles.qrRuleDesc, { color: T.mu }]}>
                        {lang === 'ta'
                          ? 'ஒரே நாளில் அனைத்து 5 பழக்கங்களையும் முடித்தால் கூடுதல் +20 XP போனஸ்!'
                          : 'Complete all 5 daily habits in a single day to unlock the Clean Sweep bonus.'}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.qrRuleItem, { borderColor: T.line, backgroundColor: T.surfaceLowest || T.card }]}>
                    <View style={styles.qrRuleTextCol}>
                      <Text style={[styles.qrRuleTitle, { color: T.tx }]}>
                        {lang === 'ta' ? '3. வார இறுதி பாஸ் சவால் (+100 XP)' : '3. Weekly Boss Fight (+100 XP)'}
                      </Text>
                      <Text style={[styles.qrRuleDesc, { color: T.mu }]}>
                        {lang === 'ta'
                          ? '240+ புள்ளிகள் பெற்று சில்வர் பதக்கம் அடைந்ததும் வார இறுதி பாஸை வெல்லலாம்.'
                          : 'Reach 240+ weekly points to achieve Silver tier and defeat the weekly Boss.'}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.qrRuleItem, { borderColor: T.line, backgroundColor: T.surfaceLowest || T.card }]}>
                    <View style={styles.qrRuleTextCol}>
                      <Text style={[styles.qrRuleTitle, { color: T.tx }]}>
                        {lang === 'ta' ? '4. நிஜ உலக அனுபவப் பரிசுகள்' : '4. Real Experience Rewards'}
                      </Text>
                      <Text style={[styles.qrRuleDesc, { color: T.mu }]}>
                        {lang === 'ta'
                          ? 'பொம்மைகள் இல்லை! பூங்கா பயணம், நூலக வருகை போன்ற அனுபவங்களைப் பெற்றோரிடம் பெறுங்கள்.'
                          : 'Real adventures (park visits, library trips, sports) confirmed by parents.'}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.qrRuleItem, { borderColor: T.line, backgroundColor: T.surfaceLowest || T.card }]}>
                    <View style={styles.qrRuleTextCol}>
                      <Text style={[styles.qrRuleTitle, { color: T.tx }]}>
                        {lang === 'ta' ? '5. 30 நாள் கேப்ஸ்டோன் (+500 XP)' : '5. 30-Day Capstone (+500 XP)'}
                      </Text>
                      <Text style={[styles.qrRuleDesc, { color: T.mu }]}>
                        {lang === 'ta'
                          ? '30 நாட்கள் தொடர்ந்து சாதித்து உங்கள் வாழ்க்கையின் CEO பட்டயத்தைப் பெறுங்கள்!'
                          : 'Master your habits for 30 days to graduate and become the CEO of your life!'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Got it CTA */}
                <Pressable
                  onPress={() => {
                    triggerHaptic('success');
                    setShowQrModal(false);
                  }}
                  style={[styles.qrDoneBtn, { backgroundColor: T.primary }]}
                >
                  <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                  <Text style={styles.qrDoneBtnText}>
                    {lang === 'ta' ? 'புரிகிறது! விளையாடுவோம்' : "Got It! Let's Play"}
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // --- 2. SCREEN 2A: NEW PLAYER – PIN SETUP ---
  if (currentScreen === 'pinSetup') {
    const numPadKeys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['C', '0', '⌫']
    ];

    return (
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
        <StatusBar style={T.name === 'dark' ? 'light' : 'dark'} />
        {renderStickyHeader(true)}

        <ScrollView
          contentContainerStyle={styles.pinScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Title & Quote */}
          <View style={styles.pinHeaderBlock}>
            <View
              style={[
                styles.pinIconCircle,
                {
                  backgroundColor: T.primary + '18',
                  borderColor: T.primary + '40'
                }
              ]}
            >
              <Ionicons name="lock-closed" size={26} color={T.primary} />
            </View>
            <Text style={[styles.pinScreenTitle, { color: T.tx }]}>
              {t.createSecretPin || 'Create Secret PIN'}
            </Text>
            <Text style={[styles.pinScreenSubtitle, { color: T.mu }]}>
              "{t.pinSubtitle || 'Remember this to log in next time!'}"
            </Text>
          </View>

          {/* Feedback & Error Banner */}
          {pinErr ? (
            <View
              style={[
                styles.alertBanner,
                { backgroundColor: T.rose + '18', borderColor: T.rose }
              ]}
            >
              <Ionicons name="alert-circle" size={16} color={T.rose} />
              <Text style={[styles.alertText, { color: T.rose }]}>{pinErr}</Text>
            </View>
          ) : null}

          {pinSuccess ? (
            <View
              style={[
                styles.alertBanner,
                { backgroundColor: T.primary + '18', borderColor: T.primary }
              ]}
            >
              <Ionicons name="checkmark-circle" size={16} color={T.primary} />
              <Text style={[styles.alertText, { color: T.primary }]}>
                {pinSuccess}
              </Text>
            </View>
          ) : null}

          {/* Step indicator + single PIN dots (Stitch redesign) */}
          <View style={{ alignItems: 'center', marginTop: 4, marginBottom: 22 }}>
            <View style={{ flexDirection: 'row', gap: 6, width: 120, marginBottom: 8 }}>
              {[1, 2].map((s) => (
                <View
                  key={s}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: pinStep >= s ? T.primary : T.line
                  }}
                />
              ))}
            </View>
            <Text style={{ fontSize: 12, fontWeight: '700', color: T.mu, marginBottom: 16 }} numberOfLines={1}>
              {lang === 'ta'
                ? `படி ${pinStep} / 2 · ${pinStep === 1 ? '4 இலக்கங்கள் உள்ளிடு' : 'பின்னை உறுதிசெய்'}`
                : `Step ${pinStep} of 2 · ${pinStep === 1 ? 'Enter 4 digits' : 'Confirm PIN'}`}
            </Text>
            <View style={{ flexDirection: 'row', gap: 18 }}>
              {[0, 1, 2, 3].map((idx) => {
                const cur = pinStep === 1 ? pin1 : pin2;
                const filled = cur.length > idx;
                return (
                  <View
                    key={idx}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: filled ? T.primary : T.lineHigh || T.mu,
                      backgroundColor: filled ? T.primary : 'transparent'
                    }}
                  />
                );
              })}
            </View>
          </View>

          {/* 12-key On-Screen NumPad */}
          <View style={styles.numpadContainer}>
            {numPadKeys.map((row, rIdx) => (
              <View key={`setup-row-${rIdx}`} style={styles.numpadRow}>
                {row.map((k, cIdx) => (
                  <Pressable
                    key={`setup-key-${rIdx}-${cIdx}-${k}`}
                    onPress={() => handlePinSetupKeyPress(k)}
                    style={({ pressed }) => [
                      styles.numpadKey,
                      {
                        backgroundColor: pressed
                          ? T.primary + '30'
                          : T.cardElevated || T.card,
                        borderColor: T.lineHigh
                      }
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Keypad ${k}`}
                  >
                    <Text
                      style={[
                        styles.numpadKeyText,
                        {
                          color:
                            k === 'C'
                              ? T.rose
                              : k === '⌫'
                                ? T.tertiary
                                : T.tx,
                          fontWeight: k === 'C' || k === '⌫' ? '800' : '700'
                        }
                      ]}
                    >
                      {k}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  // --- 3. SCREEN 2B: NEW PLAYER – PROFILE & PARENTAL CONSENT ---
  if (currentScreen === 'profile') {
    return (
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
        <StatusBar style={T.name === 'dark' ? 'light' : 'dark'} />
        {renderStickyHeader(true)}

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.profileScroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Screen 2B Header (Stitch redesign) */}
            <View style={{ alignItems: 'center', marginBottom: 18 }}>
              <View style={{ flexDirection: 'row', gap: 6, width: 120, marginBottom: 8 }}>
                {[1, 2].map((s) => (
                  <View key={s} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: T.primary }} />
                ))}
              </View>
              <Text style={{ fontSize: 12, fontWeight: '700', color: T.mu, marginBottom: 14 }}>
                {lang === 'ta' ? 'படி 2 / 2' : 'Step 2 of 2'}
              </Text>
              <View
                style={[
                  styles.profileBadgeIcon,
                  { backgroundColor: T.primary + '18', borderColor: T.primary + '45', marginBottom: 10 }
                ]}
              >
                <Text style={styles.profileBadgeEmoji}>{avatar}</Text>
              </View>
              <Text style={[styles.profileScreenTitle, { color: T.tx, textAlign: 'center' }]}>
                {lang === 'ta' ? 'உங்கள் வீரரை உருவாக்கு' : 'Create Your Player'}
              </Text>
              <Text style={[styles.profileScreenSub, { color: T.mu, textAlign: 'center' }]}>
                {lang === 'ta'
                  ? 'பெயர், வயது மற்றும் அவதாரைத் தேர்ந்தெடுங்கள்'
                  : 'Choose your name, age and avatar'}
              </Text>
            </View>

            {/* Card 1: Your Nickname */}
            <View
              style={[
                styles.profileSectionCard,
                {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.line
                }
              ]}
            >
              <View style={styles.fieldLabelRow}>
                <Ionicons name="person-outline" size={15} color={T.primary} />
                <Text style={[styles.sectionHeading, { color: T.tx }]}>
                  {t.nicknameLabel || 'Your Nickname'}
                </Text>
              </View>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: name.trim() ? T.primary : T.lineHigh,
                    backgroundColor: T.surfaceLowest || '#060E20',
                    color: T.tx
                  }
                ]}
                maxLength={25}
                value={name}
                onChangeText={(txt) => {
                  setName(txt);
                  setProfileErr('');
                }}
                placeholder={t.nicknamePlaceholder || 'e.g. Aarav, Ananya'}
                placeholderTextColor={T.mu}
              />
            </View>

            {/* Card 2: Your Age (Strict 2x4 Aligned Grid) */}
            <View
              style={[
                styles.profileSectionCard,
                {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.line
                }
              ]}
            >
              <View style={styles.ageHeaderRow}>
                <View style={styles.fieldLabelRow}>
                  <Ionicons name="calendar-outline" size={15} color={T.secondary} />
                  <Text style={[styles.sectionHeading, { color: T.tx }]}>
                    {t.ageLabel || 'Your Age'}
                  </Text>
                </View>
                {age > 0 ? (
                  <View
                    style={[
                      styles.stageBadge,
                      {
                        backgroundColor: T.secondary + '18',
                        borderColor: T.secondary + '60'
                      }
                    ]}
                  >
                    <Text
                      style={[styles.stageBadgeText, { color: T.secondary }]}
                      numberOfLines={1}
                    >
                      {t.stages?.[age] || `Age ${age}`}
                    </Text>
                  </View>
                ) : (
                  <Text style={[styles.ageSelectHint, { color: T.mu }]}>
                    {lang === 'ta' ? '7–14 தேர்ந்தெடு' : 'Ages 7–14'}
                  </Text>
                )}
              </View>

              <View style={styles.alignedGridContainer}>
                {AGE_ROWS.map((row, rIdx) => (
                  <View key={rIdx} style={styles.alignedGridRow}>
                    {row.map((a) => {
                      const isSelected = age === a;
                      return (
                        <Pressable
                          key={a}
                          onPress={() => {
                            triggerHaptic('light');
                            setAge(a);
                            setProfileErr('');
                          }}
                          style={[
                            styles.ageCellBtn,
                            {
                              backgroundColor: isSelected
                                ? T.primary
                                : T.surfaceLowest || '#060E20',
                              borderColor: isSelected ? T.primary : T.lineHigh
                            }
                          ]}
                        >
                          <Text
                            style={[
                              styles.ageCellNum,
                              {
                                color: isSelected ? '#FFFFFF' : T.tx
                              }
                            ]}
                          >
                            {a}
                          </Text>
                          <Text
                            style={[
                              styles.ageCellUnit,
                              {
                                color: isSelected
                                  ? 'rgba(255,255,255,0.85)'
                                  : T.mu
                              }
                            ]}
                          >
                            {lang === 'ta' ? 'வயது' : 'yrs'}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            {/* Card 3: Pick your avatar (Strict 2x4 Aligned Grid) */}
            <View
              style={[
                styles.profileSectionCard,
                {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.line
                }
              ]}
            >
              <View style={styles.fieldLabelRow}>
                <Ionicons name="happy-outline" size={15} color={T.tertiary} />
                <Text style={[styles.sectionHeading, { color: T.tx }]}>
                  {t.pickAvatarLabel || 'Pick your avatar'}
                </Text>
              </View>
              <Text style={[styles.avatarHint, { color: T.mu }]}>
                {t.avatarRecoveryNote ||
                  'Remember this avatar! It acts as your secret recovery key if you forget your PIN.'}
              </Text>

              <View style={styles.alignedGridContainer}>
                {AVATAR_ROWS.map((row, rIdx) => (
                  <View key={rIdx} style={styles.alignedGridRow}>
                    {row.map((av) => {
                      const isSelected = avatar === av;
                      return (
                        <Pressable
                          key={av}
                          onPress={() => {
                            triggerHaptic('light');
                            setAvatar(av);
                          }}
                          style={[
                            styles.avatarCellBtn,
                            {
                              borderColor: isSelected ? T.primary : T.lineHigh,
                              backgroundColor: isSelected
                                ? T.primary + '22'
                                : T.surfaceLowest || '#060E20'
                            }
                          ]}
                        >
                          <Text style={styles.avatarEmoji}>{av}</Text>
                          {isSelected && (
                            <View
                              style={[
                                styles.avatarCheckBadge,
                                { backgroundColor: T.primary }
                              ]}
                            >
                              <Ionicons
                                name="checkmark"
                                size={10}
                                color="#FFFFFF"
                              />
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            {/* Parental consent (single compact row) */}
            <Pressable
              onPress={() => {
                triggerHaptic('light');
                setConsent(!consent);
                setProfileErr('');
              }}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: consent }}
              style={[
                styles.checkboxRow,
                {
                  backgroundColor: consent ? T.primary + '14' : T.cardElevated || T.card,
                  borderColor: consent ? T.primary : T.lineHigh,
                  marginBottom: 14
                }
              ]}
            >
              <View
                style={[
                  styles.checkboxBox,
                  {
                    borderColor: consent ? T.primary : T.mu,
                    backgroundColor: consent ? T.primary : 'transparent'
                  }
                ]}
              >
                {consent && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
              </View>
              <Text style={[styles.checkboxLabel, { color: T.tx }]}>
                {lang === 'ta'
                  ? 'பெற்றோர் / பாதுகாவலர் வயது மற்றும் தினசரி பழக்கக் கண்காணிப்புக்கு ஒப்புதல் அளிக்கிறார்.'
                  : 'Parent or guardian confirms age and daily habit tracking consent.'}
              </Text>
            </Pressable>

            {/* Error Message */}
            {profileErr ? (
              <View
                style={[
                  styles.alertBanner,
                  { backgroundColor: T.rose + '18', borderColor: T.rose }
                ]}
              >
                <Ionicons name="alert-circle" size={16} color={T.rose} />
                <Text style={[styles.alertText, { color: T.rose }]}>
                  {profileErr}
                </Text>
              </View>
            ) : null}

            {/* Start Playing Button */}
            <Pressable
              onPress={handleStartPlaying}
              style={[styles.primaryBtn, { backgroundColor: T.primary }]}
              accessibilityRole="button"
              accessibilityLabel="Start Playing"
            >
              <Ionicons name="rocket" size={18} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>
                {t.startPlayingBtn ||
                  (lang === 'ta'
                    ? 'விளையாடத் தொடங்குங்கள்'
                    : 'Start Playing')}
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // --- 4. SCREEN 3: SAVED PROFILE – QUICK LOGIN ---
  if (currentScreen === 'quickLogin') {
    const loginNumPadKeys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', '⌫']
    ];

    return (
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
        <StatusBar style={T.name === 'dark' ? 'light' : 'dark'} />
        {renderStickyHeader(true)}

        <ScrollView
          contentContainerStyle={styles.loginScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome Back Icon & Titles */}
          <View style={styles.loginHeaderBlock}>
            <View
              style={[
                styles.avatarGlowCircle,
                {
                  borderColor: activeTargetProfile ? T.primary : T.lineHigh,
                  backgroundColor: activeTargetProfile
                    ? T.primary + '15'
                    : T.cardElevated || T.card
                }
              ]}
            >
              <Text style={styles.loginAvatarEmoji}>
                {activeTargetProfile ? activeTargetProfile.avatar || '🦁' : '🦁'}
              </Text>
            </View>
            <Text style={[styles.loginTitle, { color: T.tx }]}>
              {t.welcomeBack || 'Welcome Back!'}
              {activeTargetProfile ? `, ${activeTargetProfile.name}` : ''}
            </Text>
            {activeTargetProfile && activeTargetProfile.age ? (
              <View
                style={[
                  styles.returningStageChip,
                  {
                    backgroundColor: T.secondary + '16',
                    borderColor: T.secondary + '50'
                  }
                ]}
              >
                <Text
                  style={[styles.returningStageText, { color: T.secondary }]}
                >
                  {lang === 'ta'
                    ? `வயது ${activeTargetProfile.age}`
                    : `Age ${activeTargetProfile.age}`}{' '}
                  · {t.stages?.[activeTargetProfile.age] || ''}
                </Text>
              </View>
            ) : null}
            <Text style={[styles.loginSubtitle, { color: T.mu }]}>
              "
              {t.enterPinToContinue ||
                'Enter your 4-digit PIN to continue your journey'}
              "
            </Text>
          </View>

          {/* Error or Success Banner */}
          {loginErr ? (
            <View
              style={[
                styles.alertBanner,
                { backgroundColor: T.rose + '18', borderColor: T.rose }
              ]}
            >
              <Ionicons name="alert-circle" size={16} color={T.rose} />
              <Text style={[styles.alertText, { color: T.rose }]}>
                {loginErr}
              </Text>
            </View>
          ) : null}

          {loginSuccess ? (
            <View
              style={[
                styles.alertBanner,
                { backgroundColor: T.primary + '18', borderColor: T.primary }
              ]}
            >
              <Ionicons name="checkmark-circle" size={16} color={T.primary} />
              <Text style={[styles.alertText, { color: T.primary }]}>
                {loginSuccess}
              </Text>
            </View>
          ) : null}

          {/* 4 PIN Bubbles */}
          <View style={styles.loginBubblesContainer}>
            {[0, 1, 2, 3].map((idx) => {
              const filled = loginPin.length > idx;
              return (
                <View
                  key={idx}
                  style={[
                    styles.loginBubble,
                    {
                      borderColor: filled ? T.primary : T.lineHigh,
                      backgroundColor: filled ? T.primary : 'transparent'
                    }
                  ]}
                />
              );
            })}
          </View>

          {/* 12-key On-Screen NumPad */}
          <View style={styles.numpadContainer}>
            {loginNumPadKeys.map((row, rIdx) => (
              <View key={`login-row-${rIdx}`} style={styles.numpadRow}>
                {row.map((k, cIdx) => {
                  if (k === '') {
                    return <View key={`spacer-${rIdx}-${cIdx}`} style={styles.numpadSpacer} />;
                  }
                  return (
                    <Pressable
                      key={`login-key-${rIdx}-${cIdx}-${k}`}
                      onPress={() => handleQuickLoginKeyPress(k)}
                      style={({ pressed }) => [
                        styles.numpadKey,
                        {
                          backgroundColor: pressed
                            ? T.primary + '30'
                            : T.cardElevated || T.card,
                          borderColor: T.lineHigh
                        }
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`Keypad ${k}`}
                    >
                      <Text
                        style={[
                          styles.numpadKeyText,
                          {
                            color: k === '⌫' ? T.tertiary : T.tx,
                            fontWeight: k === '⌫' ? '800' : '700'
                          }
                        ]}
                      >
                        {k}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Forgot PIN / Avatar Unlock Link */}
          <Pressable
            onPress={() => {
              triggerHaptic('light');
              setRecoveryFeedback('');
              setRecoveredPin(null);
              setShowForgotModal(true);
            }}
            style={styles.forgotPinLink}
          >
            <Ionicons name="link-outline" size={15} color={T.primary} />
            <Text style={[styles.forgotPinLinkText, { color: T.primary }]}>
              {t.forgotPinPrompt ||
                'Forgot PIN? Tap the icon you chose earlier to unlock.'}
            </Text>
          </Pressable>
        </ScrollView>

        {/* Avatar Recovery Modal */}
        <Modal
          visible={showForgotModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowForgotModal(false)}
        >
          <View style={styles.modalBackdrop}>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: T.cardElevated || T.card,
                  borderColor: T.lineHigh
                }
              ]}
            >
              <View style={styles.modalHeaderRow}>
                <Ionicons name="key" size={20} color={T.secondary} />
                <Text style={[styles.modalTitle, { color: T.tx }]}>
                  {t.avatarRecoveryTitle || 'Avatar PIN Recovery'}
                </Text>
                <Pressable
                  onPress={() => setShowForgotModal(false)}
                  style={styles.closeModalBtn}
                >
                  <Ionicons name="close" size={20} color={T.mu} />
                </Pressable>
              </View>

              <Text style={[styles.modalPrompt, { color: T.mu }]}>
                {t.avatarRecoverySubtitle ||
                  'Tap the secret avatar you picked when creating your account:'}
              </Text>

              {/* 8 Avatars in 2x4 aligned grid */}
              <View style={styles.alignedGridContainer}>
                {AVATAR_ROWS.map((row, rIdx) => (
                  <View key={rIdx} style={styles.alignedGridRow}>
                    {row.map((av) => (
                      <Pressable
                        key={av}
                        onPress={() => handleAvatarRecoverySelect(av)}
                        style={[
                          styles.avatarCellBtn,
                          {
                            borderColor: T.lineHigh,
                            backgroundColor: T.surfaceLowest || '#060E20'
                          }
                        ]}
                      >
                        <Text style={styles.avatarModalEmoji}>{av}</Text>
                      </Pressable>
                    ))}
                  </View>
                ))}
              </View>

              {/* Feedback */}
              {recoveryFeedback ? (
                <View
                  style={[
                    styles.recoveryFeedbackBox,
                    {
                      backgroundColor: recoveredPin
                        ? T.primary + '15'
                        : T.rose + '15',
                      borderColor: recoveredPin ? T.primary : T.rose
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.recoveryFeedbackText,
                      { color: recoveredPin ? T.primary : T.rose }
                    ]}
                  >
                    {recoveryFeedback}
                  </Text>
                  {recoveredPin && (
                    <Text style={[styles.recoveredPinValue, { color: T.tx }]}>
                      {t.yourSecretPinIs || 'Your Secret PIN is: '}
                      <Text
                        style={{ color: T.secondary, fontWeight: '900' }}
                      >
                        {recoveredPin}
                      </Text>
                    </Text>
                  )}
                </View>
              ) : null}

              {/* Quick Login Button if verified */}
              {recoveredPin && activeTargetProfile && (
                <Pressable
                  onPress={() => {
                    triggerHaptic('success');
                    setShowForgotModal(false);
                    update({
                      ...activeTargetProfile,
                      lang,
                      savedProfiles
                    });
                    if (onUnlock) onUnlock();
                  }}
                  style={[
                    styles.primaryBtn,
                    { backgroundColor: T.primary, marginTop: 14 }
                  ]}
                >
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                  <Text style={styles.primaryBtnText}>
                    {t.loginNowBtn || 'Login to My Journey'}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  // Sticky Header with [🔊] & [ EN | தமிழ் ]
  stickyHeader: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1
  },
  soundBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  brandFont: {
    fontFamily: 'Fredoka',
    fontWeight: 'normal',
    letterSpacing: 0.3
  },
  qrGuideBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  soundBtnSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 3,
    gap: 2
  },
  langSegment: {
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: 16
  },
  langSegmentText: {
    fontSize: 12,
    fontWeight: '800'
  },

  // SCREEN 1: WELCOME (Clean, Minimal, Production-Grade)
  welcomeScroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 28,
    justifyContent: 'center'
  },
  welcomeCenterGroup: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    alignItems: 'center'
  },
  logoCard: {
    width: 120,
    height: 120,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 20
  },
  logoImage: {
    width: '100%',
    height: '100%'
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 18
  },
  mainH1: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.6,
    textAlign: 'center'
  },
  mainSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 8,
    paddingHorizontal: 8,
    maxWidth: 360
  },
  minimalLoopPill: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'nowrap',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 26
  },
  minimalLoopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1
  },
  minimalLoopText: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '800'
  },
  minimalLoopDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3
  },
  savedProfilesSection: {
    width: '100%',
    marginBottom: 20
  },
  savedProfilesHeading: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 10,
    paddingHorizontal: 4
  },
  savedProfilesList: {
    width: '100%',
    gap: 12
  },
  savedPlayerCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1.5,
    borderRadius: 18,
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  savedAvatarBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  savedPlayerAvatar: {
    fontSize: 26
  },
  savedPlayerTextCol: {
    flex: 1,
    minWidth: 0
  },
  savedPlayerTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  savedPlayerSub: {
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 3
  },
  unlockPinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1
  },
  unlockPinText: {
    fontSize: 11.5,
    fontWeight: '800'
  },
  welcomeActions: {
    width: '100%',
    marginTop: 4
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.3
  },

  // SCREEN 2A: PIN SETUP
  pinScroll: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
    alignItems: 'center'
  },
  pinHeaderBlock: {
    alignItems: 'center',
    marginBottom: 16
  },
  pinIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  pinScreenTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.4,
    textAlign: 'center'
  },
  pinScreenSubtitle: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 4,
    textAlign: 'center'
  },
  stepCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center'
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },
  stepNumBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepNumText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900'
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '800'
  },
  bubblesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4
  },
  pinBubble: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2
  },

  // 12-Key Numpad
  numpadContainer: {
    width: '100%',
    maxWidth: 320,
    marginTop: 8,
    gap: 10
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  numpadKey: {
    flex: 1,
    aspectRatio: 1.45,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  numpadKeyText: {
    fontSize: 22
  },
  numpadSpacer: {
    flex: 1,
    aspectRatio: 1.45
  },

  // SCREEN 2B: PROFILE & CONSENT (CLEAN ALIGNED LAYOUT)
  profileScroll: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 36,
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center'
  },
  profileHeaderBlock: {
    marginBottom: 14
  },
  profileHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  profileBadgeIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBadgeEmoji: {
    fontSize: 28
  },
  profileHeaderTextCol: {
    flex: 1
  },
  profileScreenTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3
  },
  profileScreenSub: {
    fontSize: 12.5,
    marginTop: 2
  },
  pinSummaryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1
  },
  pinSummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1
  },
  pinSummaryText: {
    fontSize: 12,
    fontWeight: '800',
    flex: 1
  },
  pinEditBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexShrink: 0
  },
  pinEditText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800'
  },
  profileSectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800'
  },
  textInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    fontWeight: '600'
  },
  ageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  ageSelectHint: {
    fontSize: 11.5,
    fontWeight: '600',
    marginBottom: 8
  },
  stageBadge: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
    flexShrink: 1,
    maxWidth: '62%'
  },
  stageBadgeText: {
    fontSize: 11,
    fontWeight: '800'
  },
  alignedGridContainer: {
    gap: 8,
    width: '100%'
  },
  alignedGridRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%'
  },
  ageCellBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ageCellNum: {
    fontSize: 15,
    fontWeight: '800'
  },
  ageCellUnit: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1
  },
  avatarHint: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10
  },
  avatarCellBtn: {
    flex: 1,
    aspectRatio: 1.15,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  avatarEmoji: {
    fontSize: 28
  },
  avatarCheckBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  consentCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 14
  },
  consentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6
  },
  consentCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1
  },
  consentDesc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10
  },
  privacyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    width: '100%'
  },
  privacyChipText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxLabel: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1
  },

  // SCREEN 3: QUICK LOGIN
  loginScroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 36,
    alignItems: 'center'
  },
  loginHeaderBlock: {
    alignItems: 'center',
    marginBottom: 14
  },
  avatarGlowCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  loginAvatarEmoji: {
    fontSize: 34
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.4,
    textAlign: 'center'
  },
  returningStageChip: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 6
  },
  returningStageText: {
    fontSize: 11.5,
    fontWeight: '800'
  },
  loginSubtitle: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 16
  },
  loginBubblesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginVertical: 14
  },
  loginBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.5
  },
  forgotPinLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
    padding: 10,
    maxWidth: 340
  },
  forgotPinLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
    flexShrink: 1
  },

  // Modal: Avatar Recovery
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 18
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
    marginLeft: 8
  },
  closeModalBtn: {
    padding: 4
  },
  modalPrompt: {
    fontSize: 12.5,
    marginBottom: 14,
    lineHeight: 18
  },
  avatarModalEmoji: {
    fontSize: 26
  },
  recoveryFeedbackBox: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
    marginTop: 12
  },
  recoveryFeedbackText: {
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center'
  },
  recoveredPinValue: {
    fontSize: 13,
    marginTop: 2
  },

  // Alert Banner
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 12,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center'
  },
  alertText: {
    fontSize: 12,
    fontWeight: '700',
    flex: 1
  },

  // QR Play Guide Modal
  qrModalCard: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '86%',
    borderRadius: 22,
    borderWidth: 1.5,
    padding: 18
  },
  qrHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  qrScrollContent: {
    paddingVertical: 6,
    alignItems: 'center'
  },
  qrCodeBox: {
    width: 140,
    height: 140,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  qrImage: {
    width: 124,
    height: 124,
    borderRadius: 8
  },
  qrScanHint: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 4,
    paddingHorizontal: 12
  },
  qrUrlBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 6,
    marginBottom: 14
  },
  qrUrlText: {
    fontSize: 11,
    fontWeight: '800'
  },
  qrRulesList: {
    width: '100%',
    gap: 8
  },
  qrRuleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1
  },
  qrRuleTextCol: {
    flex: 1
  },
  qrRuleTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    marginBottom: 2
  },
  qrRuleDesc: {
    fontSize: 11,
    lineHeight: 15
  },
  qrDoneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 14
  },
  qrDoneBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800'
  }
});
