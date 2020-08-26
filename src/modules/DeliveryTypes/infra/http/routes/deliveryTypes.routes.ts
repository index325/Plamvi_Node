import { Router } from "express";

import DeliveryTypeController from "../controllers/DeliveryTypeController";

import ensureAuthenticatedCustomer from "@modules/Customers/infra/http/middlewares/ensureAuthenticated";

const deliveryTypesRouter = Router();
const deliveryTypesController = new DeliveryTypeController();

deliveryTypesRouter.use(ensureAuthenticatedCustomer);

deliveryTypesRouter.post("/", deliveryTypesController.create);
deliveryTypesRouter.put("/:id", deliveryTypesController.update);
deliveryTypesRouter.delete("/:id", deliveryTypesController.delete);
deliveryTypesRouter.get("/list_all_by_customer", deliveryTypesController.listAllByCustomerId);


export default deliveryTypesRouter;
