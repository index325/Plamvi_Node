"use strict";

var _FakeCartItemsRepository = _interopRequireDefault(require("../repositories/fake/FakeCartItemsRepository"));

var _FakeCartsRepository = _interopRequireDefault(require("../repositories/fake/FakeCartsRepository"));

var _DeleteCartItemService = _interopRequireDefault(require("./DeleteCartItemService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("DeleteCartItems", () => {
  it("should be able to delete a card item", async () => {
    const fakeCartItemsRepository = new _FakeCartItemsRepository.default();
    const fakeCartsRepository = new _FakeCartsRepository.default();
    const deleteCartItem = new _DeleteCartItemService.default(fakeCartItemsRepository, fakeCartsRepository);
    const cart = await fakeCartsRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id"
    });
    const cartItem = await fakeCartItemsRepository.create({
      cart_id: cart.id,
      product_id: "fake-product-id",
      quantity: 1
    });
    await deleteCartItem.execute({
      cart_item_id: cartItem.id,
      user_id: "fake-user-id"
    });
    const foundCartItem = await fakeCartItemsRepository.findById(cartItem.id);
    expect(foundCartItem).toBe(undefined);
  });
});