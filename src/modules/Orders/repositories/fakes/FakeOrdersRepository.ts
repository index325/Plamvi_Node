import ICreateOrderDTO from "@modules/Orders/dtos/ICreateOrderDTO";
import IOrderRepository from "@modules/Orders/repositories/IOrdersRepository";
import IUpdateFeeDTO from "@modules/Orders/dtos/IUpdateFeeDTO";

import Order from "../../infra/typeorm/entities/Order";

class FakeOrderRepository implements IOrderRepository {
  private orders: Order[] = [];
  
  public async create({ total }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    order.total = total;

    this.orders.push(order);

    return order;
  }
  public async updateFee({
    daysToDeliver,
    order_id,
    fee,
  }: IUpdateFeeDTO): Promise<Order | undefined> {
    const updatedOrderIndex = this.orders.findIndex(item => item.id === order_id);
    
    const updatedOrders = this.orders.map((item) => {
      if (item.id === order_id) {
        return {
          ...item,
          daysToDeliver,
          fee,
        }
      }

      return item;
    });

    this.orders = updatedOrders;

    return this.orders[updatedOrderIndex];
  }
}

export default FakeOrderRepository;
