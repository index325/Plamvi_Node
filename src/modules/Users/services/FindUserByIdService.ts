import AppError from "@shared/errors/AppError";
import IUserRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import User from "@modules/Users/infra/typeorm/entities/User";

@injectable()
export default class FindUserByIdService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  public async execute(user_id: string): Promise<User | undefined> {
    try {
      const user = this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError("Usuário não encontrado", 400);
      }

      return user;
    } catch (error) {
      throw new AppError("Um erro ocorreu ao procurar o usuário", 400);
    }
  }
}
