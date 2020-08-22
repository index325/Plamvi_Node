import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";
import IUpdateUserDTO from "@modules/Users/dtos/IUpdateUserDTO";
import IUpdateUserAvatarDTO from "@modules/Users/dtos/IUpdateUserAvatarDTO";
import User from "../../infra/typeorm/entities/User";

import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(item => item.id === user_id);

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(item => item.email === email);

    return user;
  }

  public async findIfEmailAlreadyExists(
    email: string,
    id: string
  ): Promise<User | undefined> {
    return new User();
  }

  public async update({
    city,
    email,
    name,
    state,
    avatar
  }: IUpdateUserDTO): Promise<User> {
    const selectedUserIndex = this.users.findIndex(item => item.email === email);

    const selectedUser = this.users[selectedUserIndex];

    this.users[selectedUserIndex] = {
      ...selectedUser,
      city,
      name,
      state,
    }

    if (avatar) {
      this.users[selectedUserIndex].avatar = avatar;
    }

    return this.users[selectedUserIndex];
  }

  public async updateUserAvatar({
    user,
    avatar,
  }: IUpdateUserAvatarDTO): Promise<User> {
    user.avatar = avatar;

    const updatedUserList = this.users.map(item => {
      if (item.email === user.email) {
        return {
          ...item,
          avatar: user.avatar,
        }
      }

      return item;
    });

    this.users = updatedUserList;

    return user;
  }

  public async create({
    email,
    name,
    password,
    state,
    avatar,
    city
  }: ICreateUserDTO): Promise<User> {
    const user: User = {
      id: uuid(),
      email,
      name,
      password,
      state,
      city,
      avatar: '',
      created_at: new Date(),
      updated_at: new Date(),
    };

    if (avatar) {
      user.avatar = avatar;
    }

    this.users.push(user);

    return user;
  }
}

export default UsersRepository;
