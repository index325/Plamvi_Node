import { Router } from "express";
import CartItemController from "../controllers/CartItemController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const cartItemsRouter = Router();

const cartItemController = new CartItemController();

cartItemsRouter.use(ensureAuthenticated);

cartItemsRouter.post("/create", cartItemController.create);
cartItemsRouter.delete("/delete/:cart_item_id", cartItemController.delete);
cartItemsRouter.put("/update/:cart_item_id", cartItemController.update);

export default cartItemsRouter;
