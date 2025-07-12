const express = require('express');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.static('src'));
userRoutes(app);
adminRoutes(app);

module.exports = app;