"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateProductService = _interopRequireDefault(require("../../../services/CreateProductService"));

var _ListProductsByCustomerService = _interopRequireDefault(require("../../../services/ListProductsByCustomerService"));

var _ProductDetailService = _interopRequireDefault(require("../../../services/ProductDetailService"));

var _UpdateProductService = _interopRequireDefault(require("../../../services/UpdateProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsController {
  async create(request, response) {
    const {
      id
    } = request.customer;
    const {
      name,
      sku,
      price,
      description,
      short_description
    } = request.body;

    const createProducts = _tsyringe.container.resolve(_CreateProductService.default);

    const product = await createProducts.execute({
      name,
      sku,
      file: request.file.filename,
      customer_id: id,
      price,
      description,
      short_description
    });
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async update(request, response) {
    const {
      product_id
    } = request.params;
    const {
      id
    } = request.customer;
    const {
      name,
      sku,
      price,
      description,
      short_description
    } = request.body;

    const productUpdate = _tsyringe.container.resolve(_UpdateProductService.default);

    const product = await productUpdate.execute({
      product_id,
      name,
      sku,
      file: request.file.filename,
      customer_id: id,
      price,
      description,
      short_description
    });
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async detail(request, response) {
    const {
      product_id
    } = request.params;

    const productDetail = _tsyringe.container.resolve(_ProductDetailService.default);

    const product = await productDetail.execute(product_id);
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async listByCustomerId(request, response) {
    const {
      customer_id
    } = request.params;

    const listProducts = _tsyringe.container.resolve(_ListProductsByCustomerService.default);

    const products = await listProducts.execute(customer_id);
    return response.json((0, _classTransformer.classToClass)(products));
  }

}

exports.default = ProductsController;