import FakeProductsRepository from './../repositories/fakes/FakeProductsRepository';

import CreateProductService from './CreateProductService';

import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(
      fakeProductsRepository,
    );
  })
  it('should be able to create a new customer', async () => {
    const product = await createProduct.execute({
      customer_id: 'fake-customer-id',
      name: 'Churrasqueira de controle remoto',
      description: 'Ta pegando fogo, bicho',
      image_url: 'avatar_url',
      price: 10,
      short_description: 'chama o bombeiro, la',
      sku: 'ABCD',
    });


    expect(product.customer.id).toBe('fake-customer-id');
  });
});