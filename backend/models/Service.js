// backend/models/Service.js
const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    level: { type: String, default: "" },
    duration: { type: String, default: "" },
    goal: { type: String, default: "" },
    desc: { type: String, default: "" },
    list: [{ type: String }],
  },
  { _id: false }
);

const ServiceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // gym | zumba | yoga
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },

    highlights: [{ type: String }], // left bullets
    focusAreas: [
      {
        title: String,
        sub: String,
      },
    ],

    programs: [ProgramSchema],

    ctas: {
      primaryText: { type: String, default: "Join Now" },
      primaryHref: { type: String, default: "/home/join" },
      secondaryText: { type: String, default: "Explore" },
      secondaryHref: { type: String, default: "/home/workout" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
