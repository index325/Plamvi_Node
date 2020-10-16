"use strict";

var _FakeCustomersRepository = _interopRequireDefault(require("../repositories/fakes/FakeCustomersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateCustomerService = _interopRequireDefault(require("./CreateCustomerService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCustomersRepository;
let fakeHashProvider;
let createCustomer;
describe("CreateCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new _FakeCustomersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createCustomer = new _CreateCustomerService.default(fakeCustomersRepository, fakeHashProvider);
  });
  it("should be able to create a new customer", async () => {
    const customer = await createCustomer.execute({
      name: "test-costumer",
      email: "email@costumer.com",
      password: "123123",
      city: "Belém",
      state: "PA"
    });
    expect(customer.name).toBe("test-costumer");
    expect(customer.email).toBe("email@costumer.com");
  });
  it("should not be able to create two customers with the same email", async () => {
    await createCustomer.execute({
      name: "test-costumer",
      email: "email@costumer.com",
      password: "123123",
      city: "Belém",
      state: "PA"
    });
    await expect(createCustomer.execute({
      name: "test-costumer-2",
      email: "email@costumer.com",
      password: "123123",
      city: "Belém",
      state: "PA"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});