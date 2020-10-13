import FakeOrdersRepository from "../repositories/fakes/FakeOrdersRepository";
import FakeOrderProductsRepository from "../repositories/fakes/FakeOrderProductsRepository";
import FakeCartsRepository from "@modules/Carts/repositories/fake/FakeCartsRepository";
import FakeCartItemsRepository from "@modules/Carts/repositories/fake/FakeCartItemsRepository";
import FakeProductsRepository from "@modules/Products/repositories/fakes/FakeProductsRepository";

import DoCheckoutService from "./DoCheckoutService";
import AddToCartService from "@modules/Carts/services/AddToCartService";
import CreateProductService from "@modules/Products/services/CreateProductService";

import AppError from "@shared/errors/AppError";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrderProductsRepository: FakeOrderProductsRepository;
let fakeCartsRepository: FakeCartsRepository;
let fakeCartItemsRepository: FakeCartItemsRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeStorageProvider: FakeStorageProvider;

let doCheckoutService: DoCheckoutService;
let addToCart: AddToCartService;
let createProduct: CreateProductService;

describe("DoCheckout", () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrderProductsRepository = new FakeOrderProductsRepository();
    fakeCartsRepository = new FakeCartsRepository();
    fakeCartItemsRepository = new FakeCartItemsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    doCheckoutService = new DoCheckoutService(
      fakeCartsRepository,
      fakeCartItemsRepository,
      fakeOrdersRepository,
      fakeOrderProductsRepository
    );

    addToCart = new AddToCartService(
      fakeCartsRepository,
      fakeCartItemsRepository
    );

    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStorageProvider
    );
  });

  it("should be able to checkout an order", async () => {
    const cart = await fakeCartsRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id",
    });

    const product = await createProduct.execute({
      name: "fake-product",
      sku: "fake-product-sku",
      customer_id: "fake-customer-",
      price: 10,
      description: "fake-description",
      short_description: "fake-short-description",
      file: "image.jpg",
    });

    await addToCart.execute({
      user_id: cart.user_id,
      quantity: 1,
      product_id: product.id,
    });

    const order = await doCheckoutService.execute({
      user_id: cart.user_id,
    });

    expect(order?.total).toBe(0);
  });

  it("should not be able to checkout an order with a closed cart", async () => {
    const cart = await fakeCartsRepository.create({
      opened: false,
      user_id: "fake-user-id",
      customer_id: "fake-customer-id",
    });

    await expect(
      doCheckoutService.execute({
        user_id: cart.user_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to checkout an order without cart", async () => {
    await expect(
      doCheckoutService.execute({
        user_id: "inexistent-cart-id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
