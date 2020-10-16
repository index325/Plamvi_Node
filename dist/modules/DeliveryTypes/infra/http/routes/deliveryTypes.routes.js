"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DeliveryTypeController_1 = __importDefault(require("../controllers/DeliveryTypeController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/Customers/infra/http/middlewares/ensureAuthenticated"));
var deliveryTypesRouter = express_1.Router();
var deliveryTypesController = new DeliveryTypeController_1.default();
deliveryTypesRouter.use(ensureAuthenticated_1.default);
deliveryTypesRouter.post("/", deliveryTypesController.create);
deliveryTypesRouter.put("/:id", deliveryTypesController.update);
deliveryTypesRouter.delete("/:id", deliveryTypesController.delete);
deliveryTypesRouter.get("/list_all_by_customer", deliveryTypesController.listAllByCustomerId);
exports.default = deliveryTypesRouter;
