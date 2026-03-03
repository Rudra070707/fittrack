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
    const user = await User.findById(req.user.id).select("streak xp level badges");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      gamification: {
        streak: user.streak,
        xp: user.xp,
        level: user.level,
        badges: user.badges,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/gamification/mark-today
 * Updates streak, awards XP, badges
 */
exports.markTodayDone = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const today = todayStringIST();
    const last = user.streak?.lastActiveDate || "";

    // already counted today
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

    // streak logic
    if (!last) {
      user.streak.current = 1;
    } else if (isYesterday(last, today)) {
      user.streak.current = (user.streak.current || 0) + 1;
    } else {
      user.streak.current = 1; // broken streak
    }

    user.streak.lastActiveDate = today;
    user.streak.best = Math.max(user.streak.best || 0, user.streak.current);

    // award xp
    user.xp = (user.xp || 0) + 20; // +20 per day
    user.level = calcLevel(user.xp);

    // badges
    awardBadges(user);

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
    next(err);
  }
};