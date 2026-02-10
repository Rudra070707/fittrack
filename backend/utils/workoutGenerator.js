// backend/utils/workoutGenerator.js

const pickSplit = (days) => {
  if (days <= 3) return ["Push", "Pull", "Legs"];
  if (days === 5) return ["Push", "Pull", "Legs", "Upper", "Lower"];
  // 6 days
  return ["Push", "Pull", "Legs", "Push", "Pull", "Legs"];
};

const templates = {
  "Weight Loss": {
    Beginner: {
      Push: ["Incline Pushups - 3x12", "DB Shoulder Press - 3x12", "Triceps Rope - 3x15", "Cardio Walk - 15 min"],
      Pull: ["Lat Pulldown - 3x12", "Seated Row - 3x12", "Bicep Curls - 3x15", "Cycling - 15 min"],
      Legs: ["Goblet Squats - 3x12", "Lunges - 3x10", "Leg Press - 3x12", "Stair Climb - 10 min"],
      Upper: ["Chest Press - 3x12", "Row Machine - 3x12", "Lateral Raises - 3x15", "Jump Rope - 8 min"],
      Lower: ["Squats - 3x10", "RDL - 3x10", "Calf Raises - 3x15", "Treadmill - 12 min"]
    },
    Intermediate: {
      Push: ["Bench Press - 4x10", "Incline DB Press - 3x12", "Dips - 3x10", "HIIT - 10 min"],
      Pull: ["Pull-down - 4x10", "DB Row - 4x10", "Face Pull - 3x15", "Rowing - 10 min"],
      Legs: ["Back Squat - 4x10", "Leg Press - 4x12", "Ham Curl - 3x12", "Bike - 12 min"],
      Upper: ["Incline Press - 4x10", "Seated Row - 4x10", "Shoulder Press - 3x12", "Core - 10 min"],
      Lower: ["Deadlift - 3x6", "Lunges - 3x12", "Leg Extensions - 3x12", "Incline Walk - 15 min"]
    },
    Advanced: {
      Push: ["Bench Press - 5x6", "Incline Press - 4x8", "Dips - 4x12", "HIIT Sprints - 12 min"],
      Pull: ["Deadlift - 5x5", "Pull-ups - 4x10", "Barbell Row - 4x8", "Rowing - 12 min"],
      Legs: ["Squats - 5x6", "RDL - 4x8", "Leg Press - 4x15", "Finisher - 8 min"],
      Upper: ["Chest Press - 4x8", "Rows - 4x10", "OHP - 4x8", "Core - 12 min"],
      Lower: ["Front Squat - 4x6", "Ham Curl - 4x12", "Calves - 4x15", "Bike - 15 min"]
    }
  },

  "Muscle Gain": {
    Beginner: {
      Push: ["Bench Press - 3x10", "Pushups - 3x12", "Triceps Pushdown - 3x12"],
      Pull: ["Lat Pulldown - 3x10", "DB Row - 3x10", "Bicep Curls - 3x12"],
      Legs: ["Squats - 3x10", "Leg Press - 3x12", "Calf Raises - 3x15"],
      Upper: ["Incline Press - 3x10", "Seated Row - 3x10", "Lateral Raises - 3x12"],
      Lower: ["RDL - 3x10", "Lunges - 3x10", "Leg Curl - 3x12"]
    },
    Intermediate: {
      Push: ["Bench Press - 4x8", "Incline DB Press - 4x10", "Skull Crushers - 3x12"],
      Pull: ["Pull-ups - 4x8", "Barbell Row - 4x8", "Hammer Curls - 3x12"],
      Legs: ["Back Squat - 4x8", "Leg Press - 4x12", "Calf Raises - 4x15"],
      Upper: ["Chest Press - 4x10", "Rows - 4x10", "Shoulder Press - 3x10"],
      Lower: ["Deadlift - 3x5", "Leg Curl - 4x12", "Leg Extensions - 4x12"]
    },
    Advanced: {
      Push: ["Bench Press - 5x5", "Incline Press - 4x8", "Weighted Dips - 4x8"],
      Pull: ["Deadlift - 5x3", "Weighted Pull-ups - 4x6", "Barbell Row - 4x8"],
      Legs: ["Squats - 5x5", "RDL - 4x8", "Leg Press - 4x15"],
      Upper: ["Incline Press - 4x8", "Seated Row - 4x10", "OHP - 4x6"],
      Lower: ["Front Squat - 4x6", "Ham Curl - 4x12", "Calves - 4x20"]
    }
  },

  Strength: {
    Beginner: {
      Push: ["Bench Press - 4x6", "DB Press - 3x8", "Triceps Dips - 3x10"],
      Pull: ["Lat Pulldown - 4x6", "DB Row - 3x8", "Curls - 3x10"],
      Legs: ["Squats - 4x6", "Leg Press - 3x8", "Calves - 3x12"],
      Upper: ["Bench - 4x6", "Row - 4x6", "OHP - 3x6"],
      Lower: ["Deadlift - 3x5", "Lunges - 3x8", "Ham Curl - 3x10"]
    },
    Intermediate: {
      Push: ["Bench Press - 5x5", "Incline Press - 4x6", "Close Grip Bench - 3x6"],
      Pull: ["Deadlift - 4x4", "Pull-ups - 4x6", "Barbell Row - 4x6"],
      Legs: ["Squats - 5x5", "RDL - 4x6", "Leg Press - 4x8"],
      Upper: ["Bench - 5x5", "Row - 5x5", "OHP - 4x6"],
      Lower: ["Deadlift - 4x4", "Front Squat - 4x6", "Calves - 4x12"]
    },
    Advanced: {
      Push: ["Bench Press - 6x3", "OHP - 5x3", "Weighted Dips - 4x5"],
      Pull: ["Deadlift - 6x2", "Weighted Pull-ups - 5x4", "Rows - 5x5"],
      Legs: ["Squats - 6x3", "Front Squat - 5x3", "RDL - 4x5"],
      Upper: ["Bench - 6x3", "Row - 6x3", "OHP - 5x3"],
      Lower: ["Deadlift - 6x2", "Squat - 5x3", "Ham Curl - 4x8"]
    }
  },

  "General Fitness": {
    Beginner: {
      Push: ["Pushups - 3x12", "DB Shoulder Press - 3x12", "Plank - 3x30s"],
      Pull: ["Lat Pulldown - 3x12", "DB Row - 3x10", "Crunches - 3x15"],
      Legs: ["Bodyweight Squats - 3x15", "Lunges - 3x10", "Calf Raises - 3x15"],
      Upper: ["Chest Press - 3x12", "Seated Row - 3x12", "Lateral Raise - 3x12"],
      Lower: ["Leg Press - 3x12", "RDL - 3x10", "Stretch - 10 min"]
    },
    Intermediate: {
      Push: ["Bench Press - 4x10", "Incline DB Press - 3x12", "Triceps - 3x12"],
      Pull: ["Pull-down - 4x10", "Rows - 4x10", "Biceps - 3x12"],
      Legs: ["Squats - 4x10", "Leg Press - 4x12", "Calves - 4x15"],
      Upper: ["Incline Press - 4x10", "Seated Row - 4x10", "OHP - 3x10"],
      Lower: ["Deadlift - 3x6", "Lunges - 4x10", "Core - 10 min"]
    },
    Advanced: {
      Push: ["Bench Press - 5x6", "Incline Press - 4x8", "Dips - 4x10"],
      Pull: ["Deadlift - 5x5", "Pull-ups - 4x10", "Barbell Row - 4x8"],
      Legs: ["Squats - 5x6", "RDL - 4x8", "Leg Press - 4x15"],
      Upper: ["Incline Press - 4x8", "Rows - 4x10", "OHP - 4x8"],
      Lower: ["Front Squat - 4x6", "Ham Curl - 4x12", "Core - 12 min"]
    }
  }
};

function generateWorkoutPlan({ goal, level, days }) {
  const d = Number(days);

  const safeGoal = templates[goal] ? goal : "General Fitness";
  const safeLevel = templates[safeGoal][level] ? level : "Beginner";

  const split = pickSplit(d);
  const base = templates[safeGoal][safeLevel];

  const plan = {};
  split.forEach((type, idx) => {
    plan[`day${idx + 1}`] = base[type] || base["Push"];
  });

  return plan;
}

module.exports = { generateWorkoutPlan };
