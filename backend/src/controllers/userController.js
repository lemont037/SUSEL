const { User, Process } = require('../models/userModel');

const userController = {
    getActiveProcess: async (req, res) => {
        try {
            const userId = req.params.uid;
            const user = await User.findById(userId);
            if (!user) {
               res.status(404).json({message: 'User not found'});
            } else {
                const activeProcesses = await Process.find({ status: 'active'});
                const userProcesses = await Process.find({ subscribers: userId });

                res.status(200).json({activeProcesses, userProcesses});
            }
        } catch (error) {
            console.error('Error fetching active processes:', error);
            res.status(500).json({message: 'Internal server error'});
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
            const { name, cpf, email, phone, isWhatsapp, password} = req.body;
            const role = req.body.role;
            if (!name || !email || !password || !cpf) {
                return res.status(400).json({message: 'Name, email, cpf and password are required'});
            } else {
                User.findOne({ email: email })
                .then(existingUser => {;
                    if (existingUser) {
                        console.error('User creation failed: Email already exists');
                        return res.status(400).json({message: 'A user with this email already exists'});
                    } else {
                        if (role === 'admin') {
                            var user = new User({ name, cpf, email, phone, isWhatsapp, password, role: 'admin' }); 
                        } else { var user = new User({ name, cpf, email, phone, isWhatsapp, password}); }

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
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({message: 'Email and password are required'});
            }
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(401).json({message: 'Invalid email or password'});
            }
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({message: 'Email is required'});
            }
            const user = await User.findOne({ email });
            console.log('User found:', user);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            console.log('Sending user info:', user);
            return res.status(200).json({ user });
        } catch (error) {
            console.error('Error in forgot password:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    resetPassword: async (req, res) => {
        try {
            const userId = req.params.uid;
            const { newPassword } = req.body;
            if (!newPassword) {
                return res.status(400).send('New password is required');
            }
            const user = await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true });
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json({ message: 'Password reset successful', user });
        } catch (error) {
            console.error('Error resetting password:', error);
            res.status(500).send('Internal server error');
        }
    },
    updateUserInfo: async (req, res) => {
        try {
            const userId = req.params.uid;
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).send('Name and email are required');
            }
            const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
            if (!updatedUser) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error updating user info:', error);
            res.status(500).send('Internal server error');
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.uid;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).send('User not found');
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
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
                    console.log(`User ${user.name} submitted to process ${process.title}`);
                    res.status(200).send(`User ${user.name} successfully submitted to process ${process.title}`);
                } else {
                    console.log(`User ${user.name} is already subscribed to process ${process.title}`);
                    res.status(400).send(`User ${user.name} is already subscribed to process ${process.title}`);
                }
            }
        } catch (error) {
            console.error('Error submitting to process:', error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = userController;