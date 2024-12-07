const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://echo_0t3b_user:aY0AWCuAkHKSnnxnJnJsafpU77tpz6Gb@dpg-ct8774rv2p9s73d75s60-a.singapore-postgres.render.com/echo_0t3b",
  ssl: {
    rejectUnauthorized: false, // Render's PostgreSQL uses SSL by default
  },
});

module.exports = pool;
