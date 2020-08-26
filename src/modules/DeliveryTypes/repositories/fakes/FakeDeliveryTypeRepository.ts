import { uuid } from "uuidv4";

import DeliveryType from "@modules/DeliveryTypes/infra/typeorm/entities/DeliveryType";
import IDeliveryTypeRepository from "@modules/DeliveryTypes/repositories/IDeliveryTypeRepository";
import ICreateDeliveryTypeDTO from "@modules/DeliveryTypes/dtos/ICreateDeliveryTypeDTO";
import IFindByDescriptionAndCustomerIdDTO from "@modules/DeliveryTypes/dtos/IFindByDescriptionAndCustomerIdDTO";

export default class DeliveryTypeRepository implements IDeliveryTypeRepository {
  public deliveryTypes: DeliveryType[] = []; // deveria ser private, só que está bugando no teste de delete, ele não entende quando está vazio

  public async create(data: ICreateDeliveryTypeDTO): Promise<DeliveryType> {
    const deliveryType = new DeliveryType();

    Object.assign(deliveryType, { id: uuid() }, data);

    this.deliveryTypes.push(deliveryType);

    return deliveryType;
  }
  public async save(deliveryType: DeliveryType): Promise<DeliveryType> {
    const findIndex = this.deliveryTypes.findIndex(
      (dt) => dt.id === deliveryType.id
    );

    this.deliveryTypes[findIndex] = deliveryType;

    return deliveryType;
  }

  public async findById(id: string): Promise<DeliveryType | undefined> {
    const findIndex = this.deliveryTypes.findIndex((dt) => dt.id === id);

    return this.deliveryTypes[findIndex];
  }
  public async findAllByCustomer(
    customer_id: string
  ): Promise<DeliveryType[] | undefined> {
    let deliveryTypesFiltered = [];

    deliveryTypesFiltered = this.deliveryTypes.filter(
      (dt) => dt.customer_id === customer_id
    );

    return deliveryTypesFiltered;
  }
  public async deleteById(id: string): Promise<void> {
    const findIndex = this.deliveryTypes.findIndex((dt) => dt.id === id);

    this.deliveryTypes.splice(findIndex);
  }

  public async findByDescriptionAndCustomerId({
    customer_id,
    description,
  }: IFindByDescriptionAndCustomerIdDTO): Promise<DeliveryType | undefined> {
    const findIndex = this.deliveryTypes.find(
      (dt) => dt.customer_id === customer_id && dt.description === description
    );

    return findIndex;
  }
}
