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

export default customersRouter;
