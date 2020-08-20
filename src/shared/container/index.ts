import { container } from "tsyringe";

import "@modules/Users/providers";
import "@modules/Customers/providers";
import "./providers";

import ICartItemsRepository from "@modules/Carts/repositories/ICartItemsRepository";
import CartItemsRepository from "@modules/Carts/infra/typeorm/repositories/CartItemsRepository";

import ICartRepository from "@modules/Carts/repositories/ICartsRepository";
import CartRepository from "@modules/Carts/infra/typeorm/repositories/CartsRepository";

import IOrdersRepository from "@modules/Orders/repositories/IOrdersRepository";
import OrderRepository from "@modules/Orders/infra/typeorm/repositories/OrderRepository";

import IOrderProductRepository from "@modules/Orders/repositories/IOrderProductsRepository";
import OrderProductRepository from "@modules/Orders/infra/typeorm/repositories/OrderProductRepository";

// import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
// import UsersRepository from "@modules/Users/infra/typeorm/repositories/UsersRepository";

import IProductsRepository from "@modules/Products/repositories/IProductsRepository";
import ProductsRepository from "@modules/Products/infra/typeorm/repositories/ProductsRepository";

container.registerSingleton<ICartItemsRepository>(
  "CartItemsRepository",
  CartItemsRepository
);

container.registerSingleton<ICartRepository>("CartRepository", CartRepository);

container.registerSingleton<IOrdersRepository>(
  "OrderRepository",
  OrderRepository
);

container.registerSingleton<IOrderProductRepository>(
  "OrderProductRepository",
  OrderProductRepository
);

// container.registerSingleton<IUsersRepository>(
//   "UsersRepository",
//   UsersRepository
// );

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);
