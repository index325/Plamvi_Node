import DeliveryType from "../infra/typeorm/entities/DeliveryType";
import AppError from "@shared/errors/AppError";
import IDeliveryTypeRepository from "../repositories/IDeliveryTypeRepository";
import { injectable, inject } from "tsyringe";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";

interface IRequest {
  description: string;
  customer_id: string;
}

@injectable()
export default class CreateDeliveryTypeService {
  constructor(
    @inject("DeliveryTypeRepository")
    private deliveryTypeRepository: IDeliveryTypeRepository
  ) {}

  public async execute({
    description,
    customer_id,
  }: IRequest): Promise<DeliveryType> {
    const checkDeliveryTypeExists = await this.deliveryTypeRepository.findByDescriptionAndCustomerId({description, customer_id});

    if (checkDeliveryTypeExists) {
      throw new AppError("Este tipo de entrega já está cadastrado");
    }

    const customer = await this.deliveryTypeRepository.create({
      description,
      customer_id,
    });

    return customer;
  }
}
