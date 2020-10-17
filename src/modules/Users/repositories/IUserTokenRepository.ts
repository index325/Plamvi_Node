import IFindByTokenAndCodeDTO from "../dtos/IFindByTokenAndCodeDTO";
import IGenerateUserTokenDTO from "../dtos/IGenerateUserTokenDTO";
import UserToken from "../infra/typeorm/entities/UserToken";

export default interface IUserTokenRepository {
  generate(data: IGenerateUserTokenDTO): Promise<UserToken>;
  findByTokenAndCode({token, verification_code}: IFindByTokenAndCodeDTO): Promise<UserToken | undefined>;
}
