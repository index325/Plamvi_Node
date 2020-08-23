import { Request, Response } from "express";
import { container } from "tsyringe";

import VerifyCartService from "@modules/Carts/services/VerifyCartService";

export default class CartController {
  public async verifyCart(
    request: Request,
    response: Response
  ): Promise<Response> {
    const verifyCart = container.resolve(VerifyCartService);

    const cart = await verifyCart.execute(request.user.id as string);

    return response.json(cart);
  }
}
