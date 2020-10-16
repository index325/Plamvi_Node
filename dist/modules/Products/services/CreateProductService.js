"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _tsyringe = require("tsyringe");

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ProductsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateProductService {
  constructor(productsRepository, storageProvider) {
    this.productsRepository = productsRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    name,
    sku,
    file,
    customer_id,
    price,
    description,
    short_description
  }) {
    const productAlreadyExists = await this.productsRepository.verifyIfSKUAlreadyExistsWithoutId(sku);

    if (productAlreadyExists) {
      throw new _AppError.default("Já existe um produto cadastrado com este SKU", 400);
    }

    const image = await this.storageProvider.saveFile(file);
    const product = await this.productsRepository.create({
      name,
      sku,
      image,
      customer_id,
      price,
      description,
      short_description
    });
    return product;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateProductService;