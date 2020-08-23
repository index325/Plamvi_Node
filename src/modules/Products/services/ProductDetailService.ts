import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import IProductsRepository from "../repositories/IProductsRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export default class ProductDetailService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute(product_id: string): Promise<Product> {
    const product = await this.productsRepository.findProductById(product_id);

    if (product) {
      return product;
    } else {
      throw new AppError("Não foi possível localizar o produto");
    }
  }
}
