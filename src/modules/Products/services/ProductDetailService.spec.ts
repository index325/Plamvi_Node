import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import CreateProductService from './CreateProductService';
import ProductDetailService from './ProductDetailService';
import AppError from '@shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let showProductDetails: ProductDetailService;

describe('ProductDetail', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    showProductDetails = new ProductDetailService(
      fakeProductsRepository,
    );
  });

  it('should be able to show details about a product', async () => {
    const createProduct = new CreateProductService(
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

    const productDetails = await showProductDetails.execute(product.id);

    expect(productDetails).toEqual(product);
  });

  it('should be able to show details about a product', async () => {
    expect(
      showProductDetails.execute('non-existing-product-id')
    ).rejects.toBeInstanceOf(AppError);
  });
})