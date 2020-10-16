"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _Product = _interopRequireDefault(require("../../infra/typeorm/entities/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsRepository {
  constructor() {
    this.products = [];
  }

  async create({
    customer_id,
    description,
    image,
    name,
    price,
    short_description,
    sku
  }) {
    const product = new _Product.default();
    product.id = (0, _uuidv.uuid)();
    product.customer = {};
    product.customer.id = customer_id;
    product.sku = sku;
    product.price = price;
    product.description = description;
    product.image = image;
    product.name = name;
    product.short_description = short_description;

    product.getImageUrl = () => "fake-image-url";

    this.products.push(product);
    return product;
  }

  async update({
    customer_id,
    description,
    image,
    name,
    price,
    short_description,
    sku
  }, product_id) {
    const updatedProductIndex = this.products.findIndex(item => item.id === product_id);
    const updatedProducts = this.products.map(item => {
      if (item.id === product_id) {
        return { ...item,
          description,
          image,
          name,
          price,
          short_description,
          sku,
          getImageUrl: () => "fake-image-url"
        };
      }

      return item;
    });
    this.products = updatedProducts;
    return this.products[updatedProductIndex];
  }

  async listAllProductsByCustomer(customer_id) {
    const foundProducts = this.products.filter(item => item.customer.id === customer_id);
    return foundProducts;
  }

  async findProductById(product_id) {
    const foundProduct = this.products.find(item => item.id === product_id);
    return foundProduct;
  }

  async findBySku(sku) {
    const foundProduct = this.products.find(item => item.sku === sku);
    return foundProduct;
  }

  async verifyIfSKUAlreadyExists({
    sku,
    id
  }) {
    const foundProduct = this.products.find(item => item.sku === sku && item.id !== id);
    return !!foundProduct;
  }

  async verifyIfSKUAlreadyExistsWithoutId(sku) {
    const foundProduct = this.products.find(item => item.sku === sku);
    return !!foundProduct;
  }

}

var _default = ProductsRepository;
exports.default = _default;