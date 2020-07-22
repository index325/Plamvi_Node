import User from '@modules/Users/infra/typeorm/entities/User'

export default interface ICreateCartDTO{
    opened: boolean;
    user: User;
}