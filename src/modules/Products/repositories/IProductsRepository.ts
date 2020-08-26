import Product from "../infra/typeorm/entities/Product";
import ICreateProductDTO from "@modules/Products/dtos/ICreateProductDTO";
import IUpdateProductDTO from "@modules/Products/dtos/IUpdateProductDTO";
import IVerifyIfSKUAlreadyExistsDTO from "@modules/Products/dtos/IVerifyIfSKUAlreadyExistsDTO";

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: IUpdateProductDTO, product_id: string): Promise<Product>;
  listAllProductsByCustomer(
    customer_id: string
  ): Promise<Product[]>;
  findProductById(product_id: string): Promise<Product | undefined>;
  verifyIfSKUAlreadyExists(data: IVerifyIfSKUAlreadyExistsDTO): Promise<boolean>;
  verifyIfSKUAlreadyExistsWithoutId(sku: string): Promise<boolean>;
}
