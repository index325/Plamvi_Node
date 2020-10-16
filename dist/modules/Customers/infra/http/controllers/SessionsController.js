"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateCustomerService = _interopRequireDefault(require("../../../services/AuthenticateCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateCustomer = _tsyringe.container.resolve(_AuthenticateCustomerService.default);

    const {
      customer,
      token
    } = await authenticateCustomer.execute({
      email,
      password
    });
    delete customer.password;
    return response.json({
      customer,
      token
    });
  }

}

exports.default = SessionsController;