import { Router } from "express";
import CartController from "../controllers/CartController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const cartsRouter = Router();

const cartsController = new CartController();

cartsRouter.use(ensureAuthenticated);

cartsRouter.post("/verify", cartsController.verifyCart);

export default cartsRouter;
