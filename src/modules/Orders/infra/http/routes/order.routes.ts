import { Router } from "express";
import OrderController from "../controllers/OrderController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const ordersRouter = Router();

const ordersController = new OrderController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post("/update_fee", ordersController.updateFee);

export default ordersRouter;
