import AppError from "@shared/errors/AppError";
import IProductsRepository from "@modules/Products/repositories/IProductsRepository";
import Product from "@modules/Products/infra/typeorm/entities/Product";
import { injectable, inject } from "tsyringe";

@injectable()
export default class ListMyProductsService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute(customer_id: string): Promise<Product[]> {
    const products = await this.productsRepository.listAllProductsByCustomer(
      customer_id
    );

    return products;
  }
}
