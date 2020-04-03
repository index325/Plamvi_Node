import Usuarios from '../models/Usuarios';
import bcrypt from 'bcryptjs';
import credenciais from '../auth/credentials';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

// Tela de autenticação

class LoginController {
    async login(req, res) {
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

        const { email, senha } = req.body;
        const usuario = await Usuarios.findOne({ email });

        if (!usuario) {
            return res
                .status(401)
                .json({ error: 'O usuário não foi encontrado!' });
        }

        // Verifica o login
        if (!usuario.email) {
            return res.status(401).json({ error: 'O email não existe!' });
        }

        // Compara as senhas
        if (!(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ error: 'A senha é incorreta!' });
        }

        const idUsuario = usuario._id;

        return res.json({
            token: jwt.sign({ idUsuario }, credenciais.chave, {
                expiresIn: credenciais.dataExpiracao,
            }),
        });
    }

    async atualizar(req, res) {
        const validacao = Yup.object().shape({
            idUsuario: Yup.number().required(),
            senhaNova: Yup.string()
                .required()
                .min(4),
            senhaAntiga: Yup.string()
                .required()
                .min(4),
        });

        if (!(await validacao.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'A validação está incorreta!' });
        }

        const idUsuario = req.body.idUsuario;
        const senhaNova = await bcrypt.hash(req.body.senhaNova, 8);
        const senhaAntiga = req.body.senhaAntiga;

        try {
            try {
                const consulta = await Usuarios.findOne({ idUsuario });

                // Compara as senhas
                if (!(await bcrypt.compare(senhaAntiga, consulta.senha))) {
                    return res
                        .status(401)
                        .json({ error: 'A senha é incorreta!' });
                }
            } catch (error) {
                return res
                    .status(500)
                    .json({
                        error:
                            'Erro ao validar no banco de dados a informação!',
                    });
            }

            const atualizacao = await Usuarios.updateOne(
                { idUsuario },
                { senha: senhaNova }
            );

            return res
                .status(200)
                .json({ sucess: 'O usuário foi atualizado com sucesso!' });
        } catch (error) {
            return res
                .status(500)
                .json({ error: 'Erro na operação de atualização' });
        }
    }
}

export default new LoginController();
