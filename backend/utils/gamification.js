// backend/utils/gamification.js

// ✅ Returns today's date string in IST: "YYYY-MM-DD"
function todayStringIST() {
  // Using Intl keeps it dependency-free and consistent on Render
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;

  return `${y}-${m}-${d}`; // en-CA gives correct order anyway
}

// parse "YYYY-MM-DD" as UTC midnight date to compute day diff safely
function parseDateOnly(dateStr) {
  // dateStr: 2026-03-03
  const [y, m, d] = String(dateStr).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function isYesterday(lastDateStr, todayDateStr) {
  if (!lastDateStr || !todayDateStr) return false;
  const last = parseDateOnly(lastDateStr);
  const today = parseDateOnly(todayDateStr);
  const diffDays = (today - last) / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

function calcLevel(xp) {
  // Simple + demo-friendly: every 100 XP = +1 level
  const safeXP = Number(xp) || 0;
  return Math.floor(safeXP / 100) + 1;
}

function awardBadges(user) {
  const set = new Set(user.badges || []);

  const s = user.streak?.current || 0;
  const xp = user.xp || 0;

  if (s >= 3) set.add("3_day_streak");
  if (s >= 7) set.add("7_day_streak");
  if (s >= 14) set.add("14_day_streak");
  if (s >= 30) set.add("30_day_streak");

  if (xp >= 500) set.add("xp_500");
  if (xp >= 1000) set.add("xp_1000");

  user.badges = Array.from(set);
}

module.exports = {
  todayStringIST,
  isYesterday,
  calcLevel,
  awardBadges,
};