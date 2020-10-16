"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IDeliveryTypeRepository = _interopRequireDefault(require("../repositories/IDeliveryTypeRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllDeliveryTypesByCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("DeliveryTypeRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDeliveryTypeRepository.default === "undefined" ? Object : _IDeliveryTypeRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAllDeliveryTypesByCustomerService {
  constructor(deliveryTypeRepository) {
    this.deliveryTypeRepository = deliveryTypeRepository;
  }

  async execute({
    customer_id
  }) {
    return await this.deliveryTypeRepository.findAllByCustomer(customer_id);
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListAllDeliveryTypesByCustomerService;