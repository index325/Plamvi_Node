import DeliveryType from "../infra/typeorm/entities/DeliveryType";

import IDeliveryTypeRepository from "../repositories/IDeliveryTypeRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  customer_id: string;
}

@injectable()
export default class ListAllDeliveryTypesByCustomerService {
  constructor(
    @inject("DeliveryTypeRepository")
    private deliveryTypeRepository: IDeliveryTypeRepository
  ) {}

  public async execute({
    customer_id,
  }: IRequest): Promise<DeliveryType[] | undefined> {
    return await this.deliveryTypeRepository.findAllByCustomer(customer_id);
  }
}
