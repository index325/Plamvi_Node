import User from "../models/User";
import bcrypt from "bcryptjs";
import * as Yup from "yup";

class UsuariosController {
  async guardar(req, res) {
    const validacao = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(4),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }
    let email = req.body.email;

    let usuario = await User.findOne({
      where: { email },
    });

    if (usuario) {
      return res.status(401).json({
        error: "O email já foi cadastrado!",
      });
    }

    let senhaCriptografada = await bcrypt.hash(req.body.password, 8);
    req.body.password = senhaCriptografada.toString();

    try {
      await User.create(req.body);

      usuario = await User.findOne({
        where: { email },
      });

      return res.status(200).json({
        sucess: "O usuário foi criado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }
  async listar(req, res) {
    try {
      const usuarios = await User.findAll();

      return res.status(200).json({
        data: usuarios,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de listagem",
      });
    }
  }

  async getUserProfile(req, res) {
    try {
      const { user } = req.body;
      const result = await User.findByPk(user);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de listagem",
      });
    }
  }

  async atualizar(req, res) {
    const { name, email, password, city, state, id } = req.body;

    const usuario = await User.findByPk(id);

    if (!usuario){
      return res.status(400).json({
        error: "Usuario não encontrado"
      })
    }

    if (!(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ error: "A senha é incorreta!" });
    }

    await usuario.update({
      name: name,
      email: email,
      city: city,
      state: state,
    })

    return res.status(200).json({
      data: usuario,
    });

  }
}

export default new UsuariosController();
