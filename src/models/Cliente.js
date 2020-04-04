import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const ClienteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  senha: {
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

// UsuariosSchema.plugin(mongooseSequence, {
//   id: 'idUsuario_seq',
//   inc_field: 'idUsuario',
// });

export default mongoose.model('Cliente', ClienteSchema);