import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TRANSLATIONS } from '../i18n/translations';
import { AppText, PressableScale, space, radius } from '../design';

/**
 * Floating tab bar. Each tab owns a colour so young children can navigate by
 * colour + icon as well as by word; the active tab lifts into a solid bubble.
 */
export default function Navbar({ tab, setTab, S, T }) {
  const insets = useSafeAreaInsets();
  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const tabs = [
    { k: 'today', icon: 'sunny', n: t.tabToday || (lang === 'ta' ? 'இன்று' : 'Today'), color: T.primary },
    { k: 'week', icon: 'calendar', n: t.tabWeek || (lang === 'ta' ? 'திட்டம்' : 'Planner'), color: T.tertiary },
    { k: 'quests', icon: 'trophy', n: t.tabQuests || (lang === 'ta' ? 'சவால்கள்' : 'Quests'), color: T.secondary },
    { k: 'reports', icon: 'leaf', n: lang === 'ta' ? 'வளர்ச்சி' : 'Growth', color: T.purple },
    { k: 'me', icon: 'happy', n: t.tabMe || (lang === 'ta' ? 'சுயவிவரம்' : 'Me'), color: T.rose }
  ];

  return (
    <View style={[styles.outer, { paddingBottom: Math.max(insets.bottom, space.sm) }]}>
      <View
        accessibilityRole="tablist"
        style={[
          styles.bar,
          {
            backgroundColor: T.card,
            borderColor: T.line,
            borderBottomColor: T.ledge,
            ...Platform.select({
              ios: { shadowColor: T.shadow, shadowOpacity: T.isDark ? 0.4 : 0.1, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
              android: { elevation: 8 },
              default: {}
            })
          }
        ]}
      >
        {tabs.map((item) => {
          const isSelected = tab === item.k;
          return (
            <PressableScale
              key={item.k}
              containerStyle={styles.tabSlot}
              style={styles.tabBtn}
              onPress={() => setTab(item.k)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={item.n}
              scaleTo={0.9}
            >
              <View
                style={[
                  styles.iconBubble,
                  isSelected
                    ? { backgroundColor: item.color, borderBottomColor: 'rgba(0,0,0,0.2)', borderBottomWidth: 3 }
                    : { backgroundColor: 'transparent' }
                ]}
              >
                <Ionicons
                  name={isSelected ? item.icon : `${item.icon}-outline`}
                  size={24}
                  color={isSelected ? (T.isDark ? T.on : '#FFFFFF') : T.dim}
                />
              </View>
              <AppText
                variant="caption"
                color={isSelected ? item.color : T.mu}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
                style={styles.label}
              >
                {item.n}
              </AppText>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: space.md,
    paddingTop: space.xs
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderBottomWidth: 5,
    paddingVertical: space.sm,
    paddingHorizontal: space.xs
  },
  tabSlot: {
    flex: 1
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56
  },
  iconBubble: {
    width: 48,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginTop: 2,
    textAlign: 'center'
  }
});
