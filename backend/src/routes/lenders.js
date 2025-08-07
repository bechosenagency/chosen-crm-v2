const express = require("express");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { query } = require("../config/database");
const { verifyToken } = require("../middleware/auth");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

const router = express.Router();

// Apply authentication to all lender routes
router.use(verifyToken);

// Validation middleware
const validateScenario = [
  body("creditScore")
    .isInt({ min: 300, max: 850 })
    .withMessage("Credit score must be between 300 and 850"),
  body("loanAmount")
    .isFloat({ min: 1 })
    .withMessage("Loan amount must be greater than 0"),
  body("propertyType")
    .isIn([
      "single_family",
      "condo",
      "townhouse",
      "multi_family",
      "manufactured",
    ])
    .withMessage("Invalid property type"),
  body("loanType")
    .isIn(["conventional", "fha", "va", "usda"])
    .withMessage("Invalid loan type"),
  body("downPayment")
    .isFloat({ min: 0 })
    .withMessage("Down payment must be 0 or greater"),
  body("state")
    .isLength({ min: 2, max: 2 })
    .withMessage("State must be 2 characters"),
  body("occupancy")
    .isIn(["primary", "secondary", "investment"])
    .withMessage("Invalid occupancy type"),
];

// Get all lenders (for MVP, this will be a simple list)
router.get("/", async (req, res, next) => {
  try {
    const result = await query(
      "SELECT id, name, website, phone, email, specialties, created_at FROM lenders WHERE is_active = true ORDER BY name",
      [],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    logger.error("Get lenders error:", error);
    next(error);
  }
});

// Get lender by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      "SELECT * FROM lenders WHERE id = $1 AND is_active = true",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Lender not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Get lender error:", error);
    next(error);
  }
});

// Get lender rates
router.get("/:id/rates", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { loanType, propertyType, state } = req.query;

    let whereClause = "WHERE lender_id = $1 AND is_active = true";
    let params = [id];

    if (loanType) {
      params.push(loanType);
      whereClause += ` AND loan_type = $${params.length}`;
    }

    if (propertyType) {
      params.push(propertyType);
      whereClause += ` AND property_type = $${params.length}`;
    }

    if (state) {
      params.push(state);
      whereClause += ` AND state = $${params.length}`;
    }

    const result = await query(
      `SELECT * FROM lender_rates ${whereClause} ORDER BY rate ASC`,
      params,
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    logger.error("Get lender rates error:", error);
    next(error);
  }
});

// Match lenders based on scenario (MVP version)
router.post("/match", validateScenario, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      creditScore,
      loanAmount,
      propertyType,
      loanType,
      downPayment,
      state,
      occupancy,
      dti = 43,
    } = req.body;

    // Calculate LTV
    const ltv = ((loanAmount - downPayment) / loanAmount) * 100;

    // Simple matching logic for MVP
    // In production, this would be much more sophisticated
    const result = await query(
      `SELECT 
        l.id,
        l.name,
        l.website,
        l.phone,
        l.email,
        l.specialties,
        lr.rate,
        lr.points,
        lr.min_credit_score,
        lr.max_ltv,
        lr.min_loan_amount,
        lr.max_loan_amount,
        lr.turn_time_days,
        lr.program_name
       FROM lenders l
       JOIN lender_rates lr ON l.id = lr.lender_id
       WHERE l.is_active = true 
         AND lr.is_active = true
         AND lr.loan_type = $1
         AND lr.property_type = $2
         AND lr.state = $3
         AND lr.min_credit_score <= $4
         AND lr.max_ltv >= $5
         AND lr.min_loan_amount <= $6
         AND lr.max_loan_amount >= $6
       ORDER BY lr.rate ASC
       LIMIT 10`,
      [loanType, propertyType, state, creditScore, ltv, loanAmount],
    );

    // Calculate estimated monthly payment for each match
    const matches = result.rows.map((match) => {
      const principal = loanAmount;
      const rate = match.rate / 100 / 12; // Monthly rate
      const term = 360; // 30 years

      // Calculate monthly payment
      const monthlyPayment =
        (principal * (rate * Math.pow(1 + rate, term))) /
        (Math.pow(1 + rate, term) - 1);

      return {
        ...match,
        estimatedMonthlyPayment: Math.round(monthlyPayment),
        estimatedPointsCost: (match.points / 100) * loanAmount,
      };
    });

    // Log the scenario for analytics
    const scenarioId = uuidv4();
    await query(
      `INSERT INTO scenarios (id, user_id, credit_score, loan_amount, property_type, loan_type, down_payment, state, occupancy, dti, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
      [
        scenarioId,
        req.user.id,
        creditScore,
        loanAmount,
        propertyType,
        loanType,
        downPayment,
        state,
        occupancy,
        dti,
      ],
    );

    logger.info("Lender matching completed", {
      scenarioId,
      userId: req.user.id,
      matchesFound: matches.length,
    });

    res.json({
      success: true,
      data: {
        scenario: {
          creditScore,
          loanAmount,
          propertyType,
          loanType,
          downPayment,
          state,
          occupancy,
          dti,
          ltv: Math.round(ltv * 100) / 100,
        },
        matches,
        totalMatches: matches.length,
      },
    });
  } catch (error) {
    logger.error("Lender matching error:", error);
    next(error);
  }
});

// Get scenario history for user
router.get("/scenarios/history", async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT * FROM scenarios 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [req.user.id, limit, offset],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    logger.error("Get scenario history error:", error);
    next(error);
  }
});

// Get scenario by ID
router.get("/scenarios/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      "SELECT * FROM scenarios WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Scenario not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Get scenario error:", error);
    next(error);
  }
});

// Save favorite lender
router.post(
  "/favorites",
  [
    body("lenderId").isUUID().withMessage("Valid lender ID is required"),
    body("notes").optional().trim(),
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

      const { lenderId, notes } = req.body;
      const favoriteId = uuidv4();

      // Check if already favorited
      const existing = await query(
        "SELECT id FROM lender_favorites WHERE user_id = $1 AND lender_id = $2",
        [req.user.id, lenderId],
      );

      if (existing.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: "Lender already in favorites",
        });
      }

      const result = await query(
        `INSERT INTO lender_favorites (id, user_id, lender_id, notes, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
        [favoriteId, req.user.id, lenderId, notes],
      );

      logger.info("Lender added to favorites", {
        favoriteId,
        lenderId,
        userId: req.user.id,
      });

      res.status(201).json({
        success: true,
        message: "Lender added to favorites",
        data: result.rows[0],
      });
    } catch (error) {
      logger.error("Add to favorites error:", error);
      next(error);
    }
  },
);

// Get user's favorite lenders
router.get("/favorites", async (req, res, next) => {
  try {
    const result = await query(
      `SELECT lf.*, l.name, l.website, l.phone, l.email
       FROM lender_favorites lf
       JOIN lenders l ON lf.lender_id = l.id
       WHERE lf.user_id = $1
       ORDER BY lf.created_at DESC`,
      [req.user.id],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    logger.error("Get favorites error:", error);
    next(error);
  }
});

// Remove from favorites
router.delete("/favorites/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query(
      "DELETE FROM lender_favorites WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Favorite not found",
      });
    }

    logger.info("Lender removed from favorites", {
      favoriteId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Lender removed from favorites",
    });
  } catch (error) {
    logger.error("Remove from favorites error:", error);
    next(error);
  }
});

module.exports = router;
