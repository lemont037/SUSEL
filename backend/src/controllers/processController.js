// Importa apenas o modelo de Processo, que é o que ele precisa
const { Process } = require('../models/userModel'); // Ou '../models/processModel' se você separou

const processController = {
    /**
     * Busca um único processo seletivo pelo seu ID.
     * Esta rota foi feita para ser acessada por qualquer usuário autenticado.
     * Ela só retorna processos que estão com o status 'active'.
     */
    getProcessByIdForUser: async (req, res) => {
        try {
            const processId = req.params.pid;

            // Busca o processo no banco de dados pelo ID
            const process = await Process.findById(processId);

            // Caso o processo não seja encontrado
            if (!process) {
                return res.status(404).json({ message: 'Processo seletivo não encontrado.' });
            }

            // Regra de negócio: usuários comuns só podem ver processos ativos
            if (process.status !== 'active') {
                return res.status(403).json({ message: 'Este processo seletivo não está mais ativo.' });
            }

            // Se tudo deu certo, envia os dados do processo
            res.status(200).json(process);

        } catch (error) {
            // Tratamento de erros inesperados
            console.error('Erro ao buscar processo por ID:', error);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
};

module.exports = processController;