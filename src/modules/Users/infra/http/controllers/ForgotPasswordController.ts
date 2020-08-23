import { Request, Response } from "express";
import SendForgotPasswordEmailService from "@modules/Users/services/SendForgotPasswordEmailService";
import { container } from "tsyringe";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
