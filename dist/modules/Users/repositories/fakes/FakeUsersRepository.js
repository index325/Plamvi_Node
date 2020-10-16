"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

var _uuidv = require("uuidv4");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.users = [];
  }

  async findById(user_id) {
    const user = this.users.find(item => item.id === user_id);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(item => item.email === email);
    return user;
  }

  async findIfEmailAlreadyExists(email, id) {
    return new _User.default();
  }

  async update({
    city,
    email,
    name,
    state,
    avatar
  }) {
    const selectedUserIndex = this.users.findIndex(item => item.email === email);
    const selectedUser = this.users[selectedUserIndex];
    this.users[selectedUserIndex] = { ...selectedUser,
      city,
      name,
      state,
      getAvatarUrl: () => "fake-image-url"
    };

    if (avatar) {
      this.users[selectedUserIndex].avatar = avatar;
    }

    return this.users[selectedUserIndex];
  }

  async updateUserAvatar({
    user,
    avatar
  }) {
    user.avatar = avatar;
    const updatedUserList = this.users.map(item => {
      if (item.email === user.email) {
        return { ...item,
          avatar: user.avatar,
          getAvatarUrl: () => "fake-image-url"
        };
      }

      return item;
    });
    this.users = updatedUserList;
    return user;
  }

  async create({
    email,
    name,
    password,
    state,
    avatar,
    city
  }) {
    const user = {
      id: (0, _uuidv.uuid)(),
      email,
      name,
      password,
      state,
      city,
      avatar: "",
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: () => "fake-image-url"
    };

    if (avatar) {
      user.avatar = avatar;
    }

    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(u => u.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

}

var _default = UsersRepository;
exports.default = _default;