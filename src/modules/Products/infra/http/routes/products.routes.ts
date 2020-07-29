import { Router } from "express";

import ProductsController from "../controllers/ProductsController";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post("/", productsController.create);
productsRouter.put("/", productsController.update);
productsRouter.get("/detail/:product_id", productsController.detail);
productsRouter.get("/list_by_customer/:customer_id", productsController.listByCustomerId);

export default productsRouter;
