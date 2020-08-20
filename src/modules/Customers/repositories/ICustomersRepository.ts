import Customer from "../infra/typeorm/entities/Customer";
import ICreateCustomerDTO from "@modules/Customers/dtos/ICreateCustomerDTO";
import IUpdateCustomerDTO from "@modules/Customers/dtos/IUpdateCustomerDTO";

export default interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  update(data: IUpdateCustomerDTO): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  findById(customer_id: string): Promise<Customer | undefined>;
}
