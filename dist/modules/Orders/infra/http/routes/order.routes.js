"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var OrderController_1 = __importDefault(require("../controllers/OrderController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/Users/infra/http/middlewares/ensureAuthenticated"));
var ordersRouter = express_1.Router();
var ordersController = new OrderController_1.default();
ordersRouter.use(ensureAuthenticated_1.default);
ordersRouter.post("/update_fee", ordersController.updateFee);
exports.default = ordersRouter;
