import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateProductService from "@modules/Products/services/CreateProductService";
import ListProductsByCustomerService from "@modules/Products/services/ListProductsByCustomerService";
import ProductDetailService from "@modules/Products/services/ProductDetailService";
import UpdateProductService from "@modules/Products/services/UpdateProductService";

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      sku,
      image_url,
      customer_id,
      price,
      description,
      short_description,
    } = request.body;

    const createProducts = container.resolve(CreateProductService);

    const product = await createProducts.execute({
      name,
      sku,
      image_url,
      customer_id,
      price,
      description,
      short_description,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      product_id,
      name,
      sku,
      image_url,
      customer_id,
      price,
      description,
      short_description,
    } = request.body;

    const productUpdate = container.resolve(UpdateProductService);

    const product = await productUpdate.execute({
      product_id,
      name,
      sku,
      image_url,
      customer_id,
      price,
      description,
      short_description,
    });

    return response.json(product);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const productDetail = container.resolve(ProductDetailService);

    const product = await productDetail.execute(product_id);

    return response.json(product);
  }

  public async listByCustomerId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { customer_id } = request.params;

    const listProducts = container.resolve(ListProductsByCustomerService);

    const products = await listProducts.execute(customer_id);

    return response.json(products);
  }
}