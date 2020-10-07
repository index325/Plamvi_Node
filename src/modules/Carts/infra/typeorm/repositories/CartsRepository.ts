import { getRepository, Repository } from "typeorm";

import ICartsRepository from "@modules/Carts/repositories/ICartsRepository";
import Cart from "../entities/Cart";
import ICreateCartDTO from "@modules/Carts/dtos/ICreateCartDTO";
import IFindOpenedCartByUserAndCustomerDTO from "@modules/Carts/dtos/IFindOpenedCartByUserAndCustomerDTO";

class CartsRepository implements ICartsRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = getRepository(Cart);
  }

  public async findOpenedCartByUser(
    user_id: string
  ): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: { user_id, opened: true },
    });

    return cart;
  }

  public async findClosedCartByUser(
    user_id: string
  ): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: { user_id, opened: false },
    });

    return cart;
  }

  public async create(data: ICreateCartDTO): Promise<Cart> {
    const cart = this.ormRepository.create(data);

    await this.ormRepository.save(cart);

    return cart;
  }

  public async closeCart(cart_id: string): Promise<void> {
    await this.ormRepository.update(cart_id, { opened: false });
  }

  public async findOpenedCartByUserAndCustomer(
    data: IFindOpenedCartByUserAndCustomerDTO
  ): Promise<Cart | undefined> {
    const { user_id, customer_id } = data;

    const cart = await this.ormRepository.findOne({
      where: { user_id, customer_id, opened: true },
    });

    return cart;
  }
}

export default CartsRepository;
