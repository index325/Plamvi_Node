import { getRepository, Repository } from "typeorm";

import IProductsRepository from "@modules/Products/repositories/IProductsRepository";
import Product from "../entities/Product";
import ICreateProductDTO from "@modules/Products/dtos/ICreateProductDTO";
import IUpdateProductDTO from "@modules/Products/dtos/IUpdateProductDTO";

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async update(data: IUpdateProductDTO): Promise<Product> {
    await this.ormRepository.update({ id: data.product_id }, data);

    const product = await this.ormRepository.findOne(data.product_id) as Product;

    return product;
  }
  public async listAllProductsByCustomer(
    customer_id: string
  ): Promise<Product[]> {
    return this.ormRepository.find({
      where: { customer_id },
    });
  }
  public async findProductById(
    product_id: string
  ): Promise<Product | undefined> {
    return this.ormRepository.findOne(product_id);
  }

  public async verifyIfSKUAlreadyExists(sku: string): Promise<boolean> {
    return !!this.ormRepository.find({
      where: sku,
    });
  }
}

export default ProductsRepository;
