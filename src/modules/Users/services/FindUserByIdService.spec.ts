import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashprovider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import FindUserByIdService from './FindUserByIdService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashprovider: FakeHashprovider;
let findUserById: FindUserByIdService;

describe('FindUserById', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashprovider = new FakeHashprovider();
    findUserById = new FindUserByIdService(
      fakeUsersRepository,
    );
  })

  it('should be able to find a user by id', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashprovider,
    );
    
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
    await expect(findUserById.execute('non-exitent-id')
    ).rejects.toBeInstanceOf(AppError);
  });
});