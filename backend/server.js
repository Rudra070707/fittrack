const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
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

// ✅ contact route
const contactRoutes = require("./routes/contactRoutes");

// ✅ Zumba routes (NEW)
const zumbaRoutes = require("./routes/zumbaRoutes");

// ✅ Zumba notifier (background job)
const { startZumbaNotifier } = require("./utils/zumbaNotifier");
const testMailRoutes = require("./routes/testMailRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ make uploads folder public
app.use("/uploads", express.static("uploads"));

// Routes
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

// ✅ contact API
app.use("/api/contact", contactRoutes);

// ✅ Zumba API
app.use("/api/zumba", zumbaRoutes);
app.use("/api/testmail", require("./routes/testMailRoutes"));


// Root endpoint
app.get("/", (req, res) => {
  res.send("FitTrack Backend Running 🚀");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // ✅ Start Zumba notification scheduler AFTER DB connection
    startZumbaNotifier();
    console.log("🕺 Zumba Notification Scheduler Started");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT} 🚀`)
);
