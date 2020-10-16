"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Product = _interopRequireDefault(require("../entities/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Product.default);
  }

  async create(data) {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);
    return product;
  }

  async update(data, product_id) {
    await this.ormRepository.update({
      id: product_id
    }, data);
    const product = await this.ormRepository.findOne(product_id);
    return product;
  }

  async listAllProductsByCustomer(customer_id) {
    return this.ormRepository.find({
      where: {
        customer_id
      }
    });
  }

  async findProductById(product_id) {
    return this.ormRepository.findOne(product_id, {
      relations: ["customer"]
    });
  }

  async verifyIfSKUAlreadyExists({
    sku,
    id
  }) {
    const result = await this.ormRepository.findOne({
      where: {
        sku,
        id: (0, _typeorm.Not)(id)
      }
    });
    return !!result;
  }

  async verifyIfSKUAlreadyExistsWithoutId(sku) {
    const result = await this.ormRepository.findOne({
      where: {
        sku
      }
    });
    return !!result;
  }

}

var _default = ProductsRepository;
exports.default = _default;