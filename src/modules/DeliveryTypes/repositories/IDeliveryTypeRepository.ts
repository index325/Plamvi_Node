import DeliveryType from "../infra/typeorm/entities/DeliveryType";
import ICreateDeliveryTypeDTO from "@modules/DeliveryTypes/dtos/ICreateDeliveryTypeDTO";
import IFindByDescriptionAndCustomerIdDTO from "@modules/DeliveryTypes/dtos/IFindByDescriptionAndCustomerIdDTO";

export default interface IDeliveryTypeRepository {
  create(data: ICreateDeliveryTypeDTO): Promise<DeliveryType>;
  save(deliveryType: DeliveryType): Promise<DeliveryType>;
  findById(id: string): Promise<DeliveryType | undefined>;
  findAllByCustomer(customer_id: string): Promise<DeliveryType[] | undefined>;
  deleteById(id: string): Promise<void>;
  findByDescriptionAndCustomerId(data: IFindByDescriptionAndCustomerIdDTO): Promise<DeliveryType | undefined>;
}
