import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DIMS, REWARDS } from '../data';
import { TRANSLATIONS } from '../i18n/translations';
import * as L from '../logic';
import { triggerHaptic } from '../haptics';

export default function QuestsScreen({ S, update, T }) {
  const lang = S.lang || 'en';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const w0 = L.weekDays()[0];
  const act = L.activeHabits(S);
  const sc = L.weekScore(S);
  const bonus = S.bonus || {};
  const claims = (S.claims && S.claims[w0]) || [];

  const wk = Math.floor(new Date(w0 + 'T00:00:00') / 6048e5);
  const cd = L.capDay(S);
  const goodDays = L.capGoodDays(S);
  const isOver = cd > 30;
  const isGraduated = S.cap && isOver && goodDays >= 18;

  const collectBonus = (key, amt) => {
    triggerHaptic('success');
    update({
      ...S,
      bonus: {
        ...bonus,
        [key]: amt
      }
    });
  };

  const toggleClaimReward = (rewardName) => {
    triggerHaptic('success');
    const nextClaims = claims.includes(rewardName)
      ? claims.filter((x) => x !== rewardName)
      : [...claims, rewardName];

    update({
      ...S,
      claims: {
        ...(S.claims || {}),
        [w0]: nextClaims
      }
    });
  };

  const CHECKPOINT_PROMPTS = {
    7: lang === 'ta'
      ? 'இந்த வாரம் எந்தப் பழக்கம் எளிதாக இருந்தது? எது கடினமாக இருந்தது?'
      : 'Which habit felt easiest this week? Which felt hardest?',
    14: lang === 'ta'
      ? 'ஒரு தவறு அல்லது பின்னடைவிலிருந்து நீ என்ன கற்றுக்கொண்டாய்?'
      : 'What did you learn from a mistake or setback?',
    21: lang === 'ta'
      ? 'உன் பழக்கங்கள் உன்னைத் தவிர வேறு யாருக்கு உதவியாக இருந்தது?'
      : 'Who did your habits help besides you?',
    28: lang === 'ta'
      ? '30 நாட்களுக்குப் பிறகும் நீ தொடர்ந்து செய்யப்போகும் பழக்கம் எது?'
      : 'What will you keep doing after day 30?'
  };

  const dimVectorIcons = {
    P: 'fitness-outline',
    M: 'compass-outline',
    I: 'bulb-outline',
    E: 'shield-checkmark-outline',
    F: 'wallet-outline'
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* 1. Weekly Quest Cards */}
      <View style={styles.headerBlock}>
        <View style={styles.headerTagRow}>
          <Ionicons name="shield-outline" size={14} color={T.primary} />
          <Text style={[styles.headerTag, { color: T.primary }]}>
            {lang === 'ta' ? 'வாராந்திர இலக்குகள்' : 'Weekly Missions'}
          </Text>
        </View>
        <Text style={[styles.h2, { color: T.tx }]}>{t.weeklyQuestsTitle}</Text>
        <Text style={[styles.subtitle, { color: T.mu }]}>{t.weeklyQuestsSubtitle}</Text>
      </View>

      <View style={styles.questsList}>
        {DIMS.map((d) => {
          const hs = act.filter((h) => h.dimKey === d.k);
          if (!hs.length) return null;
          const h = hs[wk % hs.length];
          const daysCompleted = L.weekDays().filter((x) => L.doneOn(S, x).includes(h.id)).length;
          const questKey = `q-${d.k}-${w0}`;
          const isCollected = !!bonus[questKey];
          const canCollect = daysCompleted >= 5 && !isCollected;
          const dimColor = T.dimColors[d.k] || d.c[T.ci];
          const dimIcon = dimVectorIcons[d.k] || 'ellipse-outline';

          const hData = (t.habits && t.habits[h.id]) || { name: h.n, desc: h.s };
          const dimData = (t.dims && t.dims[d.k]) || { name: d.n };

          return (
            <View
              key={questKey}
              style={[
                styles.questCard,
                {
                  backgroundColor: T.card,
                  borderColor: canCollect ? dimColor : T.line,
                  borderLeftColor: dimColor,
                  borderLeftWidth: 4
                }
              ]}
            >
              <View style={styles.questRow}>
                <View
                  style={[
                    styles.dimIconBox,
                    { backgroundColor: dimColor + '18', borderColor: dimColor + '40' }
                  ]}
                >
                  <Ionicons name={dimIcon} size={18} color={dimColor} />
                </View>

                <View style={styles.questMain}>
                  <Text style={[styles.questDimName, { color: dimColor }]}>
                    {dimData.name}
                  </Text>
                  <Text style={[styles.questHabitTitle, { color: T.tx }]} numberOfLines={1}>
                    {hData.name}
                  </Text>
                  <View style={styles.progressMicroRow}>
                    <View style={[styles.microRail, { backgroundColor: T.surfaceLowest || '#060E20', borderColor: T.line }]}>
                      <View
                        style={[
                          styles.microFill,
                          {
                            width: `${Math.min(100, (daysCompleted / 5) * 100)}%`,
                            backgroundColor: dimColor
                          }
                        ]}
                      />
                    </View>
                    <Text style={[styles.questProgressText, { color: T.mu }]}>
                      {daysCompleted}/5 {lang === 'ta' ? 'நாட்கள்' : 'days'}
                    </Text>
                  </View>
                </View>

                {/* Claim / Collect Action */}
                <Pressable
                  disabled={!canCollect}
                  onPress={() => collectBonus(questKey, 30)}
                  style={[
                    styles.questActionBtn,
                    {
                      backgroundColor: isCollected
                        ? T.primary + '20'
                        : canCollect
                          ? T.primary
                          : T.surfaceLowest || '#060E20',
                      borderColor: isCollected ? T.primary : canCollect ? T.primary : T.line
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.questActionText,
                      {
                        color: isCollected ? T.primary : canCollect ? '#FFFFFF' : T.mu,
                        fontWeight: canCollect || isCollected ? '800' : '600'
                      }
                    ]}
                  >
                    {isCollected ? '✓ +30 XP' : canCollect ? '+30 XP' : `${daysCompleted}/5`}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      {/* 2. Weekly Boss Challenge */}
      <View
        style={[
          styles.bossCard,
          {
            backgroundColor: T.cardElevated || T.card,
            borderColor: sc.tier >= 2 ? T.secondary : T.lineHigh
          }
        ]}
      >
        <View style={styles.bossHeader}>
          <View style={styles.bossTitleGroup}>
            <View style={[styles.bossIconBox, { backgroundColor: T.secondary + '20', borderColor: T.secondary + '50' }]}>
              <Ionicons name="flame" size={20} color={T.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.bossBadge, { color: T.secondary }]}>
                {lang === 'ta' ? 'வாராந்திர பாஸ்' : 'WEEKLY BOSS'}
              </Text>
              <Text style={[styles.bossTitle, { color: T.tx }]}>{t.bossTitle}</Text>
            </View>
          </View>
          <View style={[styles.bossRewardTag, { backgroundColor: T.secondary + '18', borderColor: T.secondary + '50' }]}>
            <Text style={[styles.bossRewardText, { color: T.secondary }]}>+100 XP</Text>
          </View>
        </View>

        <Text style={[styles.bossDesc, { color: T.mu }]}>{t.bossDesc}</Text>

        <View style={styles.bossStatusRow}>
          <Text style={[styles.bossStatusLabel, { color: T.mu }]}>
            {lang === 'ta' ? 'தற்போதைய நிலை:' : 'Current Status:'}
          </Text>
          <Text
            style={[
              styles.bossStatusVal,
              { color: sc.tier >= 2 ? T.primary : T.secondary }
            ]}
          >
            {t.medals[sc.tier]} ({sc.scaledScore}/350 {lang === 'ta' ? 'புள்ளிகள்' : 'PTS'})
          </Text>
        </View>

        <Pressable
          disabled={sc.tier < 2 || !!bonus['boss-' + w0]}
          onPress={() => collectBonus('boss-' + w0, 100)}
          style={[
            styles.bossBtn,
            {
              backgroundColor: bonus['boss-' + w0]
                ? T.primary + '20'
                : sc.tier >= 2
                  ? T.secondary
                  : T.surfaceLowest || '#060E20',
              borderColor: bonus['boss-' + w0] ? T.primary : sc.tier >= 2 ? T.secondary : T.line
            }
          ]}
        >
          <Ionicons
            name={bonus['boss-' + w0] ? 'checkmark-circle' : 'flash'}
            size={16}
            color={bonus['boss-' + w0] ? T.primary : sc.tier >= 2 ? '#FFFFFF' : T.mu}
          />
          <Text
            style={[
              styles.bossBtnText,
              { color: bonus['boss-' + w0] ? T.primary : sc.tier >= 2 ? '#FFFFFF' : T.mu }
            ]}
          >
            {bonus['boss-' + w0]
              ? t.bossDefeated || 'Boss Defeated! (+100 XP)'
              : sc.tier >= 2
                ? t.defeatBossBtn || 'Defeat Boss: 100 XP'
                : t.bossStrong || 'Reach Silver Medal (240+) to Defeat'}
          </Text>
        </Pressable>
      </View>

      {/* 3. Section 10: 30-Day Capstone Challenge */}
      <View
        style={[
          styles.capCard,
          {
            backgroundColor: T.card,
            borderColor: T.line
          }
        ]}
      >
        <View style={styles.capHeader}>
          <View style={styles.capTitleGroup}>
            <View style={[styles.capIconBox, { backgroundColor: T.tertiary + '18', borderColor: T.tertiary + '50' }]}>
              <Ionicons name="trophy-outline" size={20} color={T.tertiary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.capBadge, { color: T.tertiary }]}>
                {lang === 'ta' ? 'பகுதி 10 · 30-நாள் சவால்' : 'SECTION 10 · 30-DAY CAPSTONE'}
              </Text>
              <Text style={[styles.capTitle, { color: T.tx }]}>{t.capstoneTitle}</Text>
            </View>
          </View>
          <View style={[styles.bonusTag, { backgroundColor: T.tertiary + '18', borderColor: T.tertiary + '50' }]}>
            <Text style={[styles.bonusTagText, { color: T.tertiary }]}>+500 XP</Text>
          </View>
        </View>

        <Text style={[styles.capDesc, { color: T.mu }]}>{t.capstoneDesc}</Text>

        {!S.cap ? (
          <Pressable
            onPress={() => {
              triggerHaptic('success');
              update({ ...S, cap: L.todayS() });
            }}
            style={[styles.startCapBtn, { backgroundColor: T.tertiary }]}
          >
            <Ionicons name="play" size={16} color="#FFFFFF" />
            <Text style={styles.startCapBtnText}>{t.startCapstone}</Text>
          </Pressable>
        ) : (
          <View style={styles.capActiveBlock}>
            {/* Aligned Stats Banner */}
            <View
              style={[
                styles.capStatsRow,
                {
                  backgroundColor: T.surfaceLowest || '#060E20',
                  borderColor: T.line
                }
              ]}
            >
              <View style={styles.capStatsLeft}>
                <Text style={[styles.capStatLabel, { color: T.mu }]}>
                  {t.capstoneDay} {Math.min(cd, 30)} {t.of30}
                </Text>
                <Text style={[styles.capStatVal, { color: T.tx }]}>
                  {goodDays} {t.goodDays}
                </Text>
              </View>
              <View
                style={[
                  styles.capTargetBox,
                  {
                    backgroundColor: (goodDays >= 18 ? T.primary : T.secondary) + '18',
                    borderColor: (goodDays >= 18 ? T.primary : T.secondary) + '50'
                  }
                ]}
              >
                <Text style={[styles.capTargetText, { color: goodDays >= 18 ? T.primary : T.secondary }]}>
                  {goodDays >= 18
                    ? (lang === 'ta' ? 'இலக்கு எட்டப்பட்டது (18+)' : 'Target Met (18+)')
                    : (lang === 'ta' ? `இன்னும் ${18 - goodDays} நாட்கள்` : `${18 - goodDays} more needed`)}
                </Text>
              </View>
            </View>

            {/* Symmetrical 6x5 (30-Day) Matrix Grid */}
            <View style={styles.grid30}>
              {[0, 1, 2, 3, 4].map((rowIdx) => {
                const rowDates = L.capDates(S).slice(rowIdx * 6, rowIdx * 6 + 6);
                return (
                  <View key={`cap-row-${rowIdx}`} style={styles.grid30Row}>
                    {rowDates.map((d, colIdx) => {
                      const dayNum = rowIdx * 6 + colIdx + 1;
                      const isPassed = d <= L.todayS();
                      const isGood = isPassed && L.dayPct(S, d) >= 0.6;
                      const isCurrent = dayNum === cd;

                      return (
                        <View
                          key={d}
                          style={[
                            styles.capDot,
                            {
                              borderColor: isCurrent ? T.tertiary : isGood ? T.primary : T.line,
                              backgroundColor: isGood
                                ? T.primary
                                : isCurrent
                                  ? T.tertiary + '22'
                                  : T.surfaceLowest || '#060E20'
                            }
                          ]}
                        >
                          <Text
                            style={[
                              styles.capDotNum,
                              { color: isGood ? '#FFFFFF' : isCurrent ? T.tertiary : T.mu }
                            ]}
                          >
                            {dayNum}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>

            {/* Weekly Checkpoints */}
            <View style={styles.checkpointsBlock}>
              <Text style={[styles.checkpointSectionTitle, { color: T.tx }]}>
                {lang === 'ta' ? 'வாராந்திர மைல்கல் கேள்விகள்' : 'Weekly Checkpoint Reflections'}
              </Text>
              {[7, 14, 21, 28].map((cpDay) => {
                const isUnlocked = cd >= cpDay;
                return (
                  <View
                    key={cpDay}
                    style={[
                      styles.checkpointItem,
                      {
                        backgroundColor: isUnlocked ? T.surfaceLowest || '#060E20' : 'transparent',
                        borderColor: T.line,
                        opacity: isUnlocked ? 1 : 0.5
                      }
                    ]}
                  >
                    <View style={styles.cpTop}>
                      <Ionicons
                        name={isUnlocked ? 'flag' : 'lock-closed-outline'}
                        size={13}
                        color={isUnlocked ? T.primary : T.mu}
                      />
                      <Text style={[styles.checkpointTitle, { color: T.tx }]}>
                        {t.checkpoint} {cpDay} {!isUnlocked && `(${t.locked})`}
                      </Text>
                    </View>
                    <Text style={[styles.checkpointPrompt, { color: T.mu }]}>
                      {CHECKPOINT_PROMPTS[cpDay]}
                    </Text>
                    {isUnlocked && (
                      <TextInput
                        style={[
                          styles.checkpointInput,
                          {
                            borderColor: T.line,
                            backgroundColor: T.card,
                            color: T.tx
                          }
                        ]}
                        placeholder={lang === 'ta' ? 'உங்கள் பிரதிபலிப்பை இங்கே எழுதுங்கள்...' : 'Write your milestone reflection...'}
                        placeholderTextColor={T.mu}
                        value={(S.capNotes && S.capNotes[cpDay]) || ''}
                        onChangeText={(txt) =>
                          update({
                            ...S,
                            capNotes: {
                              ...(S.capNotes || {}),
                              [cpDay]: txt
                            }
                          })
                        }
                      />
                    )}
                  </View>
                );
              })}
            </View>

            {/* Graduate Button if criteria met */}
            {isGraduated && (
              <Pressable
                disabled={!!bonus.capstoneGrad}
                onPress={() => collectBonus('capstoneGrad', 500)}
                style={[
                  styles.graduateBtn,
                  {
                    backgroundColor: bonus.capstoneGrad ? T.primary + '20' : T.primary,
                    borderColor: T.primary
                  }
                ]}
              >
                <Ionicons name="school" size={18} color={bonus.capstoneGrad ? T.primary : '#FFFFFF'} />
                <Text
                  style={[
                    styles.graduateBtnText,
                    { color: bonus.capstoneGrad ? T.primary : '#FFFFFF' }
                  ]}
                >
                  {bonus.capstoneGrad ? t.graduated : t.graduateBtn}
                </Text>
              </Pressable>
            )}

            {/* Restart Capstone option if 30 days completed */}
            {isOver && (
              <Pressable
                onPress={() => {
                  triggerHaptic('light');
                  update({ ...S, cap: L.todayS() });
                }}
                style={[
                  styles.graduateBtn,
                  {
                    backgroundColor: T.surfaceLowest || '#060E20',
                    borderColor: T.lineHigh,
                    marginTop: 8
                  }
                ]}
              >
                <Ionicons name="refresh" size={16} color={T.tertiary} />
                <Text style={[styles.graduateBtnText, { color: T.tertiary }]}>
                  {t.restartCapstone || (lang === 'ta' ? '30-நாள் சவாலை மீண்டும் தொடங்கு' : 'Restart 30-Day Capstone')}
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </View>

      {/* 4. Section 4: Experience Rewards (Real-world experiences) */}
      <View
        style={[
          styles.rewardsSection,
          {
            backgroundColor: T.card,
            borderColor: T.line
          }
        ]}
      >
        <View style={styles.rewardsHeaderBlock}>
          <View style={styles.rewardsBadgeRow}>
            <Ionicons name="gift-outline" size={15} color={T.secondary} />
            <Text style={[styles.rewardsBadgeText, { color: T.secondary }]}>
              {lang === 'ta' ? 'பிரிவு 4' : 'SECTION 4'}
            </Text>
          </View>
          <Text style={[styles.rewardsMainTitle, { color: T.tx }]}>{t.rewardsTitle}</Text>
          <Text style={[styles.rewardsMainSubtitle, { color: T.mu }]}>{t.rewardsSubtitle}</Text>
        </View>

        <View style={styles.rewardsStack}>
          {REWARDS.map((r) => {
            const isUnlocked = sc.tier >= r.r;
            const isClaimed = claims.includes(r.n);
            const requiredMedalName = t.medals[r.r];

            return (
              <View
                key={r.n}
                style={[
                  styles.rewardCard,
                  {
                    backgroundColor: isClaimed ? T.primary + '10' : T.surfaceLowest || '#060E20',
                    borderColor: isClaimed ? T.primary + '50' : isUnlocked ? T.secondary + '50' : T.line,
                    opacity: isUnlocked || isClaimed ? 1 : 0.6
                  }
                ]}
              >
                <View style={styles.rewardCardRow}>
                  <View
                    style={[
                      styles.rewardIconBadge,
                      {
                        backgroundColor: isClaimed
                          ? T.primary + '20'
                          : isUnlocked
                          ? T.secondary + '20'
                          : T.line,
                        borderColor: isClaimed
                          ? T.primary
                          : isUnlocked
                          ? T.secondary
                          : 'transparent'
                      }
                    ]}
                  >
                    <Ionicons
                      name={isClaimed ? 'checkmark-circle' : (r.icon || 'gift-outline')}
                      size={20}
                      color={isClaimed ? T.primary : isUnlocked ? T.secondary : T.mu}
                    />
                  </View>

                  <View style={styles.rewardInfoCol}>
                    <Text style={[styles.rewardTitle, { color: T.tx }]}>
                      {lang === 'ta' ? (r.n_ta || r.n) : r.n}
                    </Text>
                    <Text style={[styles.rewardDescText, { color: T.mu }]}>
                      {lang === 'ta' ? (r.desc_ta || r.desc) : r.desc}
                    </Text>
                    <Text
                      style={[
                        styles.rewardReqText,
                        { color: isClaimed || isUnlocked ? T.primary : T.secondary }
                      ]}
                    >
                      {isClaimed
                        ? `✓ ${t.claimed || (lang === 'ta' ? 'பெறப்பட்டது (பெற்றோர் உறுதிசெய்தனர்)' : 'Claimed (Parent Confirmed)')}`
                        : isUnlocked
                          ? `✓ ${t.unlocked || 'Unlocked'}`
                          : `${t.needsMedal || 'Requires'} ${requiredMedalName}`}
                    </Text>
                  </View>

                  <Pressable
                    disabled={!isUnlocked}
                    onPress={() => toggleClaimReward(r.n)}
                    style={[
                      styles.rewardClaimBtn,
                      {
                        backgroundColor: isClaimed
                          ? T.primary + '20'
                          : isUnlocked
                            ? T.primary
                            : 'transparent',
                        borderColor: isClaimed ? T.primary : isUnlocked ? T.primary : T.line
                      }
                    ]}
                  >
                    <Text
                      style={[
                        styles.rewardClaimBtnText,
                        { color: isClaimed ? T.primary : isUnlocked ? '#FFFFFF' : T.mu }
                      ]}
                    >
                      {isClaimed ? (lang === 'ta' ? '✓ பெறப்பட்டது' : '✓ Claimed') : (t.claim || 'Claim')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={[styles.parentNoteText, { color: T.mu }]}>
          {t.parentConfirms || (lang === 'ta' ? 'பெற்றோருடன் இணைந்து அனுபவப் பரிசுகளைக் கொண்டாடுங்கள்.' : 'Experience rewards are celebrated together with parents.')}
        </Text>
      </View>
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
  headerBlock: {
    marginBottom: 14
  },
  headerTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2
  },
  headerTag: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
  h2: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
    marginBottom: 2
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 17
  },
  questsList: {
    gap: 10,
    marginBottom: 16
  },
  questCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12
  },
  questRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  dimIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  questMain: {
    flex: 1,
    minWidth: 0
  },
  questDimName: {
    fontSize: 10.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3
  },
  questHabitTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    marginTop: 1
  },
  progressMicroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4
  },
  microRail: {
    flex: 1,
    height: 5,
    borderRadius: 2.5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  microFill: {
    height: '100%',
    borderRadius: 2.5
  },
  questProgressText: {
    fontSize: 10.5,
    fontWeight: '600'
  },
  questActionBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center'
  },
  questActionText: {
    fontSize: 11
  },
  bossCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16
  },
  bossHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  bossTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8
  },
  bossIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bossBadge: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8
  },
  bossTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  bossRewardTag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8
  },
  bossRewardText: {
    fontSize: 11,
    fontWeight: '800'
  },
  bossDesc: {
    fontSize: 12.5,
    lineHeight: 17,
    marginBottom: 10
  },
  bossStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12
  },
  bossStatusLabel: {
    fontSize: 12,
    fontWeight: '600'
  },
  bossStatusVal: {
    fontSize: 12.5,
    fontWeight: '800',
    flexShrink: 1
  },
  bossBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10
  },
  bossBtnText: {
    fontSize: 13,
    fontWeight: '800'
  },
  capCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16
  },
  capHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  capTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8
  },
  capIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  capBadge: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.7
  },
  capTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2
  },
  bonusTag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    flexShrink: 0
  },
  bonusTagText: {
    fontSize: 11,
    fontWeight: '800'
  },
  capDesc: {
    fontSize: 12.5,
    lineHeight: 17,
    marginBottom: 12
  },
  startCapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
    paddingVertical: 10
  },
  startCapBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  capActiveBlock: {
    marginTop: 4
  },
  capStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  capStatsLeft: {
    flex: 1,
    marginRight: 8
  },
  capStatLabel: {
    fontSize: 11.5,
    fontWeight: '700'
  },
  capStatVal: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2
  },
  capTargetBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  capTargetText: {
    fontSize: 11,
    fontWeight: '800'
  },
  grid30: {
    gap: 6,
    marginBottom: 14
  },
  grid30Row: {
    flexDirection: 'row',
    gap: 6
  },
  capDot: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  capDotNum: {
    fontSize: 11,
    fontWeight: '800'
  },
  checkpointsBlock: {
    marginTop: 6,
    gap: 8
  },
  checkpointSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2
  },
  checkpointItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  },
  cpTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2
  },
  checkpointTitle: {
    fontSize: 12,
    fontWeight: '800'
  },
  checkpointPrompt: {
    fontSize: 11.5,
    lineHeight: 15
  },
  checkpointInput: {
    marginTop: 7,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
    fontSize: 12
  },
  graduateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    marginTop: 12
  },
  graduateBtnText: {
    fontSize: 13,
    fontWeight: '800'
  },
  rewardsSection: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16
  },
  rewardsHeaderBlock: {
    marginBottom: 12
  },
  rewardsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2
  },
  rewardsBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  rewardsMainTitle: {
    fontSize: 16,
    fontWeight: '900'
  },
  rewardsMainSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2
  },
  rewardsStack: {
    gap: 8
  },
  rewardCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 10
  },
  rewardCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  rewardIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rewardInfoCol: {
    flex: 1,
    minWidth: 0
  },
  rewardTitle: {
    fontSize: 13,
    fontWeight: '800'
  },
  rewardDescText: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 1
  },
  rewardReqText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '800',
    marginTop: 2
  },
  rewardClaimBtn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  rewardClaimBtnText: {
    fontSize: 11,
    fontWeight: '800'
  },
  parentNoteText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10
  }
});
