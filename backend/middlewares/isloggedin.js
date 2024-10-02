const jwt = require("jsonwebtoken");

module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  // Check if the token is not present
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Token is invalid or expired
      console.error("Token verification error:", err);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    // Token is valid
    req.user = user; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
