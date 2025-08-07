const { query, testConnection } = require("../config/database");
const logger = require("../utils/logger");

const createTables = async () => {
  try {
    // Test database connection
    await testConnection();
    logger.info("Database connection successful, starting migrations...");

    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        license_number VARCHAR(100),
        role VARCHAR(50) DEFAULT 'loan_officer',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create refresh_tokens table
    await query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(500) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create leads table
    await query(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        source VARCHAR(100),
        status VARCHAR(50) DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create contacts table
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        company VARCHAR(255),
        title VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create activities table
    await query(`
      CREATE TABLE IF NOT EXISTS activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        scheduled_at TIMESTAMP,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create deals table
    await query(`
      CREATE TABLE IF NOT EXISTS deals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        client_name VARCHAR(255) NOT NULL,
        loan_amount DECIMAL(15,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        priority VARCHAR(20) DEFAULT 'medium',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create lenders table
    await query(`
      CREATE TABLE IF NOT EXISTS lenders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        phone VARCHAR(20),
        email VARCHAR(255),
        specialties TEXT[],
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create lender_rates table
    await query(`
      CREATE TABLE IF NOT EXISTS lender_rates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        lender_id UUID REFERENCES lenders(id) ON DELETE CASCADE,
        loan_type VARCHAR(50) NOT NULL,
        property_type VARCHAR(50) NOT NULL,
        state VARCHAR(2) NOT NULL,
        rate DECIMAL(5,3) NOT NULL,
        points DECIMAL(5,2) DEFAULT 0,
        min_credit_score INTEGER,
        max_ltv DECIMAL(5,2),
        min_loan_amount DECIMAL(15,2),
        max_loan_amount DECIMAL(15,2),
        turn_time_days INTEGER,
        program_name VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create scenarios table
    await query(`
      CREATE TABLE IF NOT EXISTS scenarios (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        credit_score INTEGER NOT NULL,
        loan_amount DECIMAL(15,2) NOT NULL,
        property_type VARCHAR(50) NOT NULL,
        loan_type VARCHAR(50) NOT NULL,
        down_payment DECIMAL(15,2) NOT NULL,
        state VARCHAR(2) NOT NULL,
        occupancy VARCHAR(50) NOT NULL,
        dti DECIMAL(5,2),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create lender_favorites table
    await query(`
      CREATE TABLE IF NOT EXISTS lender_favorites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        lender_id UUID REFERENCES lenders(id) ON DELETE CASCADE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, lender_id)
      )
    `);

    // Create user_settings table
    await query(`
      CREATE TABLE IF NOT EXISTS user_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        notifications_enabled BOOLEAN DEFAULT true,
        email_notifications BOOLEAN DEFAULT true,
        sms_notifications BOOLEAN DEFAULT false,
        timezone VARCHAR(50) DEFAULT 'America/New_York',
        language VARCHAR(10) DEFAULT 'en',
        theme VARCHAR(10) DEFAULT 'dark',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id)
      )
    `);

    // Create indexes for better performance
    await query("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)");
    await query(
      "CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id)",
    );
    await query("CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)");
    await query(
      "CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_activities_lead_id ON activities(lead_id)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_deals_user_id ON deals(user_id)",
    );
    await query("CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status)");
    await query(
      "CREATE INDEX IF NOT EXISTS idx_lender_rates_lender_id ON lender_rates(lender_id)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_lender_rates_loan_type ON lender_rates(loan_type)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_scenarios_user_id ON scenarios(user_id)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id)",
    );

    // Create events table
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        type VARCHAR(50) NOT NULL,
        description TEXT,
        contact VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create indexes for events
    await query(
      "CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id)",
    );
    await query("CREATE INDEX IF NOT EXISTS idx_events_date ON events(date)");
    await query("CREATE INDEX IF NOT EXISTS idx_events_type ON events(type)");

    // Create landing_pages table
    await query(`
      CREATE TABLE IF NOT EXISTS landing_pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        template VARCHAR(100) NOT NULL,
        status VARCHAR(20) DEFAULT 'draft',
        settings JSONB,
        components JSONB,
        component_data JSONB,
        url_slug VARCHAR(255) UNIQUE,
        views INTEGER DEFAULT 0,
        conversions INTEGER DEFAULT 0,
        conversion_rate DECIMAL(5,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create indexes for landing pages
    await query(
      "CREATE INDEX IF NOT EXISTS idx_landing_pages_user_id ON landing_pages(user_id)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_landing_pages_status ON landing_pages(status)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_landing_pages_template ON landing_pages(template)",
    );
    await query(
      "CREATE INDEX IF NOT EXISTS idx_landing_pages_url_slug ON landing_pages(url_slug)",
    );

    logger.info("Database migration completed successfully");
  } catch (error) {
    logger.error("Database migration failed:", error);
    throw error;
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  createTables()
    .then(() => {
      logger.info("Migration completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Migration failed:", error);
      process.exit(1);
    });
}

module.exports = { createTables };
