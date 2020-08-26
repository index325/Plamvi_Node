import { uuid } from "uuidv4";
import FakeDeliveryTypeRepository from "../repositories/fakes/FakeDeliveryTypeRepository";

import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";

import CreateDeliveryTypeService from "./CreateDeliveryTypeService";
import ListAllDeliveryTypesByCustomer from "./ListAllDeliveryTypesByCustomerService";

import AppError from "@shared/errors/AppError";

let fakeDeliveryTypeRepository: FakeDeliveryTypeRepository;
let fakeHashProvider: FakeHashProvider;
let createDeliveryType: CreateDeliveryTypeService;
let listAllDeliveryTypesByCustomer: ListAllDeliveryTypesByCustomer;

describe("UpdateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new FakeDeliveryTypeRepository();
    fakeHashProvider = new FakeHashProvider();
    createDeliveryType = new CreateDeliveryTypeService(
      fakeDeliveryTypeRepository
    );
    listAllDeliveryTypesByCustomer = new ListAllDeliveryTypesByCustomer(
      fakeDeliveryTypeRepository
    );
  });
  it("should be able to list all delivery types by customer id", async () => {
    const customer_id = uuid();

    const deliveryType1 = await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id,
    });

    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id,
    });

    const deliveryTypes = await listAllDeliveryTypesByCustomer.execute({
      customer_id,
    });

    expect(deliveryTypes).toEqual([deliveryType1, deliveryType2]);
  });
});
