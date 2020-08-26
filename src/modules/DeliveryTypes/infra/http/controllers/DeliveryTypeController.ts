import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateDeliveryTypeService from "@modules/DeliveryTypes/services/CreateDeliveryTypeService";

export default class DeliveryTypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.customer;
    const { description } = request.body;

    const createUser = container.resolve(CreateDeliveryTypeService);

    const deliveryType = await createUser.execute({
      description,
      customer_id: id,
    });

    return response.json(deliveryType);
  }
}
