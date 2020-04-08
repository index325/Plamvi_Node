import Cliente from "../models/Cliente";
import bcrypt from "bcryptjs";
import * as Yup from "yup";

class ClienteController {
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
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }
    let email = req.body.email;

    const cliente = await Cliente.findOne({
      email,
    });

    if (cliente) {
      return res.status(401).json({
        error: "O email já foi cadastrado!",
      });
    }

    let senhaCriptografada = await bcrypt.hash(req.body.senha, 8);
    req.body.senha = senhaCriptografada;

    try {
      const cliente = await Cliente.create(req.body);

      return res.status(200).json({
        sucess: "O cliente foi criado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }
}

export default new ClienteController();
