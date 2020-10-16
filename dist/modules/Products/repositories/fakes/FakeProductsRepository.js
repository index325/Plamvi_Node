"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var uuidv4_1 = require("uuidv4");
var Product_1 = __importDefault(require("../../infra/typeorm/entities/Product"));
var ProductsRepository = /** @class */ (function () {
    function ProductsRepository() {
        this.products = [];
    }
    ProductsRepository.prototype.create = function (_a) {
        var customer_id = _a.customer_id, description = _a.description, image = _a.image, name = _a.name, price = _a.price, short_description = _a.short_description, sku = _a.sku;
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_b) {
                product = new Product_1.default();
                product.id = uuidv4_1.uuid();
                product.customer = {};
                product.customer.id = customer_id;
                product.sku = sku;
                product.price = price;
                product.description = description;
                product.image = image;
                product.name = name;
                product.short_description = short_description;
                product.getImageUrl = function () { return "fake-image-url"; };
                this.products.push(product);
                return [2 /*return*/, product];
            });
        });
    };
    ProductsRepository.prototype.update = function (_a, product_id) {
        var customer_id = _a.customer_id, description = _a.description, image = _a.image, name = _a.name, price = _a.price, short_description = _a.short_description, sku = _a.sku;
        return __awaiter(this, void 0, void 0, function () {
            var updatedProductIndex, updatedProducts;
            return __generator(this, function (_b) {
                updatedProductIndex = this.products.findIndex(function (item) { return item.id === product_id; });
                updatedProducts = this.products.map(function (item) {
                    if (item.id === product_id) {
                        return __assign(__assign({}, item), { description: description,
                            image: image,
                            name: name,
                            price: price,
                            short_description: short_description,
                            sku: sku, getImageUrl: function () { return "fake-image-url"; } });
                    }
                    return item;
                });
                this.products = updatedProducts;
                return [2 /*return*/, this.products[updatedProductIndex]];
            });
        });
    };
    ProductsRepository.prototype.listAllProductsByCustomer = function (customer_id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundProducts;
            return __generator(this, function (_a) {
                foundProducts = this.products.filter(function (item) { return item.customer.id === customer_id; });
                return [2 /*return*/, foundProducts];
            });
        });
    };
    ProductsRepository.prototype.findProductById = function (product_id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundProduct;
            return __generator(this, function (_a) {
                foundProduct = this.products.find(function (item) { return item.id === product_id; });
                return [2 /*return*/, foundProduct];
            });
        });
    };
    ProductsRepository.prototype.findBySku = function (sku) {
        return __awaiter(this, void 0, void 0, function () {
            var foundProduct;
            return __generator(this, function (_a) {
                foundProduct = this.products.find(function (item) { return item.sku === sku; });
                return [2 /*return*/, foundProduct];
            });
        });
    };
    ProductsRepository.prototype.verifyIfSKUAlreadyExists = function (_a) {
        var sku = _a.sku, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var foundProduct;
            return __generator(this, function (_b) {
                foundProduct = this.products.find(function (item) { return item.sku === sku && item.id !== id; });
                return [2 /*return*/, !!foundProduct];
            });
        });
    };
    ProductsRepository.prototype.verifyIfSKUAlreadyExistsWithoutId = function (sku) {
        return __awaiter(this, void 0, void 0, function () {
            var foundProduct;
            return __generator(this, function (_a) {
                foundProduct = this.products.find(function (item) { return item.sku === sku; });
                return [2 /*return*/, !!foundProduct];
            });
        });
    };
    return ProductsRepository;
}());
exports.default = ProductsRepository;
