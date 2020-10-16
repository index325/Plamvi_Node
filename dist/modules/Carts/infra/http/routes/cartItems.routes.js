"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CartItemController_1 = __importDefault(require("../controllers/CartItemController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/Users/infra/http/middlewares/ensureAuthenticated"));
var cartItemsRouter = express_1.Router();
var cartItemController = new CartItemController_1.default();
cartItemsRouter.use(ensureAuthenticated_1.default);
cartItemsRouter.post("/create", cartItemController.create);
cartItemsRouter.delete("/delete/:cart_item_id", cartItemController.delete);
cartItemsRouter.put("/update/:cart_item_id", cartItemController.update);
exports.default = cartItemsRouter;
