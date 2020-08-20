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

    product.customer = {} as Customer;
    product.customer.id = customer_id;
    product.sku = sku;
    
    return product;
  }

  public async update(data: IUpdateProductDTO): Promise<Product | undefined> {
    return new Product();
  }
  public async listAllProductsByCustomer(
    customer_id: string
  ): Promise<Product[]> {
    return [new Product()];
  }
  public async findProductById(
    product_id: string
  ): Promise<Product | undefined> {
    return new Product();
  }

  public async verifyIfSKUAlreadyExists(sku: string): Promise<boolean> {
    return false;
  }
}

export default ProductsRepository;
