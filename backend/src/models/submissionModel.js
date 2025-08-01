const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    // Referência ao processo seletivo ao qual esta submissão pertence
    process: {
        type: Schema.Types.ObjectId,
        ref: 'Process',
        required: true,
    },
    // Referência ao usuário que fez a submissão
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Dados do formulário do candidato, aninhados para organização
    candidateData: {
        name: { type: String, required: true },
        cpf: { type: String, required: true },
        rg: { type: String },
        gender: { type: String },
        email: { type: String, required: true },
        phone: { type: String },
        address: {
            cep: String,
            street: String,
            number: String,
            complement: String,
            neighborhood: String,
            city: String,
        }
    },
    // Dados do formulário acadêmico
    academicData: {
        titulacao: { type: String },
        instituicaoEmissora: { type: String },
        linhaPesquisa: { type: String },
    },
    // Lista de arquivos enviados pelo candidato
    files: [{
        originalName: String, // Nome original do arquivo (ex: "diploma.pdf")
        path: String,         // Caminho onde o arquivo foi salvo no servidor (ex: "uploads/submissions/abc123xyz")
        mimetype: String,     // Tipo do arquivo (ex: "application/pdf")
    }],
    // Status da submissão, controlado pelo admin
    status: {
        type: String,
        enum: ['submetido', 'deferido', 'indeferido'],
        default: 'submetido',
    },
    // Data em que a submissão foi criada
    submissionDate: {
        type: Date,
        default: Date.now,
    },
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;