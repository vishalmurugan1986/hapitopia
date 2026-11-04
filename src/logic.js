import { DIMS, HABITS, BATCH_CODES, BATCH_INFO, DIMS_BAT02, HABITS_BAT02, BAT02_WEEKLY_ADDITIONS } from './data.js';

export { BATCH_CODES, BATCH_INFO, DIMS_BAT02, HABITS_BAT02, BAT02_WEEKLY_ADDITIONS };

export const resolveBatchFromCode = (code) => {
  const clean = String(code || '').trim();
  return BATCH_CODES[clean] || null;
};

export const getBatchCode = (batchId) => {
  const info = BATCH_INFO[batchId || 'BAT01'];
  return info ? info.code : '1986';
};

export const getBatch = (S) => (S && S.batch) || 'BAT01';

export const getBatchDims = (S) => {
  const b = getBatch(S);
  if (b === 'BAT02') return DIMS_BAT02;
  return DIMS;
};

// Curriculum week for BAT02 (1 to 25)
export const getBat02Week = (S) => {
  if (!S) return 1;
  const explicitWeek = typeof S.bat02Week === 'number' ? S.bat02Week : (typeof S.batWeek === 'number' ? S.batWeek : null);
  if (typeof explicitWeek === 'number' && explicitWeek >= 1 && explicitWeek <= 25) {
    return explicitWeek;
  }
  const start = S.startDate || (S.id && S.id.split('_')[2]) || null;
  if (start) {
    const startMs = typeof start === 'number' ? start : (isNaN(Number(start)) ? new Date(start).getTime() : Number(start));
    if (!isNaN(startMs)) {
      const weeksElapsed = Math.floor((Date.now() - startMs) / (7 * 864e5)) + 1;
      return Math.min(25, Math.max(1, weeksElapsed));
    }
  }
  return 1;
};

const p2 = (n) => String(n).padStart(2, '0');
export const ds = (d) => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
export const todayS = () => ds(new Date());

export const monthS = (d = new Date()) => `${d.getFullYear()}-${p2(d.getMonth() + 1)}`;

export function weekDays() {
  const d = new Date(), o = (d.getDay() + 6) % 7;
  return [...Array(7)].map((_, i) => ds(new Date(d.getFullYear(), d.getMonth(), d.getDate() - o + i)));
}

// Past N calendar days up to today
export function pastDays(n = 30) {
  const list = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    list.push(ds(d));
  }
  return list;
}

// Guide tiers: 7–9 = 1 habit/dimension, 10–11 = 3, 12–14 = all 7
export const perDim = (age) => (age <= 9 ? 1 : age <= 11 ? 3 : 7);

const dayDiff = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 864e5);
const getCapStart = (S) => (typeof S?.cap === 'string' ? S.cap : S?.cap?.start || null);
export const capDay = (S) => {
  const start = getCapStart(S);
  return start ? dayDiff(start, todayS()) + 1 : 0; // 1..30 while running
};
export const capRunning = (S) => capDay(S) >= 1 && capDay(S) <= 30;

export const capDates = (S) => {
  const start = getCapStart(S);
  if (!start) return [];
  return [...Array(30)].map((_, i) => {
    const d = new Date(start + 'T00:00:00');
    d.setDate(d.getDate() + i);
    return ds(d);
  });
};

export const allHabits = (S) => {
  const b = getBatch(S);
  if (b === 'BAT02') {
    return DIMS_BAT02.flatMap((d) =>
      HABITS_BAT02[d.k].map((h, i) => ({
        id: `B2_${d.k}${i}`,
        rawId: `${d.k}${i}`,
        batch: 'BAT02',
        dimKey: d.k,
        d,
        n: h[0],
        s: h[1]
      }))
    );
  }
  if (b === 'BAT03') return [];
  return DIMS.flatMap((d) =>
    HABITS[d.k].map((h, i) => ({
      id: d.k + i,
      rawId: `${d.k}${i}`,
      batch: 'BAT01',
      dimKey: d.k,
      d,
      n: h[0],
      s: h[1]
    }))
  );
};

export const activeHabits = (S) => {
  if (!S || (!S.age && !S.batch)) return [];
  const b = getBatch(S);

  if (b === 'BAT02') {
    if (capRunning(S)) {
      return allHabits(S);
    }
    const currentWeek = getBat02Week(S);
    // Base: Always includes all 5 Q Power Habits (Activation Workshop)
    const qHabits = HABITS_BAT02.Q.map((h, i) => {
      const d = DIMS_BAT02.find((dim) => dim.k === 'Q');
      return {
        id: `B2_Q${i}`,
        rawId: `Q${i}`,
        batch: 'BAT02',
        dimKey: 'Q',
        d,
        n: h[0],
        s: h[1]
      };
    });

    // Add dimension habits unlocked up to currentWeek
    const unlockedAdditions = BAT02_WEEKLY_ADDITIONS.filter((w) => w.week <= currentWeek);
    const dimHabits = unlockedAdditions.map((item) => {
      const d = DIMS_BAT02.find((dim) => dim.k === item.dimKey);
      const h = HABITS_BAT02[item.dimKey][item.habitIndex];
      return {
        id: item.id,
        rawId: `${item.dimKey}${item.habitIndex}`,
        batch: 'BAT02',
        dimKey: item.dimKey,
        d,
        n: h[0],
        s: h[1]
      };
    });

    return [...qHabits, ...dimHabits];
  }

  if (b === 'BAT03') return [];

  // BAT01:
  const count = capRunning(S) ? 7 : perDim(S.age || 7);
  return DIMS.flatMap((d) =>
    HABITS[d.k].slice(0, count).map((h, i) => ({
      id: d.k + i,
      rawId: `${d.k}${i}`,
      batch: 'BAT01',
      dimKey: d.k,
      d,
      n: h[0],
      s: h[1]
    }))
  );
};

export const doneOn = (S, d) => (S && S.done && S.done[d]) || [];

export const xp = (S) => {
  if (!S) return 0;
  const habitXp = Object.values(S.done || {}).reduce((a, b) => a + (Array.isArray(b) ? b.length : 0), 0) * 10;
  const bonusXp = Object.values(S.bonus || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  return habitXp + bonusXp;
};

export const level = (S) => Math.floor(xp(S) / 100) + 1;

export function dayPct(S, d) {
  const a = activeHabits(S);
  if (!a.length) return 0;
  const doneCount = a.filter((h) => doneOn(S, d).includes(h.id)).length;
  return doneCount / a.length;
}

export function streak(S) {
  if (!S) return 0;
  let n = 0;
  const d = new Date();
  if (dayPct(S, ds(d)) < 0.6) d.setDate(d.getDate() - 1);
  while (dayPct(S, ds(d)) >= 0.6) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function weekScore(S) {
  const w = weekDays(), a = activeHabits(S);
  if (!a.length) return { s: 0, max: 350, per: [], tier: 0, scaledScore: 0 };

  const per = a.map((h) => Math.round((10 * w.filter((d) => doneOn(S, d).includes(h.id)).length) / 7));
  const s = per.reduce((x, y) => x + y, 0);
  const max = a.length * 10;
  const sc = Math.round((s / (max || 1)) * 350); // Gold 300+, Silver 240+, Bronze 180+
  return {
    s,
    max,
    per,
    scaledScore: sc,
    tier: sc >= 300 ? 3 : sc >= 240 ? 2 : sc >= 180 ? 1 : 0
  };
}

export const capGoodDays = (S) => {
  if (!S || !S.cap) return 0;
  const today = todayS();
  return capDates(S).filter((d) => d <= today && dayPct(S, d) >= 0.6).length;
};

// Section 7: Dimension Performance Analytics
export function dimensionStats(S, dimKey, daysCount = 30) {
  const days = pastDays(daysCount);
  const activeForDim = activeHabits(S).filter((h) => h.dimKey === dimKey);
  if (!activeForDim.length) return { rate: 0, completed: 0, totalPossible: 0, levelKey: 'beginner' };

  let completed = 0;
  days.forEach((d) => {
    const doneList = doneOn(S, d);
    activeForDim.forEach((h) => {
      if (doneList.includes(h.id)) completed++;
    });
  });

  const totalPossible = activeForDim.length * daysCount;
  const rate = Math.round((completed / (totalPossible || 1)) * 100);

  let levelKey = 'beginner';
  if (rate >= 86) levelKey = 'master';
  else if (rate >= 66) levelKey = 'proficient';
  else if (rate >= 41) levelKey = 'developing';

  return { rate, completed, totalPossible, levelKey };
}

// Overall Future-Proof Child Index (30-day average)
export function futureProofIndex(S) {
  const b = getBatch(S);
  const dims = b === 'BAT02' ? ['Q', 'P', 'M', 'I', 'E', 'F'] : ['P', 'M', 'I', 'E', 'F'];
  const stats = dims.map((k) => dimensionStats(S, k, 30));
  const breakdown = {};
  dims.forEach((k, idx) => {
    breakdown[k] = stats[idx].rate;
  });
  const avgRate = Math.round(stats.reduce((a, b) => a + b.rate, 0) / dims.length);
  return {
    index: avgRate,
    isCeoReady: avgRate >= 60,
    stats,
    breakdown
  };
}
// Section 8: Anti-Cheat, Media Evidence & Integrity Audit Engine
export function getEvidenceForDate(S, dateStr = todayS()) {
  return (S && S.habitEvidence && S.habitEvidence[dateStr]) || {};
}

export function getHabitEvidence(S, habitId, dateStr = todayS()) {
  const map = getEvidenceForDate(S, dateStr);
  return map[habitId] || null;
}

export function getAuditSummary(S, dateStr = todayS()) {
  const doneList = doneOn(S, dateStr);
  const timestamps = (S && S.habitTimestamps && S.habitTimestamps[dateStr]) || {};
  const evidenceMap = getEvidenceForDate(S, dateStr);
  const activeCount = activeHabits(S).length || 5;

  if (!doneList.length) {
    return {
      status: 'incomplete',
      label: 'Incomplete',
      labelTa: 'தொடங்கவில்லை',
      reason: 'No habits marked today',
      rapidCount: 0,
      durationSec: 0,
      evidenceCount: 0,
      missingEvidenceCount: 0,
      timestampsList: []
    };
  }

  // Build sorted list of recorded timestamps and submitted evidence
  const recorded = doneList.map((id) => ({
    id,
    time: timestamps[id] ? new Date(timestamps[id]).getTime() : null,
    iso: timestamps[id] || null,
    evidence: evidenceMap[id] || null
  })).sort((a, b) => (a.time || 0) - (b.time || 0));

  const evidenceCount = recorded.filter((r) => r.evidence && r.evidence.type).length;
  const missingEvidenceCount = Math.max(0, doneList.length - evidenceCount);

  const validTimes = recorded.filter((r) => r.time !== null);
  let isRapid = false;
  let rapidCount = 0;
  let durationSec = 0;

  if (validTimes.length >= 3) {
    const firstTime = validTimes[0].time;
    const lastTime = validTimes[validTimes.length - 1].time;
    durationSec = Math.max(1, Math.round((lastTime - firstTime) / 1000));

    // If 3 or more habits were marked within 15 seconds of each other
    for (let i = 1; i < validTimes.length; i++) {
      if (validTimes[i].time - validTimes[i - 1].time < 15000) {
        rapidCount++;
      }
    }
    if (rapidCount >= 2 && durationSec <= 35) {
      isRapid = true;
    }
  }

  // Check stored audit flag if present
  const storedFlag = S && S.auditFlags && S.auditFlags[dateStr];
  if (storedFlag && storedFlag.rapidTap) {
    isRapid = true;
  }

  if (isRapid) {
    return {
      status: 'review_needed',
      label: 'Review Needed: Rapid Tap',
      labelTa: 'மறுஆய்வு தேவை: விரைவு தட்டல்',
      reason: 'Marked ' + validTimes.length + ' habits in only ' + durationSec + ' seconds',
      rapidCount: rapidCount + 1,
      durationSec,
      evidenceCount,
      missingEvidenceCount,
      timestampsList: recorded
    };
  }

  if (missingEvidenceCount > 0) {
    return {
      status: 'review_needed',
      label: 'Review Needed: Missing Evidence',
      labelTa: 'மறுஆய்வு தேவை: சான்று இல்லை',
      reason: missingEvidenceCount + ' of ' + doneList.length + ' completed habits missing media evidence',
      rapidCount: 0,
      durationSec,
      evidenceCount,
      missingEvidenceCount,
      timestampsList: recorded
    };
  }

  if (doneList.length < activeCount) {
    return {
      status: 'in_progress',
      label: 'In Progress (' + evidenceCount + '/' + doneList.length + ' Evidence)',
      labelTa: 'முன்னேற்றத்தில் (' + evidenceCount + '/' + doneList.length + ' சான்று)',
      reason: doneList.length + ' of ' + activeCount + ' habits completed with media evidence',
      rapidCount: 0,
      durationSec,
      evidenceCount,
      missingEvidenceCount: 0,
      timestampsList: recorded
    };
  }

  return {
    status: 'verified',
    label: 'Verified with Evidence',
    labelTa: 'சான்றுடன் சரிபார்க்கப்பட்டது',
    reason: 'All ' + doneList.length + ' habits completed with media evidence (' + evidenceCount + '/' + doneList.length + ')',
    rapidCount: 0,
    durationSec,
    evidenceCount,
    missingEvidenceCount: 0,
    timestampsList: recorded
  };
}

// Generate compact export code for School Management Portal
export function generateStudentExport(S) {
  const today = todayS();
  const doneToday = doneOn(S, today);
  const audit = getAuditSummary(S, today);
  const active = activeHabits(S);
  const fp = futureProofIndex(S);
  const evidenceToday = getEvidenceForDate(S, today);

  const payload = {
    rollNo: S?.rollNo || S?.id || ('ACH-2026-' + String(Math.abs((S?.name || 'std').charCodeAt(0) * 11) % 900 + 100)),
    name: S?.name || 'Student',
    age: S?.age || 10,
    batch: S?.batch || 'BAT01',
    batchCode: S?.batchCode || getBatchCode(S?.batch || 'BAT01'),
    currentWeek: (S?.batch === 'BAT02') ? getBat02Week(S) : null,
    grade: S?.grade || ('Grade ' + Math.min(8, Math.max(4, (S?.age || 10) - 5)) + 'A'),
    date: today,
    completed: doneToday.length,
    total: active.length || 5,
    evidenceCount: audit.evidenceCount || 0,
    status: audit.status,
    reason: audit.reason,
    durationSec: audit.durationSec,
    streak: streak(S),
    level: level(S),
    xp: xp(S),
    fpIndex: fp.index,
    timestamps: (S && S.habitTimestamps && S.habitTimestamps[today]) || {},
    evidence: evidenceToday,
    habits: doneToday
  };

  return {
    data: payload,
    jsonString: JSON.stringify(payload)
  };
}
