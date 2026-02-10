const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  durationMonths: { type: Number, default: 1 },
  features: { type: [String], default: [] },
  highlight: { type: Boolean, default: false }
});

module.exports = mongoose.model("Plan", planSchema);
