import FakeCustomersRespository from './../repositories/fake/FakeCustomersRepository';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRespository();
    const fakeHashProvider = new FakeHashProvider();
    const createCustomer = new CreateCustomerService(
      fakeCustomersRepository,
      fakeHashProvider,
      );

      const customer = await createCustomer.execute({
        avatar: 'avatar-url',
        name: 'test-costumer',
        email: 'email@costumer.com',
        password: '123123',
        city: 'Belém',
        state: 'PA',
      });


      expect(customer.id).toBe('fake-id');
  })
})