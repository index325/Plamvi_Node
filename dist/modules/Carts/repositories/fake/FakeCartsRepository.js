"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cart = _interopRequireDefault(require("../../infra/typeorm/entities/Cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeCartsRepository {
  constructor() {
    this.carts = [];
  }

  async findOpenedCartByUser(user_id) {
    const cart = await this.carts.find(item => {
      return item.user_id === user_id && item.opened;
    });
    return cart;
  }

  async findClosedCartByUser(user_id) {
    const cart = await this.carts.find(item => {
      return item.user_id === user_id && !item.opened;
    });
    return cart;
  }

  async create({
    opened,
    user_id
  }) {
    const cart = new _Cart.default();
    cart.user_id = user_id;
    cart.opened = opened;
    cart.customer_id = "fake-customer-id";
    cart.cart_item = [];
    this.carts.push(cart);
    return cart;
  }

  async closeCart(cart_id) {}

  async findOpenedCartByUserAndCustomer(data) {
    const cart = await this.carts.find(item => {
      return item.user_id === data.user_id && item.opened && item.customer_id === data.customer_id;
    });
    return cart;
  }

}

var _default = FakeCartsRepository;
exports.default = _default;