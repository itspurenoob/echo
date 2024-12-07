const express = require('express');
const app = express();
const helmet = require('helmet');
const PORT = 3000;
const routes = require('./routes/index');

app.use((req, res, next) => {
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
    res.send('yo')
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
