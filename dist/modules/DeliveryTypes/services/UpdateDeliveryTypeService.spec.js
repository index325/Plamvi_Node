"use strict";

var _uuidv = require("uuidv4");

var _FakeDeliveryTypeRepository = _interopRequireDefault(require("../repositories/fakes/FakeDeliveryTypeRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateDeliveryTypeService = _interopRequireDefault(require("./CreateDeliveryTypeService"));

var _UpdateDeliveryTypeService = _interopRequireDefault(require("./UpdateDeliveryTypeService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDeliveryTypeRepository;
let fakeHashProvider;
let createDeliveryType;
let updateDeliveryType;
describe("UpdateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new _FakeDeliveryTypeRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createDeliveryType = new _CreateDeliveryTypeService.default(fakeDeliveryTypeRepository);
    updateDeliveryType = new _UpdateDeliveryTypeService.default(fakeDeliveryTypeRepository);
  });
  it("should be able to update a delivery type", async () => {
    const customer_id = (0, _uuidv.uuid)();
    const deliveryType = await createDeliveryType.execute({
      description: "description-delivery",
      customer_id
    });
    const updatedDeliveryType = await updateDeliveryType.execute({
      id: deliveryType.id,
      description: "new-description-test",
      customer_id
    });
    expect(updatedDeliveryType.description).toBe("new-description-test");
  });
  it("should not be able to update a delivery type to another one that have the same name and customer", async () => {
    const customer_id = (0, _uuidv.uuid)();
    await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id
    });
    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id
    });
    await expect(updateDeliveryType.execute({
      id: deliveryType2.id,
      description: "description-delivery-1",
      customer_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to update a non existing delivery type", async () => {
    await expect(updateDeliveryType.execute({
      id: "non-existing-id",
      description: "description-delivery-1",
      customer_id: (0, _uuidv.uuid)()
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to update a delivery type that pertences to another customer", async () => {
    const deliveryType1 = await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id: (0, _uuidv.uuid)()
    });
    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id: (0, _uuidv.uuid)()
    });
    await expect(updateDeliveryType.execute({
      id: deliveryType1.id,
      description: "description-delivery-3",
      customer_id: deliveryType2.customer_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});