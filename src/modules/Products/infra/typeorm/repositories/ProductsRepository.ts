import { getRepository, Repository, Not } from "typeorm";

import IProductsRepository from "@modules/Products/repositories/IProductsRepository";
import Product from "../entities/Product";
import ICreateProductDTO from "@modules/Products/dtos/ICreateProductDTO";
import IUpdateProductDTO from "@modules/Products/dtos/IUpdateProductDTO";
import IVerifyIfSKUAlreadyExistsDTO from "@modules/Products/dtos/IVerifyIfSKUAlreadyExistsDTO";

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

  public async update(
    data: IUpdateProductDTO,
    product_id: string
  ): Promise<Product> {
    await this.ormRepository.update({ id: product_id }, data);

    const product = (await this.ormRepository.findOne(product_id)) as Product;

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
    return this.ormRepository.findOne(product_id, { relations: ["customer"] });
  }

  public async verifyIfSKUAlreadyExists({
    sku,
    id,
  }: IVerifyIfSKUAlreadyExistsDTO): Promise<boolean> {
    const result = await this.ormRepository.findOne({
      where: { sku, id: Not(id) },
    });

    return !!result;
  }

  public async verifyIfSKUAlreadyExistsWithoutId(
    sku: string
  ): Promise<boolean> {
    const result = await this.ormRepository.findOne({
      where: { sku },
    });

    return !!result;
  }
}

export default ProductsRepository;
