import { getRepository, Repository } from "typeorm";

import ICartsRepository from "@modules/Carts/repositories/ICartsRepository";
import Cart from "../entities/Cart";
import User from "@modules/Users/infra/typeorm/entities/User";
import ICreateCartDTO from "@modules/Carts/dtos/ICreateCartDTO";

class CartsRepository implements ICartsRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = getRepository(Cart);
  }
  public async findOpenedCartByUser(user_id: string): Promise<Cart | undefined> {
    const cart = this.ormRepository.findOne({
      where: { user_id, opened: true },
    });

    return cart;
  }
  public async create(data: ICreateCartDTO): Promise<Cart> {
    const cart = this.ormRepository.create(data);

    await this.ormRepository.save(cart);

    return cart;
  }
}

export default CartsRepository;
