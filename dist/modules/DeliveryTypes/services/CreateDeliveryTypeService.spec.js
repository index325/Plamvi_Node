"use strict";

var _uuidv = require("uuidv4");

var _FakeDeliveryTypeRepository = _interopRequireDefault(require("../repositories/fakes/FakeDeliveryTypeRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateDeliveryTypeService = _interopRequireDefault(require("./CreateDeliveryTypeService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDeliveryTypeRepository;
let fakeHashProvider;
let createDeliveryType;
describe("CreateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new _FakeDeliveryTypeRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createDeliveryType = new _CreateDeliveryTypeService.default(fakeDeliveryTypeRepository);
  });
  it("should be able to create a new delivery type", async () => {
    const deliveryType = await createDeliveryType.execute({
      description: "description-delivery",
      customer_id: (0, _uuidv.uuid)()
    });
    expect(deliveryType.description).toBe("description-delivery");
  });
  it("should not be able to create a already existing delivery type", async () => {
    const customer_id = (0, _uuidv.uuid)();
    await createDeliveryType.execute({
      description: "description-delivery",
      customer_id
    });
    await expect(createDeliveryType.execute({
      description: "description-delivery",
      customer_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});