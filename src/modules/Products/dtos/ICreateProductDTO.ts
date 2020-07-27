export default interface ICreateProductDTO {
  name: string;
  customer_id: string;
  image_url: string;
  price: number;
  description: string;
  short_description: string;
  sku: string;
}
