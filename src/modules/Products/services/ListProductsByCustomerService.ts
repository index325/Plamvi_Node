import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import IProductsRepository from "../repositories/IProductsRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export default class ListProductsByCustomerService {
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
