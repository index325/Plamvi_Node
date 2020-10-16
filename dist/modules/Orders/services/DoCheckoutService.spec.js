"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FakeOrdersRepository_1 = __importDefault(require("../repositories/fakes/FakeOrdersRepository"));
var FakeOrderProductsRepository_1 = __importDefault(require("../repositories/fakes/FakeOrderProductsRepository"));
var FakeCartsRepository_1 = __importDefault(require("@modules/Carts/repositories/fake/FakeCartsRepository"));
var FakeCartItemsRepository_1 = __importDefault(require("@modules/Carts/repositories/fake/FakeCartItemsRepository"));
var FakeProductsRepository_1 = __importDefault(require("@modules/Products/repositories/fakes/FakeProductsRepository"));
var DoCheckoutService_1 = __importDefault(require("./DoCheckoutService"));
var AddToCartService_1 = __importDefault(require("@modules/Carts/services/AddToCartService"));
var CreateProductService_1 = __importDefault(require("@modules/Products/services/CreateProductService"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var FakeStorageProvider_1 = __importDefault(require("@shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));
var fakeOrdersRepository;
var fakeOrderProductsRepository;
var fakeCartsRepository;
var fakeCartItemsRepository;
var fakeProductsRepository;
var fakeStorageProvider;
var doCheckoutService;
var addToCart;
var createProduct;
describe("DoCheckout", function () {
    beforeEach(function () {
        fakeOrdersRepository = new FakeOrdersRepository_1.default();
        fakeOrderProductsRepository = new FakeOrderProductsRepository_1.default();
        fakeCartsRepository = new FakeCartsRepository_1.default();
        fakeCartItemsRepository = new FakeCartItemsRepository_1.default();
        fakeProductsRepository = new FakeProductsRepository_1.default();
        fakeStorageProvider = new FakeStorageProvider_1.default();
        doCheckoutService = new DoCheckoutService_1.default(fakeCartsRepository, fakeCartItemsRepository, fakeOrdersRepository, fakeOrderProductsRepository);
        addToCart = new AddToCartService_1.default(fakeCartsRepository, fakeCartItemsRepository);
        createProduct = new CreateProductService_1.default(fakeProductsRepository, fakeStorageProvider);
    });
    it("should be able to checkout an order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cart, product, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeCartsRepository.create({
                        customer_id: "fake-customer-id",
                        opened: true,
                        user_id: "fake-user-id",
                    })];
                case 1:
                    cart = _a.sent();
                    return [4 /*yield*/, createProduct.execute({
                            name: "fake-product",
                            sku: "fake-product-sku",
                            customer_id: "fake-customer-",
                            price: 10,
                            description: "fake-description",
                            short_description: "fake-short-description",
                            file: "image.jpg",
                        })];
                case 2:
                    product = _a.sent();
                    return [4 /*yield*/, addToCart.execute({
                            user_id: cart.user_id,
                            quantity: 1,
                            product_id: product.id,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, doCheckoutService.execute({
                            user_id: cart.user_id,
                        })];
                case 4:
                    order = _a.sent();
                    expect(order === null || order === void 0 ? void 0 : order.total).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to checkout an order with a closed cart", function () { return __awaiter(void 0, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeCartsRepository.create({
                        opened: false,
                        user_id: "fake-user-id",
                        customer_id: "fake-customer-id",
                    })];
                case 1:
                    cart = _a.sent();
                    return [4 /*yield*/, expect(doCheckoutService.execute({
                            user_id: cart.user_id,
                        })).rejects.toBeInstanceOf(AppError_1.default)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to checkout an order without cart", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(doCheckoutService.execute({
                        user_id: "inexistent-cart-id",
                    })).rejects.toBeInstanceOf(AppError_1.default)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
