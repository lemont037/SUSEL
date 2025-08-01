const processController = require('../controllers/processController');
const authenticateToken = require('../middlewares/authMiddleware');

// Em vez de usar um router, exportamos uma função que anexa as rotas ao 'app'
module.exports = (app) => {
    
    // Adicionamos o prefixo '/api' aqui para manter as URLs organizadas
    app.get(
        '/api/process/:pid', 
        authenticateToken, 
        processController.getProcessByIdForUser
    );

};