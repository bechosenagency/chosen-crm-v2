const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { query } = require("../config/database");
const { verifyToken, requireRole } = require("../middleware/auth");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

const router = express.Router();

// Apply authentication to all user routes
router.use(verifyToken);

// Validation middleware
const validateProfileUpdate = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name cannot be empty"),
  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name cannot be empty"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("company").optional().trim(),
  body("licenseNumber").optional().trim(),
];

const validatePasswordChange = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),
];

// Get current user profile
router.get("/profile", async (req, res, next) => {
  try {
    const result = await query(
      "SELECT id, email, first_name, last_name, phone, company, license_number, role, created_at FROM users WHERE id = $1",
      [req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Get profile error:", error);
    next(error);
  }
});

// Update user profile
router.put("/profile", validateProfileUpdate, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, phone, company, licenseNumber } = req.body;

    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 0;

    if (firstName !== undefined) {
      paramCount++;
      updates.push(`first_name = $${paramCount}`);
      values.push(firstName);
    }

    if (lastName !== undefined) {
      paramCount++;
      updates.push(`last_name = $${paramCount}`);
      values.push(lastName);
    }

    if (phone !== undefined) {
      paramCount++;
      updates.push(`phone = $${paramCount}`);
      values.push(phone);
    }

    if (company !== undefined) {
      paramCount++;
      updates.push(`company = $${paramCount}`);
      values.push(company);
    }

    if (licenseNumber !== undefined) {
      paramCount++;
      updates.push(`license_number = $${paramCount}`);
      values.push(licenseNumber);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No fields to update",
      });
    }

    paramCount++;
    updates.push(`updated_at = NOW()`);
    values.push(req.user.id);

    const result = await query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING id, email, first_name, last_name, phone, company, license_number, role`,
      values,
    );

    logger.info("Profile updated successfully", { userId: req.user.id });

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Update profile error:", error);
    next(error);
  }
});

// Change password
router.put("/password", validatePasswordChange, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Get current password hash
    const userResult = await query(
      "SELECT password_hash FROM users WHERE id = $1",
      [req.user.id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      userResult.rows[0].password_hash,
    );
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: "Current password is incorrect",
      });
    }

    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await query(
      "UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2",
      [newPasswordHash, req.user.id],
    );

    logger.info("Password changed successfully", { userId: req.user.id });

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    logger.error("Change password error:", error);
    next(error);
  }
});

// Get user statistics
router.get("/stats", async (req, res, next) => {
  try {
    // Get lead statistics
    const leadStats = await query(
      `SELECT 
        COUNT(*) as total_leads,
        COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
        COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_leads,
        COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_leads,
        COUNT(CASE WHEN status = 'application' THEN 1 END) as application_leads,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_leads,
        COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_leads,
        COUNT(CASE WHEN status = 'lost' THEN 1 END) as lost_leads
       FROM leads WHERE user_id = $1`,
      [req.user.id],
    );

    // Get activity statistics
    const activityStats = await query(
      `SELECT 
        COUNT(*) as total_activities,
        COUNT(CASE WHEN type = 'call' THEN 1 END) as calls,
        COUNT(CASE WHEN type = 'email' THEN 1 END) as emails,
        COUNT(CASE WHEN type = 'meeting' THEN 1 END) as meetings,
        COUNT(CASE WHEN type = 'note' THEN 1 END) as notes,
        COUNT(CASE WHEN type = 'task' THEN 1 END) as tasks
       FROM activities WHERE user_id = $1`,
      [req.user.id],
    );

    // Get scenario statistics
    const scenarioStats = await query(
      `SELECT 
        COUNT(*) as total_scenarios,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as scenarios_30_days
       FROM scenarios WHERE user_id = $1`,
      [req.user.id],
    );

    // Get favorite lenders count
    const favoriteStats = await query(
      "SELECT COUNT(*) as total_favorites FROM lender_favorites WHERE user_id = $1",
      [req.user.id],
    );

    res.json({
      success: true,
      data: {
        leads: leadStats.rows[0],
        activities: activityStats.rows[0],
        scenarios: scenarioStats.rows[0],
        favorites: favoriteStats.rows[0],
      },
    });
  } catch (error) {
    logger.error("Get user stats error:", error);
    next(error);
  }
});

// Get user settings
router.get("/settings", async (req, res, next) => {
  try {
    const result = await query(
      "SELECT * FROM user_settings WHERE user_id = $1",
      [req.user.id],
    );

    const settings =
      result.rows.length > 0
        ? result.rows[0]
        : {
            user_id: req.user.id,
            notifications_enabled: true,
            email_notifications: true,
            sms_notifications: false,
            timezone: "America/New_York",
            language: "en",
            theme: "dark",
          };

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    logger.error("Get user settings error:", error);
    next(error);
  }
});

// Update user settings
router.put(
  "/settings",
  [
    body("notificationsEnabled").optional().isBoolean(),
    body("emailNotifications").optional().isBoolean(),
    body("smsNotifications").optional().isBoolean(),
    body("timezone").optional().trim(),
    body("language").optional().isIn(["en", "es"]),
    body("theme").optional().isIn(["light", "dark"]),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const {
        notificationsEnabled,
        emailNotifications,
        smsNotifications,
        timezone,
        language,
        theme,
      } = req.body;

      // Check if settings exist
      const existingSettings = await query(
        "SELECT id FROM user_settings WHERE user_id = $1",
        [req.user.id],
      );

      if (existingSettings.rows.length === 0) {
        // Create new settings
        const result = await query(
          `INSERT INTO user_settings (user_id, notifications_enabled, email_notifications, sms_notifications, timezone, language, theme, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         RETURNING *`,
          [
            req.user.id,
            notificationsEnabled ?? true,
            emailNotifications ?? true,
            smsNotifications ?? false,
            timezone ?? "America/New_York",
            language ?? "en",
            theme ?? "dark",
          ],
        );

        res.status(201).json({
          success: true,
          message: "Settings created successfully",
          data: result.rows[0],
        });
      } else {
        // Update existing settings
        const updates = [];
        const values = [];
        let paramCount = 0;

        if (notificationsEnabled !== undefined) {
          paramCount++;
          updates.push(`notifications_enabled = $${paramCount}`);
          values.push(notificationsEnabled);
        }

        if (emailNotifications !== undefined) {
          paramCount++;
          updates.push(`email_notifications = $${paramCount}`);
          values.push(emailNotifications);
        }

        if (smsNotifications !== undefined) {
          paramCount++;
          updates.push(`sms_notifications = $${paramCount}`);
          values.push(smsNotifications);
        }

        if (timezone !== undefined) {
          paramCount++;
          updates.push(`timezone = $${paramCount}`);
          values.push(timezone);
        }

        if (language !== undefined) {
          paramCount++;
          updates.push(`language = $${paramCount}`);
          values.push(language);
        }

        if (theme !== undefined) {
          paramCount++;
          updates.push(`theme = $${paramCount}`);
          values.push(theme);
        }

        if (updates.length === 0) {
          return res.status(400).json({
            success: false,
            error: "No settings to update",
          });
        }

        paramCount++;
        updates.push(`updated_at = NOW()`);
        values.push(req.user.id);

        const result = await query(
          `UPDATE user_settings SET ${updates.join(", ")} WHERE user_id = $${paramCount} RETURNING *`,
          values,
        );

        res.json({
          success: true,
          message: "Settings updated successfully",
          data: result.rows[0],
        });
      }

      logger.info("User settings updated", { userId: req.user.id });
    } catch (error) {
      logger.error("Update user settings error:", error);
      next(error);
    }
  },
);

// Delete user account (admin only)
router.delete("/:id", requireRole(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const userResult = await query(
      "SELECT id, email FROM users WHERE id = $1",
      [id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Soft delete user
    await query(
      "UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1",
      [id],
    );

    logger.info("User account deactivated", {
      userId: id,
      adminId: req.user.id,
    });

    res.json({
      success: true,
      message: "User account deactivated successfully",
    });
  } catch (error) {
    logger.error("Delete user error:", error);
    next(error);
  }
});

module.exports = router;
