const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.internal_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Render's PostgreSQL uses SSL by default
  },
});

module.exports = pool;
