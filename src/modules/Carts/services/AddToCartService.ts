import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import AppError from "@shared/errors/AppError";
import ICartRepository from "../repositories/ICartsRepository";
import ICartItemRepository from "../repositories/ICartItemsRepository";
import { injectable, inject } from "tsyringe";
import User from "@modules/Users/infra/typeorm/entities/User";
import CartItem from "../infra/typeorm/entities/CartItem";

interface IRequest {
  user_id: string;
  quantity: number;
  product_id: string;
}

@injectable()
export default class VerifyCartService {
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
    try {
      if (quantity === undefined || quantity <= 0) {
        throw new AppError("A quantidade não pode ser zero.", 400);
      }
      const cart = await this.cartsRepository.findOpenedCartByUser(user_id);

      if (!cart) {
        throw new AppError("O usuário não tem carrinho.", 400);
      }

      let alreadyExistsProductOnCart = await this.cartItemsRepository.verifyIfProductAlreadyExistsOnCartItems(
        { product_id, cart_id: cart.id }
      );

      if (alreadyExistsProductOnCart) {
        this.cartItemsRepository.incrementProductQuantity({
          quantity,
          cart_item_id: alreadyExistsProductOnCart.id,
        });
      } else {
        this.cartItemsRepository.create({
          quantity,
          cart_id: cart.id,
          product_id,
        });
      }

      return await this.cartsRepository.findOpenedCartByUser(user_id);
    } catch (error) {
      throw new AppError("Um erro ocorreu ao adicionar ao carrinho", 400);
    }
  }
}
