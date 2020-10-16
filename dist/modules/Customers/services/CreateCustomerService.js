"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICustomersRepository = _interopRequireDefault(require("../repositories/ICustomersRepository"));

var _tsyringe = require("tsyringe");

var _IHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CustomersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICustomersRepository.default === "undefined" ? Object : _ICustomersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateCustomerService {
  constructor(customersRepository, hashProvider) {
    this.customersRepository = customersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    name,
    email,
    password,
    city,
    state
  }) {
    const checkUserExists = await this.customersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new _AppError.default("E-mail já cadastrado");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const customer = await this.customersRepository.create({
      name,
      email,
      password: hashedPassword,
      city,
      state,
      avatar: "",
      paid: false
    });
    return customer;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateCustomerService;