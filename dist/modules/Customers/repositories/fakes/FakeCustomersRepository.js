"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _Customer = _interopRequireDefault(require("../../infra/typeorm/entities/Customer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeCustomersRepository {
  constructor() {
    this.customers = [];
  }

  async create({
    name,
    email,
    password,
    avatar,
    city,
    state,
    paid
  }) {
    const customer = new _Customer.default();
    customer.id = (0, _uuidv.uuid)();
    customer.name = name;
    customer.email = email;
    customer.password = password;
    customer.avatar = avatar;
    customer.city = city;
    customer.state = state;
    customer.paid = paid;
    this.customers.push(customer);
    return customer;
  }

  async update(data) {
    return new _Customer.default();
  }

  async findByEmail(email) {
    const foundCustomer = this.customers.find(item => item.email === email);
    return foundCustomer;
  }

  async findById(customer_id) {
    const foundCustomer = this.customers.find(item => item.id === customer_id);
    return foundCustomer;
  }

  async listAllAvailableCustomersByCityAndState(city, state) {
    const foundCustomer = this.customers.filter(item => item.city === city && item.state === state);
    return foundCustomer;
  }

  async save(customer) {
    const findIndex = this.customers.findIndex(c => c.id === customer.id);
    this.customers[findIndex] = customer;
    return customer;
  }

}

var _default = FakeCustomersRepository;
exports.default = _default;