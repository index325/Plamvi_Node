import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCustomerService from "@modules/Customers/services/CreateCustomerService";

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, city, state, avatar } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
      password,
      city,
      state,
      avatar,
    });

    delete customer.password;

    return response.json(customer);
  }
}
