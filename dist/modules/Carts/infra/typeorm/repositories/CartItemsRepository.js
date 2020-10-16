"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _CartItem = _interopRequireDefault(require("../entities/CartItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CartItemsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_CartItem.default);
  }

  async findById(cart_item_id) {
    return await this.ormRepository.findOne(cart_item_id);
  }

  async create(data) {
    const cart = this.ormRepository.create(data);
    await this.ormRepository.save(cart);
    return cart;
  }

  async delete({
    cart_item_id
  }) {
    this.ormRepository.delete({
      id: cart_item_id
    });
  }

  async verifyIfProductAlreadyExistsOnCartItems({
    product_id,
    cart_id
  }) {
    return await this.ormRepository.findOne({
      relations: ["product"],
      where: {
        cart_id,
        product_id
      }
    });
  }

  async incrementProductQuantity({
    quantity,
    cart_item_id
  }) {
    await this.ormRepository.increment({
      id: cart_item_id
    }, "quantity", quantity);
  }

  async updateProductQuantity({
    cart_item_id,
    quantity
  }) {
    await this.ormRepository.update(cart_item_id, {
      quantity
    });
  }

}

var _default = CartItemsRepository;
exports.default = _default;