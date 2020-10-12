import { Router } from "express";

import ProductsController from "../controllers/ProductsController";

import ensureAuthenticatedUser from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

import ensureAuthenticatedCustomer from "@modules/Customers/infra/http/middlewares/ensureAuthenticated";
import multer from "multer";
import upload from "@config/upload";

const productsRouter = Router();
const productsController = new ProductsController();

const uploadMiddleware = multer(upload.multer);

productsRouter.post(
  "/",
  ensureAuthenticatedCustomer,
  uploadMiddleware.single("image"),
  productsController.create
);

productsRouter.put(
  "/:product_id",
  ensureAuthenticatedCustomer,
  productsController.update
);

productsRouter.get(
  "/detail/:product_id",
  ensureAuthenticatedCustomer,
  productsController.detail
);

productsRouter.get(
  "/list_by_customer/:customer_id",
  ensureAuthenticatedUser,
  productsController.listByCustomerId
);

export default productsRouter;
