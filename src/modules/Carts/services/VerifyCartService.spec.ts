import FakeCartsRepository from "../repositories/fake/FakeCartsRepository";

import VerifyCartService from "./VerifyCartService";

let fakeCartsRespository: FakeCartsRepository;
let verifyCart: VerifyCartService;

describe("VerifyCart", () => {
  beforeEach(() => {
    fakeCartsRespository = new FakeCartsRepository();
    verifyCart = new VerifyCartService(fakeCartsRespository);
  });

  it("Should be able to find a user's cart if exists", async () => {
    const createdCart = await fakeCartsRespository.create({
      opened: true,
      user_id: "fake-id",
      customer_id: "fake-customer-id",
    });

    const foundCart = await verifyCart.execute({
      customer_id: "fake-customer-id",
      user_id: "fake-id",
    });

    expect(foundCart?.user_id).toEqual(createdCart.user_id);
  });

  it("Should be able to create a new user's cart if not exists", async () => {
    const createdCart = await verifyCart.execute({
      customer_id: "fake-customer-id",
      user_id: "fake-id",
    });

    expect(createdCart.user_id).toBe("fake-id");
  });
});
