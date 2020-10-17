import { Request, Response } from "express";
import SendForgotPasswordEmailService from "@modules/Users/services/SendForgotPasswordEmailService";
import { container } from "tsyringe";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService
    );

    const token = await sendForgotPasswordEmail.execute({
      email,
    });

    return response.json({ token });
  }
}
