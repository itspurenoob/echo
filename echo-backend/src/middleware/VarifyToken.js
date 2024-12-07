const jwt = require('jsonwebtoken');

// JWT verification middleware
function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Secret should be in your environment variables
    req.user = decoded;  // Add decoded token data to the request object
    next();  // Move to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token' });
  }
}

module.exports = verifyToken