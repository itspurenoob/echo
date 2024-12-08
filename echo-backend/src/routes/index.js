const express = require('express');
const router = express.Router();

// Import individual routes
const loginRoutes = require('./login');
const registerRoutes = require('./register');

// Use routes
router.use('/api', loginRoutes);
router.use('/api', registerRoutes);

module.exports = router;
