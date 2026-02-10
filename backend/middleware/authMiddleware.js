const jwt = require("jsonwebtoken");

/* ======================================================
   🔐 REQUIRE AUTH (any logged-in user)
   ====================================================== */
exports.requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { id, role, iat, exp }
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/* ======================================================
   👑 REQUIRE ADMIN
   ====================================================== */
exports.requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  next();
};
