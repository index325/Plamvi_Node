"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICartsRepository = _interopRequireDefault(require("../../Carts/repositories/ICartsRepository"));

var _ICartItemsRepository = _interopRequireDefault(require("../../Carts/repositories/ICartItemsRepository"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _IOrderProductsRepository = _interopRequireDefault(require("../repositories/IOrderProductsRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DoCheckoutService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CartsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CartItemRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("OrdersRepository")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("OrderProductsRepository")(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _ICartsRepository.default === "undefined" ? Object : _ICartsRepository.default, typeof _ICartItemsRepository.default === "undefined" ? Object : _ICartItemsRepository.default, typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IOrderProductsRepository.default === "undefined" ? Object : _IOrderProductsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class DoCheckoutService {
  constructor(cartsRepository, cartItemsRepository, ordersRepository, orderProductsRepository) {
    this.cartsRepository = cartsRepository;
    this.cartItemsRepository = cartItemsRepository;
    this.ordersRepository = ordersRepository;
    this.orderProductsRepository = orderProductsRepository;
  }

  async execute({
    user_id
  }) {
    const closedCart = await this.cartsRepository.findClosedCartByUser(user_id);

    if (closedCart) {
      throw new _AppError.default("Impossível fazer checkout novamente. Você já tem um pedido em aberto.", 400);
    }

    const cart = await this.cartsRepository.findOpenedCartByUser(user_id);

    if (!cart) {
      throw new _AppError.default("Carrinho não encontrado.");
    }

    let total = 0;
    cart.cart_item.map(item => {
      total += item.product.price * item.quantity;
    });
    const order = await this.ordersRepository.create({
      total
    });
    cart.cart_item.map(async item => {
      await this.orderProductsRepository.create({
        order_id: order.id,
        product_id: item.product.id
      });
      await this.cartItemsRepository.delete({
        cart_item_id: item.id
      });
    });
    await this.cartsRepository.closeCart(cart.id);
    return order;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = DoCheckoutService;