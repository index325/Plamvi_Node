import Customer from "../infra/typeorm/entities/Customer";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import ICustomersRepository from "../repositories/ICustomersRepository";
import { injectable, inject } from "tsyringe";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  customer: Customer;
  token: string;
}

@injectable()
class AutenticateCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError("Senha ou e-mail incorretos", 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      customer.password
    );

    if (!passwordMatched) {
      throw new AppError("Senha ou e-mail incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: customer.id,
      expiresIn,
    });

    return { customer, token };
  }
}
export default AutenticateCustomerService;
