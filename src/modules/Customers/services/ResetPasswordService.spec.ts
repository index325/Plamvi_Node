import FakeCustomersRepository from "../repositories/fakes/FakeCustomersRepository";
import FakeCustomerTokensRepository from "../repositories/fakes/FakeCustomerTokensRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import ResetPasswordService from "./ResetPasswordService";
import AppError from "@shared/errors/AppError";

let fakeCustomersRepository: FakeCustomersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeCustomerTokensRepository: FakeCustomerTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe("CustomerResetPasswordService", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeCustomerTokensRepository = new FakeCustomerTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeCustomersRepository,
      fakeCustomerTokensRepository,
      fakeHashProvider
    );
  });
  it("should be able to reset the password", async () => {
    const user = await fakeCustomersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      city: "San Francisco",
      state: "CA",
      paid: false,
      avatar: ""
    });

    const { token } = await fakeCustomerTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPassword.execute({
      password: "123123",
      token,
    });

    const updatedUser = await fakeCustomersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });
  it("shoud not be able to reset the password with non-existing token", async () => {
    await expect(
      resetPassword.execute({
        token: "non-existing-token",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("shoud not be able to reset the password with non-existing user", async () => {
    const { token } = await fakeCustomerTokensRepository.generate(
      "non-existing-user"
    );

    await expect(
      resetPassword.execute({
        token,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("shoud not be able to reset the password if passed more than 2 hours", async () => {
    const user = await fakeCustomersRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      city: "San Francisco",
      state: "CA",
      paid: false,
      avatar: ""
    });

    const { token } = await fakeCustomerTokensRepository.generate(user.id);

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: "123123",
        token,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
