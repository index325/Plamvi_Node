import ICustomersRepository from "@modules/Customers/repositories/ICustomersRepository";
import ICreateCustomerDTO from "@modules/Customers/dtos/ICreateCustomerDTO";
import IUpdateCustomerDTO from "@modules/Customers/dtos/IUpdateCustomerDTO";

import Customer from "../../infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

class CustomersRepository implements ICustomersRepository {
  public async create({
      name,
      email,
      password,
      avatar,
      city,
      state,
      paid
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer =  new Customer();

    customer.id = 'fake-id';
    customer.name = name;
    customer.email = email;
    customer.password = password;
    customer.avatar = avatar;
    customer.city = city;
    customer.state = state;
    customer.paid = paid;

    return customer;
  }
  public async update(data: IUpdateCustomerDTO): Promise<Customer | undefined> {
    return new Customer();
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    return new Customer();
  }
  public async findById(customer_id: number): Promise<Customer | undefined> {
    return new Customer();
  }
}

export default CustomersRepository;