import FakeCartItemsRepository from '../repositories/fake/FakeCartItemsRepository';
import FakeCartsRepository from '../repositories/fake/FakeCartsRepository';

import DeleteCartItemService from './DeleteCartItemService';

describe('DeleteCartItems', () => {
  it('should be able to delete a card item', async () => {
    const fakeCartItemsRepository = new FakeCartItemsRepository();
    const fakeCartsRepository = new FakeCartsRepository();
    const deleteCartItem = new DeleteCartItemService(fakeCartItemsRepository);

    const cart = await fakeCartsRepository.create({
      opened: true,
      user_id: 'fake-user-id'
    })

    const cartItem = await fakeCartItemsRepository.create({
      cart_id: cart.id,
      product_id: 'fake-product-id',
      quantity: 1,
    });

    await deleteCartItem.execute({ cart_item_id: cartItem.id });

    const foundCartItem = await fakeCartItemsRepository.findById(cartItem.id);

    expect(foundCartItem).toBe(undefined);
  });
})