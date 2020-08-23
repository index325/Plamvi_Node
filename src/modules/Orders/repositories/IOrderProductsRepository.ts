import OrderProduct from "../infra/typeorm/entities/OrderProduct";
import ICreateOrderProductDTO from "@modules/Orders/dtos/ICreateOrderProductDTO";

export default interface IOrdersRepository {
  create(data: ICreateOrderProductDTO): Promise<OrderProduct>;
}
