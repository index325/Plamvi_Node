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
var tsyringe_1 = require("tsyringe");
var AddToCartService_1 = __importDefault(require("@modules/Carts/services/AddToCartService"));
var DeleteCartItemService_1 = __importDefault(require("@modules/Carts/services/DeleteCartItemService"));
var UpdateCartItemService_1 = __importDefault(require("@modules/Carts/services/UpdateCartItemService"));
var class_transformer_1 = require("class-transformer");
var CartItemController = /** @class */ (function () {
    function CartItemController() {
    }
    CartItemController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var addToCart, _a, quantity, product_id, id, cart;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        addToCart = tsyringe_1.container.resolve(AddToCartService_1.default);
                        _a = request.body, quantity = _a.quantity, product_id = _a.product_id;
                        id = request.user.id;
                        return [4 /*yield*/, addToCart.execute({
                                user_id: id,
                                quantity: quantity,
                                product_id: product_id,
                            })];
                    case 1:
                        cart = _b.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(cart))];
                }
            });
        });
    };
    CartItemController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteCartItem, id, cart_item_id, cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteCartItem = tsyringe_1.container.resolve(DeleteCartItemService_1.default);
                        id = request.user.id;
                        cart_item_id = request.params.cart_item_id;
                        return [4 /*yield*/, deleteCartItem.execute({
                                user_id: id,
                                cart_item_id: cart_item_id,
                            })];
                    case 1:
                        cart = _a.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(cart))];
                }
            });
        });
    };
    CartItemController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var updateCartItem, quantity, cart_item_id, id, cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateCartItem = tsyringe_1.container.resolve(UpdateCartItemService_1.default);
                        quantity = request.body.quantity;
                        cart_item_id = request.params.cart_item_id;
                        id = request.user.id;
                        return [4 /*yield*/, updateCartItem.execute({
                                cart_item_id: cart_item_id,
                                quantity: quantity,
                                user_id: id,
                            })];
                    case 1:
                        cart = _a.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(cart))];
                }
            });
        });
    };
    return CartItemController;
}());
exports.default = CartItemController;
