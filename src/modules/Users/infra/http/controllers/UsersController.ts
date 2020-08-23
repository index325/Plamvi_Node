import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/Users/services/CreateUserService";
import FindUserByIdService from "@modules/Users/services/FindUserByIdService";
import UpdateUserService from "@modules/Users/services/UpdateUserService";
import UpdateUserAvatarService from "@modules/Users/services/UpdateUserAvatarService";
import ListAllAvailableCustomersService from "@modules/Users/services/ListAllAvailableCustomersService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, city, state, avatar } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      city,
      state,
      avatar,
    });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password, city, state, avatar } = request.body;

    const createUser = container.resolve(UpdateUserService);

    const user = await createUser.execute({
      user_id: id,
      name,
      email,
      password,
      city,
      state,
      avatar,
    });

    delete user.password;

    return response.json(user);
  }

  public async updateAvatar(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request.params;
    const { avatar } = request.body;

    const createUser = container.resolve(UpdateUserAvatarService);

    const user = await createUser.execute({
      user_id,
      avatar,
    });

    delete user.password;

    return response.json(user);
  }

  public async findById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request.params;

    const createUser = container.resolve(FindUserByIdService);

    const user = await createUser.execute(user_id);

    delete user.password;

    return response.json(user);
  }

  public async listAllAvailableCustomers(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.user;

    const listAllAvailableCustomers = container.resolve(
      ListAllAvailableCustomersService
    );

    const customers = await listAllAvailableCustomers.execute({ id });

    return response.json(customers);
  }
}
