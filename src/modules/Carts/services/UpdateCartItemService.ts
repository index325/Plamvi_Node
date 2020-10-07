import AppError from "@shared/errors/AppError";
import ICartItemRepository from "../repositories/ICartItemsRepository";
import { injectable, inject } from "tsyringe";
import Cart from "../infra/typeorm/entities/Cart";
import ICartsRepository from "../repositories/ICartsRepository";

interface IRequest {
  user_id: string;
  cart_item_id: string;
  quantity: number;
}

@injectable()
export default class UpdateCartItemService {
  constructor(
    @inject("CartItemsRepository")
    private cartItemsRepository: ICartItemRepository,
    @inject("CartsRepository")
    private cartsRepository: ICartsRepository
  ) {}

  public async execute({
    user_id,
    cart_item_id,
    quantity,
  }: IRequest): Promise<Cart | undefined> {
    await this.cartItemsRepository.updateProductQuantity({
      cart_item_id,
      quantity,
    });

    return await this.cartsRepository.findOpenedCartByUser(user_id);
  }
}
