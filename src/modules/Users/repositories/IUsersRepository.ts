import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";
import IUpdateUserDTO from "@modules/Users/dtos/IUpdateUserDTO";
import IUpdateUserAvatarDTO from "@modules/Users/dtos/IUpdateUserAvatarDTO";

export default interface IUsersRepository {
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findIfEmailAlreadyExists(email: string, id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  updateUserAvatar({user, avatar}: IUpdateUserAvatarDTO): Promise<User>;
}
