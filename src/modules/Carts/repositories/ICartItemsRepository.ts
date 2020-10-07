import CartItem from "../infra/typeorm/entities/CartItem";
import ICreateCartItemsDTO from "@modules/Carts/dtos/ICreateCartItemsDTO";
import IDeleteCartItemsDTO from "@modules/Carts/dtos/IDeleteCartItemsDTO";
import IVerifyIfProductAlreadyExistsOnCartItemsDTO from "@modules/Carts/dtos/IVerifyIfProductAlreadyExistsOnCartItemsDTO";
import IIncrementProductQuantityDTO from "@modules/Carts/dtos/IIncrementProductQuantityDTO";
import IUpdateProductQuantityDTO from "../dtos/IUpdateProductQuantityDTO";

export default interface ICartsRepository {
  create(data: ICreateCartItemsDTO): Promise<CartItem>;
  delete({ cart_item_id }: IDeleteCartItemsDTO): Promise<void>;
  findById(cart_item_id: string): Promise<CartItem | undefined>;
  verifyIfProductAlreadyExistsOnCartItems({
    product_id,
    cart_id,
  }: IVerifyIfProductAlreadyExistsOnCartItemsDTO): Promise<
    CartItem | undefined
  >;
  incrementProductQuantity({
    cart_item_id,
    quantity,
  }: IIncrementProductQuantityDTO): Promise<void>;
  updateProductQuantity({
    cart_item_id,
    quantity,
  }: IUpdateProductQuantityDTO): Promise<void>;
}
