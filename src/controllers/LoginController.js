import User from "../models/User";
import Customer from "../models/Customer";
import bcrypt from "bcryptjs";
import credenciais from "../auth/credentials";
import jwt from "jsonwebtoken";
import * as Yup from "yup";

// Tela de autenticação
class LoginController {
  async loginUser(req, res) {
    const validacao = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(4),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({ error: "A validação está incorreta!" });
    }

    const { email, password } = req.body;
    const usuario = await User.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ error: "O usuário não foi encontrado!" });
    }

    // Verifica o login
    if (!usuario.email) {
      return res.status(401).json({ error: "O email não existe!" });
    }

    // Compara as senhas
    if (!(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ error: "A senha é incorreta!" });
    }

    const idUsuario = usuario.id;

    let user = await User.findByPk(idUsuario);

    return res.json({
      token: jwt.sign({ user: idUsuario }, credenciais.chave, {
        expiresIn: credenciais.dataExpiracao,
      }),
      user,
    });
  }

  async loginCliente(req, res) {
    const validacao = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(4),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({ error: "A validação está incorreta!" });
    }

    const { email, password } = req.body;
    const cliente = await Customer.findOne({
      where: { email },
    });

    if (!cliente) {
      return res.status(401).json({ error: "O usuário não foi encontrado!" });
    }

    // Verifica o login
    if (!cliente.email) {
      return res.status(401).json({ error: "O email não existe!" });
    }

    // Compara as senhas
    if (!(await bcrypt.compare(password, cliente.password))) {
      return res.status(401).json({ error: "A senha é incorreta!" });
    }

    const idCliente = cliente.id;

    let customer = await Customer.findByPk(idCliente);

    return res.json({
      token: jwt.sign({ idCliente }, credenciais.chave, {
        expiresIn: credenciais.dataExpiracao,
      }),
      customer,
    });
  }

  async atualizar(req, res) {
    // TODO
  }
}

export default new LoginController();
