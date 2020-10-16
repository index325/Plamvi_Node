"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateFeeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("OrdersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateFeeService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(data) {
    const order = await this.ordersRepository.updateFee({
      order_id: data.order_id,
      fee: data.fee,
      daysToDeliver: data.daysToDeliver
    });
    return order;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateFeeService;