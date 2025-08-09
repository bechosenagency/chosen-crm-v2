const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { query } = require("../config/database");
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
} = require("../middleware/auth");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name is required"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name is required"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("company").optional().trim(),
  body("licenseNumber").optional().trim(),
];

const validateLogin = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// Register new user
router.post("/register", validateRegistration, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      company,
      licenseNumber,
    } = req.body;

    // Check if user already exists
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userId = uuidv4();
    const result = await query(
      `INSERT INTO users (id, email, password_hash, first_name, last_name, phone, company, license_number, role, is_active, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
       RETURNING id, email, first_name, last_name, role`,
      [
        userId,
        email,
        hashedPassword,
        firstName,
        lastName,
        phone,
        company,
        licenseNumber,
        "loan_officer",
        true,
      ],
    );

    const user = result.rows[0];

    // Generate tokens
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token
    await query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
      [user.id, refreshToken],
    );

    logger.info("User registered successfully", { userId: user.id, email });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error("Registration error:", error);
    next(error);
  }
});

// Login user
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user
    const result = await query(
      "SELECT id, email, password_hash, first_name, last_name, role, is_active FROM users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        error: "Account is deactivated",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Generate tokens
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token
    await query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
      [user.id, refreshToken],
    );

    logger.info("User logged in successfully", { userId: user.id, email });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    next(error);
  }
});

// Refresh token
router.post("/refresh", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: "Refresh token is required",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        success: false,
        error: "Invalid token type",
      });
    }

    // Check if refresh token exists in database
    const tokenResult = await query(
      "SELECT user_id FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()",
      [refreshToken],
    );

    if (tokenResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid refresh token",
      });
    }

    // Get user
    const userResult = await query(
      "SELECT id, email, first_name, last_name, role, is_active FROM users WHERE id = $1",
      [decoded.userId],
    );

    if (userResult.rows.length === 0 || !userResult.rows[0].is_active) {
      return res.status(401).json({
        success: false,
        error: "User not found or inactive",
      });
    }

    const user = userResult.rows[0];

    // Generate new tokens
    const newAccessToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    // Update refresh token in database
    await query(
      "UPDATE refresh_tokens SET token = $1, expires_at = NOW() + INTERVAL '7 days' WHERE user_id = $2",
      [newRefreshToken, user.id],
    );

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        error: "Invalid refresh token",
      });
    }
    logger.error("Token refresh error:", error);
    next(error);
  }
});

// Logout
router.post("/logout", verifyToken, async (req, res, next) => {
  try {
    // Invalidate refresh token
    await query("DELETE FROM refresh_tokens WHERE user_id = $1", [req.user.id]);

    logger.info("User logged out successfully", { userId: req.user.id });

    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    logger.error("Logout error:", error);
    next(error);
  }
});

// Get current user
router.get("/me", verifyToken, async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          email: req.user.email,
          firstName: req.user.first_name,
          lastName: req.user.last_name,
          role: req.user.role,
        },
      },
    });
  } catch (error) {
    logger.error("Get current user error:", error);
    next(error);
  }
});

module.exports = router;
