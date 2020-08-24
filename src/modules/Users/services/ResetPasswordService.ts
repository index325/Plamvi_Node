import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { differenceInHours } from "date-fns";
import { injectable, inject } from "tsyringe";

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exists");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError("Token expired");
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
