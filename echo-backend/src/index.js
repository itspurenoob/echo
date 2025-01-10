const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const PORT = 3000;
const cookieParser = require('cookie-parser');
// Define allowed frontend URLs
const allowedFrontendUrls = ["https://echo-oih3.onrender.com", "https://itsechos.web.app"];

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedFrontendUrls.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
};

// Initialize Express app
const app = express();

// Enable CORS with the specified options
app.use(cookieParser());
app.use(cors(corsOptions));

// Security headers using Helmet
app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "script-src": ["'self'", "https://trusted.cdn.com"], // Example for whitelisting trusted sources
            },
        },
        crossOriginEmbedderPolicy: true, // Enforce COEP
        crossOriginOpenerPolicy: { policy: 'same-origin' }, // Enforce COOP
    })
);

// Middleware to parse JSON
app.use(express.json());

// Import all routes
app.use(routes);

// Example POST route
app.post("/api", (req, res) => {
    res.send({ message: "POST request received" });
});

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Echo API! You thought this would change your life, didn't you?",
    version: "1.0.0",
    status: "online",
    serverTime: new Date().toISOString(),
    uptime: process.uptime(),
    features: {
      chat: true,
      voice: false,
      fileUpload: true,
    },
    userCount: 1423,
    fakeData: {
      trollMessage: "Congrats! You've just spent 30 seconds reading this message. Nothing changes. You're still the same person you were before you clicked.",
      existentialCrisis: "Life's short, you know? You're here reading some random API response. Have you ever wondered if your existence really matters, or if you're just passing time until the inevitable end? Maybe nothing you do will leave a mark on the universe. But hey, at least you're not alone in that. Welcome to the club.",
      easterEgg: "But in the grand scheme of things, does it really matter? This 'secret' will fade from your memory, and you'll be back to living your regular life. Isn't that comforting?",
    },
    success: true,
  });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
