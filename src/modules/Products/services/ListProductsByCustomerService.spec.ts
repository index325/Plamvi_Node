import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";

import CreateProductService from "./CreateProductService";
import ListProductsByCustomerService from "./ListProductsByCustomerService";

describe("ListProductsByCustomer", () => {
  it("should be able to list products by customer", async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStorageProvider
    );
    const listProductsByCustomer = new ListProductsByCustomerService(
      fakeProductsRepository
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

    const foundProduct = await listProductsByCustomer.execute(
      product.customer.id
    );

    expect(foundProduct).toEqual(expect.arrayContaining([product]));
  });
});
