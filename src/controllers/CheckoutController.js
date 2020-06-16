import Cart from "../models/Cart";
import User from "../models/User";
import Order from "../models/Order";
import OrderProducts from "../models/OrderProducts";
import db from "../database";

class CheckoutController {
  async fecharCarrinho(req, res) {
    const { user } = req.body;

    const usuario = await User.findByPk(user);

    if (!usuario) {
      return res.status(400).json({
        error: "Usuário não encontrado",
      });
    }

    let cartClosed = await Cart.findOne({
      where: { user_id: user, opened: false },
    });

    if (cartClosed) {
      return res.status(401).json({
        error:
          "Impossível fazer checkout novamente. Você já tem um pedido em aberto.",
      });
    }

    const cart = await Cart.findOne({
      include: [{ association: "cart_itens", include: ["product"] }],
      where: { user_id: user, opened: true },
    });

    const transaction = await db.transaction();
    try {
      var total = 0;

      cart.cart_itens.map(async (item) => {
        total += item.quantity * item.product.price;
      });

      const order = await Order.create({
        total,
      });

      cart.cart_itens.map(async (item) => {
        await OrderProducts.create({
          product_id: item.product.id,
          order_id: order.id,
        });
        await item.destroy();
      });

      cart.update({
        opened: false,
      });

      await transaction.commit();

      res.status(200).json({
        result: {
          order,
        },
      });
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      res.status(500).json({
        error: "Ocorreu um erro ao criar o pedido",
      });
    }
  }
  async adicionarFrete(req, res) {
    const { user, order_id, fee, daysToDeliver } = req.body;

    const order = await Order.findByPk(order_id);

    if (!order) {
      res.status(500).json({
        error: "Pedido não encontrado",
      });
    }

    await order.update({
      fee,
      daysToDeliver,
    });

    return res.status(200).json({
      result: order,
    });
  }
}

export default new CheckoutController();
