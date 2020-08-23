import { Router } from "express";

import ProductsController from "../controllers/ProductsController";

import ensureAuthenticatedUser from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

import ensureAuthenticatedCustomer from "@modules/Customers/infra/http/middlewares/ensureAuthenticated";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post(
  "/",
  ensureAuthenticatedCustomer,
  productsController.create
);

productsRouter.put("/", ensureAuthenticatedCustomer, productsController.update);

productsRouter.get("/detail/:product_id", productsController.detail);

productsRouter.get(
  "/list_by_customer/:customer_id",
  ensureAuthenticatedUser,
  productsController.listByCustomerId
);

export default productsRouter;
