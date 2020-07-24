import Cart from '../infra/typeorm/entities/Cart'
import ICreateCartDTO from '@modules/Carts/dtos/ICreateCartDTO'

export default interface ICartsRepository{
    findOpenedCartByUser(user_id: string): Promise<Cart | undefined>;
    findClosedCartByUser(user_id: string): Promise<Cart | undefined>;
    create(data: ICreateCartDTO): Promise<Cart>;
    closeCart(cart_id: string): Promise<void>
}