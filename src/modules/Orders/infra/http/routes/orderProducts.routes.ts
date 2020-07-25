import { Router } from "express";
import OrderProductController from "../controllers/OrderProductController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const orderProductsRouter = Router();

const ordersController = new OrderProductController();

orderProductsRouter.use(ensureAuthenticated);

orderProductsRouter.post("/do_checkout", ordersController.doCheckout);

export default orderProductsRouter;
