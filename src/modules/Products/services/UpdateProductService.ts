import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import IProductsRepository from "../repositories/IProductsRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  name: string;
  product_id: string;
  sku: string;
  image_url: string;
  customer_id: string;
  price: number;
  description: string;
  short_description: string;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    product_id,
    name,
    sku,
    image_url,
    customer_id,
    price,
    description,
    short_description,
  }: IRequest): Promise<Product> {
    const productAlreadyExists = await this.productsRepository.verifyIfSKUAlreadyExists(
      sku
    );

    if (productAlreadyExists) {
      throw new AppError("Já existe um produto cadastrado com este SKU", 400);
    }

    const product = await this.productsRepository.update({
      product_id,
      name,
      sku,
      image_url,
      customer_id,
      price,
      description,
      short_description,
    });

    if (product) {
      return product;
    } else {
      throw new AppError("Não foi possível cadastrar o produto", 400);
    }
  }
}
