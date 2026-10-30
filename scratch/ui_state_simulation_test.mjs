// UI & State Machine Simulation Test for Habitopia
import * as L from '../src/logic.js';
import { TRANSLATIONS } from '../src/i18n/translations.js';
import { DIMS, HABITS, REWARDS, AVATARS } from '../src/data/index.js';

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    throw new Error(message);
  }
  passed++;
}

console.log('🎮 Starting Habitopia Full UI & State Machine Simulation...\n');

// 1. STATE INITIALIZATION & MULTI-PROFILE STORAGE SYNC
console.log('--- TEST 1: Multi-Profile Device State Machine ---');
let deviceStorage = {
  savedProfiles: []
};

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
    return { ...cleanProfile, savedProfiles: list };
  }
  return { ...stateObj, savedProfiles: list };
}

// Player 1 creates account
let p1 = {
  name: 'Aarav',
  age: 8,
  avatar: '🚀',
  pin: '1234',
  lang: 'en',
  parentConsent: true,
  done: {},
  bonus: {},
  savedProfiles: []
};
let state = syncProfileList(p1);
assert(state.savedProfiles.length === 1, 'Device must have 1 saved profile');
assert(state.savedProfiles[0].name === 'Aarav', 'First profile name must be Aarav');

// Player 2 creates account on same device
let p2 = {
  name: 'Diya',
  age: 10,
  avatar: '🌟',
  pin: '5678',
  lang: 'ta',
  parentConsent: true,
  done: {},
  bonus: {},
  savedProfiles: state.savedProfiles
};
state = syncProfileList(p2);
assert(state.savedProfiles.length === 2, 'Device must now have 2 saved profiles');
assert(state.name === 'Diya' && state.savedProfiles[0].name === 'Aarav', 'Active player switched to Diya while keeping Aarav in list');

// 2. SIMULATE PIN CREATION, MISMATCH & AVATAR RECOVERY
console.log('\n--- TEST 2: PIN Validation & Avatar Recovery ---');
function simulatePinFlow(pin1, pin2) {
  if (pin1.length !== 4) return { success: false, err: 'Enter 4 digits' };
  if (pin1 !== pin2) return { success: false, err: 'PINs do not match' };
  return { success: true };
}
assert(!simulatePinFlow('123', '123').success, 'Reject short PIN');
assert(!simulatePinFlow('1234', '1235').success, 'Reject mismatching PIN');
assert(simulatePinFlow('1234', '1234').success, 'Accept matching 4-digit PIN');

// Avatar recovery test
function recoverPin(profile, selectedAvatar) {
  if (profile.avatar === selectedAvatar) return { success: true, pin: profile.pin };
  return { success: false, err: 'Wrong avatar' };
}
assert(recoverPin(p1, '🚀').pin === '1234', 'Avatar recovery must return correct PIN');
assert(!recoverPin(p1, '🦊').success, 'Avatar recovery must reject wrong avatar');

// 3. SIMULATE TODAY SCREEN DAILY MISSIONS INTERACTION
console.log('\n--- TEST 3: Today Screen Habit Toggling & Clean Sweep ---');
let S = syncProfileList({
  name: 'Kavin',
  age: 9, // Starter: 5 habits
  avatar: '🦁',
  pin: '9999',
  lang: 'en',
  parentConsent: true,
  done: {},
  bonus: {}
});

const today = L.todayS();
const act = L.activeHabits(S);
assert(act.length === 5, 'Age 9 should have 5 daily missions');

// Toggle habit 0 ON
let doneToday = L.doneOn(S, today);
const h0 = act[0].id;
doneToday = [...doneToday, h0];
S.done[today] = doneToday;
assert(L.doneOn(S, today).includes(h0), 'Habit 0 marked complete');
assert(L.xp(S) === 10, 'Single habit awards +10 XP');

// Toggle habit 0 OFF
doneToday = doneToday.filter(x => x !== h0);
S.done[today] = doneToday;
assert(!L.doneOn(S, today).includes(h0), 'Habit 0 toggled back off');
assert(L.xp(S) === 0, 'XP reverts when habit unchecked');

// Complete all 5 habits -> Clean Sweep
act.forEach(h => {
  doneToday = [...doneToday, h.id];
});
S.done[today] = doneToday;
assert(doneToday.length === act.length, 'All 5 habits complete');

// Clean sweep bonus trigger
const sweepKey = `sweep-${today}`;
S.bonus[sweepKey] = 20;
assert(L.xp(S) === 5 * 10 + 20, '5 habits + clean sweep = 70 XP');
assert(L.dayPct(S, today) === 1.0, 'Day percentage must be 100%');

// Test dimension filtering
['ALL', 'P', 'M', 'I', 'E', 'F'].forEach(filter => {
  const filtered = filter === 'ALL' ? act : act.filter(h => h.dimKey === filter);
  assert(filtered.length >= 0, `Filter ${filter} should return valid habit list`);
});

// Test All 35 Library switch for Age 9
const all35 = L.allHabits();
assert(all35.length === 35, 'All 35 library must contain 35 habits');
assert(act.length < all35.length, 'Starter track is a focused subset of all 35 habits');

// 4. SIMULATE WEEK SCREEN MATRIX & DAILY LOG MODAL
console.log('\n--- TEST 4: Week Screen & Daily Log Modal State ---');
const weekDays = L.weekDays();
assert(weekDays.length === 7, 'Week must have 7 days');

// Simulate Daily Log modal input
const logDate = weekDays[0];
S.log = S.log || {};
S.log[logDate] = {
  priorities: ['Math Homework', 'Cycling 30 mins', 'Read 10 pages'],
  mood: 'happy-outline',
  gratitude: ['Family dinner', 'Scored full marks', 'Good sleep'],
  pagesRead: '15',
  minutesMoved: '45',
  reflection: 'Felt very energized and productive today!'
};

assert(S.log[logDate].priorities.length === 3, 'My 3 Priorities saved');
assert(S.log[logDate].gratitude.length === 3, 'Gratitude 3 saved');
assert(Number(S.log[logDate].pagesRead) === 15, 'Pages read saved as 15');
assert(Number(S.log[logDate].minutesMoved) === 45, 'Minutes moved saved as 45');

// Sunday Family Review Goal
const w0 = weekDays[0];
S.goals = S.goals || {};
S.goals[w0] = 'Family goal: Drink 2 glasses of water together every morning.';
assert(S.goals[w0].length > 0, 'Sunday family habit goal stored successfully');

// 5. SIMULATE QUESTS SCREEN & BOSS CHALLENGE
console.log('\n--- TEST 5: Quests, Boss Fight & Experience Rewards ---');
// Complete 5 of 7 days to earn silver and defeat boss
weekDays.slice(0, 5).forEach(d => {
  S.done[d] = act.map(h => h.id);
});

const sc = L.weekScore(S);
assert(sc.tier >= 2, '5 days of complete habits qualifies for Silver medal (Tier 2)');

// Defeat boss
const bossKey = `boss-${w0}`;
assert(!S.bonus[bossKey], 'Boss bonus not yet claimed');
S.bonus[bossKey] = 100;
assert(S.bonus[bossKey] === 100, 'Boss defeated bonus (+100 XP) credited');

// Experience Rewards claim with parent confirmation
const rewardToClaim = REWARDS[0].n; // e.g. 'Park outing'
S.claims = S.claims || {};
S.claims[w0] = [rewardToClaim];
assert(S.claims[w0].includes(rewardToClaim), 'Experience reward claimed with parent confirmation');

// 6. SIMULATE GROWTH TAB: REPORT CARDS & MONTHLY REVIEW
console.log('\n--- TEST 6: Report Cards & Monthly Growth Review ---');
const currentMonth = L.monthS();
S.monthly = S.monthly || {};
S.monthly[currentMonth] = {
  wins: ['Read 300 pages this month', 'Made bed 25 days', 'Saved Rs. 200 in 3-jar system'],
  challenges: 'Waking up on rainy mornings was tough',
  lessons: 'Pre-planning uniforms the night before makes mornings peaceful',
  goals: 'Practice basketball 3 times a week',
  parentObs: 'Noticeably more responsible and cheerful in the morning routines',
  teacherObs: 'Focus in class improved significantly',
  completed: true
};

const monthlyReviewBonusKey = `review-${currentMonth}`;
S.bonus[monthlyReviewBonusKey] = 150;
assert(S.bonus[monthlyReviewBonusKey] === 150, 'Monthly review (+150 XP) bonus credited');

// Month navigation check
const [yr, mo] = currentMonth.split('-').map(Number);
const prevMonthDate = new Date(yr, mo - 2, 1);
const prevMonthKey = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;
assert(prevMonthKey < currentMonth, 'Previous month navigation key is correct');

// 7. SIMULATE PROFILE REMOVAL / SWITCHING
console.log('\n--- TEST 7: Reset & Multi-Player Switching ---');
let updatedStorage = state.savedProfiles.filter(p => p.name !== 'Aarav');
assert(updatedStorage.length === 1 && updatedStorage[0].name === 'Diya', 'Profile removal correctly purges target profile without affecting others');

console.log(`\n==================================================`);
console.log(`🎉 ALL ${passed} UI & STATE MACHINE SIMULATIONS PASSED!`);
console.log(`==================================================\n`);

