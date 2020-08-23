export default interface ICreateProductDTO {
  product_id: string;
  name: string;
  customer_id: string;
  image_url: string;
  price: number;
  description: string;
  short_description: string;
  sku: string;
}
