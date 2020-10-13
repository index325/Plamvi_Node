import FakeCartsRepository from "../repositories/fake/FakeCartsRepository";
import FakeCartItemsRespository from "../repositories/fake/FakeCartItemsRepository";

import AddToCartService from "./AddToCartService";

import AppError from "@shared/errors/AppError";

let fakeCartRepository: FakeCartsRepository;
let fakeCartItemsRepository: FakeCartItemsRespository;
let addToCart: AddToCartService;

describe("AddToCart", () => {
  beforeEach(() => {
    fakeCartRepository = new FakeCartsRepository();
    fakeCartItemsRepository = new FakeCartItemsRespository();
    addToCart = new AddToCartService(
      fakeCartRepository,
      fakeCartItemsRepository
    );
  });

  it("should be able to create a new cartItem", async () => {
    const cart = await fakeCartRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id",
    });

    const cartItem = await addToCart.execute({
      user_id: cart.user_id,
      product_id: "fake-product-id",
      quantity: 1,
    });

    expect(cartItem?.user_id).toBe("fake-user-id");
  });

  it("should not be able to create a new cartItem with quantity 0", async () => {
    const cart = await fakeCartRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id",
    });

    await expect(
      addToCart.execute({
        user_id: cart.user_id,
        product_id: "fake-product-id",
        quantity: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new cartItem with no cart", async () => {
    await expect(
      addToCart.execute({
        user_id: "fake-user-id",
        product_id: "fake-product-id",
        quantity: 1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to increment the item quantity", async () => {
    const cart = await fakeCartRepository.create({
      customer_id: "fake-customer-id",
      opened: true,
      user_id: "fake-user-id",
    });

    await addToCart.execute({
      user_id: cart.user_id,
      product_id: "fake-product-id",
      quantity: 1,
    });

    await addToCart.execute({
      user_id: cart.user_id,
      product_id: "fake-product-id",
      quantity: 1,
    });

    const cartItem = await fakeCartItemsRepository.findById("fake-id");

    expect(cartItem?.quantity).toBe(2);
  });
});
