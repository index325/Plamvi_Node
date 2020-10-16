"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IUserTokenRepository = _interopRequireDefault(require("../repositories/IUserTokenRepository"));

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
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IUserTokenRepository.default === "undefined" ? Object : _IUserTokenRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordService {
  constructor(usersRepository, userTokenRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.userTokenRepository = userTokenRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new _AppError.default("User token does not exists");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new _AppError.default("User does not exists");
    }

    const tokenCreatedAt = userToken.created_at;

    if ((0, _dateFns.differenceInHours)(Date.now(), tokenCreatedAt) > 2) {
      throw new _AppError.default("Token expired");
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ResetPasswordService;