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
var uuidv4_1 = require("uuidv4");
var DeliveryType_1 = __importDefault(require("@modules/DeliveryTypes/infra/typeorm/entities/DeliveryType"));
var DeliveryTypeRepository = /** @class */ (function () {
    function DeliveryTypeRepository() {
        this.deliveryTypes = []; // deveria ser private, só que está bugando no teste de delete, ele não entende quando está vazio
    }
    DeliveryTypeRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var deliveryType;
            return __generator(this, function (_a) {
                deliveryType = new DeliveryType_1.default();
                Object.assign(deliveryType, { id: uuidv4_1.uuid() }, data);
                this.deliveryTypes.push(deliveryType);
                return [2 /*return*/, deliveryType];
            });
        });
    };
    DeliveryTypeRepository.prototype.save = function (deliveryType) {
        return __awaiter(this, void 0, void 0, function () {
            var findIndex;
            return __generator(this, function (_a) {
                findIndex = this.deliveryTypes.findIndex(function (dt) { return dt.id === deliveryType.id; });
                this.deliveryTypes[findIndex] = deliveryType;
                return [2 /*return*/, deliveryType];
            });
        });
    };
    DeliveryTypeRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findIndex;
            return __generator(this, function (_a) {
                findIndex = this.deliveryTypes.findIndex(function (dt) { return dt.id === id; });
                return [2 /*return*/, this.deliveryTypes[findIndex]];
            });
        });
    };
    DeliveryTypeRepository.prototype.findAllByCustomer = function (customer_id) {
        return __awaiter(this, void 0, void 0, function () {
            var deliveryTypesFiltered;
            return __generator(this, function (_a) {
                deliveryTypesFiltered = [];
                deliveryTypesFiltered = this.deliveryTypes.filter(function (dt) { return dt.customer_id === customer_id; });
                return [2 /*return*/, deliveryTypesFiltered];
            });
        });
    };
    DeliveryTypeRepository.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findIndex;
            return __generator(this, function (_a) {
                findIndex = this.deliveryTypes.findIndex(function (dt) { return dt.id === id; });
                this.deliveryTypes.splice(findIndex);
                return [2 /*return*/];
            });
        });
    };
    DeliveryTypeRepository.prototype.findByDescriptionAndCustomerId = function (_a) {
        var customer_id = _a.customer_id, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var findIndex;
            return __generator(this, function (_b) {
                findIndex = this.deliveryTypes.find(function (dt) { return dt.customer_id === customer_id && dt.description === description; });
                return [2 /*return*/, findIndex];
            });
        });
    };
    return DeliveryTypeRepository;
}());
exports.default = DeliveryTypeRepository;
