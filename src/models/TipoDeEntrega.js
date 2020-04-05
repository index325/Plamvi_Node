import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const TipoDeEntregaSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'criadoEm',
        updatedAt: 'atualizadoEm',
    },
});

export default mongoose.model('TipoDeEntrega', TipoDeEntregaSchema);