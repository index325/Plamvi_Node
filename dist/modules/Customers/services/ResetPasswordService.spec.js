"use strict";

var _FakeCustomersRepository = _interopRequireDefault(require("../repositories/fakes/FakeCustomersRepository"));

var _FakeCustomerTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeCustomerTokensRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let fakeMailProvider;
let fakeCustomerTokensRepository;
let fakeHashProvider;
let resetPassword;
describe("CustomerResetPasswordService", () => {
  beforeEach(() => {
    fakeCustomersRepository = new _FakeCustomersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeCustomerTokensRepository = new _FakeCustomerTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeCustomersRepository, fakeCustomerTokensRepository, fakeHashProvider);
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
    const {
      token
    } = await fakeCustomerTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");
    await resetPassword.execute({
      password: "123123",
      token
    });
    const updatedUser = await fakeCustomersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe("123123");
  });
  it("shoud not be able to reset the password with non-existing token", async () => {
    await expect(resetPassword.execute({
      token: "non-existing-token",
      password: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("shoud not be able to reset the password with non-existing user", async () => {
    const {
      token
    } = await fakeCustomerTokensRepository.generate("non-existing-user");
    await expect(resetPassword.execute({
      token,
      password: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
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
    const {
      token
    } = await fakeCustomerTokensRepository.generate(user.id);
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      password: "123123",
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});