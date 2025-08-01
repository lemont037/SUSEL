// backend/src/models/userModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// userSchema e PhaseSchema não precisam de alterações
const userSchema = new Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isWhatsapp: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    refreshToken: { type: String, default: null, unique: true }
});

const PhaseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, default: () => new Date() },
    endDate: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
});

// --- CORREÇÃO PRINCIPAL APLICADA AQUI ---
const processSchema = new Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date: { type: Date, default: () => new Date() },
    phases: { type: [PhaseSchema], required: true },
    editalPath: { type: String },
    attachmentsPaths: [{ type: String }],
    
    // 1. O campo foi renomeado de 'subscribers' para 'submissions'
    // 2. A referência ('ref') agora aponta corretamente para o modelo 'Submission'
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission' 
    }]
});

const User = mongoose.model('User', userSchema);
const Process = mongoose.model('Process', processSchema);

module.exports = { User, Process };