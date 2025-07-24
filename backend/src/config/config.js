require('dotenv').config();

const config = {
    port: process.env.PORT || 3001,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/susel',
    jwtsecret: process.env.JWT_SECRET,
    jwtrefreshsecret: process.env.JWT_REFRESH_SECRET,
    jwtexpires: process.env.JWT_EXPIRES_IN || '1m'
};

module.exports = config;