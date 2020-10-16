"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _OrderProductController = _interopRequireDefault(require("../controllers/OrderProductController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../Users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderProductsRouter = (0, _express.Router)();
const ordersController = new _OrderProductController.default();
orderProductsRouter.use(_ensureAuthenticated.default);
orderProductsRouter.post("/do_checkout", ordersController.doCheckout);
var _default = orderProductsRouter;
exports.default = _default;