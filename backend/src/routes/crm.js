const express = require("express");
const { body, validationResult, query } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const { query: dbQuery } = require("../config/database");
const { verifyToken, requireRole } = require("../middleware/auth");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

const router = express.Router();

// Apply authentication to all CRM routes
router.use(verifyToken);

// Validation middleware
const validateLead = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name is required"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name is required"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phone")
    .optional()
    .trim()
    .custom((value) => {
      if (!value) return true; // Allow empty phone numbers
      // More flexible phone validation - allow common formats
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
        throw new Error("Invalid phone number format");
      }
      return true;
    }),
  body("source").optional().trim(),
  body("notes").optional().trim(),
  body("status")
    .isIn([
      "new",
      "contacted",
      "qualified",
      "application",
      "approved",
      "closed",
      "lost",
    ])
    .withMessage("Invalid status"),
];

const validateContact = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name is required"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name is required"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("company").optional().trim(),
  body("title").optional().trim(),
  body("notes").optional().trim(),
];

const validateDeal = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("clientName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Client name is required"),
  body("loanAmount").isNumeric().withMessage("Loan amount must be a number"),
  body("status")
    .isIn(["new", "application", "processing", "approved", "closed"])
    .withMessage("Invalid status"),
  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  body("notes").optional().trim(),
];

// Get all leads for current user
router.get("/leads", async (req, res, next) => {
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
      whereClause += ` AND (first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount} OR email ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    // Get leads with pagination
    const leadsResult = await dbQuery(
      `SELECT id, first_name, last_name, email, phone, source, status, notes, created_at, updated_at
       FROM leads ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`,
      [...params, limit, offset],
    );

    // Get total count
    const countResult = await dbQuery(
      `SELECT COUNT(*) as total FROM leads ${whereClause}`,
      params,
    );

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        leads: leadsResult.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    logger.error("Get leads error:", error);
    next(error);
  }
});

// Create new lead
router.post("/leads", validateLead, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, phone, source, notes, status } =
      req.body;
    const leadId = uuidv4();

    const result = await dbQuery(
      `INSERT INTO leads (id, user_id, first_name, last_name, email, phone, source, notes, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
       RETURNING *`,
      [
        leadId,
        req.user.id,
        firstName,
        lastName,
        email,
        phone,
        source,
        notes,
        status || "new",
      ],
    );

    logger.info("Lead created successfully", { leadId, userId: req.user.id });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Create lead error:", error);
    next(error);
  }
});

// Get lead by ID
router.get("/leads/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "SELECT * FROM leads WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Lead not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Get lead error:", error);
    next(error);
  }
});

// Update lead
router.put("/leads/:id", validateLead, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { firstName, lastName, email, phone, source, notes, status } =
      req.body;

    const result = await dbQuery(
      `UPDATE leads 
       SET first_name = $1, last_name = $2, email = $3, phone = $4, source = $5, notes = $6, status = $7, updated_at = NOW()
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
      [
        firstName,
        lastName,
        email,
        phone,
        source,
        notes,
        status,
        id,
        req.user.id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Lead not found",
      });
    }

    logger.info("Lead updated successfully", {
      leadId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Lead updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Update lead error:", error);
    next(error);
  }
});

// Delete lead
router.delete("/leads/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "DELETE FROM leads WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Lead not found",
      });
    }

    logger.info("Lead deleted successfully", {
      leadId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    logger.error("Delete lead error:", error);
    next(error);
  }
});

// Get all deals for current user
router.get("/deals", async (req, res, next) => {
  try {
    const { page = 1, limit = 50, status, search } = req.query;
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
      whereClause += ` AND (title ILIKE $${paramCount} OR client_name ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    // Get deals with pagination
    const dealsResult = await dbQuery(
      `SELECT id, title, client_name, loan_amount, status, priority, notes, created_at, updated_at
       FROM deals ${whereClause}
       ORDER BY updated_at DESC
       LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`,
      [...params, limit, offset],
    );

    // Get total count
    const countResult = await dbQuery(
      `SELECT COUNT(*) as total FROM deals ${whereClause}`,
      params,
    );

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        deals: dealsResult.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    logger.error("Get deals error:", error);
    next(error);
  }
});

// Create new deal
router.post("/deals", validateDeal, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, clientName, loanAmount, status, priority, notes } = req.body;
    const dealId = uuidv4();

    const result = await dbQuery(
      `INSERT INTO deals (id, user_id, title, client_name, loan_amount, status, priority, notes, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       RETURNING *`,
      [
        dealId,
        req.user.id,
        title,
        clientName,
        loanAmount,
        status || "new",
        priority || "medium",
        notes,
      ],
    );

    logger.info("Deal created successfully", { dealId, userId: req.user.id });

    res.status(201).json({
      success: true,
      message: "Deal created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Create deal error:", error);
    next(error);
  }
});

// Get deal by ID
router.get("/deals/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "SELECT * FROM deals WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Deal not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Get deal error:", error);
    next(error);
  }
});

// Update deal
router.put("/deals/:id", validateDeal, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { title, clientName, loanAmount, status, priority, notes } = req.body;

    const result = await dbQuery(
      `UPDATE deals 
       SET title = $1, client_name = $2, loan_amount = $3, status = $4, priority = $5, notes = $6, updated_at = NOW()
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [title, clientName, loanAmount, status, priority, notes, id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Deal not found",
      });
    }

    logger.info("Deal updated successfully", {
      dealId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Deal updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Update deal error:", error);
    next(error);
  }
});

// Delete deal
router.delete("/deals/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "DELETE FROM deals WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Deal not found",
      });
    }

    logger.info("Deal deleted successfully", {
      dealId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Deal deleted successfully",
    });
  } catch (error) {
    logger.error("Delete deal error:", error);
    next(error);
  }
});

// Get pipeline statistics
router.get("/pipeline", async (req, res, next) => {
  try {
    const result = await dbQuery(
      `SELECT status, COUNT(*) as count
       FROM leads 
       WHERE user_id = $1
       GROUP BY status`,
      [req.user.id],
    );

    const pipeline = {
      new: 0,
      contacted: 0,
      qualified: 0,
      application: 0,
      approved: 0,
      closed: 0,
      lost: 0,
    };

    result.rows.forEach((row) => {
      pipeline[row.status] = parseInt(row.count);
    });

    res.json({
      success: true,
      data: pipeline,
    });
  } catch (error) {
    logger.error("Get pipeline error:", error);
    next(error);
  }
});

// Get contacts
router.get("/contacts", async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = "WHERE user_id = $1";
    let params = [req.user.id];

    if (search) {
      whereClause +=
        " AND (first_name ILIKE $2 OR last_name ILIKE $2 OR email ILIKE $2 OR company ILIKE $2)";
      params.push(`%${search}%`);
    }

    const result = await dbQuery(
      `SELECT * FROM contacts ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, limit, offset],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    logger.error("Get contacts error:", error);
    next(error);
  }
});

// Create contact
router.post("/contacts", validateContact, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, phone, company, title, notes } =
      req.body;
    const contactId = uuidv4();

    const result = await dbQuery(
      `INSERT INTO contacts (id, user_id, first_name, last_name, email, phone, company, title, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       RETURNING *`,
      [
        contactId,
        req.user.id,
        firstName,
        lastName,
        email,
        phone,
        company,
        title,
        notes,
      ],
    );

    logger.info("Contact created successfully", {
      contactId,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Create contact error:", error);
    next(error);
  }
});

// Get contact by ID
router.get("/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "SELECT * FROM contacts WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Get contact error:", error);
    next(error);
  }
});

// Update contact
router.put("/contacts/:id", validateContact, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { firstName, lastName, email, phone, company, title, notes } =
      req.body;

    const result = await dbQuery(
      `UPDATE contacts 
       SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5, title = $6, notes = $7, updated_at = NOW()
       WHERE id = $8 AND user_id = $9
       RETURNING *`,
      [
        firstName,
        lastName,
        email,
        phone,
        company,
        title,
        notes,
        id,
        req.user.id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }

    logger.info("Contact updated successfully", {
      contactId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Contact updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Update contact error:", error);
    next(error);
  }
});

// Delete contact
router.delete("/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }

    logger.info("Contact deleted successfully", {
      contactId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    logger.error("Delete contact error:", error);
    next(error);
  }
});

// Calendar Events endpoints

// Validation middleware for events
const validateEvent = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("time").trim().isLength({ min: 1 }).withMessage("Time is required"),
  body("type")
    .isIn(["meeting", "call", "appointment", "follow-up", "closing"])
    .withMessage("Invalid event type"),
  body("description").optional().trim(),
  body("contact").optional().trim(),
];

// Get all events for current user
router.get("/events", async (req, res, next) => {
  try {
    const { page = 1, limit = 100, startDate, endDate, type } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM events WHERE user_id = $1";
    const params = [req.user.id];
    let paramIndex = 2;

    if (startDate) {
      query += ` AND date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      query += ` AND date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    if (type) {
      query += ` AND type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    query +=
      " ORDER BY date ASC, time ASC LIMIT $" +
      paramIndex +
      " OFFSET $" +
      (paramIndex + 1);
    params.push(limit, offset);

    const result = await dbQuery(query, params);

    // Get total count for pagination
    let countQuery = "SELECT COUNT(*) FROM events WHERE user_id = $1";
    const countParams = [req.user.id];
    let countParamIndex = 2;

    if (startDate) {
      countQuery += ` AND date >= $${countParamIndex}`;
      countParams.push(startDate);
      countParamIndex++;
    }

    if (endDate) {
      countQuery += ` AND date <= $${countParamIndex}`;
      countParams.push(endDate);
      countParamIndex++;
    }

    if (type) {
      countQuery += ` AND type = $${countParamIndex}`;
      countParams.push(type);
      countParamIndex++;
    }

    const countResult = await dbQuery(countQuery, countParams);
    const totalCount = parseInt(countResult.rows[0].count);

    logger.info("Events fetched successfully", {
      userId: req.user.id,
      count: result.rows.length,
    });

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    logger.error("Get events error:", error);
    next(error);
  }
});

// Create new event
router.post("/events", validateEvent, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, date, time, type, description, contact } = req.body;
    const eventId = uuidv4();

    const result = await dbQuery(
      `INSERT INTO events (id, user_id, title, date, time, type, description, contact, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [eventId, req.user.id, title, date, time, type, description, contact],
    );

    logger.info("Event created successfully", { eventId, userId: req.user.id });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Create event error:", error);
    next(error);
  }
});

// Get event by ID
router.get("/events/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "SELECT * FROM events WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Get event error:", error);
    next(error);
  }
});

// Update event
router.put("/events/:id", validateEvent, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { title, date, time, type, description, contact } = req.body;

    const result = await dbQuery(
      `UPDATE events 
       SET title = $1, date = $2, time = $3, type = $4, description = $5, contact = $6, updated_at = NOW()
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [title, date, time, type, description, contact, id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    logger.info("Event updated successfully", {
      eventId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Event updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    logger.error("Update event error:", error);
    next(error);
  }
});

// Delete event
router.delete("/events/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      "DELETE FROM events WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    logger.info("Event deleted successfully", {
      eventId: id,
      userId: req.user.id,
    });

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    logger.error("Delete event error:", error);
    next(error);
  }
});

// Get activities for a lead
router.get("/leads/:id/activities", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await dbQuery(
      `SELECT * FROM activities 
       WHERE lead_id = $1 AND user_id = $2
       ORDER BY created_at DESC`,
      [id, req.user.id],
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    logger.error("Get activities error:", error);
    next(error);
  }
});

// Add activity to lead
router.post(
  "/leads/:id/activities",
  [
    body("type")
      .isIn(["call", "email", "meeting", "note", "task"])
      .withMessage("Invalid activity type"),
    body("description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Description is required"),
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
      const { type, description, scheduledAt } = req.body;
      const activityId = uuidv4();

      const result = await dbQuery(
        `INSERT INTO activities (id, user_id, lead_id, type, description, scheduled_at, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
        [activityId, req.user.id, id, type, description, scheduledAt],
      );

      logger.info("Activity created successfully", {
        activityId,
        leadId: id,
        userId: req.user.id,
      });

      res.status(201).json({
        success: true,
        message: "Activity created successfully",
        data: result.rows[0],
      });
    } catch (error) {
      logger.error("Create activity error:", error);
      next(error);
    }
  },
);

module.exports = router;
