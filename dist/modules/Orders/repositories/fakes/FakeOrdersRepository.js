"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Order = _interopRequireDefault(require("../../infra/typeorm/entities/Order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeOrderRepository {
  constructor() {
    this.orders = [];
  }

  async create({
    total
  }) {
    const order = new _Order.default();
    order.total = total;
    this.orders.push(order);
    return order;
  }

  async updateFee({
    daysToDeliver,
    order_id,
    fee
  }) {
    const updatedOrderIndex = this.orders.findIndex(item => item.id === order_id);
    const updatedOrders = this.orders.map(item => {
      if (item.id === order_id) {
        return { ...item,
          daysToDeliver,
          fee
        };
      }

      return item;
    });
    this.orders = updatedOrders;
    return this.orders[updatedOrderIndex];
  }

}

var _default = FakeOrderRepository;
exports.default = _default;