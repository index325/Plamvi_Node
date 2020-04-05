import mongoose from 'mongoose';

class Utils {
    static validarRequest(req, res, entidades) {
        let array = []
        entidades.forEach(entidade => {
            if (!mongoose.Types.ObjectId.isValid(req.body[entidade])) {
                array.push(entidade)
            }
        });
        if (array.length > 0) {
            return res
                .status(400)
                .json({
                    error: `Identificador do campo ${array.join(", ")} inválido!`
                });
        }
        return false
    }
}

export default Utils;