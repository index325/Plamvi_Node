"use strict";

var _FakeCustomersRepository = _interopRequireDefault(require("../repositories/fakes/FakeCustomersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateCustomerService = _interopRequireDefault(require("./CreateCustomerService"));

var _AuthenticateCustomerService = _interopRequireDefault(require("./AuthenticateCustomerService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let fakeHashProvider;
let createCustomer;
let authenticateCustomer;
describe("CreateCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new _FakeCustomersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createCustomer = new _CreateCustomerService.default(fakeCustomersRepository, fakeHashProvider);
    authenticateCustomer = new _AuthenticateCustomerService.default(fakeCustomersRepository, fakeHashProvider);
  });
  it("should be able to authenticate a customer", async () => {
    const customer = await createCustomer.execute({
      name: "test-costumer",
      email: "email@costumer.com",
      password: "123123",
      city: "Belém",
      state: "PA"
    });
    const response = await authenticateCustomer.execute({
      email: customer.email,
      password: customer.password
    });
    expect(response).toHaveProperty("token");
    expect(response.customer).toEqual(customer);
  });
  it("should not be able to authenticate user with wrong email", async () => {
    const customer = await createCustomer.execute({
      name: "test-costumer",
      email: "email@costumer.com",
      password: "123123",
      city: "Belém",
      state: "PA"
    });
    expect(authenticateCustomer.execute({
      email: "wrong@email.com",
      password: customer.password
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to authenticate user with wrong password", async () => {
    const customer = await createCustomer.execute({
      name: "test-costumer",
      email: "email@costumer.com",
      password: "123123",
      city: "Belém",
      state: "PA"
    });
    expect(authenticateCustomer.execute({
      email: customer.email,
      password: "wrong-password"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});