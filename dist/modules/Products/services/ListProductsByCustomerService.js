"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProductsByCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ProductsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProductsByCustomerService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(customer_id) {
    const products = await this.productsRepository.listAllProductsByCustomer(customer_id);
    return products;
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListProductsByCustomerService;