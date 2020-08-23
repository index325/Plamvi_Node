import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  user_id: string;
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
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    name,
    email,
    city,
    state,
  }: IRequest): Promise<User> {
    const foundUser = await this.usersRepository.findByEmail(
      email,
    );

    if (foundUser && foundUser.id !== user_id) {
      throw new AppError("E-mail já cadastrado");
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    user.name = name;
    user.email = email;
    user.city = city;
    user.state = state;

    await this.usersRepository.update(user);

    return user;
  }
}
