const { process } = require('../models/userModel');

const adminController = {
    getAllProcesses: (req, res) => {
        res.status(200).json(process);
    },
    getProcessById: (req, res) => {
        const processId = parseInt(req.params.id, 10);
        const processById = process.find(p => p.id === processId);
        if (processById) {
            res.status(200).json(processById);
        } else {
            res.status(404).send('Process not found');
        }
    }
};

module.exports = adminController;