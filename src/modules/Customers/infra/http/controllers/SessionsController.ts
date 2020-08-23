import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateCustomerService from "@modules/Customers/services/AuthenticateCustomerService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateCustomer = container.resolve(AuthenticateCustomerService);

    const { customer, token } = await authenticateCustomer.execute({
      email,
      password,
    });

    delete customer.password;

    return response.json({ customer, token });
  }
}
