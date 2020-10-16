"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CartController_1 = __importDefault(require("../controllers/CartController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/Users/infra/http/middlewares/ensureAuthenticated"));
var cartsRouter = express_1.Router();
var cartsController = new CartController_1.default();
cartsRouter.use(ensureAuthenticated_1.default);
cartsRouter.post("/verify", cartsController.verifyCart);
exports.default = cartsRouter;
