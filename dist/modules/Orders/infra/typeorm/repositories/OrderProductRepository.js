"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _OrderProduct = _interopRequireDefault(require("../entities/OrderProduct"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderProductRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_OrderProduct.default);
  }

  async create(data) {
    const cart = this.ormRepository.create(data);
    await this.ormRepository.save(cart);
    return cart;
  }

}

var _default = OrderProductRepository;
exports.default = _default;