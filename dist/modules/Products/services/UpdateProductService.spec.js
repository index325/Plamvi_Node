"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _CreateProductService = _interopRequireDefault(require("./CreateProductService"));

var _UpdateProductService = _interopRequireDefault(require("./UpdateProductService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProductsRepository;
let updateProduct;
let fakeStorageProvider;
describe("UpdateProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateProduct = new _UpdateProductService.default(fakeProductsRepository, fakeStorageProvider);
  });
  it("should be able to update a product", async () => {
    const createProduct = new _CreateProductService.default(fakeProductsRepository, fakeStorageProvider);
    const product = await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD"
    });
    const updatedProduct = await updateProduct.execute({
      product_id: product.id,
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 20,
      short_description: "chama o bombeiro, la",
      sku: "ABCD"
    });
    expect(updatedProduct.price).toBe(20);
    expect(updatedProduct.image).toBe("image.jpg");
  });
  it("should not be able to update a non existing product", async () => {
    await expect(updateProduct.execute({
      product_id: "non-existent-product-id",
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 20,
      short_description: "chama o bombeiro, la",
      sku: "ABCD"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to change to a already used sku", async () => {
    const createProduct = new _CreateProductService.default(fakeProductsRepository, fakeStorageProvider);
    await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD"
    });
    const product = await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "EEEE"
    });
    await expect(updateProduct.execute({
      product_id: product.id,
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 20,
      short_description: "chama o bombeiro, la",
      sku: "ABCD"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});