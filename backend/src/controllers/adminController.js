const { Process } = require('../models/userModel');

const adminController = {
    getAllProcesses: async (req, res) => {
        try {
            const processes = await Process.find();
            res.status(200).json(processes);
        } catch (error) {
            console.error('Error fetching all processes:', error);
            res.status(500).send('Internal server error');
        }
    },
    getProcessById: async (req, res) => {
        try {
            const processId = req.params.pid;
            const processById = await Process.findById(processId);
            if (!processById) {
                res.status(404).send('Process not found');
            } else {
                res.status(200).json(processById);
            }
        } catch (error) {
            console.error('Error fetching process by ID:', error);
            res.status(500).send('Internal server error');
        }
    },
    createProcess: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name ) {
                return res.status(400).send('A name is required for the process');
            }
            const newProcess = new Process({ name });
            await newProcess.save();
            res.status(201).json(newProcess);
        } catch (error) {
            console.error('Error creating process:', error);
            res.status(500).send('Internal server error');
        }
    }
};

module.exports = adminController;