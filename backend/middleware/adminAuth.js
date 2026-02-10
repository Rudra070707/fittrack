const jwt = require("jsonwebtoken");

module.exports = function adminAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET missing in .env",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Extra safety: only admin token allowed
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied (not admin)",
      });
    }

    req.admin = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: err.message, // ✅ shows exact reason
    });
  }
};
