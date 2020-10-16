"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ICustomersRepository = _interopRequireDefault(require("../../Customers/repositories/ICustomersRepository"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllAvailableCustomersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CustomersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICustomersRepository.default === "undefined" ? Object : _ICustomersRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListAllAvailableCustomersService {
  constructor(customersRepository, usersRepository) {
    this.customersRepository = customersRepository;
    this.usersRepository = usersRepository;
  }

  async execute({
    id
  }) {
    const {
      city,
      state
    } = await this.usersRepository.findById(id);
    return await this.customersRepository.listAllAvailableCustomersByCityAndState(city, state);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListAllAvailableCustomersService;