const adminController = require('../controllers/adminController');

module.exports = (app) => {
    app.get('/admin', adminController.getAllProcesses);
    app.get('/admin/process/:pid', adminController.getProcessById);
    app.post('/admin/new-process', adminController.createProcess);
    app.put('/admin/process/:pid/edit', adminController.updateProcess);
    app.delete('/admin/process/:pid/delete', adminController.deleteProcess);
}