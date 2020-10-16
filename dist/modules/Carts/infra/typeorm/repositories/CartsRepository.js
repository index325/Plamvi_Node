"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Cart = _interopRequireDefault(require("../entities/Cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CartsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Cart.default);
  }

  async findOpenedCartByUser(user_id) {
    const cart = await this.ormRepository.findOne({
      where: {
        user_id,
        opened: true
      }
    });
    return cart;
  }

  async findClosedCartByUser(user_id) {
    const cart = await this.ormRepository.findOne({
      where: {
        user_id,
        opened: false
      }
    });
    return cart;
  }

  async create(data) {
    const cart = this.ormRepository.create(data);
    await this.ormRepository.save(cart);
    return cart;
  }

  async closeCart(cart_id) {
    await this.ormRepository.update(cart_id, {
      opened: false
    });
  }

  async findOpenedCartByUserAndCustomer(data) {
    const {
      user_id,
      customer_id
    } = data;
    const cart = await this.ormRepository.findOne({
      where: {
        user_id,
        customer_id,
        opened: true
      }
    });
    return cart;
  }

}

var _default = CartsRepository;
exports.default = _default;