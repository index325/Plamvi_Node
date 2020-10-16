"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICustomersRepository = _interopRequireDefault(require("../repositories/ICustomersRepository"));

var _ICustomerTokensRepository = _interopRequireDefault(require("../repositories/ICustomerTokensRepository"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _tsyringe = require("tsyringe");

var _path = _interopRequireDefault(require("path"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendForgotPasswordEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CustomersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("MailProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("CustomerTokensRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ICustomersRepository.default === "undefined" ? Object : _ICustomersRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _ICustomerTokensRepository.default === "undefined" ? Object : _ICustomerTokensRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class SendForgotPasswordEmailService {
  constructor(customersRepository, mailProvider, customerTokenRepository) {
    this.customersRepository = customersRepository;
    this.mailProvider = mailProvider;
    this.customerTokenRepository = customerTokenRepository;
  }

  async execute({
    email
  }) {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new _AppError.default("Customer does not exists");
    }

    const {
      token
    } = await this.customerTokenRepository.generate(customer.id);

    const forgotPasswordTemplate = _path.default.resolve(__dirname, "..", "views", "forgot_password.hbs");

    await this.mailProvider.sendMail({
      to: {
        name: customer.name,
        email: customer.email
      },
      subject: "[GoBarber] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: customer.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = SendForgotPasswordEmailService;