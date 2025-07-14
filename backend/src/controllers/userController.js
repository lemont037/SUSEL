const { User, Process } = require('../models/userModel');

const userController = {
    getActiveProcess: async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await User.findById(userId);
            if (!user) {
               res.status(404).send('User not found');
            } else {
                const activeProcess = await Process.find({ status: 'active'});
                if (activeProcess.lenght === 0) {
                    res.status(404).send('No active process found');
                } else {
                    res.status(200).json(activeProcess);
                }
            }
        } catch (error) {
            console.error('Error fetching active processes:', error);
            res.status(500).send('Internal server error');
        }
    },
    getUserProcessById: async (req, res) => {
        try {
            const userId = req.params.uid;
            const processId = req.params.pid;
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                const processById = await Process.findById(processId);
                if (!processById) {
                    res.status(404).send('Process not found');
                } else {
                    res.status(200).json(processById);
                }
            }
        } catch (error) {
            console.error('Error fetching process by ID:', error);
            res.status(500).send('Internal server error');
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            res.status(500).send('Internal server error');
        }
    },
    createUser: async (req, res) => {
        try {
            const { name, email, password} = req.body;
            const role = req.body.role;
            if (!name || !email || !password) {
                return res.status(400).send('Name, email, and password are required');
            } else {
                User.findOne({ email: email })
                .then(existingUser => {;
                    if (existingUser) {
                        console.error('User creation failed: Email already exists');
                        return res.status(400).send('A user with this email already exists');
                    } else {
                        if (role === 'admin') {
                            var user = new User({ name, email, password, role: 'admin' }); 
                        } else { var user = new User({ name, email, password}); }

                        user.save();
                        console.log('User created successfully:', user);
                        res.status(201).json(user);
                    }
                });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal server error');
        }
    },
    submitToProcess: async (req, res) => {
        try {
            const userId = req.params.uid;
            const processId = req.params.pid;
            const user = await User.findById(userId);
            const process = await Process.findById(processId);
            if (!user || !process) {
                return res.status(404).send('User or process not found');
            } else {
                if (!process.subscribers.includes(userId)) {
                    process.subscribers.push(userId);
                    await process.save();
                    console.log(`User ${user.name} submitted to process ${process.name}`);
                    res.status(200).send(`User ${user.name} successfully submitted to process ${process.name}`);
                } else {
                    console.log(`User ${user.name} is already subscribed to process ${process.name}`);
                    res.status(400).send(`User ${user.name} is already subscribed to process ${process.name}`);
                }
            }
        } catch (error) {
            console.error('Error submitting to process:', error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = userController;