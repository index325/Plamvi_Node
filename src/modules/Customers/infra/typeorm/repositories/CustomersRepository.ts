import { getRepository, Repository } from "typeorm";

import ICustomersRepository from "@modules/Customers/repositories/ICustomersRepository";
import Customer from "../entities/Customer";
import ICreateCustomerDTO from "@modules/Customers/dtos/ICreateCustomerDTO";
import IUpdateCustomerDTO from "@modules/Customers/dtos/IUpdateCustomerDTO";

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create(data);

    await this.ormRepository.save(customer);

    return customer;
  }
  public async update(data: IUpdateCustomerDTO): Promise<Customer | undefined> {
    await this.ormRepository.update({ id: data.id }, data);

    const customer = await this.ormRepository.findOne(data.id);

    return customer;
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne({
      where: { email },
    });
  }
  public async findById(customer_id: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne(customer_id);
  }

  public async listAllAvailableCustomersByCityAndState(
    city: string,
    state: string
  ): Promise<Customer[] | undefined> {
    return await this.ormRepository.find({
      where: { city, state },
    });
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }
}

export default CustomersRepository;
