"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Customer = _interopRequireDefault(require("../entities/Customer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Customer.default);
  }

  async create(data) {
    const customer = this.ormRepository.create(data);
    await this.ormRepository.save(customer);
    return customer;
  }

  async update(data) {
    await this.ormRepository.update({
      id: data.id
    }, data);
    const customer = await this.ormRepository.findOne(data.id);
    return customer;
  }

  async findByEmail(email) {
    return await this.ormRepository.findOne({
      where: {
        email
      }
    });
  }

  async findById(customer_id) {
    return await this.ormRepository.findOne(customer_id);
  }

  async listAllAvailableCustomersByCityAndState(city, state) {
    return await this.ormRepository.find({
      where: {
        city,
        state
      }
    });
  }

  async save(customer) {
    return this.ormRepository.save(customer);
  }

}

var _default = CustomersRepository;
exports.default = _default;