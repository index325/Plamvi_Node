import mongoose from "mongoose";
import TipoDeEntrega from "../models/TipoDeEntrega";
import Cliente from "../models/Cliente";
import * as Yup from "yup";

class TipoDeEntregaController {
  async guardar(req, res) {
    const validacao = Yup.object().shape({
      descricao: Yup.string()
        .required()
        .min(5),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.cliente)) {
      return res.status(400).json({
        error: "Identificador do cliente inválido!",
      });
    }

    let cliente = mongoose.Types.ObjectId(req.body.cliente);
    cliente = await Cliente.findById(cliente);

    if (!cliente) {
      return res.status(400).json({
        error: "Cliente não encontrado!",
      });
    }

    const tipoDeEntrega = new TipoDeEntrega({
      cliente: cliente,
      descricao: req.body.descricao,
    });

    try {
      const result = await tipoDeEntrega.save();

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
      const tipoDeEntrega = await TipoDeEntrega.find({});

      return res.status(200).json({
        data: tipoDeEntrega,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de listagem",
      });
    }
  }
}

export default new TipoDeEntregaController();
