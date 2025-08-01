const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    app.get('/u/:uid', authenticateToken, userController.getActiveProcess);
    app.get('/u/:uid/process/:pid', authenticateToken, userController.getUserProcessById);
    app.post('/u/:uid/process/:pid/submit', authenticateToken, upload.array('documents'), userController.createSubmission);
    app.get('/u/:uid/config', authenticateToken, userController.getUserInfo);
    app.put('/u/:uid/config/edit', authenticateToken, userController.updateUserInfo);
    app.delete('/u/:uid/config/delete', authenticateToken, userController.deleteUser);
    
    // Authentication routes
    app.post('/auth/register', userController.createUser);
    app.post('/auth/login', userController.loginUser);
    app.post('/auth/forgot-password', userController.forgotPassword);
    app.put('/auth/:uid/new-password', authenticateToken, userController.resetPassword);
    app.post('/auth/logout', userController.logOutUser);

    //New Token route
    app.post('/auth/refresh-token', userController.generateNewToken)
}