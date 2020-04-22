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
      const itemCarrinho1 = await ItensCarrinho.findById(result._id)
      
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
    console.log(req.body.idUsuario);
    const result = await ItensCarrinho.find({
      usuario: req.body.idUsuario,
    }).populate({
      path: "carrinho",
      match: { aberto: true },
    });

    return res.status(200).json({
      result,
    });
  }
}

export default new ItensCarrinhoController();
