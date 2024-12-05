const express = require('express')
const router = express.Router();

// Login route

router.get('/login', (req, res) => {
	res.send("login page");
})

module.exports = router