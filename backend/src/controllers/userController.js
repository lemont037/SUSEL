const { users, process } = require('../models/userModel');

const userController = {
    getActiveProcess: (req, res) => {
        const userId = parseInt(req.params.uid, 10);
        const user = users.find(u => u.id === userId);
        if (user) {
            const activeProcess = process.find(p => p.status === 'active');
            if (activeProcess) {
                const userActiveProcess = process.filter(p => p.subscribers.includes(userId));
                if (userActiveProcess.length > 0) {
                    res.status(200).json(userActiveProcess);
                } else {
                    res.status(404).send('No active process found for this user');
                }
            } else {
                res.status(404).send('No active process found');
            }
        } else {
            res.status(404).send('User not found');
        }
    },
    getUserProcessById: (req, res) => {
        const userId = parseInt(req.params.uid, 10);
        const processId = parseInt(req.params.pid, 10);
        const user = users.find(u => u.id === userId);
        if (user) {
            const processById = process.find(p => p.id === processId && p.subscribers.includes(userId));
            if (processById) {
                res.status(200).json(processById);
            } else {
                res.status(404).send('This user is not subscribed to this process or process not found');
            }
        } else {
            res.status(404).send('User not found');
        }
    },
    getUserInfo: (req, res) => {
        const userId = parseInt(req.params.uid, 10);
        const user = users.find(u => u.id === userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    },
    createUser: (req, res) => {
        const newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user'
        };
        users.push(newUser);
        res.status(201).json(newUser);
    }
}

module.exports = userController;