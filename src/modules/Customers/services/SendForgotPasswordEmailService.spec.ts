import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import FakeCustomerTokensRepository from '../repositories/fakes/FakeCustomerTokensRepository';
import FakeMailprovider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import CreateCustomerService from './CreateCustomerService';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let fakeCustomerTokensRepository: FakeCustomerTokensRepository;
let fakeMailprovider: FakeMailprovider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('CustomerSendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeCustomerTokensRepository = new FakeCustomerTokensRepository();
    fakeMailprovider = new FakeMailprovider();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeCustomersRepository,
      fakeMailprovider,
      fakeCustomerTokensRepository,
    );

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
      email: 'walmart@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-existing user's password", async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'walmart@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
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
      email: 'walmart@email.com',
    });

    expect(generateToken).toHaveBeenCalledWith(customer.id);
  });
})