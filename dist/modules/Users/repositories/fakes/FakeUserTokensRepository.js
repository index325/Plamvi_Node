"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.userTokens = [];
  }

  async generate(user_id) {
    const userToken = new _UserToken.default();
    userToken.user_id = user_id;
    userToken.token = 'generated-token';
    userToken.created_at = new Date();
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const user = this.userTokens.find(item => item.token === token);
    return user;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;