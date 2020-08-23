import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashprovider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashprovider: FakeHashprovider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashprovider = new FakeHashprovider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashprovider,
    );
  })

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
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});
