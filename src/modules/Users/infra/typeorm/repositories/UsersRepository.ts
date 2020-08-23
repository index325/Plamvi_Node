import { getRepository, Repository, Not } from "typeorm";

import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/Users/dtos/ICreateUserDTO";
import IUpdateUserDTO from "@modules/Users/dtos/IUpdateUserDTO";
import IUpdateUserAvatarDTO from "@modules/Users/dtos/IUpdateUserAvatarDTO";
import User from "../entities/User";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findIfEmailAlreadyExists(
    email: string,
    id: string
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email, id: Not(id) },
    });

    return user;
  }

  public async update(userData: IUpdateUserDTO): Promise<User> {
    return this.ormRepository.save(userData);
  }

  public async updateUserAvatar({
    user,
    avatar,
  }: IUpdateUserAvatarDTO): Promise<User> {
    user.avatar = avatar;

    await this.ormRepository.save(user);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
