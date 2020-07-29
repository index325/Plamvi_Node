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
    await this.cartItemsRepository.delete({ cart_item_id });
  }
}
