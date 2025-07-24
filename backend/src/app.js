const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser())

userRoutes(app);
adminRoutes(app);

// Middleware to serve static files - if needed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/index.html'));
});
app.get("/{*any}", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../src/views/404.html'));
});

module.exports = app;