"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateDeliveryTypeService = _interopRequireDefault(require("../../../services/CreateDeliveryTypeService"));

var _UpdateDeliveryTypeService = _interopRequireDefault(require("../../../services/UpdateDeliveryTypeService"));

var _DeleteDeliveryTypeService = _interopRequireDefault(require("../../../services/DeleteDeliveryTypeService"));

var _ListAllDeliveryTypesByCustomerService = _interopRequireDefault(require("../../../services/ListAllDeliveryTypesByCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeliveryTypeController {
  async create(request, response) {
    const {
      id
    } = request.customer;
    const {
      description
    } = request.body;

    const createDeliveryType = _tsyringe.container.resolve(_CreateDeliveryTypeService.default);

    const deliveryType = await createDeliveryType.execute({
      description,
      customer_id: id
    });
    return response.json(deliveryType);
  }

  async update(request, response) {
    const {
      id
    } = request.customer;
    const {
      description
    } = request.body;
    const deliveryTypeId = request.params.id;

    const updateDeliveryType = _tsyringe.container.resolve(_UpdateDeliveryTypeService.default);

    const deliveryType = await updateDeliveryType.execute({
      description,
      customer_id: id,
      id: deliveryTypeId
    });
    return response.json(deliveryType);
  }

  async delete(request, response) {
    const {
      id
    } = request.customer;
    const deliveryTypeId = request.params.id;

    const deleteDeliveryType = _tsyringe.container.resolve(_DeleteDeliveryTypeService.default);

    const deliveryType = await deleteDeliveryType.execute({
      customer_id: id,
      id: deliveryTypeId
    });
    return response.json(deliveryType);
  }

  async listAllByCustomerId(request, response) {
    const {
      id
    } = request.customer;
    const {} = request.body;

    const listAllDeliveryTypesByCustomerService = _tsyringe.container.resolve(_ListAllDeliveryTypesByCustomerService.default);

    const deliveryTypes = await listAllDeliveryTypesByCustomerService.execute({
      customer_id: id
    });
    return response.json(deliveryTypes);
  }

}

exports.default = DeliveryTypeController;