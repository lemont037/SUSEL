const userController = require('../controllers/userController');

module.exports = (app) => {
    app.get('/u/:uid/process', userController.getActiveProcess);
    app.get('/u/:uid/process/:pid',userController.getUserProcessById);
    app.get('/u/:uid/config', userController.getUserInfo);
    app.post('/auth/register', userController.createUser);
}