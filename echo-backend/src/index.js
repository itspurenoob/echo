const express = require('express');
const app = express();
const helmet = require('helmet');
const PORT = 3000;
const routes = require('./routes/index');

const allowedFrontendUrl = "https://echo-oih3.onrender.com";

app.use((req, res, next) => {
    // Check if the request comes from the allowed frontend URL
    if (req.headers.origin === allowedFrontendUrl) {
        res.setHeader('Access-Control-Allow-Origin', allowedFrontendUrl);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(
    helmet({
        directives: {
            reportTo: "self", // or your own reporting mechanism
            "worker-src": "'self'", // you can define worker source policy
        },
    })
);

// Middleware to parse JSON
app.use(express.json());

// Import all routes
app.use(routes);

app.post("/app", (req, res) => {
    res.send({ message: "post request" });
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
