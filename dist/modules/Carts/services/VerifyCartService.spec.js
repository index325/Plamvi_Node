"use strict";

var _FakeCartsRepository = _interopRequireDefault(require("../repositories/fake/FakeCartsRepository"));

var _VerifyCartService = _interopRequireDefault(require("./VerifyCartService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCartsRespository;
let verifyCart;
describe("VerifyCart", () => {
  beforeEach(() => {
    fakeCartsRespository = new _FakeCartsRepository.default();
    verifyCart = new _VerifyCartService.default(fakeCartsRespository);
  });
  it("Should be able to find a user's cart if exists", async () => {
    const createdCart = await fakeCartsRespository.create({
      opened: true,
      user_id: "fake-id",
      customer_id: "fake-customer-id"
    });
    const foundCart = await verifyCart.execute({
      customer_id: "fake-customer-id",
      user_id: "fake-id"
    });
    expect(foundCart === null || foundCart === void 0 ? void 0 : foundCart.user_id).toEqual(createdCart.user_id);
  });
  it("Should be able to create a new user's cart if not exists", async () => {
    const createdCart = await verifyCart.execute({
      customer_id: "fake-customer-id",
      user_id: "fake-id"
    });
    expect(createdCart.user_id).toBe("fake-id");
  });
});