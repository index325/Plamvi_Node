"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProductsController = _interopRequireDefault(require("../controllers/ProductsController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../Users/infra/http/middlewares/ensureAuthenticated"));

var _ensureAuthenticated2 = _interopRequireDefault(require("../../../../Customers/infra/http/middlewares/ensureAuthenticated"));

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productsRouter = (0, _express.Router)();
const productsController = new _ProductsController.default();
const uploadMiddleware = (0, _multer.default)(_upload.default.multer);
productsRouter.post("/", _ensureAuthenticated2.default, uploadMiddleware.single("image"), productsController.create);
productsRouter.put("/:product_id", _ensureAuthenticated2.default, productsController.update);
productsRouter.get("/detail/:product_id", _ensureAuthenticated2.default, productsController.detail);
productsRouter.get("/list_by_customer/:customer_id", _ensureAuthenticated.default, productsController.listByCustomerId);
var _default = productsRouter;
exports.default = _default;