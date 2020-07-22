import Cart from '../infra/typeorm/entities/Cart'
import User from '@modules/Users/infra/typeorm/entities/User'
import ICreateCartDTO from '@modules/Carts/dtos/ICreateCartDTO'

export default interface ICartsRepository{
    findOpenedCartByUser(user: User): Promise<Cart | undefined>;
    create(data: ICreateCartDTO): Promise<Cart>;
}