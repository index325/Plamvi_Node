import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import AppError from "@shared/errors/AppError";
import ICartRepository from "../repositories/ICartsRepository";
import ICartItemRepository from "../repositories/ICartItemsRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  user_id: string;
  quantity: number;
  product_id: string;
}

@injectable()
export default class AddToCartService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartRepository,
    @inject("CartItemsRepository")
    private cartItemsRepository: ICartItemRepository
  ) {}

  public async execute({
    user_id,
    quantity,
    product_id,
  }: IRequest): Promise<Cart | undefined> {
    if (quantity === undefined || quantity <= 0) {
      throw new AppError("A quantidade não pode ser zero.", 400);
    }
    const cart = await this.cartsRepository.findOpenedCartByUser(user_id);

    if (!cart) {
      throw new AppError("O usuário não tem carrinho.", 400);
    }

    let productAlreadyExistsOnCart = await this.cartItemsRepository.verifyIfProductAlreadyExistsOnCartItems(
      { product_id, cart_id: cart.id }
    );

    if (productAlreadyExistsOnCart) {
      await this.cartItemsRepository.incrementProductQuantity({
        quantity,
        cart_item_id: productAlreadyExistsOnCart.id,
      });
    } else {
      await this.cartItemsRepository.create({
        quantity,
        cart_id: cart.id,
        product_id,
      });
    }

    return await this.cartsRepository.findOpenedCartByUser(user_id);
  }
}
