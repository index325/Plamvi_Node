"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AddToCartService = _interopRequireDefault(require("../../../services/AddToCartService"));

var _DeleteCartItemService = _interopRequireDefault(require("../../../services/DeleteCartItemService"));

var _UpdateCartItemService = _interopRequireDefault(require("../../../services/UpdateCartItemService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CartItemController {
  async create(request, response) {
    const addToCart = _tsyringe.container.resolve(_AddToCartService.default);

    const {
      quantity,
      product_id
    } = request.body;
    const {
      id
    } = request.user;
    const cart = await addToCart.execute({
      user_id: id,
      quantity,
      product_id
    });
    return response.json((0, _classTransformer.classToClass)(cart));
  }

  async delete(request, response) {
    const deleteCartItem = _tsyringe.container.resolve(_DeleteCartItemService.default);

    const {
      id
    } = request.user;
    const {
      cart_item_id
    } = request.params;
    const cart = await deleteCartItem.execute({
      user_id: id,
      cart_item_id
    });
    return response.json((0, _classTransformer.classToClass)(cart));
  }

  async update(request, response) {
    const updateCartItem = _tsyringe.container.resolve(_UpdateCartItemService.default);

    const {
      quantity
    } = request.body;
    const {
      cart_item_id
    } = request.params;
    const {
      id
    } = request.user;
    const cart = await updateCartItem.execute({
      cart_item_id,
      quantity,
      user_id: id
    });
    return response.json((0, _classTransformer.classToClass)(cart));
  }

}

exports.default = CartItemController;