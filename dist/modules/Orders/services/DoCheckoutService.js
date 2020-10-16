"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var tsyringe_1 = require("tsyringe");
var DoCheckoutService = /** @class */ (function () {
    function DoCheckoutService(cartsRepository, cartItemsRepository, ordersRepository, orderProductsRepository) {
        this.cartsRepository = cartsRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.ordersRepository = ordersRepository;
        this.orderProductsRepository = orderProductsRepository;
    }
    DoCheckoutService.prototype.execute = function (_a) {
        var user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var closedCart, cart, total, order;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.cartsRepository.findClosedCartByUser(user_id)];
                    case 1:
                        closedCart = _b.sent();
                        if (closedCart) {
                            throw new AppError_1.default("Impossível fazer checkout novamente. Você já tem um pedido em aberto.", 400);
                        }
                        return [4 /*yield*/, this.cartsRepository.findOpenedCartByUser(user_id)];
                    case 2:
                        cart = _b.sent();
                        if (!cart) {
                            throw new AppError_1.default("Carrinho não encontrado.");
                        }
                        total = 0;
                        cart.cart_item.map(function (item) {
                            total += item.product.price * item.quantity;
                        });
                        return [4 /*yield*/, this.ordersRepository.create({
                                total: total,
                            })];
                    case 3:
                        order = _b.sent();
                        cart.cart_item.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.orderProductsRepository.create({
                                            order_id: order.id,
                                            product_id: item.product.id,
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this.cartItemsRepository.delete({ cart_item_id: item.id })];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, this.cartsRepository.closeCart(cart.id)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    DoCheckoutService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject("CartsRepository")),
        __param(1, tsyringe_1.inject("CartItemRepository")),
        __param(2, tsyringe_1.inject("OrdersRepository")),
        __param(3, tsyringe_1.inject("OrderProductsRepository")),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], DoCheckoutService);
    return DoCheckoutService;
}());
exports.default = DoCheckoutService;
