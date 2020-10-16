"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DoCheckoutService = _interopRequireDefault(require("../../../services/DoCheckoutService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderProductController {
  async doCheckout(request, response) {
    const doCheckoutService = _tsyringe.container.resolve(_DoCheckoutService.default);

    const order = await doCheckoutService.execute({
      user_id: request.user.id
    });
    return response.json(order);
  }

}

exports.default = OrderProductController;