require('dotenv').config();

const config = {
    port: process.env.PORT || 3001,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/susel',
};

module.exports = config;