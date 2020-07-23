import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import AppError from "@shared/errors/AppError";
import ICartRepository from "../repositories/ICartsRepository";
import { injectable, inject } from "tsyringe";
import User from "@modules/Users/infra/typeorm/entities/User";


@injectable()
export default class VerifyCartService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartRepository
  ) {}

  public async execute(user_id: string): Promise<Cart | undefined> {
    try {
      const cart = this.cartsRepository.findOpenedCartByUser(user_id);

      if (!cart) {
        this.cartsRepository.create({
          user_id,
          opened: true,
        });

        return cart;
      }

      return cart;
    } catch (error) {
      throw new AppError("Um erro ocorreu ao verificar o carrinho", 400);
    }
  }
}
