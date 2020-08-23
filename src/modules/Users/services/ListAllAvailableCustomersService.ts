import Customer from "@modules/Customers/infra/typeorm/entities/Customer";
import User from "@modules/Users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import ICustomersRepository from "@modules/Customers/repositories/ICustomersRepository";
import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
export default class ListAllAvailableCustomersService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Customer[] | undefined> {
    const { city, state } = (await this.usersRepository.findById(id)) as User;

    return await this.customersRepository.listAllAvailableCustomersByCityAndState(
      city,
      state
    );
  }
}
