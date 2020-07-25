import { getRepository, Repository, UpdateResult } from "typeorm";

import ICreateOrderDTO from "@modules/Orders/dtos/ICreateOrderDTO";
import IOrderRepository from "@modules/Orders/repositories/IOrdersRepository";
import IUpdateFeeDTO from "@modules/Orders/dtos/IUpdateFeeDTO";
import Order from "../entities/Order";

class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }
  public async create(data: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);

    await this.ormRepository.save(order);

    return order;
  }
  public async updateFee(data: IUpdateFeeDTO): Promise<Order | undefined> {
    await this.ormRepository.update(
      { id: data.order_id },
      { fee: data.fee, daysToDeliver: data.daysToDeliver }
    );

    return this.ormRepository.findOne(data.order_id);
  }
}

export default OrderRepository;
