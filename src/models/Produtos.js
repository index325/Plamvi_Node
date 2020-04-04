import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const ProdutosSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },
    preco: {
        type: Number,
        required: true,
        default: 0.0
    },
    descricao: {
        type: String,
        required: true,
    },
    codigo_interno: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'criadoEm',
        updatedAt: 'atualizadoEm',
    },
});

// Getter
ProdutosSchema.path('preco').get(function (num) {
    return (num / 100).toFixed(2);
});

// Setter
ProdutosSchema.path('preco').set(function (num) {
    return num * 100;
});

export default mongoose.model('Produtos', ProdutosSchema);