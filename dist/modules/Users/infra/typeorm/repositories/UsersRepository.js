"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findById(user_id) {
    const user = await this.ormRepository.findOne(user_id);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async findIfEmailAlreadyExists(email, id) {
    const user = await this.ormRepository.findOne({
      where: {
        email,
        id: (0, _typeorm.Not)(id)
      }
    });
    return user;
  }

  async update(userData) {
    return this.ormRepository.save(userData);
  }

  async updateUserAvatar({
    user,
    avatar
  }) {
    user.avatar = avatar;
    await this.ormRepository.save(user);
    return user;
  }

  async create(userData) {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UsersRepository;
exports.default = _default;