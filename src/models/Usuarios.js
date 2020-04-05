import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const UsuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'criadoEm',
        updatedAt: 'atualizadoEm',
    },
});

export default mongoose.model('Usuarios', UsuariosSchema);
