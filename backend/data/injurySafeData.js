// backend/data/injurySafeData.js

// ✅ Canonical body parts list (only these are accepted)
const BODY_PARTS = [
  "head","skull","face","eye","ear","nose","mouth","jaw","neck",
  "shoulder","collarbone","clavicle",
  "arm","upper arm","forearm","elbow","wrist","hand",
  "palm","thumb","finger",
  "chest","pecs","rib","ribs",
  "upper back","mid back","lower back","back","spine",
  "waist","abdomen","stomach","core","oblique",
  "hip","glute","buttocks","pelvis","groin",
  "leg","thigh","hamstring","quadriceps","quad",
  "knee","shin","calf","ankle","heel","foot","toe"
];

// ✅ Common aliases → canonical
const ALIASES = {
  lowerback: "lower back",
  upperback: "upper back",
  midback: "mid back",
  upperarm: "upper arm",
  collar: "collarbone",
  abs: "abdomen",
  belly: "abdomen",
  tummy: "stomach",
  butt: "buttocks",
  glutes: "glute",
  traps: "shoulder",
  trap: "shoulder",
  lats: "upper back",
  ribcage: "ribs",
  pec: "pecs",
  calves: "calf",
  quads: "quadriceps",
  hammies: "hamstring",
  ankles: "ankle",
  knees: "knee",
  wrists: "wrist",
  elbows: "elbow",
  hands: "hand",
  feet: "foot",
  toes: "toe",

  // 🔥 NEW SMART ALIASES (ADDED)
  lower_back: "lower back",
  upper_back: "upper back",
  mid_back: "mid back",
  shoulderpain: "shoulder",
  kneepain: "knee",
  backpain: "back"
};

// ✅ Body part → group
const PART_GROUP = {
  head: "head_neck", skull: "head_neck", face: "head_neck", eye: "head_neck", ear: "head_neck",
  nose: "head_neck", mouth: "head_neck", jaw: "head_neck", neck: "head_neck",

  shoulder: "upper_limb", collarbone: "upper_limb", clavicle: "upper_limb",
  arm: "upper_limb", "upper arm": "upper_limb", forearm: "upper_limb",
  elbow: "upper_limb", wrist: "upper_limb", hand: "upper_limb",
  palm: "upper_limb", thumb: "upper_limb", finger: "upper_limb",

  chest: "chest", pecs: "chest", rib: "chest", ribs: "chest",

  "upper back": "spine_core", "mid back": "spine_core", "lower back": "spine_core",
  back: "spine_core", spine: "spine_core",
  waist: "spine_core", abdomen: "spine_core", stomach: "spine_core", core: "spine_core", oblique: "spine_core",

  hip: "hip_pelvis", glute: "hip_pelvis", buttocks: "hip_pelvis", pelvis: "hip_pelvis", groin: "hip_pelvis",

  leg: "lower_limb", thigh: "lower_limb", hamstring: "lower_limb", quadriceps: "lower_limb", quad: "lower_limb",
  knee: "lower_limb", shin: "lower_limb", calf: "lower_limb", ankle: "lower_limb",
  heel: "lower_limb", foot: "lower_limb", toe: "lower_limb",
};

// ✅ Precautions by group
function precautionsFor(part, group) {

  const base = {
    note: `Avoid movements that aggravate the ${part}. Focus on controlled recovery.`
  };

  switch (group) {
    case "head_neck":
      return {
        ...base,
        avoid: ["Heavy loading on neck", "Fast jerky head movement", "High-impact if dizzy"],
        replace: ["Gentle mobility", "Posture drills", "Light band work"],
        warmup: ["Chin tucks", "Slow neck rotations", "Upper trap stretch"],
        intensity: "very light — stop if dizziness/headache"
      };

    case "upper_limb":
      return {
        ...base,
        avoid: ["Heavy overhead pressing", "Painful push-ups/dips", "Explosive throws"],
        replace: ["Controlled dumbbell work", "Band face pulls", "Scapular stability drills"],
        warmup: ["Shoulder circles", "Band pull-aparts", "External rotations"],
        intensity: "reduced — pain-free range only"
      };

    case "chest":
      return {
        ...base,
        avoid: ["Deep heavy bench press", "Chest-dominant dips", "Hard twisting under load"],
        replace: ["Incline push-ups (easy)", "Cable fly (light)", "Isometric holds"],
        warmup: ["Arm swings", "Thoracic opener", "Light pec stretch"],
        intensity: "light to moderate — avoid sharp pain"
      };

    case "spine_core":
      return {
        ...base,
        avoid: ["Heavy deadlifts", "Heavy back squats", "High-impact twisting"],
        replace: ["Bird-dogs", "Glute bridges", "Core bracing / McGill curl-up"],
        warmup: ["Cat-cow", "Hip mobility", "Walk 5–8 min"],
        intensity: "reduced — neutral spine only"
      };

    case "hip_pelvis":
      return {
        ...base,
        avoid: ["Deep painful squats", "Wide stance painful moves", "Explosive lateral jumps"],
        replace: ["Hip thrust (light)", "Clamshells", "Step-ups (controlled)"],
        warmup: ["Hip circles", "Glute activation", "Dynamic lunges (small range)"],
        intensity: "reduced — focus on control"
      };

    case "lower_limb":
      return {
        ...base,
        avoid: ["Jumping/plyometrics", "Deep squats if painful", "Sprinting if pain increases"],
        replace: ["Leg extensions (light)", "Hamstring curls", "Cycling/walking (low impact)"],
        warmup: ["Ankle mobility", "Quad activation", "Light treadmill 5–8 min"],
        intensity: "reduced — pain-free only"
      };

    default:
      return {
        ...base,
        avoid: [`Heavy loading on the ${part}`, "Explosive movements", "Pain-inducing exercises"],
        replace: ["Low-impact strengthening", "Controlled mobility drills", "Stability exercises"],
        warmup: [`${part} gentle warm-up`, "Light stretching", "Activation exercises"],
        intensity: "reduced — pain-free only"
      };
  }
}

// ✅ Extract body part (IMPROVED NLP 🔥)
function extractBodyPart(input) {

  if (!input || typeof input !== "string") return null;

  const cleaned = input
    .trim()
    .toLowerCase()
    .replace(/pain|injury|ache|hurt|hurts|sore|soreness|problem|issue|swollen/g, "")
    .replace(/[-_]/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return null;

  // 🔥 PRIORITY: multi-word match
  const multi = BODY_PARTS.filter(p => p.includes(" "));
  for (const part of multi) {
    if (cleaned.includes(part)) return part;
  }

  const tokens = cleaned.split(" ");

  for (const t of tokens) {

    if (BODY_PARTS.includes(t)) return t;

    if (ALIASES[t] && BODY_PARTS.includes(ALIASES[t])) {
      return ALIASES[t];
    }
  }

  // 🔥 COMPACT MATCH (AI-LIKE)
  const compact = cleaned.replace(/\s/g, "");

  if (ALIASES[compact] && BODY_PARTS.includes(ALIASES[compact])) {
    return ALIASES[compact];
  }

  // 🔥 PARTIAL MATCH IMPROVEMENT (NEW)
  for (const part of BODY_PARTS) {
    if (cleaned.includes(part)) return part;
  }

  return null;
}

module.exports = { BODY_PARTS, PART_GROUP, precautionsFor, extractBodyPart };