import Order from "../infra/typeorm/entities/Order";
import ICreateOrderDTO from "@modules/Orders/dtos/ICreateOrderDTO";
import IUpdateOrderDTO from "@modules/Orders/dtos/IUpdateFeeDTO";

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  updateFee(data: IUpdateOrderDTO): Promise<Order>;
}
