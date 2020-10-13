import FakeProductsRepository from "./../repositories/fakes/FakeProductsRepository";

import CreateProductService from "./CreateProductService";

import AppError from "@shared/errors/AppError";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let fakeStorageProvider: FakeStorageProvider;

describe("CreateProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStorageProvider
    );
  });

  it("should be able to create a new product", async () => {
    const product = await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD",
      file: "image.jpg",
    });

    expect(product.customer.id).toBe("fake-customer-id");
  });

  it("should not be able to create two products using the same sku", async () => {
    await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD",
    });

    await expect(
      createProduct.execute({
        customer_id: "fake-customer-id",
        name: "Churrasqueira de controle remoto",
        description: "Ta pegando fogo, bicho",
        file: "image.jpg",
        price: 10,
        short_description: "chama o bombeiro, la",
        sku: "ABCD",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
