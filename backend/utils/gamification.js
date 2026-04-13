// backend/utils/gamification.js

// ✅ Returns today's date string in IST: "YYYY-MM-DD"
function todayStringIST() {
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());

    const y = parts.find((p) => p.type === "year")?.value;
    const m = parts.find((p) => p.type === "month")?.value;
    const d = parts.find((p) => p.type === "day")?.value;

    return `${y}-${m}-${d}`;
  } catch (err) {
    console.error("todayStringIST error:", err);

    // 🔥 fallback (VERY IMPORTANT)
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, "0");
    const d = String(now.getUTCDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  }
}

// parse "YYYY-MM-DD" as UTC midnight date to compute day diff safely
function parseDateOnly(dateStr) {

  if (!dateStr || typeof dateStr !== "string") return null;

  const parts = String(dateStr).split("-").map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) return null;

  const [y, m, d] = parts;

  return new Date(Date.UTC(y, m - 1, d));
}

function isYesterday(lastDateStr, todayDateStr) {

  if (!lastDateStr || !todayDateStr) return false;

  const last = parseDateOnly(lastDateStr);
  const today = parseDateOnly(todayDateStr);

  if (!last || !today) return false;

  const diffDays = (today - last) / (1000 * 60 * 60 * 24);

  return diffDays === 1;
}

function calcLevel(xp) {

  // ✅ SAFE NUMBER HANDLING
  const safeXP = Number(xp);

  if (isNaN(safeXP) || safeXP < 0) return 1;

  // Simple + demo-friendly: every 100 XP = +1 level
  return Math.floor(safeXP / 100) + 1;
}

function awardBadges(user) {

  if (!user) return;

  const set = new Set(user.badges || []);

  const s = user.streak?.current || 0;
  const xp = user.xp || 0;

  // ✅ STREAK BADGES
  if (s >= 3) set.add("3_day_streak");
  if (s >= 7) set.add("7_day_streak");
  if (s >= 14) set.add("14_day_streak");
  if (s >= 30) set.add("30_day_streak");

  // 🔥 NEW BADGE LEVELS (UPGRADE)
  if (s >= 60) set.add("60_day_streak");
  if (s >= 100) set.add("100_day_streak");

  // ✅ XP BADGES
  if (xp >= 500) set.add("xp_500");
  if (xp >= 1000) set.add("xp_1000");

  // 🔥 NEW XP BADGES (UPGRADE)
  if (xp >= 2000) set.add("xp_2000");
  if (xp >= 5000) set.add("xp_5000");

  user.badges = Array.from(set);
}

module.exports = {
  todayStringIST,
  isYesterday,
  calcLevel,
  awardBadges,
};