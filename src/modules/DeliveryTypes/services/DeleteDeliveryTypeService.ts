import AppError from "@shared/errors/AppError";
import IDeliveryTypeRepository from "../repositories/IDeliveryTypeRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  id: string;
  customer_id: string;
}

@injectable()
export default class UpdateDeliveryTypeService {
  constructor(
    @inject("DeliveryTypeRepository")
    private deliveryTypeRepository: IDeliveryTypeRepository
  ) {}

  public async execute({ id, customer_id }: IRequest): Promise<void> {
    const deliveryType = await this.deliveryTypeRepository.findById(id);

    if (!deliveryType) {
      throw new AppError("Este tipo de entrega não foi encontrado");
    }

    if (deliveryType.customer_id !== customer_id) {
      throw new AppError(
        "Este tipo de entrega não pertence a este estabelecimento"
      );
    }
    await this.deliveryTypeRepository.deleteById(id);
  }
}
