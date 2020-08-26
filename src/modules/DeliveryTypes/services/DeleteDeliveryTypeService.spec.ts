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
});
