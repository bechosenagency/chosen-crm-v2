const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");
const { query } = require("../config/database");
const logger = require("../utils/logger");

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Access token required", 401));
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return next(new AppError("Access token required", 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const result = await query(
      "SELECT id, email, first_name, last_name, role, is_active FROM users WHERE id = $1",
      [decoded.userId],
    );

    if (result.rows.length === 0) {
      return next(new AppError("User not found", 401));
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return next(new AppError("User account is deactivated", 401));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401));
    }
    logger.error("Token verification error:", error);
    return next(new AppError("Authentication failed", 401));
  }
};

// Role-based access control
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Insufficient permissions", 403));
    }

    next();
  };
};

// Optional authentication (for public routes that can work with or without auth)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(); // Continue without user
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await query(
      "SELECT id, email, first_name, last_name, role, is_active FROM users WHERE id = $1",
      [decoded.userId],
    );

    if (result.rows.length > 0 && result.rows[0].is_active) {
      req.user = result.rows[0];
    }

    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: "refresh" },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

module.exports = {
  verifyToken,
  requireRole,
  optionalAuth,
  generateToken,
  generateRefreshToken,
};
