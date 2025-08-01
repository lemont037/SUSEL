const processController = require('../controllers/processController');
const authenticateToken = require('../middlewares/authMiddleware');

module.exports = (app) => {
    /**
     * @swagger
     * tags:
     * name: Processes
     * description: Endpoints para visualização de processos por usuários.
     */

    /**
     * @swagger
     * /api/process/{pid}:
     * get:
     * summary: Retorna os detalhes de um processo específico para o usuário logado.
     * tags: [Processes]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: pid
     * schema:
     * type: string
     * required: true
     * description: ID do processo a ser visualizado.
     * responses:
     * 200:
     * description: Detalhes do processo.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * _id:
     * type: string
     * title:
     * type: string
     * description:
     * type: string
     * status:
     * type: string
     * files:
     * type: array
     * items:
     * type: object
     * properties:
     * fileName:
     * type: string
     * filePath:
     * type: string
     * 401:
     * description: Não autorizado. Token inválido ou ausente.
     * 404:
     * description: Processo não encontrado ou não acessível pelo usuário.
     * 500:
     * description: Erro interno do servidor.
     */
    app.get(
        '/api/process/:pid',
        authenticateToken,
        processController.getProcessByIdForUser
    );
};