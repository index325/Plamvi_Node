import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/Users/repositories/IUsersRepository";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import { injectable, inject } from "tsyringe";
import path from "path";
import IRandomNumberProvider from "@shared/container/providers/RandomNumberProvider/models/IRandomNumberProvider";

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("RandomNumberManualGeneration")
    private randomNumberProvider: IRandomNumberProvider,
    @inject("UserTokensRepository")
    private userTokenRepository: IUserTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário inexistente");
    }

    const recovery_code = this.randomNumberProvider.generate({
      characterQuantity: 5,
      min: 10,
      max: 99999,
    });

    const { token } = await this.userTokenRepository.generate({
      user_id: user.id,
      recovery_code,
    });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[Plamvi] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          recovery_code,
        },
      },
    });

    return token;
  }
}
