import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TRANSLATIONS } from '../i18n/translations';

export default function Navbar({ tab, setTab, S, T }) {
  const insets = useSafeAreaInsets();
  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // 5 essential production tabs with sleek vector icons
  const tabs = [
    {
      k: 'today',
      iconActive: 'checkmark-circle',
      iconInactive: 'checkmark-circle-outline',
      n: t.tabToday || (lang === 'ta' ? 'இன்று' : 'Today')
    },
    {
      k: 'week',
      iconActive: 'calendar',
      iconInactive: 'calendar-outline',
      n: t.tabWeek || (lang === 'ta' ? 'திட்டம்' : 'Planner')
    },
    {
      k: 'quests',
      iconActive: 'shield',
      iconInactive: 'shield-outline',
      n: t.tabQuests || (lang === 'ta' ? 'சவால்கள்' : 'Quests')
    },
    {
      k: 'reports',
      iconActive: 'trending-up',
      iconInactive: 'trending-up-outline',
      n: lang === 'ta' ? 'வளர்ச்சி' : 'Growth'
    },
    {
      k: 'me',
      iconActive: 'person',
      iconInactive: 'person-outline',
      n: t.tabMe || (lang === 'ta' ? 'சுயவிவரம்' : 'Profile')
    }
  ];

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: T.surfaceLowest || T.card,
          borderTopColor: T.line,
          paddingBottom: Math.max(insets.bottom, 10)
        }
      ]}
    >
      <View style={styles.barRow}>
        {tabs.map((item) => {
          const isSelected = tab === item.k;
          const activeColor = T.primary;

          return (
            <Pressable
              key={item.k}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setTab(item.k)}
              style={[
                styles.tabBtn,
                isSelected && {
                  backgroundColor: T.primary + '14',
                  borderColor: T.primary + '40',
                  borderWidth: 1
                }
              ]}
            >
              <Ionicons
                name={isSelected ? item.iconActive : item.iconInactive}
                size={21}
                color={isSelected ? activeColor : T.mu}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: isSelected ? activeColor : T.mu,
                    fontWeight: isSelected ? '800' : '500'
                  }
                ]}
                numberOfLines={1}
              >
                {item.n}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    paddingTop: 6,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8
  },
  barRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 14,
    marginHorizontal: 3,
    minHeight: 48
  },
  label: {
    fontSize: 10.5,
    marginTop: 3,
    textAlign: 'center',
    letterSpacing: 0.2
  }
});
