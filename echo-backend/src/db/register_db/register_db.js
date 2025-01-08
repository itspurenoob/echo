const { Pool } = require('pg');
require('dotenv').config();
// Replace with your Supabase credentials
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Ensure this is your Supabase connection string
  ssl: {
    rejectUnauthorized: false,  // This option allows the connection to proceed despite SSL certificate issues
  },
});

pool.connect()
  .then(() => console.log('Connected to the database successfully!'))
  .catch(err => console.error('Database connection error:', err.stack));

module.exports = pool;
