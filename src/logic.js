import { DIMS, HABITS } from './data.js';

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

export const allHabits = () =>
  DIMS.flatMap((d) =>
    HABITS[d.k].map((h, i) => ({
      id: d.k + i,
      dimKey: d.k,
      d,
      n: h[0],
      s: h[1]
    }))
  );

export const activeHabits = (S) => {
  if (!S || !S.age) return [];
  const count = capRunning(S) ? 7 : perDim(S.age);
  return DIMS.flatMap((d) =>
    HABITS[d.k].slice(0, count).map((h, i) => ({
      id: d.k + i,
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
  const dims = ['P', 'M', 'I', 'E', 'F'];
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
// Section 8: Anti-Cheat & Integrity Audit Engine
export function getAuditSummary(S, dateStr = todayS()) {
  const doneList = doneOn(S, dateStr);
  const timestamps = (S && S.habitTimestamps && S.habitTimestamps[dateStr]) || {};
  const activeCount = activeHabits(S).length || 5;

  if (!doneList.length) {
    return {
      status: 'incomplete',
      label: 'Incomplete',
      labelTa: 'தொடங்கவில்லை',
      reason: 'No habits marked today',
      rapidCount: 0,
      durationSec: 0,
      timestampsList: []
    };
  }

  // Build sorted list of recorded timestamps
  const recorded = doneList.map((id) => ({
    id,
    time: timestamps[id] ? new Date(timestamps[id]).getTime() : null,
    iso: timestamps[id] || null
  })).sort((a, b) => (a.time || 0) - (b.time || 0));

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
      timestampsList: recorded
    };
  }

  if (doneList.length < activeCount) {
    return {
      status: 'in_progress',
      label: 'In Progress',
      labelTa: 'முன்னேற்றத்தில்',
      reason: doneList.length + ' of ' + activeCount + ' habits completed',
      rapidCount: 0,
      durationSec,
      timestampsList: recorded
    };
  }

  return {
    status: 'verified',
    label: 'Verified Honest',
    labelTa: 'உண்மையான பதிவு (சரிபார்க்கப்பட்டது)',
    reason: 'Naturally paced throughout the day',
    rapidCount: 0,
    durationSec,
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

  const payload = {
    rollNo: S?.rollNo || S?.id || ('ACH-2026-' + String(Math.abs((S?.name || 'std').charCodeAt(0) * 11) % 900 + 100)),
    name: S?.name || 'Student',
    age: S?.age || 10,
    grade: S?.grade || ('Grade ' + Math.min(8, Math.max(4, (S?.age || 10) - 5)) + 'A'),
    date: today,
    completed: doneToday.length,
    total: active.length || 5,
    status: audit.status,
    reason: audit.reason,
    durationSec: audit.durationSec,
    streak: streak(S),
    level: level(S),
    xp: xp(S),
    fpIndex: fp.index,
    timestamps: (S && S.habitTimestamps && S.habitTimestamps[today]) || {},
    habits: doneToday
  };

  return {
    data: payload,
    jsonString: JSON.stringify(payload)
  };
}
