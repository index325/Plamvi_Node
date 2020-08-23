import FakeCustomersRespository from './../repositories/fake/FakeCustomersRepository';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import CreateCustomerService from './CreateCustomerService';
import AuthenticateCustomerService from './AuthenticateCustomerService';

import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRespository;
let fakeHashProvider: FakeHashProvider;
let createCustomer: CreateCustomerService;
let authenticateCustomer: AuthenticateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRespository();
    fakeHashProvider = new FakeHashProvider();

    createCustomer = new CreateCustomerService(
      fakeCustomersRepository,
      fakeHashProvider,
    );

    authenticateCustomer = new AuthenticateCustomerService(
      fakeCustomersRepository,
      fakeHashProvider,
    );
  })
  it('should be able to authenticate a customer', async () => {
    const customer = await createCustomer.execute({
      avatar: 'avatar-url',
      name: 'test-costumer',
      email: 'email@costumer.com',
      password: '123123',
      city: 'Belém',
      state: 'PA',
    });

    const response = await authenticateCustomer.execute({
      email: customer.email,
      password: customer.password,
    });


    expect(response).toHaveProperty('token');
    expect(response.customer).toEqual(customer);
  });

  it('should not be able to authenticate user with wrong email', async () => {
    const customer = await createCustomer.execute({
      avatar: 'avatar-url',
      name: 'test-costumer',
      email: 'email@costumer.com',
      password: '123123',
      city: 'Belém',
      state: 'PA',
    });

    expect(
      authenticateCustomer.execute({
        email: 'wrong@email.com',
        password: customer.password,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const customer = await createCustomer.execute({
      avatar: 'avatar-url',
      name: 'test-costumer',
      email: 'email@costumer.com',
      password: '123123',
      city: 'Belém',
      state: 'PA',
    });

    expect(
      authenticateCustomer.execute({
        email: customer.email,
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});