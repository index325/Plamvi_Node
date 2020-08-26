import { uuid } from "uuidv4";
import FakeDeliveryTypeRepository from "../repositories/fakes/FakeDeliveryTypeRepository";

import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";

import CreateDeliveryTypeService from "./CreateDeliveryTypeService";

import AppError from "@shared/errors/AppError";

let fakeDeliveryTypeRepository: FakeDeliveryTypeRepository;
let fakeHashProvider: FakeHashProvider;
let createDeliveryType: CreateDeliveryTypeService;

describe("CreateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new FakeDeliveryTypeRepository();
    fakeHashProvider = new FakeHashProvider();
    createDeliveryType = new CreateDeliveryTypeService(
      fakeDeliveryTypeRepository
    );
  });
  it("should be able to create a new delivery type", async () => {
    const deliveryType = await createDeliveryType.execute({
      description: "description-delivery",
      customer_id: uuid(),
    });

    expect(deliveryType.description).toBe("description-delivery");
  });

  it("should not be able to create a already existing delivery type", async () => {

    const customer_id = uuid()

    await createDeliveryType.execute({
      description: "description-delivery",
      customer_id,
    });

    await expect(
      createDeliveryType.execute({
        description: "description-delivery",
        customer_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
