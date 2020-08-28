import { uuid } from "uuidv4";
import FakeDeliveryTypeRepository from "../repositories/fakes/FakeDeliveryTypeRepository";

import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";

import CreateDeliveryTypeService from "./CreateDeliveryTypeService";
import UpdateDeliveryTypeService from "./UpdateDeliveryTypeService";

import AppError from "@shared/errors/AppError";

let fakeDeliveryTypeRepository: FakeDeliveryTypeRepository;
let fakeHashProvider: FakeHashProvider;
let createDeliveryType: CreateDeliveryTypeService;
let updateDeliveryType: UpdateDeliveryTypeService;

describe("UpdateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new FakeDeliveryTypeRepository();
    fakeHashProvider = new FakeHashProvider();
    createDeliveryType = new CreateDeliveryTypeService(
      fakeDeliveryTypeRepository
    );
    updateDeliveryType = new UpdateDeliveryTypeService(
      fakeDeliveryTypeRepository
    );
  });
  it("should be able to update a delivery type", async () => {
    const customer_id = uuid();
    const deliveryType = await createDeliveryType.execute({
      description: "description-delivery",
      customer_id,
    });

    const updatedDeliveryType = await updateDeliveryType.execute({
      id: deliveryType.id,
      description: "new-description-test",
      customer_id,
    });

    expect(updatedDeliveryType.description).toBe("new-description-test");
  });

  it("should not be able to update a delivery type to another one that have the same name and customer", async () => {
    const customer_id = uuid();

    await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id,
    });

    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id,
    });

    await expect(
      updateDeliveryType.execute({
        id: deliveryType2.id,
        description: "description-delivery-1",
        customer_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a non existing delivery type", async () => {
    await expect(
      updateDeliveryType.execute({
        id: "non-existing-id",
        description: "description-delivery-1",
        customer_id: uuid(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to update a delivery type that pertences to another customer", async () => {
    const deliveryType1 = await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id: uuid(),
    });

    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id: uuid(),
    });

    await expect(
      updateDeliveryType.execute({
        id: deliveryType1.id,
        description: "description-delivery-3",
        customer_id: deliveryType2.customer_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
