export default interface IUpdateCustomerDTO {
  customer_id: string;
  avatar: string;
  name: string;
  password: string;
  email: string;
  paid: boolean;
  city: string;
  state: string;
}
