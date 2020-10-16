"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CartItem = _interopRequireDefault(require("../../infra/typeorm/entities/CartItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeCartItemsRepository {
  constructor() {
    this.cartItems = [];
  }

  async findById(cart_item_id) {
    const foundCartItem = this.cartItems.find(item => item.id === cart_item_id);
    return foundCartItem;
  }

  async create({
    cart_id,
    product_id,
    quantity
  }) {
    const cartItem = new _CartItem.default();
    cartItem.id = "fake-id";
    cartItem.cart_id = cart_id;
    cartItem.product_id = product_id;
    cartItem.quantity = quantity;
    this.cartItems.push(cartItem);
    return cartItem;
  }

  async delete({
    cart_item_id
  }) {
    const selectedCartItem = this.cartItems.findIndex(item => item.id === cart_item_id);
    this.cartItems.splice(selectedCartItem, 1);
  }

  async verifyIfProductAlreadyExistsOnCartItems({
    product_id,
    cart_id
  }) {
    const foundProduct = this.cartItems.find(item => item.cart_id === cart_id && item.product_id === product_id);
    return foundProduct;
  }

  async incrementProductQuantity({
    quantity,
    cart_item_id
  }) {
    const newCartItems = this.cartItems.map(item => {
      if (item.id === cart_item_id) {
        return { ...item,
          quantity: item.quantity + quantity
        };
      }

      return item;
    });
    this.cartItems = newCartItems;
  }

  async updateProductQuantity({
    cart_item_id,
    quantity
  }) {
    const newCartItems = this.cartItems.map(item => {
      if (item.id === cart_item_id) {
        return { ...item,
          quantity
        };
      }

      return item;
    });
    this.cartItems = newCartItems;
  }

}

var _default = FakeCartItemsRepository;
exports.default = _default;