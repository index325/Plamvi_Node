"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CartController = _interopRequireDefault(require("../controllers/CartController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../Users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cartsRouter = (0, _express.Router)();
const cartsController = new _CartController.default();
cartsRouter.use(_ensureAuthenticated.default);
cartsRouter.post("/verify", cartsController.verifyCart);
var _default = cartsRouter;
exports.default = _default;