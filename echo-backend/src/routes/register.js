const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const pool = require('../db/register_db/register_db');  // Import PostgreSQL connection
const router = express.Router();

const rateLimit = require('express-rate-limit');

// const registerLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit to 5 requests per IP
//   message: 'Too many registration attempts, please try again later.',
// });

// generate 10 random chars
function generateRandomChars() {
  return crypto.randomBytes(5).toString('hex'); // 5 bytes = 10 characters
}


// Registration endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const randomChars = generateRandomChars();

  // Check if the user already exists
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const authtoken = `${randomChars}.${hashedPassword}`

    // Insert the new user into the database
    await pool.query('INSERT INTO users (username, email, password,authtoken) VALUES ($1, $2, $3,$4)', [username, email, hashedPassword,authtoken]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
