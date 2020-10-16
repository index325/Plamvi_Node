"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateUserService = _interopRequireDefault(require("./UpdateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateUser;
describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateUser = new _UpdateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update an user data', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY'
    });
    const updatedUser = await updateUser.execute({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
      user_id: user.id
    });
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name).toBe('John Tre');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email).toBe('johntre@email.com');
  });
  it('should not be able to update profile from non-existing user', async () => {
    await expect(updateUser.execute({
      user_id: 'non-existing-id',
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to change to another user's email", async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY'
    });
    const johnTre = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY'
    });
    await expect(updateUser.execute({
      user_id: johnTre.id,
      name: 'John Tre',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});