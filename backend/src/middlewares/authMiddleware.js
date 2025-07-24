const jwt = require('jsonwebtoken')
const config = require('../config/config')

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    console.log("Verificando Token da Requisição...")

    if (!token) {
        return res.status(401).json({message: "Token ausente ou inválido"})
    }

    jwt.verify(token, config.jwtsecret, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                console.error("Erro ao verificar o Token: Token Expirado.")
                return res.status(401).json({message: "Token expirado"})
            }

            console.error("Erro ao verificar o Token: ", err.message)
            return res.status(403).json({message: "Token inválido"})
        }

        req.user = decoded

        console.log("Token Verificado! Payload: ", decoded)

        next()
    })
}

module.exports = authenticateToken;