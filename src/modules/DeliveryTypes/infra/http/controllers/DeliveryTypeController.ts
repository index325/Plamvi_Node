import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateDeliveryTypeService from "@modules/DeliveryTypes/services/CreateDeliveryTypeService";
import UpdateDeliveryTypeService from "@modules/DeliveryTypes/services/UpdateDeliveryTypeService";
import DeleteDeliveryTypeService from "@modules/DeliveryTypes/services/DeleteDeliveryTypeService";
import ListAllDeliveryTypesByCustomerService from "@modules/DeliveryTypes/services/ListAllDeliveryTypesByCustomerService";

export default class DeliveryTypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.customer;
    const { description } = request.body;

    const createDeliveryType = container.resolve(CreateDeliveryTypeService);

    const deliveryType = await createDeliveryType.execute({
      description,
      customer_id: id,
    });

    return response.json(deliveryType);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.customer;
    const { description } = request.body;
    const deliveryTypeId = request.params.id;

    const updateDeliveryType = container.resolve(UpdateDeliveryTypeService);

    const deliveryType = await updateDeliveryType.execute({
      description,
      customer_id: id,
      id: deliveryTypeId
    });

    return response.json(deliveryType);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.customer;
    const deliveryTypeId = request.params.id;

    const deleteDeliveryType = container.resolve(DeleteDeliveryTypeService);

    const deliveryType = await deleteDeliveryType.execute({
      customer_id: id,
      id: deliveryTypeId
    });

    return response.json(deliveryType);
  }

  public async listAllByCustomerId(request: Request, response: Response): Promise<Response> {
    const { id } = request.customer;
    const {} = request.body

    const listAllDeliveryTypesByCustomerService = container.resolve(ListAllDeliveryTypesByCustomerService);

    const deliveryTypes = await listAllDeliveryTypesByCustomerService.execute({
      customer_id: id,
    });

    return response.json(deliveryTypes);
  }
}
