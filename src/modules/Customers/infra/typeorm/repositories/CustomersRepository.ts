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
    await this.ormRepository.update({ id: data.customer_id }, data);

    const customer = await this.ormRepository.findOne(data.customer_id);

    return customer;
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }
  public async findById(customer_id: string): Promise<Customer | undefined> {
    return this.ormRepository.findOne(customer_id);
  }
}

export default CustomersRepository;
