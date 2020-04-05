import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const ItensPedidoSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produtos',
    required: true,
  },
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedidos',
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
  },
});

export default mongoose.model('ItensPedido', ItensPedidoSchema);