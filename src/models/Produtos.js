import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const ProdutosSchema = new mongoose.Schema({
    preco: {
        type: Number,
        required: true,
        default: 0.0
    },
    descricao: {
        type: String,
        required: true,
    },
    pago: {
        type: Boolean,
        required: true,
        default: false
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