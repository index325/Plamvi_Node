import AppError from "@shared/errors/AppError";
import ICustomersRepository from "../repositories/ICustomersRepository";
import ICustomerTokensRepository from "../repositories/ICustomerTokensRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { differenceInHours } from "date-fns";
import { injectable, inject } from "tsyringe";

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private customersRepository: ICustomersRepository,
    @inject("UserTokensRepository")
    private customerTokenRepository: ICustomerTokensRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const customerToken = await this.customerTokenRepository.findByToken(token);

    if (!customerToken) {
      throw new AppError("Customer token does not exists");
    }

    const customer = await this.customersRepository.findById(customerToken.customer_id);

    if (!customer) {
      throw new AppError("Customer does not exists");
    }

    const tokenCreatedAt = customerToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError("Token expired");
    }

    customer.password = await this.hashProvider.generateHash(password);

    await this.customersRepository.save(customer);
  }
}
