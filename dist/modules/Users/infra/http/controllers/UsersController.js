"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _FindUserByIdService = _interopRequireDefault(require("../../../services/FindUserByIdService"));

var _UpdateUserService = _interopRequireDefault(require("../../../services/UpdateUserService"));

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

var _ListAllAvailableCustomersService = _interopRequireDefault(require("../../../services/ListAllAvailableCustomersService"));

var _UpdatePasswordService = _interopRequireDefault(require("../../../services/UpdatePasswordService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password,
      city,
      state,
      avatar
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      name,
      email,
      password,
      city,
      state,
      avatar
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const {
      id
    } = request.user;
    const {
      name,
      email,
      password,
      city,
      state
    } = request.body;

    const createUser = _tsyringe.container.resolve(_UpdateUserService.default);

    const user = await createUser.execute({
      user_id: id,
      name,
      email,
      password,
      city,
      state
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async updateAvatar(request, response) {
    const {
      id
    } = request.user;

    const createUser = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await createUser.execute({
      user_id: id,
      avatar: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async updatePassword(request, response) {
    const {
      id
    } = request.user;
    const {
      old_password,
      new_password
    } = request.body;

    const updatePassword = _tsyringe.container.resolve(_UpdatePasswordService.default);

    await updatePassword.execute({
      user_id: id,
      oldPassword: old_password,
      newPassword: new_password
    });
    return response.status(204).json();
  }

  async detail(request, response) {
    const {
      id
    } = request.user;

    const createUser = _tsyringe.container.resolve(_FindUserByIdService.default);

    const user = await createUser.execute(id);
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async listAllAvailableCustomers(request, response) {
    const {
      id
    } = request.user;

    const listAllAvailableCustomers = _tsyringe.container.resolve(_ListAllAvailableCustomersService.default);

    const customers = await listAllAvailableCustomers.execute({
      id
    });
    return response.json((0, _classTransformer.classToClass)(customers));
  }

}

exports.default = UsersController;