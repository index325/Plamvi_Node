"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashprovider;
let fakeStorageProvider;
let updateUserAvatar;
describe("UpdateUserAvatar", () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashprovider = new _FakeHashProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  });
  it("should be able to update an user`s avatar", async () => {
    const createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashprovider);
    const user = await createUser.execute({
      avatar: "fake.jpg",
      city: "Belém",
      state: "PA",
      name: "Junin",
      email: "junin@example.com",
      password: "123456"
    });
    const foundUser = await updateUserAvatar.execute({
      avatar: "updated.jpg",
      user_id: user.id
    });
    expect(foundUser.avatar).toBe("updated.jpg");
  });
  it("should not be able to update a non existing user`s avatar", async () => {
    await expect(updateUserAvatar.execute({
      avatar: "fake.jpg",
      user_id: "non-existing-id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});