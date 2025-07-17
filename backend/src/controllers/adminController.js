const { Process } = require('../models/userModel');

const adminController = {
    getAllProcesses: async (req, res) => {
        try {
            const activeProcesses = await Process.find({ status: 'active' });
            const inactiveProcesses = await Process.find({ status: 'inactive' });

            res.status(200).json({
                activeProcesses,
                inactiveProcesses
            });
        } catch (error) {
            console.error('Error fetching all processes:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    getProcessById: async (req, res) => {
        try {
            const processId = req.params.pid;
            const processById = await Process.findById(processId);
            if (!processById) {
                res.status(404).json({message: 'Process not found'});
            } else {
                res.status(200).json(processById);
            }
        } catch (error) {
            console.error('Error fetching process by ID:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    createProcess: async (req, res) => {
        try {
            const { title, code, description, status, date, phases, subscribers } = req.body;
            if (!title || !code || !description || !phases) {
                return res.status(400).json({message: 'Required fileds for creating process were left blank'});
            }
            const newProcess = new Process({ 
                title, 
                code, 
                description, 
                status, 
                date, 
                phases, 
                subscribers
            });

            await newProcess.save();
            res.status(201).json(newProcess);
        } catch (error) {
            console.error('Error creating process:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    updateProcess: async (req, res) => {
        try {
            const processId = req.params.pid;
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({message: 'A name is required for the process'});
            }
            const updatedProcess = await Process.findByIdAndUpdate(processId, { name }, { new: true });
            if (!updatedProcess) {
                return res.status(404).json({message: 'Process not found'});
            }
            res.status(200).json(updatedProcess);
        } catch (error) {
            console.error('Error updating process:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    deleteProcess: async (req, res) => {
        try {
            const processId = req.params.pid;
            const deletedProcess = await Process.findByIdAndDelete(processId);
            if (!deletedProcess) {
                return res.status(404).json('Process not found');
            }
            res.status(200).json({ message: 'Process deleted successfully' });
        } catch (error) {
            console.error('Error deleting process:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    }
};

module.exports = adminController;