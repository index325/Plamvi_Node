import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";

interface IRequest {
  oldPassword: string;
  newPassword: string;
  user_id: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ oldPassword, newPassword, user_id }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const passwordMatched = await this.hashProvider.compareHash(
      oldPassword,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError("A senha atual está incorreta");
    }

    user.password = await this.hashProvider.generateHash(newPassword);

    await this.usersRepository.update(user);

    return user;
  }
}
