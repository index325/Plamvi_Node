import { Request, Response } from "express";
import { container } from "tsyringe";

import DoCheckoutService from "@modules/Orders/services/DoCheckoutService";

export default class OrderProductController {
  public async doCheckout(
    request: Request,
    response: Response
  ): Promise<Response> {
    const doCheckoutService = container.resolve(DoCheckoutService);

    const order = await doCheckoutService.execute({ user_id: request.user.id });

    return response.json(order);
  }
}
