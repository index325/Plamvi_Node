import { getRepository, Repository } from "typeorm";

import ICreateOrderProductDTO from "@modules/Orders/dtos/ICreateOrderProductDTO";
import IOrderProductsRepository from "@modules/Orders/repositories/IOrderProductsRepository";
import OrderProduct from "../entities/OrderProduct";

class OrderProductRepository implements IOrderProductsRepository {
  private ormRepository: Repository<OrderProduct>;

  constructor() {
    this.ormRepository = getRepository(OrderProduct);
  }

  public async create(data: ICreateOrderProductDTO): Promise<OrderProduct> {
    const cart = this.ormRepository.create(data);

    await this.ormRepository.save(cart);

    return cart;
  }
}

export default OrderProductRepository;
