// backend/controllers/dietController.js

exports.generateDietPlan = async (req, res) => {
  try {
    const { height, weight, goal, preference } = req.body;

    if (!height || !weight || !goal || !preference) {
      return res.status(400).json({
        success: false,
        message: "height, weight, goal, preference are required",
      });
    }

    // ✅ Simple & safe demo logic (non-medical)
    const calories =
      goal === "Weight Loss" ? 1800 : goal === "Muscle Gain" ? 2400 : 2100;

    const protein =
      goal === "Muscle Gain"
        ? "120–140g"
        : goal === "Weight Loss"
        ? "90–110g"
        : "100–120g";

    const carbs =
      goal === "Weight Loss"
        ? "160–200g"
        : goal === "Muscle Gain"
        ? "250–320g"
        : "200–260g";

    const fats =
      goal === "Weight Loss"
        ? "45–55g"
        : goal === "Muscle Gain"
        ? "60–75g"
        : "55–70g";

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

    // ✅ IMPORTANT FIX: "Mixed" contains "veg" (substring)
    // so we must check NON-VEG first, then VEG, then default mixed
    const prefLower = String(preference).toLowerCase();

    let meals = mixedMeals;
    if (prefLower.includes("non")) meals = nonVegMeals;
    else if (prefLower === "veg" || (prefLower.includes("veg") && !prefLower.includes("non"))) {
      meals = vegMeals;
    }

    return res.json({
      success: true,
      plan: {
        calories,
        protein,
        carbs,
        fats,
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
