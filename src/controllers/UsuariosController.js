import mongoose from 'mongoose';
import Usuarios from '../models/Usuarios';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

export default {
  async guardar(req, res) {

    const validacao = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        senha: Yup.string()
            .required()
            .min(4),
    });

    if (!(await validacao.isValid(req.body))) {
        return res
            .status(400)
            .json({ error: 'A validação está incorreta!' });
    }
    let email = req.body.email;

    const usuario = await Usuarios.findOne({ email });

    if (usuario) {
        return res.status(401).json({ error: 'O email já foi cadastrado!' });
    }

    let senhaCriptografada = await bcrypt.hash(req.body.senha, 8);
    req.body.senha = senhaCriptografada;

    try {
        const usuarios = await Usuarios.create(req.body);

        return res.status(200).json({ sucess: 'O usuário foi criado com sucesso!'});
    } catch (error) {
        return res.status(500).json({ error: 'Erro na operação de cadastro'});
    }
  },
};
