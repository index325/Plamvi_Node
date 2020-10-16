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
var class_transformer_1 = require("class-transformer");
var CreateProductService_1 = __importDefault(require("@modules/Products/services/CreateProductService"));
var ListProductsByCustomerService_1 = __importDefault(require("@modules/Products/services/ListProductsByCustomerService"));
var ProductDetailService_1 = __importDefault(require("@modules/Products/services/ProductDetailService"));
var UpdateProductService_1 = __importDefault(require("@modules/Products/services/UpdateProductService"));
var ProductsController = /** @class */ (function () {
    function ProductsController() {
    }
    ProductsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, sku, price, description, short_description, createProducts, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.customer.id;
                        _a = request.body, name = _a.name, sku = _a.sku, price = _a.price, description = _a.description, short_description = _a.short_description;
                        createProducts = tsyringe_1.container.resolve(CreateProductService_1.default);
                        return [4 /*yield*/, createProducts.execute({
                                name: name,
                                sku: sku,
                                file: request.file.filename,
                                customer_id: id,
                                price: price,
                                description: description,
                                short_description: short_description,
                            })];
                    case 1:
                        product = _b.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(product))];
                }
            });
        });
    };
    ProductsController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var product_id, id, _a, name, sku, price, description, short_description, productUpdate, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        product_id = request.params.product_id;
                        id = request.customer.id;
                        _a = request.body, name = _a.name, sku = _a.sku, price = _a.price, description = _a.description, short_description = _a.short_description;
                        productUpdate = tsyringe_1.container.resolve(UpdateProductService_1.default);
                        return [4 /*yield*/, productUpdate.execute({
                                product_id: product_id,
                                name: name,
                                sku: sku,
                                file: request.file.filename,
                                customer_id: id,
                                price: price,
                                description: description,
                                short_description: short_description,
                            })];
                    case 1:
                        product = _b.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(product))];
                }
            });
        });
    };
    ProductsController.prototype.detail = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var product_id, productDetail, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product_id = request.params.product_id;
                        productDetail = tsyringe_1.container.resolve(ProductDetailService_1.default);
                        return [4 /*yield*/, productDetail.execute(product_id)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(product))];
                }
            });
        });
    };
    ProductsController.prototype.listByCustomerId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var customer_id, listProducts, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customer_id = request.params.customer_id;
                        listProducts = tsyringe_1.container.resolve(ListProductsByCustomerService_1.default);
                        return [4 /*yield*/, listProducts.execute(customer_id)];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(products))];
                }
            });
        });
    };
    return ProductsController;
}());
exports.default = ProductsController;
