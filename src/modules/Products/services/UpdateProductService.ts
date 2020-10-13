import Product from "../infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import IProductsRepository from "../repositories/IProductsRepository";
import { injectable, inject } from "tsyringe";
import { id } from "date-fns/esm/locale";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IRequest {
  name: string;
  product_id: string;
  sku: string;
  file: string;
  customer_id: string;
  price: number;
  description: string;
  short_description: string;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    product_id,
    name,
    sku,
    file,
    customer_id,
    price,
    description,
    short_description,
  }: IRequest): Promise<Product> {
    const foundProduct = await this.productsRepository.findProductById(
      product_id
    );

    const verifySku = await this.productsRepository.verifyIfSKUAlreadyExists({
      sku,
      id: product_id,
    });

    if (!foundProduct) {
      throw new AppError("Produto não existe no sistema", 400);
    }

    if (verifySku && foundProduct.customer.id === customer_id) {
      throw new AppError("Já existe um produto cadastrado com este SKU", 400);
    }

    const image = await this.storageProvider.saveFile(file);

    const product = await this.productsRepository.update(
      {
        name,
        sku,
        image,
        customer_id,
        price,
        description,
        short_description,
      },
      product_id
    );

    return product;
  }
}
