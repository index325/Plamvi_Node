"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CustomerToken = _interopRequireDefault(require("../../infra/typeorm/entities/CustomerToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeCustomerTokensRepository {
  constructor() {
    this.customerTokens = [];
  }

  async generate(customer_id) {
    const customerToken = new _CustomerToken.default();
    customerToken.customer_id = customer_id;
    customerToken.token = 'generated-token';
    customerToken.created_at = new Date();
    this.customerTokens.push(customerToken);
    return customerToken;
  }

  async findByToken(token) {
    const customer = this.customerTokens.find(item => item.token === token);
    return customer;
  }

}

var _default = FakeCustomerTokensRepository;
exports.default = _default;