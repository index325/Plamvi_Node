"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Order = _interopRequireDefault(require("../entities/Order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Order.default);
  }

  async create(data) {
    const order = this.ormRepository.create(data);
    await this.ormRepository.save(order);
    return order;
  }

  async updateFee(data) {
    await this.ormRepository.update({
      id: data.order_id
    }, {
      fee: data.fee,
      daysToDeliver: data.daysToDeliver
    });
    return this.ormRepository.findOne(data.order_id);
  }

}

var _default = OrderRepository;
exports.default = _default;