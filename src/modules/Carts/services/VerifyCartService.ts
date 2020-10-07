import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import AppError from "@shared/errors/AppError";
import ICartRepository from "../repositories/ICartsRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  user_id: string;
  customer_id: string;
}

@injectable()
export default class VerifyCartService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartRepository
  ) {}

  public async execute({ user_id, customer_id }: IRequest): Promise<Cart> {
    let cart = await this.cartsRepository.findOpenedCartByUserAndCustomer({
      user_id,
      customer_id,
    });

    if (!cart) {
      cart = await this.cartsRepository.create({
        user_id,
        opened: true,
        customer_id,
      });
    }

    return (await this.cartsRepository.findOpenedCartByUserAndCustomer({
      user_id,
      customer_id,
    })) as Cart;
  }
}
