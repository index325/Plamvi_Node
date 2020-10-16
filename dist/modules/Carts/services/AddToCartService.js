"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICartsRepository = _interopRequireDefault(require("../repositories/ICartsRepository"));

var _ICartItemsRepository = _interopRequireDefault(require("../repositories/ICartItemsRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AddToCartService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CartsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CartItemsRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICartsRepository.default === "undefined" ? Object : _ICartsRepository.default, typeof _ICartItemsRepository.default === "undefined" ? Object : _ICartItemsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AddToCartService {
  constructor(cartsRepository, cartItemsRepository) {
    this.cartsRepository = cartsRepository;
    this.cartItemsRepository = cartItemsRepository;
  }

  async execute({
    user_id,
    quantity,
    product_id
  }) {
    if (quantity === undefined || quantity <= 0) {
      throw new _AppError.default("A quantidade não pode ser zero.", 400);
    }

    const cart = await this.cartsRepository.findOpenedCartByUser(user_id);

    if (!cart) {
      throw new _AppError.default("O usuário não tem carrinho.", 400);
    }

    let productAlreadyExistsOnCart = await this.cartItemsRepository.verifyIfProductAlreadyExistsOnCartItems({
      product_id,
      cart_id: cart.id
    });

    if (productAlreadyExistsOnCart) {
      await this.cartItemsRepository.incrementProductQuantity({
        quantity,
        cart_item_id: productAlreadyExistsOnCart.id
      });
    } else {
      await this.cartItemsRepository.create({
        quantity,
        cart_id: cart.id,
        product_id
      });
    }

    return await this.cartsRepository.findOpenedCartByUser(user_id);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = AddToCartService;