"use strict";

var _FakeOrdersRepository = _interopRequireDefault(require("../repositories/fakes/FakeOrdersRepository"));

var _FakeOrderProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeOrderProductsRepository"));

var _FakeCartsRepository = _interopRequireDefault(require("../../Carts/repositories/fake/FakeCartsRepository"));

var _FakeCartItemsRepository = _interopRequireDefault(require("../../Carts/repositories/fake/FakeCartItemsRepository"));

var _FakeProductsRepository = _interopRequireDefault(require("../../Products/repositories/fakes/FakeProductsRepository"));

var _DoCheckoutService = _interopRequireDefault(require("./DoCheckoutService"));

var _AddToCartService = _interopRequireDefault(require("../../Carts/services/AddToCartService"));

var _CreateProductService = _interopRequireDefault(require("../../Products/services/CreateProductService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeOrdersRepository;
let fakeOrderProductsRepository;
let fakeCartsRepository;
let fakeCartItemsRepository;
let fakeProductsRepository;
let fakeStorageProvider;
let doCheckoutService;
let addToCart;
let createProduct;
describe("DoCheckout", () => {
  beforeEach(() => {
    fakeOrdersRepository = new _FakeOrdersRepository.default();
    fakeOrderProductsRepository = new _FakeOrderProductsRepository.default();
    fakeCartsRepository = new _FakeCartsRepository.default();
    fakeCartItemsRepository = new _FakeCartItemsRepository.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    doCheckoutService = new _DoCheckoutService.default(fakeCartsRepository, fakeCartItemsRepository, fakeOrdersRepository, fakeOrderProductsRepository);
    addToCart = new _AddToCartService.default(fakeCartsRepository, fakeCartItemsRepository);
    createProduct = new _CreateProductService.default(fakeProductsRepository, fakeStorageProvider);
  });
  it("should be able to checkout an order", async () => {
    const cart = await fakeCartsRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id"
    });
    const product = await createProduct.execute({
      name: "fake-product",
      sku: "fake-product-sku",
      customer_id: "fake-customer-",
      price: 10,
      description: "fake-description",
      short_description: "fake-short-description",
      file: "image.jpg"
    });
    await addToCart.execute({
      user_id: cart.user_id,
      quantity: 1,
      product_id: product.id
    });
    const order = await doCheckoutService.execute({
      user_id: cart.user_id
    });
    expect(order === null || order === void 0 ? void 0 : order.total).toBe(0);
  });
  it("should not be able to checkout an order with a closed cart", async () => {
    const cart = await fakeCartsRepository.create({
      opened: false,
      user_id: "fake-user-id",
      customer_id: "fake-customer-id"
    });
    await expect(doCheckoutService.execute({
      user_id: cart.user_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to checkout an order without cart", async () => {
    await expect(doCheckoutService.execute({
      user_id: "inexistent-cart-id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});