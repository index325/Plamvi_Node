import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import AppError from "@shared/errors/AppError";
import ICartRepository from "../repositories/ICartsRepository";
import { injectable, inject } from "tsyringe";
import User from "@modules/Users/infra/typeorm/entities/User";

interface IRequest {
  user: User;
}

interface IResponse {
  cart: Cart;
}

@injectable()
export default class VerifyCartService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartRepository
  ) {}

  public async execute({ user }: IRequest): Promise<IResponse | undefined> {
    const cart = this.cartsRepository.findOpenedCartByUser();

    if (!cart) {
      this.cartsRepository.create({
        user: user,
        opened: true,
      });

      return cart;
    }

    return cart;
  }
}
