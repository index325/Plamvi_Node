"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("./../repositories/fakes/FakeProductsRepository"));

var _CreateProductService = _interopRequireDefault(require("./CreateProductService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProductsRepository;
let createProduct;
let fakeStorageProvider;
describe("CreateProduct", () => {
  beforeEach(() => {
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    createProduct = new _CreateProductService.default(fakeProductsRepository, fakeStorageProvider);
  });
  it("should be able to create a new product", async () => {
    const product = await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD",
      file: "image.jpg"
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
      sku: "ABCD"
    });
    await expect(createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});