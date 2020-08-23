import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateFeeService from "@modules/Orders/services/UpdateFeeService";

export default class OrderProductController {
  public async updateFee(
    request: Request,
    response: Response
  ): Promise<Response> {
    const updateFeeService = container.resolve(UpdateFeeService);

    const order = await updateFeeService.execute({
      order_id: request.body.order_id,
      fee: request.body.fee,
      daysToDeliver: request.body.daysToDeliver,
    });

    return response.json(order);
  }
}
