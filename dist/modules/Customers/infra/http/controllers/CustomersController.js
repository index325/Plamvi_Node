"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateCustomerService = _interopRequireDefault(require("../../../services/CreateCustomerService"));

var _UpdateCustomerService = _interopRequireDefault(require("../../../services/UpdateCustomerService"));

var _ListMyProductsService = _interopRequireDefault(require("../../../services/ListMyProductsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomersController {
  async create(request, response) {
    const {
      name,
      email,
      password,
      city,
      state
    } = request.body;

    const createCustomer = _tsyringe.container.resolve(_CreateCustomerService.default);

    const customer = await createCustomer.execute({
      name,
      email,
      password,
      city,
      state
    });
    return response.json((0, _classTransformer.classToClass)(customer));
  }

  async update(request, response) {
    const {
      id
    } = request.customer;
    const {
      name,
      email,
      password,
      city,
      state
    } = request.body;

    const updateCustomer = _tsyringe.container.resolve(_UpdateCustomerService.default);

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
      password,
      city,
      state
    });
    return response.json((0, _classTransformer.classToClass)(customer));
  }

  async listMyProducts(request, response) {
    const {
      id
    } = request.customer;

    const listProducts = _tsyringe.container.resolve(_ListMyProductsService.default);

    const products = await listProducts.execute(id);
    return response.json((0, _classTransformer.classToClass)(products));
  }

}

exports.default = CustomersController;