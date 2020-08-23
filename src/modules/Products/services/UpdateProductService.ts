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
    const foundProduct = await this.productsRepository.findProductById(product_id);

    const verifySku = await this.productsRepository.verifyIfSKUAlreadyExists(sku);

    if (!foundProduct) {
      throw new AppError('Produto não existe no sistema', 400);
    }
    
    if (verifySku && foundProduct.customer.id !== customer_id) {
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

    return product;
  }
}
