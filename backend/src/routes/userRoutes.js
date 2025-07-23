const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware')

module.exports = (app) => {
    app.get('/u/:uid', authenticateToken, userController.getActiveProcess);
    app.get('/u/:uid/process/:pid', authenticateToken, userController.getUserProcessById);
    app.post('/u/:uid/process/:pid/submit', authenticateToken, userController.submitToProcess);
    app.get('/u/:uid/config', authenticateToken, userController.getUserInfo);
    app.put('/u/:uid/config/edit', authenticateToken, userController.updateUserInfo);
    app.delete('/u/:uid/config/delete', authenticateToken, userController.deleteUser);
    
    // Authentication routes
    app.post('/auth/register', userController.createUser);
    app.post('/auth/login', userController.loginUser);
    app.post('/auth/forgot-password', userController.forgotPassword);
    app.put('/auth/:uid/new-password', authenticateToken, userController.resetPassword);

    //New Token route
    app.post('/auth/refresh-token', userController.generateNewToken)
}