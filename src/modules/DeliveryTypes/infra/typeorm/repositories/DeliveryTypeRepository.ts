import { getRepository, Repository } from "typeorm";

import DeliveryType from "@modules/DeliveryTypes/infra/typeorm/entities/DeliveryType";
import IDeliveryTypeRepository from "@modules/DeliveryTypes/repositories/IDeliveryTypeRepository";
import ICreateDeliveryTypeDTO from "@modules/DeliveryTypes/dtos/ICreateDeliveryTypeDTO";
import IFindByDescriptionAndCustomerIdDTO from "@modules/DeliveryTypes/dtos/IFindByDescriptionAndCustomerIdDTO";

export default class DeliveryTypeRepository implements IDeliveryTypeRepository {
  private ormRepository: Repository<DeliveryType>;

  constructor() {
    this.ormRepository = getRepository(DeliveryType);
  }

  public async create(data: ICreateDeliveryTypeDTO): Promise<DeliveryType> {
    const deliveryType = this.ormRepository.create(data);

    return this.ormRepository.save(deliveryType);
  }
  public async save(deliveryType: DeliveryType): Promise<DeliveryType> {
    return this.ormRepository.save(deliveryType);
  }
  public async findById(id: string): Promise<DeliveryType | undefined> {
    return this.ormRepository.findOne(id);
  }
  public async findAllByCustomer(
    customer_id: string
  ): Promise<DeliveryType[] | undefined> {
    return this.ormRepository.find({
      where: {
        customer_id,
      },
    });
  }
  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByDescriptionAndCustomerId({
    customer_id,
    description,
  }: IFindByDescriptionAndCustomerIdDTO): Promise<DeliveryType | undefined> {
    return this.ormRepository.findOne({
      where: {
        customer_id: customer_id,
        description: description,
      },
    });
  }
}
