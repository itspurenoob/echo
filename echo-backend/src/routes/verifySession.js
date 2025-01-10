const express = require('express')
const pool = require('../db/register_db/register_db');  // Import PostgreSQL connection
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/VarifyToken');  // Import the middleware




module.exports = router