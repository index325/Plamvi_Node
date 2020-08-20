import { getRepository, Repository } from "typeorm";

import ICartItemsRepository from "@modules/Carts/repositories/ICartItemsRepository";
import ICreateCartItemsDTO from "@modules/Carts/dtos/ICreateCartItemsDTO";
import CartItem from "../entities/CartItem";
import IDeleteCartItemsDTO from "@modules/Carts/dtos/IDeleteCartItemsDTO";
import IVerifyIfProductAlreadyExistsOnCartItemsDTO from "@modules/Carts/dtos/IVerifyIfProductAlreadyExistsOnCartItemsDTO";
import IIncrementProductQuantityDTO from "@modules/Carts/dtos/IIncrementProductQuantityDTO";

class CartItemsRepository implements ICartItemsRepository {
  private ormRepository: Repository<CartItem>;

  constructor() {
    this.ormRepository = getRepository(CartItem);
  }

  public async findById(cart_item_id: string): Promise<CartItem | undefined> {
    return await this.ormRepository.findOne(cart_item_id);
  }
  public async create(data: ICreateCartItemsDTO): Promise<CartItem> {
    const cart = this.ormRepository.create(data);

    await this.ormRepository.save(cart);

    return cart;
  }

  public async delete({ cart_item_id }: IDeleteCartItemsDTO): Promise<void> {
    this.ormRepository.delete({
      id: cart_item_id,
    });
  }

  public async verifyIfProductAlreadyExistsOnCartItems({
    product_id,
    cart_id,
  }: IVerifyIfProductAlreadyExistsOnCartItemsDTO): Promise<
    CartItem | undefined
  > {
    return await this.ormRepository.findOne({
      relations: ["product"],
      where: { cart_id, product_id },
    });
  }

  public async incrementProductQuantity({
    quantity,
    cart_item_id,
  }: IIncrementProductQuantityDTO): Promise<void> {
    await this.ormRepository.increment(
      { id: cart_item_id },
      "quantity",
      quantity
    );
  }
}

export default CartItemsRepository;
