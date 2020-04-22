import Carrinho from "../models/Carrinho";
import Usuarios from "../models/Usuarios";
import ItensCarrinho from "../models/ItensCarrinho";

class CarrinhoController {
  async verificarCarrinho(req, res) {
    let result = await Carrinho.findOne({
      usuario: req.body.idUsuario,
      aberto: true
    }).populate('itensCarrinho');
    
    if (result) {
      return res.status(200).json({
        result
      });
    }

    const usuario = await Usuarios.findById(req.body.idUsuario)

    const carrinhoNew = new Carrinho({
        usuario: usuario,
    })
    result = await carrinhoNew.save()

    return res.status(200).json({
      success: "Carrinho criado com sucesso",
      result
    });
  }

  async fecharCarrinho(req, res) {
    if (
        Utils.validarRequest(req, res, ["carrinho"])
      ) {
        return false;
      }
    await Carrinho.find({
        usuario: req.body.idUsuario,
        _id: req.body.carrinho
      }).populate('itensCarrinho').then(function(result) {
        if (result.length > 0) {
            result.aberto = false
          return res.status(200).json({
            result
          });
        }
      });
      //TODO
  }
}

export default new CarrinhoController();
