import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import AppError from "@shared/errors/AppError";
import ICartRepository from "../repositories/ICartsRepository";
import { injectable, inject } from "tsyringe";


@injectable()
export default class VerifyCartService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartRepository
  ) {}

  public async execute(user_id: string): Promise<Cart> {
      let cart = await this.cartsRepository.findOpenedCartByUser(user_id);

      if (!cart) {
        cart = await this.cartsRepository.create({
          user_id,
          opened: true,
        });

        return cart;
      }

      return cart;
  }
}
