import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  avatar: string;
  name: string;
  password: string;
  email: string;
  city: string;
  state: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    city,
    state,
    avatar,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail já cadastrado");
    }

    const user = await this.usersRepository.update({
      name,
      email,
      city,
      state,
      avatar,
    });

    return user;
  }
}
