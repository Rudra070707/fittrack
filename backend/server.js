const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// ================= IMPORT ROUTES =================
const adminRoutes = require("./routes/adminRoutes");
const planRoutes = require("./routes/planRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const progressRoutes = require("./routes/progressRoutes");
const dietRoutes = require("./routes/dietRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");
const injurySafeRoutes = require("./routes/injurySafeRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const zumbaRoutes = require("./routes/zumbaRoutes");
const testMailRoutes = require("./routes/testMailRoutes");

// Zumba background scheduler
const { startZumbaNotifier } = require("./utils/zumbaNotifier");

// ================= APP INIT =================
const app = express();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fittrack-otl5.onrender.com" // allow Render frontend
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================= HEALTH ROUTES =================
app.get("/", (req, res) => {
  res.send("FitTrack Backend Running 🚀");
});

app.get("/api", (req, res) => {
  res.json({ success: true, message: "FitTrack API is working ✅" });
});

app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Test route OK ✅" });
});

// ================= ROUTES =================
app.use("/api/admin", adminRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api", chatRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/auth", userAuthRoutes);
app.use("/api/injury-safe", injurySafeRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/zumba", zumbaRoutes);
app.use("/api/testmail", testMailRoutes);

// ================= DATABASE CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // Start Zumba notifier only after DB connection
    startZumbaNotifier();
    console.log("🕺 Zumba Notification Scheduler Started");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌:", err);
  });

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT} 🚀`);
});
