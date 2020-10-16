"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var OrderProductController_1 = __importDefault(require("../controllers/OrderProductController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/Users/infra/http/middlewares/ensureAuthenticated"));
var orderProductsRouter = express_1.Router();
var ordersController = new OrderProductController_1.default();
orderProductsRouter.use(ensureAuthenticated_1.default);
orderProductsRouter.post("/do_checkout", ordersController.doCheckout);
exports.default = orderProductsRouter;
