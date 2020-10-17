import IFindByTokenAndCodeDTO from "@modules/Users/dtos/IFindByTokenAndCodeDTO";
import IGenerateUserTokenDTO from "@modules/Users/dtos/IGenerateUserTokenDTO";
import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import UserToken from "../../infra/typeorm/entities/UserToken";

class FakeUsersRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate({
    user_id,
    recovery_code,
  }: IGenerateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.user_id = user_id;
    userToken.token = "generated-token";
    userToken.created_at = new Date();
    userToken.recovery_code = recovery_code;

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.userTokens.find((item) => item.token === token);

    return user;
  }

  public async findByTokenAndCode({ token, verification_code }: IFindByTokenAndCodeDTO): Promise<UserToken | undefined> {
    const user = this.userTokens.find((item) => item.token === token && item.recovery_code === verification_code);

    return user;
  }
}

export default FakeUsersRepository;
