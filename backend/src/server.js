const http = require('http');
const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');

const server = http.createServer(app);

mongoose.connect(config.mongoURI, {})
.then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});