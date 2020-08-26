import Customer from "../infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import ICustomersRepository from "../repositories/ICustomersRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  id: string;
  name: string;
  password: string;
  email: string;
  city: string;
  state: string;
}

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({
    id,
    name,
    email,
    city,
    state,
  }: IRequest): Promise<Customer> {
    const foundCustomer = await this.customersRepository.findByEmail(email);

    if (foundCustomer && foundCustomer.id !== id) {
      throw new AppError("E-mail já cadastrado");
    }

    console.log(id)
    console.log(foundCustomer?.id)

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Estabelecimento não encontrado");
    }

    customer.name = name;
    customer.email = email;
    customer.city = city;
    customer.state = state;

    await this.customersRepository.update(customer);

    return customer;
  }
}
