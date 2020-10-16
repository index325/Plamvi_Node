"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _cart = _interopRequireDefault(require("../../../../modules/Carts/infra/http/routes/cart.routes"));

var _cartItems = _interopRequireDefault(require("../../../../modules/Carts/infra/http/routes/cartItems.routes"));

var _customer = _interopRequireDefault(require("../../../../modules/Customers/infra/http/routes/customer.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/Customers/infra/http/routes/sessions.routes"));

var _deliveryTypes = _interopRequireDefault(require("../../../../modules/DeliveryTypes/infra/http/routes/deliveryTypes.routes"));

var _order = _interopRequireDefault(require("../../../../modules/Orders/infra/http/routes/order.routes"));

var _orderProducts = _interopRequireDefault(require("../../../../modules/Orders/infra/http/routes/orderProducts.routes"));

var _products = _interopRequireDefault(require("../../../../modules/Products/infra/http/routes/products.routes"));

var _user = _interopRequireDefault(require("../../../../modules/Users/infra/http/routes/user.routes"));

var _password = _interopRequireDefault(require("../../../../modules/Users/infra/http/routes/password.routes"));

var _password2 = _interopRequireDefault(require("../../../../modules/Customers/infra/http/routes/password.routes"));

var _sessions2 = _interopRequireDefault(require("../../../../modules/Users/infra/http/routes/sessions.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import transactionsRouter from "@modules/Transactions/infra/http/routes/transactions.routes";
const routes = (0, _express.Router)();
routes.use("/carts", _cart.default);
routes.use("/cart_items", _cartItems.default);
routes.use("/customers", _customer.default);
routes.use("/customers/sessions", _sessions.default);
routes.use("/customers/password", _password2.default);
routes.use("/orders", _order.default);
routes.use("/orders/products", _orderProducts.default);
routes.use("/products", _products.default);
routes.use("/users", _user.default);
routes.use("/users/password", _password.default);
routes.use("/users/sessions", _sessions2.default);
routes.use("/delivery_types", _deliveryTypes.default);
var _default = routes;
exports.default = _default;