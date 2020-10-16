"use strict";

var _uuidv = require("uuidv4");

var _FakeDeliveryTypeRepository = _interopRequireDefault(require("../repositories/fakes/FakeDeliveryTypeRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateDeliveryTypeService = _interopRequireDefault(require("./CreateDeliveryTypeService"));

var _DeleteDeliveryTypeService = _interopRequireDefault(require("./DeleteDeliveryTypeService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDeliveryTypeRepository;
let fakeHashProvider;
let createDeliveryType;
let deleteDeliveryType;
describe("UpdateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new _FakeDeliveryTypeRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createDeliveryType = new _CreateDeliveryTypeService.default(fakeDeliveryTypeRepository);
    deleteDeliveryType = new _DeleteDeliveryTypeService.default(fakeDeliveryTypeRepository);
  });
  it("should be able to delete a delivery type", async () => {
    const customer_id = (0, _uuidv.uuid)();
    const deliveryType = await createDeliveryType.execute({
      description: "description-delivery",
      customer_id
    });
    await deleteDeliveryType.execute({
      customer_id,
      id: deliveryType.id
    });
    expect(fakeDeliveryTypeRepository.deliveryTypes).toHaveLength(0);
  });
  it("should not be able to delete a non existing delivery type", async () => {
    await expect(deleteDeliveryType.execute({
      id: "non-existing-id",
      customer_id: (0, _uuidv.uuid)()
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to delete a delivery type that pertences to another customer", async () => {
    const deliveryType1 = await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id: (0, _uuidv.uuid)()
    });
    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id: (0, _uuidv.uuid)()
    });
    await expect(deleteDeliveryType.execute({
      id: deliveryType1.id,
      customer_id: deliveryType2.customer_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});