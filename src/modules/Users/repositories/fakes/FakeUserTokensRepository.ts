import IUserTokenRepository from "@modules/Users/repositories/IUserTokenRepository";
import UserToken from "../../infra/typeorm/entities/UserToken";

class FakeUsersRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.user_id = user_id;

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.userTokens.find(item => item.user_id === token);

    return user;
  }
}

export default FakeUsersRepository;
