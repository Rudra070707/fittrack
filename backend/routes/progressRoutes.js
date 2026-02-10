const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");
const auth = require("../middleware/authUser");

// ✅ helper: works with different auth middlewares
function getUserId(req) {
  return (
    req.user?.id ||
    req.user?._id ||
    req.userId ||
    req.user?.userId ||
    req.user?.uid
  );
}

// ✅ Upsert daily progress (create or update)
router.post("/upsert", auth, async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { date, weightKg, bodyFat, didWorkout, workoutMinutes, workoutType } = req.body;

    if (!date) return res.status(400).json({ success: false, message: "Date is required" });

    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }
    d.setHours(0, 0, 0, 0);

    const doc = await Progress.findOneAndUpdate(
      { userId, date: d },
      {
        $set: {
          weightKg: weightKg === null || weightKg === undefined || weightKg === "" ? null : Number(weightKg),

          // ✅ store bodyFat too
          bodyFat: bodyFat === null || bodyFat === undefined || bodyFat === "" ? null : Number(bodyFat),

          didWorkout: !!didWorkout,
          workoutMinutes: Number(workoutMinutes || 0),
          workoutType: workoutType || "",
        },
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, progress: doc });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Progress for this date already exists." });
    }
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get last N days for charts
router.get("/range", auth, async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const days = Math.min(Number(req.query.days || 30), 365);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    const entries = await Progress.find({ userId, date: { $gte: start, $lte: end } })
      .sort({ date: 1 })
      .lean();

    res.json({ success: true, start, end, entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Monthly summary (includes bodyFat average)
router.get("/monthly-summary", auth, async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const year = Number(req.query.year);
    const month = Number(req.query.month); // 1-12

    if (!year || !month || month < 1 || month > 12) {
      return res.status(400).json({ success: false, message: "year & month required (month 1-12)" });
    }

    const start = new Date(year, month - 1, 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(year, month, 0);
    end.setHours(23, 59, 59, 999);

    const entries = await Progress.find({ userId, date: { $gte: start, $lte: end } })
      .sort({ date: 1 })
      .lean();

    const workoutDays = entries.filter(e => e.didWorkout).length;
    const totalMinutes = entries.reduce(
      (sum, e) => sum + (e.didWorkout ? (e.workoutMinutes || 0) : 0),
      0
    );

    const weights = entries.filter(e => typeof e.weightKg === "number");
    const avgWeight = weights.length
      ? (weights.reduce((s, e) => s + e.weightKg, 0) / weights.length)
      : null;

    const firstWeight = weights.length ? weights[0].weightKg : null;
    const lastWeight = weights.length ? weights[weights.length - 1].weightKg : null;
    const weightChange =
      firstWeight != null && lastWeight != null ? (lastWeight - firstWeight) : null;

    // ✅ bodyFat stats
    const fats = entries.filter(e => typeof e.bodyFat === "number");
    const avgBodyFat = fats.length
      ? (fats.reduce((s, e) => s + e.bodyFat, 0) / fats.length)
      : null;

    const firstBodyFat = fats.length ? fats[0].bodyFat : null;
    const lastBodyFat = fats.length ? fats[fats.length - 1].bodyFat : null;
    const bodyFatChange =
      firstBodyFat != null && lastBodyFat != null ? (lastBodyFat - firstBodyFat) : null;

    // Best streak in month
    let bestStreak = 0;
    let cur = 0;

    const workoutSet = new Set(
      entries
        .filter(e => e.didWorkout)
        .map(e => {
          const d = new Date(e.date);
          d.setHours(0, 0, 0, 0);
          return d.toISOString().slice(0, 10);
        })
    );

    const iter = new Date(start);
    while (iter <= end) {
      const key = iter.toISOString().slice(0, 10);
      if (workoutSet.has(key)) {
        cur += 1;
        if (cur > bestStreak) bestStreak = cur;
      } else {
        cur = 0;
      }
      iter.setDate(iter.getDate() + 1);
    }

    res.json({
      success: true,
      month,
      year,
      range: { start, end },
      stats: {
        workoutDays,
        totalMinutes,
        avgWeight,
        firstWeight,
        lastWeight,
        weightChange,
        bestStreak,

        // ✅ new
        avgBodyFat,
        firstBodyFat,
        lastBodyFat,
        bodyFatChange,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
