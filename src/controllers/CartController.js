import Cart from "../models/Cart";
import User from "../models/User";

class CarrinhoController {
  async verificarCarrinho(req, res) {
    let { user } = req.body;

    const usuario = await User.findByPk(user);

    if (!usuario) {
      return res.status(400).json({
        error: "Usuário não encontrado",
      });
    }

    let cart = await Cart.findOne({
      include: [{ association: "cart_itens", include: ["product"] }],
      where: { user_id: user, opened: true },
    });

    if (cart) {
      return res.status(200).json({
        result: cart,
        order_pending: false,
      });
    } else {
      let cart = await Cart.findOne({
        include: [{ association: "cart_itens", include: ["product"] }],
        where: { user_id: user, opened: false },
      });
      if (cart) {
        return res.status(200).json({
          message: "Você tem um pedido em aberto. Finalize a sua compra",
          result: cart,
          order_pending: true,
        });
      }
    }

    await Cart.create({
      user_id: user,
      opened: true,
    });

    cart = await Cart.findOne({
      include: [{ association: "cart_itens", include: ["product"] }],
      where: { user_id: user, opened: true },
    });

    return res.status(200).json({
      success: "Carrinho criado com sucesso",
      result: cart,
      order_pending: false,
    });
  }

  async fecharCarrinho(req, res) {
    //TODO
  }
}

export default new CarrinhoController();
