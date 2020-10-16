"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ResetPasswordService = _interopRequireDefault(require("../../../services/ResetPasswordService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(request, response) {
    const {
      token,
      password
    } = request.body;

    const resetPasswordService = _tsyringe.container.resolve(_ResetPasswordService.default);

    await resetPasswordService.execute({
      token,
      password
    });
    return response.status(204).json();
  }

}

exports.default = ResetPasswordController;