import { uuid } from "uuidv4";
import FakeDeliveryTypeRepository from "../repositories/fakes/FakeDeliveryTypeRepository";

import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";

import CreateDeliveryTypeService from "./CreateDeliveryTypeService";
import DeleteDeliveryTypeService from "./DeleteDeliveryTypeService";

import AppError from "@shared/errors/AppError";

let fakeDeliveryTypeRepository: FakeDeliveryTypeRepository;
let fakeHashProvider: FakeHashProvider;
let createDeliveryType: CreateDeliveryTypeService;
let deleteDeliveryType: DeleteDeliveryTypeService;

describe("UpdateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new FakeDeliveryTypeRepository();
    fakeHashProvider = new FakeHashProvider();
    createDeliveryType = new CreateDeliveryTypeService(
      fakeDeliveryTypeRepository
    );
    deleteDeliveryType = new DeleteDeliveryTypeService(
      fakeDeliveryTypeRepository
    );
  });
  it("should be able to delete a delivery type", async () => {
    const customer_id = uuid();
    const deliveryType = await createDeliveryType.execute({
      description: "description-delivery",
      customer_id,
    });

    await deleteDeliveryType.execute({
      customer_id,
      id: deliveryType.id,
    });

    expect(fakeDeliveryTypeRepository.deliveryTypes).toHaveLength(0);
  });

  it("should not be able to delete a non existing delivery type", async () => {
    await expect(
      deleteDeliveryType.execute({
        id: "non-existing-id",
        customer_id: uuid(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to delete a delivery type that pertences to another customer", async () => {
    const deliveryType1 = await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id: uuid(),
    });

    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id: uuid(),
    });

    await expect(
      deleteDeliveryType.execute({
        id: deliveryType1.id,
        customer_id: deliveryType2.customer_id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
