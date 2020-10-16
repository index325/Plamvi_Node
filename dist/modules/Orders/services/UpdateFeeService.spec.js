"use strict";

var _FakeOrdersRepository = _interopRequireDefault(require("../repositories/fakes/FakeOrdersRepository"));

var _UpdateFeeService = _interopRequireDefault(require("./UpdateFeeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeOrdersRepository;
let updateFeeService;
describe('UpdateFee', () => {
  beforeEach(() => {
    fakeOrdersRepository = new _FakeOrdersRepository.default();
    updateFeeService = new _UpdateFeeService.default(fakeOrdersRepository);
  });
  it('should be able to update an order fee', async () => {
    const order = await fakeOrdersRepository.create({
      total: 0
    });
    const updatedOrder = await updateFeeService.execute({
      daysToDeliver: 3,
      fee: 300,
      order_id: order.id
    });
    expect(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.daysToDeliver).toBe(3);
    expect(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.fee).toBe(300);
  });
});