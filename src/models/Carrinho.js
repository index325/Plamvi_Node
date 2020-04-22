import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const CarrinhoSchema = new mongoose.Schema({
  aberto: {
    type: Boolean,
    required: true,
    default: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  itensCarrinho: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItensCarrinho',
  }]
}, {
  timestamps: {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
  },
});

export default mongoose.model('Carrinho', CarrinhoSchema);