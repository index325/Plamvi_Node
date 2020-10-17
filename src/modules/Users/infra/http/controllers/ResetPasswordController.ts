import { Request, Response } from "express";
import ResetPasswordService from "@modules/Users/services/ResetPasswordService";
import { container } from "tsyringe";

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password, verification_code } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({
      token,
      password,
      verification_code,
    });

    return response.status(204).json();
  }
}
