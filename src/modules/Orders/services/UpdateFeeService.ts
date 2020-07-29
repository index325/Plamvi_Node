import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import Order from "@modules/Orders/infra/typeorm/entities/Order";
import AppError from "@shared/errors/AppError";
import ICartRepository from "@modules/Carts/repositories/ICartsRepository";
import ICartItemsRepository from "@modules/Carts/repositories/ICartItemsRepository";
import IOrderRepository from "@modules/Orders/repositories/IOrdersRepository";
import IOrderProductRepository from "@modules/Orders/repositories/IOrderProductsRepository";

import { injectable, inject } from "tsyringe";

interface IRequest {
  order_id: string;
  fee: number;
  daysToDeliver: number;
}

@injectable()
export default class DoCheckoutService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrderRepository
  ) {}

  public async execute(data: IRequest): Promise<Order | undefined> {
    const order = await this.ordersRepository.updateFee({
      order_id: data.order_id,
      fee: data.fee,
      daysToDeliver: data.daysToDeliver,
    });

    return order;
  }
}
