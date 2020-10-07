import { Request, Response } from "express";
import { container } from "tsyringe";

import AddToCartService from "@modules/Carts/services/AddToCartService";
import DeleteCartItemService from "@modules/Carts/services/DeleteCartItemService";
import UpdateCartItemService from "@modules/Carts/services/UpdateCartItemService";

export default class CartItemController {
  public async create(request: Request, response: Response): Promise<Response> {
    const addToCart = container.resolve(AddToCartService);

    const { quantity, product_id } = request.body;
    const { id } = request.user;

    const cart = await addToCart.execute({
      user_id: id,
      quantity,
      product_id,
    });

    return response.json(cart);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCartItem = container.resolve(DeleteCartItemService);
    const { id } = request.user;
    const { cart_item_id } = request.params;

    const cart = await deleteCartItem.execute({
      user_id: id,
      cart_item_id,
    });

    return response.json(cart);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCartItem = container.resolve(UpdateCartItemService);

    const { quantity } = request.body;

    const { cart_item_id } = request.params;

    const { id } = request.user;

    const cart = await updateCartItem.execute({
      cart_item_id,
      quantity,
      user_id: id,
    });

    return response.json(cart);
  }
}
