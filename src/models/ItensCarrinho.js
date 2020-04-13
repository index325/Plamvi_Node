import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const ItensCarrinhoSchema = new mongoose.Schema({
  carrinho: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrinho',
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produtos',
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  timestamps: {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
  },
});

export default mongoose.model('ItensCarrinho', ItensCarrinhoSchema);