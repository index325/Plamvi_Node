import Customer from "../models/Customer"
import DeliveryType from "../models/DeliveryType"
import * as Yup from "yup";

class TipoDeEntregaController {
  async guardar(req, res) {
    const validacao = Yup.object().shape({
      description: Yup.string()
        .required()
        .min(5),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }

    const customer = await Customer.findByPk(req.body.customer);

    if (!customer) {
      return res.status(400).json({
        error: "Cliente não encontrado!",
      });
    }

    try {
      const result = await DeliveryType.create({
        customer_id: req.body.customer,
        description: req.body.description,
      });

      return res.status(200).json({
        sucess: "O tipo de entrega foi criado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }
  async listar(req, res) {
    try {
      const tipoDeEntrega = await DeliveryType.findAll();

      return res.status(200).json({
        result: tipoDeEntrega,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de listagem",
      });
    }
  }
}

export default new TipoDeEntregaController();
