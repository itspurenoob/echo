const routes = require('./routes/index');
const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = 3000;


// Middleware to parse JSON
app.use(express.json());

// Import all routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
