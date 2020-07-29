import Cart from "@modules/Carts/infra/typeorm/entities/Cart";
import Order from "@modules/Orders/infra/typeorm/entities/Order";
import AppError from "@shared/errors/AppError";
import ICartRepository from "@modules/Carts/repositories/ICartsRepository";
import ICartItemsRepository from "@modules/Carts/repositories/ICartItemsRepository";
import IOrderRepository from "@modules/Orders/repositories/IOrdersRepository";
import IOrderProductRepository from "@modules/Orders/repositories/IOrderProductsRepository";

import { injectable, inject } from "tsyringe";

interface IRequest {
  user_id: string;
}

@injectable()
export default class DoCheckoutService {
  constructor(
    @inject("CartsRepository")
    private cartsRepository: ICartRepository,
    @inject("CartItemRepository")
    private cartItemsRepository: ICartItemsRepository,
    @inject("OrdersRepository")
    private ordersRepository: IOrderRepository,
    @inject("OrderProductsRepository")
    private orderProductsRepository: IOrderProductRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Order | undefined> {
    const closedCart = await this.cartsRepository.findClosedCartByUser(user_id);

    if (closedCart) {
      throw new AppError(
        "Impossível fazer checkout novamente. Você já tem um pedido em aberto.",
        400
      );
    }

    const cart = await this.cartsRepository.findOpenedCartByUser(user_id);

    if (!cart) {
      throw new AppError("Carrinho não encontrado.");
    }

    let total = 0;

    cart.cart_item.map((item) => {
      total += item.product.price * item.quantity;
    });

    const order = await this.ordersRepository.create({
      total,
    });

    cart.cart_item.map(async (item) => {
      await this.orderProductsRepository.create({
        order_id: order.id,
        product_id: item.product.id,
      });

      await this.cartItemsRepository.delete({ cart_item_id: item.id });
    });

    await this.cartsRepository.closeCart(cart.id);

    return order;
  }
}
