import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateCustomerService from "@modules/Customers/services/CreateCustomerService";
import UpdateCustomerService from "@modules/Customers/services/UpdateCustomerService";
import ListMyProductsService from "@modules/Customers/services/ListMyProductsService";

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, city, state } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
      password,
      city,
      state,
    });

    return response.json(classToClass(customer));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.customer;
    const { name, email, password, city, state } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
      password,
      city,
      state,
    });

    return response.json(classToClass(customer));
  }

  public async listMyProducts(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.customer;

    const listProducts = container.resolve(ListMyProductsService);

    const products = await listProducts.execute(id);

    return response.json(classToClass(products));
  }
}
