import IProductsRepository from "@modules/Products/repositories/IProductsRepository";
import ICreateProductDTO from "@modules/Products/dtos/ICreateProductDTO";
import IUpdateProductDTO from "@modules/Products/dtos/IUpdateProductDTO";

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

    product.id = customer_id;
    product.customer = {} as Customer;
    product.customer.id = customer_id;
    product.sku = sku;

    this.products.push(product);

    return product;
  }

  public async update({
    customer_id,
    description,
    image_url,
    name,
    price,
    product_id,
    short_description,
    sku
  }: IUpdateProductDTO): Promise<Product> {
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
    ;
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

  public async verifyIfSKUAlreadyExists(sku: string): Promise<boolean> {
    const foundProduct = this.products.find(item => item.sku === sku);

    return !!foundProduct;
  }
}

export default ProductsRepository;
