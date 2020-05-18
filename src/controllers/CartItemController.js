import Product from "../models/Product";
import Cart from "../models/Cart";
import CartItem from "../models/CartItem";
import * as Yup from "yup";

class ItensCarrinhoController {
  async guardarItem(req, res) {
    const validacao = Yup.object().shape({
      quantity: Yup.number()
        .moreThan(0)
        .required(),
    });

    if (!(await validacao.isValid(req.body))) {
      return res.status(400).json({
        error: "A validação está incorreta!",
      });
    }

    const { product, user, quantity } = req.body;

    let cart = await Cart.findOne({
      include: { association: "cart_itens" },
      where: { user_id: user, opened: true },
    });

    await CartItem.create({
      product_id: product,
      quantity,
      cart_id: cart.id,
    });

    cart = await Cart.findOne({
      include: [
        { association: "cart_itens", include: [{ association: "product" }] },
      ],
      where: { user_id: user, opened: true },
    });

    const productFind = await Product.findByPk(product);

    try {
      return res.status(200).json({
        success: `${productFind.name} adicionado ao carrinho com sucesso.`,
        result: cart,
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
      const { cart_item, user } = req.body;

      const cart = await Cart.findOne({
        where: { user_id: user, opened: true },
      });

      const cartItem = await CartItem.findOne({
        include: ["product"],
        where: {
          id: cart_item,
        },
      });

      if (!cartItem) {
        return res.status(404).json({
          error: "Item não encontrado",
        });
      }

      if (cart.cart_itens.length < 1) {
        return res.status(404).json({
          error: "O carrinho está vazio",
        });
      }

      await CartItem.destroy({
        where: { id: cart_item },
      });

      return res.status(200).json({
        success: `${cartItem.product.name} excluído com sucesso do carrinho`,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Erro na operação de exclusão",
      });
    }
  }

  async meusItens(req, res) {
    const { user } = req.body;

    const result = await Cart.findOne({
      include: [
        { association: "cart_itens", include: [{ association: "product" }] },
      ],
      where: { user_id: user, opened: true },
    });

    return res.status(200).json({
      result,
    });
  }
}

export default new ItensCarrinhoController();
