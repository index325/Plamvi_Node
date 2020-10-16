"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CartItemController = _interopRequireDefault(require("../controllers/CartItemController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../Users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cartItemsRouter = (0, _express.Router)();
const cartItemController = new _CartItemController.default();
cartItemsRouter.use(_ensureAuthenticated.default);
cartItemsRouter.post("/create", cartItemController.create);
cartItemsRouter.delete("/delete/:cart_item_id", cartItemController.delete);
cartItemsRouter.put("/update/:cart_item_id", cartItemController.update);
var _default = cartItemsRouter;
exports.default = _default;