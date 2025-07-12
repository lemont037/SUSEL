const adminController = require('../controllers/adminController');

module.exports = (app) => {
    app.get('/admin', adminController.getAllProcesses);
    app.get('/admin/process/:id', adminController.getProcessById);
}