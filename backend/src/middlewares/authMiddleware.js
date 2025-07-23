const jwt = require('jsonwebtoken')
const config = require('../config/config')

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: "Token ausente ou inválido"})
    }

    jwt.verify(token, config.jwtsecret, (err, decoded) => {
        if (err) return res.status(403).json({message: "Token inválido ou expirado"})
        
        req.user = decoded
        next()
    })
}

module.exports = authenticateToken;