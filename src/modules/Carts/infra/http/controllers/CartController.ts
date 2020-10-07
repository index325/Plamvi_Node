import { Request, Response } from "express";
import { container } from "tsyringe";

import VerifyCartService from "@modules/Carts/services/VerifyCartService";

export default class CartController {
  public async verifyCart(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.user;
    const { customer_id } = request.body;

    const verifyCart = container.resolve(VerifyCartService);

    const cart = await verifyCart.execute({ user_id: id, customer_id });

    return response.json(cart);
  }
}
