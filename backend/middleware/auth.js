const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ block common bad values (prevents jwt malformed)
    if (!token || token === "null" || token === "undefined" || token === "Bearer" || token === "[object" ) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // keep same pattern your routes use
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
