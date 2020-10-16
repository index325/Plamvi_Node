"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ICartItemsRepository = _interopRequireDefault(require("../repositories/ICartItemsRepository"));

var _tsyringe = require("tsyringe");

var _ICartsRepository = _interopRequireDefault(require("../repositories/ICartsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteCartItemService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CartItemsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CartsRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICartItemsRepository.default === "undefined" ? Object : _ICartItemsRepository.default, typeof _ICartsRepository.default === "undefined" ? Object : _ICartsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteCartItemService {
  constructor(cartItemsRepository, cartsRepository) {
    this.cartItemsRepository = cartItemsRepository;
    this.cartsRepository = cartsRepository;
  }

  async execute({
    cart_item_id,
    user_id
  }) {
    await this.cartItemsRepository.delete({
      cart_item_id
    });
    return await this.cartsRepository.findOpenedCartByUser(user_id);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = DeleteCartItemService;