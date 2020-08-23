import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import FakeOrderProductsRepository from '../repositories/fakes/FakeOrderProductsRepository';
import FakeCartsRepository from '@modules/Carts/repositories/fake/FakeCartsRepository';
import FakeCartItemsRepository from '@modules/Carts/repositories/fake/FakeCartItemsRepository';

import DoCheckoutService from './DoCheckoutService';

import AppError from '@shared/errors/AppError';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrderProductsRepository: FakeOrderProductsRepository;
let fakeCartsRepository: FakeCartsRepository;
let fakeCartItemsRepository: FakeCartItemsRepository;

let doCheckoutService: DoCheckoutService;


describe('DoCheckout', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrderProductsRepository = new FakeOrderProductsRepository();
    fakeCartsRepository = new FakeCartsRepository();
    fakeCartItemsRepository = new FakeCartItemsRepository();

    doCheckoutService = new DoCheckoutService(
      fakeCartsRepository,
      fakeCartItemsRepository,
      fakeOrdersRepository,
      fakeOrderProductsRepository,
    );
  });

  it('should be able to checkout an order', async () => {
    const cart = await fakeCartsRepository.create({
      opened: true,
      user_id: 'fake-user-id',
    });

    const order = await doCheckoutService.execute({
      user_id: cart.user_id,
    });

    expect(order?.total).toBe(0);
  });

  it('should not be able to checkout an order with a closed cart', async () => {
    const cart = await fakeCartsRepository.create({
      opened: false,
      user_id: 'fake-user-id',
    });

    await expect(
      doCheckoutService.execute({
        user_id: cart.user_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to checkout an order without cart', async () => {
    await expect(
      doCheckoutService.execute({
        user_id: 'inexistent-cart-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})