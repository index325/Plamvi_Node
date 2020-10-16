"use strict";

var _uuidv = require("uuidv4");

var _FakeDeliveryTypeRepository = _interopRequireDefault(require("../repositories/fakes/FakeDeliveryTypeRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateDeliveryTypeService = _interopRequireDefault(require("./CreateDeliveryTypeService"));

var _ListAllDeliveryTypesByCustomerService = _interopRequireDefault(require("./ListAllDeliveryTypesByCustomerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDeliveryTypeRepository;
let fakeHashProvider;
let createDeliveryType;
let listAllDeliveryTypesByCustomer;
describe("UpdateDeliveryType", () => {
  beforeEach(() => {
    fakeDeliveryTypeRepository = new _FakeDeliveryTypeRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createDeliveryType = new _CreateDeliveryTypeService.default(fakeDeliveryTypeRepository);
    listAllDeliveryTypesByCustomer = new _ListAllDeliveryTypesByCustomerService.default(fakeDeliveryTypeRepository);
  });
  it("should be able to list all delivery types by customer id", async () => {
    const customer_id = (0, _uuidv.uuid)();
    const deliveryType1 = await createDeliveryType.execute({
      description: "description-delivery-1",
      customer_id
    });
    const deliveryType2 = await createDeliveryType.execute({
      description: "description-delivery-2",
      customer_id
    });
    const deliveryTypes = await listAllDeliveryTypesByCustomer.execute({
      customer_id
    });
    expect(deliveryTypes).toEqual([deliveryType1, deliveryType2]);
  });
});