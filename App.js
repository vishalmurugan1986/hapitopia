import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useColorScheme, Platform, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './src/components/Header';
import Navbar from './src/components/Navbar';
import OnboardingScreen from './src/screens/OnboardingScreen';
import TodayScreen from './src/screens/TodayScreen';
import QuestsScreen from './src/screens/QuestsScreen';
import WeekScreen from './src/screens/WeekScreen';
import ReportCardsScreen from './src/screens/ReportCardsScreen';
import MeScreen from './src/screens/MeScreen';

import { LUMINOUS_THEME } from './src/theme';
import { setSoundMuted } from './src/haptics';

const KEY = 'habitgame_v1';

// Helper to ensure a profile is synced inside the device's savedProfiles list
function syncProfileList(stateObj) {
  if (!stateObj || typeof stateObj !== 'object') return { savedProfiles: [] };
  const list = Array.isArray(stateObj.savedProfiles) ? [...stateObj.savedProfiles] : [];

  if (stateObj.name) {
    const profileId = stateObj.id || `${stateObj.name.trim().toLowerCase()}_${stateObj.age || 0}`;
    const { savedProfiles, ...profileData } = stateObj;
    const cleanProfile = { ...profileData, id: profileId };

    const existingIdx = list.findIndex((p) => p.id === profileId);
    if (existingIdx >= 0) {
      list[existingIdx] = cleanProfile;
    } else {
      list.push(cleanProfile);
    }
    return {
      ...cleanProfile,
      savedProfiles: list
    };
  }

  return {
    ...stateObj,
    savedProfiles: list
  };
}

function MainShell({ S, update, tab, setTab, T, onLock }) {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets.top,
    Platform.OS === 'ios' ? 48 : (RNStatusBar.currentHeight || 28) + 6
  );

  const renderCurrentTab = () => {
    switch (tab) {
      case 'today':
        return <TodayScreen S={S} update={update} T={T} />;
      case 'week':
        return <WeekScreen S={S} update={update} T={T} />;
      case 'quests':
        return <QuestsScreen S={S} update={update} T={T} />;
      case 'reports':
        return <ReportCardsScreen S={S} update={update} T={T} initialSubTab="rubrics" />;
      case 'me':
        return (
          <MeScreen
            S={S}
            update={update}
            setTab={setTab}
            T={T}
            onLock={onLock}
          />
        );
      default:
        return <TodayScreen S={S} update={update} T={T} />;
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: T.bg, paddingTop: topInset }]}>
      <Header S={S} update={update} T={T} />
      <View style={styles.content}>
        {renderCurrentTab()}
      </View>
      <Navbar tab={tab} setTab={setTab} S={S} T={T} />
    </View>
  );
}

export default function App() {
  const isDark = useColorScheme() === 'dark';
  const baseT = isDark ? LUMINOUS_THEME.dark : LUMINOUS_THEME.light;
  const T = {
    ...baseT,
    gold: baseT.secondary,
    i: baseT.tertiary
  };
  const [S, setS] = useState(null);
  const [tab, setTab] = useState('today');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => {
        const parsed = v ? JSON.parse(v) : {};
        setSoundMuted(!!parsed.soundMuted);
        setS(syncProfileList(parsed));
      })
      .catch(() => setS({ savedProfiles: [] }));
  }, []);

  const update = (next) => {
    if (typeof next?.soundMuted === 'boolean') {
      setSoundMuted(next.soundMuted);
    }
    const synced = syncProfileList(next);
    setS(synced);
    AsyncStorage.setItem(KEY, JSON.stringify(synced)).catch(() => {});
  };

  if (!S) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {!S.name || !isUnlocked ? (
        <OnboardingScreen
          S={S}
          update={update}
          T={T}
          onUnlock={() => setIsUnlocked(true)}
          initialScreen="welcome"
        />
      ) : (
        <MainShell
          S={S}
          update={update}
          tab={tab}
          setTab={setTab}
          T={T}
          onLock={() => setIsUnlocked(false)}
        />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  content: {
    flex: 1
  }
});
