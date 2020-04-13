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
        .required()
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!"
      });
    }

    if (Utils.validarRequest(req, res, ["produto"])) {
      return false;
    }

    let produto = mongoose.Types.ObjectId(req.body.produto);

    const carrinho = await Carrinho.findOne({
      usuario: req.body.idUsuario,
      aberto: true
    });

    const itemCarrinho = new ItensCarrinho({
      usuario: req.body.idUsuario,
      carrinho: carrinho,
      quantidade: req.body.quantidade,
      produto: produto
    });

    const produtoFind = await Produtos.findById(produto);

    try {
      const result = await itemCarrinho.save();
      console.log(produtoFind);
      return res.status(200).json({
        success: `${produtoFind.nome} adicionado ao carrinho com sucesso.`,
        result
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Erro na operação de cadastro"
      });
    }
  }

  async excluirItem(req, res) {
    // await Carrinho.find({
    //   usuario: req.body.idUsuario,
    //   aberto: true
    // }).then(function(result) {
    //   if (result.length > 0) {
    //     return res.status(200).json({
    //       result
    //     });
    //   }
    //   carrinhoNew = new Carrinho({
    //       usuario: req.body.idUsuario,
    //   })
    //   const result = await carrinhoNew.save()
    //   return res.status(200).json({
    //     success: "Carrinho criado com sucesso"
    //   });
    // });
  }

  async meusItens(req, res) {
    const itens = await ItensCarrinho.find({
      usuario: req.body.idUsuario
    })
      .populate("carrinho")
      .find({ aberto: true })
      .select("itensCarrinho");

    return res.status(200).json({
      itens
    });
  }
}

export default new ItensCarrinhoController();
