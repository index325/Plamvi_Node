import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import FakeHashprovider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let usersRepository: FakeUsersRespository;
let hashProvider: FakeHashprovider;
let authenticateUser: AuthenticateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRespository();
    hashProvider = new FakeHashprovider();
    authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
    });

    const auth = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const nonRegisteredData = {
      email: 'johndoe@email.com',
      password: '123456',
    };

    await expect(
      authenticateUser.execute(nonRegisteredData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});