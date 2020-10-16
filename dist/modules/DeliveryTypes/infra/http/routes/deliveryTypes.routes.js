"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _DeliveryTypeController = _interopRequireDefault(require("../controllers/DeliveryTypeController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../Customers/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deliveryTypesRouter = (0, _express.Router)();
const deliveryTypesController = new _DeliveryTypeController.default();
deliveryTypesRouter.use(_ensureAuthenticated.default);
deliveryTypesRouter.post("/", deliveryTypesController.create);
deliveryTypesRouter.put("/:id", deliveryTypesController.update);
deliveryTypesRouter.delete("/:id", deliveryTypesController.delete);
deliveryTypesRouter.get("/list_all_by_customer", deliveryTypesController.listAllByCustomerId);
var _default = deliveryTypesRouter;
exports.default = _default;