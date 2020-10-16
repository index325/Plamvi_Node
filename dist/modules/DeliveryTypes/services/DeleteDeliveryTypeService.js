"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IDeliveryTypeRepository = _interopRequireDefault(require("../repositories/IDeliveryTypeRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateDeliveryTypeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("DeliveryTypeRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDeliveryTypeRepository.default === "undefined" ? Object : _IDeliveryTypeRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateDeliveryTypeService {
  constructor(deliveryTypeRepository) {
    this.deliveryTypeRepository = deliveryTypeRepository;
  }

  async execute({
    id,
    customer_id
  }) {
    const deliveryType = await this.deliveryTypeRepository.findById(id);

    if (!deliveryType) {
      throw new _AppError.default("Este tipo de entrega não foi encontrado");
    }

    if (deliveryType.customer_id !== customer_id) {
      throw new _AppError.default("Este tipo de entrega não pertence a este estabelecimento");
    }

    await this.deliveryTypeRepository.deleteById(id);
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateDeliveryTypeService;