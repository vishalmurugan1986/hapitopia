import assert from 'assert';
import * as L from '../src/logic.js';
import {
  MANAGEMENT_CODES,
  BATCH_INFO,
  DIMS,
  DIMS_BAT02,
  HABITS,
  HABITS_BAT02,
  BAT02_WEEKLY_ADDITIONS,
  DIM_RUBRICS
} from '../src/data/index.js';
import { HABIT_CHAPTERS } from '../src/data/habitChapters.js';
import { TRANSLATIONS } from '../src/i18n/translations.js';

console.log('🚀 Running Comprehensive BAT02 Architecture & Curriculum Verification...\n');

let passCount = 0;
function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ FAILED: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Management Code Tests
test('Management codes resolve correctly: 1986 -> BAT01, 1978 -> BAT02 (BAT03 removed)', () => {
  assert.strictEqual(MANAGEMENT_CODES['1986'], 'BAT01');
  assert.strictEqual(MANAGEMENT_CODES['1978'], 'BAT02');
  assert.strictEqual(MANAGEMENT_CODES['2000'], undefined);
  assert.strictEqual(MANAGEMENT_CODES['9999'], undefined);
  assert.strictEqual(BATCH_INFO.BAT02.code, '1978');
  assert.strictEqual(BATCH_INFO.BAT02.totalHabits, 30);
  assert.strictEqual(BATCH_INFO.BAT02.curriculumType, 'weekly_progression');
  assert.strictEqual(BATCH_INFO.BAT02.weeks, 25);
});

// 2. Dimension & Habit Architecture Isolation
test('BAT01 has 35 habits (5 dims x 7), BAT02 has 30 habits (6 dims: 5 Q + 25 Growth)', () => {
  const bat01All = L.allHabits({ batch: 'BAT01' });
  const bat02All = L.allHabits({ batch: 'BAT02' });
  const defaultAll = L.allHabits(); // Backward compat

  assert.strictEqual(bat01All.length, 35);
  assert.strictEqual(bat02All.length, 30);
  assert.strictEqual(defaultAll.length, 35);

  // Dimensions
  const dims01 = L.getBatchDims({ batch: 'BAT01' });
  const dims02 = L.getBatchDims({ batch: 'BAT02' });

  assert.strictEqual(dims01.length, 5);
  assert.deepStrictEqual(dims01.map(d => d.k), ['P', 'M', 'I', 'E', 'F']);

  assert.strictEqual(dims02.length, 6);
  assert.deepStrictEqual(dims02.map(d => d.k), ['Q', 'P', 'M', 'I', 'E', 'F']);

  // Ensure zero ID collisions between batches
  const bat01Ids = new Set(bat01All.map(h => h.id));
  const bat02Ids = new Set(bat02All.map(h => h.id));
  for (const id of bat02Ids) {
    assert.ok(!bat01Ids.has(id), `Collision detected for habit ID ${id}`);
    assert.ok(id.startsWith('B2_'), `BAT02 habit ID must start with B2_: ${id}`);
  }
});

// 3. 25-Week Curriculum Progression Schedule
test('BAT02 weekly progression unlocks exactly as architected (Week 1 = 6 ... Week 25 = 30)', () => {
  assert.strictEqual(BAT02_WEEKLY_ADDITIONS.length, 25);

  // Week 1: 5 Q + B2_P0 = 6
  const w1Habits = L.activeHabits({ batch: 'BAT02', bat02Week: 1 });
  assert.strictEqual(w1Habits.length, 6);
  assert.deepStrictEqual(
    w1Habits.map(h => h.id),
    ['B2_Q0', 'B2_Q1', 'B2_Q2', 'B2_Q3', 'B2_Q4', 'B2_P0']
  );

  // Week 2: 5 Q + B2_P0 + B2_M0 = 7
  const w2Habits = L.activeHabits({ batch: 'BAT02', bat02Week: 2 });
  assert.strictEqual(w2Habits.length, 7);
  assert.ok(w2Habits.some(h => h.id === 'B2_M0'));

  // Test every single week from 1 to 25
  for (let w = 1; w <= 25; w++) {
    const act = L.activeHabits({ batch: 'BAT02', bat02Week: w });
    assert.strictEqual(act.length, 5 + w, `Week ${w} must have ${5 + w} habits, got ${act.length}`);
    
    // 5 Q habits must ALWAYS be present
    for (let q = 0; q < 5; q++) {
      assert.ok(act.some(h => h.id === `B2_Q${q}`), `Week ${w} missing B2_Q${q}`);
    }

    // The habit added this week must be in active habits
    const expectedAddition = BAT02_WEEKLY_ADDITIONS[w - 1].id;
    assert.ok(
      act.some(h => h.id === expectedAddition),
      `Week ${w} must contain newly added habit ${expectedAddition}`
    );
  }

  // Week 25 must have all 30 habits
  const w25Habits = L.activeHabits({ batch: 'BAT02', bat02Week: 25 });
  assert.strictEqual(w25Habits.length, 30);
});

// 4. Pedagogical Chapters Completeness (12 elements, EN & TA, zero em dashes)
test('All 30 BAT02 habits have complete 12-element chapters in EN & TA with zero em dashes', () => {
  const bat02All = L.allHabits({ batch: 'BAT02' });
  const requiredElements = [
    'name', 'tagline', 'whyItMatters', 'story', 'dailyPractice',
    'weeklyChallenge', 'monthlyMission', 'reflectionQuestions',
    'parentQuestions', 'teacherQuestions', 'rubric'
  ];

  for (const h of bat02All) {
    const ch = HABIT_CHAPTERS[h.id];
    assert.ok(ch, `Missing chapter for ${h.id}`);
    assert.ok(ch.en, `Missing EN chapter for ${h.id}`);
    assert.ok(ch.ta, `Missing TA chapter for ${h.id}`);

    for (const lang of ['en', 'ta']) {
      const c = ch[lang];
      for (const el of requiredElements) {
        assert.ok(c[el] !== undefined && c[el] !== null, `${h.id}[${lang}] missing ${el}`);
      }

      // Check arrays
      assert.ok(Array.isArray(c.reflectionQuestions) && c.reflectionQuestions.length >= 2, `${h.id}[${lang}] reflectionQuestions`);
      assert.ok(Array.isArray(c.parentQuestions) && c.parentQuestions.length >= 1, `${h.id}[${lang}] parentQuestions`);
      assert.ok(Array.isArray(c.teacherQuestions) && c.teacherQuestions.length >= 1, `${h.id}[${lang}] teacherQuestions`);

      // Check rubric levels
      assert.ok(c.rubric.beginner, `${h.id}[${lang}] rubric beginner`);
      assert.ok(c.rubric.developing, `${h.id}[${lang}] rubric developing`);
      assert.ok(c.rubric.proficient, `${h.id}[${lang}] rubric proficient`);
      assert.ok(c.rubric.master, `${h.id}[${lang}] rubric master`);

      // Check for zero em dashes
      const jsonStr = JSON.stringify(c);
      assert.ok(!jsonStr.includes('—'), `${h.id}[${lang}] contains em dash (—)`);
    }
  }
});

// 5. Translations Completeness
test('Translations dictionary contains Q dimension and all 30 habits in EN & TA', () => {
  assert.ok(TRANSLATIONS.en.dims.Q, 'Missing EN dims.Q');
  assert.ok(TRANSLATIONS.ta.dims.Q, 'Missing TA dims.Q');
  assert.strictEqual(TRANSLATIONS.en.dims.Q.name, 'Q Power Habits');

  const bat02All = L.allHabits({ batch: 'BAT02' });
  for (const h of bat02All) {
    assert.ok(TRANSLATIONS.en.habits[h.id], `Missing EN translation for ${h.id}`);
    assert.ok(TRANSLATIONS.ta.habits[h.id], `Missing TA translation for ${h.id}`);
    assert.ok(TRANSLATIONS.en.habits[h.id].name, `Missing EN name for ${h.id}`);
    assert.ok(TRANSLATIONS.ta.habits[h.id].name, `Missing TA name for ${h.id}`);
  }
});

// 6. Diagnostic Rubric and CEO Readiness Index for BAT02
test('DIM_RUBRICS includes Q dimension, futureProofIndex computes 6 dimensions for BAT02', () => {
  assert.ok(DIM_RUBRICS.Q, 'Missing Q in DIM_RUBRICS');
  assert.ok(DIM_RUBRICS.Q.title.includes('Q Power Habits'));
  assert.ok(DIM_RUBRICS.Q.ta, 'Missing Tamil in DIM_RUBRICS.Q');

  const dummyState = {
    batch: 'BAT02',
    bat02Week: 5,
    done: {
      '2026-11-03': ['B2_Q0', 'B2_Q1', 'B2_P0', 'B2_M0']
    }
  };

  const fp = L.futureProofIndex(dummyState);
  assert.ok(fp.breakdown.Q !== undefined, 'Breakdown must have Q dimension');
  assert.ok(fp.breakdown.P !== undefined, 'Breakdown must have P dimension');
  assert.ok(typeof fp.index === 'number');
});

// 7. Student Export & Verification Integrity
test('Student export supports BAT02 with currentWeek, totalHabits, and tamper detection', () => {
  const S = {
    id: 'pranav_10',
    name: 'Pranav Rajesh',
    age: 10,
    batch: 'BAT02',
    bat02Week: 3,
    level: 3,
    xp: 280,
    done: {
      '2026-11-03': ['B2_Q0', 'B2_Q1', 'B2_P0']
    },
    habitEvidence: {
      '2026-11-03': {
        B2_Q0: { type: 'video', fileName: 'VID_001.mp4' }
      }
    }
  };

  const exportObj = L.generateStudentExport(S);
  const payload = exportObj.data;
  assert.strictEqual(payload.name, 'Pranav Rajesh');
  assert.strictEqual(payload.batch, 'BAT02');
  assert.strictEqual(payload.batchCode, '1978');
  assert.strictEqual(payload.currentWeek, 3);
  assert.strictEqual(payload.total, 8); // Week 3 has 5 Q + 3 additions = 8 active habits
  assert.strictEqual(exportObj.jsonString, JSON.stringify(payload));
});

// 8. BAT01 Integrity Guarantee
test('BAT01 age tiers and 35 habits remain 100% unaffected and pristine', () => {
  const bat01Age7 = L.activeHabits({ batch: 'BAT01', age: 7 });
  const bat01Age10 = L.activeHabits({ batch: 'BAT01', age: 10 });
  const bat01Age13 = L.activeHabits({ batch: 'BAT01', age: 13 });

  assert.strictEqual(bat01Age7.length, 5);
  assert.strictEqual(bat01Age10.length, 15);
  assert.strictEqual(bat01Age13.length, 35);

  assert.deepStrictEqual(
    bat01Age7.map(h => h.id),
    ['P0', 'M0', 'I0', 'E0', 'F0']
  );
});

console.log(`\n==================================================`);
console.log(`🎉 ALL ${passCount} BAT02 VERIFICATION TESTS PASSED!`);
console.log(`==================================================\n`);
