import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";

import CreateProductService from "./CreateProductService";
import UpdateProductService from "./UpdateProductService";
import AppError from "@shared/errors/AppError";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

let fakeProductsRepository: FakeProductsRepository;
let updateProduct: UpdateProductService;
let fakeStorageProvider: FakeStorageProvider;

describe("UpdateProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateProduct = new UpdateProductService(
      fakeProductsRepository,
      fakeStorageProvider
    );
  });

  it("should be able to update a product", async () => {
    const createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStorageProvider
    );

    const product = await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD",
    });

    const updatedProduct = await updateProduct.execute({
      product_id: product.id,
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 20,
      short_description: "chama o bombeiro, la",
      sku: "ABCD",
    });

    expect(updatedProduct.price).toBe(20);
    expect(updatedProduct.image).toBe("image.jpg");
  });

  it("should not be able to update a non existing product", async () => {
    await expect(
      updateProduct.execute({
        product_id: "non-existent-product-id",
        customer_id: "fake-customer-id",
        name: "Churrasqueira de controle remoto",
        description: "Ta pegando fogo, bicho",
        file: "image.jpg",
        price: 20,
        short_description: "chama o bombeiro, la",
        sku: "ABCD",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to change to a already used sku", async () => {
    const createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStorageProvider
    );

    await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD",
    });

    const product = await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "EEEE",
    });

    await expect(
      updateProduct.execute({
        product_id: product.id,
        customer_id: "fake-customer-id",
        name: "Churrasqueira de controle remoto",
        description: "Ta pegando fogo, bicho",
        file: "image.jpg",
        price: 20,
        short_description: "chama o bombeiro, la",
        sku: "ABCD",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
