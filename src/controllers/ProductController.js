import Product from "../models/Product";
import Customer from "../models/Customer";
import * as Yup from "yup";

class ProdutosController {
  async guardar(req, res) {
    const validacao = Yup.object().shape({
      price: Yup.number()
        .moreThan(0.0)
        .required(),
      description: Yup.string()
        .required()
        .min(10),
      name: Yup.string().required(),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }

    const cliente = await Customer.findByPk(req.body.customer);

    if (!cliente) {
      return res.status(400).json({
        error: "Cliente não encontrado!",
      });
    }

    let sku = req.body.sku;

    const produto = await Product.findOne({
      where: {
        sku,
      },
    });

    if (produto) {
      return res.status(401).json({
        error: "O produto já foi cadastrado!",
      });
    }

    try {
      const result = await Product.create({
        name: req.body.name,
        customer_id: req.body.customer,
        price: req.body.price,
        description: req.body.description,
        sku,
      });

      return res.status(200).json({
        sucess: "O produto foi criado com sucesso!",
        result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }
  async listarProdutos(req, res) {
    try {
      const result = await Product.findAll({
        where: { customer_id: req.body.customer },
      });

      return res.status(200).json({
        result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }
  async overviewProduto(req, res) {
    try {
      const { product } = req.body;

      const result = await Product.findByPk(product);

      if (!result) {
        return res.status(400).json({
          error: "Produto não encontrado!",
        });
      }

      return res.status(200).json({
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
