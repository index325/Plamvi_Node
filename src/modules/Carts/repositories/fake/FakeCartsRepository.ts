import ICartsRepository from "@modules/Carts/repositories/ICartsRepository";
import Cart from "../../infra/typeorm/entities/Cart";
import ICreateCartDTO from "@modules/Carts/dtos/ICreateCartDTO";

class FakeCartsRepository implements ICartsRepository {
  private carts: Cart[] = [];

  public async findOpenedCartByUser(
    user_id: string
  ): Promise<Cart | undefined> {
    const cart = await this.carts.find(item => {
      return item.user_id === user_id && item.opened;
    });

    return cart;
  }

  public async findClosedCartByUser(
    user_id: string
  ): Promise<Cart | undefined> {
    const cart = await this.carts.find(item => {
      return item.user_id === user_id && !item.opened;
    });

    return cart;
  }

  public async create({ opened, user_id }: ICreateCartDTO): Promise<Cart> {
    const cart = new Cart();

    cart.user_id = user_id;
    cart.opened = opened;
    cart.cart_item = [];

    this.carts.push(cart);

    return cart;
  }

  public async closeCart(cart_id: string): Promise<void> {
  }
}

export default FakeCartsRepository;
