import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import CreateProductService from './CreateProductService';
import ListProductsByCustomerService from './ListProductsByCustomerService';

describe('ListProductsByCustomer', () => {
  it('should be able to list products by customer', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(
      fakeProductsRepository,
    );
    const listProductsByCustomer = new ListProductsByCustomerService(
      fakeProductsRepository,
    );

    const product = await createProduct.execute({
      customer_id: 'fake-customer-id',
      name: 'Churrasqueira de controle remoto',
      description: 'Ta pegando fogo, bicho',
      image_url: 'avatar_url',
      price: 10,
      short_description: 'chama o bombeiro, la',
      sku: 'ABCD',
    });

    const foundProduct = await listProductsByCustomer.execute(product.customer.id);

    expect(foundProduct).toEqual(expect.arrayContaining([product]));
  })
})