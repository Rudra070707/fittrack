// backend/controllers/dietController.js

exports.generateDietPlan = async (req, res) => {
  try {
    let { height, weight, goal, preference } = req.body;

    // ✅ BASIC PRESENCE VALIDATION
    if (height === undefined || weight === undefined || !goal || !preference) {
      return res.status(400).json({
        success: false,
        message: "height, weight, goal, preference are required",
      });
    }

    // ✅ TYPE + VALUE VALIDATION (IMPORTANT)
    height = Number(height);
    weight = Number(weight);

    if (
      isNaN(height) ||
      isNaN(weight) ||
      height <= 0 ||
      weight <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Height and weight must be valid positive numbers",
      });
    }

    // ✅ NORMALIZE INPUTS
    goal = String(goal).trim();
    preference = String(preference).trim();

    // ✅ SCALABLE GOAL MAP (BETTER THAN MULTIPLE TERNARY)
    const goalMap = {
      "Weight Loss": {
        calories: 1800,
        protein: "90–110g",
        carbs: "160–200g",
        fats: "45–55g",
      },
      "Muscle Gain": {
        calories: 2400,
        protein: "120–140g",
        carbs: "250–320g",
        fats: "60–75g",
      },
      "Maintain": {
        calories: 2100,
        protein: "100–120g",
        carbs: "200–260g",
        fats: "55–70g",
      },
    };

    // fallback if unknown goal
    const selectedGoal = goalMap[goal] || goalMap["Maintain"];

    const { calories, protein, carbs, fats } = selectedGoal;

    // ✅ BMI CALCULATION (ADDED FEATURE 🔥)
    const bmi = +(weight / ((height / 100) ** 2)).toFixed(1);

    let bmiCategory = "Normal";
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi >= 25 && bmi < 30) bmiCategory = "Overweight";
    else if (bmi >= 30) bmiCategory = "Obese";

    // ✅ Meal suggestions based on preference
    const vegMeals = [
      { title: "Breakfast", items: "Oats + milk/curd + banana + almonds" },
      { title: "Lunch", items: "Dal + rice/roti + sabzi + salad" },
      { title: "Snack", items: "Fruit + roasted chana / sprouts" },
      { title: "Dinner", items: "Paneer/tofu + roti + veggies" },
    ];

    const nonVegMeals = [
      { title: "Breakfast", items: "Eggs + toast + fruit" },
      { title: "Lunch", items: "Chicken/fish + rice + salad" },
      { title: "Snack", items: "Curd + nuts / peanut butter sandwich" },
      { title: "Dinner", items: "Egg/chicken + roti + veggies" },
    ];

    const mixedMeals = [
      { title: "Breakfast", items: "Oats + eggs / milk + fruit" },
      { title: "Lunch", items: "Dal + chicken + rice/roti + salad" },
      { title: "Snack", items: "Fruit + nuts / sprouts" },
      { title: "Dinner", items: "Paneer/tofu or chicken + veggies + roti" },
    ];

    // ✅ FIXED PREFERENCE LOGIC (SAFE STRING CHECK)
    const prefLower = preference.toLowerCase();

    let meals = mixedMeals;

    if (prefLower.includes("non")) {
      meals = nonVegMeals;
    } else if (
      prefLower === "veg" ||
      (prefLower.includes("veg") && !prefLower.includes("non"))
    ) {
      meals = vegMeals;
    }

    // ✅ FINAL RESPONSE
    return res.status(200).json({
      success: true,
      plan: {
        calories,
        protein,
        carbs,
        fats,
        bmi,
        bmiCategory,
        meals,
        note: "This is a basic generated plan for your project demo (not medical advice).",
      },
    });

  } catch (err) {
    console.error("Diet generate error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};