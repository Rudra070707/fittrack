// backend/controllers/serviceController.js
const Service = require("../models/Service");

const seedPayload = () => [
  {
    slug: "gym",
    title: "Gym access made simple.",
    subtitle:
      "Train anytime with a clean, modern experience—track your workouts, follow plans, and stay consistent with FitTrack.",
    highlights: [
      "Unlimited gym sessions with flexible routine tracking",
      "Smart workout planner suggestions (beginner to advanced)",
      "Progress tracking to stay motivated consistently",
      "Injury-safe guidance for safer training habits",
    ],
    focusAreas: [
      { title: "Workout Planner", sub: "Structured routines for all levels" },
      { title: "Progress Tracking", sub: "Log sets, weights, and improvements" },
      { title: "Injury Safe", sub: "Safer training recommendations" },
      { title: "Consistency", sub: "Weekly structure + habit building" },
    ],
    programs: [
      {
        title: "Beginner Strength",
        level: "Beginner",
        duration: "3 days/week",
        goal: "Foundation + Form",
        desc: "Perfect to start gym with structure and safe progression.",
        list: ["Full body basics", "Light weights", "Form focus", "Simple progression"],
      },
      {
        title: "Lean Muscle",
        level: "Intermediate",
        duration: "4 days/week",
        goal: "Hypertrophy + Consistency",
        desc: "Build muscle with split routines and progressive overload.",
        list: ["Upper/Lower split", "Progress tracking", "Core training", "Recovery built-in"],
      },
      {
        title: "Performance",
        level: "Advanced",
        duration: "5 days/week",
        goal: "Strength + Conditioning",
        desc: "Push strength and endurance with advanced planning.",
        list: ["Strength blocks", "Accessory work", "Conditioning days", "Deload weeks"],
      },
    ],
    ctas: {
      primaryText: "Join Now",
      primaryHref: "/home/join",
      secondaryText: "Explore Workout Planner",
      secondaryHref: "/home/workout",
    },
  },

  {
    slug: "zumba",
    title: "Dance your way to fitness.",
    subtitle:
      "Fun, high-energy cardio that improves stamina, burns calories, and keeps you consistent.",
    highlights: [
      "Cardio + full body movement for better endurance",
      "Great for weight loss & mood boost",
      "Suitable for beginners—easy to start",
      "Track routine + progress with FitTrack",
    ],
    focusAreas: [
      { title: "Weight Loss", sub: "High-energy calorie burn sessions" },
      { title: "Stamina", sub: "Cardio endurance + heart health" },
      { title: "Mood Boost", sub: "Fun music to stay consistent" },
      { title: "Full Body", sub: "Arms, legs, core—everything moves" },
    ],
    programs: [
      {
        title: "Beginner Burn",
        level: "Beginner",
        duration: "20–30 min",
        goal: "Stamina + Fun cardio",
        desc: "Easy steps, low impact options, perfect to start consistency.",
        list: ["Warm-up groove (5 min)", "Basic steps (10 min)", "Fun combo (10 min)", "Cooldown stretch (5 min)"],
      },
      {
        title: "Fat Loss Party",
        level: "Intermediate",
        duration: "30–40 min",
        goal: "Calorie burn + Conditioning",
        desc: "Higher energy tracks with full-body movement and faster pace.",
        list: ["Warm-up (5 min)", "Dance cardio (20 min)", "HIIT bursts (8 min)", "Cooldown (5 min)"],
      },
      {
        title: "Power Zumba",
        level: "Advanced",
        duration: "40–50 min",
        goal: "Endurance + Performance",
        desc: "Longer sessions, intense tracks, strong core engagement.",
        list: ["Warm-up (6 min)", "Power combos (25 min)", "Core finisher (8 min)", "Cooldown (6 min)"],
      },
    ],
    ctas: {
      primaryText: "Join Zumba",
      primaryHref: "/home/join",
      secondaryText: "Track Progress",
      secondaryHref: "/home/progress",
    },
  },

  {
    slug: "yoga",
    title: "Yoga for strength & calm.",
    subtitle:
      "Build flexibility, reduce stress, and improve recovery with guided yoga sessions.",
    highlights: [
      "Beginner-friendly flows",
      "Improves flexibility + posture",
      "Recovery + mobility benefits",
      "Helps reduce stress",
    ],
    focusAreas: [
      { title: "Flexibility", sub: "Mobility + posture improvement" },
      { title: "Recovery", sub: "Better recovery after workouts" },
      { title: "Stress Relief", sub: "Breath + calm sessions" },
      { title: "Strength", sub: "Core + stability improvement" },
    ],
    programs: [
      {
        title: "Starter Flow",
        level: "Beginner",
        duration: "20–30 min",
        goal: "Mobility + Basics",
        desc: "Easy sequences to build consistency and improve flexibility.",
        list: ["Breathing (3 min)", "Gentle flow (15 min)", "Stretch (8 min)", "Relaxation (4 min)"],
      },
      {
        title: "Balance & Core",
        level: "Intermediate",
        duration: "30–40 min",
        goal: "Core strength + Stability",
        desc: "Build stability and posture through balance sequences.",
        list: ["Warm-up (5 min)", "Balance flow (20 min)", "Core work (8 min)", "Cooldown (5 min)"],
      },
      {
        title: "Power Yoga",
        level: "Advanced",
        duration: "40–50 min",
        goal: "Strength + Endurance",
        desc: "Faster paced yoga with strength holds and active flows.",
        list: ["Warm-up (6 min)", "Power flow (28 min)", "Strength holds (10 min)", "Cooldown (6 min)"],
      },
    ],
    ctas: {
      primaryText: "Join Yoga",
      primaryHref: "/home/join",
      secondaryText: "Open Diet Planner",
      secondaryHref: "/home/diet",
    },
  },
];

exports.seedAll = async (req, res) => {
  try {
    const payload = seedPayload();

    for (const s of payload) {
      await Service.findOneAndUpdate({ slug: s.slug }, s, {
        upsert: true,
        new: true,
      });
    }

    res.json({ success: true, message: "Services seeded ✅", slugs: payload.map(p => p.slug) });
  } catch (err) {
    console.error("SEED SERVICES ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });
    res.json({ success: true, service });
  } catch (err) {
    console.error("GET SERVICE ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateBySlug = async (req, res) => {
  try {
    const updated = await Service.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: "Service not found" });

    res.json({ success: true, message: "Service updated ✅", service: updated });
  } catch (err) {
    console.error("UPDATE SERVICE ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
