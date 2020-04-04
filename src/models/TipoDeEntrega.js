import mongoose from 'mongoose';

// const mongooseSequence = require('mongoose-sequence')(mongoose);

const TipoDeEntregaSchema = new mongoose.Schema({
    idCliente: {
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

// UsuariosSchema.plugin(mongooseSequence, {
//   id: 'idUsuario_seq',
//   inc_field: 'idUsuario',
// });

export default mongoose.model('TipoDeEntrega', TipoDeEntregaSchema);