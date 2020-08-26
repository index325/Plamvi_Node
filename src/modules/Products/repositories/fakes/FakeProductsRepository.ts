import {uuid} from 'uuidv4'

import IProductsRepository from "@modules/Products/repositories/IProductsRepository";
import ICreateProductDTO from "@modules/Products/dtos/ICreateProductDTO";
import IUpdateProductDTO from "@modules/Products/dtos/IUpdateProductDTO";
import IVerifyIfSKUAlreadyExistsDTO from "@modules/Products/dtos/IVerifyIfSKUAlreadyExistsDTO";

import Product from "../../infra/typeorm/entities/Product";
import Customer from '@modules/Customers/infra/typeorm/entities/Customer';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    customer_id,
    description,
    image_url,
    name,
    price,
    short_description,
    sku
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    product.id = uuid();
    product.customer = {} as Customer;
    product.customer.id = customer_id;
    product.sku = sku;
    product.price = price;
    product.description = description;
    product.image_url = image_url;
    product.name = name;
    product.short_description = short_description;

    this.products.push(product);

    return product;
  }

  public async update({
    customer_id,
    description,
    image_url,
    name,
    price,
    short_description,
    sku
  }: IUpdateProductDTO, product_id: string): Promise<Product> {
    const updatedProductIndex = this.products.findIndex(
      item => item.id === product_id
    );

    const updatedProducts = this.products.map((item) => {
      if (item.id === product_id) {
        return {
          ...item,
          description,
          image_url,
          name,
          price,
          short_description,
          sku
        }
      }

      return item;
    });

    this.products = updatedProducts;

    return this.products[updatedProductIndex];
  }
  public async listAllProductsByCustomer(
    customer_id: string
  ): Promise<Product[]> {
    const foundProducts = this.products.filter(item => item.customer.id === customer_id);

    return foundProducts;
  }
  public async findProductById(
    product_id: string
  ): Promise<Product | undefined> {
    const foundProduct = this.products.find(item => item.id === product_id);

    return foundProduct;
  }

  public async findBySku(
    sku: string
  ): Promise<Product | undefined> {
    const foundProduct = this.products.find(item => item.sku === sku);

    return foundProduct;
  }

  public async verifyIfSKUAlreadyExists({
    sku,
    id,
  }: IVerifyIfSKUAlreadyExistsDTO): Promise<boolean> {
    const foundProduct = this.products.find(item => item.sku === sku && item.id !== id);

    return !!foundProduct;
  }

  public async verifyIfSKUAlreadyExistsWithoutId(sku: string): Promise<boolean> {
    const foundProduct = this.products.find(item => item.sku === sku);

    return !!foundProduct;
  }
}

export default ProductsRepository;
