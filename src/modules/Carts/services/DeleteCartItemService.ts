import AppError from "@shared/errors/AppError";
import ICartItemRepository from "../repositories/ICartItemsRepository";
import { injectable, inject } from "tsyringe";
import Cart from "../infra/typeorm/entities/Cart";
import { String } from "aws-sdk/clients/cloudsearch";
import ICartsRepository from "../repositories/ICartsRepository";

interface IRequest {
  cart_item_id: string;
  user_id: String;
}

@injectable()
export default class DeleteCartItemService {
  constructor(
    @inject("CartItemsRepository")
    private cartItemsRepository: ICartItemRepository,
    @inject("CartsRepository")
    private cartsRepository: ICartsRepository
  ) {}

  public async execute({
    cart_item_id,
    user_id,
  }: IRequest): Promise<Cart | undefined> {
    await this.cartItemsRepository.delete({ cart_item_id });

    return await this.cartsRepository.findOpenedCartByUser(user_id);
  }
}
