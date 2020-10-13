import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";

import CreateProductService from "./CreateProductService";
import ProductDetailService from "./ProductDetailService";
import AppError from "@shared/errors/AppError";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

let fakeProductsRepository: FakeProductsRepository;
let showProductDetails: ProductDetailService;
let fakeStorageProvider: FakeStorageProvider;

describe("ProductDetail", () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    showProductDetails = new ProductDetailService(fakeProductsRepository);
  });

  it("should be able to show details about a product", async () => {
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

    const productDetails = await showProductDetails.execute(product.id);

    expect(productDetails).toEqual(product);
  });

  it("should be able to show details about a product", async () => {
    expect(
      showProductDetails.execute("non-existing-product-id")
    ).rejects.toBeInstanceOf(AppError);
  });
});
