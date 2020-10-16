"use strict";

var _FakeCustomersRepository = _interopRequireDefault(require("../repositories/fakes/FakeCustomersRepository"));

var _FakeCustomerTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeCustomerTokensRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let fakeCustomerTokensRepository;
let fakeMailprovider;
let sendForgotPasswordEmail;
describe('CustomerSendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeCustomersRepository = new _FakeCustomersRepository.default();
    fakeCustomerTokensRepository = new _FakeCustomerTokensRepository.default();
    fakeMailprovider = new _FakeMailProvider.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeCustomersRepository, fakeMailprovider, fakeCustomerTokensRepository);
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailprovider, 'sendMail');
    await fakeCustomersRepository.create({
      name: 'Walmart',
      email: 'walmart@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
      paid: false,
      avatar: ""
    });
    await sendForgotPasswordEmail.execute({
      email: 'walmart@email.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to recover a non-existing user's password", async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'walmart@email.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('Should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeCustomerTokensRepository, 'generate');
    const customer = await fakeCustomersRepository.create({
      name: 'Walmart',
      email: 'walmart@email.com',
      password: '123456',
      city: 'NY',
      state: 'NY',
      paid: false,
      avatar: ""
    });
    await sendForgotPasswordEmail.execute({
      email: 'walmart@email.com'
    });
    expect(generateToken).toHaveBeenCalledWith(customer.id);
  });
});