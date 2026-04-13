// backend/controllers/gamificationController.js

const User = require("../models/User");
const {
  todayStringIST,
  isYesterday,
  calcLevel,
  awardBadges,
} = require("../utils/gamification");

/**
 * GET /api/gamification
 * Returns streak/xp/level/badges for logged-in user
 */
exports.getGamification = async (req, res, next) => {
  try {

    // ✅ SAFE USER FETCH
    const user = await User.findById(req.user.id).select("streak xp level badges");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      gamification: {
        streak: user.streak || { current: 0, best: 0, lastActiveDate: "" },
        xp: user.xp || 0,
        level: user.level || 1,
        badges: user.badges || [],
      },
    });

  } catch (err) {
    console.error("getGamification error:", err);
    next(err);
  }
};

/**
 * POST /api/gamification/mark-today
 * Updates streak, awards XP, badges
 */
exports.markTodayDone = async (req, res, next) => {
  try {

    // ✅ SAFE USER FETCH
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ ENSURE DEFAULT STRUCTURE (VERY IMPORTANT)
    if (!user.streak) {
      user.streak = {
        current: 0,
        best: 0,
        lastActiveDate: "",
      };
    }

    if (!Array.isArray(user.badges)) {
      user.badges = [];
    }

    if (typeof user.xp !== "number") {
      user.xp = 0;
    }

    if (typeof user.level !== "number") {
      user.level = 1;
    }

    const today = todayStringIST();
    const last = user.streak.lastActiveDate || "";

    // ✅ ALREADY MARKED TODAY
    if (last === today) {
      return res.json({
        success: true,
        message: "Already counted today ✅",
        gamification: {
          streak: user.streak,
          xp: user.xp,
          level: user.level,
          badges: user.badges,
        },
      });
    }

    // ✅ STREAK LOGIC (SAFE)
    if (!last) {
      user.streak.current = 1;
    } else if (isYesterday(last, today)) {
      user.streak.current = (user.streak.current || 0) + 1;
    } else {
      user.streak.current = 1; // broken streak
    }

    user.streak.lastActiveDate = today;

    // ✅ BEST STREAK UPDATE
    user.streak.best = Math.max(user.streak.best || 0, user.streak.current);

    // ✅ XP SYSTEM (SAFE LIMIT)
    const DAILY_XP = 20;

    // 🔥 OPTIONAL ABUSE PROTECTION (MAX XP PER DAY)
    const maxDailyXP = 50;
    const gainedXP = Math.min(DAILY_XP, maxDailyXP);

    user.xp = (user.xp || 0) + gainedXP;

    // ✅ LEVEL CALCULATION
    user.level = calcLevel(user.xp);

    // ✅ BADGES UPDATE
    awardBadges(user);

    // ✅ SAVE
    await user.save();

    return res.json({
      success: true,
      message: "Streak updated + XP awarded ✅",
      gamification: {
        streak: user.streak,
        xp: user.xp,
        level: user.level,
        badges: user.badges,
      },
    });

  } catch (err) {

    console.error("markTodayDone error:", err);

    next(err);
  }
};