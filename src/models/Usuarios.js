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

// UsuariosSchema.plugin(mongooseSequence, {
//   id: 'idUsuario_seq',
//   inc_field: 'idUsuario',
// });

export default mongoose.model('Usuarios', UsuariosSchema);
