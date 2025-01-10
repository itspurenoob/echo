const express = require('express')
const pool = require('../db/register_db/register_db');  // Import PostgreSQL connection
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/VarifyToken');  // Import the middleware


// Function to find a user by username or email
async function findUser(query) {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2', 
      [query, query]  // The query will be checked for both username and email
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]);
      return result.rows[0];  // Return the first matched row (user)
    } else {
      console.log('User not found');
      return null;  // Return null if no user is found
    }
  } catch (error) {
    console.error('Error finding user:', error);
  }
}

// Example usage


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser(username);

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const token = jwt.sign(
    { userId: user.authtoken },  // Include any data you need in the token payload
    `${process.env.JWT_SECRET}`,  // Secret key for signing the token
    { expiresIn: '200y' }  // Token expiration (you can adjust this)
  );
    // Set token in an HTTP-only cookie
  res.cookie('authToken', token, {
    httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
    secure: true,  // Ensure cookie is only sent over HTTPS in production
    sameSite: 'Strict',  // Protects against cross-site request forgery (CSRF)
    maxAge: 1000 * 60 * 60 * 24 * 365 * 200,  // Set expiration for 1 year (adjustable)
  });

  res.json({
    message: 'Login successful',
    isLoggedIn: true,
  });
});

// Example of a protected route
router.get('/protected', verifyToken, (req, res) => {
  // If the token is valid, the `req.user` will have the decoded JWT data
  res.json({
    message: 'This is a protected route',
    user: req.user // You can access user info from the token here
  });
});

module.exports = router