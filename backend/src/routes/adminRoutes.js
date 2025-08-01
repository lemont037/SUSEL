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
    // Rotas existentes
    app.get('/admin', authenticateToken, adminController.getAllProcesses);
    app.get('/admin/process/:pid', authenticateToken, adminController.getProcessById);
    app.put('/admin/process/:pid/edit', authenticateToken, adminController.updateProcess);
    app.delete('/admin/process/:pid/delete', authenticateToken, adminController.deleteProcess);
    app.get('/admin/submission/:sid', authenticateToken, adminController.getSubmissionById);
    app.post('/admin/submission/:sid/decide', authenticateToken, adminController.decideOnSubmission);

    // --- ROTA DE CRIAÇÃO DE PROCESSO CORRIGIDA ---
    // Apenas UMA definição, usando o nosso manipulador de upload.
    app.post(
        '/admin/new-process', 
        authenticateToken, 
        handleUpload, 
        adminController.createProcess
    );
};