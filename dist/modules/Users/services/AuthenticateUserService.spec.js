"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let usersRepository;
let hashProvider;
let authenticateUser;
describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new _FakeUsersRepository.default();
    hashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(usersRepository, hashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY'
    });
    const auth = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '123456'
    });
    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    const nonRegisteredData = {
      email: 'johndoe@email.com',
      password: '123456'
    };
    await expect(authenticateUser.execute(nonRegisteredData)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY'
    });
    await expect(authenticateUser.execute({
      email: 'johndoe@email.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});