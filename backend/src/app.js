const express = require('express');

const app = express();

app.use((req, res) => {
    res.status(200).send('Test successful!');
});

module.exports = app;