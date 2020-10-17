import { getRepository, Repository } from "typeorm";

import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import UserToken from "../entities/UserToken";
import IGenerateUserTokenDTO from "@modules/Users/dtos/IGenerateUserTokenDTO";
import IFindByTokenAndCodeDTO from "@modules/Users/dtos/IFindByTokenAndCodeDTO";

class UserTokensRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate({
    user_id,
    recovery_code,
  }: IGenerateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id, recovery_code });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByTokenAndCode({
    token,
    verification_code,
  }: IFindByTokenAndCodeDTO): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token, recovery_code: verification_code },
    });
    return userToken;
  }
}

export default UserTokensRepository;
