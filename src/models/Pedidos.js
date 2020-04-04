import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const PedidosSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  tipoEntrega: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoDeEntrega',
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0.0
  },
  diasParaEntrega: {
    type: Number,
    required: true,
    default: 1
  },
}, {
  timestamps: {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
  },
});

// UsuariosSchema.plugin(mongooseSequence, {
//   id: 'idUsuario_seq',
//   inc_field: 'idUsuario',
// });

export default mongoose.model('Pedidos', PedidosSchema);