import CustomerToken from "../infra/typeorm/entities/CustomerToken";

export default interface ICustomerTokensRepository {
  generate(user_id: string): Promise<CustomerToken>;
  findByToken(token: string): Promise<CustomerToken | undefined>;
}
