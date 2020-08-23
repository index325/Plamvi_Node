import { Request, Response } from "express";
import { container } from "tsyringe";

import AddToCartService from "@modules/Carts/services/AddToCartService";
import DeleteCartItemService from "@modules/Carts/services/DeleteCartItemService";

export default class CartItemController {
  public async create(request: Request, response: Response): Promise<Response> {
    const addToCart = container.resolve(AddToCartService);

    const cart = await addToCart.execute({
      user_id: request.user.id,
      quantity: request.body.quantity,
      product_id: request.body.product_id,
    });

    return response.json(cart);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCartItem = container.resolve(DeleteCartItemService);

    deleteCartItem.execute({
      cart_item_id: request.body.cart_item_id,
    });

    return response.status(203).send();
  }
}
