const path = require("path");

// TEMP in-memory storage (can be DB later)
let settingsData = {
  gymName: "FitTrack Fitness Club",
  branch: "Mumbai — Andheri West",
  supportEmail: "support@fittrack.com",
  phone: "+91 9876543210",
  gst: "GSTINXXXXXXXX",
  hours: "Mon–Sat: 6AM–10PM",
  logo: null
};

// SAVE SETTINGS
exports.saveSettings = (req, res) => {
  const {
    gymName,
    branch,
    supportEmail,
    phone,
    gst,
    hours
  } = req.body;

  settingsData = {
    ...settingsData,
    gymName,
    branch,
    supportEmail,
    phone,
    gst,
    hours,
  };

  if (req.file) {
    settingsData.logo = `/uploads/${req.file.filename}`;
  }

  res.json(settingsData);
};

// GET SETTINGS
exports.getSettings = (req, res) => {
  res.json(settingsData);
};
