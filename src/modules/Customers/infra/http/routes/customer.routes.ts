import { Router } from "express";

import CustomersController from "../controllers/CustomersController";
import ensureAuthenticatedCustomer from "../middlewares/ensureAuthenticated";

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post("/", customersController.create);
customersRouter.put(
  "/",
  ensureAuthenticatedCustomer,
  customersController.update
);
customersRouter.get(
  "/list_my_products",
  ensureAuthenticatedCustomer,
  customersController.listMyProducts
);

export default customersRouter;
