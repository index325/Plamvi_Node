import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import IProductsRepository from "../repositories/IProductsRepository";
import { injectable, inject } from "tsyringe";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IRequest {
  name: string;
  sku: string;
  file: string;
  customer_id: string;
  price: number;
  description: string;
  short_description: string;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    name,
    sku,
    file,
    customer_id,
    price,
    description,
    short_description,
  }: IRequest): Promise<Product> {
    const productAlreadyExists = await this.productsRepository.verifyIfSKUAlreadyExistsWithoutId(
      sku
    );

    if (productAlreadyExists) {
      throw new AppError("Já existe um produto cadastrado com este SKU", 400);
    }

    const image = await this.storageProvider.saveFile(file);

    const product = await this.productsRepository.create({
      name,
      sku,
      image,
      customer_id,
      price,
      description,
      short_description,
    });

    return product;
  }
}
