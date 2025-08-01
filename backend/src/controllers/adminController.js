// CORREÇÃO: Removida a linha duplicada e ajustadas as importações
const { Process, User } = require('../models/userModel'); // Assumindo que User também vem daqui
const Submission = require('../models/submissionModel');
const path = require('path'); // <-- A CORREÇÃO ESTÁ AQUI: Importa o módulo 'path'
const fs = require('fs');

const adminController = {
    getAllProcesses: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: "Unauthorized" });
            }

            const activeProcesses = await Process.find({ status: 'active' });
            const inactiveProcesses = await Process.find({ status: 'inactive' });

            console.log(`[Admin] Processos ativos encontrados: ${activeProcesses.length}`);
            console.log(`[Admin] Processos inativos encontrados: ${inactiveProcesses.length}`);

            res.status(200).json({
                activeProcesses,
                inactiveProcesses
            });
        } catch (error) {
            console.error('Error fetching all processes:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getProcessById: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: "Unauthorized" });
            }

            const processId = req.params.pid;
            console.log(`A procurar processo com ID: ${processId}`);

            // --- CORREÇÃO APLICADA AQUI ---
            // Esta parte já estava correta, mas agora ela irá funcionar porque o schema foi corrigido.
            // Ela popula o campo 'submissions' e, para cada submissão, popula os dados do 'applicant'.
            const processById = await Process.findById(processId)
                .populate({
                    path: 'submissions', // O caminho agora existe no schema
                    populate: {
                        path: 'applicant',
                        select: 'name email' // Seleciona apenas os campos necessários
                    }
                });
            
            console.log("Resultado da procura no banco de dados:", processById);

            if (!processById) {
                return res.status(404).json({ message: 'Processo não encontrado no banco de dados com o ID fornecido.' });
            } else {
                return res.status(200).json(processById);
            }
        } catch (error) {
            console.error('Error fetching process by ID:', error);
            if (error.name === 'CastError') {
                return res.status(400).json({ message: `O ID '${error.value}' não é um formato válido.` });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    createProcess: async (req, res) => {
        try {
            if (!req.body || !req.files) {
                return res.status(400).json({ message: "Erro ao processar os dados do formulário." });
            }
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: "Unauthorized" });
            }

            const { title, code, description } = req.body;
            const phases = req.body.phases ? JSON.parse(req.body.phases) : [];
            
            const editalFile = req.files.edital ? req.files.edital[0] : null;
            const attachmentFiles = req.files.attachments || [];

            if (!title || !code || !editalFile) {
                return res.status(400).json({ message: 'Título, Código e PDF do Edital são obrigatórios.' });
            }

            // A lógica para renomear os ficheiros agora irá funcionar porque 'fs' está definido
            const editalExt = path.extname(editalFile.originalname);
            const editalNewFilename = editalFile.filename + editalExt;
            fs.renameSync(editalFile.path, path.join(editalFile.destination, editalNewFilename));

            const savedAttachments = attachmentFiles.map(file => {
                const ext = path.extname(file.originalname);
                const newFilename = file.filename + ext;
                fs.renameSync(file.path, path.join(file.destination, newFilename));
                return path.join('uploads', newFilename).replace(/\\/g, '/');
            });

            const newProcess = new Process({ 
                title, 
                code, 
                description, 
                phases,
                editalPath: path.join('uploads', editalNewFilename).replace(/\\/g, '/'),
                attachmentsPaths: savedAttachments,
            });

            await newProcess.save();
            res.status(201).json(newProcess);

        } catch (error) {
            console.error("ERRO DETALHADO AO CRIAR PROCESSO:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateProcess: async (req, res) => {

        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({message: "Unauthorized"})
            }

            const processId = req.params.pid;
            const {  title, code, description, phases } = req.body;
            if (!title || !code || !description || !phases) {
                return res.status(400).json({message: 'Required fields for the process where left blank'});
            }
            const updatedProcess = await Process.findByIdAndUpdate(processId, { title, code, description, phases }, { new: true });
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
            if (req.user.role !== 'admin') {
                return res.status(403).json({message: "Unauthorized"})
            }

            const processId = req.params.pid;
            console.log('Deleting process with ID:', processId);

            const deletedProcess = await Process.findByIdAndDelete({ _id: processId });
            if (!deletedProcess) {
                return res.status(404).json('Process not found');
            }
            res.status(200).json({ message: 'Process deleted successfully' });
        } catch (error) {
            console.error('Error deleting process:', error);
            res.status(500).json({message: 'Internal server error'});
        }
    },

    // --- FUNÇÃO PARA BUSCAR DADOS DA SUBMISSÃO ---
    getSubmissionById: async (req, res) => {
        try {
            if (req.user.role !== 'admin') return res.status(403).json({ message: "Unauthorized" });
            
            const submission = await Submission.findById(req.params.sid)
                .populate('applicant', 'name email cpf') // Busca dados do usuário relacionado
                .populate('process', 'title currentPhase'); // Busca dados do processo relacionado

            if (!submission) return res.status(404).json({ message: "Submission not found" });

            res.status(200).json({
                submission: submission,
                process: submission.process
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // --- FUNÇÃO PARA REGISTRAR A DECISÃO ---
    decideOnSubmission: async (req, res) => {
        try {
            if (req.user.role !== 'admin') return res.status(403).json({ message: "Unauthorized" });
            
            const { decision } = req.body;
            if (!['deferido', 'indeferido'].includes(decision)) {
                return res.status(400).json({ message: 'Invalid decision value' });
            }

            const updatedSubmission = await Submission.findByIdAndUpdate(
                req.params.sid,
                { status: decision },
                { new: true }
            );

            if (!updatedSubmission) return res.status(404).json({ message: 'Submission not found' });
            
            res.status(200).json({ message: 'Decision registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

};

module.exports = adminController;