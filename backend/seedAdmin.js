const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@fittrack.com" });

    if (existingAdmin) {
      console.log("Admin already exists, skipping creation ⚠️");
    } else {
      const hashed = await bcrypt.hash("admin123", 10);
      await Admin.create({ email: "admin@fittrack.com", password: hashed });
      console.log("Admin created successfully ✅");
    }
  } catch (err) {
    console.error("Error seeding admin:", err);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
});
