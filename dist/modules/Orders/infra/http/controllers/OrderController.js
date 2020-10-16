"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateFeeService = _interopRequireDefault(require("../../../services/UpdateFeeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderProductController {
  async updateFee(request, response) {
    const updateFeeService = _tsyringe.container.resolve(_UpdateFeeService.default);

    const order = await updateFeeService.execute({
      order_id: request.body.order_id,
      fee: request.body.fee,
      daysToDeliver: request.body.daysToDeliver
    });
    return response.json(order);
  }

}

exports.default = OrderProductController;