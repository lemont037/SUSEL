const Submission = require('../models/submissionModel');
const { User, Process } = require('../models/userModel');
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const path = require('path');

const userController = {
    getActiveProcess: async (req, res) => {

        try {
            const userId = req.params.uid;

            if (userId !== req.user.uid) {
                return res.status(403).json({message: "Unauthorized"})
            }

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
            const userIdFromUrl = req.params.uid;
            const userIdFromToken = req.user.uid;

            // --- INÍCIO DA DEPURAÇÃO ---
            console.log("--- Verificação de Autorização em getUserProcessById ---");
            console.log("ID da URL (req.params.uid):", userIdFromUrl);
            console.log("ID do Token (req.user.uid):", userIdFromToken);
            console.log("Os IDs são iguais?", userIdFromUrl === userIdFromToken);
            console.log("----------------------------------------------------");
            // --- FIM DA DEPURAÇÃO ---

            // Verificação de segurança para garantir que o utilizador só pode ver os seus próprios dados
            if (userIdFromUrl !== userIdFromToken) {
                return res.status(403).json({ message: "Unauthorized: ID da URL não corresponde ao token." });
            }

            const processId = req.params.pid;
            const processById = await Process.findOne({ _id: processId, status: 'active' });

            if (!processById) {
                return res.status(404).json({ message: 'Processo não encontrado ou não está mais ativo.' });
            } else {
                return res.status(200).json(processById);
            }
        } catch (error) {
            console.error('Error fetching process by ID for user:', error);
            if (error.name === 'CastError') {
                return res.status(400).json({ message: `O ID de processo '${error.value}' não é um formato válido.` });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUserInfo: async (req, res) => {

        if (!req.user) {
                return res.status(401).json({message: "Not authenticated"})
            }

        try {
            const userId = req.params.uid;

            if (userId !== req.user.uid) {
                return res.status(403).json({message: "Unauthorized"})
            }

            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({message: 'User not found'});
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },
    createUser: async (req, res) => {

        try {
            const { name, cpf, email, phone, isWhatsapp, password} = req.body;
            const role = req.body.role;
            if (!name || !email || !password || !cpf) {
                return res.status(400).json({message: 'Name, email, cpf and password are required'});
            } else {
                User.findOne({
                    $or: [
                     {email: email },
                     {cpf: cpf}
                    ]
                }).then(async existingUser => {;
                    if (existingUser) {
                        console.error('User creation failed: Email or CPF already exists');
                        return res.status(400).json({message: 'Já existe um usuário com esse E-mail ou CPF'});
                    } else {
                        if (role === 'admin') {
                            var user = new User({ name, cpf, email, phone, isWhatsapp, password, role: 'admin' }); 
                        } else { var user = new User({ name, cpf, email, phone, isWhatsapp, password}); }

                        await user.save();
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

            const payload = {
                uid: user._id,
                email: user.email,
                role: user.role
            };

            const token = jwt.sign(payload, config.jwtsecret, {
                expiresIn: config.jwtexpires
            })
            const refreshToken = jwt.sign(payload, config.jwtrefreshsecret, {
                expiresIn: '1h'
            })
            await User.findByIdAndUpdate(user._id, {refreshToken: refreshToken})

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60*60*1000
            });
            
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60*60*1000
            });

            res.status(200).json({ message: 'Login successful', user, token, refreshToken });
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
            
            console.log(userId, req.user.uid)

            if (userId !== req.user.uid) {
                return res.status(403).json({message: "Unauthorized"})
            }

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

            if (userId !== req.user.uid) {
                return res.status(403).json({message: "Unauthorized"})
            }

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
            const { password }= req.body

            if (userId !== req.user.uid) {
                return res.status(403).json({message: "Unauthorized"})
            }

            const user = await User.findById(userId)
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }
            if (user.password !== password) {
                return res.status(401).json({message: 'Password does not match'})
            }

            await User.findByIdAndDelete(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send('Internal server error');
        }
    },
    createSubmission: async (req, res) => {
        try {
            const { uid, pid } = req.params;
            if (uid !== req.user.uid) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            const candidateData = JSON.parse(req.body.candidateData);
            const academicData = JSON.parse(req.body.academicData);
            
            // --- CORREÇÃO APLICADA AQUI ---
            // Guardamos o caminho relativo em vez do absoluto.
            const files = req.files.map(file => ({
                originalName: file.originalname,
                path: path.join('uploads', file.filename), // Usamos file.filename
                mimetype: file.mimetype,
            }));

            const newSubmission = new Submission({
                process: pid,
                applicant: uid,
                candidateData,
                academicData,
                files,
            });

            await newSubmission.save();

            await Process.findByIdAndUpdate(pid, {
                $push: { submissions: newSubmission._id }
            });

            res.status(201).json({ message: 'Submissão realizada com sucesso!', submission: newSubmission });

        } catch (error) {
            console.error('Error creating submission:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    submitToProcess: async (req, res) => {
        try {
            const userId = req.params.uid;
            const processId = req.params.pid;

            if (userId !== req.user.uid) {
                return res.status(403).json({message: "Unauthorized"})
            }

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
    },
    generateNewToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({message: 'Refresh token is required'})
        }

        try {
            const decoded = jwt.verify(refreshToken, config.jwtrefreshsecret)

            const user = await User.findById(decoded.uid);

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({message: 'Invalid refresh token'})
            }

            const newPayload = {
                uid: user._id,
                email: user.email,
                role: user.role
            };

            const newToken = jwt.sign(newPayload, config.jwtsecret, {
                expiresIn: config.jwtexpires
            })

            res.cookie('token', newToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60*60*1000
            })

            res.status(200).json({message: 'New token created successfully', token: newToken})
        } catch (error) {
            console.error(`Error generating new acces token: ${error}`)
            return res.status(401).json({message: 'Invalid or expired refresh token. Please, login again'})
        }
    },
    logOutUser: (req, res) => {

        res.clearCookie('token');
        res.clearCookie('refreshToken');

        // REMOVER APÓS TESTES
        console.log("Cookies limpos: ", res.cookies)

        res.status(202).json({message: "Logged out successfully"})
    }
}

module.exports = userController;