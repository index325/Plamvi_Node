import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokenRepository from "../repositories/IUserTokenRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { differenceInHours, differenceInMinutes } from "date-fns";
import { injectable, inject } from "tsyringe";

interface IRequest {
  password: string;
  token: string;
  verification_code: string;
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

  public async execute({
    token,
    password,
    verification_code,
  }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByTokenAndCode({
      token,
      verification_code,
    });

    if (!userToken) {
      throw new AppError("Código de verificação inválido");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("Usuário inexistente");
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInMinutes(Date.now(), tokenCreatedAt) > 10) {
      throw new AppError("Token expirado");
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
