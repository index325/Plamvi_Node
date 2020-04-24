import ItensCarrinho from "../models/ItensCarrinho";
import Carrinho from "../models/Carrinho";
import Produtos from "../models/Produtos";
import Utils from "../Utils";
import * as Yup from "yup";
import mongoose from "mongoose";

class ItensCarrinhoController {
  async guardarItem(req, res) {
    const validacao = Yup.object().shape({
      quantidade: Yup.number()
        .moreThan(0)
        .required(),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }

    if (Utils.validarRequest(req, res, ["produto"])) {
      return false;
    }

    let produto = mongoose.Types.ObjectId(req.body.produto);

    const carrinho = await Carrinho.findOne({
      usuario: req.body.idUsuario,
      aberto: true,
    }).populate("itensCarrinho");

    const itemCarrinho = new ItensCarrinho({
      usuario: req.body.idUsuario,
      carrinho: carrinho,
      quantidade: req.body.quantidade,
      produto: produto,
    });

    const produtoFind = await Produtos.findById(produto);

    try {
      const result = await itemCarrinho.save();
      const itemCarrinho1 = await ItensCarrinho.findById(result._id);

      await carrinho.itensCarrinho.push(itemCarrinho1);

      await carrinho.save();
      return res.status(200).json({
        success: `${produtoFind.nome} adicionado ao carrinho com sucesso.`,
        carrinho,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Erro na operação de cadastro",
      });
    }
  }

  async excluirItem(req, res) {
    try {
      const { itemCarrinho, idUsuario } = req.body;

      let indexItem, productName;

      const carrinho = await Carrinho.findOne({
        usuario: idUsuario,
        aberto: true,
      }).populate("itensCarrinho");

      let itemCarrinhoDoc = await ItensCarrinho.findById(itemCarrinho).populate("produto")

      if (carrinho.itensCarrinho.length < 1) {
        return res.status(404).json({
          error: "O carrinho está vazio",
        });
      } else if (!itemCarrinhoDoc) {
        return res.status(404).json({
          error: "Item não encontrado",
        });
      }

      carrinho.itensCarrinho.map(async (item, index) => {
        if (item._id == itemCarrinho) {
          await ItensCarrinho.findByIdAndDelete(item._id);
          indexItem = index;
        }
      });
      if (indexItem) {
        carrinho.itensCarrinho.splice(indexItem);
        await carrinho.save();
      }

      return res.status(200).json({
        success: `${itemCarrinhoDoc.produto.nome} excluído com sucesso do carrinho`, // TODO - Fazer aparecer exatamente o nome do item que foi excluído
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Erro na operação de exclusão",
      });
    }
  }

  async meusItens(req, res) {
    console.log(req.body.idUsuario);
    const result = await Carrinho.find({
      usuario: req.body.idUsuario,
      aberto: true,
    }).populate("itensCarrinho");

    return res.status(200).json({
      result,
    });
  }
}

export default new ItensCarrinhoController();
