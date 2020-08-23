import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IRequest {
  avatar: string;
  user_id: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ avatar, user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    const urlAvatar = await this.storageProvider.saveFile(avatar);

    if (!user) {
      throw new AppError("Usuário não localizado");
    }

    const userUpdated = await this.usersRepository.updateUserAvatar({
      user,
      avatar: urlAvatar,
    });

    return userUpdated;
  }
}
