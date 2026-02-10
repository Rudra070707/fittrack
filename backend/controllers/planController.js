const Plan = require("../models/Plan");

// ✅ Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json({ success: true, plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update a plan (ADMIN EDIT)
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required"
      });
    }

    const plan = await Plan.findByIdAndUpdate(
      id,
      {
        $set: {
          name: String(name).trim(),
          price: Number(price),
          description: (description || "").trim()
        }
      },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found" });
    }

    res.json({ success: true, plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
