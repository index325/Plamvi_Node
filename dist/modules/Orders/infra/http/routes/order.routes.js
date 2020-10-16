"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _OrderController = _interopRequireDefault(require("../controllers/OrderController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../Users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ordersRouter = (0, _express.Router)();
const ordersController = new _OrderController.default();
ordersRouter.use(_ensureAuthenticated.default);
ordersRouter.post("/update_fee", ordersController.updateFee);
var _default = ordersRouter;
exports.default = _default;