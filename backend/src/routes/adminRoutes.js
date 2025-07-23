const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authMiddleware')

module.exports = (app) => {
    app.get('/admin', authenticateToken, adminController.getAllProcesses);
    app.get('/admin/process/:pid', authenticateToken, adminController.getProcessById);
    app.post('/admin/new-process', authenticateToken, adminController.createProcess);
    app.put('/admin/process/:pid/edit', authenticateToken, adminController.updateProcess);
    app.delete('/admin/process/:pid/delete', authenticateToken, adminController.deleteProcess);
}