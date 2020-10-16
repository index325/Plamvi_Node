"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashprovider;
let createUser;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashprovider = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashprovider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      avatar: 'fake.jpg',
      city: 'Belém',
      state: 'PA',
      name: 'Junin',
      email: 'junin@example.com',
      password: '123456'
    });
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });
  it('should not be able to create two users with same email', async () => {
    await createUser.execute({
      avatar: 'fake.jpg',
      city: 'Belém',
      state: 'PA',
      name: 'Junin',
      email: 'junin@example.com',
      password: '123456'
    });
    await expect(createUser.execute({
      avatar: 'fake.jpg',
      city: 'Belém',
      state: 'PA',
      name: 'Junin',
      email: 'junin@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});