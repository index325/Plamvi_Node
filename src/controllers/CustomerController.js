import Customer from "../models/Customer";
import bcrypt from "bcryptjs";
import * as Yup from "yup";

class ClienteController {
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

    const customer = await Customer.findOne({
      where: { email },
    });

    if (customer) {
      return res.status(401).json({
        error: "O email já foi cadastrado!",
      });
    }

    let senhaCriptografada = await bcrypt.hash(req.body.password, 8);
    req.body.password = senhaCriptografada;

    try {
      const customer = await Customer.create(req.body);

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

  async listar(req, res) {
    try {
      const result = await Customer.findAll();

      return res.status(200).json({
        result,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de listagem",
      });
    }
  }
}

export default new ClienteController();
