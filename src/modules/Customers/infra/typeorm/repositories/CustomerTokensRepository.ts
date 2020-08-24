import { getRepository, Repository } from "typeorm";

import ICustomerTokensRepository from "@modules/Customers/repositories/ICustomerTokensRepository";
import CustomerToken from "../entities/CustomerToken";

class CustomerTokensRepository implements ICustomerTokensRepository {
  private ormRepository: Repository<CustomerToken>;

  constructor() {
    this.ormRepository = getRepository(CustomerToken);
  }
  public async generate(customer_id: string): Promise<CustomerToken> {
    const customerToken = this.ormRepository.create({ customer_id });

    await this.ormRepository.save(customerToken);

    return customerToken;
  }
  public async findByToken(token: string): Promise<CustomerToken | undefined> {
    const customerToken = await this.ormRepository.findOne({
      where: { token },
    });
    return customerToken;
  }
}

export default CustomerTokensRepository;
