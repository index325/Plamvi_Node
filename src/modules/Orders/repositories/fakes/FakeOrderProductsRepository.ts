import ICreateOrderProductDTO from "@modules/Orders/dtos/ICreateOrderProductDTO";
import IOrderProductsRepository from "@modules/Orders/repositories/IOrderProductsRepository";
import IUpdateFeeDTO from "@modules/Orders/dtos/IUpdateFeeDTO";

import OrderProduct from "../../infra/typeorm/entities/OrderProduct";

class FakeOrderProductsRepository implements IOrderProductsRepository {
  private orders: OrderProduct[] = [];
  
  public async create({ order_id, product_id }: ICreateOrderProductDTO): Promise<OrderProduct> {
    const orderProduct = new OrderProduct();

    orderProduct.order_id = order_id;
    orderProduct.product_id = product_id;

    this.orders.push(orderProduct);

    return orderProduct;
  }
}

export default FakeOrderProductsRepository;
