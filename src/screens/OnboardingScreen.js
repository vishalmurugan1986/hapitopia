import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  StatusBar as RNStatusBar
} from 'react-native';
import {
  AppText,
  Button,
  Card,
  Chip,
  IconBubble,
  PressableScale,
  Banner,
  StepIndicator,
  PinDots,
  Keypad,
  TextField,
  OptionTile,
  CheckRow,
  space,
  radius,
  touch,
  screenInsets,
  HabiBuddy,
  HabitopiaMark,
  WelcomeHero
} from '../design';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AVATARS, getAvatarMeta, resolveAvatarId } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';

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
  const { top: topInset, bottom: bottomInset } = screenInsets(insets);

  // Screen modes: 'welcome' | 'pinSetup' | 'profile' | 'quickLogin'
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [lang, setLang] = useState(S?.lang || 'en');

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
  const [batchCode, setBatchCode] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [consent, setConsent] = useState(false);
  const [profileErr, setProfileErr] = useState('');
  const profileScrollRef = useRef(null);
  const fieldY = useRef({});

  // Keep the focused field visible above the keyboard (small phones).
  const scrollFieldIntoView = (key) => {
    const y = fieldY.current[key];
    if (y == null) return;
    setTimeout(() => profileScrollRef.current?.scrollTo({ y: Math.max(0, y - space.md), animated: true }), 250);
  };

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
    setBatchCode('');
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
    const resolvedBatch = L.resolveBatchFromCode(batchCode);
    if (!resolvedBatch) {
      triggerHaptic('warning');
      setProfileErr(
        lang === 'ta'
          ? 'தயவுசெய்து சரியான 4-இலக்க தொகுதி குறியீட்டை உள்ளிடவும்.'
          : 'Please enter a valid 4-digit Batch Code to continue.'
      );
      return;
    }
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
    const cleanCode = batchCode.trim();
    const profileId = `${cleanName.toLowerCase()}_${age}_${Date.now()}`;
    const newProfile = {
      id: profileId,
      name: cleanName,
      age: age,
      avatar: avatar,
      batch: resolvedBatch,
      batchCode: cleanCode,
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
    if (resolveAvatarId(activeTargetProfile.avatar) === resolveAvatarId(selectedAvatar)) {
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

  // ---------------------------------------------------------------------------
  // Shared pieces
  // ---------------------------------------------------------------------------
  const statusBar = <StatusBar style={T.isDark ? 'light' : 'dark'} />;
  const screenFrame = { backgroundColor: T.bg, paddingTop: topInset, paddingBottom: bottomInset };

  const renderAvatar = (avMeta, size = 56, iconSize = 28) => (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size * 0.34,
          backgroundColor: avMeta.color + (T.isDark ? '30' : '1F'),
          borderColor: avMeta.color,
          borderBottomColor: avMeta.color
        }
      ]}
    >
      <HabiBuddy avatar={avMeta.id} size={Math.round(size * 0.84)} />
    </View>
  );

  const renderAvatarGrid = ({ selectedId, onSelect }) => (
    <View style={styles.grid}>
      {AVATAR_ROWS.map((row, rIdx) => (
        <View key={rIdx} style={styles.gridRow}>
          {row.map((av) => {
            const avMeta = getAvatarMeta(av);
            const label = lang === 'ta' ? avMeta.labelTa : avMeta.label;
            const isSelected = selectedId != null && selectedId === resolveAvatarId(av);
            return (
              <OptionTile
                key={av}
                selected={isSelected}
                color={avMeta.color}
                onPress={() => onSelect(av)}
                accessibilityLabel={label}
              >
                {renderAvatar(avMeta, 52, 26)}
                <AppText variant="caption" tone={isSelected ? 'default' : 'muted'} numberOfLines={1}>
                  {label}
                </AppText>
              </OptionTile>
            );
          })}
        </View>
      ))}
    </View>
  );

  // Top bar: back (or sound toggle on the welcome screen) + EN / தமிழ்.
  // Top bar for the PIN / profile screens: back button + EN / தமிழ்.
  // (The welcome screen intentionally has no top bar – sound and language
  // live in the Me tab.)
  const renderTopBar = () => (
    <View style={styles.topBar}>
      <PressableScale
        onPress={handleBack}
        haptic={null}
        hitSlop={touch.hitSlop}
        accessibilityRole="button"
        accessibilityLabel={lang === 'ta' ? 'பின் செல்' : 'Go back'}
      >
        <View style={[styles.roundBtn, { backgroundColor: T.card, borderColor: T.line, borderBottomColor: T.ledge }]}>
          <Ionicons name="chevron-back" size={24} color={T.tx} />
        </View>
      </PressableScale>

      <View style={[styles.langToggle, { backgroundColor: T.card, borderColor: T.line, borderBottomColor: T.ledge }]}>
        {[
          { k: 'en', label: 'EN', a11y: 'English' },
          { k: 'ta', label: 'தமிழ்', a11y: 'Tamil' }
        ].map((opt) => {
          const active = lang === opt.k;
          return (
            <PressableScale
              key={opt.k}
              onPress={() => handleSelectLang(opt.k)}
              haptic={null}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={opt.a11y}
            >
              <View style={[styles.langSeg, active && { backgroundColor: T.primary }]}>
                <AppText variant="label" color={active ? T.on : T.mu}>
                  {opt.label}
                </AppText>
              </View>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );

  // ---------------------------------------------------------------------------
  // 1. Welcome – who is playing?
  // ---------------------------------------------------------------------------
  if (currentScreen === 'welcome') {
    return (
      <View style={[styles.root, screenFrame]}>
        {statusBar}

        <ScrollView contentContainerStyle={styles.welcomeScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.column}>
            <WelcomeHero
              lang={lang}
              tagline={lang === 'ta' ? 'எதிர்காலத்தை வெல்லும் குழந்தையை உருவாக்குவோம்' : 'Build a future-proof child'}
            />

            {savedProfiles.length > 0 && (
              <View style={styles.section}>
                <AppText variant="heading">{lang === 'ta' ? 'யார் விளையாடுகிறார்கள்?' : "Who's playing?"}</AppText>
                {savedProfiles.map((prof, idx) => {
                  const avMeta = getAvatarMeta(prof.avatar);
                  return (
                    <Card
                      key={prof.id || `prof-${prof.name}-${idx}`}
                      padding={space.md}
                      onPress={() => openSavedProfileLogin(prof)}
                      haptic={null}
                      accessibilityLabel={`${lang === 'ta' ? 'திற' : 'Play as'} ${prof.name}`}
                    >
                      <View style={styles.playerRow}>
                        {renderAvatar(avMeta)}
                        <View style={styles.flex1}>
                          <AppText variant="heading" numberOfLines={1}>
                            {prof.name}
                          </AppText>
                          <View style={styles.playerMeta}>
                            <Chip size="sm" icon="star" label={`${lang === 'ta' ? 'நிலை' : 'Lv'} ${L.level(prof)}`} color={T.secondary} />
                            <Chip size="sm" label={`${prof.batch || 'BAT01'} · ${lang === 'ta' ? 'வயது' : 'Age'} ${prof.age}`} color={T.mu} />
                          </View>
                        </View>
                        <View style={[styles.playGo, { backgroundColor: T.primaryFill, borderBottomColor: T.primaryLedge }]}>
                          <Ionicons name="play" size={20} color={T.onPrimary} />
                        </View>
                      </View>
                    </Card>
                  );
                })}
              </View>
            )}

            <Button
              title={lang === 'ta' ? 'புதிய வீரர்' : 'New Player'}
              icon="add-circle"
              size="lg"
              variant={savedProfiles.length > 0 ? 'outline' : 'primary'}
              onPress={startNewPlayerFlow}
              haptic={null}
              fullWidth
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. New player – create a secret PIN
  // ---------------------------------------------------------------------------
  if (currentScreen === 'pinSetup') {
    const current = pinStep === 1 ? pin1 : pin2;
    return (
      <View style={[styles.root, screenFrame]}>
        {statusBar}
        {renderTopBar()}

        <ScrollView contentContainerStyle={styles.pinScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.column}>
            <StepIndicator
              step={pinStep}
              total={3}
              label={lang === 'ta' ? `படி ${pinStep} / 3` : `Step ${pinStep} of 3`}
            />
            <View style={styles.pinHeader}>
              <IconBubble name={pinStep === 1 ? 'lock-closed' : 'shield-checkmark'} size="xl" color={T.primary} solid />
              <AppText variant="display" align="center">
                {pinStep === 1
                  ? (t.createSecretPin || 'Create Secret PIN')
                  : (lang === 'ta' ? 'மீண்டும் உள்ளிடு' : 'Type it again')}
              </AppText>
              <AppText variant="body" tone="muted" align="center">
                {pinStep === 1
                  ? (t.pinSubtitle || 'Remember this to log in next time!')
                  : (lang === 'ta' ? 'சரிபார்க்க அதே 4 எண்களை உள்ளிடவும்' : 'Enter the same 4 numbers to make sure')}
              </AppText>
            </View>

            <PinDots filled={current.length} error={!!pinErr} />
            <Banner tone="danger" message={pinErr} />
            <Banner tone="success" message={pinSuccess} />

            <Keypad onKey={handlePinSetupKeyPress} lang={lang} />
          </View>
        </ScrollView>
      </View>
    );
  }

  // ---------------------------------------------------------------------------
  // 3. New player – profile & parental consent
  // ---------------------------------------------------------------------------
  if (currentScreen === 'profile') {
    const resolvedBatch = L.resolveBatchFromCode(batchCode);
    const selectedAvatarMeta = getAvatarMeta(avatar);
    const batchStatus = resolvedBatch ? 'valid' : batchCode.length === 4 ? 'invalid' : 'default';

    return (
      <View style={[styles.root, screenFrame]}>
        {statusBar}
        {renderTopBar()}

        {/* Android draws edge-to-edge (SDK 58), so the window no longer resizes
            for the keyboard – both platforms need explicit padding. */}
        <KeyboardAvoidingView style={styles.flex1} behavior="padding">
          <ScrollView
            ref={profileScrollRef}
            contentContainerStyle={styles.profileScroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <View style={styles.column}>
              <StepIndicator step={3} total={3} label={lang === 'ta' ? 'படி 3 / 3' : 'Step 3 of 3'} />

              <View style={styles.pinHeader}>
                {renderAvatar(selectedAvatarMeta, 76, 38)}
                <AppText variant="display" align="center">
                  {lang === 'ta' ? 'உங்கள் வீரரை உருவாக்கு' : 'Create Your Player'}
                </AppText>
                <AppText variant="body" tone="muted" align="center">
                  {lang === 'ta' ? 'உங்களைப் பற்றி கொஞ்சம் சொல்லுங்கள்!' : 'Tell us a little about you!'}
                </AppText>
              </View>

              <View onLayout={(e) => (fieldY.current.batch = e.nativeEvent.layout.y)}>
              <Card>
                <TextField
                  onFocus={() => scrollFieldIntoView('batch')}
                  label={t.batchCodeLabel || 'Your Batch Code'}
                  icon="key"
                  iconColor={T.secondary}
                  hint={
                    resolvedBatch ? (
                      <Chip size="sm" icon="checkmark-circle" label={resolvedBatch} color={T.success} />
                    ) : batchCode.length === 4 ? (
                      <Chip size="sm" label={lang === 'ta' ? 'தவறான குறியீடு' : 'Wrong code'} color={T.danger} />
                    ) : null
                  }
                  status={batchStatus}
                  maxLength={4}
                  keyboardType="number-pad"
                  value={batchCode}
                  onChangeText={(txt) => {
                    setBatchCode(txt.replace(/[^0-9]/g, '').slice(0, 4));
                    setProfileErr('');
                  }}
                  placeholder={t.batchCodePlaceholder || 'Enter 4-digit batch code'}
                  inputStyle={batchCode ? styles.codeInput : null}
                  accessibilityLabel={t.batchCodeLabel || 'Your Batch Code'}
                />
              </Card>
              </View>

              <View onLayout={(e) => (fieldY.current.name = e.nativeEvent.layout.y)}>
              <Card>
                <TextField
                  onFocus={() => scrollFieldIntoView('name')}
                  label={t.nicknameLabel || 'Your Nickname'}
                  icon="happy"
                  iconColor={T.rose}
                  status={name.trim() ? 'valid' : 'default'}
                  maxLength={25}
                  value={name}
                  onChangeText={(txt) => {
                    setName(txt);
                    setProfileErr('');
                  }}
                  placeholder={t.nicknamePlaceholder || 'Jack, Rose'}
                  accessibilityLabel={t.nicknameLabel || 'Your Nickname'}
                />
              </Card>
              </View>

              <Card>
                <View style={styles.cardHead}>
                  <Ionicons name="balloon" size={20} color={T.tertiary} />
                  <AppText variant="subheading" style={styles.flex1}>
                    {t.ageLabel || 'How old are you?'}
                  </AppText>
                  {age > 0 ? <Chip size="sm" label={t.stages?.[age] || `Age ${age}`} color={T.tertiary} /> : null}
                </View>
                <View style={styles.grid} accessibilityRole="radiogroup">
                  {AGE_ROWS.map((row, rIdx) => (
                    <View key={rIdx} style={styles.gridRow}>
                      {row.map((a) => (
                        <OptionTile
                          key={a}
                          selected={age === a}
                          color={T.tertiary}
                          onPress={() => {
                            setAge(a);
                            setProfileErr('');
                          }}
                          accessibilityLabel={lang === 'ta' ? `வயது ${a}` : `${a} years old`}
                          style={styles.ageTile}
                        >
                          <AppText variant="display" color={age === a ? T.tertiary : T.tx}>
                            {a}
                          </AppText>
                        </OptionTile>
                      ))}
                    </View>
                  ))}
                </View>
              </Card>

              <Card>
                <View style={styles.cardHead}>
                  <Ionicons name="sparkles" size={20} color={T.purple} />
                  <AppText variant="subheading" style={styles.flex1}>
                    {t.pickAvatarLabel || 'Pick your avatar'}
                  </AppText>
                </View>
                <AppText variant="bodySm" tone="muted" style={styles.avatarHint}>
                  {t.avatarRecoveryNote || 'Remember this avatar! It is your secret key if you forget your PIN.'}
                </AppText>
                {renderAvatarGrid({ selectedId: resolveAvatarId(avatar), onSelect: (av) => setAvatar(av) })}
              </Card>

              <CheckRow
                checked={consent}
                onPress={() => {
                  setConsent(!consent);
                  setProfileErr('');
                }}
                label={lang === 'ta'
                  ? 'பெற்றோர் / பாதுகாவலர் வயது மற்றும் தினசரி பழக்கக் கண்காணிப்புக்கு ஒப்புதல் அளிக்கிறார்.'
                  : 'Parent or guardian confirms age and daily habit tracking consent.'}
              />

              <Banner tone="danger" message={profileErr} />

              <Button
                title={t.startPlayingBtn || (lang === 'ta' ? 'விளையாடத் தொடங்குங்கள்' : 'Start Playing')}
                icon="rocket"
                size="lg"
                onPress={handleStartPlaying}
                haptic={null}
                fullWidth
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // ---------------------------------------------------------------------------
  // 4. Returning player – enter PIN
  // ---------------------------------------------------------------------------
  if (currentScreen === 'quickLogin') {
    const targetAvatarMeta = getAvatarMeta(activeTargetProfile?.avatar);

    return (
      <View style={[styles.root, screenFrame]}>
        {statusBar}
        {renderTopBar()}

        <ScrollView contentContainerStyle={styles.pinScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.column}>
            <View style={styles.pinHeader}>
              {renderAvatar(targetAvatarMeta, 84, 42)}
              <AppText variant="display" align="center">
                {lang === 'ta' ? 'மீண்டும் வருக' : 'Welcome back'}
                {activeTargetProfile ? `, ${activeTargetProfile.name}!` : '!'}
              </AppText>
              {activeTargetProfile && activeTargetProfile.age ? (
                <Chip
                  size="sm"
                  icon="ribbon"
                  label={`${activeTargetProfile.batch || 'BAT01'} · ${lang === 'ta' ? 'வயது' : 'Age'} ${activeTargetProfile.age}${t.stages?.[activeTargetProfile.age] ? ` · ${t.stages[activeTargetProfile.age]}` : ''}`}
                  color={T.secondary}
                />
              ) : null}
              <AppText variant="body" tone="muted" align="center">
                {t.enterPinToContinue || 'Enter your secret PIN to continue'}
              </AppText>
            </View>

            <PinDots filled={loginPin.length} error={!!loginErr} />
            <Banner tone="danger" message={loginErr} />
            <Banner tone="success" message={loginSuccess} />

            <Keypad
              onKey={handleQuickLoginKeyPress}
              lang={lang}
              keys={[
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['', '0', '⌫']
              ]}
            />

            <Button
              variant="ghost"
              icon="help-buoy"
              title={lang === 'ta' ? 'PIN மறந்துவிட்டதா?' : 'Forgot your PIN?'}
              onPress={() => {
                setRecoveryFeedback('');
                setRecoveredPin(null);
                setShowForgotModal(true);
              }}
            />
          </View>
        </ScrollView>

        {/* Avatar-based PIN recovery */}
        <Modal visible={showForgotModal} transparent statusBarTranslucent animationType="fade" onRequestClose={() => setShowForgotModal(false)}>
          <View style={styles.modalBackdrop}>
            <Card style={styles.modalCard} padding={space.xl}>
              <View style={styles.cardHead}>
                <IconBubble name="key" color={T.secondary} size="sm" />
                <AppText variant="title" style={styles.flex1}>
                  {t.avatarRecoveryTitle || 'Find your PIN'}
                </AppText>
                <PressableScale
                  onPress={() => setShowForgotModal(false)}
                  hitSlop={touch.hitSlop}
                  accessibilityRole="button"
                  accessibilityLabel={lang === 'ta' ? 'மூடு' : 'Close'}
                >
                  <Ionicons name="close-circle" size={32} color={T.dim} />
                </PressableScale>
              </View>

              <AppText variant="body" tone="muted" style={styles.avatarHint}>
                {t.avatarRecoverySubtitle || 'Tap the secret avatar you picked when you made your player:'}
              </AppText>

              {renderAvatarGrid({ selectedId: null, onSelect: handleAvatarRecoverySelect })}

              {recoveryFeedback ? (
                <View style={styles.recoveryBlock}>
                  <Banner tone={recoveredPin ? 'success' : 'danger'} message={recoveryFeedback} />
                  {recoveredPin ? (
                    <View style={[styles.pinReveal, { backgroundColor: T.secondarySoft, borderColor: T.secondary + '60' }]}>
                      <AppText variant="label" tone="muted">
                        {t.yourSecretPinIs || 'Your secret PIN is'}
                      </AppText>
                      <AppText variant="hero" tone="secondary" style={styles.pinRevealValue}>
                        {recoveredPin}
                      </AppText>
                    </View>
                  ) : null}
                </View>
              ) : null}

              {recoveredPin && activeTargetProfile ? (
                <Button
                  title={t.loginNowBtn || "Let's go!"}
                  iconRight="arrow-forward"
                  fullWidth
                  style={styles.modalCta}
                  onPress={() => {
                    triggerHaptic('success');
                    setShowForgotModal(false);
                    update({ ...activeTargetProfile, lang, savedProfiles });
                    if (onUnlock) onUnlock();
                  }}
                />
              ) : null}
            </Card>
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
  flex1: {
    flex: 1
  },
  column: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    gap: space.lg
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
    paddingVertical: space.sm
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
  langToggle: {
    flexDirection: 'row',
    padding: 4,
    gap: 2,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderBottomWidth: 4
  },
  langSeg: {
    minWidth: 56,
    height: 38,
    paddingHorizontal: space.md,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: space.xl,
    paddingVertical: space.xxl
  },
  section: {
    gap: space.md
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md
  },
  playerMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.xs + 2,
    marginTop: space.xs
  },
  playGo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    borderWidth: 2,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pinScroll: {
    flexGrow: 1,
    paddingHorizontal: space.xl,
    paddingTop: space.md,
    paddingBottom: space.xxl
  },
  pinHeader: {
    alignItems: 'center',
    gap: space.sm
  },
  profileScroll: {
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.huge
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginBottom: space.md
  },
  codeInput: {
    letterSpacing: 6,
    fontSize: 20
  },
  grid: {
    gap: space.md
  },
  gridRow: {
    flexDirection: 'row',
    gap: space.sm
  },
  ageTile: {
    minHeight: 60
  },
  avatarHint: {
    marginBottom: space.md
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(14, 11, 43, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.lg
  },
  modalCard: {
    width: '100%',
    maxWidth: 440
  },
  recoveryBlock: {
    marginTop: space.lg,
    gap: space.md
  },
  pinReveal: {
    alignItems: 'center',
    paddingVertical: space.md,
    borderRadius: radius.lg,
    borderWidth: 1.5
  },
  pinRevealValue: {
    letterSpacing: 8
  },
  modalCta: {
    marginTop: space.lg
  }
});
