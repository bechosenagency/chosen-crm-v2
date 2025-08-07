const { Pool } = require("pg");
const logger = require("../utils/logger");

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "chosen_crm",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on("error", (err) => {
  logger.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    logger.info("Database connection established successfully");
    client.release();
  } catch (err) {
    logger.error("Database connection failed:", err);
    throw err;
  }
};

// Execute query with error handling
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    logger.error("Query execution failed:", {
      text,
      params,
      error: err.message,
    });
    throw err;
  }
};

// Get client for transactions
const getClient = async () => {
  return await pool.connect();
};

module.exports = {
  pool,
  query,
  getClient,
  testConnection,
};
