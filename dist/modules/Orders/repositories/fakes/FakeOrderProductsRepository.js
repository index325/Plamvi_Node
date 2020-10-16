"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OrderProduct = _interopRequireDefault(require("../../infra/typeorm/entities/OrderProduct"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeOrderProductsRepository {
  constructor() {
    this.orders = [];
  }

  async create({
    order_id,
    product_id
  }) {
    const orderProduct = new _OrderProduct.default();
    orderProduct.order_id = order_id;
    orderProduct.product_id = product_id;
    this.orders.push(orderProduct);
    return orderProduct;
  }

}

var _default = FakeOrderProductsRepository;
exports.default = _default;