const jwt = require('jsonwebtoken')
const config = require('../config/config')

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    console.log("Cookie recebido: ", req.cookies);
    console.log("Token extraído: ", token)

    if (!token) {
        return res.status(401).json({message: "Token ausente ou inválido"})
    }

    jwt.verify(token, config.jwtsecret, (err, decoded) => {
        if (err) return res.status(403).json({message: "Token inválido ou expirado"})
        
        req.user = decoded

        console.log("Token Verificado! Payload: ", decoded)

        next()
    })
}

module.exports = authenticateToken;