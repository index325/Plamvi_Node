import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import ResetPasswordService from "./ResetPasswordService";
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe("UserResetPasswordService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });
  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      city: "San Francisco",
      state: "CA",
    });

    const { token } = await fakeUserTokensRepository.generate({
      user_id: user.id,
      recovery_code: "12345",
    });

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPassword.execute({
      verification_code: '12345',
      password: "123123",
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });
  it("shoud not be able to reset the password with non-existing token", async () => {
    await expect(
      resetPassword.execute({
        verification_code: '12345',
        token: "non-existing-token",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("shoud not be able to reset the password with non-existing user", async () => {
    const { token } = await fakeUserTokensRepository.generate({
      user_id: "non-existing-user",
      recovery_code: "12345",
    });

    await expect(
      resetPassword.execute({
        verification_code: '12345',
        token,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("shoud not be able to reset the password if passed more than 10 minutes", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      city: "San Francisco",
      state: "CA",
    });

    const { token } = await fakeUserTokensRepository.generate({
      user_id: user.id,
      recovery_code: "12345",
    });

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setMinutes(customDate.getMinutes() + 20);
    });

    await expect(
      resetPassword.execute({
        verification_code: '12345',
        password: "123123",
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
