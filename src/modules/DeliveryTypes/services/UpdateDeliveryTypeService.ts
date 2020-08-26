import DeliveryType from "../infra/typeorm/entities/DeliveryType";
import AppError from "@shared/errors/AppError";
import IDeliveryTypeRepository from "../repositories/IDeliveryTypeRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  id: string;
  description: string;
  customer_id: string;
}

@injectable()
export default class UpdateDeliveryTypeService {
  constructor(
    @inject("DeliveryTypeRepository")
    private deliveryTypeRepository: IDeliveryTypeRepository
  ) {}

  public async execute({
    id,
    description,
    customer_id,
  }: IRequest): Promise<DeliveryType> {
    const checkDeliveryTypeExists = await this.deliveryTypeRepository.findByDescriptionAndCustomerId(
      { description, customer_id }
    );

    if (checkDeliveryTypeExists && checkDeliveryTypeExists.id !== id) {
      throw new AppError("Este tipo de entrega já está cadastrado");
    }

    const deliveryType = await this.deliveryTypeRepository.findById(id);

    if (!deliveryType) {
      throw new AppError("Este tipo de entrega não foi encontrado");
    }

    deliveryType.description = description;

    return await this.deliveryTypeRepository.save(deliveryType);
  }
}
