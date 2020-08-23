import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeCustomersRepository from "@modules/Customers/repositories/fake/FakeCustomersRepository";
import FakeMailprovider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";

import ListAllAvailableCustomersService from "./ListAllAvailableCustomersService";

let fakeUsersRepository: FakeUsersRepository;
let fakeCustomersRepository: FakeCustomersRepository;

let fakeMailprovider: FakeMailprovider;
let listAllAvailableCustomers: ListAllAvailableCustomersService;

describe("ListAllAvailableCustomers", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeMailprovider = new FakeMailprovider();
    listAllAvailableCustomers = new ListAllAvailableCustomersService(
      fakeCustomersRepository,
      fakeUsersRepository
    );
  });

  it("should be able to list all Customers by city and state", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      city: "New York City",
      state: "New York",
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
