import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRespository;
let updateUser: UpdateUserService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRespository();
    updateUser = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update an user data', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
    });

    const updatedUser = await updateUser.execute({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
      avatar: '',
      user_id: user.id,
    });

    expect(updatedUser?.name).toBe('John Tre');
    expect(updatedUser?.email).toBe('johntre@email.com');
  });

  it('should not be able to update profile from non-existing user', async () => {
    await expect(
      updateUser.execute({
        user_id: 'non-existing-id',
        name: 'John Tre',
        email: 'johntre@email.com',
        password: '123456',
        city: 'NY',
        state: 'NY',
        avatar: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to change to another user's email", async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
    });

    const johnTre = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
    });

    await expect(
      updateUser.execute({
        user_id: johnTre.id,
        name: 'John Tre',
        email: 'johndoe@email.com',
        password: '123456',
        city: 'NY',
        state: 'NY',
        avatar: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
