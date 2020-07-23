import { Router } from "express";
import cartsRouter from "@modules/Carts/infra/http/routes/cart.routes";

const routes = Router();

routes.use("/carts", cartsRouter);

export default routes;
