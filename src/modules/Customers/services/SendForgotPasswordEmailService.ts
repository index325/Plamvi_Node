import AppError from "@shared/errors/AppError";
import ICustomersRepository from "@modules/Customers/repositories/ICustomersRepository";
import ICustomerTokensRepository from "@modules/Customers/repositories/ICustomerTokensRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import { injectable, inject } from "tsyringe";
import path from "path";

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("CustomerTokensRepository")
    private customerTokenRepository: ICustomerTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError("Customer does not exists");
    }

    const { token } = await this.customerTokenRepository.generate(customer.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    await this.mailProvider.sendMail({
      to: {
        name: customer.name,
        email: customer.email,
      },
      subject: "[GoBarber] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: customer.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
