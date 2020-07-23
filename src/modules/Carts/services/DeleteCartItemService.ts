import AppError from "@shared/errors/AppError";
import ICartItemRepository from "../repositories/ICartItemsRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  cart_item_id: string;
}

@injectable()
export default class DeleteCartItemService {
  constructor(
    @inject("CartItemsRepository")
    private cartItemsRepository: ICartItemRepository
  ) {}

  public async execute({ cart_item_id }: IRequest): Promise<void> {
    try {
      await this.cartItemsRepository.delete({ cart_item_id });
    } catch (error) {
      throw new AppError("Um erro ocorreu ao deletar do carrinho", 400);
    }
  }
}
