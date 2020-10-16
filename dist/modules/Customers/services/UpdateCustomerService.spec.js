"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCustomersRepository = _interopRequireDefault(require("../repositories/fakes/FakeCustomersRepository"));

var _UpdateCustomerService = _interopRequireDefault(require("./UpdateCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
let fakeCustomersRepository;
let updateCustomer;
describe("UpdateCustomerProfileService", () => {
  beforeEach(() => {
    fakeCustomersRepository = new _FakeCustomersRepository.default();
    updateCustomer = new _UpdateCustomerService.default(fakeCustomersRepository);
  });
  it("should be able to update an customer data", async () => {
    const customer = await fakeCustomersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      city: "NY",
      state: "NY",
      avatar: "",
      paid: false
    });
    const updatedCustomer = await updateCustomer.execute({
      name: "Walmart",
      email: "walmart@email.com",
      password: "123456",
      city: "NY",
      state: "NY",
      id: customer.id
    });
    expect(updatedCustomer === null || updatedCustomer === void 0 ? void 0 : updatedCustomer.name).toBe("Walmart");
    expect(updatedCustomer === null || updatedCustomer === void 0 ? void 0 : updatedCustomer.email).toBe("walmart@email.com");
  });
  it("should not be able to update profile from non-existing customer", async () => {
    await expect(updateCustomer.execute({
      id: "non-existing-id",
      name: "Walmart",
      email: "walmart@email.com",
      password: "123456",
      city: "NY",
      state: "NY"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to change to another customer's email", async () => {
    await fakeCustomersRepository.create({
      name: "Walmart Store 1",
      email: "walmart.store1@email.com",
      password: "123456",
      city: "NY",
      state: "NY",
      avatar: "",
      paid: false
    });
    const walmartStore2 = await fakeCustomersRepository.create({
      name: "Walmart Store 2",
      email: "walmart.store2@email.com",
      password: "123456",
      city: "NY",
      state: "NY",
      avatar: "",
      paid: false
    });
    await expect(updateCustomer.execute({
      id: walmartStore2.id,
      name: "Walmart Store 2",
      email: "walmart.store1@email.com",
      password: "123456",
      city: "NY",
      state: "NY"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});