"use strict";

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _CreateProductService = _interopRequireDefault(require("./CreateProductService"));

var _ListProductsByCustomerService = _interopRequireDefault(require("./ListProductsByCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ListProductsByCustomer", () => {
  it("should be able to list products by customer", async () => {
    const fakeProductsRepository = new _FakeProductsRepository.default();
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const createProduct = new _CreateProductService.default(fakeProductsRepository, fakeStorageProvider);
    const listProductsByCustomer = new _ListProductsByCustomerService.default(fakeProductsRepository);
    const product = await createProduct.execute({
      customer_id: "fake-customer-id",
      name: "Churrasqueira de controle remoto",
      description: "Ta pegando fogo, bicho",
      file: "image.jpg",
      price: 10,
      short_description: "chama o bombeiro, la",
      sku: "ABCD"
    });
    const foundProduct = await listProductsByCustomer.execute(product.customer.id);
    expect(foundProduct).toEqual(expect.arrayContaining([product]));
  });
});