import User from "../infra/typeorm/entities/User";

export default interface IUpdateUserAvatarDTO {
    user: User;
    avatar: string;
  }
  