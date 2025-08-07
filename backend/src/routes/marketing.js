const express = require("express");
const { body, validationResult, query } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { query: dbQuery } = require("../config/database");
const { verifyToken, requireRole } = require("../middleware/auth");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

const router = express.Router();

// Apply authentication to all marketing routes
router.use(verifyToken);

// Validation middleware for landing pages
const validateLandingPage = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("template")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Template is required"),
  body("status").isIn(["draft", "published"]).withMessage("Invalid status"),
  body("settings").isObject().withMessage("Settings must be an object"),
  body("components").isArray().withMessage("Components must be an array"),
  body("componentData")
    .isObject()
    .withMessage("Component data must be an object"),
];

// Get all landing pages for current user
router.get("/landing-pages", async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE user_id = $1";
    let params = [req.user.id];
    let paramCount = 1;

    if (status) {
      paramCount++;
      whereClause += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (search) {
      paramCount++;
      whereClause += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    // Get landing pages with pagination
    const pagesResult = await dbQuery(
      `SELECT id, title, description, template, status, settings, components, component_data, 
              views, conversions, conversion_rate, url_slug, created_at, updated_at
       FROM landing_pages ${whereClause}
       ORDER BY updated_at DESC
       LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`,
      [...params, limit, offset],
    );

    // Get total count
    const countResult = await dbQuery(
      `SELECT COUNT(*) as total FROM landing_pages ${whereClause}`,
      params,
    );

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    // Parse JSON fields
    const pages = pagesResult.rows.map((page) => ({
      ...page,
      settings: JSON.parse(page.settings || "{}"),
      components: JSON.parse(page.components || "[]"),
      componentData: JSON.parse(page.component_data || "{}"),
    }));

    res.json({
      success: true,
      data: {
        pages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    logger.error("Get landing pages error:", error);
    next(error);
  }
});

// Create new landing page
router.post("/landing-pages", validateLandingPage, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      title,
      description,
      template,
      status,
      settings,
      components,
      componentData,
    } = req.body;
    const pageId = uuidv4();
    const urlSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const result = await dbQuery(
      `INSERT INTO landing_pages (
        id, user_id, title, description, template, status, settings, components, component_data, 
        url_slug, views, conversions, conversion_rate, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
      RETURNING *`,
      [
        pageId,
        req.user.id,
        title,
        description,
        template,
        status,
        JSON.stringify(settings),
        JSON.stringify(components),
        JSON.stringify(componentData),
        urlSlug,
        0,
        0,
        0,
      ],
    );

    logger.info("Landing page created successfully", {
      pageId,
      userId: req.user.id,
    });

    // Parse JSON fields for response
    const page = {
      ...result.rows[0],
      settings: JSON.parse(result.rows[0].settings || "{}"),
      components: JSON.parse(result.rows[0].components || "[]"),
      componentData: JSON.parse(result.rows[0].component_data || "{}"),
    };

    res.status(201).json({
      success: true,
      message: "Landing page created successfully",
      data: page,
    });
  } catch (error) {
    logger.error("Create landing page error:", error);
    next(error);
  }
});

// Get landing page by ID
router.get("/landing-pages/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "SELECT * FROM landing_pages WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Landing page not found",
      });
    }

    // Parse JSON fields
    const page = {
      ...result.rows[0],
      settings: JSON.parse(result.rows[0].settings || "{}"),
      components: JSON.parse(result.rows[0].components || "[]"),
      componentData: JSON.parse(result.rows[0].component_data || "{}"),
    };

    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    logger.error("Get landing page error:", error);
    next(error);
  }
});

// Update landing page
router.put(
  "/landing-pages/:id",
  validateLandingPage,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const {
        title,
        description,
        template,
        status,
        settings,
        components,
        componentData,
      } = req.body;

      const result = await dbQuery(
        `UPDATE landing_pages 
       SET title = $1, description = $2, template = $3, status = $4, 
           settings = $5, components = $6, component_data = $7, updated_at = NOW()
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
        [
          title,
          description,
          template,
          status,
          JSON.stringify(settings),
          JSON.stringify(components),
          JSON.stringify(componentData),
          id,
          req.user.id,
        ],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Landing page not found",
        });
      }

      logger.info("Landing page updated successfully", {
        pageId: id,
        userId: req.user.id,
      });

      // Parse JSON fields for response
      const page = {
        ...result.rows[0],
        settings: JSON.parse(result.rows[0].settings || "{}"),
        components: JSON.parse(result.rows[0].components || "[]"),
        componentData: JSON.parse(result.rows[0].component_data || "{}"),
      };

      res.json({
        success: true,
        message: "Landing page updated successfully",
        data: page,
      });
    } catch (error) {
      logger.error("Update landing page error:", error);
      next(error);
    }
  },
);

// Delete landing page
router.delete("/landing-pages/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "DELETE FROM landing_pages WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Landing page not found",
      });
    }

    logger.info("Landing page deleted successfully", {
      pageId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Landing page deleted successfully",
    });
  } catch (error) {
    logger.error("Delete landing page error:", error);
    next(error);
  }
});

// Update landing page analytics (for tracking views, conversions)
router.patch(
  "/landing-pages/:id/analytics",
  [
    body("views").optional().isInt({ min: 0 }),
    body("conversions").optional().isInt({ min: 0 }),
    body("conversionRate").optional().isFloat({ min: 0, max: 100 }),
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

      const { id } = req.params;
      const { views, conversions, conversionRate } = req.body;

      let updateFields = [];
      let params = [];
      let paramCount = 1;

      if (views !== undefined) {
        updateFields.push(`views = $${paramCount}`);
        params.push(views);
        paramCount++;
      }

      if (conversions !== undefined) {
        updateFields.push(`conversions = $${paramCount}`);
        params.push(conversions);
        paramCount++;
      }

      if (conversionRate !== undefined) {
        updateFields.push(`conversion_rate = $${paramCount}`);
        params.push(conversionRate);
        paramCount++;
      }

      if (updateFields.length === 0) {
        return res.status(400).json({
          success: false,
          error: "No fields to update",
        });
      }

      updateFields.push(`updated_at = NOW()`);
      params.push(id, req.user.id);

      const result = await dbQuery(
        `UPDATE landing_pages 
       SET ${updateFields.join(", ")}
       WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
       RETURNING *`,
        params,
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Landing page not found",
        });
      }

      logger.info("Landing page analytics updated", {
        pageId: id,
        userId: req.user.id,
      });

      res.json({
        success: true,
        message: "Analytics updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      logger.error("Update landing page analytics error:", error);
      next(error);
    }
  },
);

// Get landing page templates
router.get("/landing-pages/templates", async (req, res, next) => {
  try {
    const templates = [
      {
        id: "lead-capture",
        name: "Lead Capture",
        description:
          "High-converting form to capture leads and contact information",
        image: "📋",
        category: "Lead Generation",
        features: [
          "Contact Form",
          "Phone Number Capture",
          "Email Collection",
          "Lead Scoring",
        ],
        estimatedTime: "5-10 minutes",
      },
      {
        id: "webinar-registration",
        name: "Webinar Registration",
        description:
          "Professional webinar signup page with calendar integration",
        image: "🎥",
        category: "Events",
        features: [
          "Calendar Integration",
          "Automated Reminders",
          "Social Sharing",
          "Attendee Tracking",
        ],
        estimatedTime: "8-12 minutes",
      },
      {
        id: "property-showcase",
        name: "Property Showcase",
        description:
          "Beautiful property listing page with image galleries and mortgage calculator",
        image: "🏠",
        category: "Property",
        features: [
          "Image Gallery",
          "Virtual Tour",
          "Mortgage Calculator",
          "Contact Agent",
        ],
        estimatedTime: "10-15 minutes",
      },
      {
        id: "refinance-calculator",
        name: "Refinance Calculator",
        description:
          "Interactive calculator page with personalized refinance options",
        image: "🧮",
        category: "Calculator",
        features: [
          "Interactive Calculator",
          "Rate Comparison",
          "Payment Estimator",
          "Instant Quotes",
        ],
        estimatedTime: "12-18 minutes",
      },
      {
        id: "first-time-buyer",
        name: "First-Time Buyer Guide",
        description:
          "Educational landing page with step-by-step homebuying process",
        image: "📚",
        category: "Education",
        features: [
          "Step-by-Step Guide",
          "Resource Downloads",
          "Checklist",
          "Expert Tips",
        ],
        estimatedTime: "15-20 minutes",
      },
      {
        id: "investment-property",
        name: "Investment Property",
        description:
          "Specialized page for real estate investors with ROI calculator",
        image: "📈",
        category: "Investment",
        features: [
          "ROI Calculator",
          "Market Analysis",
          "Investment Strategies",
          "Portfolio Tracking",
        ],
        estimatedTime: "15-20 minutes",
      },
    ];

    res.json({
      success: true,
      data: templates,
    });
  } catch (error) {
    logger.error("Get templates error:", error);
    next(error);
  }
});

module.exports = router;
