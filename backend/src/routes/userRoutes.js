const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    /**
     * @swagger
     * tags:
     * name: User
     * description: Gerenciamento de perfil e submissões do usuário
     */

    /**
     * @swagger
     * /u/{uid}:
     * get:
     * summary: Retorna os processos ativos do usuário.
     * tags: [User]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: uid
     * schema:
     * type: string
     * required: true
     * description: ID do usuário.
     * responses:
     * 200:
     * description: Retorna os processos ativos.
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Usuário não encontrado.
     */
    app.get('/u/:uid', authenticateToken, userController.getActiveProcess);

    /**
     * @swagger
     * /u/{uid}/process/{pid}:
     * get:
     * summary: Retorna um processo específico e o status da submissão do usuário.
     * tags: [User]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: uid
     * schema:
     * type: string
     * required: true
     * description: ID do usuário.
     * - in: path
     * name: pid
     * schema:
     * type: string
     * required: true
     * description: ID do processo.
     * responses:
     * 200:
     * description: Detalhes do processo e da submissão do usuário.
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Processo ou usuário não encontrado.
     */
    app.get('/u/:uid/process/:pid', authenticateToken, userController.getUserProcessById);

    /**
     * @swagger
     * /u/{uid}/process/{pid}/submit:
     * post:
     * summary: Envia uma submissão para um processo com documentos.
     * tags: [User]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: uid
     * schema:
     * type: string
     * required: true
     * description: ID do usuário.
     * - in: path
     * name: pid
     * schema:
     * type: string
     * required: true
     * description: ID do processo.
     * requestBody:
     * required: true
     * content:
     * multipart/form-data:
     * schema:
     * type: object
     * properties:
     * documents:
     * type: array
     * items:
     * type: string
     * format: binary
     * description: Lista de documentos a serem enviados.
     * responses:
     * 201:
     * description: Submissão criada com sucesso.
     * 400:
     * description: Erro no upload ou requisição inválida.
     * 401:
     * description: Não autorizado.
     */
    app.post('/u/:uid/process/:pid/submit', authenticateToken, upload.array('documents'), userController.createSubmission);

    /**
     * @swagger
     * /u/{uid}/config:
     * get:
     * summary: Retorna as informações do perfil do usuário.
     * tags: [User]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: uid
     * schema:
     * type: string
     * required: true
     * description: ID do usuário.
     * responses:
     * 200:
     * description: Informações do usuário.
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Usuário não encontrado.
     */
    app.get('/u/:uid/config', authenticateToken, userController.getUserInfo);

    /**
     * @swagger
     * /u/{uid}/config/edit:
     * put:
     * summary: Atualiza as informações do perfil do usuário.
     * tags: [User]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: uid
     * schema:
     * type: string
     * required: true
     * description: ID do usuário.
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * name:
     * type: string
     * email:
     * type: string
     * phone:
     * type: string
     * description: Campos a serem atualizados.
     * responses:
     * 200:
     * description: Usuário atualizado com sucesso.
     * 400:
     * description: Requisição inválida.
     * 401:
     * description: Não autorizado.
     */
    app.put('/u/:uid/config/edit', authenticateToken, userController.updateUserInfo);

    /**
     * @swagger
     * /u/{uid}/config/delete:
     * delete:
     * summary: Deleta a conta de um usuário.
     * tags: [User]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: uid
     * schema:
     * type: string
     * required: true
     * description: ID do usuário a ser deletado.
     * responses:
     * 200:
     * description: Usuário deletado com sucesso.
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Usuário não encontrado.
     */
    app.delete('/u/:uid/config/delete', authenticateToken, userController.deleteUser);

    /**
     * @swagger
     * tags:
     * name: Auth
     * description: Rotas de autenticação e gerenciamento de conta
     */

    /**
     * @swagger
     * /auth/register:
     * post:
     * summary: Cria um novo usuário.
     * tags: [Auth]
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * name:
     * type: string
     * required: true
     * email:
     * type: string
     * required: true
     * password:
     * type: string
     * required: true
     * responses:
     * 201:
     * description: Usuário criado com sucesso.
     * 400:
     * description: Requisição inválida ou usuário já existe.
     */
    app.post('/auth/register', userController.createUser);

    /**
     * @swagger
     * /auth/login:
     * post:
     * summary: Autentica um usuário e retorna um token JWT.
     * tags: [Auth]
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * email:
     * type: string
     * required: true
     * password:
     * type: string
     * required: true
     * responses:
     * 200:
     * description: Login bem-sucedido.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * token:
     * type: string
     * description: Token JWT para autenticação.
     * 401:
     * description: Credenciais inválidas.
     */
    app.post('/auth/login', userController.loginUser);

    /**
     * @swagger
     * /auth/forgot-password:
     * post:
     * summary: Solicita redefinição de senha.
     * tags: [Auth]
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * email:
     * type: string
     * required: true
     * responses:
     * 200:
     * description: Instruções de redefinição de senha enviadas.
     * 404:
     * description: Usuário não encontrado.
     */
    app.post('/auth/forgot-password', userController.forgotPassword);

    /**
     * @swagger
     * /auth/{uid}/new-password:
     * put:
     * summary: Redefine a senha do usuário.
     * tags: [Auth]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: uid
     * schema:
     * type: string
     * required: true
     * description: ID do usuário.
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * newPassword:
     * type: string
     * required: true
     * responses:
     * 200:
     * description: Senha redefinida com sucesso.
     * 400:
     * description: Requisição inválida.
     * 401:
     * description: Não autorizado.
     */
    app.put('/auth/:uid/new-password', authenticateToken, userController.resetPassword);

    /**
     * @swagger
     * /auth/logout:
     * post:
     * summary: Faz logout do usuário.
     * tags: [Auth]
     * security:
     * - bearerAuth: []
     * responses:
     * 200:
     * description: Logout bem-sucedido.
     * 401:
     * description: Não autorizado.
     */
    app.post('/auth/logout', userController.logOutUser);

    /**
     * @swagger
     * /auth/refresh-token:
     * post:
     * summary: Gera um novo token de acesso.
     * tags: [Auth]
     * responses:
     * 200:
     * description: Novo token gerado com sucesso.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * token:
     * type: string
     * description: Novo token JWT.
     * 401:
     * description: Token de atualização inválido.
     */
    app.post('/auth/refresh-token', userController.generateNewToken)
}