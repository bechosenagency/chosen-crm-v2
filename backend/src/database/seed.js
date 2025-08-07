const { query } = require("../config/database");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

const seedData = async () => {
  try {
    logger.info("Starting database seeding...");

    // Create sample users
    const passwordHash = await bcrypt.hash("password123", 12);

    const users = [
      {
        id: uuidv4(),
        email: "demo@chosen-crm.com",
        password_hash: passwordHash,
        first_name: "John",
        last_name: "Doe",
        phone: "+1-555-0123",
        company: "Demo Mortgage",
        license_number: "LO123456",
        role: "loan_officer",
      },
      {
        id: uuidv4(),
        email: "admin@chosen-crm.com",
        password_hash: passwordHash,
        first_name: "Admin",
        last_name: "User",
        phone: "+1-555-0124",
        company: "ChosenCRM",
        license_number: "AD123456",
        role: "admin",
      },
    ];

    let demoUserId = null;
    let adminUserId = null;

    for (const user of users) {
      try {
        await query(
          `INSERT INTO users (id, email, password_hash, first_name, last_name, phone, company, license_number, role)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            user.id,
            user.email,
            user.password_hash,
            user.first_name,
            user.last_name,
            user.phone,
            user.company,
            user.license_number,
            user.role,
          ],
        );

        // Store the user IDs for later use
        if (user.email === "demo@chosen-crm.com") {
          demoUserId = user.id;
        } else if (user.email === "admin@chosen-crm.com") {
          adminUserId = user.id;
        }
      } catch (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          logger.info(
            `User ${user.email} already exists, getting existing ID...`,
          );

          // Get the existing user ID
          const result = await query("SELECT id FROM users WHERE email = $1", [
            user.email,
          ]);

          if (result.rows.length > 0) {
            if (user.email === "demo@chosen-crm.com") {
              demoUserId = result.rows[0].id;
            } else if (user.email === "admin@chosen-crm.com") {
              adminUserId = result.rows[0].id;
            }
          }
        } else {
          throw error;
        }
      }
    }

    // Create sample lenders
    const lenders = [
      {
        id: uuidv4(),
        name: "Quicken Loans",
        website: "https://www.quickenloans.com",
        phone: "+1-800-QUICKEN",
        email: "rates@quickenloans.com",
        specialties: ["Conventional", "FHA", "VA", "Jumbo"],
      },
      {
        id: uuidv4(),
        name: "Wells Fargo",
        website: "https://www.wellsfargo.com/mortgage",
        phone: "+1-800-WELLS",
        email: "mortgage@wellsfargo.com",
        specialties: ["Conventional", "FHA", "VA", "USDA"],
      },
      {
        id: uuidv4(),
        name: "Chase Bank",
        website: "https://www.chase.com/mortgage",
        phone: "+1-800-CHASE",
        email: "mortgage@chase.com",
        specialties: ["Conventional", "FHA", "VA"],
      },
      {
        id: uuidv4(),
        name: "Bank of America",
        website: "https://www.bankofamerica.com/mortgage",
        phone: "+1-800-BANK",
        email: "mortgage@bankofamerica.com",
        specialties: ["Conventional", "FHA", "VA", "Jumbo"],
      },
      {
        id: uuidv4(),
        name: "Rocket Mortgage",
        website: "https://www.rocketmortgage.com",
        phone: "+1-800-ROCKET",
        email: "rates@rocketmortgage.com",
        specialties: ["Conventional", "FHA", "VA", "Jumbo"],
      },
    ];

    const lenderIds = [];

    for (const lender of lenders) {
      try {
        await query(
          `INSERT INTO lenders (id, name, website, phone, email, specialties)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            lender.id,
            lender.name,
            lender.website,
            lender.phone,
            lender.email,
            lender.specialties,
          ],
        );
        lenderIds.push(lender.id);
      } catch (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          logger.info(
            `Lender ${lender.name} already exists, getting existing ID...`,
          );

          // Get the existing lender ID
          const result = await query("SELECT id FROM lenders WHERE name = $1", [
            lender.name,
          ]);

          if (result.rows.length > 0) {
            lenderIds.push(result.rows[0].id);
          }
        } else {
          throw error;
        }
      }
    }

    // Create sample lender rates
    const lenderRates = [
      // Quicken Loans rates
      {
        lender_id: lenderIds[0],
        loan_type: "conventional",
        property_type: "single_family",
        state: "CA",
        rate: 6.25,
        points: 0.0,
        min_credit_score: 620,
        max_ltv: 95.0,
        min_loan_amount: 100000,
        max_loan_amount: 1500000,
        turn_time_days: 21,
        program_name: "Conventional Fixed Rate",
      },
      {
        lender_id: lenderIds[0],
        loan_type: "fha",
        property_type: "single_family",
        state: "CA",
        rate: 6.125,
        points: 0.0,
        min_credit_score: 580,
        max_ltv: 96.5,
        min_loan_amount: 100000,
        max_loan_amount: 1000000,
        turn_time_days: 25,
        program_name: "FHA Fixed Rate",
      },
      // Wells Fargo rates
      {
        lender_id: lenderIds[1],
        loan_type: "conventional",
        property_type: "single_family",
        state: "CA",
        rate: 6.375,
        points: 0.125,
        min_credit_score: 640,
        max_ltv: 90.0,
        min_loan_amount: 100000,
        max_loan_amount: 1200000,
        turn_time_days: 30,
        program_name: "Conventional Fixed Rate",
      },
      {
        lender_id: lenderIds[1],
        loan_type: "va",
        property_type: "single_family",
        state: "CA",
        rate: 5.875,
        points: 0.0,
        min_credit_score: 620,
        max_ltv: 100.0,
        min_loan_amount: 100000,
        max_loan_amount: 1500000,
        turn_time_days: 28,
        program_name: "VA Fixed Rate",
      },
      // Chase Bank rates
      {
        lender_id: lenderIds[2],
        loan_type: "conventional",
        property_type: "single_family",
        state: "CA",
        rate: 6.5,
        points: 0.0,
        min_credit_score: 660,
        max_ltv: 85.0,
        min_loan_amount: 100000,
        max_loan_amount: 1000000,
        turn_time_days: 35,
        program_name: "Conventional Fixed Rate",
      },
      // Bank of America rates
      {
        lender_id: lenderIds[3],
        loan_type: "conventional",
        property_type: "single_family",
        state: "CA",
        rate: 6.625,
        points: 0.25,
        min_credit_score: 680,
        max_ltv: 80.0,
        min_loan_amount: 100000,
        max_loan_amount: 800000,
        turn_time_days: 40,
        program_name: "Conventional Fixed Rate",
      },
      // Rocket Mortgage rates
      {
        lender_id: lenderIds[4],
        loan_type: "conventional",
        property_type: "single_family",
        state: "CA",
        rate: 6.125,
        points: 0.0,
        min_credit_score: 620,
        max_ltv: 95.0,
        min_loan_amount: 100000,
        max_loan_amount: 1500000,
        turn_time_days: 18,
        program_name: "Conventional Fixed Rate",
      },
    ];

    for (const rate of lenderRates) {
      try {
        await query(
          `INSERT INTO lender_rates (lender_id, loan_type, property_type, state, rate, points, min_credit_score, max_ltv, min_loan_amount, max_loan_amount, turn_time_days, program_name)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            rate.lender_id,
            rate.loan_type,
            rate.property_type,
            rate.state,
            rate.rate,
            rate.points,
            rate.min_credit_score,
            rate.max_ltv,
            rate.min_loan_amount,
            rate.max_loan_amount,
            rate.turn_time_days,
            rate.program_name,
          ],
        );
      } catch (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          logger.info(
            `Rate for lender ${rate.lender_id} already exists, skipping...`,
          );
        } else {
          throw error;
        }
      }
    }

    // Create sample leads for demo user (only if demo user exists)
    if (demoUserId) {
      const sampleLeads = [
        {
          id: uuidv4(),
          user_id: demoUserId,
          first_name: "Sarah",
          last_name: "Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1-555-0101",
          source: "Website",
          status: "new",
          notes: "Interested in refinancing, credit score around 720",
        },
        {
          id: uuidv4(),
          user_id: demoUserId,
          first_name: "Michael",
          last_name: "Chen",
          email: "michael.chen@email.com",
          phone: "+1-555-0102",
          source: "Referral",
          status: "contacted",
          notes: "First-time homebuyer, looking for FHA loan",
        },
        {
          id: uuidv4(),
          user_id: demoUserId,
          first_name: "Emily",
          last_name: "Rodriguez",
          email: "emily.rodriguez@email.com",
          phone: "+1-555-0103",
          source: "Social Media",
          status: "qualified",
          notes: "VA loan eligible, military veteran",
        },
        {
          id: uuidv4(),
          user_id: demoUserId,
          first_name: "David",
          last_name: "Thompson",
          email: "david.thompson@email.com",
          phone: "+1-555-0104",
          source: "Website",
          status: "application",
          notes: "Conventional loan, excellent credit",
        },
      ];

      const leadIds = [];

      for (const lead of sampleLeads) {
        try {
          await query(
            `INSERT INTO leads (id, user_id, first_name, last_name, email, phone, source, status, notes)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              lead.id,
              lead.user_id,
              lead.first_name,
              lead.last_name,
              lead.email,
              lead.phone,
              lead.source,
              lead.status,
              lead.notes,
            ],
          );
          leadIds.push(lead.id);
        } catch (error) {
          if (error.code === "23505") {
            // Unique constraint violation
            logger.info(
              `Lead ${lead.first_name} ${lead.last_name} already exists, skipping...`,
            );
          } else {
            throw error;
          }
        }
      }

      // Create sample activities
      const sampleActivities = [
        {
          id: uuidv4(),
          user_id: demoUserId,
          lead_id: leadIds[0],
          type: "call",
          description: "Initial contact call - discussed refinancing options",
        },
        {
          id: uuidv4(),
          user_id: demoUserId,
          lead_id: leadIds[1],
          type: "email",
          description: "Sent FHA loan information and pre-qualification form",
        },
        {
          id: uuidv4(),
          user_id: demoUserId,
          lead_id: leadIds[2],
          type: "meeting",
          description: "Scheduled consultation for VA loan application",
        },
      ];

      for (const activity of sampleActivities) {
        try {
          await query(
            `INSERT INTO activities (id, user_id, lead_id, type, description)
             VALUES ($1, $2, $3, $4, $5)`,
            [
              activity.id,
              activity.user_id,
              activity.lead_id,
              activity.type,
              activity.description,
            ],
          );
        } catch (error) {
          if (error.code === "23505") {
            // Unique constraint violation
            logger.info(`Activity already exists, skipping...`);
          } else {
            throw error;
          }
        }
      }

      // Create sample scenarios
      const sampleScenarios = [
        {
          id: uuidv4(),
          user_id: demoUserId,
          credit_score: 720,
          loan_amount: 500000,
          property_type: "single_family",
          loan_type: "conventional",
          down_payment: 100000,
          state: "CA",
          occupancy: "primary",
          dti: 35.5,
        },
        {
          id: uuidv4(),
          user_id: demoUserId,
          credit_score: 680,
          loan_amount: 350000,
          property_type: "single_family",
          loan_type: "fha",
          down_payment: 12250,
          state: "CA",
          occupancy: "primary",
          dti: 42.0,
        },
      ];

      for (const scenario of sampleScenarios) {
        try {
          await query(
            `INSERT INTO scenarios (id, user_id, credit_score, loan_amount, property_type, loan_type, down_payment, state, occupancy, dti)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
              scenario.id,
              scenario.user_id,
              scenario.credit_score,
              scenario.loan_amount,
              scenario.property_type,
              scenario.loan_type,
              scenario.down_payment,
              scenario.state,
              scenario.occupancy,
              scenario.dti,
            ],
          );
        } catch (error) {
          if (error.code === "23505") {
            // Unique constraint violation
            logger.info(`Scenario already exists, skipping...`);
          } else {
            throw error;
          }
        }
      }
    }

    logger.info("Database seeding completed successfully");
    logger.info("Sample data created:");
    logger.info("- 2 users (demo@chosen-crm.com, admin@chosen-crm.com)");
    logger.info("- 5 lenders with sample rates");
    if (demoUserId) {
      logger.info("- 4 sample leads for demo user");
      logger.info("- 3 sample activities");
      logger.info("- 2 sample scenarios");
    }
    logger.info("Default password for all users: password123");
  } catch (error) {
    logger.error("Database seeding failed:", error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData()
    .then(() => {
      logger.info("Seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Seeding failed:", error);
      process.exit(1);
    });
}

module.exports = { seedData };
