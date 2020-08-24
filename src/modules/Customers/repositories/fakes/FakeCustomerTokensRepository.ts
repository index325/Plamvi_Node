import ICustomerTokensRepository from "@modules/Customers/repositories/ICustomerTokensRepository";
import CustomerToken from "../../infra/typeorm/entities/CustomerToken";

class FakeCustomerTokensRepository implements ICustomerTokensRepository {
  private customerTokens: CustomerToken[] = [];

  public async generate(customer_id: string): Promise<CustomerToken> {
    const customerToken = new CustomerToken();

    customerToken.customer_id = customer_id;
    customerToken.token = 'generated-token';
    customerToken.created_at = new Date();

    this.customerTokens.push(customerToken);

    return customerToken;
  }

  public async findByToken(token: string): Promise<CustomerToken | undefined> {
    const customer = this.customerTokens.find(item => item.token === token);

    return customer;
  }
}

export default FakeCustomerTokensRepository;
