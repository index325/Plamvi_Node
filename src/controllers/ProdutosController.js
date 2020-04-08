import mongoose from "mongoose";
import Produtos from "../models/Produtos";
import * as Yup from "yup";

class ProdutosController {
  async guardar(req, res) {
    const validacao = Yup.object().shape({
      preco: Yup.number()
        .moreThan(0.0)
        .required(),
      descricao: Yup.string()
        .required()
        .min(10),
    });

    if (!mongoose.Types.ObjectId.isValid(req.body.cliente)) {
      return res.status(400).json({
        error: "Identificador do cliente inválido!",
      });
    }

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }

    let codigo_interno = req.body.codigo_interno;

    const produto = await Produtos.findOne({
      codigo_interno,
    });

    let cliente = mongoose.Types.ObjectId(req.body.cliente);
    cliente = await Cliente.findById(cliente);

    if (!cliente) {
      return res.status(400).json({
        error: "Cliente não encontrado!",
      });
    }

    if (produto) {
      return res.status(401).json({
        error: "O produto já foi cadastrado!",
      });
    }

    const produtos = new Produtos({
      cliente: cliente,
      preco: req.body.preco,
      descricao: req.body.descricao,
      codigo_interno: codigo_interno,
    });

    try {
      const result = await produtos.save();

      return res.status(200).json({
        sucess: "O produto foi criado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }
  async meusProdutos(req, res) {
    try {
      const result = await Produtos.find({ cliente: req.body.idCliente });

      return res.status(200).json({
        sucess: "O produto foi criado com sucesso!",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }
}

export default new ProdutosController();
