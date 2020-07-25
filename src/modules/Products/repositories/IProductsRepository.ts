import Product from "../infra/typeorm/entities/Product";
import ICreateProductDTO from "@modules/Products/dtos/ICreateProductDTO";
import IUpdateProductDTO from "@modules/Products/dtos/IUpdateProductDTO";

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: IUpdateProductDTO): Promise<Product | undefined>;
  listAllProductsByCustomer(
    customer_id: string
  ): Promise<Product[] | undefined>;
  findProductById(product_id: string): Promise<Product | undefined>;
  verifyIfSKUAlreadyExists(sku: string): Promise<boolean>;
}
