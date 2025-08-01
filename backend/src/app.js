const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
// Importando as rotas
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const processRoutes = require('./routes/processRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// FUNÇÃO DE ROTAS
userRoutes(app);
adminRoutes(app);
processRoutes(app);

// Middleware to serve static files - if needed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/index.html'));
});
app.get("/{*any}", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../src/views/404.html'));
});

module.exports = app;