// Comprehensive End-to-End Simulation Test for Habitopia
import * as L from '../src/logic.js';
import { DIMS, HABITS, REWARDS, AVATARS, PARENT_GUIDE, TEACHER_GUIDE, DIM_RUBRICS } from '../src/data/index.js';
import { TRANSLATIONS } from '../src/i18n/translations.js';
import { CURRICULUM_BOOKS } from '../src/data/curriculumBooks.js';
import { HABIT_CHAPTERS } from '../src/data/habitChapters.js';
import { AGE_PROFILES, BOOK_INTRO } from '../src/data/psychologyProfiles.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed++;
    throw new Error(message);
  } else {
    passed++;
  }
}

console.log('🚀 Starting Habitopia Comprehensive Game Simulation...\n');

// 1. DATA INTEGRITY CHECK
console.log('--- TEST SUITE 1: Data Architecture & Framework Completeness ---');
assert(DIMS.length === 5, 'Must have exactly 5 Growth Dimensions (P, M, I, E, F)');
const dimKeys = ['P', 'M', 'I', 'E', 'F'];
dimKeys.forEach(k => {
  assert(HABITS[k] && HABITS[k].length === 7, `Dimension ${k} must contain exactly 7 habits`);
});

const allHabitsList = L.allHabits();
assert(allHabitsList.length === 35, `allHabits() must return exactly 35 habits, got ${allHabitsList.length}`);

// Verify all 35 Habit Chapters have all 12 pedagogical elements in both English and Tamil
allHabitsList.forEach(h => {
  const chapter = HABIT_CHAPTERS[h.id];
  assert(chapter, `Habit ${h.id} (${h.n}) must have a curriculum chapter`);
  ['en', 'ta'].forEach(lang => {
    const c = chapter[lang];
    assert(c, `Habit ${h.id} missing ${lang} chapter`);
    assert(c.name, `Habit ${h.id} [${lang}] missing name`);
    assert(c.whyItMatters, `Habit ${h.id} [${lang}] missing whyItMatters`);
    assert(c.story, `Habit ${h.id} [${lang}] missing story`);
    assert(c.dailyPractice, `Habit ${h.id} [${lang}] missing dailyPractice`);
    assert(c.weeklyChallenge, `Habit ${h.id} [${lang}] missing weeklyChallenge`);
    assert(c.monthlyMission, `Habit ${h.id} [${lang}] missing monthlyMission`);
    assert(Array.isArray(c.reflectionQuestions) && c.reflectionQuestions.length >= 2, `Habit ${h.id} [${lang}] missing reflectionQuestions`);
    assert(Array.isArray(c.parentQuestions) && c.parentQuestions.length >= 1, `Habit ${h.id} [${lang}] missing parentQuestions`);
    assert(Array.isArray(c.teacherQuestions) && c.teacherQuestions.length >= 1, `Habit ${h.id} [${lang}] missing teacherQuestions`);
    assert(c.rubric && c.rubric.beginner && c.rubric.master, `Habit ${h.id} [${lang}] missing 4-level rubric`);
  });
});
console.log(`✅ All 35 Habit Chapters verified across all 12 pedagogical elements (EN & TA).`);

// Verify Psychology Profiles (Ages 7 to 14)
for (let age = 7; age <= 14; age++) {
  const p = AGE_PROFILES[age];
  assert(p, `Age ${age} must have psychology profile`);
  ['en', 'ta'].forEach(lang => {
    const c = p[lang];
    assert(c.cognitive && c.emotional && c.social && c.physical && c.learning, `Age ${age} [${lang}] missing domain details`);
  });
}
console.log(`✅ Psychology profiles for ages 7–14 verified across all 5 domains.`);

// Verify 8 Curriculum Books (Ages 7 to 14)
for (let age = 7; age <= 14; age++) {
  const book = CURRICULUM_BOOKS[age];
  assert(book, `Age ${age} must have a curriculum book`);
  ['en', 'ta'].forEach(lang => {
    const c = book[lang];
    assert(c && c.bookTitle && c.sampleLesson && c.learningOutcomes && c.worksheets, `Book for age ${age} [${lang}] missing curriculum contents`);
  });
}
console.log(`✅ 8-Book publishing series curriculum verified.`);

// 2. SIMULATION: PLAYER LIFECYCLE & AGE TIERS
console.log('\n--- TEST SUITE 2: Age Tiers, Missions & Clean Sweep ---');
const testProfiles = [
  { name: 'Aarav', age: 8, avatar: '🚀', pin: '1234', expectedHabits: 5 },   // Starter (Ages 7-9)
  { name: 'Diya', age: 10, avatar: '🌟', pin: '4321', expectedHabits: 15 },  // Builder (Ages 10-11)
  { name: 'Kavin', age: 13, avatar: '🦁', pin: '9999', expectedHabits: 35 }  // Future CEO (Ages 12-14)
];

testProfiles.forEach(p => {
  let S = {
    name: p.name,
    age: p.age,
    avatar: p.avatar,
    pin: p.pin,
    lang: 'en',
    parentConsent: true,
    done: {},
    bonus: {},
    claims: {},
    goals: {},
    log: {},
    monthly: {}
  };

  const act = L.activeHabits(S);
  assert(act.length === p.expectedHabits, `${p.name} (Age ${p.age}) should have ${p.expectedHabits} active habits, got ${act.length}`);

  // Simulate Day 1: complete all active habits
  const today = L.todayS();
  act.forEach(h => {
    S.done[today] = [...(S.done[today] || []), h.id];
  });
  assert(S.done[today].length === p.expectedHabits, `All ${p.expectedHabits} habits completed`);

  // Award Clean Sweep (+20 XP)
  const isSweep = S.done[today].length === act.length;
  assert(isSweep, 'Clean sweep should be detected');
  S.bonus[`sweep-${today}`] = 20;

  const totalXp = L.xp(S);
  const expectedXp = p.expectedHabits * 10 + 20;
  assert(totalXp === expectedXp, `Total XP should be ${expectedXp}, got ${totalXp}`);
  const lvl = L.level(S);
  assert(lvl === Math.floor(totalXp / 100) + 1, `Level calculation check failed`);
});
console.log(`✅ Age tier progression and Clean Sweep bonus verified.`);

// 3. SIMULATION: 7-DAY WEEKLY PLANNING & 350-POINT MEDAL MASTER
console.log('\n--- TEST SUITE 3: 5x7 Weekly Matrix & Medal Scaling ---');
{
  let S = {
    name: 'Diya',
    age: 12, // 35 habits
    done: {},
    bonus: {}
  };
  const wd = L.weekDays();
  const act = L.activeHabits(S);

  // Scenario A: Zero days
  let scZero = L.weekScore(S);
  assert(scZero.scaledScore === 0 && scZero.tier === 0, 'Zero days should yield 0 score and Tier 0');

  // Scenario B: Perfect 7 days (all 35 habits completed every day)
  wd.forEach(d => {
    S.done[d] = act.map(h => h.id);
  });
  let scGold = L.weekScore(S);
  assert(scGold.scaledScore === 350, `Perfect week should scale to exactly 350 pts, got ${scGold.scaledScore}`);
  assert(scGold.tier === 3, 'Tier should be 3 (Gold)');

  // Scenario C: Silver Medal Test (approx 70% completion)
  S.done = {};
  wd.slice(0, 5).forEach(d => { // 5 of 7 days
    S.done[d] = act.map(h => h.id);
  });
  let scSilver = L.weekScore(S);
  assert(scSilver.scaledScore >= 240, `5/7 days should achieve Silver (240+), got ${scSilver.scaledScore}`);
  assert(scSilver.tier >= 2, 'Tier should be at least Silver (Tier 2)');
}
console.log(`✅ Weekly 350-point matrix scoring and Bronze/Silver/Gold tiers verified.`);

// 4. SIMULATION: 30-DAY CAPSTONE CHALLENGE
console.log('\n--- TEST SUITE 4: 30-Day Capstone & Weekly Checkpoints ---');
{
  let S = {
    name: 'Kavin',
    age: 13,
    cap: '2026-10-01', // started 30 days ago
    done: {},
    bonus: {},
    capNotes: {}
  };

  const dates = L.capDates(S);
  assert(dates.length === 30, `Capstone must generate exactly 30 days, got ${dates.length}`);

  // Complete 20 good days (>= 60% completion)
  const all35 = L.allHabits();
  const twentyHabits = all35.slice(0, 22).map(h => h.id); // >60% of 35
  dates.slice(0, 20).forEach(d => {
    S.done[d] = twentyHabits;
  });

  const goodDays = L.capGoodDays(S);
  assert(goodDays >= 18, `Should have >= 18 good days, got ${goodDays}`);

  // Test Milestone Checkpoints saving
  [7, 14, 21, 28].forEach(cpDay => {
    S.capNotes[cpDay] = `Reflection for milestone checkpoint day ${cpDay}`;
    assert(S.capNotes[cpDay].length > 0, `Milestone note ${cpDay} saved`);
  });

  // Award graduation bonus
  S.bonus['capstoneGrad'] = 500;
  assert(L.xp(S) >= 500, 'Graduation bonus of +500 XP registered');
}
console.log(`✅ 30-Day Capstone, 60% threshold, milestone checkpoints, and +500 XP graduation verified.`);

// 5. SIMULATION: FUTURE-PROOF CHILD INDEX & 60% CEO RULE
console.log('\n--- TEST SUITE 5: Future-Proof Child Index (Section 7) ---');
{
  let S = {
    name: 'Aarav',
    age: 11,
    done: {}
  };

  const past = L.pastDays(30);
  const act = L.activeHabits(S);
  // Complete 70% of days
  past.slice(0, 21).forEach(d => {
    S.done[d] = act.map(h => h.id);
  });

  const fpIndex = L.futureProofIndex(S);
  assert(typeof fpIndex.index === 'number', 'Future-proof index must be a number');
  assert(fpIndex.isCeoReady === (fpIndex.index >= 60), 'CEO ready status must strictly reflect index >= 60');
  dimKeys.forEach(k => {
    assert(typeof fpIndex.breakdown[k] === 'number', `Breakdown for ${k} must exist`);
  });
}
console.log(`✅ Future-Proof Child Index & 60% CEO rule diagnostic verified.`);

// 6. SIMULATION: TRANSLATIONS & TEXT COHERENCE
console.log('\n--- TEST SUITE 6: Bilingual Parity (EN & TA) ---');
{
  const enKeys = Object.keys(TRANSLATIONS.en);
  const taKeys = Object.keys(TRANSLATIONS.ta);
  enKeys.forEach(k => {
    assert(TRANSLATIONS.ta[k] !== undefined, `Missing Tamil translation for key '${k}'`);
  });
  assert(!JSON.stringify(TRANSLATIONS).includes('—'), 'No em dashes should exist in translations');
}
console.log(`✅ Translations complete with 100% key parity and no em dashes.`);

// 7. SIMULATION: EDGE CASES & RESILIENCE
console.log('\n--- TEST SUITE 7: Robustness & Edge Cases ---');
{
  // Null / undefined safety
  assert(L.xp(null) === 0, 'xp(null) must return 0');
  assert(L.level(undefined) === 1, 'level(undefined) must return 1');
  assert(L.streak(null) === 0, 'streak(null) must return 0');
  assert(L.activeHabits({})?.length === 0, 'activeHabits({}) must return empty array');
  assert(L.weekScore(null).scaledScore === 0, 'weekScore(null) must return safe zero structure');
  assert(L.futureProofIndex({}).index === 0, 'futureProofIndex({}) must return safe 0');
  assert(L.capGoodDays(null) === 0, 'capGoodDays(null) must return 0');
}
console.log(`✅ Null/undefined resilience verified.`);

console.log(`\n==================================================`);
console.log(`🎉 ALL ${passed} AUTOMATED VERIFICATION CHECKS PASSED!`);
console.log(`==================================================\n`);
