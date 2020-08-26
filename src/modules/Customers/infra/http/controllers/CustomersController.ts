import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCustomerService from "@modules/Customers/services/CreateCustomerService";
import UpdateCustomerService from "@modules/Customers/services/UpdateCustomerService";

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

    delete customer.password;

    return response.json(customer);
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

    delete customer.password;

    return response.json(customer);
  }
}
