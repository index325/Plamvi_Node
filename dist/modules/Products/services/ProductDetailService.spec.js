"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _CreateProductService = _interopRequireDefault(require("./CreateProductService"));

var _ProductDetailService = _interopRequireDefault(require("./ProductDetailService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProductsRepository;
let showProductDetails;
let fakeStorageProvider;
describe("ProductDetail", () => {
  beforeEach(() => {
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    showProductDetails = new _ProductDetailService.default(fakeProductsRepository);
  });
  it("should be able to show details about a product", async () => {
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
    const productDetails = await showProductDetails.execute(product.id);
    expect(productDetails).toEqual(product);
  });
  it("should be able to show details about a product", async () => {
    expect(showProductDetails.execute("non-existing-product-id")).rejects.toBeInstanceOf(_AppError.default);
  });
});