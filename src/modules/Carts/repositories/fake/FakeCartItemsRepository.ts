import ICartItemsRepository from "@modules/Carts/repositories/ICartItemsRepository";
import ICreateCartItemsDTO from "@modules/Carts/dtos/ICreateCartItemsDTO";

import IDeleteCartItemsDTO from "@modules/Carts/dtos/IDeleteCartItemsDTO";
import IVerifyIfProductAlreadyExistsOnCartItemsDTO from "@modules/Carts/dtos/IVerifyIfProductAlreadyExistsOnCartItemsDTO";
import IIncrementProductQuantityDTO from "@modules/Carts/dtos/IIncrementProductQuantityDTO";

import CartItem from "../../infra/typeorm/entities/CartItem";

class FakeCartItemsRepository implements ICartItemsRepository {
  private cartItems: CartItem[] = [];
  
  public async findById(cart_item_id: string): Promise<CartItem | undefined> {
    const foundCartItem = this.cartItems.find(item => item.id === cart_item_id);

    return foundCartItem;
  }
  public async create({
    cart_id,
    product_id,
    quantity
  }: ICreateCartItemsDTO): Promise<CartItem> {
    const cartItem = new CartItem();

    cartItem.id = 'fake-id';
    cartItem.cart_id = cart_id;
    cartItem.product_id = product_id;
    cartItem.quantity = quantity;

    this.cartItems.push(cartItem);

    return cartItem;
  }

  public async delete({ cart_item_id }: IDeleteCartItemsDTO): Promise<void> {
    const selectedCartItem = this.cartItems.findIndex(item => (
      item.id === cart_item_id
    ));

    this.cartItems.splice(selectedCartItem, 1);
  }

  public async verifyIfProductAlreadyExistsOnCartItems({
    product_id,
    cart_id,
  }: IVerifyIfProductAlreadyExistsOnCartItemsDTO): Promise<
    CartItem | undefined
  > {
    const foundProduct = this.cartItems.find(item => (
      (item.cart_id === cart_id) &&
      (item.product_id === product_id)
    ));

    return foundProduct;
  }

  public async incrementProductQuantity({
    quantity,
    cart_item_id,
  }: IIncrementProductQuantityDTO): Promise<void> {
    const newCartItems = this.cartItems.map(item => {
      if (item.id === cart_item_id) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        }
      }

      return item;
    });

    this.cartItems = newCartItems;
  }
}

export default FakeCartItemsRepository;
