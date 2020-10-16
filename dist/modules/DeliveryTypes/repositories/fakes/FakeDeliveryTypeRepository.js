"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _DeliveryType = _interopRequireDefault(require("../../infra/typeorm/entities/DeliveryType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeliveryTypeRepository {
  constructor() {
    this.deliveryTypes = [];
  }

  // deveria ser private, só que está bugando no teste de delete, ele não entende quando está vazio
  async create(data) {
    const deliveryType = new _DeliveryType.default();
    Object.assign(deliveryType, {
      id: (0, _uuidv.uuid)()
    }, data);
    this.deliveryTypes.push(deliveryType);
    return deliveryType;
  }

  async save(deliveryType) {
    const findIndex = this.deliveryTypes.findIndex(dt => dt.id === deliveryType.id);
    this.deliveryTypes[findIndex] = deliveryType;
    return deliveryType;
  }

  async findById(id) {
    const findIndex = this.deliveryTypes.findIndex(dt => dt.id === id);
    return this.deliveryTypes[findIndex];
  }

  async findAllByCustomer(customer_id) {
    let deliveryTypesFiltered = [];
    deliveryTypesFiltered = this.deliveryTypes.filter(dt => dt.customer_id === customer_id);
    return deliveryTypesFiltered;
  }

  async deleteById(id) {
    const findIndex = this.deliveryTypes.findIndex(dt => dt.id === id);
    this.deliveryTypes.splice(findIndex);
  }

  async findByDescriptionAndCustomerId({
    customer_id,
    description
  }) {
    const findIndex = this.deliveryTypes.find(dt => dt.customer_id === customer_id && dt.description === description);
    return findIndex;
  }

}

exports.default = DeliveryTypeRepository;