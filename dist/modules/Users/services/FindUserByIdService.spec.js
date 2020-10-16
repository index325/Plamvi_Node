"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FindUserByIdService = _interopRequireDefault(require("./FindUserByIdService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashprovider;
let findUserById;
describe('FindUserById', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashprovider = new _FakeHashProvider.default();
    findUserById = new _FindUserByIdService.default(fakeUsersRepository);
  });
  it('should be able to find a user by id', async () => {
    const createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashprovider);
    const user = await createUser.execute({
      avatar: 'fake.jpg',
      city: 'Belém',
      state: 'PA',
      name: 'Junin',
      email: 'junin@example.com',
      password: '123456'
    });
    const foundUser = await findUserById.execute(user.id);
    expect(foundUser.email).toEqual(user.email);
  });
  it('should not be able to find a non existing user', async () => {
    await expect(findUserById.execute('non-exitent-id')).rejects.toBeInstanceOf(_AppError.default);
  });
});