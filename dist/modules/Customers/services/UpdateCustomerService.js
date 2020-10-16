"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICustomersRepository = _interopRequireDefault(require("../repositories/ICustomersRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CustomersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomersRepository.default === "undefined" ? Object : _ICustomersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCustomerService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async execute({
    id,
    name,
    email,
    city,
    state
  }) {
    const foundCustomer = await this.customersRepository.findByEmail(email);

    if (foundCustomer && foundCustomer.id !== id) {
      throw new _AppError.default("E-mail já cadastrado");
    }

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new _AppError.default("Estabelecimento não encontrado");
    }

    customer.name = name;
    customer.email = email;
    customer.city = city;
    customer.state = state;
    await this.customersRepository.update(customer);
    return customer;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateCustomerService;