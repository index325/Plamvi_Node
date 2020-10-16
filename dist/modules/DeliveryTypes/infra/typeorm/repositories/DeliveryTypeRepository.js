"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _DeliveryType = _interopRequireDefault(require("../entities/DeliveryType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeliveryTypeRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_DeliveryType.default);
  }

  async create(data) {
    const deliveryType = this.ormRepository.create(data);
    return this.ormRepository.save(deliveryType);
  }

  async save(deliveryType) {
    return this.ormRepository.save(deliveryType);
  }

  async findById(id) {
    return this.ormRepository.findOne(id);
  }

  async findAllByCustomer(customer_id) {
    return this.ormRepository.find({
      where: {
        customer_id
      }
    });
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async findByDescriptionAndCustomerId({
    customer_id,
    description
  }) {
    return this.ormRepository.findOne({
      where: {
        customer_id: customer_id,
        description: description
      }
    });
  }

}

exports.default = DeliveryTypeRepository;