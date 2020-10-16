"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeCustomersRepository = _interopRequireDefault(require("../../Customers/repositories/fakes/FakeCustomersRepository"));

var _ListAllAvailableCustomersService = _interopRequireDefault(require("./ListAllAvailableCustomersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeCustomersRepository;
let listAllAvailableCustomers;
describe("ListAllAvailableCustomers", () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCustomersRepository = new _FakeCustomersRepository.default();
    listAllAvailableCustomers = new _ListAllAvailableCustomersService.default(fakeCustomersRepository, fakeUsersRepository);
  });
  it("should be able to list all Customers by city and state", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      city: "New York City",
      state: "New York"
    });
    await fakeCustomersRepository.create({
      name: "Walmart 1",
      email: "walmart1@email.com",
      password: "123456",
      city: "New York City",
      state: "New York",
      paid: false,
      avatar: "avatar_img_1.jpg"
    });
    await fakeCustomersRepository.create({
      name: "Walmart 2",
      email: "walmart2@email.com",
      password: "123456",
      city: "New York City",
      state: "New York",
      paid: false,
      avatar: "avatar_img_2.jpg"
    });
    await fakeCustomersRepository.create({
      name: "Walmart 3",
      email: "walmart3@email.com",
      password: "123456",
      city: "Denver",
      state: "Colorado",
      paid: false,
      avatar: "avatar_img_3.jpg"
    });
    const customers = await listAllAvailableCustomers.execute({
      id: user.id
    });
    expect(customers).toHaveLength(2);
  });
});