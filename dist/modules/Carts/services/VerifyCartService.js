"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ICartsRepository = _interopRequireDefault(require("../repositories/ICartsRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let VerifyCartService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CartsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICartsRepository.default === "undefined" ? Object : _ICartsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class VerifyCartService {
  constructor(cartsRepository) {
    this.cartsRepository = cartsRepository;
  }

  async execute({
    user_id,
    customer_id
  }) {
    let cart = await this.cartsRepository.findOpenedCartByUserAndCustomer({
      user_id,
      customer_id
    });

    if (!cart) {
      cart = await this.cartsRepository.create({
        user_id,
        opened: true,
        customer_id
      });
    }

    return await this.cartsRepository.findOpenedCartByUserAndCustomer({
      user_id,
      customer_id
    });
  }

}) || _class) || _class) || _class) || _class);
exports.default = VerifyCartService;