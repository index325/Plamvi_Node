"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _CustomerToken = _interopRequireDefault(require("../entities/CustomerToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomerTokensRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_CustomerToken.default);
  }

  async generate(customer_id) {
    const customerToken = this.ormRepository.create({
      customer_id
    });
    await this.ormRepository.save(customerToken);
    return customerToken;
  }

  async findByToken(token) {
    const customerToken = await this.ormRepository.findOne({
      where: {
        token
      }
    });
    return customerToken;
  }

}

var _default = CustomerTokensRepository;
exports.default = _default;