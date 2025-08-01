const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

// Criamos uma instância do middleware do Multer
const uploadMiddleware = upload.fields([
    { name: 'edital', maxCount: 1 },
    { name: 'attachments', maxCount: 10 }
]);

// Criamos uma função "wrapper" que chama o middleware e trata os erros
const handleUpload = (req, res, next) => {
    uploadMiddleware(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error("Ocorreu um erro conhecido do Multer:", err);
            return res.status(400).json({ message: `Erro no upload: ${err.message}` });
        } else if (err) {
            console.error("Ocorreu um erro desconhecido durante o upload:", err);
            return res.status(500).json({ message: "Ocorreu um erro inesperado no servidor durante o upload." });
        }

        console.log("Middleware Multer executado com sucesso. A prosseguir para o controller.");
        next();
    });
};

module.exports = (app) => {
    /**
     * @swagger
     * tags:
     * name: Admin
     * description: Gerenciamento de processos e submissões por administradores
     */

    /**
     * @swagger
     * /admin:
     * get:
     * summary: Retorna todos os processos disponíveis.
     * tags: [Admin]
     * security:
     * - bearerAuth: []
     * responses:
     * 200:
     * description: Uma lista de processos.
     * content:
     * application/json:
     * schema:
     * type: array
     * items:
     * type: object
     * properties:
     * _id:
     * type: string
     * description: ID do processo.
     * title:
     * type: string
     * description: Título do processo.
     * description:
     * type: string
     * description: Descrição do processo.
     * status:
     * type: string
     * description: Status do processo (ex: 'ativo', 'inativo').
     * 401:
     * description: Não autorizado. Token inválido ou ausente.
     * 500:
     * description: Erro interno do servidor.
     */
    app.get('/admin', authenticateToken, adminController.getAllProcesses);

    /**
     * @swagger
     * /admin/process/{pid}:
     * get:
     * summary: Retorna um processo específico pelo seu ID.
     * tags: [Admin]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: pid
     * schema:
     * type: string
     * required: true
     * description: ID do processo.
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
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Processo não encontrado.
     * 500:
     * description: Erro interno do servidor.
     */
    app.get('/admin/process/:pid', authenticateToken, adminController.getProcessById);

    /**
     * @swagger
     * /admin/process/{pid}/edit:
     * put:
     * summary: Atualiza um processo existente pelo seu ID.
     * tags: [Admin]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: pid
     * schema:
     * type: string
     * required: true
     * description: ID do processo a ser atualizado.
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * title:
     * type: string
     * description: Novo título do processo.
     * description:
     * type: string
     * description: Nova descrição do processo.
     * status:
     * type: string
     * description: Novo status do processo.
     * responses:
     * 200:
     * description: Processo atualizado com sucesso.
     * 400:
     * description: Requisição inválida.
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Processo não encontrado.
     * 500:
     * description: Erro interno do servidor.
     */
    app.put('/admin/process/:pid/edit', authenticateToken, adminController.updateProcess);

    /**
     * @swagger
     * /admin/process/{pid}/delete:
     * delete:
     * summary: Deleta um processo pelo seu ID.
     * tags: [Admin]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: pid
     * schema:
     * type: string
     * required: true
     * description: ID do processo a ser deletado.
     * responses:
     * 200:
     * description: Processo deletado com sucesso.
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Processo não encontrado.
     * 500:
     * description: Erro interno do servidor.
     */
    app.delete('/admin/process/:pid/delete', authenticateToken, adminController.deleteProcess);

    /**
     * @swagger
     * /admin/submission/{sid}:
     * get:
     * summary: Retorna uma submissão específica pelo seu ID.
     * tags: [Admin]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: sid
     * schema:
     * type: string
     * required: true
     * description: ID da submissão.
     * responses:
     * 200:
     * description: Detalhes da submissão.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * _id:
     * type: string
     * processId:
     * type: string
     * userId:
     * type: string
     * status:
     * type: string
     * documents:
     * type: array
     * items:
     * type: string
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Submissão não encontrada.
     * 500:
     * description: Erro interno do servidor.
     */
    app.get('/admin/submission/:sid', authenticateToken, adminController.getSubmissionById);

    /**
     * @swagger
     * /admin/submission/{sid}/decide:
     * post:
     * summary: Decide sobre uma submissão (aprovar/rejeitar).
     * tags: [Admin]
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: sid
     * schema:
     * type: string
     * required: true
     * description: ID da submissão a ser decidida.
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * decision:
     * type: string
     * enum: [approved, rejected]
     * description: Decisão sobre a submissão.
     * reason:
     * type: string
     * description: Motivo da decisão (opcional).
     * responses:
     * 200:
     * description: Decisão registrada com sucesso.
     * 400:
     * description: Requisição inválida.
     * 401:
     * description: Não autorizado.
     * 404:
     * description: Submissão não encontrada.
     * 500:
     * description: Erro interno do servidor.
     */
    app.post('/admin/submission/:sid/decide', authenticateToken, adminController.decideOnSubmission);

    /**
     * @swagger
     * /admin/new-process:
     * post:
     * summary: Cria um novo processo com arquivos de edital e anexos.
     * tags: [Admin]
     * security:
     * - bearerAuth: []
     * requestBody:
     * required: true
     * content:
     * multipart/form-data:
     * schema:
     * type: object
     * properties:
     * title:
     * type: string
     * description: Título do novo processo.
     * description:
     * type: string
     * description: Descrição do novo processo.
     * edital:
     * type: string
     * format: binary
     * description: Arquivo do edital (PDF, DOCX, etc.).
     * attachments:
     * type: array
     * items:
     * type: string
     * format: binary
     * description: Lista de arquivos anexos.
     * responses:
     * 201:
     * description: Processo criado com sucesso.
     * 400:
     * description: Erro no upload ou requisição inválida.
     * 401:
     * description: Não autorizado.
     * 500:
     * description: Erro interno do servidor.
     */
    app.post(
        '/admin/new-process',
        authenticateToken,
        handleUpload,
        adminController.createProcess
    );
};