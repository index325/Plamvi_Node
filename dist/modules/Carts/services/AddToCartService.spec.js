"use strict";

var _FakeCartsRepository = _interopRequireDefault(require("../repositories/fake/FakeCartsRepository"));

var _FakeCartItemsRepository = _interopRequireDefault(require("../repositories/fake/FakeCartItemsRepository"));

var _AddToCartService = _interopRequireDefault(require("./AddToCartService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCartRepository;
let fakeCartItemsRepository;
let addToCart;
describe("AddToCart", () => {
  beforeEach(() => {
    fakeCartRepository = new _FakeCartsRepository.default();
    fakeCartItemsRepository = new _FakeCartItemsRepository.default();
    addToCart = new _AddToCartService.default(fakeCartRepository, fakeCartItemsRepository);
  });
  it("should be able to create a new cartItem", async () => {
    const cart = await fakeCartRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id"
    });
    const cartItem = await addToCart.execute({
      user_id: cart.user_id,
      product_id: "fake-product-id",
      quantity: 1
    });
    expect(cartItem === null || cartItem === void 0 ? void 0 : cartItem.user_id).toBe("fake-user-id");
  });
  it("should not be able to create a new cartItem with quantity 0", async () => {
    const cart = await fakeCartRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id"
    });
    await expect(addToCart.execute({
      user_id: cart.user_id,
      product_id: "fake-product-id",
      quantity: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to create a new cartItem with no cart", async () => {
    await expect(addToCart.execute({
      user_id: "fake-user-id",
      product_id: "fake-product-id",
      quantity: 1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should be able to increment the item quantity", async () => {
    const cart = await fakeCartRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id"
    });
    await addToCart.execute({
      user_id: cart.user_id,
      product_id: "fake-product-id",
      quantity: 1
    });
    await addToCart.execute({
      user_id: cart.user_id,
      product_id: "fake-product-id",
      quantity: 1
    });
    const cartItem = await fakeCartItemsRepository.findById("fake-id");
    expect(cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity).toBe(2);
  });
});