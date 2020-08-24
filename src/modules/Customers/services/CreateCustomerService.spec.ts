import FakeCustomersRespository from '../repositories/fakes/FakeCustomersRepository';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import CreateCustomerService from './CreateCustomerService';

import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRespository;
let fakeHashProvider: FakeHashProvider;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRespository();
    fakeHashProvider = new FakeHashProvider();
    createCustomer = new CreateCustomerService(
      fakeCustomersRepository,
      fakeHashProvider,
    );
  })
  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      avatar: 'avatar-url',
      name: 'test-costumer',
      email: 'email@costumer.com',
      password: '123123',
      city: 'Belém',
      state: 'PA',
    });


    expect(customer.id).toBe('fake-id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      avatar: 'avatar-url',
      name: 'test-costumer',
      email: 'email@costumer.com',
      password: '123123',
      city: 'Belém',
      state: 'PA',
    });


    await expect(
      createCustomer.execute({
        avatar: 'avatar-url',
        name: 'test-costumer-2',
        email: 'email@costumer.com',
        password: '123123',
        city: 'Belém',
        state: 'PA',
      })
      ).rejects.toBeInstanceOf(AppError);
});
});