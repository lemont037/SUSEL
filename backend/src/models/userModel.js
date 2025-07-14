const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const processSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const User = mongoose.model('User', userSchema);
const Process = mongoose.model('Process', processSchema);

module.exports = { User, Process };