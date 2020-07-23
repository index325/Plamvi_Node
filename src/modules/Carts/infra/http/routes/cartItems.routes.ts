import { Router } from "express";
import CartItemController from "../controllers/CartItemController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const cartItemsRouter = Router();

const cartItemController = new CartItemController();

cartItemsRouter.use(ensureAuthenticated);

cartItemsRouter.post("/add_to_cart", cartItemController.create);

export default cartItemsRouter;
