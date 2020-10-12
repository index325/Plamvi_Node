export default interface ICreateProductDTO {
  name: string;
  customer_id: string;
  image: string;
  price: number;
  description: string;
  short_description: string;
  sku: string;
}
