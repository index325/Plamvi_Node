"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CustomersController = _interopRequireDefault(require("../controllers/CustomersController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customersRouter = (0, _express.Router)();
const customersController = new _CustomersController.default();
customersRouter.post("/", customersController.create);
customersRouter.put("/", _ensureAuthenticated.default, customersController.update);
customersRouter.get("/list_my_products", _ensureAuthenticated.default, customersController.listMyProducts);
var _default = customersRouter;
exports.default = _default;