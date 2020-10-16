"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _VerifyCartService = _interopRequireDefault(require("../../../services/VerifyCartService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CartController {
  async verifyCart(request, response) {
    const {
      id
    } = request.user;
    const {
      customer_id
    } = request.body;

    const verifyCart = _tsyringe.container.resolve(_VerifyCartService.default);

    const cart = await verifyCart.execute({
      user_id: id,
      customer_id
    });
    return response.json((0, _classTransformer.classToClass)(cart));
  }

}

exports.default = CartController;