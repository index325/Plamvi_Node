import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import FakeMailprovider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";

import CreateUserService from "./CreateUserService";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import AppError from "@shared/errors/AppError";
import FakeManualGeneration from "@shared/container/providers/RandomNumberProvider/fakes/FakeManualGeneration";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailprovider: FakeMailprovider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeNumberGenerator: FakeManualGeneration;

describe("UserSendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailprovider = new FakeMailprovider();
    fakeNumberGenerator = new FakeManualGeneration();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailprovider,
      fakeNumberGenerator,
      fakeUserTokensRepository
    );
  });

  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailprovider, "sendMail");

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      city: "NY",
      state: "NY",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@email.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-existing user's password", async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: "johndoe@email.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      city: "NY",
      state: "NY",
    });

    await sendForgotPasswordEmail.execute({
      email: "johndoe@email.com",
    });

    expect(generateToken).toHaveBeenCalledWith({
      user_id: user.id,
      recovery_code: "12345",
    });
  });
});
