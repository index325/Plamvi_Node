"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICustomersRepository = _interopRequireDefault(require("../repositories/ICustomersRepository"));

var _ICustomerTokensRepository = _interopRequireDefault(require("../repositories/ICustomerTokensRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ResetPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UserTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ICustomersRepository.default === "undefined" ? Object : _ICustomersRepository.default, typeof _ICustomerTokensRepository.default === "undefined" ? Object : _ICustomerTokensRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordService {
  constructor(customersRepository, customerTokenRepository, hashProvider) {
    this.customersRepository = customersRepository;
    this.customerTokenRepository = customerTokenRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    token,
    password
  }) {
    const customerToken = await this.customerTokenRepository.findByToken(token);

    if (!customerToken) {
      throw new _AppError.default("Customer token does not exists");
    }

    const customer = await this.customersRepository.findById(customerToken.customer_id);

    if (!customer) {
      throw new _AppError.default("Customer does not exists");
    }

    const tokenCreatedAt = customerToken.created_at;

    if ((0, _dateFns.differenceInHours)(Date.now(), tokenCreatedAt) > 2) {
      throw new _AppError.default("Token expired");
    }

    customer.password = await this.hashProvider.generateHash(password);
    await this.customersRepository.save(customer);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ResetPasswordService;