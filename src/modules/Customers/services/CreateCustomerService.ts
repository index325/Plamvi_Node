import Customer from "../infra/typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";
import ICustomersRepository from "../repositories/ICustomersRepository";
import { injectable, inject } from "tsyringe";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";

interface IRequest {
  name: string;
  password: string;
  email: string;
  city: string;
  state: string;
}

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    city,
    state,
  }: IRequest): Promise<Customer> {
    const checkUserExists = await this.customersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail já cadastrado");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const customer = await this.customersRepository.create({
      name,
      email,
      password: hashedPassword,
      city,
      state,
      avatar: "",
      paid: false,
    });

    return customer;
  }
}
